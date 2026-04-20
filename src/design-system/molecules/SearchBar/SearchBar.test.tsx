import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar Molecule', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar placeholder="Search items..." onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
  });

  it('calls onSearch when clicking the search button', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    
    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('calls onSearch when pressing Enter', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'another query' } });
    fireEvent.submit(screen.getByRole('search'));
    
    expect(handleSearch).toHaveBeenCalledWith('another query');
  });

  it('calls onChange as user types', () => {
    const handleChange = vi.fn();
    render(<SearchBar onSearch={() => {}} onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'query' } });
    
    expect(handleChange).toHaveBeenCalledWith('query');
  });
});
