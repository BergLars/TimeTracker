var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileToolbar = require('../page/userprofile-toolbar.js');
var userprofileToolbar = new UserprofileToolbar();

describe('Userprofile', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser('admintestuser', 'Fluance2025*');
    });
    afterEach(() => {
        userprofileToolbar.logOutUser();
    });
    describe('Toolbar', () => {
        it('Change password', () => {
            userprofileToolbar.clickChangePassword();
            // expect(userprofileToolbar.changePasswordButton.isPresent()).toBe(true);
        });
    });
    describe('Toolbar', () => {
        fit('Delete a user', () => {
            userprofileToolbar.clickDeleteUser();
            // expect(userprofileToolbar.deleteUserButton.isPresent()).toBe(true);
        });
    });
});