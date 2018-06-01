var InlineEditing = function () {
    this.okButton = element(by.buttonText('OK'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.profileIcon = element(by.id('accountCircle'));
    this.signOutButton = element(by.buttonText('Logout'));
    this.username = 'wayne';
    this.password = 'fluance2018*';
    this.clientName = element(by.css('md-option[ng-reflect-value="2"]'));
    this.firstEntryDateField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(5)'));
    this.editableEntryDateField = element(by.css('.entryDate'));
    this.firstEndDateField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(7)'));
    this.editableEndDateField = element(by.css('.endDate'));
    this.firstDescriptionField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(1)'));
    this.editableDescriptionField = element(by.css('.description'));
    this.firstStartTimeField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(6)'));
    this.editableStartTimeField = element(by.css('.startTime'));
    this.firstEndTimeField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(8)'));
    this.editableEndTimeField = element(by.css('.endTime'));
    this.firstTimeSpentField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(9)'));
    this.editableTimeSpentField = element(by.css('.timeSpent'));
}
module.exports = InlineEditing;