const alias = require("@rollup/plugin-alias");
const commonJS = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const transformTaggedTemplateMod = require("rollup-plugin-transform-tagged-template");
const sourcemaps = require("rollup-plugin-sourcemaps");
const terser = require("@rollup/plugin-terser");

function transformHTMLFragment(data) {
    data = data.replace(/\s*([<>])\s*/g, "$1"); // remove spaces before and after angle brackets
    return data.replace(/\s{2,}/g, " "); // Collapse all sequences to 1 space
}

function transformCSSFragment(data) {
    const newlines = /\n/g;
    const separators = /\s*([{};])\s*/g;
    const lastProp = /;\s*(\})/g;
    const extraSpaces = /\s\s+/g;
    const endingSpaces = / ?\s+$/g;

    data = data.replace(newlines, "");
    data = data.replace(separators, "$1");
    data = data.replace(lastProp, "$1");
    data = data.replace(endingSpaces, " ");
    return data.replace(extraSpaces, " ");
}

const parserOptions = {
    sourceType: "module",
};

console.log(Object.keys(terser));

const plugins = [
    alias({
        entries: [
        ]
    }),
    resolve(),
    commonJS(),
    transformTaggedTemplateMod.default({
        tagsToProcess: ["css"],
        transformer: transformCSSFragment,
        parserOptions,
    }),
    transformTaggedTemplateMod.default({
        tagsToProcess: ["html"],
        transformer: transformHTMLFragment,
        parserOptions,
    }),
    sourcemaps()
];

const treeshake = {
    moduleSideEffects: (id, _external) => {
        if (id.indexOf(".css") >= 0) return true;
        return false;
    }
};

module.exports = {
    default: async (commandLineArgs) => {
        const pkg = require(`./${commandLineArgs.folder}/package.json`);


        return [
            {
                input: "dist/esm/index.js",
                output: [
                    {
                        file: pkg.exports.script.split(".min").join(""),
                        format: "umd",
                        sourcemap: true,
                        plugins: [],
                        name: pkg.name
                    },
                    {
                        file: pkg.exports.script,
                        format: "umd",
                        sourcemap: true,
                        plugins: [terser()],
                        name: pkg.name
                    },
                    {
                        file: pkg.main,
                        format: "es",
                        sourcemap: true,
                        plugins: [],
                        name: pkg.name
                    },
                    {
                        file: pkg.main.split(".esm").join(".esm.min"),
                        format: "es",
                        sourcemap: true,
                        plugins: [terser()],
                        name: pkg.name
                    },
                ],
                treeshake,
                plugins,
            },
        ];
    }
};