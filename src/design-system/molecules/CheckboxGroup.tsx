import React from 'react';
import styled from 'styled-components';
import { FormGroup } from '@/design-system/molecules/FormGroup';
import { theme } from '@/design-system/theme';

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  value: string[];
  onChange: (newValue: string[]) => void;
  error?: string;
  helperText?: string;
  className?: string;
  variant?: 'vertical' | 'horizontal';
}

const OptionsContainer = styled.div<{ $variant: 'vertical' | 'horizontal' }>`
  display: flex;
  flex-direction: ${({ $variant }) => ($variant === 'vertical' ? 'column' : 'row')};
  gap: ${({ theme, $variant }) => ($variant === 'vertical' ? theme.spacing.sm : theme.spacing.xl)};
  flex-wrap: wrap;
`;
OptionsContainer.defaultProps = { theme };

const CheckboxItem = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
`;
CheckboxItem.defaultProps = { theme };

const StyledCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${({ theme }) => theme.colors.primary[500]};
  cursor: inherit;
`;
StyledCheckbox.defaultProps = { theme };

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  className,
  variant = 'vertical',
}) => {
  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <FormGroup 
      label={label} 
      error={error} 
      helperText={helperText} 
      className={className}
    >
      <OptionsContainer $variant={variant}>
        {options.map((option) => (
          <CheckboxItem key={option.value} $disabled={option.disabled}>
            <StyledCheckbox
              type="checkbox"
              checked={value.includes(option.value)}
              disabled={option.disabled}
              onChange={() => handleToggle(option.value)}
            />
            {option.label}
          </CheckboxItem>
        ))}
      </OptionsContainer>
    </FormGroup>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
