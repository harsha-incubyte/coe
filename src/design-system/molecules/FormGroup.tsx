import React, { useId, type ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/design-system/theme';

export interface FormGroupProps {
  label: string;
  error?: string;
  helperText?: string;
  children: ReactNode | ((props: { id: string; describedBy?: string; isInvalid: boolean }) => ReactNode);
  id?: string;
  required?: boolean;
  fullWidth?: boolean;
  hideLabel?: boolean;
}

const Container = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;
Container.defaultProps = { theme };

const StyledLabel = styled.label<{ $hideLabel?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;

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
StyledLabel.defaultProps = { theme };

const Message = styled.p<{ $variant: 'error' | 'helper' }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, $variant }) => ($variant === 'error' ? theme.colors.error : theme.colors.textSecondary)};
`;
Message.defaultProps = { theme };

const RequiredAsterisk = styled.span.attrs({ 'aria-hidden': 'true' })`
  color: ${({ theme }) => theme.colors.error};
  font-family: inherit;
  margin-left: 2px;
`;
RequiredAsterisk.defaultProps = { theme };

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  error,
  helperText,
  children,
  id: providedId,
  required,
  fullWidth = false,
  hideLabel = false,
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const describedBy = [
    error ? errorId : '',
    helperText ? helperId : ''
  ].filter(Boolean).join(' ');

  const isInvalid = !!error;

  return (
    <Container $fullWidth={fullWidth}>
      <StyledLabel htmlFor={id} $hideLabel={hideLabel}>
        {label}
        {required && <RequiredAsterisk>*</RequiredAsterisk>}
      </StyledLabel>
      {typeof children === 'function' 
        ? children({ id, describedBy: describedBy || undefined, isInvalid }) 
        : (
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                id: child.props.id || id,
                'aria-invalid': child.props['aria-invalid'] ?? isInvalid,
                'aria-describedby': [child.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
              } as React.HTMLAttributes<HTMLElement>);
            }
            return child;
          })
        )}
      {error && (
        <Message id={errorId} $variant="error" role="alert">
          {error}
        </Message>
      )}
      {helperText && (
        <Message id={helperId} $variant="helper">
          {helperText}
        </Message>
      )}
    </Container>
  );
};

FormGroup.displayName = 'FormGroup';
