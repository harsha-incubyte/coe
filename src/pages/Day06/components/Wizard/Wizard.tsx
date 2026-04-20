import React, { memo } from 'react';
import { useWizard, useWizardActions } from './useWizard';
import { useWizardState, useWizardDispatch, WIZARD_STEPS } from './WizardContext';
import { WizardProvider } from './WizardProvider';
import { Wizard as GenericWizard, WizardStep } from '@/components/Wizard';
import { Button, Input } from '@/design-system/atoms';
import { StepIndicator as MoleculeStepIndicator } from '@/design-system/molecules';
import * as S from './Wizard.styles';

const StepIndicator: React.FC = () => {
  const { steps, currentStepIndex } = useWizard();
  const formattedSteps = steps.map(s => ({ label: s }));

  return (
    <div style={{ marginBottom: '2rem' }}>
      <MoleculeStepIndicator 
        steps={formattedSteps} 
        activeIndex={currentStepIndex} 
      />
    </div>
  );
};

// PERFORMANCE PROOF COMPONENT
const NextButton = memo(() => {
  const { next } = useWizardActions();
  console.log('NextButton rendered');

  return (
    <Button 
      variant="primary"
      onClick={next}
    >
      Next Step
    </Button>
  );
});

const PrevButton: React.FC = () => {
  const { isFirstStep, prev } = useWizard();

  if (isFirstStep) return null;

  return (
    <Button 
      variant="secondary"
      onClick={prev}
    >
      Previous
    </Button>
  );
};

const ScanStep: React.FC = () => {
  const { deviceId } = useWizardState();
  const dispatch = useWizardDispatch();

  return (
    <S.StepContent>
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
    </S.StepContent>
  );
};

const NetworkStep: React.FC = () => {
  const { networkConfig } = useWizardState();
  const dispatch = useWizardDispatch();

  return (
    <S.StepContent>
      <h2>Network Settings</h2>
      <Input
        label="SSID"
        type="text"
        value={networkConfig.ssid}
        onChange={(e) => dispatch({ type: 'SET_NETWORK_CONFIG', payload: { ssid: e.target.value } })}
        fullWidth
      />
    </S.StepContent>
  );
};

const ConfigureStep: React.FC = () => (
  <S.StepContent>
    <h2>Configuration</h2>
    <p>Applying settings to selected device...</p>
    <S.MockProgressBar>
      <S.ProgressFill $width="65%" />
    </S.MockProgressBar>
  </S.StepContent>
);

const TestStep: React.FC = () => (
  <S.StepContent>
    <h2>Test Connection</h2>
    <S.StatusSuccess>✓ Device connected successfully!</S.StatusSuccess>
  </S.StepContent>
);

const WizardContent: React.FC = () => {
  return (
    <S.WizardContainer>
      <StepIndicator />
      <div className="wizard-body">
        <WizardStep index={0}><ScanStep /></WizardStep>
        <WizardStep index={1}><NetworkStep /></WizardStep>
        <WizardStep index={2}><ConfigureStep /></WizardStep>
        <WizardStep index={3}><TestStep /></WizardStep>
      </div>

      <S.WizardFooter>
        <PrevButton />
        <NextButtonWrapper />
      </S.WizardFooter>
    </S.WizardContainer>
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


