var EditComponent = function () {
    this.editButton = element(by.buttonText('EDIT'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.profileIcon = element(by.id('accountCircle'));
    this.logoutButton = element(by.buttonText('Logout'));
    this.okButton = element(by.buttonText('OK'));
    this.itemName = 'black';
    this.clientNameField = element(by.id('newClientName'));
    this.projectNameField = element(by.id('newProjectName'));
    this.descriptionTaskField = element(by.id('newTaskDescription'));
    this.clientOption = $('#clientOptions');
    this.projectOption = $('#projectOptions');
    this.taskOption = $('#taskOptions');
}
module.exports = EditComponent;