import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from './CheckboxGroup';
import { fn } from '@storybook/test';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Design System/Molecules/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'padded',
  },
  args: {
    onChange: fn(),
    label: 'Select options',
    options: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ],
    value: ['opt1'],
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

export const MultipleSelected: Story = {
  args: {
    value: ['opt1', 'opt2'],
  },
};

export const WithError: Story = {
  args: {
    error: 'You must select at least one option',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'You can select multiple options',
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
