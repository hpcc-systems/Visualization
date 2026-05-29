import { describe, it, expect } from "vitest";
import { loadScriptViaAMD } from "./util.js";

/**
 * Verify that webpack UMD bundles correctly take the AMD code path when a
 * compliant AMD loader is detected.  The UMD wrapper produced by webpack looks
 * like:
 *
 *   if (typeof define === 'function' && define.amd)
 *       define("HpccLayout", [], factory);
 *
 * These tests install a minimal AMD shim before the bundle is injected,
 * capture the factory result, then assert the expected exports are present.
 */

describe("@hpcc-js/layout webpack AMD compatibility", () => {
    it("should register via define() when AMD is available", async () => {
        const exports = await loadScriptViaAMD("/layout.bundle.js");

        expect(exports).toBeDefined();
        expect(typeof exports).toBe("object");
    });

    it("should expose ChartPanel through AMD exports", async () => {
        const exports = await loadScriptViaAMD("/layout.bundle.js");

        const { ChartPanel } = exports;
        expect(typeof ChartPanel).toBe("function");
    });

    it("should expose Legend through AMD exports", async () => {
        const exports = await loadScriptViaAMD("/layout.bundle.js");

        const { Legend } = exports;
        expect(typeof Legend).toBe("function");
    });

    it("should expose Border2 through AMD exports", async () => {
        const exports = await loadScriptViaAMD("/layout.bundle.js");

        const { Border2 } = exports;
        expect(typeof Border2).toBe("function");
    });
});

describe("@hpcc-js/eclwatch webpack AMD compatibility", () => {
    it("should register via define() when AMD is available", async () => {
        const exports = await loadScriptViaAMD("/eclwatch.bundle.js");

        expect(exports).toBeDefined();
        expect(typeof exports).toBe("object");
    });

    it("should expose WUGraphLegend through AMD exports", async () => {
        const exports = await loadScriptViaAMD("/eclwatch.bundle.js");

        const { WUGraphLegend } = exports;
        expect(typeof WUGraphLegend).toBe("function");
    });

    it("WUGraphLegend from AMD bundle should be instantiable", async () => {
        const exports = await loadScriptViaAMD("/eclwatch.bundle.js");

        const { WUGraphLegend } = exports;
        const legend = new WUGraphLegend();
        expect(legend._class).toContain("eclwatch_WUGraphLegend");
    });

    it("should expose WUGraph through AMD exports", async () => {
        const exports = await loadScriptViaAMD("/eclwatch.bundle.js");

        const { WUGraph } = exports;
        expect(typeof WUGraph).toBe("function");
    });
});
