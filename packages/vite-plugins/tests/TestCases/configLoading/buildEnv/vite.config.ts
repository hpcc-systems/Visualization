import { defineCase } from "../../../defineCase.ts";

export default [
    defineCase({ entry: "./index", loaderConfig: "./loaderConfig.cjs", environment: { foopath: "/foo", dojoRoot: "release" }, buildEnvironment: { foopath: "test/foo", dojoRoot: "../../../../node_modules" }, requireFnPropName: "dj" }),
    defineCase({
        entry: "./index", loaderConfig: function (env) {
            it("foopath should be defined in environment", function () {
                env.foopath.should.be.defined;
            });
            it("dojoRoot should be correct", function () {
                env.dojoRoot.should.be.eql("../../../../node_modules");
            });
            return {
                paths: { foo: env.foopath },
                packages: [{ name: "dojo", location: env.dojoRoot + "/dojo" }],
                aliases: [[/^fooalias$/, function () { return env.foopath; }]],
                has: { "host-browser": 0 },
                noConfigApi: !!env.noConfigApi
            };
        }, environment: { foopath: "/foo", dojoRoot: "release", noConfigApi: true }, buildEnvironment: { foopath: "test/foo", dojoRoot: "../../../../node_modules" }, requireFnPropName: "dj"
    }),
    defineCase({
        entry: "./index", noConsole: true, loaderConfig: function (env) {
            var config = require("./loaderConfig.cjs")(env);
            config.has['dojo-config-api'] = 1;
            return config;
        }, environment: { foopath: "/foo", dojoRoot: "release" }, buildEnvironment: { foopath: "test/foo", dojoRoot: "../../../../node_modules" }, requireFnPropName: "dj"
    })
];