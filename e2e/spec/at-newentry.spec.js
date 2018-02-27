var NewEntry = require('../page/at-newentry.js');
var newEntry = new NewEntry();
var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-menu.js');
var userprofileMenu = new UserprofileMenu();

describe('New entry button', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        userprofileMenu.profileIcon.click();
        browser.wait(EC.elementToBeClickable(userprofileMenu.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        userprofileMenu.logoutButton.click();
    });
    describe('Create a new entry', () => {
        it('It should create a new entry with time spent', () => {
            newEntry.newEntryButton.click();
            newEntry.descriptionField.sendKeys('Protractor test');
            browser.sleep(500);
            newEntry.blockClientOption.click();
            browser.sleep(500);
            newEntry.dateField.sendKeys('02.02.2018');
            browser.sleep(500);
            newEntry.timespentField.sendKeys('02:00');
            browser.sleep(500);
            newEntry.billableCheckbox.click();
            newEntry.okButton.click();
        });
        it('It should create a new entry with start and end time', () => {
            newEntry.newEntryButton.click();
            newEntry.descriptionField.sendKeys('Protractor test 2');
            browser.sleep(500);
            newEntry.dateField.sendKeys('02.01.2018');
            browser.sleep(500);
            newEntry.enableTypingTimesCheckBox.click();
            newEntry.startTimeField.sendKeys('12:00');
            browser.sleep(500);
            newEntry.endTimeField.sendKeys('13:00');
            browser.sleep(500);
            newEntry.okButton.click();
        });
        it('Total entries are equal to 2', () => {
            browser.sleep(500);
            expect(newEntry.numberOfEntries.count()).toBe(2);
        });
    });
});