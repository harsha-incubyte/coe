import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from './Input';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    const label = screen.getByText('Username');
    const input = screen.getByPlaceholderText('Enter username');
    
    expect(label).toHaveAttribute('for', input.id);
    expect(input).toBeInTheDocument();
  });

  it('shows error message and updates aria attributes', () => {
    render(<Input label="Email" error="Invalid email address" />);
    const errorText = screen.getByText('Invalid email address');
    const input = screen.getByLabelText('Email');

    expect(errorText).toHaveAttribute('role', 'alert');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', errorText.id);
  });

  it('shows helper text and updates aria-describedby', () => {
    render(<Input label="Password" helperText="Must be at least 8 characters" />);
    const helperText = screen.getByText('Must be at least 8 characters');
    const input = screen.getByLabelText('Password');

    expect(input).toHaveAttribute('aria-describedby', helperText.id);
  });

  it('connects both error and helper text when both are present', () => {
    // Note: When both are present, error is shown in UI, but describedby might still have both depending on implementation
    // Current implementation only shows error over helper in UI, but links both if present
    render(<Input label="Code" helperText="Format: XXX-XXX" error="Required" />);
    const input = screen.getByLabelText('Code');
    const errorId = screen.getByText('Required').id;
    const helperId = screen.getByText('Format: XXX-XXX').id;

    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toContain(errorId);
    expect(describedBy).toContain(helperId);
  });
});
