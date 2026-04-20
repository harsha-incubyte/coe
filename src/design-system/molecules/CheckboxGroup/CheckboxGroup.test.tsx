import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckboxGroup } from './CheckboxGroup';

describe('CheckboxGroup Molecule', () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ];

  it('renders label and options correctly', () => {
    render(<CheckboxGroup label="Frameworks" options={options} value={[]} onChange={() => {}} />);
    
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
    expect(screen.getByLabelText('React')).toBeInTheDocument();
    expect(screen.getByLabelText('Vue')).toBeInTheDocument();
    expect(screen.getByLabelText('Angular')).toBeInTheDocument();
  });

  it('shows checked state for provided values', () => {
    render(<CheckboxGroup label="Frameworks" options={options} value={['react', 'vue']} onChange={() => {}} />);
    
    expect(screen.getByLabelText('React')).toBeChecked();
    expect(screen.getByLabelText('Vue')).toBeChecked();
    expect(screen.getByLabelText('Angular')).not.toBeChecked();
  });

  it('calls onChange with updated array when an option is toggled', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<CheckboxGroup label="Frameworks" options={options} value={['react']} onChange={handleChange} />);
    
    fireEvent.click(screen.getByLabelText('Vue'));
    expect(handleChange).toHaveBeenCalledWith(['react', 'vue']);

    // Simulating parent state update
    rerender(<CheckboxGroup label="Frameworks" options={options} value={['react', 'vue']} onChange={handleChange} />);
    
    fireEvent.click(screen.getByLabelText('React'));
    expect(handleChange).toHaveBeenCalledWith(['vue']);
  });

  it('displays error message when provided', () => {
    render(<CheckboxGroup label="Frameworks" options={options} value={[]} onChange={() => {}} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
