var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileToolbar = require('../page/userprofile-toolbar.js');
var userprofileToolbar = new UserprofileToolbar();
var MenuToolbar = require('../page/menu-toolbar.js');
var menuToolbar = new MenuToolbar();

describe('Menu', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser('testuser', 'Fluance2025*');
    });
    afterEach(() => {
        menuToolbar.logOutUser();
    });
    describe('Toolbar', () => {
        it('Create a task', () => {
            //  expect(menuToolbar.createButton.isPresent()).toBe(true);
            menuToolbar.clickCreateATask();
            //  expect(menuToolbar.descriptionTaskField.isPresent()).toBe(true);
        });
    });
    describe('Toolbar', () => {
        it('Edit a task', () => {
            menuToolbar.clickEditATask();
            // expect(menuToolbar.editButton.isPresent()).toBe(true);
        });
    });
    describe('Toolbar', () => {
        it('Export', () => {
            menuToolbar.clickExport();
            // expect(menuToolbar.exportButton.isPresent()).toBe(true);
        });
    });
});