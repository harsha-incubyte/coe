describe('Day 05 Kata 2: Navigation Flow Accessibility', () => {
  beforeEach(() => {
    // Visit a page where the Navbar is present
    cy.visit('/day-03');
    // Ensure the main content is loaded
    cy.get('main').should('be.visible');
    // Inject axe-core
    cy.injectAxe();
  });

  it('should have no accessibility violations on baseline and after opening profile dropdown', () => {
    // Check baseline accessibility
    cy.checkA11y(undefined, undefined, (violations) => {
      cy.task('log', JSON.stringify(violations, null, 2));
    });

    // Open User Profile dropdown
    cy.get('.user-profile-btn').click();

    // Verify dropdown is visible and wait for animation to finish
    cy.get('#user-menu').should('be.visible');
    cy.wait(300);

    // Check accessibility again with the dropdown open
    cy.checkA11y(undefined, undefined, (violations) => {
      cy.task('log', JSON.stringify(violations, null, 2));
    });
  });
});
