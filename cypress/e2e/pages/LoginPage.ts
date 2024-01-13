export class LoginPage {
  private usernameInputLoc: string = '#username';
  private passwordInputLoc: string = '#password';
  private submitFormLoc: string = '.nw-signin';
  private loggedInMessageLoc: string = '.aaee4e7cd3.e7a57abb1e';
  private passwordErrorLoc: string = '#password-note';
  private usernameErrorLoc: string = '#username-note';

  setUsername(username: string): void {
    cy.get(this.usernameInputLoc).type(username, { force: true });
  }

  setPassword(password: string): void {
    cy.get(this.passwordInputLoc).type(password);
  }

  submitForm(timeout: number, waitNeeded: boolean = false): void {
    if (waitNeeded) {
      cy.wait(timeout);
    }
    cy.get(this.submitFormLoc).submit();
  }

  assertLoggedIn(assertion: string): void {
    cy.get(this.loggedInMessageLoc).should('have.text', assertion);
  }

  assertInvalidPasswordMessage(assertion: string): void {
    cy.get(this.passwordErrorLoc).should('have.text', assertion);
  }

  assertEmptyPasswordFieldMessage(assertion: string): void {
    cy.get(this.passwordErrorLoc).should('have.text', assertion);
  }

  assertInvalidEmailFormatMessage(assertion: string): void {
    cy.get(this.usernameErrorLoc).should('have.text', assertion);
  }

  assertEmptyEmailFieldMessage(assertion: string): void {
    cy.get(this.usernameErrorLoc).should('have.text', assertion);
  }
}


  
 