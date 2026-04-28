/**
 * Utility for token estimation and cost calculation
 */

export interface ModelPricing {
  promptCostPer1k: number;
  completionCostPer1k: number;
}

// Pricing based on approximate current rates (USD)
export const MODEL_PRICING: Record<string, ModelPricing> = {
  'local-gemma': { promptCostPer1k: 0, completionCostPer1k: 0 },
  'gemini-1.5-flash': { promptCostPer1k: 0.000125, completionCostPer1k: 0.000375 },
  'gemini-1.5-pro': { promptCostPer1k: 0.0035, completionCostPer1k: 0.0105 },
  'gpt-4o': { promptCostPer1k: 0.005, completionCostPer1k: 0.015 },
};

/**
 * Estimates the number of tokens in a string using a simple character-based heuristic.
 * 1 token is approximately 4 characters for English text.
 */
export const estimateTokens = (text: string): number => {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
};

/**
 * Calculates the cost of a message based on token counts and model pricing.
 */
export const calculateCost = (
  promptTokens: number | null | undefined, 
  completionTokens: number | null | undefined, 
  model: string | null | undefined
): number => {
  if (!promptTokens && !completionTokens) return 0;
  
  const selectedModel = model || 'local-gemma';
  const pricing = MODEL_PRICING[selectedModel] || MODEL_PRICING['local-gemma'];
  
  const pTokens = promptTokens || 0;
  const cTokens = completionTokens || 0;
  
  const promptCost = (pTokens / 1000) * pricing.promptCostPer1k;
  const completionCost = (cTokens / 1000) * pricing.completionCostPer1k;
  
  return promptCost + completionCost;
};

/**
 * Formats a cost value in USD.
 */
export const formatCost = (cost: number): string => {
  if (cost === 0) return '$0.00';
  if (cost < 0.0001) return '< $0.0001';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  }).format(cost);
};
