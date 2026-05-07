import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Design System/Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    $level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    $level: 1,
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    $level: 2,
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    $level: 3,
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    $level: 4,
    children: 'Heading 4',
  },
};

export const Heading5: Story = {
  args: {
    $level: 5,
    children: 'Heading 5',
  },
};

export const Heading6: Story = {
  args: {
    $level: 6,
    children: 'Heading 6',
  },
};
