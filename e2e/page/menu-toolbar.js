var MenuToolbar = function () {
    this.createButton = element(by.buttonText('CREATE'));
    this.editButton = element(by.buttonText('EDIT'));
    this.exportButton = element(by.buttonText('EXPORT'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.profileIcon = element(by.id('accountCircle'));
    this.signOutButton = element(by.buttonText('Logout'));
    this.descriptionTaskField = element(by.id('newTaskDescription'));
    this.descriptionEditField = element(by.id('newTaskDescription'));
    this.okButton = element(by.buttonText('OK'));
    this.okExportLink = element(by.css('#cdk-overlay-0 > md-dialog-container > app-export-dialog > div.mat-dialog-actions > a > span'));
    this.fromDateField = element(by.id('inputFromDate'));
    this.toDateField = element(by.id('inputToDate'));

    this.clickCreateATask = function () {
        // browser.wait(EC.elementToBeClickable(this.createButton), TIMEOUT, "Create button is not ready" + " not present");
        this.createButton.click();
        // browser.wait(EC.elementToBeClickable(this.descriptionTaskField), TIMEOUT, "Description task field is not ready" + " not present");
        // this.descriptionTaskField.click();
        this.descriptionTaskField.sendKeys('Task Protractor');
        this.okButton.click();
    }
    this.clickEditATask = function () {
        this.editButton.click();
        // browser.wait(EC.elementToBeClickable(this.descriptionTaskField), TIMEOUT, "Description task field is not ready" + " not present");
        // this.descriptionTaskField.click();
        this.descriptionEditField.sendKeys('Task Protractor Edited');
        this.okButton.click();
    }
    this.clickExport = function () {
        // browser.wait(EC.elementToBeClickable(this.exportButton), TIMEOUT, "Export Button is not ready" + " not present");
        this.exportButton.click();
        // browser.wait(EC.elementToBeClickable(this.fromDateField), TIMEOUT, "Export Button is not ready" + " not present");
        this.fromDateField.sendKeys('12.02.2017');
        // browser.wait(EC.elementToBeClickable(this.toDateField), TIMEOUT, "Export Button is not ready" + " not present");
        this.toDateField.sendKeys('12.02.2018');
        this.okExportLink.click();
    }
    this.clickSignOut = function () {
        // this.cancelButton.click();
        this.profileIcon.click();
        this.signOutButton.click();
    }
    this.logOutUser = function () {
        this.clickSignOut();
    }
}
module.exports = MenuToolbar;