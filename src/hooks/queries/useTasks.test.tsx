import { renderHook, waitFor } from '@/design-system/test-utils';
import { describe, it, expect } from 'vitest';
import { useTasksQuery, useCreateTaskMutation, useUpdateTaskMutation } from './useTasks';

describe('useTasks Hook', () => {
  it('useTasksQuery should fetch tasks from API', async () => {
    const { result } = renderHook(() => useTasksQuery());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0]).toHaveProperty('title');
  });

  it('useCreateTaskMutation should add a task', async () => {
    const { result } = renderHook(() => useCreateTaskMutation());

    const newTaskTitle = 'New Test Task';
    
    result.current.mutate(newTaskTitle);

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000 });
    expect(result.current.data?.title).toBe(newTaskTitle);
  });

  it('useUpdateTaskMutation should perform updates', async () => {
    const { result } = renderHook(() => useUpdateTaskMutation());

    const updateData = { id: '1', completed: false };
    
    result.current.mutate(updateData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.completed).toBe(false);
  });
});
