var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();
var ExportComponent = require('../page/at-export.js');
var exportComponent = new ExportComponent();

describe('Export button ', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });
    afterEach(() => {
        browser.wait(EC.elementToBeClickable(exportComponent.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        exportComponent.profileIcon.click();
        browser.wait(EC.elementToBeClickable(exportComponent.logoutButton), TIMEOUT, "Logout button" + " not clickable");
        exportComponent.logoutButton.click();
    });

    describe('Invalid date format', () => {
        it('It should display an invalid date format alert dialog', () => {
            browser.wait(EC.elementToBeClickable(exportComponent.exportButton), TIMEOUT, "Export Button is not ready" + " not present");
            exportComponent.exportButton.click();
            browser.wait(EC.elementToBeClickable(exportComponent.fromDateField), TIMEOUT, "Export Button is not ready" + " not present");
            exportComponent.fromDateField.sendKeys(exportComponent.invalidFromDateFormat);
            browser.sleep(500);
            browser.wait(EC.elementToBeClickable(exportComponent.toDateField), TIMEOUT, "Export Button is not ready" + " not present");
            exportComponent.toDateField.sendKeys(exportComponent.toDate);
            browser.sleep(500);
            exportComponent.okExportLink.click();
            browser.wait(EC.alertIsPresent(), TIMEOUT);
            browser.switchTo().alert().then(function (alert) {
                expect(alert.getText()).toEqual("Wrong date format !");
                return alert.accept();
            });
            exportComponent.cancelButton.click();
            expect(validDateRegex.test(exportComponent.fromDateField.getAttribute('value'))).toBe(false);
        });
    });
});

describe('Export button', () => {
    beforeEach(() => {
        timeTracker.navigateTo();
        login.loginUser(login.username, login.password);
    });

    describe('Valid date format', () => {
        it('It should export entries', () => {
            browser.wait(EC.elementToBeClickable(exportComponent.exportButton), TIMEOUT, "Export Button is not ready" + " not present");
            exportComponent.exportButton.click();
            browser.wait(EC.elementToBeClickable(exportComponent.fromDateField), TIMEOUT, "Export Button is not ready" + " not present");
            exportComponent.fromDateField.sendKeys(exportComponent.fromDate);
            browser.wait(EC.elementToBeClickable(exportComponent.toDateField), TIMEOUT, "Export Button is not ready" + " not present");
            exportComponent.toDateField.sendKeys(exportComponent.toDate);
            exportComponent.okExportLink.click();
            expect(exportComponent.fromDateField.getAttribute('value')).toEqual(exportComponent.fromDate);
            expect(exportComponent.toDateField.getAttribute('value')).toEqual(exportComponent.toDate);
            expect(exportComponent.exportButton.isPresent()).toBe(true);
            expect(browser.getCurrentUrl()).toBe('http://localhost:4200/#/timeentries');
            // browser.setLocation('http://localhost:8081/export?fromDate=2017-02-12&toDate=2018-02-12&userprofileID=all');
            // URL => http://localhost:8081/export?fromDate=2017-02-12&toDate=2018-02-12&userprofileID=all
        });
    });
});