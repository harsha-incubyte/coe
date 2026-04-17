import { createContext, useContext } from 'react';

export interface WizardContextType {
  currentStepIndex: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  progress: number;
  totalSteps: number;
}

export const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a Wizard component');
  }
  return context;
};
