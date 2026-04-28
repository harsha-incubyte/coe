import { LanguageModelV3 } from '@ai-sdk/provider';

// Strict mapping of supported models
export const SUPPORTED_MODELS = ['local-gemma', 'openai', 'anthropic'] as const;
export type SupportedModel = typeof SUPPORTED_MODELS[number];

export interface LLMProviderAdapter {
  id: SupportedModel;
  // Returns the actual Vercel AI SDK LanguageModel instance
  getModel: () => LanguageModelV3;
  // Performs a health check (e.g., pinging a /health or /models endpoint or checking keys)
  isHealthy: () => Promise<boolean>;
  // Whether the provider supports the 'system' role
  supportsSystemRole?: boolean;
}
