import { defineCase } from "../../../defineCase.ts";
export default [
	defineCase({ entry: "./index", loaderConfig: "./loaderConfig.cjs", environment: { foopath: "test/foo" }, noConsole: true, requireFnPropName: "dj" }),
	defineCase({
		entry: "./index", loaderConfig: function (env) {
			it("env should specify fooptah", function () {
				env.foopath.should.be.eql("test/foo");
			});
			return {
				paths: { foo: env.foopath },
				aliases: [[/^fooalias$/, function () { return env.foopath; }]],
				noConfigApi: !!env.noConfigApi
			};
		}, environment: { foopath: "test/foo", has: { "dojo-config-api": 1 }, noConfigApi: true }, requireFnPropName: "dj"
	}),
	defineCase({
		entry: "./index", loaderConfig: function (env) {
			return Object.assign(require("./loaderConfig.cjs")(env), { has: { 'dojo-config-api': 1 } });
		}, environment: { foopath: "test/foo" }, requireFnPropName: "dj"
	})
];
