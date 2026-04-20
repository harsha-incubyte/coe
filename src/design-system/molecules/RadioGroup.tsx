import React from 'react';
import styled from 'styled-components';
import { FormGroup } from '@/design-system/molecules/FormGroup';
import { theme } from '@/design-system/theme';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (newValue: string) => void;
  error?: string;
  helperText?: string;
  className?: string;
  variant?: 'vertical' | 'horizontal';
  name?: string;
}

const OptionsContainer = styled.div<{ $variant: 'vertical' | 'horizontal' }>`
  display: flex;
  flex-direction: ${({ $variant }) => ($variant === 'vertical' ? 'column' : 'row')};
  gap: ${({ theme, $variant }) => ($variant === 'vertical' ? theme.spacing.sm : theme.spacing.xl)};
  flex-wrap: wrap;
`;
OptionsContainer.defaultProps = { theme };

const RadioItem = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
`;
RadioItem.defaultProps = { theme };

const StyledRadio = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${({ theme }) => theme.colors.primary[500]};
  cursor: inherit;
`;
StyledRadio.defaultProps = { theme };

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  className,
  variant = 'vertical',
  name,
}) => {
  const groupName = name || `radio-group-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <FormGroup 
      label={label} 
      error={error} 
      helperText={helperText} 
      className={className}
    >
      <OptionsContainer $variant={variant}>
        {options.map((option) => (
          <RadioItem key={option.value} $disabled={option.disabled}>
            <StyledRadio
              type="radio"
              name={groupName}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </RadioItem>
        ))}
      </OptionsContainer>
    </FormGroup>
  );
};

RadioGroup.displayName = 'RadioGroup';
