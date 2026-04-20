import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    $variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'danger'],
    },
    $size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    $fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    $variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    $variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Accent: Story = {
  args: {
    $variant: 'accent',
    children: 'Accent Button',
  },
};

export const Ghost: Story = {
  args: {
    $variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    $variant: 'danger',
    children: 'Danger Button',
  },
};

export const Small: Story = {
  args: {
    $size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    $size: 'lg',
    children: 'Large Button',
  },
};

export const FullWidth: Story = {
  args: {
    $fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
