var DeleteEntry = require('../page/at-deleteentry.js');
var deleteEntry = new DeleteEntry();
var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-menu.js');
var userprofileMenu = new UserprofileMenu();

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
            browser.sleep(500);
            deleteEntry.selectFirstEntry.click();
            deleteEntry.deleteIcon.click();
            deleteEntry.okButton.click();
        });
        it('It should delete the second entry', () => {
            browser.sleep(500);
            deleteEntry.selectFirstEntry.click();
            deleteEntry.deleteIcon.click();
            deleteEntry.okButton.click();
        });
        it('Total entries are equal to 0', () => {
            browser.sleep(500);
            expect(deleteEntry.numberOfEntries.count()).toBe(0);
        });
    });
});