import React, { useState } from 'react';
import { useTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, type Task } from '@/hooks/queries/useTasks';
import { useAppStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Checkbox, Input, Spinner } from '@/design-system/atoms';
import { PageLayout } from '@/design-system/layout/PageLayout';
import * as S from './Day07.styles';

const Day07: React.FC = () => {
  const { data: tasks, isLoading, isError, error } = useTasksQuery();
  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();
  const { user } = useAppStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    createTask.mutate(newTaskTitle, {
      onSuccess: () => setNewTaskTitle(''),
    });
  };

  return (
    <PageLayout
      title="State Management & Data Fetching"
      description={
        <span>
          Welcome back, <strong>{user?.name || 'Guest'}</strong>. 
          Managing your server state with React Query and client state with Zustand.
        </span>
      }
    >
      <S.TasksSection>
        <S.SectionHeader>
          <h2>Task Board</h2>
          <div className="status-pills">
            <S.LoadingPill style={{ opacity: isLoading || createTask.isPending ? 1 : 0 }}>
              {createTask.isPending ? 'Adding task...' : 'Syncing...'}
            </S.LoadingPill>
          </div>
        </S.SectionHeader>

        <S.AddTaskForm onSubmit={handleAddTask}>
          <Input
            label="New Task"
            hideLabel
            type="text"
            placeholder="What needs to be done?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            disabled={createTask.isPending}
            required
            fullWidth
          />
          <Button 
            type="submit" 
            isLoading={createTask.isPending}
            disabled={!newTaskTitle.trim()}
            variant="primary"
          >
            Add Task
          </Button>
        </S.AddTaskForm>

        <div className="tasks-list-container" data-testid="tasks-list-container">
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 0' }}>
              <Spinner />
              <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Fetching your tasks...</p>
            </div>
          ) : isError ? (
            <div style={{ color: '#ef4444', padding: '1rem' }}>
              <p>Error: {(error as Error).message}</p>
            </div>
          ) : (
            <S.TasksList>
              <AnimatePresence>
                {tasks?.map((task: Task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <S.TaskItem $completed={task.completed}>
                      <Checkbox
                        label={task.title}
                        checked={task.completed}
                        onChange={() => updateTask.mutate({ id: task.id, completed: !task.completed })}
                      />
                    </S.TaskItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </S.TasksList>
          )}
        </div>
      </S.TasksSection>

      <S.Day07Footer>
        <S.ConceptCard>
          <h3>Zustand Auth State</h3>
          <p>Auth state is persisted in localStorage. Refresh the page to see it persist!</p>
          <pre>{JSON.stringify({ user, authenticated: !!user }, null, 2)}</pre>
        </S.ConceptCard>
        <S.ConceptCard>
          <h3>React Query Cache</h3>
          <p>Open the devtools (bottom right) to inspect the 'tasks' query and cache behavior.</p>
        </S.ConceptCard>
      </S.Day07Footer>
    </PageLayout>
  );
};

export default Day07;
