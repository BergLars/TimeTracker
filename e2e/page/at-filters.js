var Filters = function () {
    this.okButton = element(by.buttonText('OK'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.profileIcon = element(by.id('accountCircle'));
    this.logoutButton = element(by.buttonText('Logout'));
    this.allEntries = element(by.buttonText('All entries'));
    this.deleteIcon = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(10) > div > div > div > span > md-icon'));
    this.numberOfEntries = element.all(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1n) > datatable-body-row'));
    this.fourthPage = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-footer > div > datatable-pager > ul > li:nth-child(6) > a'));
    this.username = 'wayne';
    this.password = 'fluance2018*';
    this.projectFilter = element(by.id('projectFilter'));
    this.selectAllProject = element(by.css('.selectAllProject'));
    this.selectFTTProject = element(by.css('md-option[ng-reflect-value="1"]'));
    this.clientFilter = element(by.id('clientFilter'));
    this.selectAllClient = element(by.css('.selectAllClient'));
    this.selectFluanceClient = element(by.css('md-option-96[ng-reflect-value="1"]'));
    this.taskFilter = element(by.id('taskFilter'));
    this.selectAllTask = element(by.css('.selectAllTask'));
    this.selectUpdateFETask = element(by.css('md-option[ng-reflect-value="1"]'));
    this.clickAnywhere = element(by.css('body > div > div.cdk-overlay-backdrop.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing'));
}
module.exports = Filters;