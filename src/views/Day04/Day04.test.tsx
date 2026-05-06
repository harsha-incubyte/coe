import { render, screen } from '@/design-system/test-utils';
import Day04 from './index';
import { describe, it, expect } from 'vitest';

describe('Day04 Page', () => {
  it('should render atomic Input components instead of legacy ones', async () => {
    render(<Day04 />);
    
    // Open the modal
    const launchButton = screen.getByRole('button', { name: /launch modal/i });
    launchButton.click();

    // New Input is wrapped in a FormGroup
    const fullNameInput = await screen.findByLabelText(/full name/i);
    expect(fullNameInput).toBeInTheDocument();
    expect(fullNameInput).toHaveAttribute('id');
    
    const environmentInput = screen.getByLabelText(/environment/i);
    expect(environmentInput).toBeInTheDocument();
    // New Input should have aria-describedby for helper text if present
    expect(environmentInput).toHaveAttribute('aria-describedby');
  });

  it('should have the correct data-testid on the main container', () => {
    render(<Day04 />);
    expect(screen.getByTestId('day04-page')).toBeInTheDocument();
  });
});
