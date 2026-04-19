import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDropdown } from './useDropdown';
import { fireEvent } from '@testing-library/react';

describe('useDropdown', () => {
  it('should manage open/close state', () => {
    const { result } = renderHook(() => useDropdown());
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.onToggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should close on Escape key by default', () => {
    const { result } = renderHook(() => useDropdown({ initialIsOpen: true }));
    expect(result.current.isOpen).toBe(true);

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should not close on Escape key if closeOnEsc is false', () => {
    const { result } = renderHook(() => useDropdown({ initialIsOpen: true, closeOnEsc: false }));
    expect(result.current.isOpen).toBe(true);

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(result.current.isOpen).toBe(true);
  });
});
