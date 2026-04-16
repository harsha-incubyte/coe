import React, { useId, InputHTMLAttributes } from 'react';
import './Form.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', id: providedId, ...props }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const describedBy = [
      error ? errorId : '',
      helperText ? helperId : ''
    ].filter(Boolean).join(' ');

    const containerClasses = [
      'input-group',
      fullWidth ? 'input-full-width' : '',
      error ? 'input-has-error' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        <div className="input-wrapper">
          <input
            ref={ref}
            id={id}
            className="input-field"
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="input-error" role="alert">
            {error}
          </p>
        )}
        {helperText && (
          <p id={helperId} className="input-helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
