import { scopedLogger } from "./logging";
import { root } from "./platform";

const logger = scopedLogger("loader");

//  Shim to simplify dynamic import until rollupjs supports it (esnext)
declare const module: any;
declare const require: any;

const moduleMode = ((): "amd" | "cjs" | "iife" => {
    if (typeof require === "function") {
        if (typeof module === "object" && typeof module.exports === "object") {
            return "cjs";
        } else {
            return "amd";
        }
    }
    return "iife";
})();

export function dynamicImport(pkg: string, altGlobalName?: string): Promise<any> {
    let promise: Promise<any>;
    switch (moduleMode) {
        case "amd":
            promise = new Promise(function (resolve_1, reject_1) {
                require([pkg], resolve_1, reject_1);
            });
        case "cjs":
            promise = Promise.resolve().then(function () {
                return require(pkg);
            });
        case "iife":
        default:
            promise = new Promise((resolve, reject) => {
                const globalPkg = root[altGlobalName || pkg];
                globalPkg ? resolve(globalPkg) : reject();
            });
    }
    return promise.catch(e => {
        logger.error(`dynamicImport([${pkg}], ...) failed`);
        return null;
    });
}
