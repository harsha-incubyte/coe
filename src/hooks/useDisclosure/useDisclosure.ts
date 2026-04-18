import { useState, useCallback } from 'react';

export interface UseDisclosureProps {
  initialIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useDisclosure = (props: UseDisclosureProps = {}) => {
  const { initialIsOpen = false, onOpen, onClose } = props;
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return {
    isOpen,
    onOpen: open,
    onClose: close,
    onToggle: toggle,
    setIsOpen,
  };
};
