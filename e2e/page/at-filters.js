var Filters = function () {
    this.profileIcon = element(by.id('accountCircle'));
    this.logoutButton = element(by.buttonText('Logout'));
    this.username = 'wayne';
    this.password = 'fluance2018*';
    this.projectsFilter = element(by.id('projectsFilter'));
    this.clickOnAllProject = element(by.css('.clickOnAllProject'));
    this.selectFTTProject = element(by.css('md-option[ng-reflect-value="1"]'));
    this.clientsFilter = element(by.id('clientsFilter'));
    this.clickOnAllClient = element(by.css('.clickOnAllClient'));
    this.blabla = element(by.css('md-option[ng-reflect-value="4"]'));
    this.fluance = element(by.css('md-option[ng-reflect-value="1"]'));
    this.tasksFilter = element(by.id('tasksFilter'));
    this.clickOnAllTask = element(by.css('.clickOnAllTask'));
    this.selectUpdateFETask = element(by.css('md-option[ng-reflect-value="1"]'));
    this.clickAnywhere = element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)'));
    this.numberOfEntries = element.all(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1n) > datatable-body-row'));
}
module.exports = Filters;