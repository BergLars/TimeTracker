var Filters = require('../page/at-filters.js');
var filters = new Filters();
var Timetracker = require('../page/at-timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/at-login.js');
var login = new Login();

describe('Filters', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(filters.username, filters.password);
    });
    // afterEach(() => {
    //     browser.wait(EC.elementToBeClickable(filters.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
    //     filters.profileIcon.click();
    //     browser.wait(EC.elementToBeClickable(filters.logoutButton), TIMEOUT, "Logout button" + " not clickable");
    //     filters.logoutButton.click();
    // });
    describe('Click on "All" option project filter', () => {
        it('Total entries should be equal to 0', () => {
            browser.wait(EC.elementToBeClickable(filters.projectFilter), TIMEOUT, "Project filter" + " not clickable");
            filters.projectFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectAllProject), TIMEOUT, "All" + " not clickable");
            filters.selectAllProject.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(0);
            });
            browser.wait(EC.elementToBeClickable(filters.clickAnywhere), TIMEOUT, "Body" + " not clickable");
            filters.clickAnywhere.click();
        });
    });
    describe('Click on "FTT" option project filter', () => {
        it('Total entries should be equal to 38', () => {
            browser.wait(EC.elementToBeClickable(filters.projectFilter), TIMEOUT, "Project filter" + " not clickable");
            filters.projectFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectFTTProject), TIMEOUT, "FTT" + " not clickable");
            filters.selectFTTProject.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(38);
            });
            browser.wait(EC.elementToBeClickable(filters.clickAnywhere), TIMEOUT, "Body" + " not clickable");
            filters.clickAnywhere.click();
        });
    });
    describe('Click on "All" option client filter', () => {
        it('Total entries should be equal to 0', () => {
            browser.wait(EC.elementToBeClickable(filters.clientFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectAllClient), TIMEOUT, "All" + " not clickable");
            filters.selectAllClient.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(0);
            });
            // browser.wait(EC.elementToBeClickable(filters.clickAnywhere), TIMEOUT, "Body" + " not clickable");
            // filters.clickAnywhere.click();
        });
    });
    describe('Click on "FLUANCE" option client filter', () => {
        fit('Total entries should be equal to 26', () => {
            browser.wait(EC.elementToBeClickable(filters.clientFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectFluanceClient), TIMEOUT, "FLUANCE" + " not clickable");
            filters.selectFluanceClient.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(38);
            });
            // browser.wait(EC.elementToBeClickable(filters.clickAnywhere), TIMEOUT, "Body" + " not clickable");
            // filters.clickAnywhere.click();
        });
    });
    describe('Click on "All" option task filter', () => {
        it('Total entries should be equal to 0', () => {
            browser.wait(EC.elementToBeClickable(filters.clientFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectAllClient), TIMEOUT, "All" + " not clickable");
            filters.selectAllClient.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(0);
            });
            // browser.wait(EC.elementToBeClickable(filters.clickAnywhere), TIMEOUT, "Body" + " not clickable");
            // filters.clickAnywhere.click();
        });
    });
    describe('Click on "FLUANCE" option task filter', () => {
        it('Total entries should be equal to 26', () => {
            browser.wait(EC.elementToBeClickable(filters.clientFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectFluanceClient), TIMEOUT, "FLUANCE" + " not clickable");
            filters.selectFluanceClient.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(38);
            });
            browser.wait(EC.elementToBeClickable(filters.clickAnywhere), TIMEOUT, "Body" + " not clickable");
            filters.clickAnywhere.click();
        });
    });
});