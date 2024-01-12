import { HomePage } from '../pages/HomePage';
import { generateRandomDate, formatDateForDisplay, generateRandomNumber2to6, generateRandomNumber0to3, generateRandomCity } from '../../support/helper';


describe('Search and filter', () => {
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
    it(`Should choose random city from list and apply filters - Iteration ${index + 1}`, () => {
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
      const expectedOccupacyInEveryHotelText = new RegExp(`^${numberOfNights} night[s]?, ${numberOfAdults} adult[s]?$`);
      const expectedOccupacyTextInEveryHotelUpdated = new RegExp(`^${numberOfNightsUpdated} night[s]?, ${numberOfAdultsUpdated} adult[s]?$`);
      const expectedOccupacyText = new RegExp(`^${randomAdult + 2} adult[s]? · 0 children · 1 room[s]?$`);
      const expectedOccupacyUpdatedText = new RegExp(`^${randomAdult + 2 - randomAdultUpdated} adult[s]? · 0 children · 1 room[s]?$`);
      
      // Search and set filters
      //   homePage.dismissSignInInfo();
      homePage.setCity(randomCity);
      homePage.openCalendar();
      homePage.clickDate(startDate);
      homePage.clickDate(endDate);
      homePage.expandOccupancyFilter();
      homePage.increaseAdult(randomAdult);
      homePage.submitOccupancy();
      homePage.submitSearch();
  
      // Assertion of the first search
      homePage.assertCityValue(randomCity);
      homePage.assertStartDateValue(formattedStartDate);
      homePage.assertEndDateValue(formattedEndDate);
      homePage.assertOccupancyConfig(expectedOccupacyText);
      homePage.assertPageTitle(randomCity);
      homePage.assertOccupancyInEveryHotel(expectedOccupacyInEveryHotelText);
  
      // Set the updated city and perform actions
      homePage.clearCity();
      homePage.setCity(randomCityUpdated);
      homePage.openCalendar();
      homePage.clickDate(startDateUpdated);
      homePage.clickDate(endDateUpdated);
      homePage.expandOccupancyFilter();
      homePage.decreaseAdult(randomAdultUpdated);
      homePage.submitOccupancy();
      homePage.submitSearch();
  
      // Assertions for the updated search
      homePage.assertCityValue(randomCityUpdated);
      homePage.assertStartDateValue(formattedStartDateUpdated);
      homePage.assertEndDateValue(formattedEndDateUpdated);
      homePage.assertOccupancyConfig(expectedOccupacyUpdatedText);
      homePage.assertPageTitle(randomCityUpdated);
      homePage.assertOccupancyInEveryHotel(expectedOccupacyTextInEveryHotelUpdated);
    });
  }); 
});