import React from 'react';
import { useWizardContext } from './WizardContext';

export const WizardStep: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => {
  const { currentStepIndex } = useWizardContext();
  if (currentStepIndex !== index) return null;
  return <>{children}</>;
};
