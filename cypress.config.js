module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": "https://www.booking.com/",
    "watchForFileChanges": false,
    "chromeWebSecurity": false,
    "videosFolder": "cypress/videos",
    "screenshotsFolder": "cypress/screenshots",
    "video": true,
    "viewportWidth": 1280,
    "viewportHeight": 720,
    "screenshotsOnFailure": true,
    "defaultCommandTimeout": 12000, 
    "pageLoadTimeout": 20000
  },
};