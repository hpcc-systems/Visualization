const node_libs = ["child_process", "fs", "node-fetch", "os", "path", "semver", "safe-buffer", "tmp", "xmldom"];

export function external(id) {
    return (id.indexOf("@hpcc-js") === 0 && id.indexOf("-shim") < 0) || node_libs.indexOf(id) >= 0;
}

export function globals(id) {
    if (id.indexOf("@hpcc-js") === 0) {
        return id;
    }
    return undefined;
}
