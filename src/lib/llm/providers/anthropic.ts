import { anthropic } from '@ai-sdk/anthropic';
import { LLMProviderAdapter } from '../types';

export const anthropicAdapter: LLMProviderAdapter = {
  id: 'anthropic',
  
  getModel: () => {
    // Uses process.env.ANTHROPIC_API_KEY by default
    return anthropic('claude-3-5-sonnet-20240620');
  },

  isHealthy: async () => {
    // If there is no API key configured, this provider is effectively unhealthy/unavailable
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('Anthropic health check failed: Missing ANTHROPIC_API_KEY');
      return false;
    }
    return true;
  }
};
