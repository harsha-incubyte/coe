import React, { memo } from 'react';
import { useWizardState, useWizardDispatch } from './WizardContext';
import type { WizardStep } from './WizardContext';
import { WizardProvider } from './WizardProvider';
import './Wizard.css';

const StepIndicator: React.FC = () => {
  const { step } = useWizardState();
  const steps: WizardStep[] = ['SCAN', 'NETWORK', 'CONFIGURE', 'TEST'];

  return (
    <div className="wizard-stepper">
      {steps.map((s, i) => (
        <div 
          key={s} 
          className={`step-item ${step === s ? 'active' : ''} ${steps.indexOf(step) > i ? 'completed' : ''}`}
        >
          <span className="step-number">{i + 1}</span>
          <span className="step-label">{s}</span>
        </div>
      ))}
    </div>
  );
};

// PERFORMANCE PROOF COMPONENT
// This button only consumes Dispatch, so it should NOT re-render when state strings change.
const NextButton = memo(() => {
  const dispatch = useWizardDispatch();
  console.log('NextButton rendered'); // The performance proof

  return (
    <button 
      className="wizard-btn primary"
      onClick={() => dispatch({ type: 'NEXT_STEP' })}
    >
      Next Step
    </button>
  );
});

const PrevButton: React.FC = () => {
  const { step } = useWizardState();
  const dispatch = useWizardDispatch();

  if (step === 'SCAN') return null;

  return (
    <button 
      className="wizard-btn secondary"
      onClick={() => dispatch({ type: 'PREV_STEP' })}
    >
      Previous
    </button>
  );
};

const ScanStep: React.FC = () => {
  const { deviceId } = useWizardState();
  const dispatch = useWizardDispatch();

  return (
    <div className="wizard-step-content">
      <h2>Scan for Devices</h2>
      <p>Enter the Device ID found on your hardware sticker.</p>
      <input 
        type="text" 
        placeholder="e.g. DEV-8821" 
        value={deviceId}
        onChange={(e) => dispatch({ type: 'SET_DEVICE_ID', payload: e.target.value })}
        className="wizard-input"
      />
    </div>
  );
};

const NetworkStep: React.FC = () => {
  const { networkConfig } = useWizardState();
  const dispatch = useWizardDispatch();

  return (
    <div className="wizard-step-content">
      <h2>Network Settings</h2>
      <div className="form-group">
        <label>SSID</label>
        <input 
          type="text" 
          value={networkConfig.ssid}
          onChange={(e) => dispatch({ type: 'SET_NETWORK_CONFIG', payload: { ssid: e.target.value } })}
          className="wizard-input"
        />
      </div>
    </div>
  );
};

const ConfigureStep: React.FC = () => (
  <div className="wizard-step-content">
    <h2>Configuration</h2>
    <p>Applying settings to selected device...</p>
    <div className="mock-progress-bar">
      <div className="progress-fill" style={{ width: '65%' }}></div>
    </div>
  </div>
);

const TestStep: React.FC = () => (
  <div className="wizard-step-content">
    <h2>Test Connection</h2>
    <p className="status-success">✓ Device connected successfully!</p>
  </div>
);

const WizardContent: React.FC = () => {
  const { step } = useWizardState();

  const renderStep = () => {
    switch (step) {
      case 'SCAN': return <ScanStep />;
      case 'NETWORK': return <NetworkStep />;
      case 'CONFIGURE': return <ConfigureStep />;
      case 'TEST': return <TestStep />;
      default: return null;
    }
  };

  return (
    <div className="wizard-container">
      <StepIndicator />
      <div className="wizard-body">
        {renderStep()}
      </div>
      <div className="wizard-footer">
        <PrevButton />
        {step !== 'TEST' && <NextButton />}
      </div>
    </div>
  );
};

export const Wizard: React.FC = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};
