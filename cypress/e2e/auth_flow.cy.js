describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear local storage to ensure fresh start
    cy.window().then((win) => {
      win.localStorage.clear();
    });

    // Mock weather APIs for this test to keep it deterministic 
    // without affecting the global MSW browser config
    cy.intercept('GET', '**/geocoding-api.open-meteo.com/v1/search*', {
      body: {
        results: [
          { id: 1, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom' }
        ]
      }
    }).as('geocoding');

    cy.intercept('GET', '**/api.open-meteo.com/v1/forecast*', {
      body: {
        current_weather: { temperature: 15, weathercode: 1, is_day: 1 }
      }
    }).as('forecast');
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
    cy.contains('Logout').click();

    
    // Verify redirection back to login page
    cy.url().should('include', '/day-02/login');
    cy.get('#email').should('be.visible');
  });
});
