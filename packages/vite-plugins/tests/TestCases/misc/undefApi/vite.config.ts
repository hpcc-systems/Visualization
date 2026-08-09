import { defineCase } from "../../../defineCase.ts";

const undefApi = { "dojo-undef-api": true };

export default [
    defineCase({ entry: "test/index1", loaderConfig: { paths: { test: "." }, has: undefApi, testCase: "context require with config object" } }),
    defineCase({
        entry: "test/index1",
        loaderConfig: () => ({ paths: { test: "." }, has: undefApi, testCase: "context require with config function" })
    }),
    defineCase({ entry: "test/index1", loaderConfig: "./loaderConfig.cjs" }),
    defineCase({ entry: "test/index1", loaderConfig: "./loaderConfigFn.cjs" }),
    defineCase({ entry: "test/index3", loaderConfig: { paths: { test: "." }, has: undefApi, testCase: "global require with config object" } }),
    defineCase({ entry: "test/index2", loaderConfig: { paths: { test: "." }, has: { "dojo-undef-api": false } } }),
    defineCase({
        entry: "test/index4",
        loaderConfig: {
            paths: { test: "." },
            aliases: [["has", "dojo/has"]],
            has: { "host-browser": 0, "dojo-undef-api": true, a: true, b: true }
        },
        runtimeFeatures: ["a"]
    })
];
