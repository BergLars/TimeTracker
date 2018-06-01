var Sorting = function () {
    this.username = 'wayne';
    this.password = 'fluance2018*';
    this.sortBy = element(by.id("sortBy"));
    this.orderBy = element(by.id("orderBy"));
    this.clientName = element(by.css('md-option[ng-reflect-value="2"]'));
    this.orderByAsc = element(by.css('md-option[ng-reflect-value="1"]'));
    this.firstClientNameField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(3) > div > span'));
    this.firstEntryDateField = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(5) > div > span'));
}
module.exports = Sorting;