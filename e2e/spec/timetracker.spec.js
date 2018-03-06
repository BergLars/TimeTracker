var Timetracker = require('../page/timetracker.js');
var timeTracker = new Timetracker();

describe('Timetracker App', function () {
  beforeEach(() => {
    timeTracker.navigateTo();
  });
  it('should display the title and the version of the application: Timetracker - DEV v1.6', () => {
    let elementFinder = element(by.css('body > app-root > md-toolbar > div > md-toolbar-row > span:nth-child(1)'));

    // expect(elementFinder.isPresent()).toBe(true);
    expect(elementFinder.getText()).toBe('Timetracker - DEV v1.6');
  });

  it('should have right title', () => {
    expect(timeTracker.pageTitle()).toEqual('Timetracker');
  })
});
