import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast Molecule', () => {
  it('renders message correctly', () => {
    render(<Toast message="Operation successful" type="success" onClose={() => {}} />);
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
  });

  it('renders correct icon for each type', () => {
    const { rerender } = render(<Toast message="Success" type="success" onClose={() => {}} />);
    expect(screen.getByText('✓')).toBeInTheDocument();

    rerender(<Toast message="Error" type="error" onClose={() => {}} />);
    expect(screen.getByText('!')).toBeInTheDocument();

    rerender(<Toast message="Warning" type="warning" onClose={() => {}} />);
    expect(screen.getByText('⚠')).toBeInTheDocument();

    rerender(<Toast message="Info" type="info" onClose={() => {}} />);
    expect(screen.getByText('i')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Toast message="Close me" type="info" onClose={handleClose} />);
    
    const closeButton = screen.getByLabelText('Close announcement');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
