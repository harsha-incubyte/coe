import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastData, SHOW_TOAST_EVENT } from '../../hooks/useToast';
import './Toast.css';

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleShowToast = (event: any) => {
      const newToast: ToastData = event.detail;
      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration) {
        setTimeout(() => {
          removeToast(newToast.id);
        }, newToast.duration);
      }
    };

    window.addEventListener(SHOW_TOAST_EVENT, handleShowToast);
    return () => window.removeEventListener(SHOW_TOAST_EVENT, handleShowToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return createPortal(
    <div 
      className="toast-container" 
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
            className={`toast toast-${toast.type}`}
            id={`toast-${toast.id}`}
            role="status"
          >
            <div className="toast-icon">
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '!'}
              {toast.type === 'info' && 'i'}
              {toast.type === 'warning' && '⚠'}
            </div>
            <div className="toast-message">{toast.message}</div>
            <button
              className="toast-close"
              aria-label="Close announcement"
              onClick={() => removeToast(toast.id)}
            >
              &times;
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ToastContainer;
