import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Molecule', () => {
  it('renders correctly with multiple pages', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('calls onPageChange when next/previous is clicked', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />);
    
    fireEvent.click(screen.getByLabelText(/next page/i));
    expect(handlePageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByLabelText(/previous page/i));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText(/previous page/i)).toBeDisabled();
    expect(screen.getByLabelText(/next page/i)).not.toBeDisabled();
  });

  it('disables next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText(/next page/i)).toBeDisabled();
    expect(screen.getByLabelText(/previous page/i)).not.toBeDisabled();
  });
});
