import {
  getAlert,
  getEmailField,
  getNameField,
  getPasswordConfirmationField,
  getPasswordField,
  getRegisterButton,
  getToast,
} from '../support/utils';

describe('Guest', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('login', () => {
    it('can log in and view app', () => {
      cy.visit('/');
      cy.login('users/admin');
      cy.visit('/');
      cy.url().should('eq', `${Cypress.config('baseUrl')}app`);
    });

    it('can not log in with bad credentials', () => {
      cy.visit('/');
      cy.login('users/bad-user');
      getAlert()
        .should('have.class', 'toast-error')
        .contains('Bad credentials.');
    });
  });

  describe('register', () => {
    let userId: number;

    afterEach(() => {
      cy.request('DELETE', `${Cypress.env('backendUrl')}/users/${userId}`, {
        password: Cypress.env('admin_password'),
      });
    });

    it('can register', () => {
      cy.visit('/register');
      cy.fixture('users/new-user').then(account => {
        cy.intercept('POST', Cypress.env('backendUrl') + '/users').as(
          'register'
        );
        getEmailField().type(account.email);
        getNameField().type(account.name);
        getPasswordField().type(account.password);
        getPasswordConfirmationField().type(account.password);
        getRegisterButton().click();
        cy.wait('@register').then(xhr => {
          userId = Number(xhr.response?.body);
          getToast()
            .should('have.class', 'p-toast-message-success')
            .contains('Welcome aboard! Please log in to continue.');
        });
      });
    });
  });
});
