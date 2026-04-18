import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDisclosure } from './useDisclosure';

describe('useDisclosure', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useDisclosure({ initialIsOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('should open and call onOpen', () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onOpen }));
    
    act(() => {
      result.current.onOpen();
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(onOpen).toHaveBeenCalled();
  });

  it('should close and call onClose', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useDisclosure({ initialIsOpen: true, onClose }));
    
    act(() => {
      result.current.onClose();
    });
    
    expect(result.current.isOpen).toBe(false);
    expect(onClose).toHaveBeenCalled();
  });

  it('should toggle', () => {
    const { result } = renderHook(() => useDisclosure());
    
    act(() => {
      result.current.onToggle();
    });
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.onToggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
