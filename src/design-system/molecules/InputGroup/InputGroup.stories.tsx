import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputGroup } from './InputGroup';
import { Input } from '@/design-system/atoms/Input';
import React from 'react';

const meta: Meta<typeof InputGroup> = {
  title: 'Design System/Molecules/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: <Input placeholder="Enter amount" />,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPrefix: Story = {
  args: {
    prefix: '$',
  },
};

export const WithSuffix: Story = {
  args: {
    suffix: '.00',
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    prefix: 'https://',
    children: <Input placeholder="example" />,
    suffix: '.com',
  },
};

export const WithIcon: Story = {
  args: {
    prefix: <span>🔍</span>,
    children: <Input placeholder="Search..." />,
  },
};
