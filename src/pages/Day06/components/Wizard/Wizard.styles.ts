import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const WizardContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;
WizardContainer.defaultProps = { theme };

export const StepContent = styled.div`
  min-height: 200px;
  text-align: center;

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;
StepContent.defaultProps = { theme };

export const WizardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
WizardFooter.defaultProps = { theme };

export const MockProgressBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: 2rem;
  overflow: hidden;
`;
MockProgressBar.defaultProps = { theme };

export const ProgressFill = styled.div<{ $width: string }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary[500]};
  width: ${({ $width }) => $width};
  transition: width 0.5s ease;
`;
ProgressFill.defaultProps = { theme };

export const StatusSuccess = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
StatusSuccess.defaultProps = { theme };
