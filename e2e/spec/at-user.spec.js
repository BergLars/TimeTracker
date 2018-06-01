var Timetracker = require('../page/at-timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/at-login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-user.js');
var userprofileMenu = new UserprofileMenu();
var CRUDItem = require('../page/at-cruditem.js');
var crudItem = new CRUDItem();

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
    describe('Create a user', () => {
        it('It should create a User as block', () => {
            browser.wait(EC.elementToBeClickable(crudItem.createButton), TIMEOUT, "Create button is not ready" + " not present");
            crudItem.createButton.click();
            browser.wait(EC.elementToBeClickable(crudItem.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.itemToBeCreated.click();
            element(by.cssContainingText('option', 'User')).click();
            expect(crudItem.usernameField.isPresent()).toBe(true);
            crudItem.usernameField.sendKeys(crudItem.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.passwordField.sendKeys(crudItem.password);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.confirmPasswordField.sendKeys(crudItem.password);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.employmentDegreeField.sendKeys(crudItem.employmentDegree);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.okButton.click();
        });
        it('It should verify the created user', () => {
            browser.wait(EC.elementToBeClickable(crudItem.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
            crudItem.profileIcon.click();
            browser.wait(EC.elementToBeClickable(crudItem.deleteUserButton), TIMEOUT, "Delete button" + " not clickable");
            crudItem.deleteUserButton.click();
            expect(element(by.cssContainingText('option', crudItem.itemName)).isPresent()).toBe(true);
            crudItem.cancelButton.click();
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