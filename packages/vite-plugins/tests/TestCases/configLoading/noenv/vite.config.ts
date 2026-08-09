import { defineCase } from "../../../defineCase.ts";
export default [
    defineCase({ entry: "./index", "loaderConfig": "./loaderConfig.cjs", "requireFnPropName": "dj" }),
    defineCase({ entry: "./index", "loaderConfig": { "paths": { "foo": "/test/foo" }, "aliases": [[/^fooalias(\/.*)?$/, function (__, $1) { return "/test/foo" + $1; }]], "noConfigApi": true }, "requireFnPropName": "dj" }),
    defineCase({ entry: "./index", "noConsole": true, "loaderConfig": { "paths": { "foo": "/test/foo" }, "aliases": [[/^fooalias(\/.*)?$/, function (__, $1) { return "/test/foo" + $1; }]], "has": { "dojo-config-api": 0 }, "noConfigApi": true }, "requireFnPropName": "dj" })
];
