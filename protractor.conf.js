// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const { exec } = require('child_process');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './e2e/**/login.spec.js',
    // './e2e/**/timetracker.spec.js',
    //
    './e2e/**/at-newentry.spec.js',
    './e2e/**/at-sorting.spec.js',
    './e2e/**/at-create.spec.js',
    './e2e/**/at-edit.spec.js',
    './e2e/**/at-menu.spec.js',
    './e2e/**/at-delete.spec.js',
    './e2e/**/at-deleteentry.spec.js',
    './e2e/**/at-pagesize.spec.js',
    //
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
    exec('psql timetracker < e2e/schema_ftt.sql', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("beforeLaunch: Frozen dataset created!");
    });
  },
  onPrepare: function () {
    global.TIMEOUT = 2000; // milliseconds
    global.EC = protractor.ExpectedConditions;
    global.SENDKEYS_TIMEOUT = 500;
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
