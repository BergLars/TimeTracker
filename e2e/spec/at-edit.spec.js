var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var EditComponent = require('../page/at-edit.js');
var editComponent = new EditComponent();

describe('Menu', () => {
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
    describe('Toolbar', () => {
        it('Edit a task as black', () => {
            editComponent.editButton.click();
            editComponent.blockTaskOption.click();
            expect(element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            editComponent.descriptionTaskField.sendKeys(editComponent.itemName);
            editComponent.okButton.click();
        });
        it('Verify edited task', () => {
            editComponent.editButton.click();
            editComponent.blackTaskOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });

    describe('Toolbar', () => {
        it('Edit a Project as black', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Project')).click();
            editComponent.blockProjectOption.click();
            expect(element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            editComponent.projectNameField.sendKeys(editComponent.itemName);
            editComponent.okButton.click();
        });
        it('Verify edited project', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Project')).click();
            editComponent.blackProjectOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });

    describe('Toolbar', () => {
        it('Edit a Client as black', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Client')).click();
            expect(element(by.cssContainingText('option', 'block')).isPresent()).toBe(true);
            editComponent.blockClientOption.click();
            editComponent.clientNameField.sendKeys(editComponent.itemName);
            editComponent.okButton.click();
        });
        it('Verify edited client', () => {
            editComponent.editButton.click();
            element(by.cssContainingText('option', 'Client')).click();
            editComponent.blackClientOption.click();
            expect(element(by.cssContainingText('option', 'black')).isPresent()).toBe(true);
            editComponent.cancelButton.click();
        });
    });
});