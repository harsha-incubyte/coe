import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from './InputGroup';
import { Input } from '@/design-system/atoms/Input';

const meta: Meta<typeof InputGroup> = {
  title: 'Design System/Molecules/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: <Input label="Amount" hideLabel placeholder="Enter amount" />,
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
    children: <Input label="Domain" hideLabel placeholder="example" />,
    suffix: '.com',
  },
};

export const WithIcon: Story = {
  args: {
    prefix: <span>🔍</span>,
    children: <Input label="Search" hideLabel placeholder="Search..." />,
  },
};
