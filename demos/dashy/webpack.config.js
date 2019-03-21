var path = require('path');

module.exports = {
    entry: './lib-es6/index.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'webpackLib.js',
        library: "vizLib",
    },
    mode: "development"
}
