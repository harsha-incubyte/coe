import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputGroup } from './InputGroup';
import { Input } from '@/design-system/atoms/Input';

describe('InputGroup Molecule', () => {
  it('renders input with prefix and suffix', () => {
    render(
      <InputGroup prefix="$" suffix=".00">
        <Input label="Amount" hideLabel placeholder="Amount" />
      </InputGroup>
    );
    
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
  });

  it('renders correctly with only prefix', () => {
    render(
      <InputGroup prefix="@">
        <Input label="Username" hideLabel placeholder="Username" />
      </InputGroup>
    );
    
    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  });

  it('renders correctly with only suffix', () => {
    render(
      <InputGroup suffix="kg">
        <Input label="Weight" hideLabel placeholder="Weight" />
      </InputGroup>
    );
    
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Weight')).toBeInTheDocument();
  });

  it('passes through className', () => {
    const { container } = render(
      <InputGroup className="custom-group">
        <Input label="Generic" hideLabel />
      </InputGroup>
    );
    expect(container.firstChild).toHaveClass('custom-group');
  });
});
