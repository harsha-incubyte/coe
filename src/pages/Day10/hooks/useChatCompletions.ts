import { useState, useCallback, useRef } from 'react';

export interface ChatUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export const useChatCompletions = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<ChatUsage | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateCompletion = useCallback(async (
    messages: { role: string; content: string }[],
    onChunk: (chunk: string) => void,
    onUsage?: (usage: ChatUsage) => void
  ) => {
    setIsGenerating(true);
    setError(null);
    abortControllerRef.current = new AbortController();

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount <= maxRetries) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Rate limit exceeded');
          }
          throw new Error(`API error: ${response.status}`);
        }

        if (!response.body) {
          throw new Error('ReadableStream not supported by the browser.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep the incomplete line in the buffer

          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.choices?.[0]?.delta?.content) {
                  onChunk(data.choices[0].delta.content);
                }

                if (data.usage) {
                  setUsage(data.usage);
                  onUsage?.(data.usage);
                }
              } catch (e) {
                console.warn('Failed to parse SSE line', line);
              }
            }
          }
        }
        
        // Success, break out of retry loop
        break;
        
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('Generation aborted');
          break;
        }
        
        retryCount++;
        if (retryCount > maxRetries) {
          setError(err.message || 'An unexpected error occurred');
          throw err;
        }
        
        // Exponential backoff
        const backoff = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, backoff));
      }
    }

    setIsGenerating(false);
  }, []);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    generateCompletion,
    isGenerating,
    error,
    usage,
    abort
  };
};
