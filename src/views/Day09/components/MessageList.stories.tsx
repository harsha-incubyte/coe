import type { Meta, StoryObj } from '@storybook/react';
import { MessageList } from './MessageList';

const meta: Meta<typeof MessageList> = {
  title: 'Views/Day09/MessageList',
  component: MessageList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', maxWidth: '800px', margin: '20px auto', border: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
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
    timestamp: Date.now() - 100000,
    status: 'sent' as const,
  },
  {
    id: '2',
    role: 'assistant' as const,
    content: 'I am sorry to hear that. Dizziness can be caused by many factors. Have you noticed any other symptoms, like nausea or headaches?',
    timestamp: Date.now() - 90000,
    status: 'sent' as const,
  },
  {
    id: '3',
    role: 'user' as const,
    content: 'Yes, a slight headache as well.',
    timestamp: Date.now() - 80000,
    status: 'sent' as const,
  },
];

export const Default: Story = {
  args: {
    messages: mockMessages,
    isTyping: false,
  },
};

export const WithTyping: Story = {
  args: {
    messages: mockMessages,
    isTyping: true,
  },
};

export const Empty: Story = {
  args: {
    messages: [],
    isTyping: false,
  },
};
