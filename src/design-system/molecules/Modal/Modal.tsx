import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/design-system/theme';
import { ModalHeader } from './ModalHeader';
import type { ModalProps } from './Modal.types';
export type { ModalProps };

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
  pointer-events: none;
`;
OverlayWrapper.defaultProps = { theme };

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  pointer-events: auto;
`;

const ContainerWrapper = styled.div<{ $size: string }>`
  position: relative;
  width: 95%;
  max-width: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '400px';
      case 'md': return '550px';
      case 'lg': return '800px';
      case 'xl': return '1140px';
      case 'full': return '100%';
      default: return '550px';
    }
  }};
  max-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const StyledModal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  width: 100%;
  display: flex;
  flex-direction: column;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  pointer-events: auto;
  overflow: hidden;
`;
StyledModal.defaultProps = { theme };

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;
ModalContent.defaultProps = { theme };

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const generatedId = useId();
  const titleId = `modal-title-${generatedId}`;

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      const focusFirstElement = () => {
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            modalRef.current.focus();
          }
        }
      };

      const timer = setTimeout(focusFirstElement, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          if (!modalRef.current) return;

          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (firstElement.contains(document.activeElement)) {
              e.preventDefault();
              setTimeout(() => lastElement.focus(), 0);
            }
          } else {
            if (lastElement.contains(document.activeElement)) {
              e.preventDefault();
              setTimeout(() => firstElement.focus(), 0);
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      const timer = setTimeout(() => {
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <OverlayWrapper>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            data-testid="modal-overlay"
          />
          <ContainerWrapper $size={size}>
            <StyledModal 
              role="dialog" 
              aria-modal="true" 
              aria-labelledby={titleId}
              ref={modalRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader title={title} onClose={onClose} />
              <ModalContent>
                {children}
              </ModalContent>
            </StyledModal>
          </ContainerWrapper>
        </OverlayWrapper>
      )}
    </AnimatePresence>,
    document.body
  );
};

Modal.displayName = 'Modal';
