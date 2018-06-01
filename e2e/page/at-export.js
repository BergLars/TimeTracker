var ExportComponent = function () {
    this.exportButton = element(by.buttonText('EXPORT'));
    this.profileIcon = element(by.id('accountCircle'));
    this.logoutButton = element(by.buttonText('Logout'));
    this.okButton = element(by.buttonText('OK'));
    this.okExportLink = element(by.css('#cdk-overlay-0 > md-dialog-container > app-export-dialog > div.mat-dialog-actions > a > span'));
    this.fromDateField = element(by.id('inputFromDate'));
    this.toDateField = element(by.id('inputToDate'));
    this.fromDate = '12.02.2017';
    this.invalidFromDateFormat = '12/02/2017';
    this.toDate = '12.02.2018';
    this.cancelButton = element(by.buttonText('Cancel'));
}
module.exports = ExportComponent;