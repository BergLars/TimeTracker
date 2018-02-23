var Sorting = function () {
    this.okButton = element(by.buttonText('OK'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.profileIcon = element(by.id('accountCircle'));
    this.signOutButton = element(by.buttonText('Logout'));
    this.allEntries = element(by.buttonText('All entries'));
    this.deleteIcon = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(10) > div > div > div > span > md-icon'));
    this.numberOfEntries = element.all(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1n) > datatable-body-row'));
    this.fourthPage = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-footer > div > datatable-pager > ul > li:nth-child(6) > a'));
    this.username = 'wayne';
    this.password = 'fluance2018*';
    this.sortingColumn = element(by.id("sortingColumn"));
    this.sortingSort = element(by.id("sortingSort"));
    this.entryDate = element(by.css('md-option[ng-reflect-value="4"]'));
    this.endDate = element(by.css('md-option[ng-reflect-value="6"]'));
    this.endTime = element(by.css('md-option[ng-reflect-value="7"]'));
    this.timeSpent = element(by.css('md-option[ng-reflect-value="8"]'));
    this.clientName = element(by.css('md-option[ng-reflect-value="2"]'));
    this.ascSorting = element(by.css('md-option[ng-reflect-value="1"]'));
    this.firstClientNameField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(3) > div > span'));
    this.lastClientNameField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(48) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(3) > div > span'));
    this.firstEntryDateField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(5) > div > span'));
    this.lastEntryDateField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(48) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(5) > div > span'));
}
module.exports = Sorting;