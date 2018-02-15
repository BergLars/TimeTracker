var Login = function () {
    this.usernameField = element(by.id('username'));
    this.passwordField = element(by.id('password'));
    this.signInButton = element(by.buttonText('Login'));
    this.profileIcon = element(by.id('accountCircle'));
    this.signOutButton = element(by.buttonText('Logout'));
    this.username = 'admintestuser';
    this.password = 'Fluance2025*';

    this.navigateTo = () => {
        return browser.get('/');
    }

    this.loginUser = function (username, password) {
        // browser.wait(EC.elementToBeClickable(this.usernameField), TIMEOUT, "Username" + " not clickable");
        element(by.id('username')).sendKeys(username);
        element(by.id('password')).sendKeys(password);
        element(by.buttonText('Login')).click();
    }

    this.clickSignOut = function () {
        element(by.buttonText('Logout')).click();
    }

    this.clickProfileIcon = function () {
        element(by.id('accountCircle')).click();
    }

    this.logOutUser = function () {
        // browser.wait(EC.elementToBeClickable(this.usernameField), TIMEOUT, "Username" + " not clickable");
        this.clickProfileIcon();
        this.clickSignOut();
    }
}
module.exports = Login;