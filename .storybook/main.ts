import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    const srcPath = path.resolve(process.cwd(), 'src');
    
    if (!config.resolve) config.resolve = {};
    
    if (Array.isArray(config.resolve.alias)) {
      config.resolve.alias.push({ find: '@', replacement: srcPath });
      config.resolve.alias.push({ find: '@/', replacement: srcPath + '/' });
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': srcPath,
        '@/': srcPath + '/',
      };
    }
    
    return config;
  },
};
export default config;