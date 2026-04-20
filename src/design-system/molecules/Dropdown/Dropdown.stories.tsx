import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';
import { Button } from '@/design-system/atoms';
import { fn } from '@storybook/test';
import React from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Options',
    items: [
      { label: 'Profile', onClick: fn() },
      { label: 'Settings', onClick: fn() },
      { label: 'Logout', onClick: fn(), variant: 'danger' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomTrigger: Story = {
  args: {
    trigger: ({ onToggle, isOpen }) => (
      <Button variant="primary" onClick={onToggle}>
        Custom Trigger {isOpen ? '▴' : '▾'}
      </Button>
    ),
  },
};

export const LargeMenu: Story = {
  args: {
    label: 'Quick Actions',
    items: [
      { label: 'New Project', onClick: fn() },
      { label: 'Invite Member', onClick: fn() },
      { label: 'Duplicate', onClick: fn() },
      { label: 'Move to Folder', onClick: fn() },
      { label: 'Archive', onClick: fn() },
      { label: 'Delete', onClick: fn(), variant: 'danger' },
    ],
  },
};
