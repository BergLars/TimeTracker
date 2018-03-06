let Timetracker = function () {
  this.navigateTo = () => {
    return browser.get('/');
  };

  this.headerText = function () {
    return element(by.css('body'));
  };

  this.pageTitle = function () {
    return browser.getTitle();
  };
};
module.exports = Timetracker;