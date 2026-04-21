import React, { useReducer } from 'react';
import type { ReactNode } from 'react';
import { StateContext, DispatchContext, wizardReducer, initialState } from './WizardContext';

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
