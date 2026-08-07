var path = require("path");
var DojoWebpackPlugin = require("../../../../index");
module.exports = {
    entry: {
        app: "./index"
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    plugins: [
        new DojoWebpackPlugin({
            loaderConfig: require.resolve("./loaderConfig"),
            loader: path.join(__dirname, "../../../js/dojo/dojo.js")
        })
    ]
};