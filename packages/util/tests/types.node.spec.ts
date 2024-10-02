import { describe, it, expect } from "vitest";
import { bundle } from "./dts-bundle";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { glob } from "glob";

const NODEJS_DEPENDENCY_EXCEPTIONS = ["node-fetch", "undici", "abort-controller", "safe-buffer", "@xmldom/xmldom", "tmp", "yargs"];
const EXTERNAL_EXCEPTIONS = ["preact/hooks"];

function calcExternals(main: string = "types/index.d.ts", out: string = "dist/index.d.ts") {
    const bundleInfo: any = bundle({
        name: "__dummy__",
        baseDir: ".",
        main,
        out,
        outputAsModuleFolder: true,
        headerPath: "",
        headerText: ""
    });
    const externals: string[] = [];
    for (const key in bundleInfo.fileMap) {
        for (const external of bundleInfo.fileMap[key].externalImports) {
            if (externals.indexOf(external) < 0) {
                externals.push(external);
            }
        }
    }
    return externals;
}

describe("Types", function () {
    it.skip("tsc 2.9.x import issue", () => {
        return new Promise<void>(async done => {
            //  Check for types exported from packages that do not exist in the dependcies list.
            const files = await glob("../*/types/*.d.ts");
            for (const f of files) {
                const data = await readFile(f, "utf8");
                //  Check for invalid "import(" statements - typescript issue in 2.9.x
                expect(data.indexOf('import("'), f).to.equal(-1);
            }
            done();
        });
    });

    it.skip("dependencies", () => {
        return new Promise<void>(async (done) => {
            //  Check for types exported from packages that do not exist in the dependcies list.
            const folders = await glob("packages/*/");
            for (const folder of folders.filter((folder: string) => folder.indexOf("codemirror-shim") < 0)) {
                console.log("folder", folder);
                const pkg = JSON.parse(await readFile(`${folder}/package.json`, "utf8"));
                if (pkg.module && pkg.module.indexOf("lib-es6/") === 0) {
                    // Loose es6 files need all dependencies  ---
                    expect(true).to.be.true;
                } else {
                    // const files = await glob(`${folder}/types/**/*.d.ts`);
                    let typePath = `${folder}/types/index.node.d.ts`;
                    if (!existsSync(typePath)) {
                        typePath = `${folder}/types/index.d.ts`;
                    }
                    if (existsSync(typePath)) {
                        const externals = await calcExternals(typePath, `tmp/${pkg.name}`);
                        externals.filter(external => EXTERNAL_EXCEPTIONS.indexOf(external) < 0).forEach(external => {
                            console.log("external", external);
                            if (pkg.name.indexOf("-shim") < 0 && (!pkg.dependencies || (!pkg.dependencies[external] && !pkg.dependencies["@types/" + external]))) {
                                expect(false, `${pkg.name}:${folder} missing dependency:  ${external}`).to.be.true;
                            }
                        });
                        for (const key in pkg.dependencies) {
                            console.log("key", key);
                            const deps = key.indexOf("@types/") === 0 ? key.substr(7) : key;
                            if (NODEJS_DEPENDENCY_EXCEPTIONS.indexOf(deps) < 0 && key.indexOf("@hpcc-js") < 0 && externals.indexOf(deps) < 0) {
                                expect(false, `${pkg.name}:${folder} extraneous dependency:  ${deps}`).to.be.true;
                            }
                        }
                    }
                }
            }
            done();
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            console.log("done");
        });
    });
});
