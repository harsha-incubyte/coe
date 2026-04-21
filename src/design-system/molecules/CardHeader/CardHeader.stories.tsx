import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardHeader } from './CardHeader';
import { Button } from '@/design-system/atoms/Button';

const meta: Meta<typeof CardHeader> = {
  title: 'Design System/Molecules/CardHeader',
  component: CardHeader,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'User Profile',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    subtitle: 'Manage your personal information and settings',
  },
};

export const WithActions: Story = {
  args: {
    subtitle: 'Active since Jan 2024',
    actions: (
      <>
        <Button variant="secondary" size="sm">Edit</Button>
        <Button variant="primary" size="sm">Save</Button>
      </>
    ),
  },
};

export const CustomHeadingLevel: Story = {
  args: {
    title: 'Settings Page',
    titleLevel: 1,
    subtitle: 'H1 level title',
  },
};
