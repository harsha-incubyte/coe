import React, { useState, useCallback } from 'react';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import Input from '@/components/Form/Input';
import { useToast } from '@/hooks/useToast';
import './Day04.css';

const Day04: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      showToast('Action completed successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="day-04-container">
      <header className="day-04-header">
        <h1>ARIA Patterns & Reusable Components</h1>
        <p className="subtitle">Building the atomic foundation for professional, accessible web applications.</p>
      </header>
      
      <div className="playground-grid">
        <section className="exercise-section card-glass">
          <div className="card-header">
            <span className="badge">KATA 01</span>
            <h2>The Decoupled Accessible Modal</h2>
          </div>
          <p>A headless modal implementation with focus trapping, Escape handling, and smooth Framer Motion animations.</p>
          
          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
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
            <form onSubmit={handleFormSubmit} className="modal-form">
              <p style={{ marginBottom: '1.5rem' }}>
                This modal component is now globally available in <code>@/components/Modal</code>.
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
              
              <div className="modal-actions">
                <Button variant="ghost" type="button" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting}>
                  Confirm Changes
                </Button>
              </div>
            </form>
          </Modal>
        </section>

        <section className="exercise-section card-glass">
          <div className="card-header">
            <span className="badge">KATA 02</span>
            <h2>Global Announcement Hub</h2>
          </div>
          <p>Compare how different ARIA live intensities affect screen reader announcements.</p>
          
          <div className="live-region-playground">
            <div className="button-group-vertical">
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
            </div>
            
            <div className="live-output">
              <label>ARIA Live Output:</label>
              <div 
                aria-live="polite" 
                className="announcement-box"
              >
                {announcement || <span style={{ opacity: 0.3 }}>Waiting for interaction...</span>}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="exercise-section card-glass">
        <div className="card-header">
          <span className="badge">Preview</span>
          <h2>Atomic Library Gallery</h2>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item">
            <h3>Button Variants</h3>
            <div className="gallery-flex">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>
          <div className="gallery-item">
            <h3>Loading States</h3>
            <div className="gallery-flex">
              <Button isLoading>Loading</Button>
              <Button variant="secondary" isLoading>Loading</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Day04;
