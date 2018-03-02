var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var CreateComponent = require('../page/at-create.js');
var createComponent = new CreateComponent();

describe('Create button', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(createComponent.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        createComponent.profileIcon.click();
        browser.wait(EC.elementToBeClickable(createComponent.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        createComponent.logoutButton.click();
    });
    describe('Create a task', () => {
        it('It should create a task as block', () => {
            expect(createComponent.createButton.isPresent()).toBe(true);
            browser.wait(EC.elementToBeClickable(createComponent.createButton), TIMEOUT, "Create button is not ready" + " not present");
            createComponent.createButton.click();
            expect(createComponent.descriptionTaskField.isPresent()).toBe(true);
            browser.wait(EC.elementToBeClickable(createComponent.descriptionTaskField), TIMEOUT, "Description task field is not ready" + " not present");
            createComponent.descriptionTaskField.sendKeys(createComponent.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.okButton.click();
        });
        it('It should verify the created task', () => {
            browser.wait(EC.elementToBeClickable(createComponent.editButton), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.editButton.click();
            browser.wait(EC.elementToBeClickable(createComponent.taskOptions), TIMEOUT, "Task options is not ready" + " not present");
            expect(element(by.cssContainingText('option', createComponent.itemName)).isPresent()).toBe(true);
            createComponent.cancelButton.click();
        });
    });
    describe('Create a project', () => {
        it('It should create a Project as block', () => {
            browser.wait(EC.elementToBeClickable(createComponent.createButton), TIMEOUT, "Create button is not ready" + " not present");
            createComponent.createButton.click();
            browser.wait(EC.elementToBeClickable(createComponent.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.itemToBeCreated.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            element(by.cssContainingText('option', 'Project')).click();
            expect(createComponent.projectNameField.isPresent()).toBe(true);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.projectNameField.sendKeys(createComponent.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.okButton.click();
        });
        it('It should verify the created project', () => {
            browser.wait(EC.elementToBeClickable(createComponent.editButton), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.editButton.click();
            browser.wait(EC.elementToBeClickable(createComponent.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.itemToBeCreated.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            element(by.cssContainingText('option', 'Project')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.projectOptions.click();
            expect(element(by.cssContainingText('option', createComponent.itemName)).isPresent()).toBe(true);
            createComponent.cancelButton.click();
        });
    });

    describe('Create a client', () => {
        it('It should create a Client as block', () => {
            browser.wait(EC.elementToBeClickable(createComponent.createButton), TIMEOUT, "Create button is not ready" + " not present");
            createComponent.createButton.click();
            browser.wait(EC.elementToBeClickable(createComponent.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.itemToBeCreated.click();
            element(by.cssContainingText('option', 'Client')).click();
            expect(createComponent.clientNameField.isPresent()).toBe(true);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.clientNameField.sendKeys(createComponent.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.okButton.click();
        });
        it('it should verify the created client', () => {
            browser.wait(EC.elementToBeClickable(createComponent.editButton), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.editButton.click();
            browser.wait(EC.elementToBeClickable(createComponent.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.itemToBeCreated.click();
            browser.sleep(SENDKEYS_TIMEOUT);
            element(by.cssContainingText('option', 'Client')).click();
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.clientOptions.click();
            expect(element(by.cssContainingText('option', createComponent.itemName)).isPresent()).toBe(true);
            createComponent.cancelButton.click();
        });
    });

    describe('Create a user', () => {
        it('It should create a User as block', () => {
            browser.wait(EC.elementToBeClickable(createComponent.createButton), TIMEOUT, "Create button is not ready" + " not present");
            createComponent.createButton.click();
            browser.wait(EC.elementToBeClickable(createComponent.itemToBeCreated), TIMEOUT, "Edit button is not ready" + " not present");
            createComponent.itemToBeCreated.click();
            element(by.cssContainingText('option', 'User')).click();
            expect(createComponent.usernameField.isPresent()).toBe(true);
            createComponent.usernameField.sendKeys(createComponent.itemName);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.passwordField.sendKeys(createComponent.password);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.confirmPasswordField.sendKeys(createComponent.password);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.employmentDegreeField.sendKeys(createComponent.employmentDegree);
            browser.sleep(SENDKEYS_TIMEOUT);
            createComponent.okButton.click();
        });
        it('It should verify the created user', () => {
            browser.wait(EC.elementToBeClickable(createComponent.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
            createComponent.profileIcon.click();
            browser.wait(EC.elementToBeClickable(createComponent.deleteUserButton), TIMEOUT, "Delete button" + " not clickable");
            createComponent.deleteUserButton.click();
            expect(element(by.cssContainingText('option', createComponent.itemName)).isPresent()).toBe(true);
            createComponent.cancelButton.click();
        });
    });
});