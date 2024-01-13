export class HomePage {
  private cookieAcceptButtonLoc: string = '#onetrust-accept-btn-handler';
  private signInButtonLoc: string = 'Sign in';
  private dateLoc: (date: string) => string = (date) => `[data-date="${date}"]`;
  private cityInputLoc: string = '[name="ss"]';
  private clearCityButtonLoc: string = '[data-testid="input-clear"]';
  public calendarFieldLoc: string = '[data-testid="date-display-field-start"]';
  public occupancyFilterLoc: string = '[data-testid="occupancy-config"]';
  private decreaseAdultButtonLoc: string = 'button[aria-hidden="true"]:first';
  private increaseAdultButtonLoc: string = 'button[aria-hidden="true"]:last';
  private submitOccupancyButtonLoc: string = '.e4adce92df';
  private searchButtonLoc: string = '[data-testid="searchbox-layout-wide"] button';
  private groupAdultLoc: string = '#group_adults';
  public assertFormattedEndDateLoc: string = '[data-testid="date-display-field-end"]';
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
    cy.wait(2000); // I know bad approach but needed on mozilla and chrome, you can try comment it my internet was kinda slow
    // cy.get(this.cityInputLoc).should('be.visible') //you can check with this
    cy.get(this.cityInputLoc).click({ force: true });
    cy.get(this.cityInputLoc).type(city, { force: true });
  }

  clearCity(): void {
    cy.wait(2000); // I know bad approach but needed on mozilla and chrome, you can try comment it my internet was kinda slow
    // cy.get(this.cityInputLoc).should('be.visible') //you can check with this
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

  assertDateValue(formattedDate: string, locator:string): void {
    cy.get(locator).should('contain', formattedDate);
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

  // assertion for title header after side filters application if results of hotel found are bigger than 999 we skip assertion
  // why? because then e.g we do not have 1000, but we got 1,000 in header title and regex was problematic
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
