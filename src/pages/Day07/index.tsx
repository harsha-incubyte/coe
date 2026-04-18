import React, { useState } from 'react';
import { useTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, type Task } from '@/hooks/queries/useTasks';
import { useAppStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/design-system/atoms/Input';
import { Checkbox } from '@/design-system/atoms/Checkbox';
import './Day07.css';

const Day07: React.FC = () => {
  const { data: tasks, isLoading, isError, error } = useTasksQuery();
  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();
  const { user } = useAppStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    createTask.mutate(newTaskTitle, {
      onSuccess: () => setNewTaskTitle(''),
    });
  };

  return (
    <div className="day07-container">
      <header className="day07-header">
        <div className="header-content">
          <h1>State Management & Data Fetching</h1>
          <p className="welcome-text">
            Welcome back, <strong>{user?.name || 'Guest'}</strong>. 
            Managing your server state with React Query and client state with Zustand.
          </p>
        </div>
      </header>

      <div className="tasks-section">
        <div className="section-header">
          <h2>Task Board</h2>
          <div className="status-pills">
            <span className="pill loading-pill" style={{ opacity: isLoading || createTask.isPending ? 1 : 0 }}>
              {createTask.isPending ? 'Adding task...' : 'Syncing...'}
            </span>
          </div>
        </div>

        <form className="add-task-form" onSubmit={handleAddTask}>
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
          <button type="submit" disabled={createTask.isPending || !newTaskTitle.trim()}>
            {createTask.isPending ? '...' : 'Add Task'}
          </button>
        </form>


        <div className="tasks-list-container">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching your tasks...</p>
            </div>
          ) : isError ? (
            <div className="error-state">
              <p>Error: {(error as Error).message}</p>
            </div>
          ) : (
            <ul className="tasks-list">
              <AnimatePresence>
                {tasks?.map((task: Task) => (
                  <motion.li
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                  >
                    <Checkbox
                      label={task.title}
                      checked={task.completed}
                      onChange={() => updateTask.mutate({ id: task.id, completed: !task.completed })}
                    />
                  </motion.li>

                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>

      <footer className="day07-footer">
        <div className="concept-card">
          <h3>Zustand Auth State</h3>
          <p>Auth state is persisted in localStorage. Refresh the page to see it persist!</p>
          <pre>{JSON.stringify({ user, authenticated: !!user }, null, 2)}</pre>
        </div>
        <div className="concept-card">
          <h3>React Query Cache</h3>
          <p>Open the devtools (bottom right) to inspect the 'tasks' query and cache behavior.</p>
        </div>
      </footer>
    </div>
  );
};

export default Day07;
