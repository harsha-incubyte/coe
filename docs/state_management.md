# State Management & Data Fetching Guide

This project strictly separates **Client State** from **Server State**. Understanding when to use which tool is critical for application performance and developer experience.

## 1. Client State (Zustand)
**Use Case:** Ephemeral UI state, user preferences, and global client-side logic (e.g., dark mode toggle, sidebar visibility, authentication tokens).

**Tool:** `zustand`
- It is lightweight, boilerplate-free, and avoids React Context re-render issues.
- **Persistence:** Use the `persist` middleware for state that needs to survive page reloads (like Auth state or Wizard progress).

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
);
```

## 2. Server State (React Query)
**Use Case:** Data fetched from an API. Server state is asynchronous, requires caching, deduplication, and background refetching.

**Tool:** `@tanstack/react-query`
- **Fetching:** Use `useQuery` to fetch and cache data.
- **Mutating:** Use `useMutation` to create, update, or delete data.

### Optimistic UI Updates
For a premium user experience, mutations should feel instant. React Query's `onMutate` hook allows you to update the UI *before* the server responds, providing instant feedback while preserving the ability to rollback if the request fails.

```typescript
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: updateTask,
  onMutate: async (newTask) => {
    // Cancel any outgoing refetches to avoid overwriting optimistic update
    await queryClient.cancelQueries({ queryKey: ['tasks'] });

    // Snapshot the previous value
    const previousTasks = queryClient.getQueryData(['tasks']);

    // Optimistically update to the new value
    queryClient.setQueryData(['tasks'], (old) => [...old, newTask]);

    // Return a context with the previous data for rollback
    return { previousTasks };
  },
  onError: (err, newTask, context) => {
    // Rollback to previous state on error
    queryClient.setQueryData(['tasks'], context.previousTasks);
  },
  onSettled: () => {
    // Always refetch after error or success to ensure synchronization
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
});
```
