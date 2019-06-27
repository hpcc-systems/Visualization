const node_libs = ["child_process", "fs", "node-fetch", "os", "path", "semver", "safe-buffer", "tmp", "xmldom"];

// ddl-shim is no longer a shim...
// Keep in sync with loader/src/meta.ts
const hpccShims = ["@hpcc-js/codemirror-shim", "@hpcc-js/dgrid-shim", "@hpcc-js/phosphor-shim", "@hpcc-js/preact-shim", "@hpcc-js/requirejs-shim"];

export const isHpcc = (id: string): boolean => id.indexOf("@hpcc-js") === 0;

export const isShim = (id: string): boolean => hpccShims.indexOf(id) >= 0;

export function external(id) {
    return (isHpcc(id) && !isShim(id)) || node_libs.indexOf(id) >= 0;
}

export function globals(id) {
    if (id.indexOf("@hpcc-js") === 0) {
        return id;
    }
    return undefined;
}
