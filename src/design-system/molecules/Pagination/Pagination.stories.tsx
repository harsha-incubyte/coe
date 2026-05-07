import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { fn } from '@storybook/test';

const meta: Meta<typeof Pagination> = {
  title: 'Design System/Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  args: {
    onPageChange: fn(),
    currentPage: 1,
    totalPages: 10,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};
