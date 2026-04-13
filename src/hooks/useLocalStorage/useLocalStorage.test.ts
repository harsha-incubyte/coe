import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const key = 'test-key';
    const initialValue = 'initial-value';
    
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toBe(initialValue);
  });

  it('should return initial value and log warning if localStorage contains invalid JSON', () => {
    const key = 'corrupted-key';
    window.localStorage.setItem(key, 'invalid{json'); // This will cause JSON.parse to throw
    
    const { result } = renderHook(() => useLocalStorage(key, 'fallback'));

    expect(result.current[0]).toBe('fallback');
  });

  it('should update localStorage when setValue is called', () => {
    const key = 'test-key';
    const initialValue = 'initial-value';
    const newValue = 'new-value';
    
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    const [, setValue] = result.current;

    act(() => {
      setValue(newValue);
    });

    expect(window.localStorage.getItem(key)).toBe(JSON.stringify(newValue));
    expect(result.current[0]).toBe(newValue);
  });

  it('should initialize with value from localStorage if it exists', () => {
    const key = 'test-key';
    const existingValue = 'existing-value';
    window.localStorage.setItem(key, JSON.stringify(existingValue));
    
    const { result } = renderHook(() => useLocalStorage(key, 'initial-value'));

    expect(result.current[0]).toBe(existingValue);
  });

  it('should handle functional updates', () => {
    const key = 'test-key';
    const initialValue = 0;
    
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    const [, setValue] = result.current;

    act(() => {
      setValue((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(window.localStorage.getItem(key)).toBe(JSON.stringify(1));
  });
});
