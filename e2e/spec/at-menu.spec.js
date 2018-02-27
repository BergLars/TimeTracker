var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-menu.js');
var userprofileMenu = new UserprofileMenu();

describe('Userprofile', () => {
    describe('Change password', () => {
        beforeEach(() => {
            timeTracker.navigateTo();
            login.loginUser(login.username, login.password);
        });
        it('It should change user\'s password', () => {
            browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.profileIcon.click();
            expect(userprofileMenu.changePasswordButton.isPresent()).toBe(true);
            userprofileMenu.changePasswordButton.click();
            browser.wait(EC.elementToBeClickable(userprofileMenu.currentPassword), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.currentPassword.sendKeys(userprofileMenu.password);
            browser.wait(EC.elementToBeClickable(userprofileMenu.newPassword), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.newPassword.sendKeys(userprofileMenu.password);
            browser.wait(EC.elementToBeClickable(userprofileMenu.confirmPassword), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.confirmPassword.sendKeys(userprofileMenu.password);
            userprofileMenu.okButton.click();
        });
    });
});

describe('Userprofile', () => {
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
    describe('Change password', () => {
        it('It should verify if user\'s password is wrong', () => {
            browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.profileIcon.click();
            userprofileMenu.changePasswordButton.click();
            browser.wait(EC.elementToBeClickable(userprofileMenu.currentPassword), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.currentPassword.sendKeys(userprofileMenu.wrongPassword);
            browser.sleep(500);
            browser.wait(EC.elementToBeClickable(userprofileMenu.newPassword), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.newPassword.sendKeys(userprofileMenu.password);
            browser.sleep(500);
            browser.wait(EC.elementToBeClickable(userprofileMenu.confirmPassword), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.confirmPassword.sendKeys(userprofileMenu.password);
            browser.sleep(500);
            userprofileMenu.okButton.click();
            browser.wait(EC.alertIsPresent(), TIMEOUT);
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("Wrong current password or See password requirement !");
                return alert.accept();
            });
            userprofileMenu.cancelButton.click();
            expect(userprofileMenu.currentPassword.getAttribute('value')).not.toEqual(userprofileMenu.password);
        });
    });
    describe('Delete user', () => {
        it('It should delete a user', () => {
            browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.profileIcon.click();
            browser.wait(EC.elementToBeClickable(userprofileMenu.deleteUserButton), TIMEOUT, "Delete button" + " not clickable");
            userprofileMenu.deleteUserButton.click();
            element(by.cssContainingText('option', userprofileMenu.itemName)).click();
            browser.wait(EC.elementToBeClickable(userprofileMenu.okButton), TIMEOUT, "Ok button" + " not clickable");
            userprofileMenu.okButton.click();
            browser.switchTo().alert().then(function (alert) {
                browser.sleep(500);
                expect(alert.getText()).toEqual("Are you sure that you want to delete this user?");
                return alert.accept();
            });
            expect(element(by.cssContainingText('option', userprofileMenu.itemName)).isPresent()).toBe(true);
        });
    });
    describe('Delete user', () => {
        it('It should verify the deleted user', () => {
            browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
            userprofileMenu.profileIcon.click();
            browser.wait(EC.elementToBeClickable(userprofileMenu.deleteUserButton), TIMEOUT, "Delete button" + " not clickable");
            userprofileMenu.deleteUserButton.click();
            expect(element(by.cssContainingText('option', userprofileMenu.itemName)).isPresent()).toBe(false);
            userprofileMenu.cancelButton.click();
        });
    });
});