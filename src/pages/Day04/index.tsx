import React, { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import './Day04.css';

const Day04: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  return (
    <div className="day-04-container">
      <h1>ARIA Patterns & Accessible React Components</h1>
      
      <section className="exercise-section">
        <h2>KATA: The Decoupled Accessible Modal</h2>
        <p>Goal: Build a custom modal that traps focus and manages its own lifecycle without tightly coupling to the parent component.</p>
        
        <button 
          className="btn-primary" 
          onClick={() => setIsModalOpen(true)}
          aria-haspopup="dialog"
        >
          Open Accessible Modal
        </button>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Day 04 KATA Modal"
        >
          <div className="modal-demo-content">
            <p>This modal implements the following accessibility features:</p>
            <ul>
              <li><strong>Focus Trap:</strong> You can't tab out of this modal.</li>
              <li><strong>Escape Hatch:</strong> Pressing 'Esc' closes the modal.</li>
              <li><strong>Initial Focus:</strong> Focus is automatically set to the first interactive element.</li>
              <li><strong>Focus Restoration:</strong> Closing the modal returns focus to the trigger button.</li>
              <li><strong>ARIA Attributes:</strong> Proper role, aria-modal, and aria-labelledby.</li>
              <li><strong>Smooth Motion:</strong> Framer Motion for professional entrance/exit animations.</li>
            </ul>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="modal-input" style={{ display: 'block', marginBottom: '0.5rem' }}>Sample Input:</label>
                <input id="modal-input" type="text" placeholder="Type something..." className="modal-input" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Action</button>
              </div>
            </form>
          </div>
        </Modal>
      </section>

      <section className="exercise-section">
        <h2>Exercise: ARIA Live Regions</h2>
        <p>ARIA live regions allow you to announce dynamic changes to screen reader users without moving their focus.</p>
        
        <div className="live-region-demo">
          <button 
            className="btn-secondary" 
            onClick={() => {
              const msg = `Last updated at ${new Date().toLocaleTimeString()}`;
              setAnnouncement(msg);
            }}
          >
            Trigger Announcement
          </button>
          
          <div 
            aria-live="polite" 
            className="announcement-box"
            style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '8px',
              border: '1px dashed #cbd5e1',
              minHeight: '3rem'
            }}
          >
            {announcement}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Day04;
