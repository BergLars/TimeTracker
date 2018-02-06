var EntriesToolbar = require('../page/entries-toolbar.js');
var entriesToolbar = new EntriesToolbar();
var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();

describe('Entries', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser('testuser', 'Fluance2025*');
    });
    afterEach(() => {
        entriesToolbar.logOutUser();
    });
    describe('Toolbar', () => {
        it('New entry with time spent', () => {
            entriesToolbar.addNewEntryWithTimespent();
        });
        it('New entry with start and end time', () => {
            entriesToolbar.addNewEntryWithTimes();
        });
        it('Delete an entry', () => {
            entriesToolbar.deleteAnEntry();
        });
        it('Total entries', () => {
            element.all(by.css('datatable-body-row')).then(function (items) {
                expect(items.length).toBeGreaterThan(0);
            });
        });
    });
});