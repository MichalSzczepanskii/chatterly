describe('Guest', () => {
  beforeEach(() => {});

  it('can log in and view app', () => {
    cy.visit('/');
    cy.login();
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/app`);
  });
});
