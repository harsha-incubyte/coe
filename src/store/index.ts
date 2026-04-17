import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice, AuthState } from './slices/authSlice';

// Define the shape of our global store
type StoreState = AuthState; // Add more slices here as they are created

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'coe-app-storage', // unique name for the storage key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
