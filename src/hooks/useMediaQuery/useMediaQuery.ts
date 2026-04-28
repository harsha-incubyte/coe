'use client';

import { useSyncExternalStore } from 'react';

/**
 * Custom hook that tracks the state of a media query.
 * @param query The media query string to track (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false // SSR initial value
  );
};
