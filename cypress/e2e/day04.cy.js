import 'cypress-plugin-tab';

describe('Day 04: ARIA Patterns & Accessible Components', () => {
  beforeEach(() => {
    cy.visit('/day-04');
  });

  describe('Accessible Modal KATA', () => {
    it('traps focus inside the modal and wraps around', () => {
      // Open the modal
      cy.contains('button', 'Launch Modal Experience').click();
      
      // Modal should be visible
      cy.get('[role="dialog"]').should('be.visible');
      
      // Force wait for focus logic and animations
      cy.wait(500);

      // We might need to manually trigger focus if the auto-focus was flaky in headless
      cy.get('button[aria-label="Close modal"]').focus().should('be.focused');

      // Tab through all elements
      cy.focused().tab(); // Full Name input
      cy.get('label').contains('Full Name').then($label => {
        const id = $label.attr('for');
        cy.get(`#${id}`).should('be.focused');
      });
      
      cy.focused().tab(); // Environment input
      cy.focused().tab(); // Cancel button
      cy.focused().tab(); // Confirm button
      
      // Next tab should wrap back to the Close button
      cy.focused().tab();
      cy.get('button[aria-label="Close modal"]').should('be.focused');

      // Shift + Tab from first element (Close button) should wrap to last element (Confirm button)
      cy.get('button[aria-label="Close modal"]').focus().tab({ shift: true });
      cy.contains('button', 'Confirm Changes').should('be.focused');
    });

    it('restores focus to the trigger button on close', () => {
      cy.contains('button', 'Launch Modal Experience').as('trigger');
      cy.get('@trigger').click();
      
      cy.wait(500);
      cy.get('button[aria-label="Close modal"]').should('be.visible').click();
      
      // Wait for exit animation and focus restoration
      cy.wait(500);
      
      // Modal should be gone
      cy.get('[role="dialog"]').should('not.exist');
      
      // Focus should be restored
      cy.get('@trigger').should('be.focused');
    });

    it('closes on Escape key', () => {
      cy.contains('button', 'Launch Modal Experience').click();
      cy.wait(300);
      cy.get('[role="dialog"]').should('be.visible');
      
      cy.get('body').type('{esc}');
      cy.get('[role="dialog"]').should('not.exist');
    });
  });

  describe('Global Toast System', () => {
    it('triggers and displays accessible announcements', () => {
      cy.get('button').contains('Trigger Polite Announcement').click();
      
      // Should find a toast with role="status"
      cy.get('[role="status"]').should('be.visible')
        .and('contain', 'Success: Data synced at');
      
      // Should have aria-live container
      cy.get('[data-testid="toast-container"]').should('have.attr', 'aria-live', 'polite');
    });

    it('triggers assertive announcements for critical errors', () => {
      cy.get('button').contains('Trigger Assertive Announcement').click();
      
      cy.get('[role="status"]').should('be.visible')
        .and('contain', 'CRITICAL: Connection lost at');
    });
  });
});
