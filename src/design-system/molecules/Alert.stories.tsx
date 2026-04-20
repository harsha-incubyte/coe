import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { fn } from '@storybook/test';

const meta: Meta<typeof Alert> = {
  title: 'Design System/Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  args: {
    onClose: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    title: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'This is an information message.',
  },
};

export const InfoWithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'This is an information message with a title.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Operation was successful!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Something might be wrong. Please check your data.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'An unexpected error occurred. Please try again.',
  },
};

export const NoTitle: Story = {
  args: {
    variant: 'success',
    message: 'Task completed!',
  },
};

export const Closable: Story = {
  args: {
    variant: 'info',
    title: 'Closable Alert',
    message: 'Click the X to dismiss this alert.',
  },
};
