import { useEffect } from 'react';
import { useDisclosure, UseDisclosureProps } from '../useDisclosure';

export interface UseModalProps extends UseDisclosureProps {
  /**
   * Whether to lock the body scroll when the modal is open.
   * @default true
   */
  lockScroll?: boolean;
}

/**
 * A custom hook to manage modal state and interactions.
 * Built on top of useDisclosure with additional modal-specific logic like scroll locking.
 */
export const useModal = (props: UseModalProps = {}) => {
  const { lockScroll = true, ...disclosureProps } = props;
  const disclosure = useDisclosure(disclosureProps);
  const { isOpen } = disclosure;

  useEffect(() => {
    if (lockScroll && isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
    return undefined;
  }, [lockScroll, isOpen]);

  return disclosure;
};
