import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypingIndicator } from './TypingIndicator';

const meta: Meta<typeof TypingIndicator> = {
  title: 'Views/Day10/TypingIndicator',
  component: TypingIndicator,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
