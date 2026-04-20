import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepIndicator } from './StepIndicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'Design System/Molecules/StepIndicator',
  component: StepIndicator,
  parameters: {
    layout: 'padded',
  },
  args: {
    steps: [
      { label: 'Basic Info' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Confirmation' },
    ],
    activeIndex: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {
  args: {
    activeIndex: 0,
  },
};

export const MiddleStep: Story = {
  args: {
    activeIndex: 1,
  },
};

export const AlmostComplete: Story = {
  args: {
    activeIndex: 3,
  },
};

export const Completed: Story = {
  args: {
    activeIndex: 4,
  },
};

export const TwoSteps: Story = {
  args: {
    steps: [
      { label: 'Login' },
      { label: 'Verify' },
    ],
    activeIndex: 1,
  },
};
