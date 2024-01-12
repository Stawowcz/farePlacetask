 // Use testData directly from the before hook data driven testing
  import { LoginPage } from '../pages/LoginPage';
  import { HomePage } from '../pages/HomePage';
  
  describe('Login Functionality', () => {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    let testData;
  
    before(() => {
      cy.fixture('testData.json').then((data) => {
        testData = data;
      });
    });
  
    beforeEach(() => {
      cy.visit('/')
  
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
  
        // Assert based on the scenario
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
