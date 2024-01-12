// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('pressAndHold', { prevSubject: true }, (subject, duration = 1000) => {
    cy.wrap(subject)
      .trigger('mousedown')
      .wait(duration)
      .trigger('mouseup');
  });


  Cypress.Commands.add('clickAndHoldShadowRoot', { prevSubject: 'element' }, (subject, duration, selector) => {
    const shadow = subject[0].shadowRoot;
  
    // Find the button inside the shadow root
    const button = shadow.querySelector(selector);
  
    // Dispatch mouse events
    button.dispatchEvent(new Event('mousedown'));
  
    return new Promise(resolve => {
      setTimeout(() => {
        button.dispatchEvent(new Event('mouseup'));
        resolve();
      }, duration);
    });
  });