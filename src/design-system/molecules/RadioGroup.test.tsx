import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup Molecule', () => {
  const options = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
  ];

  it('renders label and options correctly', () => {
    render(<RadioGroup label="Colors" options={options} value="" onChange={() => {}} />);
    
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
    expect(screen.getByLabelText('Blue')).toBeInTheDocument();
  });

  it('shows checked state for provided value', () => {
    render(<RadioGroup label="Colors" options={options} value="blue" onChange={() => {}} />);
    
    expect(screen.getByLabelText('Blue')).toBeChecked();
    expect(screen.getByLabelText('Red')).not.toBeChecked();
  });

  it('calls onChange with new value when an option is selected', () => {
    const handleChange = vi.fn();
    render(<RadioGroup label="Colors" options={options} value="blue" onChange={handleChange} />);
    
    fireEvent.click(screen.getByLabelText('Red'));
    expect(handleChange).toHaveBeenCalledWith('red');
  });

  it('displays error message when provided', () => {
    render(<RadioGroup label="Colors" options={options} value="" onChange={() => {}} error="Selection required" />);
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });
});
