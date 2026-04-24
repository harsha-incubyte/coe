import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { Modal } from './Modal';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <button data-testid="modal-content">Modal Content</button>,
  };

  it('renders correctly when open', async () => {
    renderWithTheme(<Modal {...defaultProps} />);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithTheme(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    renderWithTheme(<Modal {...defaultProps} />);
    const closeButton = await screen.findByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', async () => {
    renderWithTheme(<Modal {...defaultProps} />);
    const overlay = await screen.findByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    renderWithTheme(<Modal {...defaultProps} />);
    await screen.findByRole('dialog');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('has correct ARIA attributes', async () => {
    renderWithTheme(<Modal {...defaultProps} />);
    const modal = await screen.findByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby');
  });

  it('should have no accessibility violations when open', async () => {
    renderWithTheme(<Modal {...defaultProps} />);
    const dialog = await screen.findByRole('dialog');
    const results = await axe(dialog);
    expect(results).toHaveNoViolations();
  });

  it('traps focus correctly and wraps around', async () => {
    renderWithTheme(
      <Modal {...defaultProps}>
        <input data-testid="first" />
        <button data-testid="last">Last</button>
      </Modal>
    );

    await waitFor(() => expect(screen.getByTestId('first')).toBeInTheDocument());

    const closeButton = screen.getByLabelText('Close modal');
    const lastButton = screen.getByTestId('last');
    // const firstInput = screen.getByTestId('first'); // Removed unused variable

    // Initial focus should be on the first focusable element (close button in our case because it's first in DOM)
    // Wait for the focus timer
    await waitFor(() => expect(document.activeElement).toBe(closeButton), { timeout: 300 });

    // Move to last
    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    // Wrap from last back to first
    fireEvent.keyDown(window, { key: 'Tab' });
    await waitFor(() => expect(document.activeElement).toBe(closeButton));

    // Wrap from first back to last
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    await waitFor(() => expect(document.activeElement).toBe(lastButton));
  });
});
