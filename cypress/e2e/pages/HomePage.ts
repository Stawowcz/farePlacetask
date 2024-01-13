export class HomePage {

  private cookieAcceptButtonLoc: string = '#onetrust-accept-btn-handler';
  private signInButtonLoc: string = 'Sign in';
  private dateLoc: (date: string) => string = (date) => `[data-date="${date}"]`;
  private cityInputLoc: string = '[name="ss"]';
  private clearCityButtonLoc: string = '[data-testid="input-clear"]';
  private calendarFieldLoc: string = '[data-testid="date-display-field-start"]';
  public occupancyFilterLoc: string = '[data-testid="occupancy-config"]';
  private decreaseAdultButtonLoc: string = 'button[aria-hidden="true"]:first';
  private increaseAdultButtonLoc: string = 'button[aria-hidden="true"]:last';
  private submitOccupancyButtonLoc: string = '.e4adce92df';
  private searchButtonLoc: string = '[data-testid="searchbox-layout-wide"] button';
  private groupAdultLoc: string = '#group_adults';
  private assertFormattedEndDateLoc: string = '[data-testid="date-display-field-end"]';
  private assertHeaderLoc: string = 'h1[aria-live="assertive"]';
  public assertOccupancyInEveryHotelLoc: string = '[data-testid="property-card"] [data-testid="price-for-x-nights"]';
  private dissmissSignInfoButtonLoc: string = 'button[aria-label="Dismiss sign-in info."]';

  acceptCookies(): void {
    cy.get(this.cookieAcceptButtonLoc).click();
  }

  clickSignIn(): void {
    cy.contains(this.signInButtonLoc).click();
  }

  clickDate(date: string): void {
    cy.get(this.dateLoc(date)).click({ force: true });
  }

  setCity(city: string): void {
    cy.wait(2000);
    cy.get(this.cityInputLoc).click({ force: true });
    cy.get(this.cityInputLoc).type(city, { force: true });
  }

  clearCity(): void {
    cy.wait(2000);
    cy.get(this.clearCityButtonLoc).dblclick({ force: true });
  }

  openCalendar(): void {
    cy.get(this.calendarFieldLoc).click({ force: true });
  }

  expandOccupancyFilter(): void {
    cy.get(this.occupancyFilterLoc).click({ force: true });
  }

  decreaseAdult(numberOfIncrement: number): void {
    for (let i = 1; i <= numberOfIncrement; i++) {
      cy.get(this.groupAdultLoc).parent().find(this.decreaseAdultButtonLoc).click({ force: true });
    }
  }

  increaseAdult(numberOfIncrement: number): void {
    for (let i = 1; i <= numberOfIncrement; i++) {
      cy.get(this.groupAdultLoc).parent().find(this.increaseAdultButtonLoc).click({ force: true });
    }
  }

  submitOccupancy(): void {
    cy.get(this.submitOccupancyButtonLoc).contains('Done').click({ force: true });
  }

  submitSearch(): void {
    cy.get(this.searchButtonLoc).contains('Search').click({ force: true });
  }

  dismissSignInInfo(): void {
    cy.get(this.dissmissSignInfoButtonLoc).then(($button) => {
      if ($button.is(':visible')) {
        cy.get(this.dissmissSignInfoButtonLoc).click();
      } else {
        cy.log('The x button is not visible on the home page.');
      }
    });
  }

  checkElement(locator: string): void {
    cy.wait(1000);
    cy.get(locator).first().click({ force: true });
    cy.wait(3000);
  }

  assertCityValue(randomCity: string): void {
    cy.get(this.cityInputLoc).should('have.value', randomCity);
  }

  assertStartDateValue(formattedStartDate: string): void {
    cy.get(this.calendarFieldLoc).should('contain', formattedStartDate);
  }

  assertEndDateValue(formattedEndDate: string): void {
    cy.get(this.assertFormattedEndDateLoc).should('contain', formattedEndDate);
  }

  assertOccupancyFilters(expectedOccupacyText: RegExp, locator:string): void {
    cy.get(locator).each(($element) => {
      const jQueryElement = $element as JQuery<HTMLElement>;
      cy.wrap(jQueryElement).invoke('text').then((text) => {
        expect(text).to.match(expectedOccupacyText);
      });
    });
  }

  assertPageTitle(randomCity: string): void {
    cy.get(this.assertHeaderLoc).should('include.text', randomCity);
  }

  assertElementChecked(locator: string): void {
    cy.get(locator).should('be.checked');
  }

  assertFilterApplication(locator: string, randomCity: string): void {
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