var Login = function () {
    this.usernameField = element(by.id('username'));
    this.passwordField = element(by.id('password'));
    this.signInButton = element(by.buttonText('Login'));
    this.profileIcon = element(by.id('accountCircle'));
    this.signOutButton = element(by.buttonText('Logout'));

    this.navigateTo = () => {
        return browser.get('/');
    }

    this.loginUser = function (username, password) {
        this.usernameField.sendKeys(username);
        this.passwordField.sendKeys(password);
        this.signInButton.click();
    }

    this.clickSignOut = function () {
        this.signOutButton.click();
    }

    this.clickProfileIcon = function () {
        this.profileIcon.click();
    }

    this.logOutUser = function () {
        this.clickProfileIcon();
        this.clickSignOut();
    }
}
module.exports = Login;