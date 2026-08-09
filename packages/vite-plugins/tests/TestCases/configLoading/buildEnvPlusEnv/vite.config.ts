import { defineCase } from "../../../defineCase.ts";
export default [
	defineCase({ entry: "./index", loaderConfig: "./loaderConfig.cjs", buildEnvironment: { foopath: "test/foo" }, requireFnPropName: "dj" }),
	defineCase({
		entry: "./index", loaderConfig: function (env) {
			return {
				paths: { foo: env.foopath },
				aliases: [[/^fooalias$/, function () { return env.foopath; }]],
				noConfigApi: !!env.noConfigApi,
				has: { 'dojo-config-api': !env.noConfigApi }
			};
		}, buildEnvironment: { foopath: "test/foo", noConfigApi: true }, environment: { noConfigApi: true }, noConsole: true, requireFnPropName: "dj"
	}),
	defineCase({
		entry: "./index", loaderConfig: function (env) {
			return {
				paths: { foo: env.foopath },
				aliases: [[/^fooalias$/, function () { return env.foopath; }]],
				noConfigApi: !!env.noConfigApi,
				has: { 'dojo-config-api': !env.noConfigApi }
			};
		}, buildEnvironment: { foopath: "test/foo", noConfigApi: false }, environment: { noConfigApi: false }, noConsole: true, requireFnPropName: "dj"
	})
];
