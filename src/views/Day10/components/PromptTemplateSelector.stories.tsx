import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PromptTemplateSelector } from './PromptTemplateSelector';
import { MEDICAL_PROMPTS } from '@/lib/llm/prompts';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';

const meta: Meta<typeof PromptTemplateSelector> = {
  title: 'Day 10/PromptTemplateSelector',
  component: PromptTemplateSelector,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ background: '#020617', padding: '20px', minHeight: '200px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PromptTemplateSelector>;

export const Default: Story = {
  args: {
    selectedTemplateId: MEDICAL_PROMPTS[0].id,
    onSelectTemplate: (template) => console.log('Selected:', template.name),
  },
};

export const MedicationSelected: Story = {
  args: {
    selectedTemplateId: 'medication',
    onSelectTemplate: (template) => console.log('Selected:', template.name),
  },
};

export const Disabled: Story = {
  args: {
    selectedTemplateId: MEDICAL_PROMPTS[0].id,
    onSelectTemplate: (template) => console.log('Selected:', template.name),
    disabled: true,
  },
};
