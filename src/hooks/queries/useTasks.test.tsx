import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTasksQuery, useCreateTaskMutation, useUpdateTaskMutation } from './useTasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Help utility to wrap hooks with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useTasks Hook', () => {
  it('🟢 useTasksQuery should fetch tasks from API', async () => {
    const { result } = renderHook(() => useTasksQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0]).toHaveProperty('title');
  });

  it('🟢 useCreateTaskMutation should add a task', async () => {
    const { result } = renderHook(() => useCreateTaskMutation(), {
      wrapper: createWrapper(),
    });

    const newTaskTitle = 'New Test Task';
    
    result.current.mutate(newTaskTitle);

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000 });
    expect(result.current.data?.title).toBe(newTaskTitle);
  });

  it('🟢 useUpdateTaskMutation should perform updates', async () => {
    const { result } = renderHook(() => useUpdateTaskMutation(), {
      wrapper: createWrapper(),
    });

    const updateData = { id: '1', completed: false };
    
    result.current.mutate(updateData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.completed).toBe(false);
  });
});
