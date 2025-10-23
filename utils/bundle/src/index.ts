
const node_libs = ["child_process", "fs", "abort-controller", "node-fetch", "undici", "os", "path", "semver", "safe-buffer", "tmp", "@xmldom/xmldom"];

export const isHpcc = (id: string): boolean => id.indexOf("@hpcc-js") === 0;

export const isShim = (id: string): boolean => isHpcc(id) && id.indexOf("-shim") > 0;

export function external(id) {
    return (isHpcc(id) && !isShim(id)) || node_libs.indexOf(id) >= 0;
}

export function globals(id) {
    if (id.indexOf("@hpcc-js") === 0) {
        return id;
    }
    return undefined;
}

export { packageVersionPlugin, getRootPackageVersion } from "./rollup-plugin-version.js";
