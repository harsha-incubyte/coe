import React, { useId, type InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  hideLabel?: boolean;
}

const InputContainer = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;


const StyledLabel = styled.label<{ $hideLabel?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  ${({ $hideLabel }) =>
    $hideLabel &&
    css`
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `}
`;

const InputWrapper = styled.div<{ $error?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.primary[500])};
    box-shadow: 0 0 0 3px ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.primary[500])}40;
  }

  &:hover:not(:focus-within) {
    border-color: ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.primary[400])};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Message = styled.p<{ $variant: 'error' | 'helper' }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, $variant }) => ($variant === 'error' ? theme.colors.error : theme.colors.textSecondary)};
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, hideLabel = false, id: providedId, ...props }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const describedBy = [
      error ? errorId : '',
      helperText ? helperId : ''
    ].filter(Boolean).join(' ');

    return (
      <InputContainer $fullWidth={fullWidth}>
        <StyledLabel htmlFor={id} $hideLabel={hideLabel}>
          {label}
          {props.required && <span aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>*</span>}
        </StyledLabel>
        <InputWrapper $error={!!error}>
          <StyledInput
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            aria-required={props.required}
            {...props}
          />
        </InputWrapper>
        {error && (
          <Message id={errorId} $variant="error" role="alert">
            {error}
          </Message>
        )}
        {helperText && !error && (
          <Message id={helperId} $variant="helper">
            {helperText}
          </Message>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';
