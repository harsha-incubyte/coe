import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeManager } from '../src/design-system/theme/ThemeManager';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <ThemeManager>
        <Story />
      </ThemeManager>
    ),
  ],
};

export default preview;