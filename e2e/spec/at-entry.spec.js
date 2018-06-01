var Entry = require('../page/at-entry.js');
var entry = new Entry();
var Timetracker = require('../page/at-timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/at-login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-user.js');
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
            entry.newEntryButton.click();
            entry.descriptionField.sendKeys('Protractor test');
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.blockClientOption.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.blockTaskOption.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.dateField.sendKeys('02.02.2018');
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.timespentField.sendKeys('02:00');
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.billableCheckbox.click();
            entry.okButton.click();
        });
        it('It should create a new entry with start and end time', () => {
            entry.newEntryButton.click();
            entry.descriptionField.sendKeys('Protractor test 2');
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.dateField.sendKeys('02.01.2018');
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.enableTypingTimesCheckBox.click();
            entry.startTimeField.sendKeys('12:00');
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.endTimeField.sendKeys('13:00');
            browser.sleep(SENDKEYS_TIMEOUT);
            entry.okButton.click();
        });
        it('Total entries are equal to 2', () => {
            browser.sleep(SENDKEYS_TIMEOUT);
            expect(entry.numberOfEntries.count()).toBe(2);
        });
    });
});
describe('Delete an entry', function () {
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
    describe('Delete all entries', () => {
        it('It should delete the first entry', () => {
            browser.wait(EC.elementToBeClickable(entry.selectFirstEntry), TIMEOUT, "First entry" + " not clickable");
            entry.selectFirstEntry.click();
            entry.deleteIcon.click();
            entry.okButton.click();
        });
        it('It should delete the second entry', () => {
            browser.wait(EC.elementToBeClickable(entry.selectFirstEntry), TIMEOUT, "First entry" + " not clickable");
            entry.selectFirstEntry.click();
            entry.deleteIcon.click();
            entry.okButton.click();
        });
        it('Total entries are equal to 0', () => {
            browser.sleep(500);
            expect(entry.numberOfEntries.count()).toBe(0);
        });
    });
});