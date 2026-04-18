import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: [
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: true,
              ssr: false,
              pure: true,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    pool: 'forks',
    isolate: true, // Ensured each test file runs in a fresh process
  },
})
