import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

describe('Login Scenarios', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  let testData: Record<string, any>

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    homePage.clickSignIn();
    homePage.acceptCookies();
  });

  // Use testData directly from the before hook
  ['validCredentials', 'invalidEmailFormat', 'emptyEmail', 'invalidPassword', 'emptyPassword'].forEach((scenario) => {
    it(`Logs in - ${scenario}`, () => {
      const data = testData[scenario];

      if (data.username) {
        loginPage.setUsername(data.username);
        loginPage.submitForm(0, false);
      }

      if (data.password) {
        loginPage.setPassword(data.password);
        loginPage.submitForm(0, false);
      } else {
        loginPage.submitForm(0, false);
      }

      // Assertion is based on the scenarios, validCredential and invalidPassword do not work because captcha mechanism is
      // triggered
      switch (scenario) {
        case 'validCredentials':
          loginPage.assertLoggedIn(data.expectedAssertion);
          break;
        case 'invalidEmailFormat':
          loginPage.assertInvalidEmailFormatMessage(data.expectedAssertion);
          break;
        case 'emptyEmail':
          loginPage.submitForm(0, false);
          loginPage.assertEmptyEmailFieldMessage(data.expectedAssertion);
          break;
        case 'invalidPassword':
          loginPage.assertInvalidPasswordMessage(data.expectedAssertion);
          break;
        case 'emptyPassword':
          loginPage.submitForm(500, true);
          loginPage.assertEmptyPasswordFieldMessage(data.expectedAssertion);
          break;
      }
    });
  });
});
