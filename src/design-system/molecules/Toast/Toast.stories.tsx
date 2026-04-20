import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';
import { fn } from '@storybook/test';

const meta: Meta<typeof Toast> = {
  title: 'Design System/Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  args: {
    message: 'This is a toast message.',
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: 'info',
    message: 'New update available. Please refresh the page.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Changes saved successfully!',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Your plan is about to expire in 3 days.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Failed to upload image. Please try again.',
  },
};

export const LongMessage: Story = {
  args: {
    type: 'info',
    message: 'This is a very long toast message to see how it handles line breaks and multiple lines of text in the notification area.',
  },
};
