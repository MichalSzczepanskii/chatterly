//Guest
export const getEmailField = () => cy.get('[data-cy="emailField"]');
export const getNameField = () => cy.get('[data-cy="nameField"]');
export const getPasswordField = () => cy.get('[data-cy="passwordField"]');
export const getPasswordConfirmationField = () =>
  cy.get('[data-cy="passwordConfirmationField"]');
export const getLoginButton = () => cy.get('[data-cy="loginButton"]');
export const getRegisterButton = () => cy.get('[data-cy="registerButton"]');
export const getAlert = () => cy.get('.ngx-toastr');
export const getToast = () => cy.get('.p-toast-message');
