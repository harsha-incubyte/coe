import { openai } from '@ai-sdk/openai';
import { LLMProviderAdapter } from '../types';

export const openaiAdapter: LLMProviderAdapter = {
  id: 'openai',
  
  getModel: () => {
    // Uses process.env.OPENAI_API_KEY by default
    return openai('gpt-4o');
  },

  isHealthy: async () => {
    // If there is no API key configured, this provider is effectively unhealthy/unavailable
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI health check failed: Missing OPENAI_API_KEY');
      return false;
    }
    return true;
  },
  supportsSystemRole: true
};
