var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();
var Login = require('../page/login.js');
var login = new Login();

describe('Login page', () => {
  beforeEach(() => {
    timeTracker.navigateTo();
    login.loginUser('testuser', 'Fluance2025*');
  });
  afterEach(() => {
    login.logOutUser();
  });
  it('Login succeed', () => {
    browser.wait(EC.urlContains('timeentries'), 5000);
    expect(EC.urlContains('timeentries')).toBeTruthy();
  });
});
