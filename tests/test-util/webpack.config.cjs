var path = require('path');

module.exports = {
  entry: './lib-es6/index.spec.js',
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.test.js'
  }
}
