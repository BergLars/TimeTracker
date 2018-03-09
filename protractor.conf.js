// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const { exec } = require('child_process');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './e2e/**/*.spec.js',
    './e2e/**/at-entry.spec.js',
    './e2e/**/at-cruditem.spec.js',
    './e2e/**/at-inlineediting.spec.js',
    './e2e/**/at-export.spec.js',
    './e2e/**/at-sorting.spec.js',
    './e2e/**/at-pagesize.spec.js',
    './e2e/**/at-user.spec.js',
    // 
    // './e2e/**/at-filters.spec.js',
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
    global.validDateRegex = (/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](2)\d{3}$/);
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
