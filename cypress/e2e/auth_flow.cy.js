describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear local storage to ensure fresh start
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should login, view weather, search and logout', () => {
    // Intercept login request
    cy.intercept('POST', '**/api/login').as('loginRequest');

    // Visit login page
    cy.visit('/day-02/login');

    // Attempt login with valid credentials
    cy.get('#email').type('harsha@incubyte.co');
    cy.get('#password').type('password123');
    cy.get('.login-form').submit();

    // Verify redirection to weather dashboard
    cy.url().should('include', '/day-02/weather');
    cy.get('.user-profile-btn').should('be.visible');
    cy.get('input[placeholder="Search for a city..."]').should('be.visible');

    // Search for a city
    cy.get('input[placeholder="Search for a city..."]').type('Lond');
    cy.get('.suggestions-list li').first().click();

    // Verify weather data is displayed
    cy.contains('London').should('be.visible');
    cy.contains('°C').should('be.visible');

    // Logout via Navbar
    cy.get('.user-profile-btn').click();
    cy.get('.dropdown-logout-btn').click();
    
    // Verify redirection back to login page
    cy.url().should('include', '/day-02/login');
    cy.get('#email').should('be.visible');
  });
});
