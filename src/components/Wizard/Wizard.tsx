import React, { useMemo } from 'react';
import { useStepNavigation } from '@/hooks/useWizard/useStepNavigation';

import { WizardContext } from './WizardContext';

interface WizardProps {
  totalSteps: number;
  initialStep?: number;
  children: React.ReactNode;
  className?: string;
  onStepChange?: (index: number) => void;
}

/**
 * A generic, headless-first Wizard component that manages step state.
 */
const Wizard: React.FC<WizardProps> = ({ totalSteps, initialStep = 0, children, className, onStepChange }) => {
  const navigation = useStepNavigation(totalSteps, initialStep);

  const goTo = useMemo(() => (index: number) => {
    navigation.goTo(index);
    onStepChange?.(index);
  }, [navigation, onStepChange]);

  const contextValue = useMemo(() => ({
    ...navigation,
    goTo
  }), [navigation, goTo]);

  return (
    <WizardContext.Provider value={contextValue}>
      <div className={`wizard-base ${className || ''}`}>
        {children}
      </div>
    </WizardContext.Provider>
  );
};

export default Wizard;


