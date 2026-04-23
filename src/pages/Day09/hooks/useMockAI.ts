import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from './useChatState';

interface UseMockAIProps {
  conversationId: string;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessageContent: (conversationId: string, messageId: string, content: string | ((prev: string) => string)) => void;
}

const MEDICAL_RESPONSES = [
  "Based on the symptoms you've described, it is advisable to consult a healthcare professional. However, typical management includes rest, hydration, and over-the-counter anti-inflammatory medication.",
  "I understand your concern. While I am an AI and cannot diagnose, these signs often point towards a mild viral infection. Please monitor your temperature.",
  "That is an interesting question. In medical science, this condition is typically evaluated using a combination of blood tests and imaging.",
  "Please remember that this information is for educational purposes only and not a substitute for professional medical advice. Always seek the advice of your physician.",
  "Common side effects of that medication can include nausea, dizziness, and fatigue. If these persist, contact your prescribing doctor immediately."
];

export const useMockAI = ({ conversationId, addMessage, updateMessageContent }: UseMockAIProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [errorRate, setErrorRate] = useState(0); // 0 to 1
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const simulateResponse = useCallback(() => {
    // 1. Check for random simulated error for the user message (if we wanted to fail sending user messages, but let's assume user message already sent, maybe we fail the AI response?)
    // Actually, user message sending failure makes more sense to test 'Resend'.
    // We will handle user message sending in the component. This hook just does the AI part.
    
    setIsTyping(true);

    const typingDelay = setTimeout(() => {
      setIsTyping(false);
      
      const assistantMessageId = uuidv4();
      const newMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        status: 'sent',
      };
      
      addMessage(conversationId, newMessage);

      // Select a random response
      const fullResponse = MEDICAL_RESPONSES[Math.floor(Math.random() * MEDICAL_RESPONSES.length)];
      const words = fullResponse.split(' ');
      let currentWordIndex = 0;

      const streamNextWord = () => {
        if (currentWordIndex < words.length) {
          const word = words[currentWordIndex];
          updateMessageContent(conversationId, assistantMessageId, (prev) => prev ? `${prev} ${word}` : word);
          currentWordIndex++;
          
          const nextDelay = Math.random() * 50 + 30; // Random delay between 30-80ms per word
          const streamTimeout = setTimeout(streamNextWord, nextDelay);
          timeoutRefs.current.push(streamTimeout);
        }
      };

      const streamTimeout = setTimeout(streamNextWord, 50);
      timeoutRefs.current.push(streamTimeout);

    }, 1500 + Math.random() * 1000); // 1.5 - 2.5s thinking time

    timeoutRefs.current.push(typingDelay);

  }, [conversationId, addMessage, updateMessageContent]);

  return {
    isTyping,
    simulateResponse,
    clearTimeouts,
    errorRate,
    setErrorRate
  };
};
