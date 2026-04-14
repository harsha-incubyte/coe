describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear local storage to ensure fresh start
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should login, view weather, search and logout', () => {
    // Visit login page
    cy.visit('/day-02/login');

    // Attempt login with valid credentials
    cy.get('#email').type('harsha@incubyte.co');
    cy.get('#password').type('password123');
    cy.get('.login-submit').click();

    // Verify successful login message and redirection
    cy.contains('Login successful').should('be.visible');
    
    // RED: Redirected to /day-02/weather
    cy.url().should('include', '/day-02/weather');

    // Search for a city
    cy.get('input[placeholder="Search for a city..."]').type('Lond');
    cy.contains('London').click();

    // Verify weather data is displayed
    cy.contains('London').should('be.visible');
    cy.contains('°C').should('be.visible');

    // Logout
    // THIS WILL BE RED: The logout button doesn't exist yet
    cy.get('.logout-button').click();
    
    // Verify redirection to login page
    cy.url().should('include', '/day-02/login');
    cy.get('#email').should('be.visible');
  });
});
