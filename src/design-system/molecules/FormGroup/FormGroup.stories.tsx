import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormGroup } from './FormGroup';
import { Input } from '@/design-system/atoms/Input';

const meta: Meta<typeof FormGroup> = {
  title: 'Design System/Molecules/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Username',
    children: <Input label="Username" hideLabel placeholder="Enter your username" />,
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
    children: <Input label="Full width input" hideLabel fullWidth placeholder="Full width input" />,
  },
};

export const RenderPropChildren: Story = {
  args: {
    children: ({ id, describedBy, isInvalid }) => (
      <Input 
        id={id} 
        label="Custom input"
        hideLabel
        aria-describedby={describedBy} 
        error={isInvalid ? 'Invalid' : undefined} 
        placeholder="Custom input with render props"
      />
    ),
  },
};
