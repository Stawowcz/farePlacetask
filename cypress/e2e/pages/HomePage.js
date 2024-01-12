export class HomePage {

  constructor() {
    this.cookieAcceptButtonLoc = '#onetrust-accept-btn-handler';
    this.signInButtonLoc = 'Sign in';
    this.dateLoc = (date) => `[data-date="${date}"]`;
    this.cityInputLoc = '[name="ss"]';
    this.clearCityButtonLoc = '[data-testid="input-clear"]';
    this.calendarFieldLoc = '[data-testid="date-display-field-start"]';
    this.occupancyFilterLoc = '[data-testid="occupancy-config"]';
    this.decreaseAdultButtonLoc = 'button[aria-hidden="true"]:first';
    this.increaseAdultButtonLoc = 'button[aria-hidden="true"]:last';
    this.submitOccupancyButtonLoc = '.e4adce92df';
    this.searchButtonLoc = '[data-testid="searchbox-layout-wide"] button';
    this.groupAdultLoc = '#group_adults';
    this.assertFormattedEndDateLoc = '[data-testid="date-display-field-end"]';
    this.assertHeaderLoc = 'h1[aria-live="assertive"]';
    this.assertOccupancyInEveryHotelLoc = '[data-testid="property-card"] [data-testid="price-for-x-nights"]';
    this.dissmissSignInfoButtonLoc = 'button[aria-label="Dismiss sign-in info."]'
  }

  acceptCookies() {
    cy.get(this.cookieAcceptButtonLoc).click();
  }

  clickSignIn() {
    cy.contains(this.signInButtonLoc).click();
  }

  clickDate(date) {
    cy.get(this.dateLoc(date)).click({ force: true });
  }


  setCity(city) {
    cy.wait(1000) // I know bad approach but needed on mozilla and chrome
    cy.get(this.cityInputLoc).click({ force: true });
    cy.get(this.cityInputLoc).type(city, { force: true });
  }

  clearCity() {
    cy.wait(1000) // I know bad approach but needed on mozilla and chrome
    cy.get(this.clearCityButtonLoc)
      .dblclick({ force: true })
    
  }

  openCalendar() {
    cy.get(this.calendarFieldLoc).click({ force: true });
  }

  expandOccupancyFilter() {
    cy.get(this.occupancyFilterLoc).click({ force: true });
  }

  decreaseAdult(numberOfIncrement) {
    for (let i = 1; i <= numberOfIncrement; i++) {
      cy.get(this.groupAdultLoc).parent().find(this.decreaseAdultButtonLoc).click({force:true}); 
    }
  }

  increaseAdult(numberOfIncrement) {
    for (let i = 1; i <= numberOfIncrement; i++) {
      cy.get(this.groupAdultLoc).parent().find(this.increaseAdultButtonLoc).click({force:true}); 
    }
  }

  submitOccupancy() {
    cy.get(this.submitOccupancyButtonLoc).contains('Done').click({ force: true });
  }

  submitSearch() {
    cy.get(this.searchButtonLoc).contains('Search').click({ force: true });
  }

  dismissSignInInfo() {
      cy.get(this.dissmissSignInfoButtonLoc).then(($button) => {
        if ($button.is(':visible')) {
          cy.get(this.dissmissSignInfoButtonLoc).click();
        } else {
          cy.log('The x button is not visible on the home page.');
        }
      });
  }

  assertCityValue(randomCity) {
    cy.get(this.cityInputLoc).should('have.value', randomCity);
  }

  assertStartDateValue(formattedStartDate) {
    cy.get(this.calendarFieldLoc).should('contain', formattedStartDate);
  }

  assertEndDateValue(formattedEndDate) {
    cy.get(this.assertFormattedEndDateLoc).should('contain', formattedEndDate);
  }

  assertOccupancyConfig(expectedOccupancyText) {
    cy.get(this.occupancyFilterLoc).should('be.visible').invoke('text').should('include', expectedOccupancyText);
  }

  assertPageTitle(randomCity) {
    cy.get(this.assertHeaderLoc).should('include.text', randomCity);
  }

  assertOccupancyInEveryHotel(expectedOccupancyText) {
    cy.get(this.assertOccupancyInEveryHotelLoc).each(($element, index) => {
      cy.get($element).invoke('text').then((text) => {
        expect(text).to.match(expectedOccupancyText);
      });
    });
  }
}










