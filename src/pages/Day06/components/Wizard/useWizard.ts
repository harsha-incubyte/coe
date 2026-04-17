import { useWizardContext } from '@/components/Wizard';



import { WIZARD_STEPS } from './WizardContext';
import type { WizardStep } from './WizardContext';

/**
 * Day 06 specific bridge between the generic Wizard component 
 * and the specific step names/domain.
 */
export const useWizard = () => {
  const context = useWizardContext();
  const { currentStepIndex } = context;

  const step = WIZARD_STEPS[currentStepIndex];

  const getStepStatus = (stepName: WizardStep) => {
    const stepIndex = WIZARD_STEPS.indexOf(stepName);
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'active';
    return 'upcoming';
  };

  return {
    ...context,
    step,
    getStepStatus,
    steps: WIZARD_STEPS,
    isFirstStep: context.isFirst,
    isLastStep: context.isLast,
  };
};


/**
 * Day06 version of stable actions (using the generic ones).
 */
export const useWizardActions = () => {
  const { next, prev } = useWizardContext();
  return { next, prev };
};
