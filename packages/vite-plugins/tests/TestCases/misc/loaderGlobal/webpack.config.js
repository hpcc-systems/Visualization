var DojoWebpackPlugin = require("../../../../index");
var path = require("path");
module.exports = {
	entry: "test/index",
	plugins: [
		new DojoWebpackPlugin({
			loader: path.join(__dirname, "../../../js/dojo/dojo.js"),
			loaderConfig: {
				has: {'host-browser':0},
				paths:{test: "."},
				packages:[{name: "dojo", location: "../../../../node_modules/dojo"}]
			},
			noConsole: true
		})
	]
};
