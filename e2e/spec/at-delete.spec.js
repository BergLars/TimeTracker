var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var DeleteComponent = require('../page/at-delete.js');
var deleteComponent = new DeleteComponent();

describe('Delete items', () => {
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
    describe('Delete a task', () => {
        it('It should delete black task description', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            deleteComponent.blackTaskOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            deleteComponent.deleteIcon.click();
        });
        it('It should verify the deleted task', () => {
            browser.wait(EC.elementToBeClickable(deleteComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            deleteComponent.editButton.click();
            expect(deleteComponent.blackTaskOption.isPresent()).toBe(false);
            deleteComponent.cancelButton.click();
        });
    });
    describe('Delete a project', () => {
        it('It should delete black project name', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            element(by.cssContainingText('option', 'Project')).click();
            deleteComponent.blackProjectOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            deleteComponent.projectNameField.sendKeys(deleteComponent.itemName);
            deleteComponent.deleteIcon.click();
        });
        it('It should Verify deleted project', () => {
            browser.wait(EC.elementToBeClickable(deleteComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            deleteComponent.editButton.click();
            element(by.cssContainingText('option', 'Project')).click();
            expect(deleteComponent.blackProjectOption.isPresent()).toBe(false);
            deleteComponent.cancelButton.click();
        });
    });
    describe('Delete a client', () => {
        it('It should delete black client name', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            element(by.cssContainingText('option', 'Client')).click();
            deleteComponent.blackClientOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            deleteComponent.clientNameField.sendKeys(deleteComponent.itemName);
            deleteComponent.deleteIcon.click();
        });
        it('It should verify deleted client', () => {
            browser.wait(EC.elementToBeClickable(deleteComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            deleteComponent.editButton.click();
            element(by.cssContainingText('option', 'Client')).click();
            expect(deleteComponent.blackClientOption.isPresent()).toBe(false);
            deleteComponent.cancelButton.click();
        });
    });
    describe('Delete a used Task', () => {
        it('It should not be allowed to delete a used task', () => {
            deleteComponent.editButton.click();
            expect(deleteComponent.deleteIcon.isPresent()).toBe(true);
            expect(element(by.cssContainingText('option', 'protractor task 1')).isPresent()).toBe(true);
            deleteComponent.taskProtractor2Option.click();
            browser.wait(EC.elementToBeClickable(deleteComponent.deleteIcon), TIMEOUT, "Delete icon" + " not clickable");
            deleteComponent.deleteIcon.click();
            browser.wait(EC.alertIsPresent(), TIMEOUT);
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("This task is used on entries. Cannot be deleted");
                return alert.accept();
            });
            deleteComponent.cancelButton.click();
        });
        it('It should verify undeleted task', () => {
            browser.wait(EC.elementToBeClickable(deleteComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            deleteComponent.editButton.click();
            expect(element(by.cssContainingText('option', 'protractor task 1')).isPresent()).toBe(true);
            deleteComponent.cancelButton.click();
        });
    });
});