import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormGroup } from './FormGroup';

describe('FormGroup Molecule', () => {
  it('renders children correctly', () => {
    render(
      <FormGroup label="Test Label">
        <input data-testid="test-input" />
      </FormGroup>
    );
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('associates label with input using htmlFor', () => {
    render(
      <FormGroup label="Email" id="email-field">
        <input id="email-field" />
      </FormGroup>
    );
    const label = screen.getByText('Email');
    const input = screen.getByLabelText('Email');
    expect(label).toHaveAttribute('for', 'email-field');
    expect(input).toHaveAttribute('id', 'email-field');
  });

  it('renders error message when error is provided', () => {
    render(
      <FormGroup label="Email" error="Invalid email address">
        <input />
      </FormGroup>
    );
    const errorMsg = screen.getByText('Invalid email address');
    expect(errorMsg).toBeInTheDocument();
  });

  it('renders helper text when helperText is provided', () => {
    render(
      <FormGroup label="Password" helperText="Minimal 8 characters">
        <input />
      </FormGroup>
    );
    expect(screen.getByText('Minimal 8 characters')).toBeInTheDocument();
  });

  it('sets aria-describedby for error and helper text', () => {
    render(
      <FormGroup label="Username" id="username" error="Required" helperText="Unique name">
        <input id="username" />
      </FormGroup>
    );
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-describedby');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toContain('username-error');
    expect(describedBy).toContain('username-helper');
  });
});
