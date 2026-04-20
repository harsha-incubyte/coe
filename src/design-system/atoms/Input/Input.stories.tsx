import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    hideLabel: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Invalid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
    type: 'password',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    hideLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You cannot type here',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'I span across the container',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
