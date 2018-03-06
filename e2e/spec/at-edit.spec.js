var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var EditComponent = require('../page/at-edit.js');
var editComponent = new EditComponent();

describe('Edit button', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(editComponent.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        editComponent.profileIcon.click();
        browser.wait(EC.elementToBeClickable(editComponent.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        editComponent.logoutButton.click();
    });
    describe('Edit a task', () => {
        it('It should edit the task "block" to black', () => {
            browser.wait(EC.elementToBeClickable(editComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            editComponent.editButton.click();
            browser.wait(EC.elementToBeClickable($('#taskOptions').element(by.cssContainingText('option', 'block'))), TIMEOUT, "Block option" + " not clickable");
            expect($('#taskOptions').element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            $('#taskOptions').element(by.cssContainingText('option', 'block')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            editComponent.descriptionTaskField.sendKeys(editComponent.itemName);
            // browser.driver.executeScript("document.getElementById('newTaskDescription').setAttribute('value','" + createComponent.itemName + "')");
            browser.sleep(SENDKEYS_TIMEOUT);
            editComponent.okButton.click();

        });
        it('It should verify the edited task', () => {
            browser.wait(EC.elementToBeClickable(editComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            editComponent.editButton.click();
            browser.wait(EC.elementToBeClickable($('#taskOptions').element(by.cssContainingText('option', 'black'))), TIMEOUT, "Black option" + " not clickable");
            expect($('#taskOptions').element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });

    describe('Edit a project', () => {
        it('It should edit the project "block" to black', () => {
            browser.wait(EC.elementToBeClickable(editComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            editComponent.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Project'))), TIMEOUT, "Project option" + " not clickable");
            element(by.cssContainingText('option', 'Project')).click();
            browser.wait(EC.elementToBeClickable($('#projectOptions').element(by.cssContainingText('option', 'block'))), TIMEOUT, "Block option" + " not clickable");
            expect($('#projectOptions').element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            $('#projectOptions').element(by.cssContainingText('option', 'block')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            editComponent.projectNameField.sendKeys(editComponent.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            editComponent.okButton.click();
        });
        it('It should verify the edited project', () => {
            browser.wait(EC.elementToBeClickable(editComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            editComponent.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Project'))), TIMEOUT, "Project option" + " not clickable");
            element(by.cssContainingText('option', 'Project')).click();
            browser.wait(EC.elementToBeClickable($('#projectOptions').element(by.cssContainingText('option', 'black'))), TIMEOUT, "Black option" + " not clickable");
            expect($('#projectOptions').element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });

    describe('Edit a client', () => {
        it('It should edit the client "block " to black', () => {
            browser.wait(EC.elementToBeClickable(editComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            editComponent.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Client'))), TIMEOUT, "Client option" + " not clickable");
            element(by.cssContainingText('option', 'Client')).click();
            browser.wait(EC.elementToBeClickable($('#clientOptions').element(by.cssContainingText('option', 'block'))), TIMEOUT, "Block option" + " not clickable");
            expect($('#clientOptions').element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            $('#clientOptions').element(by.cssContainingText('option', 'block')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            editComponent.clientNameField.sendKeys(editComponent.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            editComponent.okButton.click();
        });
        it('It should verify the edited client', () => {
            browser.wait(EC.elementToBeClickable(editComponent.editButton), TIMEOUT, "Edit button" + " not clickable");
            editComponent.editButton.click();
            browser.wait(EC.elementToBeClickable(element(by.cssContainingText('option', 'Client'))), TIMEOUT, "Client option" + " not clickable");
            element(by.cssContainingText('option', 'Client')).click();
            browser.wait(EC.elementToBeClickable($('#clientOptions').element(by.cssContainingText('option', 'black'))), TIMEOUT, "Black option" + " not clickable");
            expect($('#clientOptions').element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });
});