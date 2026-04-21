import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Design System/Molecules/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomSeparator: Story = {
  args: {
    separator: '>',
  },
};

export const Short: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings' },
    ],
  },
};

export const Long: Story = {
  args: {
    items: [
      { label: 'Level 1', href: '#' },
      { label: 'Level 2', href: '#' },
      { label: 'Level 3', href: '#' },
      { label: 'Level 4', href: '#' },
      { label: 'Level 5', href: '#' },
      { label: 'Current Page' },
    ],
  },
};
