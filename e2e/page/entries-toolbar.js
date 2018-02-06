var EntriesToolbar = function () {
    this.newEntryButton = element(by.buttonText('NEW ENTRY'));
    this.descriptionField = element(by.id('md-input-9'));
    this.dateField = element(by.id('md-input-11'));
    this.timespentField = element(by.id('md-input-17'));
    this.enableTypingTimesCheckBox = element(by.css('#cdk-overlay-0 > md-dialog-container > app-entry-dialog > div.hide-dialog-scrollbar.mat-dialog-content > table > tbody > tr:nth-child(11) > td > md-checkbox'));
    this.startTimeField = element(by.id('md-input-13'));
    this.endTimeField = element(by.id('md-input-15'));
    this.billableCheckbox = element(by.css('#cdk-overlay-0 > md-dialog-container > app-entry-dialog > div.hide-dialog-scrollbar.mat-dialog-content > table > tbody > tr:nth-child(14) > td > md-checkbox'));
    this.okButton = element(by.buttonText('OK'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.profileIcon = element(by.id('accountCircle'));
    this.signOutButton = element(by.buttonText('Logout'));
    this.selectAllEntries = element(by.buttonText('All Entries'));
    this.selectAnEntry = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group'));
    this.deleteIcon = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(10) > div > div > div > span > md-icon'));

    this.addNewEntryWithTimes = function () {
        this.newEntryButton.click();
        this.descriptionField.sendKeys('Protractor test 2');
        this.dateField.sendKeys('02.02.2018');
        this.enableTypingTimesCheckBox.click();
        this.startTimeField.sendKeys('12:00');
        this.endTimeField.sendKeys('13:00');
        this.okButton.click();
    }
    this.addNewEntryWithTimespent = function () {
        this.newEntryButton.click();
        this.descriptionField.sendKeys('Protractor test');
        this.dateField.sendKeys('02.02.2018');
        this.timespentField.sendKeys('02:00');
        this.billableCheckbox.click();
        this.okButton.click();
    }

    this.deleteAnEntry = function () {
        this.selectAnEntry.click();
        this.deleteIcon.click();
        this.okButton.click();
    }
    this.clickSignOut = function () {
        this.profileIcon.click();
        this.signOutButton.click();
    }
    this.logOutUser = function () {
        this.clickSignOut();
    }
}
module.exports = EntriesToolbar;