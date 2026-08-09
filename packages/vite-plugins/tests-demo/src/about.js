define(["dojo/_base/config"], function (config) {
	return {
		text: "Loaded asynchronously with require([...]). Dojo locale: " + (config.locale || "default")
	};
});
