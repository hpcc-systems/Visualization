import type * as dgrid_shim from "@hpcc-js/dgrid-shim";

if (!globalThis["@hpcc-js/dgrid-shim"]) {
    console.error("dgrid-shim not loaded, please add `<script src=\"https://cdn.jsdelivr.net/npm/@hpcc-js/dgrid-shim@2.26.0/dist/index.min.js\"></script>` or similar to your HTML file");
}

export const Deferred = globalThis["@hpcc-js/dgrid-shim"].Deferred as typeof dgrid_shim.Deferred;
export const Memory = globalThis["@hpcc-js/dgrid-shim"].Memory as typeof dgrid_shim.Memory;
export const QueryResults = globalThis["@hpcc-js/dgrid-shim"].QueryResults as typeof dgrid_shim.QueryResults;
export const Grid = globalThis["@hpcc-js/dgrid-shim"].Grid as typeof dgrid_shim.Grid;
export const PagingGrid = globalThis["@hpcc-js/dgrid-shim"].PagingGrid as typeof dgrid_shim.PagingGrid;
export const domConstruct = globalThis["@hpcc-js/dgrid-shim"].domConstruct as typeof dgrid_shim.domConstruct;
