import type { Meta, StoryObj } from '@storybook/react';
import { MessageList } from './MessageList';

const meta: Meta<typeof MessageList> = {
  title: 'Views/Day10/MessageList',
  component: MessageList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', maxWidth: '600px', margin: '20px auto', border: '1px solid #333' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onResend: { action: 'resend' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockMessages = [
  {
    id: '1',
    role: 'user' as const,
    content: 'Hi, I have been feeling a bit dizzy lately.',
    createdAt: new Date(Date.now() - 100000),
  },
  {
    id: '2',
    role: 'assistant' as const,
    content: 'I am sorry to hear that. Dizziness can be caused by many factors. Have you noticed any other symptoms, like nausea or headaches?',
    createdAt: new Date(Date.now() - 90000),
  },
  {
    id: '3',
    role: 'user' as const,
    content: 'Yes, a slight headache as well.',
    createdAt: new Date(Date.now() - 80000),
  },
  {
    id: '4',
    role: 'assistant' as const,
    content: 'Thank you for that information. How long has this been going on?',
    createdAt: new Date(Date.now() - 70000),
  },
];

export const FullConversation: Story = {
  args: {
    messages: mockMessages,
    isTyping: false,
    status: 'ready',
  },
};

export const AIThinking: Story = {
  args: {
    messages: mockMessages,
    isTyping: true,
    status: 'submitted',
  },
};

export const AISpawning: Story = {
  args: {
    messages: [
      ...mockMessages,
      {
        id: '5',
        role: 'assistant' as const,
        content: 'I see. Based on your symptoms, it could be related to several things including hydration, blood pressure, or inner ear issues...',
        createdAt: new Date(),
      }
    ],
    isTyping: false,
    status: 'streaming',
  },
};

export const WithError: Story = {
  args: {
    messages: [
      ...mockMessages,
      {
        id: '5',
        role: 'user' as const,
        content: 'I also feel a bit tired.',
        status: 'error',
        createdAt: new Date(),
      }
    ],
    isTyping: false,
    status: 'error',
  },
};

export const LongConversation: Story = {
  args: {
    messages: Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      role: i % 2 === 0 ? 'user' as const : 'assistant' as const,
      content: `Message number ${i + 1} in a long conversation thread.`,
      createdAt: new Date(Date.now() - (20 - i) * 60000),
    })),
    isTyping: false,
    status: 'ready',
  },
};
