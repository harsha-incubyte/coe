import { LanguageModelV1 } from '@ai-sdk/provider';
import { SUPPORTED_MODELS, SupportedModel, LLMProviderAdapter } from './types';
import { gemmaAdapter, openaiAdapter, anthropicAdapter } from './providers';

const providers: Record<SupportedModel, LLMProviderAdapter> = {
  'local-gemma': gemmaAdapter,
  'openai': openaiAdapter,
  'anthropic': anthropicAdapter,
};

// Prioritized list for failover
const FALLBACK_ORDER: SupportedModel[] = ['local-gemma', 'openai', 'anthropic'];

export async function getLLMProvider(requestedModelStr: string): Promise<LanguageModelV1> {
  let targetModel = requestedModelStr as SupportedModel;
  
  // 1. Strict Validation
  if (!SUPPORTED_MODELS.includes(targetModel)) {
    console.warn(`Requested model '${requestedModelStr}' is not mapped. Defaulting to 'local-gemma'.`);
    targetModel = 'local-gemma';
  }

  // 2. Health Check Primary
  const primaryProvider = providers[targetModel];
  if (await primaryProvider.isHealthy()) {
    return primaryProvider.getModel();
  }

  // 3. Failover Strategy
  console.warn(`Provider '${targetModel}' is unhealthy. Initiating failover...`);
  for (const fallback of FALLBACK_ORDER) {
    if (fallback !== targetModel) {
      const fallbackProvider = providers[fallback];
      if (await fallbackProvider.isHealthy()) {
        console.log(`Successfully failed over to '${fallback}'`);
        return fallbackProvider.getModel();
      }
    }
  }

  throw new Error('Critical Error: No healthy LLM providers available.');
}
