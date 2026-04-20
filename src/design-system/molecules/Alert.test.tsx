import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert Molecule', () => {
  it('renders message correctly', () => {
    render(<Alert message="Something happened!" />);
    expect(screen.getByText('Something happened!')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Alert title="Warning" message="Watch out!" />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Watch out!')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Alert message="Message" onClose={handleClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close alert/i });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies the correct role based on variant', () => {
    const { rerender } = render(<Alert message="Error" variant="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Alert message="Success" variant="success" />);
    // Success alerts usually don't need role="alert" (which is assertive)
    // but we can check if it renders correctly.
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
