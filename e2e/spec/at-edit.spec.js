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
        it('It should edit the task "block " to black', () => {
            editComponent.editButton.click();
            editComponent.blockTaskOption.click();
            expect(element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            editComponent.descriptionTaskField.sendKeys(editComponent.itemName);
            browser.sleep(500);
            editComponent.okButton.click();
        });
        it('It should verify the edited task', () => {
            editComponent.editButton.click();
            editComponent.blackTaskOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });

    describe('Edit a project', () => {
        it('It should edit the project "block " to black', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Project')).click();
            editComponent.blockProjectOption.click();
            expect(element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            editComponent.projectNameField.sendKeys(editComponent.itemName);
            browser.sleep(500);
            editComponent.okButton.click();
        });
        it('It should verify the edited project', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Project')).click();
            editComponent.blackProjectOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });

    describe('Edit a client', () => {
        it('It should edit the client "block " to black', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Client')).click();
            expect(element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            editComponent.blockClientOption.click();
            editComponent.clientNameField.sendKeys(editComponent.itemName);
            browser.sleep(500);
            editComponent.okButton.click();
        });
        it('It should verify the edited client', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Client')).click();
            editComponent.blackClientOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });
});