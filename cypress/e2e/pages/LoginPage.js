export class LoginPage {

    constructor() {
        this.cookieAcceptButtonLoc = '#onetrust-accept-btn-handler';
        this.usernameInputLoc = '#username';
        this.passwordInputLoc = '#password';
        this.submitFormLoc = '.nw-signin';
        this.loggedInMessageLoc = '.aaee4e7cd3.e7a57abb1e';
        this.passwordErrorLoc = '#password-note';
        this.usernameErrorLoc = '#username-note';
    }
  
    setUsername(username) {
      cy.get(this.usernameInputLoc).type(username, { force: true });
    }
  
    setPassword(password) {
      cy.get(this.passwordInputLoc).type(password);
    }
  
    submitForm(timeout, waitNeeded = false) {
        if (waitNeeded) {
          cy.wait(timeout);
        }
        cy.get(this.submitFormLoc).submit();
    }
    
  
    assertLoggedIn(assertion) {
      cy.get(this.loggedInMessageLoc).should('have.text', assertion);
    }
  
    assertInvalidPasswordMessage(assertion) {
      cy.get(this.passwordErrorLoc).should('have.text', assertion);
    }
  
    assertEmptyPasswordFieldMessage(assertion) {
      cy.get(this.passwordErrorLoc).should('have.text', assertion);
    }
  
    assertInvalidEmailFormatMessage(assertion) {
      cy.get(this.usernameErrorLoc).should('have.text', assertion);
    }
  
    assertEmptyEmailFieldMessage(assertion) {
      cy.get(this.usernameErrorLoc).should('have.text', assertion);
    }
}

  
 