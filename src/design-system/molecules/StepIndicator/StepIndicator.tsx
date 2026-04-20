import React from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export interface Step {
  label: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  activeIndex: number;
  className?: string;
}

const StepperContainer = styled.ol`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
  gap: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '';
    position: absolute;
    top: 1.25rem;
    left: 2rem;
    right: 2rem;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    z-index: 0;
  }
`;
StepperContainer.defaultProps = { theme };

const StepItem = styled.li<{ $status: 'pending' | 'active' | 'completed' }>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;
StepItem.defaultProps = { theme };

const StepCircle = styled.div<{ $status: 'pending' | 'active' | 'completed' }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $status }) => 
    $status === 'pending' ? theme.colors.surface : 
    $status === 'active' ? theme.colors.primary[500] : 
    theme.colors.success};
  border: 2px solid ${({ theme, $status }) => 
    $status === 'pending' ? theme.colors.border : 
    $status === 'active' ? theme.colors.primary[500] : 
    theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $status }) => ($status === 'active' || $status === 'completed' ? 'white' : theme.colors.textSecondary)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  transition: all 0.3s ease-in-out;
`;
StepCircle.defaultProps = { theme };

const StepLabel = styled.span<{ $status: 'pending' | 'active' | 'completed' }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme, $status }) => ($status === 'active' ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium)};
  color: ${({ theme, $status }) => ($status === 'pending' ? theme.colors.textSecondary : theme.colors.text)};
  text-align: center;
  max-width: 100px;
`;
StepLabel.defaultProps = { theme };

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, activeIndex, className }) => {
  return (
    <StepperContainer className={className}>
      {steps.map((step, index) => {
        const status = index < activeIndex ? 'completed' : index === activeIndex ? 'active' : 'pending';
        return (
          <StepItem 
            key={step.label} 
            $status={status}
            role="listitem"
            aria-current={status === 'active' ? 'step' : undefined}
            data-status={status}
          >
            <StepCircle $status={status}>
              {status === 'completed' ? '✓' : index + 1}
            </StepCircle>
            <StepLabel $status={status}>{step.label}</StepLabel>
          </StepItem>
        );
      })}
    </StepperContainer>
  );
};

StepIndicator.displayName = 'StepIndicator';
