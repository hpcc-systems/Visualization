var rollup = require('rollup');
//var alias = require('rollup-plugin-alias');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require("rollup-plugin-commonjs");
var css = require('rollup-plugin-css-only');
var uglify = require('rollup-plugin-uglify');
var sourcemaps = require('rollup-plugin-sourcemaps');
var Visualizer = require('rollup-plugin-visualizer');

var dependencies = require("./package.json").dependencies;

var config = {
    entry: './lib-es6/index-browser.js',
    format: "umd",
    moduleName: "HPCCViz",
    dest: "./lib-browser/index.js",
    sourceMap: true,
    external: [],
    globals: {},
    plugins: [
        //alias({}),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            //include: 'node_modules/**',
            namedExports: { "ciena-graphlib": ["Graph"] }
        }),
        css({}),
        sourcemaps()
    ]
};

console.log("Rollup " + process.env.BUILD + " for " + process.env.RUNTIME);
var entry = "index";
var dest = "viz";

switch (process.env.RUNTIME) {
    case "node":
        entry += "-node";
        config.format = "cjs";
        console.log("Externals:  " + Object.keys(dependencies));
        config.external = Object.keys(dependencies);
        break;
    case "browser":
        //console.log("Externals:  " + Object.keys(dependencies));
        //config.external = Object.keys(dependencies);
        entry += "-browser";
        dest += '-browser';
        break;
}

switch (process.env.BUILD) {
    case "src":
        entry = "src/" + entry;
        break;
    case "test":
        entry = "lib-test/test/index";
        dest += "-test";
        //config.format = "umd";
        //config.external.push("chai");
        //config.globals.chai = "chai";
        break;
}

if (process.env.PACKAGE === "min") {
    dest += ".min";
    config.plugins.push(uglify({}));
}

if (process.env.VIZ) {
    config.plugins.push(Visualizer({ sourcemap: true }));
}

config.entry = "./tmp/" + entry + ".js";
config.dest = "./dist/" + dest + ".js";

module.exports = config;
