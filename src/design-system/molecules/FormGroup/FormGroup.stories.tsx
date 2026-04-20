import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormGroup } from './FormGroup';
import { Input } from '@/design-system/atoms/Input';
import React from 'react';

const meta: Meta<typeof FormGroup> = {
  title: 'Design System/Molecules/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Username',
    children: <Input placeholder="Enter your username" />,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRequired: Story = {
  args: {
    required: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'Username is already taken',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Must be at least 3 characters long',
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: <Input fullWidth placeholder="Full width input" />,
  },
};

export const RenderPropChildren: Story = {
  args: {
    children: ({ id, describedBy, isInvalid }) => (
      <Input 
        id={id} 
        aria-describedby={describedBy} 
        status={isInvalid ? 'error' : 'default'} 
        placeholder="Custom input with render props"
      />
    ),
  },
};
