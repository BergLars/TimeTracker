var UserprofileMenu = function () {
    this.profileIcon = element(by.id('accountCircle'));
    this.deleteUserButton = element(by.buttonText('Delete user'));
    this.changePasswordButton = element(by.buttonText('Change password'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.logoutButton = element(by.buttonText('Logout'));
    this.currentPassword = element(by.id('currentPassword'));
    this.newPassword = element(by.id('newPassword'));
    this.confirmPassword = element(by.id('confirmPassword'));
    this.okButton = element(by.buttonText('OK'));
    this.password = 'Fluance2025*';
    this.wrongPassword = 'fluance2025*';
}
module.exports = UserprofileMenu;