import { describe, it, expect, beforeAll } from "vitest";
import { simpleRequire } from "./util.js";

describe("@hpcc-js/eclwatch Browser UMD compatibility - WUGraphLegend", () => {
    let eclwatchUMD;

    beforeAll(async () => {
        // Load dependencies in topological order
        await simpleRequire("@hpcc-js/util", "./node_modules/@hpcc-js/util/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/common", "./node_modules/@hpcc-js/common/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/api", "./node_modules/@hpcc-js/api/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/react", "./node_modules/@hpcc-js/react/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/html", "./node_modules/@hpcc-js/html/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/chart", "./node_modules/@hpcc-js/chart/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/comms", "./node_modules/@hpcc-js/comms/dist/browser/index.umd.cjs");
        await simpleRequire("@hpcc-js/dgrid", "./node_modules/@hpcc-js/dgrid/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/codemirror", "./node_modules/@hpcc-js/codemirror/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/phosphor", "./node_modules/@hpcc-js/phosphor/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/tree", "./node_modules/@hpcc-js/tree/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/graph", "./node_modules/@hpcc-js/graph/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/layout", "./node_modules/@hpcc-js/layout/dist/index.umd.cjs");
        await simpleRequire("@hpcc-js/timeline", "./node_modules/@hpcc-js/timeline/dist/index.umd.cjs");
        const module = await simpleRequire("@hpcc-js/eclwatch", "./node_modules/@hpcc-js/eclwatch/dist/index.umd.cjs");
        eclwatchUMD = module.default || module;
    });

    it("should successfully load the UMD package", () => {
        expect(eclwatchUMD).toBeDefined();
        expect(typeof eclwatchUMD).toBe("object");
        expect(Object.keys(eclwatchUMD).length).toBeGreaterThan(0);
    });

    it("should export WUGraphLegend class", () => {
        const { WUGraphLegend } = eclwatchUMD;
        expect(WUGraphLegend).toBeDefined();
        expect(typeof WUGraphLegend).toBe("function");
    });

    it("should be able to instantiate WUGraphLegend", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();
        expect(legend).toBeDefined();
        expect(typeof legend).toBe("object");
        expect(legend).toBeInstanceOf(WUGraphLegend);
    });

    it("should have the correct class identifier", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();
        expect(legend._class).toContain("eclwatch_WUGraphLegend");
    });

    it("should return empty disabled list by default", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();
        const disabled = legend.disabled();
        expect(Array.isArray(disabled)).toBe(true);
        expect(disabled.length).toBe(0);
    });

    it("should set and get disabled kinds", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();
        legend.disabled([1, 2, 3]);
        const disabled = legend.disabled();
        expect(disabled.length).toBe(3);
        expect(disabled.map(Number)).toEqual(expect.arrayContaining([1, 2, 3]));
    });

    it("should toggle a kind on and off", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();

        // Toggle on
        legend.toggle(42);
        let disabled = legend.disabled();
        expect(disabled.map(Number)).toContain(42);

        // Toggle off
        legend.toggle(42);
        disabled = legend.disabled();
        expect(disabled.map(Number)).not.toContain(42);
    });

    it("should clear disabled list when set to empty array", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();
        legend.disabled([10, 20]);
        legend.disabled([]);
        expect(legend.disabled().length).toBe(0);
    });

    it("should support method chaining on disabled setter", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();
        const result = legend.disabled([5]);
        expect(result).toBe(legend);
    });

    it("should expose click, mouseover, and mouseout event methods", () => {
        const { WUGraphLegend } = eclwatchUMD;
        const legend = new WUGraphLegend();
        expect(typeof legend.click).toBe("function");
        expect(typeof legend.mouseover).toBe("function");
        expect(typeof legend.mouseout).toBe("function");
    });
});
