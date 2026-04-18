import React, { useId, type InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  user-select: none;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
`;
CheckboxContainer.defaultProps = { theme };

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
HiddenCheckbox.defaultProps = { theme };

const StyledCheckbox = styled.div<{ $checked?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid ${({ theme, $checked }) => ($checked ? theme.colors.primary[500] : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, $checked }) => ($checked ? theme.colors.primary[500] : 'transparent')};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  ${HiddenCheckbox}:focus-visible + & {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[500]}40;
  }

  &::after {
    content: '✓';
    color: white;
    font-size: 0.875rem;
    display: ${({ $checked }) => ($checked ? 'block' : 'none')};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
  }
`;
StyledCheckbox.defaultProps = { theme };

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, ...props }, ref) => {
    const id = useId();

    return (
      <CheckboxContainer htmlFor={id}>
        <HiddenCheckbox
          {...props}
          id={id}
          ref={ref}
          checked={checked}
        />
        <StyledCheckbox $checked={checked} />
        {label}
      </CheckboxContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';
