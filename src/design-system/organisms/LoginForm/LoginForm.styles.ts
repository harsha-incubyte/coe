import styled, { css } from 'styled-components';
import { theme } from '@/design-system/theme';

export const LoginBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin: ${({ theme }) => theme.spacing.xl} auto;
`;

export const LoginFormContainer = styled.form.attrs({ className: 'login-form' })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

interface MessageProps {
  $variant: 'error' | 'success';
}

export const Message = styled.div<MessageProps>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${({ $variant, theme }) =>
    $variant === 'error'
      ? css`
          background: ${theme.colors.error}1a;
          border: 1px solid ${theme.colors.error}33;
          color: ${theme.colors.error};
        `
      : css`
          background: ${theme.colors.success}1a;
          border: 1px solid ${theme.colors.success}33;
          color: ${theme.colors.success};
        `}
`;

LoginBox.defaultProps = { theme };
LoginFormContainer.defaultProps = { theme };
Message.defaultProps = { theme };
