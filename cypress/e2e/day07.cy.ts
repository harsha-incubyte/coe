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

    // Mock tasks API
    cy.intercept('GET', '/api/tasks', {
      statusCode: 200,
      body: [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true }
      ]
    }).as('getTasks');

    // Visit Day 07 page
    cy.visit('/day-07');
    cy.wait('@getTasks');
    cy.get('main').should('be.visible');
    cy.injectAxe();
  });

  it('should have no accessibility violations on the task board', () => {
    // Wait for the simulated loading state to finish and animations to stabilize
    cy.get('[data-testid="tasks-list-container"]').should('be.visible');
    // Ensure the footer/concept cards are also visible and stable
    cy.contains('React Query Cache').should('be.visible');
    cy.wait(500); // Give motion animations a moment to settle
    
    // Audit the full page
    cy.checkA11y(undefined, {
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
