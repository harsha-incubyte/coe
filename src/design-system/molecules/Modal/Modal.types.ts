import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  className?: string;
  titleId?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  align?: 'flex-start' | 'center' | 'flex-end';
  className?: string;
}
