var Timetracker = require('../page/at-timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/at-login.js');
var login = new Login();
var CRUDItem = require('../page/at-cruditem.js');
var crudItem = new CRUDItem();

describe('Create button', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(crudItem.username, crudItem.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(crudItem.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        crudItem.profileIcon.click();
        browser.wait(EC.elementToBeClickable(crudItem.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        crudItem.logoutButton.click();
    });
    describe('Create a task', () => {
        it('It should create a task as block', () => {
            expect(crudItem.createButton.isPresent()).toBe(true);
            browser.wait(EC.elementToBeClickable(crudItem.createButton), TIMEOUT, "Create button is not ready" + " not present");
            crudItem.createButton.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            expect(crudItem.descriptionTaskField.isPresent()).toBe(true);
            browser.wait(EC.elementToBeClickable(crudItem.descriptionTaskField), TIMEOUT, "Description task field is not ready" + " not present");
            crudItem.descriptionTaskField.sendKeys(crudItem.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.okButton.click();
        });
        it('It should verify the created task', () => {
            browser.sleep(500);
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable(crudItem.taskOptions), TIMEOUT, "Task options is not ready" + " not present");
            expect(element(by.cssContainingText('option', crudItem.itemName)).isPresent()).toBe(true);
            crudItem.cancelButton.click();
        });
    });
    describe('Create a project', () => {
        it('It should create a Project as block', () => {
            browser.wait(EC.elementToBeClickable(crudItem.createButton), TIMEOUT, "Create button is not ready" + " not present");
            crudItem.createButton.click();
            browser.wait(EC.elementToBeClickable(crudItem.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.itemToBeCreated.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            element(by.cssContainingText('option', 'Project')).click();
            expect(crudItem.projectNameField.isPresent()).toBe(true);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.projectNameField.sendKeys(crudItem.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.okButton.click();
        });
        it('It should verify the created project', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable(crudItem.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.itemToBeCreated.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            element(by.cssContainingText('option', 'Project')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.projectOptions.click();
            expect(element(by.cssContainingText('option', crudItem.itemName)).isPresent()).toBe(true);
            crudItem.cancelButton.click();
        });
    });

    describe('Create a client', () => {
        it('It should create a Client as block', () => {
            browser.wait(EC.elementToBeClickable(crudItem.createButton), TIMEOUT, "Create button is not ready" + " not present");
            crudItem.createButton.click();
            browser.wait(EC.elementToBeClickable(crudItem.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.itemToBeCreated.click();
            element(by.cssContainingText('option', 'Client')).click();
            expect(crudItem.clientNameField.isPresent()).toBe(true);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.clientNameField.sendKeys(crudItem.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.okButton.click();
        });
        it('it should verify the created client', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable(crudItem.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            crudItem.itemToBeCreated.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            element(by.cssContainingText('option', 'Client')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.clientOptions.click();
            expect(element(by.cssContainingText('option', crudItem.itemName)).isPresent()).toBe(true);
            crudItem.cancelButton.click();
        });
    });
});
describe('Edit button', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(crudItem.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        crudItem.profileIcon.click();
        browser.wait(EC.elementToBeClickable(crudItem.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        crudItem.logoutButton.click();
    });
    describe('Edit a task', () => {
        it('It should edit the task "block" to black', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable($('#taskOptions').element(by.cssContainingText('option', 'block'))), TIMEOUT, "Block option" + " not clickable");
            expect(crudItem.taskOptions.element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            crudItem.taskOptions.element(by.cssContainingText('option', 'block')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.descriptionTaskField.sendKeys(crudItem.newItemName);
            // browser.driver.executeScript("document.getElementById('newTaskDescription').setAttribute('value','" + crudItem.itemName + "')");
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.okButton.click();

        });
        it('It should verify the edited task', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable($('#taskOptions').element(by.cssContainingText('option', 'black'))), TIMEOUT, "Black option" + " not clickable");
            expect(crudItem.taskOptions.element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            crudItem.cancelButton.click();
        });
    });

    describe('Edit a project', () => {
        it('It should edit the project "block" to black', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Project'))), TIMEOUT, "Project option" + " not clickable");
            element(by.cssContainingText('option', 'Project')).click();
            browser.wait(EC.elementToBeClickable(crudItem.projectOptions.element(by.cssContainingText('option', 'block'))), TIMEOUT, "Block option" + " not clickable");
            expect(crudItem.projectOptions.element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            crudItem.projectOptions.element(by.cssContainingText('option', 'block')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.projectNameField.sendKeys(crudItem.newItemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.okButton.click();
        });
        it('It should verify the edited project', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Project'))), TIMEOUT, "Project option" + " not clickable");
            element(by.cssContainingText('option', 'Project')).click();
            browser.wait(EC.elementToBeClickable(crudItem.projectOptions.element(by.cssContainingText('option', 'black'))), TIMEOUT, "Black option" + " not clickable");
            expect(crudItem.projectOptions.element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            crudItem.cancelButton.click();
        });
    });

    describe('Edit a client', () => {
        it('It should edit the client "block " to black', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Client'))), TIMEOUT, "Client option" + " not clickable");
            element(by.cssContainingText('option', 'Client')).click();
            browser.wait(EC.elementToBeClickable(crudItem.clientOptions.element(by.cssContainingText('option', 'block'))), TIMEOUT, "Block option" + " not clickable");
            expect(crudItem.clientOptions.element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            crudItem.clientOptions.element(by.cssContainingText('option', 'block')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.clientNameField.sendKeys(crudItem.newItemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.okButton.click();
        });
        it('It should verify the edited client', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Client'))), TIMEOUT, "Client option" + " not clickable");
            element(by.cssContainingText('option', 'Client')).click();
            browser.wait(EC.elementToBeClickable(crudItem.clientOptions.element(by.cssContainingText('option', 'black'))), TIMEOUT, "Black option" + " not clickable");
            expect(crudItem.clientOptions.element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            crudItem.cancelButton.click();
        });
    });
});
describe('Delete items', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(crudItem.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        crudItem.profileIcon.click();
        browser.wait(EC.elementToBeClickable(crudItem.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        crudItem.logoutButton.click();
    });
    describe('Delete a task', () => {
        it('It should delete black task description', () => {
            crudItem.editButton.click();
            expect(crudItem.deleteIcon.isPresent()).toBe(true);
            crudItem.blackTaskOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            crudItem.deleteIcon.click();
        });
        it('It should verify the deleted task', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            expect(crudItem.blackTaskOption.isPresent()).toBe(false);
            crudItem.cancelButton.click();
        });
    });
    describe('Delete a project', () => {
        it('It should delete black project name', () => {
            crudItem.editButton.click();
            expect(crudItem.deleteIcon.isPresent()).toBe(true);
            element(by.cssContainingText('option', 'Project')).click();
            crudItem.blackProjectOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            crudItem.projectNameField.sendKeys(crudItem.newItemName);
            crudItem.deleteIcon.click();
        });
        it('It should Verify deleted project', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            element(by.cssContainingText('option', 'Project')).click();
            expect(crudItem.blackProjectOption.isPresent()).toBe(false);
            crudItem.cancelButton.click();
        });
    });
    describe('Delete a client', () => {
        it('It should delete black client name', () => {
            crudItem.editButton.click();
            expect(crudItem.deleteIcon.isPresent()).toBe(true);
            element(by.cssContainingText('option', 'Client')).click();
            crudItem.blackClientOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            crudItem.clientNameField.sendKeys(crudItem.newItemName);
            crudItem.deleteIcon.click();
        });
        it('It should verify deleted client', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            element(by.cssContainingText('option', 'Client')).click();
            expect(crudItem.blackClientOption.isPresent()).toBe(false);
            crudItem.cancelButton.click();
        });
    });
});
describe('Delete items', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(crudItem.username, crudItem.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(crudItem.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        crudItem.profileIcon.click();
        browser.wait(EC.elementToBeClickable(crudItem.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        crudItem.logoutButton.click();
    });
    describe('Delete a used Task', () => {
        it('It should not be allowed to delete a used client', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.taskOptions.click();
            browser.wait(EC.elementToBeClickable(crudItem.taskProtOption), TIMEOUT, "Task Prot option" + " not clickable");
            crudItem.taskProtOption.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            browser.wait(EC.elementToBeClickable(crudItem.deleteIcon), TIMEOUT, "Delete icon" + " not clickable");
            crudItem.deleteIcon.click();
            browser.wait(EC.alertIsPresent(), TIMEOUT);
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("This task is used on entries. Cannot be deleted");
                return alert.accept();
            });
            crudItem.cancelButton.click();
        });
        it('It should verify undeleted task', () => {
            browser.wait(EC.elementToBeClickable(crudItem.editButton), TIMEOUT, "Edit button" + " not clickable");
            crudItem.editButton.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.taskOptions.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            crudItem.taskOptions.element(by.cssContainingText('option', 'Task Prot')).click();
            expect(crudItem.taskOptions.element(by.cssContainingText('option', 'Task Prot')).isPresent()).toBe(true);
            crudItem.cancelButton.click();
        });
    });
});