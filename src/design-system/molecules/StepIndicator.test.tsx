import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StepIndicator } from './StepIndicator';

describe('StepIndicator Molecule', () => {
  const steps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ];

  it('renders all steps', () => {
    render(<StepIndicator steps={steps} activeIndex={0} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('highlights the active step', () => {
    render(<StepIndicator steps={steps} activeIndex={1} />);
    const stepItems = screen.getAllByRole('listitem');
    
    // Check if the second step (index 1) has active status/attributes
    // We'll define specific data attributes or classes in implementation
    expect(stepItems[1]).toHaveAttribute('aria-current', 'step');
  });

  it('shows completed steps', () => {
    render(<StepIndicator steps={steps} activeIndex={2} />);
    const stepItems = screen.getAllByRole('listitem');
    
    // First and second steps should be marked as completed
    expect(stepItems[0]).toHaveAttribute('data-status', 'completed');
    expect(stepItems[1]).toHaveAttribute('data-status', 'completed');
    expect(stepItems[2]).toHaveAttribute('data-status', 'active');
  });
});
