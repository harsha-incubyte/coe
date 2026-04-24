import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of our global store
interface StoreState {
  // Add slices here
}

export const useAppStore = create<StoreState>()(
  persist(
    () => ({
      // Add slice spread here
    }),
    {
      name: 'coe-app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

