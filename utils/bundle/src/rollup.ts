import * as rollup from "rollup";
import * as alias from "rollup-plugin-alias";
import * as commonjs from "rollup-plugin-commonjs";
import * as resolve from "rollup-plugin-node-resolve";
import * as postcss from "rollup-plugin-postcss";
import * as sourcemaps from "rollup-plugin-sourcemaps";
import * as uglify from "rollup-plugin-uglify";

import * as program from "commander";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

// tslint:disable:no-var-requires
declare const require: any;

program
    .version("0.0.1")
    .option("-m, --min", "Minimize")
    .parse(process.argv);

const aliases: { [key: string]: string } = {
    // ajv: "../../node_modules/ajv/dist/ajv.bundle.js"
};
const externals: string[] = [];
const globals: { [key: string]: string } = {};
const deps: { [key: string]: any } = {};

const webpackShims = ["@hpcc-js/dgrid-shim", "@hpcc-js/ddl-shim", "@hpcc-js/c3-shim"];

function walkDependencies(folder: string, depth: number = 0) {
    const pkg = require(path.join(folder, "package.json"));
    pkg.__folder = folder;
    for (const key in pkg.dependencies) {
        if (webpackShims.indexOf(key) >= 0 || (key !== "@hpcc-js/d3-bullet" && key.indexOf("@hpcc-js") === 0 && key.indexOf("-shim") < 0)) {
            const depPkg = walkDependencies(path.join(folder, "node_modules", key), depth + 1);
            deps[key] = depPkg;
            if (depth === 0) {
                console.log("Excluding:  " + key);
                externals.push(key);
                globals[key] = key;
            }
        }
    }
    return pkg;
}
const myPackage = walkDependencies(process.cwd());
const leafID = myPackage.name.split("/")[1];

for (const key in myPackage.dependencies) {
    if (key.indexOf("@hpcc-js") !== 0) {
        for (const depKey in deps) {
            if (deps[depKey].dependencies[key]) {
                const depPckg = deps[depKey];
                console.log(`Optimized:  ${key} in ${depPckg.name}`);
                aliases[key] = depKey;
                const indexSrc = fs.readFileSync(path.join(depPckg.__folder, "src", "index.ts"), "utf8");
                if (indexSrc.indexOf(key) < 0) {
                    console.log(`Error:  ${key} not exported by ${depPckg.name}`);
                }
                const mySrc = fs.readFileSync(path.join(myPackage.__folder, "src", "index.ts"), "utf8");
                if (mySrc.indexOf(key) >= 0) {
                    console.log(`Error:  ${key} shoud not be exported by ${myPackage.name}`);
                }
                break;
            }
        }
    }
}

export default function bundle(min: boolean = false) {
    const plugins = [
        alias(aliases),
        resolve({
            preferBuiltins: true,
            jsnext: true,
            main: true
        }),
        commonjs({
            namedExports: {
                //  "../../packages/preact-shim/dist/preact-shim.js": ["render", "Component", "h"]
            }
        }),
        postcss({
            extensions: [".css"]
        }),
        sourcemaps()
    ];
    if (min) {
        plugins.push(uglify({}));
    }
    return rollup.rollup({
        entry: "lib-es6/index.js",
        external: externals,
        plugins
    }).then(function (bundle) {
        return bundle.write({
            dest: `dist/${leafID}${min ? ".min" : ""}.js`,
            format: "umd",
            moduleName: myPackage.name,
            globals,
            sourceMap: true
        });
    });
}

Promise.all([
    bundle(),
    bundle(true)
]).catch(console.log);
