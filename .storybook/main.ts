import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import babel from 'vite-plugin-babel';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
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

    // Inject babel-plugin-styled-components so class names are derived from
    // file path + display name (same as Next.js SWC transform) rather than a
    // runtime counter that shifts whenever import order changes.
    // TypeScript and React presets are required because vite-plugin-babel
    // intercepts .tsx files before esbuild, so Babel must handle the full parse.
    if (!config.plugins) config.plugins = [];
    config.plugins.push(
      babel({
        filter: /\.[jt]sx?$/,
        exclude: /node_modules/,
        babelConfig: {
          presets: [
            '@babel/preset-typescript',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
          plugins: [
            ['babel-plugin-styled-components', { displayName: true, fileName: true, pure: true }],
          ],
        },
      })
    );

    return config;
  },
};
export default config;