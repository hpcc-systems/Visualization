var path = require('path');

module.exports = {
    entry: './lib-es6/index.spec.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.test.js'
    },
    devtool: "source-map",
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: "source-map-loader"
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    publicPath: "dist/"
                }
            }]
        }]
    }
}
