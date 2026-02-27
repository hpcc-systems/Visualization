import type * as dgrid_shim from "@hpcc-js/dgrid-shim";

//  Note:  Resolved at build time and inlined into the dgrid bundle.
// @ts-ignore
import dgridShimBundle from "@hpcc-js/dgrid-shim/dist/index.js?raw";
const loadDgridShim = new Function("globalThis", "var self = globalThis; var window = globalThis;" + dgridShimBundle);

if (!globalThis["@hpcc-js/dgrid-shim"]) {
    loadDgridShim(globalThis);
    if (!globalThis["@hpcc-js/dgrid-shim"]) {
        console.error("dgrid-shim failed to load from inlined bundle");
    }
}

export const Deferred = globalThis["@hpcc-js/dgrid-shim"].Deferred as typeof dgrid_shim.Deferred;
export const Memory = globalThis["@hpcc-js/dgrid-shim"].Memory as typeof dgrid_shim.Memory;
export const QueryResults = globalThis["@hpcc-js/dgrid-shim"].QueryResults as typeof dgrid_shim.QueryResults;
export const Grid = globalThis["@hpcc-js/dgrid-shim"].Grid as typeof dgrid_shim.Grid;
export const PagingGrid = globalThis["@hpcc-js/dgrid-shim"].PagingGrid as typeof dgrid_shim.PagingGrid;
export const domConstruct = globalThis["@hpcc-js/dgrid-shim"].domConstruct as typeof dgrid_shim.domConstruct;
