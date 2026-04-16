import { render, screen, fireEvent } from '@testing-library/react';
import AccessibleModal from './AccessibleModal';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

describe('AccessibleModal', () => {
  const onClose = vi.fn();
  const title = "Test Modal";

  test('renders with correct ARIA attributes', () => {
    render(
      <AccessibleModal isOpen={true} onClose={onClose} title={title}>
        <p>Modal Content</p>
        <button>First Button</button>
      </AccessibleModal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    
    const heading = screen.getByRole('heading', { name: title });
    expect(heading).toHaveAttribute('id', dialog.getAttribute('aria-labelledby'));
  });

  test('calls onClose when Escape key is pressed', () => {
    render(
      <AccessibleModal isOpen={true} onClose={onClose} title={title}>
        <button>Close</button>
      </AccessibleModal>
    );

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('traps focus within the modal', async () => {
    const user = userEvent.setup();
    render(
      <AccessibleModal isOpen={true} onClose={onClose} title={title}>
        <button>First</button>
        <button>Last</button>
      </AccessibleModal>
    );

    const firstBtn = screen.getByText('First');
    const lastBtn = screen.getByText('Last');
    const closeBtn = screen.getByLabelText(/close/i);

    // Initial focus should be on the first element (the close button in the header)
    expect(closeBtn).toHaveFocus();

    // Tab from last element should wrap to the first element (close button)
    lastBtn.focus();
    await user.tab();
    expect(closeBtn).toHaveFocus();

    // Shift+Tab from first element (close button) should wrap to last element
    closeBtn.focus();
    await user.tab({ shift: true });
    expect(lastBtn).toHaveFocus();
  });

  test('restores focus to the previously active element on unmount', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Trigger';
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const { unmount } = render(
      <AccessibleModal isOpen={true} onClose={onClose} title={title}>
        <button>Inside</button>
      </AccessibleModal>
    );

    expect(document.activeElement).not.toBe(trigger);

    unmount();
    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });
});
