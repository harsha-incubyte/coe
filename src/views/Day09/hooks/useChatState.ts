import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type MessageRole = 'user' | 'assistant';
export type MessageStatus = 'sent' | 'delivering' | 'error';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

const STORAGE_KEY = 'medical_chat_conversations';
const CURRENT_CONVO_KEY = 'medical_chat_current_convo';

export const useChatState = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window === 'undefined') return [
      {
        id: uuidv4(),
        title: 'New Consultation',
        messages: [],
        updatedAt: Date.now(),
      },
    ];

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored conversations', e);
    }
    // Return initial conversation if none exist
    return [
      {
        id: uuidv4(),
        title: 'New Consultation',
        messages: [],
        updatedAt: Date.now(),
      },
    ];
  });

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CURRENT_CONVO_KEY) || null;
  });

  // Persist conversations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  // Persist current conversation ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentConversationId) {
        localStorage.setItem(CURRENT_CONVO_KEY, currentConversationId);
      } else {
        localStorage.removeItem(CURRENT_CONVO_KEY);
      }
    }
  }, [currentConversationId]);

  // Sync currentConversationId if it's invalid or missing
  useEffect(() => {
    if (conversations.length > 0) {
      const isValid = currentConversationId && conversations.some(c => c.id === currentConversationId);
      if (!isValid) {
        const timer = setTimeout(() => {
          setCurrentConversationId(conversations[0].id);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [conversations, currentConversationId]);

  // Deriving the active conversation ID to ensure it's always valid
  const activeConversationId = (currentConversationId && conversations.find(c => c.id === currentConversationId))
    ? currentConversationId
    : (conversations[0]?.id || null);

  const currentConversation = conversations.find((c) => c.id === activeConversationId) || null;

  const addMessage = useCallback((conversationId: string, message: Message) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        const isFirstUserMessage = c.messages.length === 0 && message.role === 'user';
        return {
          ...c,
          title: isFirstUserMessage ? message.content.slice(0, 30) + '...' : c.title,
          messages: [...c.messages, message],
          updatedAt: Date.now(),
        };
      })
    );
  }, []);

  const updateMessageStatus = useCallback((conversationId: string, messageId: string, status: MessageStatus) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: c.messages.map((m) => (m.id === messageId ? { ...m, status } : m)),
        };
      })
    );
  }, []);

  const updateMessageContent = useCallback((conversationId: string, messageId: string, content: string | ((prev: string) => string)) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: c.messages.map((m) => {
            if (m.id === messageId) {
              const newContent = typeof content === 'function' ? content(m.content) : content;
              return { ...m, content: newContent };
            }
            return m;
          }),
        };
      })
    );
  }, []);

  const createNewConversation = useCallback(() => {
    const newConvo: Conversation = {
      id: uuidv4(),
      title: 'New Consultation',
      messages: [],
      updatedAt: Date.now(),
    };
    setConversations((prev) => [newConvo, ...prev]);
    setCurrentConversationId(newConvo.id);
  }, []);

  return {
    conversations,
    currentConversation,
    currentConversationId: currentConversation?.id || null,
    setCurrentConversationId,
    createNewConversation,
    addMessage,
    updateMessageStatus,
    updateMessageContent,
  };
};
