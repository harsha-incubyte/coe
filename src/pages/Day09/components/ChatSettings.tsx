import React from 'react';
import { SettingsPanel } from '../Day09.styles';

interface ChatSettingsProps {
  errorRate: number;
  onErrorRateChange: (rate: number) => void;
}

export const ChatSettings: React.FC<ChatSettingsProps> = ({ errorRate, onErrorRateChange }) => {
  return (
    <SettingsPanel>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>Simulation Settings</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px' }}>Simulate Network Errors</span>
        <input 
          type="checkbox" 
          checked={errorRate > 0} 
          onChange={(e) => onErrorRateChange(e.target.checked ? 0.3 : 0)} 
          aria-label="Toggle network error simulation"
        />
      </div>
      
      <div style={{ fontSize: '12px', color: 'var(--colors-text-tertiary)' }}>
        Enable to randomly fail sending messages and test the Resend feature.
      </div>
    </SettingsPanel>
  );
};
