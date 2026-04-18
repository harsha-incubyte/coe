import React, { memo } from 'react';
import { useWizard, useWizardActions } from './useWizard';
import { useWizardState, useWizardDispatch, WIZARD_STEPS } from './WizardContext';
import { WizardProvider } from './WizardProvider';
import { Wizard as GenericWizard, WizardStep } from '@/components/Wizard';
import { Input } from '@/design-system/atoms/Input';
import './Wizard.css';

const StepIndicator: React.FC = () => {
  const { steps, getStepStatus } = useWizard();

  return (
    <div className="wizard-stepper">
      {steps.map((s, i) => (
        <div 
          key={s} 
          className={`step-item ${getStepStatus(s)}`}
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
  const { next } = useWizardActions();
  console.log('NextButton rendered'); // The performance proof

  return (
    <button 
      className="wizard-btn primary"
      onClick={next}
    >
      Next Step
    </button>
  );
});


const PrevButton: React.FC = () => {
  const { isFirstStep, prev } = useWizard();

  if (isFirstStep) return null;

  return (
    <button 
      className="wizard-btn secondary"
      onClick={prev}
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
      <Input
        label="Device ID"
        hideLabel
        type="text"
        placeholder="e.g. DEV-8821"
        value={deviceId}
        onChange={(e) => dispatch({ type: 'SET_DEVICE_ID', payload: e.target.value })}
        fullWidth
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
      <Input
        label="SSID"
        type="text"
        value={networkConfig.ssid}
        onChange={(e) => dispatch({ type: 'SET_NETWORK_CONFIG', payload: { ssid: e.target.value } })}
        fullWidth
      />
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
  return (
    <div className="wizard-container">
      <StepIndicator />
      <div className="wizard-body">
        <WizardStep index={0}><ScanStep /></WizardStep>
        <WizardStep index={1}><NetworkStep /></WizardStep>
        <WizardStep index={2}><ConfigureStep /></WizardStep>
        <WizardStep index={3}><TestStep /></WizardStep>
      </div>


      <div className="wizard-footer">
        <PrevButton />
        <NextButtonWrapper />
      </div>
    </div>
  );
};


const NextButtonWrapper: React.FC = () => {
  const { isLastStep } = useWizard();
  if (isLastStep) return null;
  return <NextButton />;
};

export const DeviceConfigurationWizard: React.FC = () => {
  return (
    <WizardProvider>
      <GenericWizard totalSteps={WIZARD_STEPS.length}>
        <WizardContent />
      </GenericWizard>
    </WizardProvider>
  );
};


