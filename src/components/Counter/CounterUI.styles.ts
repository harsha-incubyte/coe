import styled, { keyframes } from 'styled-components';
import { theme } from '@/design-system/theme';
import { Button } from '@/design-system/atoms';

export const countChange = keyframes`
  0% { transform: scale(0.9); opacity: 0.7; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

export const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  background: linear-gradient(
    135deg, 
    ${({ theme }) => `${theme.colors.accent[300]}0d`}, 
    ${({ theme }) => `${theme.colors.accent[500]}26`}
  );
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => `${theme.colors.accent[400]}80`};
  margin: 2rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

export const CounterDisplay = styled.div`
  font-size: 6rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral[50]};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  margin-bottom: 2.5rem;
  min-width: 200px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  span {
    display: inline-block;
    animation: ${countChange} 0.2s ease-out;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
`;

export const ResetContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  margin-top: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

export const AnimatedButton = styled(Button)`
  flex: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

// Set defaultProps for all components
CounterContainer.defaultProps = { theme };
CounterDisplay.defaultProps = { theme };
ControlsContainer.defaultProps = { theme };
ResetContainer.defaultProps = { theme };
AnimatedButton.defaultProps = { theme };

