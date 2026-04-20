import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown } from './Dropdown';

describe('Dropdown Molecule', () => {
  const items = [
    { label: 'Edit', onClick: vi.fn() },
    { label: 'Delete', onClick: vi.fn(), variant: 'danger' as const },
  ];

  it('renders label or trigger', () => {
    render(<Dropdown label="Options" items={items} />);
    expect(screen.getByText(/Options/)).toBeInTheDocument();
  });

  it('shows menu when trigger is clicked', () => {
    render(<Dropdown label="Options" items={items} />);
    
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onClick and closes menu when item is clicked', () => {
    const handleEdit = vi.fn();
    const dropdownItems = [{ label: 'Edit', onClick: handleEdit }];
    
    render(<Dropdown label="Options" items={dropdownItems} />);
    
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Edit'));
    
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('custom trigger works correctly', () => {
    render(
      <Dropdown 
        trigger={({ onToggle }) => <button onClick={onToggle}>Custom</button>}
        items={items}
      />
    );
    
    fireEvent.click(screen.getByText('Custom'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
