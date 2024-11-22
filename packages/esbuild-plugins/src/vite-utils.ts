const alias = {
    "d3-array": "@hpcc-js/common",
    "d3-brush": "@hpcc-js/common",
    "d3-collection": "@hpcc-js/common",
    "d3-color": "@hpcc-js/common",
    "d3-dispatch": "@hpcc-js/common",
    "d3-drag": "@hpcc-js/common",
    "d3-dsv": "@hpcc-js/common",
    "d3-ease": "@hpcc-js/common",
    "d3-format": "@hpcc-js/common",
    "d3-interpolate": "@hpcc-js/common",
    "d3-scale": "@hpcc-js/common",
    "d3-selection": "@hpcc-js/common",
    "d3-time-format": "@hpcc-js/common",
    "d3-transition": "@hpcc-js/common",
    "d3-zoom": "@hpcc-js/common"
};

export function hpccBundleNames(pkg: any) {
    const external: string[] = [];
    const globals: { [id: string]: string } = {};
    for (const dep in pkg.dependencies) {
        external.push(dep);
        globals[dep] = dep;
    }
    return { alias: (pkg.name !== "@hpcc-js/common" && pkg.dependencies["@hpcc-js/common"]) ? alias : {}, external, globals };
}