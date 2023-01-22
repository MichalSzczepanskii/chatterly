import { getAlert } from '../support/utils';

describe('Guest', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('can log in and view app', () => {
    cy.visit('/');
    cy.login('users/admin');
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config('baseUrl')}app`);
  });

  it('can not log in with bad credentials', () => {
    cy.visit('/');
    cy.login('users/bad-user');
    getAlert().should('have.class', 'toast-error').contains('Bad credentials.');
  });
});
