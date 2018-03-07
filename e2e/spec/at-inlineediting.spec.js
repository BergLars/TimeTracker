var Sorting = require('../page/at-inlineEditing.js');
var inlineEditing = new Sorting();
var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var UserprofileMenu = require('../page/at-menu.js');
var userprofileMenu = new UserprofileMenu();
var InlineEditing = require('../page/at-inlineediting.js');
var inlineEditing = new InlineEditing();

describe('Inline editing', function () {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(inlineEditing.username, inlineEditing.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(userprofileMenu.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        userprofileMenu.profileIcon.click();
        browser.wait(EC.elementToBeClickable(userprofileMenu.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        userprofileMenu.logoutButton.click();
    });
    describe('Edit an entry description', () => {
        it('It should edit the first description of the first entry', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstDescriptionField), TIMEOUT, "Description field" + " not clickable");
            inlineEditing.firstDescriptionField.getText().then(function (text) {
                expect(text).toBe('test 6');
            });
            inlineEditing.firstDescriptionField.click();
            inlineEditing.editableDescriptionField.clear();
            inlineEditing.editableDescriptionField.sendKeys('Protractor');
            browser.sleep(SENDKEYS_TIMEOUT);
        });
        it('It should verify the edited description to be "Protractor"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstDescriptionField), TIMEOUT, "Description field" + " not clickable");
            inlineEditing.firstDescriptionField.getText().then(function (text) {
                expect(text).toBe('Protractor');
            });
        });
    });
    describe('Edit an entry entryDate', () => {
        it('It should verify current endDate to be "07.06.2018"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEndDateField), TIMEOUT, "End date field" + " not clickable");
            inlineEditing.firstEndDateField.getText().then(function (text) {
                expect(text).toBe('07.06.2018');
            });
        });
        it('It should verify that "09/06/2018 is a wrong date format', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEntryDateField), TIMEOUT, "Entry date field" + " not clickable");
            inlineEditing.firstEntryDateField.click();
            inlineEditing.editableEntryDateField.clear();
            inlineEditing.editableEntryDateField.sendKeys('09/06/2018');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("Wrong date format !");
                return alert.accept();
            });
            expect(validDateRegex.test(inlineEditing.firstEntryDateField.getAttribute('value'))).toBe(false);
        });
        it('It should verify that "32.06.2018 is a wrong date format', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEntryDateField), TIMEOUT, "Entry date field" + " not clickable");
            inlineEditing.firstEntryDateField.click();
            inlineEditing.editableEntryDateField.clear();
            inlineEditing.editableEntryDateField.sendKeys('32.06.2018');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("Wrong date format !");
                return alert.accept();
            });
            expect(validDateRegex.test(inlineEditing.firstEntryDateField.getAttribute('value'))).toBe(false);
        });
        it('It should verify that "28.13.2018 is a wrong date format', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEntryDateField), TIMEOUT, "Entry date field" + " not clickable");
            inlineEditing.firstEntryDateField.click();
            inlineEditing.editableEntryDateField.clear();
            inlineEditing.editableEntryDateField.sendKeys('28.13.2018');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("Wrong date format !");
                return alert.accept();
            });
            expect(validDateRegex.test(inlineEditing.firstEntryDateField.getAttribute('value'))).toBe(false);
        });
        it('It should verify that "28.06.1999 is a wrong date format', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEntryDateField), TIMEOUT, "Entry date field" + " not clickable");
            inlineEditing.firstEntryDateField.click();
            inlineEditing.editableEntryDateField.clear();
            inlineEditing.editableEntryDateField.sendKeys('28.06.1999');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("Wrong date format !");
                return alert.accept();
            });
            expect(validDateRegex.test(inlineEditing.firstEntryDateField.getAttribute('value'))).toBe(false);
        });
        it('It should edit the first entryDate of the first entry', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEntryDateField), TIMEOUT, "End date field" + " not clickable");
            inlineEditing.firstEntryDateField.getText().then(function (text) {
                expect(text).toBe('07.06.2018');
            });
            inlineEditing.firstEntryDateField.click();
            inlineEditing.editableEntryDateField.clear();
            inlineEditing.editableEntryDateField.sendKeys('09.06.2018');
            browser.sleep(SENDKEYS_TIMEOUT);
        });
        it('It should verify the edited entryDate to be "09.06.2018"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEntryDateField), TIMEOUT, "Entry date field" + " not clickable");
            inlineEditing.firstEntryDateField.getText().then(function (text) {
                expect(text).toBe('09.06.2018');
            });
        });
        it('It should verify current endDate to be "09.06.2018"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEndDateField), TIMEOUT, "End date field" + " not clickable");
            inlineEditing.firstEndDateField.getText().then(function (text) {
                expect(text).toBe('09.06.2018');
            });
        });
    });
    describe('Edit an entry startTime', () => {
        it('It should edit the startTime of the first entry', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstStartTimeField), TIMEOUT, "Start time field" + " not clickable");
            inlineEditing.firstStartTimeField.getText().then(function (text) {
                expect(text).toBe('05:22');
            });
            inlineEditing.firstStartTimeField.click();
            inlineEditing.editableStartTimeField.clear();
            inlineEditing.editableStartTimeField.sendKeys('05:25');
            browser.sleep(SENDKEYS_TIMEOUT);
        });
        it('It should verify the edited startTime to be "05:25"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstStartTimeField), TIMEOUT, "Start time field" + " not clickable");
            inlineEditing.firstStartTimeField.getText().then(function (text) {
                expect(text).toBe('05:25');
            });
        });
        it('It should update timeSpent to be "00:04"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstTimeSpentField), TIMEOUT, "Time spent field" + " not clickable");
            inlineEditing.firstTimeSpentField.getText().then(function (text) {
                expect(text).toBe('00:04');
            });
        });
    });
    describe('Edit an entry endTime', () => {
        it('It should edit the endTime of the first entry', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEndTimeField), TIMEOUT, "End time field" + " not clickable");
            inlineEditing.firstEndTimeField.getText().then(function (text) {
                expect(text).toBe('05:29');
            });
            inlineEditing.firstEndTimeField.click();
            inlineEditing.editableEndTimeField.clear();
            inlineEditing.editableEndTimeField.sendKeys('06:29');
            browser.sleep(SENDKEYS_TIMEOUT);
        });
        it('It should verify the edited endTime to be "06:29"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEndTimeField), TIMEOUT, "End time field" + " not clickable");
            inlineEditing.firstEndTimeField.getText().then(function (text) {
                expect(text).toBe('06:29');
            });
        });
        it('It should update timeSpent to be "01:04"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstTimeSpentField), TIMEOUT, "Time spent field" + " not clickable");
            inlineEditing.firstTimeSpentField.getText().then(function (text) {
                expect(text).toBe('01:04');
            });
        });
    });
    describe('Edit an entry timeSpent', () => {
        it('It should edit the timeSpent of the first entry', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstTimeSpentField), TIMEOUT, "End time field" + " not clickable");
            inlineEditing.firstTimeSpentField.getText().then(function (text) {
                expect(text).toBe('01:04');
            });
            inlineEditing.firstTimeSpentField.click();
            inlineEditing.editableTimeSpentField.clear();
            inlineEditing.editableTimeSpentField.sendKeys('00:04');
            browser.sleep(SENDKEYS_TIMEOUT);
        });
        it('It should verify the edited timeSpent to be "00:04"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstTimeSpentField), TIMEOUT, "End time field" + " not clickable");
            inlineEditing.firstTimeSpentField.getText().then(function (text) {
                expect(text).toBe('00:04');
            });
        });
        it('It should update endTime to be "05:29"', () => {
            browser.wait(EC.elementToBeClickable(inlineEditing.firstEndTimeField), TIMEOUT, "End time field" + " not clickable");
            inlineEditing.firstEndTimeField.getText().then(function (text) {
                expect(text).toBe('05:29');
            });
        });
    });
});