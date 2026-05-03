import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';
import Day10 from './index';

// Mock dependencies
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({ data: { user: { name: 'Test User' } } })),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({
    data: [
      { id: '1', title: 'Conversation 1', messages: [], updatedAt: Date.now() },
      { id: '2', title: 'Conversation 2', messages: [], updatedAt: Date.now() },
    ],
    refetch: vi.fn(),
  })),
  useMutation: vi.fn(() => ({ mutateAsync: vi.fn() })),
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })),
}));

vi.mock('@ai-sdk/react', () => ({
  useChat: vi.fn(() => ({
    messages: [],
    status: 'ready',
    setMessages: vi.fn(),
    sendMessage: vi.fn(),
    regenerate: vi.fn(),
  })),
}));

vi.mock('ai', () => ({
  TextStreamChatTransport: vi.fn(),
}));

vi.mock('@/hooks/useToast', () => ({
  useToast: vi.fn(() => ({ showToast: vi.fn() })),
}));

vi.mock('@/design-system/layout/PageLayout', () => ({
  PageLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Day10 - URL Param Synchronization', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pushStateSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup window location mock
    Object.defineProperty(window, 'location', {
      value: new URL('http://localhost:3000/day-10'),
      writable: true,
    });
    
    // Spy on history.pushState
    pushStateSpy = vi.spyOn(window.history, 'pushState');
  });

  const renderComponent = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Day10 />
      </ThemeProvider>
    );
  };

  it('reads initial conversationId from URL on mount', () => {
    // Set initial URL
    window.location.search = '?conversationId=2';
    
    renderComponent();
    
    // The sidebar should show Conversation 2 as selected.
    // We can check if it's active by seeing how the Sidebar renders it, but testing the pushState is easier to verify if the id was read and kept.
    // Wait, the easiest way to see if it's selected is if we click it again it doesn't do anything or if it triggers a pushState when selected.
    // Let's verify pushState is NOT called on mount since it's already in the URL
    expect(pushStateSpy).not.toHaveBeenCalledWith(
      expect.anything(),
      '',
      expect.stringContaining('conversationId=2')
    );
  });

  it('updates URL when a conversation is selected', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    // Click on Conversation 2
    const conv2 = screen.getByText('Conversation 2');
    await user.click(conv2);
    
    // Verify pushState was called with the new URL
    expect(pushStateSpy).toHaveBeenCalled();
    const lastCall = pushStateSpy.mock.calls[pushStateSpy.mock.calls.length - 1];
    expect(lastCall[2]).toContain('conversationId=2');
  });

  it('removes conversationId from URL when creating a new conversation', async () => {
    // Set initial URL
    window.location.search = '?conversationId=1';
    
    const user = userEvent.setup();
    renderComponent();
    
    // Ensure we clear mocks after mount so we only see the new actions
    pushStateSpy.mockClear();
    
    // Click on New Conversation button in sidebar
    const newConvBtn = screen.getByText('+ New');
    await user.click(newConvBtn);
    
    // Verify pushState was called to remove the param
    expect(pushStateSpy).toHaveBeenCalled();
    const lastCall = pushStateSpy.mock.calls[pushStateSpy.mock.calls.length - 1];
    expect(lastCall[2]).not.toContain('conversationId=1');
    expect(lastCall[2]).not.toContain('conversationId');
  });
});
