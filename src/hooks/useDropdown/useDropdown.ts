import { useRef, useEffect, useCallback } from 'react';
import { useDisclosure } from '../useDisclosure';
import { useOnClickOutside } from '../useOnClickOutside';

export interface UseDropdownOptions {
  initialIsOpen?: boolean;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
}

/**
 * A hook to manage dropdown state and interactions.
 * Handles open/close state, click outside, and escape key.
 */
export const useDropdown = (options: UseDropdownOptions = {}) => {
  const { closeOnBlur = true, closeOnEsc = true, initialIsOpen = false } = options;
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({ initialIsOpen });
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => {
    if (closeOnBlur && isOpen) {
      onClose();
    }
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [closeOnEsc, isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    containerRef,
  };
};
