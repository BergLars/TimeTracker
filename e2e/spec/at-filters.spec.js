var Filters = require('../page/at-filters.js');
var filters = new Filters();
var Timetracker = require('../page/at-timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/at-login.js');
var login = new Login();

describe('Project Filter', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(filters.username, filters.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(filters.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        filters.profileIcon.click();
        browser.wait(EC.elementToBeClickable(filters.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        filters.logoutButton.click();
    });
    describe('Click on "All" option project filter', () => {
        it('Total entries should be equal to 0', () => {
            browser.wait(EC.elementToBeClickable(filters.projectsFilter), TIMEOUT, "Project filter" + " not clickable");
            filters.projectsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.clickOnAllProject), TIMEOUT, "All" + " not clickable");
            filters.clickOnAllProject.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(0);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
    describe('Click on "FTT" option project filter', () => {
        it('Total entries should be equal to 38', () => {
            browser.wait(EC.elementToBeClickable(filters.projectsFilter), TIMEOUT, "Project filter" + " not clickable");
            filters.projectsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectFTTProject), TIMEOUT, "FTT" + " not clickable");
            filters.selectFTTProject.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(38);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
});
describe('Client Filter', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(filters.username, filters.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(filters.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        filters.profileIcon.click();
        browser.wait(EC.elementToBeClickable(filters.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        filters.logoutButton.click();
    });
    describe('Click on "All" option client filter', () => {
        it('Total entries should be equal to 0', () => {
            browser.wait(EC.elementToBeClickable(filters.clientsFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.clickOnAllClient), TIMEOUT, "All" + " not clickable");
            filters.clickOnAllClient.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(0);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
    describe('Click on "FLUANCE" option client filter', () => {
        it('Total entries should be equal to 26', () => {
            browser.wait(EC.elementToBeClickable(filters.clientsFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.fluance), TIMEOUT, "FLUANCE" + " not clickable");
            filters.fluance.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(26);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
});
describe('Task Filter', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(filters.username, filters.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(filters.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        filters.profileIcon.click();
        browser.wait(EC.elementToBeClickable(filters.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        filters.logoutButton.click();
    });
    describe('Click on "All" option task filter', () => {
        it('Total entries should be equal to 0', () => {
            browser.wait(EC.elementToBeClickable(filters.tasksFilter), TIMEOUT, "Task filter" + " not clickable");
            filters.tasksFilter.click();
            browser.wait(EC.elementToBeClickable(filters.clickOnAllTask), TIMEOUT, "All" + " not clickable");
            filters.clickOnAllTask.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(0);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
    describe('Click on "blabla" option task filter', () => {
        it('Total entries should be equal to 28', () => {
            browser.wait(EC.elementToBeClickable(filters.tasksFilter), TIMEOUT, "Task filter" + " not clickable");
            filters.tasksFilter.click();
            browser.wait(EC.elementToBeClickable(filters.blabla), TIMEOUT, "Blabla option" + " not clickable");
            filters.blabla.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(45);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
});
describe('Project and Client Filters', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(filters.username, filters.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(filters.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        filters.profileIcon.click();
        browser.wait(EC.elementToBeClickable(filters.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        filters.logoutButton.click();
    });
    describe('Click on "FTT" project option and than on "FLUANCE" client option', () => {
        it('Total entries should be equal to 25', () => {
            browser.wait(EC.elementToBeClickable(filters.projectsFilter), TIMEOUT, "Project filter" + " not clickable");
            filters.projectsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectFTTProject), TIMEOUT, "FTT" + " not clickable");
            filters.selectFTTProject.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(38);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
            browser.sleep(SENDKEYS_TIMEOUT);
            browser.wait(EC.elementToBeClickable(filters.clientsFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.fluance), TIMEOUT, "FLUANCE" + " not clickable");
            filters.fluance.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(25);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
});
describe('Project and Task Filters', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(filters.username, filters.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(filters.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        filters.profileIcon.click();
        browser.wait(EC.elementToBeClickable(filters.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        filters.logoutButton.click();
    });
    describe('Click on "FTT" project option and than on "blabla" task option', () => {
        it('Total entries should be equal to 25', () => {
            browser.wait(EC.elementToBeClickable(filters.projectsFilter), TIMEOUT, "Project filter" + " not clickable");
            filters.projectsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.selectFTTProject), TIMEOUT, "FTT" + " not clickable");
            filters.selectFTTProject.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(38);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
            browser.sleep(SENDKEYS_TIMEOUT);
            browser.wait(EC.elementToBeClickable(filters.tasksFilter), TIMEOUT, "Task filter" + " not clickable");
            filters.tasksFilter.click();
            browser.wait(EC.elementToBeClickable(filters.blabla), TIMEOUT, "Blabla option" + " not clickable");
            filters.blabla.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(36);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
});
describe('Client and Task Filters', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(filters.username, filters.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(filters.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        filters.profileIcon.click();
        browser.wait(EC.elementToBeClickable(filters.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        filters.logoutButton.click();
    });
    describe('Click on "FLUANCE" client option and than on "blabla" task option', () => {
        it('Total entries should be equal to 24', () => {
            browser.wait(EC.elementToBeClickable(filters.clientsFilter), TIMEOUT, "Client filter" + " not clickable");
            filters.clientsFilter.click();
            browser.wait(EC.elementToBeClickable(filters.fluance), TIMEOUT, "FLUANCE" + " not clickable");
            filters.fluance.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(26);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
            browser.sleep(SENDKEYS_TIMEOUT);
            browser.wait(EC.elementToBeClickable(filters.tasksFilter), TIMEOUT, "Task filter" + " not clickable");
            filters.tasksFilter.click();
            browser.wait(EC.elementToBeClickable(filters.blabla), TIMEOUT, "Blabla option" + " not clickable");
            filters.blabla.click().then(() => {
                expect(filters.numberOfEntries.count()).toBe(24);
            });
            browser.actions().mouseMove(element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)')), -20, -20).click().perform();
        });
    });
});