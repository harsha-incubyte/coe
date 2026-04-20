import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ModalHeader } from './ModalHeader';

describe('ModalHeader Molecule', () => {
  it('renders title correctly', () => {
    render(<ModalHeader title="Modal Title" />);
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<ModalHeader title="Title" onClose={handleClose} />);
    
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('is accessible with proper heading level', () => {
    render(<ModalHeader title="Accessible Title" />);
    expect(screen.getByRole('heading', { name: 'Accessible Title', level: 2 })).toBeInTheDocument();
  });
});
