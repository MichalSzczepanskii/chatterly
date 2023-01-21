import { getEmailField, getLoginButton, getPasswordField } from './utils';

Cypress.Commands.add('login', () => {
  cy.fixture('users/admin').then(admin => {
    cy.intercept('POST', Cypress.env('backendUrl') + '/auth/login').as('login');
    getEmailField().type(admin.email);
    getPasswordField().type(admin.password);
    getLoginButton().click();
    cy.wait('@login');
  });
});
