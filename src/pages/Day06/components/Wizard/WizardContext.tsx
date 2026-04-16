import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';

export type WizardStep = 'SCAN' | 'NETWORK' | 'CONFIGURE' | 'TEST';

export interface WizardState {
  step: WizardStep;
  deviceId: string;
  networkConfig: {
    ssid: string;
    security: string;
  };
}

export type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_DEVICE_ID'; payload: string }
  | { type: 'SET_NETWORK_CONFIG'; payload: Partial<WizardState['networkConfig']> }
  | { type: 'RESET' };

export const initialState: WizardState = {
  step: 'SCAN',
  deviceId: '',
  networkConfig: {
    ssid: '',
    security: 'WPA2'
  }
};

export const wizardReducer = (state: WizardState, action: WizardAction): WizardState => {
  switch (action.type) {
    case 'NEXT_STEP':
      if (state.step === 'SCAN') return { ...state, step: 'NETWORK' };
      if (state.step === 'NETWORK') return { ...state, step: 'CONFIGURE' };
      if (state.step === 'CONFIGURE') return { ...state, step: 'TEST' };
      return state;
    case 'PREV_STEP':
      if (state.step === 'NETWORK') return { ...state, step: 'SCAN' };
      if (state.step === 'CONFIGURE') return { ...state, step: 'NETWORK' };
      if (state.step === 'TEST') return { ...state, step: 'CONFIGURE' };
      return state;
    case 'SET_DEVICE_ID':
      return { ...state, deviceId: action.payload };
    case 'SET_NETWORK_CONFIG':
      return {
        ...state,
        networkConfig: { ...state.networkConfig, ...action.payload }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const StateContext = createContext<WizardState | undefined>(undefined);
export const DispatchContext = createContext<Dispatch<WizardAction> | undefined>(undefined);

export const useWizardState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useWizardState must be used within a WizardProvider');
  }
  return context;
};

export const useWizardDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useWizardDispatch must be used within a WizardProvider');
  }
  return context;
};
