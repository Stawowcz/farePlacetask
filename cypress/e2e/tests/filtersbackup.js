import { HomePage } from '../pages/HomePage';
import { generateRandomDate, formatDateForDisplay, generateRandomNumber2to6, generateRandomNumber0to3, generateRandomCity } from '../../support/helper';


describe('Search and filter normal approach', () => {
  const homePage = new HomePage();
  let testData;

  before(() => {
    cy.fixture('filtersData.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    homePage.acceptCookies();
  });

  const numberOfIterations = 3;

  Array.from({ length: numberOfIterations }).forEach((_, index) => {
    it(`Should choose random city from list - Iteration ${index + 1}`, () => {
      const { startDate, endDate, startDateUpdated, endDateUpdated, startDateDay, endDateDay, startDateDayUpdated, endDateDayUpdated } = generateRandomDate();
      const formattedStartDate = formatDateForDisplay(new Date(startDate));
      const formattedEndDate = formatDateForDisplay(new Date(endDate));
      const formattedStartDateUpdated = formatDateForDisplay(new Date(startDateUpdated));
      const formattedEndDateUpdated = formatDateForDisplay(new Date(endDateUpdated));
      
      // Use the cities list from the fixture
      const randomCity = generateRandomCity(testData.cities);
      const randomCityUpdated = generateRandomCity(testData.cities);

      const randomAdult = generateRandomNumber2to6();
      const randomAdultUpdated = generateRandomNumber0to3();
      const numberOfNights = endDateDay - startDateDay;
      const numberOfAdults = randomAdult + 2;
      const numberOfNightsUpdated = endDateDayUpdated - startDateDayUpdated;
      const numberOfAdultsUpdated = randomAdult + 2 - randomAdultUpdated;
      const expectedOccupancyText = new RegExp(`^${numberOfNights} night[s]?, ${numberOfAdults} adults$`);
      const expectedOccupancyTextUpdated = new RegExp(`^${numberOfNightsUpdated} night[s]?, ${numberOfAdultsUpdated} adults$`);
      const expectedOccupacyText = `${randomAdult + 2} adults · 0 children · 1 room`;
      const expectedOccupacyUpdatedText = `${randomAdult + 2 - randomAdultUpdated} adults · 0 children · 1 room`;

    //Search and set filters
    homePage.setCity(randomCity)
    homePage.openCalendar();
    homePage.clickDate(startDate);
    homePage.clickDate(endDate);
    homePage.expandOccupancyFilter();
    homePage.increaseAdult(randomAdult);
    homePage.submitOccupancy();
    homePage.submitSearch();

    //Assertion of first search
    homePage.assertCityValue(randomCity);
    homePage.assertStartDateValue(formattedStartDate);
    homePage.assertEndDateValue(formattedEndDate);
    homePage.assertOccupancyConfig(expectedOccupacyText);
    homePage.assertPageTitle(randomCity);
    homePage.assertOccupancyInEveryHotel(expectedOccupancyText);
  
    // Set the updated city and perform actions
    homePage.clearCity()
    homePage.setCity(randomCityUpdated);
    homePage.openCalendar();
    homePage.clickDate(startDateUpdated);
    homePage.clickDate(endDateUpdated);
    homePage.expandOccupancyFilter();
    homePage.decreaseAdult(randomAdultUpdated);
    homePage.submitOccupancy();
    homePage.submitSearch();
  
    //Assertions for the updated search
    homePage.assertCityValue(randomCityUpdated);
    homePage.assertStartDateValue(formattedStartDateUpdated);
    homePage.assertEndDateValue(formattedEndDateUpdated);
    homePage.assertOccupancyConfig(expectedOccupacyUpdatedText);
    homePage.assertPageTitle(randomCityUpdated);
    homePage.assertOccupancyInEveryHotel(expectedOccupancyTextUpdated);

      // Rest of your test code...
    });
  });
});




// describe('Search and filter normal approach', () => {
//   const homePage = new HomePage();
//   let testData;

//   before(() => {
//     cy.fixture('filtersData.json').then((data) => {
//       testData = data;
//     });
//   });

//   beforeEach(() => {
//     cy.visit('/')
//     homePage.acceptCookies();
//   });

// it.only('Should choose random city from list', () => {
//     const { startDate, endDate, startDateUpdated, endDateUpdated, startDateDay, endDateDay, startDateDayUpdated, endDateDayUpdated } = generateRandomDate();
//     const formattedStartDate = formatDateForDisplay(new Date(startDate));
//     const formattedEndDate = formatDateForDisplay(new Date(endDate));
//     const formattedStartDateUpdated = formatDateForDisplay(new Date(startDateUpdated));
//     const formattedEndDateUpdated = formatDateForDisplay(new Date(endDateUpdated));
//     const randomCity = generateRandomCity(testData.cities);
//     const randomCityUpdated = generateRandomCity(testData.cities);
//     const randomAdult = generateRandomNumber2to6();
//     const randomAdultUpdated = generateRandomNumber0to3();
//     const numberOfNights = endDateDay - startDateDay
//     const numberOfAdults = randomAdult + 2
//     const numberOfNightsUpdated = endDateDayUpdated-startDateDayUpdated
//     const numberOfAdultsUpdated = randomAdult + 2 - randomAdultUpdated 
//     const expectedOccupancyText = new RegExp(`^${numberOfNights} night[s]?, ${numberOfAdults} adults$`);
//     const expectedOccupancyTextUpdated = new RegExp(`^${numberOfNightsUpdated} night[s]?, ${numberOfAdultsUpdated} adults$`);
//     const expectedOccupacyText = `${randomAdult + 2} adults · 0 children · 1 room`;
//     const expectedOccupacyUpdatedText = `${randomAdult + 2 - randomAdultUpdated} adults · 0 children · 1 room`;
  
//     //Search and set filters
//     homePage.setCity(randomCity)
//     homePage.openCalendar();
//     homePage.clickDate(startDate);
//     homePage.clickDate(endDate);
//     homePage.expandOccupancyFilter();
//     homePage.increaseAdult(randomAdult);
//     homePage.submitOccupancy();
//     homePage.submitSearch();

//     //Assertion of first search
//     homePage.assertCityValue(randomCity);
//     homePage.assertStartDateValue(formattedStartDate);
//     homePage.assertEndDateValue(formattedEndDate);
//     homePage.assertOccupancyConfig(expectedOccupacyText);
//     homePage.assertPageTitle(randomCity);
//     homePage.assertOccupancyInEveryHotel(expectedOccupancyText);
  
//     // Set the updated city and perform actions
//     homePage.clearCity()
//     homePage.setCity(randomCityUpdated);
//     homePage.openCalendar();
//     homePage.clickDate(startDateUpdated);
//     homePage.clickDate(endDateUpdated);
//     homePage.expandOccupancyFilter();
//     homePage.decreaseAdult(randomAdultUpdated);
//     homePage.submitOccupancy();
//     homePage.submitSearch();
  
//     //Assertions for the updated search
//     homePage.assertCityValue(randomCityUpdated);
//     homePage.assertStartDateValue(formattedStartDateUpdated);
//     homePage.assertEndDateValue(formattedEndDateUpdated);
//     homePage.assertOccupancyConfig(expectedOccupacyUpdatedText);
//     homePage.assertPageTitle(randomCityUpdated);
//     homePage.assertOccupancyInEveryHotel(expectedOccupancyTextUpdated);
//   });
// });


// cy.get('[data-testid="filters-group-label-content"]').contains('Free cancellation').click({force: true})

// cy.get('[name="fc=2"]').check({force: true}); // Checking the checkbox
// cy.get('[name="fc=2"]').should('be.checked')

// cy.get('[name="distance=1000"]').check({force: true})
// cy.get('[name="distance=1000"]').should('be.checked')


// cy.get('.abf093bdfe.d068504c75 strong').each(($element, index) => {
//     cy.get($element).invoke('text').then((text) => {
//         expect(text).to.match(/(Free cancellation|No prepayment needed)/);
//     });
// });