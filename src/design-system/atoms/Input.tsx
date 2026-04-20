import React from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';
import { FormGroup } from '@/design-system/molecules/FormGroup';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  hideLabel?: boolean;
}

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
InputWrapper.defaultProps = { theme };

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
StyledInput.defaultProps = { theme };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, hideLabel = false, id, ...props }, ref) => {
    return (
      <FormGroup
        label={label}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        hideLabel={hideLabel}
        required={props.required}
        id={id}
      >
        {({ id: inputId, describedBy, isInvalid }) => (
          <InputWrapper $error={isInvalid}>
            <StyledInput
              ref={ref}
              id={inputId}
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              aria-required={props.required}
              {...props}
            />
          </InputWrapper>
        )}
      </FormGroup>
    );
  }
);

Input.displayName = 'Input';
