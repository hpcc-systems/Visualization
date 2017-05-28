({
    baseUrl: ".",
    appDir: "../nullDir",
    dir: "dist",
    paths: {
        "requireLib": "../../node_modules/requirejs/require"
    },
    optimize: "none",
    wrap: {
        start: "Object.defineProperty(exports, \"__esModule\", { value: true });",
        end: "exports.requirejs = hpcc_js.requirejs;exports.require = hpcc_js.require;exports.define = hpcc_js.define;"
    },
    namespace: "hpcc_js",
    modules: [{
        name: "requirejs-shim",
        include: ["requireLib"],
        create: true
    }]
})