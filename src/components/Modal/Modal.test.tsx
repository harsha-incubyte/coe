import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import Modal from './Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <button>Modal Content</button>,
  };

  it('renders correctly when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    render(<Modal {...defaultProps} />);
    // The overlay is the first div with modal-overlay class
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('has correct ARIA attributes', () => {
    render(<Modal {...defaultProps} />);
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby');
  });

  it('should have no accessibility violations when open', async () => {
    const { container } = render(<Modal {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when closed', async () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('traps focus correctly and wraps around', async () => {
    render(
      <Modal {...defaultProps}>
        <input data-testid="first" />
        <button data-testid="last">Last</button>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    const lastButton = screen.getByTestId('last');

    // Wrap from last to first
    lastButton.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    await waitFor(() => expect(document.activeElement).toBe(closeButton));

    // Wrap from first to last
    closeButton.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    await waitFor(() => expect(document.activeElement).toBe(lastButton));
  });
});
