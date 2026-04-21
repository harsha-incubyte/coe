describe('Day 05 Kata 2: Automation & UI Sanity', () => {
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

    // Visit Day 05 page
    cy.visit('/day-05');
    // Ensure the main content is loaded
    cy.get('main').should('be.visible');
    // Inject axe-core
    cy.injectAxe();
  });

  it('should have no accessibility violations on baseline', () => {
    cy.get('.day-05-grid').should('be.visible');
    cy.wait(1000); // Wait for animations to settle
    cy.checkA11y({ include: ['.day-05-grid'], exclude: ['.axe-ignore'] }, {
      rules: {
        'page-has-heading-one': { enabled: false }
      }
    }, (violations) => {
      cy.task('log', JSON.stringify(violations, null, 2));
    });
  });

  it('should display the automation and UI sanity sections', () => {
    cy.contains('h1', 'Automation & UI Sanity').should('be.visible');
    cy.contains('h2', 'Automated A11y Pipeline').should('be.visible');
    cy.contains('h2', 'Pa11y Headless CI').should('be.visible');
    cy.contains('h2', 'Mobile Ergonomics').should('be.visible');
    cy.contains('h2', 'Contrast Polish (4.5:1)').should('be.visible');
  });

  it('should have accessible touch targets in the ergonomics section', () => {
    cy.get('button[aria-label="Accessible close"]').invoke('css', 'min-width').then(val => {
      expect(parseFloat(val)).to.be.at.least(44);
    });
    cy.get('button[aria-label="Accessible close"]').invoke('css', 'min-height').then(val => {
      expect(parseFloat(val)).to.be.at.least(44);
    });
  });

  it('should follow atomic structure for sections', () => {
    // Expecting sections to have a specific test ID or role for atomic consistency
    cy.get('section').should('have.length.at.least', 4);
    cy.get('section').first().should('have.attr', 'data-testid', 'demo-section-pipeline');
  });
});
