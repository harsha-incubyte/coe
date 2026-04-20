import React, { useState } from 'react';
import { Badge, Modal } from '@/design-system/molecules';
import { Button } from '@/design-system/atoms';
import Input from '@/components/Form/Input';
import { useToast } from '@/hooks/useToast';
import { useModal } from '@/hooks/useModal';
import { useBoolean } from '@/hooks/useBoolean';
import { PageLayout } from '@/design-system/layout/PageLayout';
import * as S from './Day04.styles';

const Day04: React.FC = () => {
  const { isOpen: isModalOpen, onOpen: openModal, onClose: handleModalClose } = useModal();
  const [announcement, setAnnouncement] = useState('');
  const [isSubmitting, { setTrue: startSubmitting, setFalse: stopSubmitting }] = useBoolean(false);
  const { showToast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSubmitting();
    setTimeout(() => {
      stopSubmitting();
      handleModalClose();
      showToast('Action completed successfully!', 'success');
    }, 1500);
  };

  return (
    <PageLayout
      title="ARIA Patterns & Reusable Components"
      description="Building the atomic foundation for professional, accessible web applications."
    >
      
      <S.PlaygroundGrid>
        <S.ExerciseSection>
          <S.CardHeader>
            <Badge variant="primary">KATA 01</Badge>
            <h2>The Decoupled Accessible Modal</h2>
          </S.CardHeader>
          <p>A headless modal implementation with focus trapping, Escape handling, and smooth Framer Motion animations.</p>
          
          <Button 
            variant="primary" 
            onClick={openModal}
            aria-haspopup="dialog"
            size="lg"
          >
            Launch Modal Experience
          </Button>

          <Modal 
            isOpen={isModalOpen} 
            onClose={handleModalClose} 
            title="Premium Modal Experience"
          >
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                This modal component is now globally available in <code>@/design-system/molecules/Modal</code>.
              </p>
              
              <Input 
                label="Full Name" 
                placeholder="e.g. John Doe" 
                required 
                fullWidth 
              />
              
              <Input 
                label="Environment" 
                placeholder="e.g. Production" 
                helperText="This helps us tag your request correctly."
                fullWidth 
              />
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem' }}>
                <Button variant="ghost" type="button" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting}>
                  Confirm Changes
                </Button>
              </div>
            </form>
          </Modal>
        </S.ExerciseSection>

        <S.ExerciseSection>
          <S.CardHeader>
            <Badge variant="primary">KATA 02</Badge>
            <h2>Global Announcement Hub</h2>
          </S.CardHeader>
          <p>Compare how different ARIA live intensities affect screen reader announcements.</p>
          
          <S.LiveRegionPlayground>
            <S.ButtonGroupVertical>
              <Button 
                variant="secondary" 
                onClick={() => {
                  const msg = `Success: Data synced at ${new Date().toLocaleTimeString()}`;
                  setAnnouncement(msg);
                  showToast(msg, 'success');
                }}
                fullWidth
              >
                Trigger Polite Announcement
              </Button>
              
              <Button 
                variant="danger" 
                onClick={() => {
                  const msg = `CRITICAL: Connection lost at ${new Date().toLocaleTimeString()}!`;
                  setAnnouncement(msg);
                  showToast(msg, 'error');
                }}
                fullWidth
              >
                Trigger Assertive Announcement
              </Button>
            </S.ButtonGroupVertical>
            
            <S.LiveOutput>
              <label>ARIA Live Output:</label>
              <S.AnnouncementBox 
                aria-live="polite" 
              >
                {announcement || <span style={{ opacity: 0.3 }}>Waiting for interaction...</span>}
              </S.AnnouncementBox>
            </S.LiveOutput>
          </S.LiveRegionPlayground>
        </S.ExerciseSection>
      </S.PlaygroundGrid>


    </PageLayout>
  );
};

export default Day04;
