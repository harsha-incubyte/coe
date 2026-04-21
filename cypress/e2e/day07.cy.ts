describe('Day 07: Task Board & Atomic Refactor', () => {
  beforeEach(() => {
    // Set authentication state in localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('coe-app-storage', JSON.stringify({
        state: {
          user: { id: '1', email: 'harsha@incubyte.co', name: 'Harsha' },
          token: 'mock-token',
          isAuthenticated: true
        },
        version: 0
      }));
    });

    // Visit Day 07 page
    cy.visit('/day-07');
    cy.get('main').should('be.visible');
    cy.injectAxe();
  });

  it('should have no accessibility violations on the task board', () => {
    // Wait for the simulated loading state to finish
    cy.get('[data-testid="tasks-list-container"]').should('be.visible');
    
    // Audit the full page
    cy.checkA11y(null, {
      rules: {
        // Heading rules can be a bit strict on layouts, 
        // but we should aim for perfect results
      }
    }, (violations) => {
      if (violations.length > 0) {
        cy.task('log', `Day 07 A11y Violations: ${JSON.stringify(violations, null, 2)}`);
      }
    });
  });

  it('should use semantic tags for task items', () => {
    cy.get('article').should('have.length.at.least', 1);
    cy.get('article header').should('be.visible');
    cy.get('article footer').should('be.visible');
  });
});
