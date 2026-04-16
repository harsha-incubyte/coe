import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ToastContainer from './ToastContainer';
import { useToast, SHOW_TOAST_EVENT } from '../../hooks/useToast';

describe('Toast System', () => {
  it('renders a toast when the custom event is dispatched via hook', async () => {
    // We need to render the container first
    render(<ToastContainer />);
    
    const TestComponent = () => {
      const { showToast } = useToast();
      return <button onClick={() => showToast('Hello world', 'success')}>Show</button>;
    };
    
    render(<TestComponent />);
    
    const button = screen.getByText('Show');
    act(() => {
      button.click();
    });
    
    expect(await screen.findByText('Hello world')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('removes the toast when the close button is clicked', async () => {
    render(<ToastContainer />);
    
    act(() => {
      window.dispatchEvent(new CustomEvent(SHOW_TOAST_EVENT, { 
        detail: { id: '1', message: 'Test message', type: 'info' } 
      }));
    });
    
    const message = screen.getByText('Test message');
    expect(message).toBeInTheDocument();
    
    const closeButton = screen.getByLabelText('Close announcement');
    act(() => {
      closeButton.click();
    });
    
    await waitForElementToBeRemoved(() => screen.queryByText('Test message'));
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });
});
