import { useState, useCallback } from 'react';

/**
 * A generic hook to manage indexed step navigation behavior.
 * Completely detached from any specific domain or UI strings.
 */
export function useStepNavigation(totalSteps: number, initialStep = 0) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalSteps) {
      setCurrentStepIndex(index);
    }
  }, [totalSteps]);

  const next = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === totalSteps - 1;
  const progress = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

  return {
    currentStepIndex,
    goTo,
    next,
    prev,
    isFirst,
    isLast,
    progress,
    totalSteps
  };
}
