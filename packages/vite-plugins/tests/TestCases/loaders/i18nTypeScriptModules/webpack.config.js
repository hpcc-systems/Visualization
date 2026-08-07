var path = require("path");
var DojoWebpackPlugin = require("../../../../index");
module.exports = {
	entry: "test/index",
	plugins: [
		new DojoWebpackPlugin({
			loaderConfig: {
				paths:{test: "."},
				locale: "de-at",
				has: {"host-browser": 0, "dojo-config-api": 0}
			},
			locales: ["en", "de-at"],
			loader: path.join(__dirname, "../../../js/dojo/dojo.js")
		})
	]
};
