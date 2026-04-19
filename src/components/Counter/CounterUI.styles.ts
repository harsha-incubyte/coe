import styled, { keyframes } from 'styled-components';
import { theme } from '@/design-system/theme';

export const countChange = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.05), rgba(170, 59, 255, 0.15));
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid rgba(192, 132, 252, 0.5); /* Matching var(--accent-border) */
  margin: 2rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.25) 0 25px 30px -5px, rgba(0, 0, 0, 0.15) 0 12px 15px -8px;
  }
`;

export const CounterTitle = styled.h2`
  color: ${({ theme }) => theme.colors.accent[400]};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.05em;
  margin-top: 0;
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
`;

export const CounterButton = styled.button<{ $variant?: 'increment' | 'decrement' | 'reset' }>`
  flex: 1;
  padding: 1.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  color: white;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'decrement':
        return `
          background: #ef4444;
          &:hover {
            background: #dc2626;
            box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.4);
          }
        `;
      case 'increment':
        return `
          background: ${theme.colors.accent[600]};
          &:hover {
            filter: brightness(1.1);
            box-shadow: 0 10px 15px -3px rgba(170, 59, 255, 0.4);
          }
        `;
      case 'reset':
      default:
        return `
          background: ${theme.colors.neutral[600]};
          &:hover {
            background: ${theme.colors.neutral[700]};
          }
        `;
    }
  }}

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Set defaultProps for all components to ensure they work in tests without ThemeProvider
CounterContainer.defaultProps = { theme };
CounterTitle.defaultProps = { theme };
CounterDisplay.defaultProps = { theme };
ControlsContainer.defaultProps = { theme };
ResetContainer.defaultProps = { theme };
CounterButton.defaultProps = { theme };
