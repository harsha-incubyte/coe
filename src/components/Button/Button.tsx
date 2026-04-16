import React, { type ElementType, type ComponentPropsWithoutRef } from 'react';
import './Button.css';

interface ButtonProps<T extends ElementType = 'button'> {
  as?: T;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

type PolymorphicButtonProps<T extends ElementType> = ButtonProps<T> & 
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>;

const Button = <T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  children,
  ...props
}: PolymorphicButtonProps<T> & { className?: string }) => {
  const Component = (as || 'button') as any;
  
  const classNames = [
    'btn-atomic',
    `btn-${variant}`,
    `btn-${size}`,
    isLoading ? 'btn-loading' : '',
    fullWidth ? 'btn-full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={classNames}
      disabled={isLoading || (props as ComponentPropsWithoutRef<'button'>).disabled}
      aria-busy={isLoading}
      aria-live={isLoading ? 'polite' : undefined}
      {...props}
    >
      {isLoading && (
        <span className="btn-spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="4" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </span>
      )}
      {!isLoading && leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
      <span className="btn-content">{children}</span>
      {!isLoading && rightIcon && <span className="btn-icon btn-icon-right">{rightIcon}</span>}
    </Component>
  );
};

export default Button;
