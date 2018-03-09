var Sorting = require('../page/at-sorting.js');
var sorting = new Sorting();
var Timetracker = require('../page/at-timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/at-login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-user.js');
var userprofileMenu = new UserprofileMenu();

describe('Sort entries', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(sorting.username, sorting.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        userprofileMenu.profileIcon.click();
        browser.wait(EC.elementToBeClickable(userprofileMenu.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        userprofileMenu.logoutButton.click();
    });
    describe('Sort by and by order by.', () => {
        it('It should be sorted by client name and descending', () => {
            browser.wait(EC.elementToBeClickable(sorting.sortBy), TIMEOUT, "Sorting column" + " not clickable");
            sorting.sortBy.click();
            browser.wait(EC.elementToBeClickable(sorting.clientName), TIMEOUT, "Client name" + " not clickable");
            sorting.clientName.click();
            browser.wait(EC.elementToBeClickable(sorting.firstClientNameField), TIMEOUT, "First client name" + " not clickable");
            sorting.firstClientNameField.getText().then(function (text) {
                expect(text).toBe('REHA Bern');
            });
        });
    });
    describe('Sort by and by order by.', () => {
        it('It should be sorted by entry date and ascending', () => {
            browser.wait(EC.elementToBeClickable(sorting.orderBy), TIMEOUT, "Sorting sort" + " not clickable");
            sorting.orderBy.click();
            browser.wait(EC.elementToBeClickable(sorting.orderByAsc), TIMEOUT, "Asc sorting" + " not clickable");
            sorting.orderByAsc.click();
            browser.wait(EC.elementToBeClickable(sorting.firstEntryDateField), TIMEOUT, "last entry date" + " not clickable");
            sorting.firstEntryDateField.getText().then(function (text) {
                expect(text).toBe('11.10.2010');
            });
        });
    });
});