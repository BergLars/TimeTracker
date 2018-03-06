var Pagesize = function () {
    this.okButton = element(by.buttonText('OK'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.profileIcon = element(by.id('accountCircle'));
    this.signOutButton = element(by.buttonText('Logout'));
    this.allEntries = element(by.buttonText('All entries'));
    this.deleteIcon = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(10) > div > div > div > span > md-icon'));
    this.numberOfEntries = element.all(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1n) > datatable-body-row'));
    this.fourthPage = element(by.css('body > app-root > div > app-time-tracking > div.layout-column > div.ftt-content > md-card > app-entries > ngx-datatable > div > datatable-footer > div > datatable-pager > ul > li:nth-child(6) > a'));
    this.username = 'wayne';
    this.password = 'fluance2018*'
}
module.exports = Pagesize;