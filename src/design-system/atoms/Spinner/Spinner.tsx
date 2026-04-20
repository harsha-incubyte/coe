import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/design-system/theme';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

const StyledSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-left-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: ${spin} 1s linear infinite;
`;
StyledSpinner.defaultProps = { theme };

export const Spinner: React.FC = () => {
  return (
    <SpinnerContainer role="status" aria-label="loading">
      <StyledSpinner />
    </SpinnerContainer>
  );
};
