export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export const SHOW_TOAST_EVENT = 'show-toast';

export const useToast = () => {
  const showToast = (message: string, type: ToastType = 'info', duration: number = 5000) => {
    const toast: ToastData = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
      duration,
    };
    
    const event = new CustomEvent(SHOW_TOAST_EVENT, { detail: toast });
    window.dispatchEvent(event);
  };

  return { showToast };
};
