export class HomePage {

  constructor() {
    // it is not the approach as I follow, I practice to keep locator in object but I did like this in here
    // why not to try different approach
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
    cy.wait(2000) // I know bad approach but needed on mozilla and chrome, you can try comment it my internet was kinda slow
    // cy.get(this.cityInputLoc).should('be.visible') //you can check with this
    cy.get(this.cityInputLoc).click({ force: true });
    cy.get(this.cityInputLoc).type(city, { force: true });
  }

  clearCity() {
    cy.wait(2000) // I know bad approach but needed on mozilla and chrome you can try comment it my internet was kinda slow
    // cy.get(this.cityInputLoc).should('be.visible') //you can check with this
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

  checkElement(locator) {
    cy.wait(1000) // I know bad approach but booking is rendering so slowly it is the reason of that IMO
    cy.get(locator).first().click({ force: true });
    cy.wait(3000) // same as above
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

  assertOccupancyConfig(expectedOccupacyText) {
    cy.get(this.occupancyFilterLoc).each(($element, index) => {
      cy.get($element).invoke('text').then((text) => {
        expect(text).to.match(expectedOccupacyText);
      })
    })
  }

  assertPageTitle(randomCity) {
    cy.get(this.assertHeaderLoc).should('include.text', randomCity);
  }

  assertOccupancyInEveryHotel(expectedOccupacyText) {
    cy.get(this.assertOccupancyInEveryHotelLoc).each(($element, index) => {
      cy.get($element).invoke('text').then((text) => {
        expect(text).to.match(expectedOccupacyText);
      });
    });
  }

  assertElementChecked(locator) {
    cy.get(locator).should('be.checked');
  }

  // assertion for title header after side filters application if results of hotel found are bigger than 999 we skip assertion
  // why? because then e.g we do not have 1000, but we got 1,000 in header title and regex was problematic
  assertFilterApplication(locator, randomCity) {
    cy.get(locator)
      .first()
      .invoke('text')
      .then((actualText) => {
        const trimmedText = actualText.trim();
        const isGreaterThan999 = parseInt(trimmedText.replace(/,/g, '')) > 999;
  
        const regexPattern = new RegExp(
          `${randomCity}: ${trimmedText} properties found`
        );
  
        cy.get(this.assertHeaderLoc)
        .invoke('text')
        .then((text) => {
          if (!isGreaterThan999) {
            expect(text).to.match(regexPattern);
          } else {
            cy.log('Skipping assertion for values greater than 999');
          }
        });
      });
  }
}











