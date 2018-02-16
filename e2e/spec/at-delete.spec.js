var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var DeleteComponent = require('../page/at-delete.js');
var deleteComponent = new DeleteComponent();

describe('Menu', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(deleteComponent.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        deleteComponent.profileIcon.click();
        browser.wait(EC.elementToBeClickable(deleteComponent.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        deleteComponent.logoutButton.click();
    });
    describe('Toolbar', () => {
        it('Delete a task as black', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            deleteComponent.blackTaskOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            deleteComponent.deleteIcon.click();
        });
        it('Verify deleted task', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.blackTaskOption.isPresent()).toBe(false);
            deleteComponent.cancelButton.click();
        });
    });
    describe('Toolbar', () => {
        it('Delete a used task', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            expect(element(by.cssContainingText('option', 'blabla')).isPresent()).toBe(true);
            deleteComponent.blablaTaskOption.click();
            deleteComponent.deleteIcon.click();
            browser.wait(EC.alertIsPresent(), TIMEOUT);
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("This task is used on entries. Cannot be deleted");
                return alert.accept();
            });
            deleteComponent.cancelButton.click();
        });
        it('Verify undeleted task', () => {
            deleteComponent.editButton.click();
            expect(element(by.cssContainingText('option', 'blabla')).isPresent()).toBe(true);
            deleteComponent.cancelButton.click();
        });
    });
    describe('Toolbar', () => {
        it('Delete a Project as black', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            element(by.cssContainingText('option', 'Project')).click();
            deleteComponent.blackProjectOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            deleteComponent.projectNameField.sendKeys(deleteComponent.itemName);
            deleteComponent.deleteIcon.click();
        });
        it('Verify deleted project', () => {
            deleteComponent.editButton.click();
            element(by.cssContainingText('option', 'Project')).click();
            expect(deleteComponent.blackProjectOption.isPresent()).toBe(false);
            deleteComponent.cancelButton.click();
        });
    });

    describe('Toolbar', () => {
        it('Delete a Client as black', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            element(by.cssContainingText('option', 'Client')).click();
            deleteComponent.blackClientOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            deleteComponent.clientNameField.sendKeys(deleteComponent.itemName);
            deleteComponent.deleteIcon.click();
        });
        it('Verify deleted client', () => {
            deleteComponent.editButton.click();
            element(by.cssContainingText('option', 'Client')).click();
            expect(deleteComponent.blackClientOption.isPresent()).toBe(false);
            deleteComponent.cancelButton.click();
        });
    });
});