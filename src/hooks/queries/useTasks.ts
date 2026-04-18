import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const tasksQueryKey = ['tasks'] as const;

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch('/api/tasks');
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

const createTask = async (title: string): Promise<Task> => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

const updateTask = async ({ id, completed }: { id: string; completed: boolean }): Promise<Task> => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

export const useTasksQuery = () => {
  return useQuery({
    queryKey: tasksQueryKey,
    queryFn: fetchTasks,
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    // Optimistic Update
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: tasksQueryKey });
      const previousTasks = queryClient.getQueryData<Task[]>(tasksQueryKey);
      
      queryClient.setQueryData([...tasksQueryKey], (old: Task[] | undefined) => {
        return old?.map((t) => (t.id === updatedTask.id ? { ...t, completed: updatedTask.completed } : t));
      });

      return { previousTasks };
    },
    onError: (_err, _newVal, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData([...tasksQueryKey], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
    },
  });
};
