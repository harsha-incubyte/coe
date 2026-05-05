import type { Meta, StoryObj } from '@storybook/react';
import { Modal, type ModalProps } from './Modal';
import { Button } from '@/design-system/atoms';
import { useState } from 'react';

const ModalWrapper = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const meta: Meta<typeof Modal> = {
  title: 'Design System/Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Modal Title',
    children: (
      <div>
        <p>This is the modal content. You can put anything here.</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Confirm</Button>
        </div>
      </div>
    ),
  },
  render: (args) => <ModalWrapper {...args} />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Small Modal',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    title: 'Medium Modal',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Large Modal',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    title: 'Extra Large Modal',
  },
};

export const FullScreen: Story = {
  args: {
    size: 'full',
    title: 'Full Screen Modal',
  },
};
