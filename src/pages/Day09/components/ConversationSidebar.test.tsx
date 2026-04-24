import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';
import { ConversationSidebar } from './ConversationSidebar';
import type { Conversation } from '../hooks/useChatState';

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Flu Symptoms',
    messages: [
      { id: 'm1', role: 'user', content: 'I have a fever', timestamp: Date.now(), status: 'sent' },
      { id: 'm2', role: 'assistant', content: 'Rest and hydrate', timestamp: Date.now(), status: 'sent' },
    ],
    updatedAt: Date.now(),
  },
  {
    id: '2',
    title: 'Knee Pain',
    messages: [
      { id: 'm3', role: 'user', content: 'My knee hurts after running', timestamp: Date.now(), status: 'sent' },
    ],
    updatedAt: Date.now(),
  },
  {
    id: '3',
    title: 'General Health',
    messages: [
      { id: 'm4', role: 'user', content: 'What is a good diet?', timestamp: Date.now(), status: 'sent' },
    ],
    updatedAt: Date.now(),
  }
];

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('ConversationSidebar', () => {
  const defaultProps = {
    conversations: mockConversations,
    currentConversationId: '1',
    onSelectConversation: vi.fn(),
    onNewConversation: vi.fn(),
    errorRate: 0,
    onErrorRateChange: vi.fn(),
  };

  it('renders all conversations initially', () => {
    renderWithTheme(<ConversationSidebar {...defaultProps} />);
    
    expect(screen.getByText('Flu Symptoms')).toBeInTheDocument();
    expect(screen.getByText('Knee Pain')).toBeInTheDocument();
    expect(screen.getByText('General Health')).toBeInTheDocument();
  });

  it('filters conversations by title', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ConversationSidebar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conversations/i);
    await user.type(searchInput, 'Flu');
    
    expect(screen.getByText('Flu Symptoms')).toBeInTheDocument();
    expect(screen.queryByText('Knee Pain')).not.toBeInTheDocument();
    expect(screen.queryByText('General Health')).not.toBeInTheDocument();
  });

  it('filters conversations by message content', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ConversationSidebar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conversations/i);
    await user.type(searchInput, 'diet');
    
    expect(screen.getByText('General Health')).toBeInTheDocument();
    expect(screen.queryByText('Flu Symptoms')).not.toBeInTheDocument();
    expect(screen.queryByText('Knee Pain')).not.toBeInTheDocument();
  });

  it('shows "No conversations found" when there is no match', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ConversationSidebar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conversations/i);
    await user.type(searchInput, 'nonexistent');
    
    expect(screen.getByText('No conversations found')).toBeInTheDocument();
    expect(screen.queryByText('Flu Symptoms')).not.toBeInTheDocument();
  });

  it('clears search results when input is cleared', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ConversationSidebar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conversations/i);
    await user.type(searchInput, 'Flu');
    expect(screen.queryByText('Knee Pain')).not.toBeInTheDocument();
    
    await user.clear(searchInput);
    
    expect(screen.getByText('Flu Symptoms')).toBeInTheDocument();
    expect(screen.getByText('Knee Pain')).toBeInTheDocument();
    expect(screen.getByText('General Health')).toBeInTheDocument();
  });

  it('calls onSelectConversation when a filtered item is clicked', async () => {
    const user = userEvent.setup();
    const onSelectConversation = vi.fn();
    renderWithTheme(<ConversationSidebar {...defaultProps} onSelectConversation={onSelectConversation} />);
    
    const searchInput = screen.getByPlaceholderText(/search conversations/i);
    await user.type(searchInput, 'Knee');
    
    const item = screen.getByText('Knee Pain');
    await user.click(item);
    
    expect(onSelectConversation).toHaveBeenCalledWith('2');
  });
});
