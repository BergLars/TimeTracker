var Sorting = require('../page/at-sorting.js');
var sorting = new Sorting();
var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-menu.js');
var userprofileMenu = new UserprofileMenu();

describe('Sort', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(sorting.username, sorting.password);
    });
    afterEach(() => {
        browser.sleep(500);
        browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        userprofileMenu.profileIcon.click();
        browser.wait(EC.elementToBeClickable(userprofileMenu.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        userprofileMenu.logoutButton.click();
    });
    describe('By column and by sort.', () => {
        it('It should be sorted by client name and descending', () => {
            browser.wait(EC.elementToBeClickable(sorting.sortingColumn), TIMEOUT, "Sorting column" + " not clickable");
            sorting.sortingColumn.click();
            browser.wait(EC.elementToBeClickable(sorting.clientName), TIMEOUT, "Client name" + " not clickable");
            sorting.clientName.click();
            browser.wait(EC.elementToBeClickable(sorting.firstClientNameField), TIMEOUT, "First client name" + " not clickable");
            sorting.firstClientNameField.getText().then(function (text) {
                return text;
            }).then(function (result) {
                sorting.lastClientNameField.getText().then(function (text) {
                    expect(result).toBeGreaterThan(text);
                });
            });
        });
        it('It should be sorted by entry date and ascending', () => {
            browser.wait(EC.elementToBeClickable(sorting.sortingSort), TIMEOUT, "Sorting sort" + " not clickable");
            sorting.sortingSort.click();
            browser.wait(EC.elementToBeClickable(sorting.ascSorting), TIMEOUT, "Asc sorting" + " not clickable");
            sorting.ascSorting.click();
            browser.wait(EC.elementToBeClickable(sorting.firstEntryDateField), TIMEOUT, "First entry date" + " not clickable");
            sorting.firstEntryDateField.getText().then(function (text) {
                return text;
            }).then(function (result) {
                browser.wait(EC.elementToBeClickable(sorting.lastEntryDateField), TIMEOUT, "last entry date" + " not clickable");
                sorting.lastEntryDateField.getText().then(function (text) {
                    var firstYear = result.substring(6, 9);
                    var lastYear = text.substring(6, 9);
                    expect(firstYear).not.toBeGreaterThan(lastYear);
                });
            });
        });
    });
});