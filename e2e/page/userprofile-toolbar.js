var UserprofileToolbar = function () {
    this.profileIcon = element(by.id('accountCircle'));
    this.deleteUserButton = element(by.buttonText('Delete user'));
    this.changePasswordButton = element(by.buttonText('Change password'));
    this.cancelButton = element(by.buttonText('Cancel'));
    this.signOutButton = element(by.buttonText('Logout'));
    this.currentPassword = element(by.id('currentPassword'));
    this.newPassword = element(by.id('newPassword'));
    this.confirmPassword = element(by.id('confirmPassword'));
    this.okButton = element(by.buttonText('OK'));

    this.clickChangePassword = function () {
        this.profileIcon.click();
        this.changePasswordButton.click();
        this.currentPassword.sendKeys('Fluance2025*');
        this.newPassword.sendKeys('Fluance2025*');
        this.confirmPassword.sendKeys('Fluance2025*');
        this.okButton.click();
    }

    this.clickDeleteUser = function () {
        // browser.wait(EC.elementToBeClickable(this.profileIcon), TIMEOUT, "Profile icon" + " not clickable");
        this.profileIcon.click();
        // browser.wait(EC.elementToBeClickable(this.deleteUserButton), TIMEOUT, "Delete button" + " not clickable");
        this.deleteUserButton.click();
        element(by.cssContainingText('option', 'test')).click();
        this.okButton.click();
    }

    this.clickSignOut = function () {
        this.profileIcon.click();
        this.signOutButton.click();
    }

    this.wrongPassword = function () {
        this.okButton.click();
    }

    this.logOutUser = function () {
        // browser.wait(EC.elementToBeClickable(this.profileIcon), TIMEOUT, "toolbar" + " not present");
        // browser.wait(EC.elementToBeClickable(this.signOutButton), TIMEOUT, "toolbar" + " not present");
        this.clickSignOut();
    }
}
module.exports = UserprofileToolbar;