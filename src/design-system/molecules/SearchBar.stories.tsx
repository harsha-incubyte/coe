import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { fn } from '@storybook/test';

const meta: Meta<typeof SearchBar> = {
  title: 'Design System/Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  args: {
    onSearch: fn(),
    onChange: fn(),
  },
  argTypes: {
    placeholder: {
      control: 'text',
    },
    defaultValue: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search for articles, components, or days...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Atomic Design',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Find magic...',
  },
};
