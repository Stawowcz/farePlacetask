// import {LoginPage} from '../pages/LoginPage';
// import { HomePage } from '../pages/HomePage';


// describe('Login functionality regular approach', () => {
//   const homePage = new HomePage()
//   const loginPage = new LoginPage()
//   beforeEach(() => {

//     cy.visit('/', {
//       headers: {
//           'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
//       }
//   });

//   homePage.clickSignIn()
//   loginPage.acceptCookies()

//   });

//   it('Logs in with valid credentials', () => {
//     loginPage.setUsername('fareplace123@gmail.com')
//     loginPage.submitForm()
//     loginPage.setPassword('hJ*E#x&fd3?B.Uf')
//     loginPage.submitForm(0, false);
//     loginPage.assertLoggedIn()
//   });

//   it('Logs in with invalid email format', () => {
//     loginPage.setUsername('invalidemailformat')
//     loginPage.submitForm(0, false);

//     loginPage.assertInvalidEmailFormatMessage()
//   });

//   it('Logs in with empty email', () => {
//     loginPage.submitForm(0, false);

//     loginPage.assertEmptyEmailFieldMessage()
//   });

//   it('Logs in with invalid password', () => {
//     loginPage.setUsername('fareplace123@gmail.com')
//     loginPage.submitForm(0, false);

//     loginPage.setPassword('invalidpassword')
//     loginPage.submitForm(0, false);

//     loginPage.assertInvalidPasswordMessage()
//   });

//   it('Logs in with empty password', () => {
//     loginPage.setUsername('fareplace123@gmail.com')
//     loginPage.submitForm(0, false);

//     loginPage.submitForm(500, true)
//     loginPage.assertEmptyPasswordFieldMessage()
//   });
// });

// Import the data from the external JSON file
// import { LoginPage } from '../pages/LoginPage';
// import { HomePage } from '../pages/HomePage';

// describe('Login Functionality', () => {
//   const homePage = new HomePage();
//   const loginPage = new LoginPage();

//   beforeEach(() => {
//     cy.visit('/', {
//       headers: {
//         'user-agent':
//           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
//       },
//     });

//     homePage.clickSignIn();
//     loginPage.acceptCookies();
//   });

//   // Use cy.fixture to load data and forEach to iterate through scenarios
//   ['validCredentials', 'invalidEmailFormat', 'emptyEmail', 'invalidPassword', 'emptyPassword'].forEach((scenario) => {
//     it(`Logs in - ${scenario}`, () => {
//       cy.fixture('testData.json').then((testData) => {
//         const data = testData[scenario];

//         if (data.username) {
//         loginPage.setUsername(data.username);
//         loginPage.submitForm(0, false);
//         }

//         if (data.password) {
//           loginPage.setPassword(data.password);
//           loginPage.submitForm(0, false);
//         }

//         else {
//           loginPage.submitForm(0, false);
//         }

//         // Assert based on the scenario
//         switch (scenario) {
//           case 'validCredentials':
//             loginPage.assertLoggedIn();
//             break;
//           case 'invalidEmailFormat':
//             loginPage.assertInvalidEmailFormatMessage();
//             break;
//           case 'emptyEmail':
//             loginPage.submitForm(0, false);
//             loginPage.assertEmptyEmailFieldMessage();
//             break;
//           case 'invalidPassword':
//             loginPage.assertInvalidPasswordMessage();
//             break;
//           case 'emptyPassword':
//             loginPage.submitForm(500, true);
//             loginPage.assertEmptyPasswordFieldMessage();
//             break;
//         }
//       });
//     });
//   });

// Import the data from the external JSON file
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
    cy.visit('/', {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });

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
        loginPage.setimpPassword(data.password);
        loginPage.submitForm(0, false);
      } else {
        loginPage.submitForm(0, false);
      }

      // Assert based on the scenario
      switch (scenario) {
        case 'validCredentials':
          loginPage.assertLoggedIn();
          break;
        case 'invalidEmailFormat':
          loginPage.assertInvalidEmailFormatMessage();
          break;
        case 'emptyEmail':
          loginPage.submitForm(0, false);
          loginPage.assertEmptyEmailFieldMessage();
          break;
        case 'invalidPassword':
          loginPage.assertInvalidPasswordMessage();
          break;
        case 'emptyPassword':
          loginPage.submitForm(500, true);
          loginPage.assertEmptyPasswordFieldMessage();
          break;
      }
    });
  });
});