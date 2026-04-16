import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Modal from './Modal';

describe('Modal Focus Trap', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Focus Trap Test',
  };

  it('wraps focus from last to first element', () => {
    render(
      <Modal {...defaultProps}>
        <input data-testid="first" />
        <button data-testid="last">Last</button>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    const firstInput = screen.getByTestId('first');
    const lastButton = screen.getByTestId('last');

    // Manually focus the last element
    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    // Trigger Tab
    fireEvent.keyDown(document, { key: 'Tab' });

    // Should wrap to the VERY first element in the modal, which is the Close button
    expect(document.activeElement).toBe(closeButton);
  });

  it('wraps focus from first to last element with Shift+Tab', () => {
    render(
      <Modal {...defaultProps}>
        <input data-testid="first" />
        <button data-testid="last">Last</button>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    const lastButton = screen.getByTestId('last');

    // Manually focus the first element (Close button)
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);

    // Trigger Shift+Tab
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    // Should wrap to the last element
    expect(document.activeElement).toBe(lastButton);
  });
});
