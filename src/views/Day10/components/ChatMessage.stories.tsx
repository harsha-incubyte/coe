import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatMessage } from './ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  title: 'Views/Day10/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onResend: { action: 'resend' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    message: {
      id: '1',
      role: 'user',
      content: 'Hello, how can you help me today?',
      createdAt: new Date(),
    },
  },
};

export const AIMessageShort: Story = {
  args: {
    message: {
      id: '2',
      role: 'assistant',
      content: 'Hello! I am your medical assistant. How can I help you?',
      createdAt: new Date(),
    },
  },
};

export const AIMessageMarkdown: Story = {
  args: {
    message: {
      id: '3',
      role: 'assistant',
      content: `Here is some information about **Hypertension**:

### Key Symptoms
- Headaches
- Shortness of breath
- Nosebleeds

### Recommended Diet
1. Low sodium
2. Rich in fruits and vegetables
3. Lean proteins

> [!IMPORTANT]
> Please consult with a doctor for a personalized plan.

| Food Category | Recommended | Limit |
|---------------|-------------|-------|
| Grains        | Whole wheat | White bread |
| Protein       | Fish, beans | Red meat |
`,
      createdAt: new Date(),
    },
  },
};

export const AIMessageWithCode: Story = {
  args: {
    message: {
      id: '4',
      role: 'assistant',
      content: 'You can use the following CSS to style your components:\n\n```css\n.message-bubble {\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n}\n```',
      createdAt: new Date(),
    },
  },
};

export const ErrorState: Story = {
  args: {
    message: {
      id: '5',
      role: 'user',
      content: 'This message failed to send.',
      status: 'error',
      createdAt: new Date(),
    },
  },
};

export const DeliveringState: Story = {
  args: {
    message: {
      id: '6',
      role: 'user',
      content: 'This message is currently being sent...',
      status: 'delivering',
      createdAt: new Date(),
    },
  },
};
