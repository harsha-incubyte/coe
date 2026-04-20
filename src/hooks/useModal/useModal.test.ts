import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useModal } from './useModal';

describe('useModal', () => {
  const originalStyle = document.body.style.overflow;

  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = originalStyle;
  });

  it('should initialize with default value', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('should open and lock scroll by default', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.onOpen();
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should not lock scroll if lockScroll is false', () => {
    const { result } = renderHook(() => useModal({ lockScroll: false }));
    
    act(() => {
      result.current.onOpen();
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(document.body.style.overflow).toBe('');
  });

  it('should restore original scroll style on close', () => {
    document.body.style.overflow = 'auto'; // Set some initial style
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.onOpen();
    });
    expect(document.body.style.overflow).toBe('hidden');
    
    act(() => {
      result.current.onClose();
    });
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should restore original scroll style on unmount', () => {
    const { result, unmount } = renderHook(() => useModal());
    
    act(() => {
      result.current.onOpen();
    });
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
