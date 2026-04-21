import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { ToastData } from '@/hooks/useToast';
import { SHOW_TOAST_EVENT } from '@/hooks/useToast';
import { Toast, type ToastType } from './Toast';
import styled from 'styled-components';

const StyledToastContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 9999;
  pointer-events: none;
`;

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const handleShowToast = (event: CustomEvent<ToastData>) => {
      const newToast: ToastData = event.detail;
      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration) {
        setTimeout(() => {
          removeToast(newToast.id);
        }, newToast.duration);
      }
    };

    window.addEventListener(SHOW_TOAST_EVENT, handleShowToast as EventListener);
    return () => window.removeEventListener(SHOW_TOAST_EVENT, handleShowToast as EventListener);
  }, []);

  return createPortal(
    <StyledToastContainer 
      className="toast-container"
      data-testid="toast-container"
      aria-live="polite" 
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            style={{ pointerEvents: 'auto' }}
          >
            <Toast
              message={toast.message}
              type={toast.type as ToastType}
              onClose={() => removeToast(toast.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </StyledToastContainer>,
    document.body
  );
};
