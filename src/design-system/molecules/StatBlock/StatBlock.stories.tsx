import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatBlock } from './StatBlock';
import React from 'react';

const meta: Meta<typeof StatBlock> = {
  title: 'Design System/Molecules/StatBlock',
  component: StatBlock,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Total Revenue',
    value: '$45,231.89',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <span>💰</span>,
  },
};

export const WithPositiveTrend: Story = {
  args: {
    trend: {
      value: '+20.1%',
      type: 'success',
    },
    icon: <span>📈</span>,
  },
};

export const WithNegativeTrend: Story = {
  args: {
    label: 'Churn Rate',
    value: '2.4%',
    trend: {
      value: '+0.5%',
      type: 'error',
    },
    icon: <span>📉</span>,
  },
};

export const WithInfoTrend: Story = {
  args: {
    label: 'Active Users',
    value: '12,456',
    trend: {
      value: 'Stable',
      type: 'info',
    },
    icon: <span>👤</span>,
  },
};
