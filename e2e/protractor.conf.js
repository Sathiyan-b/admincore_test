// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    // chromeOptions: {
    //   args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
    // }
  },
  
  directConnect: true,
  baseUrl: 'https://icumed.eazysaas.com/admincorev3/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000000,
    print: function() {},
  // specs: ['async_await.js'],
  // SELENIUM_PROMISE_MANAGER: false,
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    // @ts-ignore
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};