import { createOpenAI } from '@ai-sdk/openai';
import { LLMProviderAdapter } from '../types';

export const gemmaAdapter: LLMProviderAdapter = {
  id: 'local-gemma',
  
  getModel: () => {
    const localOpenAI = createOpenAI({
      baseURL: process.env.LOCAL_LLM_URL || 'http://localhost:4000/v1',
      apiKey: 'not-needed',
    });
    // The exact model string might differ based on the MLX server, typically "gemma-2-9b"
    return localOpenAI.chat('mlx-community/gemma-2-9b-it-4bit');
  },

  isHealthy: async () => {
    try {
      const baseUrl = process.env.LOCAL_LLM_URL || 'http://localhost:4000/v1';
      // Attempting to hit the /models endpoint to check if the server is running and responsive
      const res = await fetch(`${baseUrl}/models`, {
        method: 'GET',
        // Small timeout so it doesn't hang forever if the server is down
        signal: AbortSignal.timeout(2000), 
      });
      return res.ok;
    } catch (err) {
      console.warn('Local Gemma health check failed:', err);
      return false;
    }
  }
};
