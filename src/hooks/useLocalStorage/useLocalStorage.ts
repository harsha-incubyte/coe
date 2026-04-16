import { useState, useCallback, useEffect } from 'react';

/**
 * A custom hook that synchronizes state with window.localStorage.
 * 
 * @param key The key to use in localStorage.
 * @param initialValue The initial value to use if no value is found in localStorage.
 * @returns A stateful value and a function to update it.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Sync with other hooks in the same window
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent | StorageEvent) => {
      if ((e as StorageEvent).key && (e as StorageEvent).key !== key) return;
      if ((e as CustomEvent).detail && (e as CustomEvent).detail.key !== key) return;
      
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange as EventListener); // Other windows/tabs
    window.addEventListener('local-storage', handleStorageChange as EventListener); // Same window

    return () => {
      window.removeEventListener('storage', handleStorageChange as EventListener);
      window.removeEventListener('local-storage', handleStorageChange as EventListener);
    };
  }, [key, readValue]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          
          // Dispatch custom event for cross-hook sync in same window
          window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
