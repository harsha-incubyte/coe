import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';
import { fn } from '@storybook/test';

const meta: Meta<typeof RadioGroup> = {
  title: 'Design System/Molecules/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
  args: {
    onChange: fn(),
    label: 'Select an option',
    options: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ],
    value: 'opt1',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
  },
};

export const WithError: Story = {
  args: {
    error: 'Please select a valid option',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Select the option that best describes you',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: 'Enabled Option', value: 'enabled' },
      { label: 'Disabled Option', value: 'disabled', disabled: true },
      { label: 'Another Option', value: 'another' },
    ],
  },
};
