var Pagesize = require('../page/at-pagesize.js');
var pagesize = new Pagesize();
var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-menu.js');
var userprofileMenu = new UserprofileMenu();

describe('Pagesize', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(pagesize.username, pagesize.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        userprofileMenu.profileIcon.click();
        browser.wait(EC.elementToBeClickable(userprofileMenu.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        userprofileMenu.logoutButton.click();
    });
    describe('Per default', () => {
        it('Total entries are equal to 48', () => {
            browser.sleep(500);
            expect(pagesize.numberOfEntries.count()).toBe(48);
        });
        it('Total entries are equal to 10', () => {
            element(by.cssContainingText('option', '10 Entries')).click();
            browser.sleep(500);
            expect(pagesize.numberOfEntries.count()).toBe(10);
        });
        it('Total entries on the 4th page are equal to 10 too', () => {
            element(by.cssContainingText('option', '10 Entries')).click();
            browser.sleep(500);
            expect(pagesize.numberOfEntries.count()).toBe(10);
            pagesize.fourthPage.click();
            browser.sleep(500);
            expect(pagesize.numberOfEntries.count()).toBe(10);
        });
        it('Total entries are equal to 5', () => {
            element(by.cssContainingText('option', '5 Entries')).click();
            browser.sleep(500);
            expect(pagesize.numberOfEntries.count()).toBe(5);
        });
        it('Total entries are equal to 48', () => {
            element(by.cssContainingText('option', 'All Entries')).click();
            browser.sleep(500);
            expect(pagesize.numberOfEntries.count()).toBe(48);
        });
    });
});