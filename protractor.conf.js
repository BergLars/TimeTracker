// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './e2e/**/login.spec.js',
    // './e2e/**/timetracker.spec.js',
    './e2e/**/at-create.spec.js',
    // './e2e/**/at-menu.spec.js',
    // './e2e/**/at-export.spec.js',
    // './e2e/**/menu-toolbar.spec.js',
    // './e2e/**/entries-toolbar.spec.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 360000
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
  },
  onPrepare: function () {
    global.TIMEOUT = 5000; // milliseconds
    global.EC = protractor.ExpectedConditions;
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
