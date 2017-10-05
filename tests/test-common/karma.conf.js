module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    reporters: ['mocha'],
    files: [
      'build/bundle.test.js'
    ],
    proxies: {
      "/build/**/*": "/base/build/**/*"
    },
    port: 9876,
    colors: true,
    singleRun: false,
    browserNoActivityTimeout: 30000,
    failOnEmptyTestSuite: false,
    logLevel: config.LOG_INFO
  });
};
