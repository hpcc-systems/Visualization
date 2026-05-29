import { describe, it, expect, beforeAll } from "vitest";
import { loadScript } from "./util.js";

describe("@hpcc-js/eclwatch webpack UMD bundle - WUGraphLegend", () => {
    let eclwatchBundle: any;

    beforeAll(async () => {
        await loadScript("/eclwatch.bundle.js");
        eclwatchBundle = (window as any).HpccEclwatch;
    });

    it("should expose HpccEclwatch as a window global", () => {
        expect(eclwatchBundle).toBeDefined();
        expect(typeof eclwatchBundle).toBe("object");
    });

    it("should export WUGraphLegend", () => {
        const { WUGraphLegend } = eclwatchBundle;
        expect(WUGraphLegend).toBeDefined();
        expect(typeof WUGraphLegend).toBe("function");
    });

    it("should instantiate WUGraphLegend", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        expect(legend).toBeDefined();
        expect(legend).toBeInstanceOf(WUGraphLegend);
    });

    it("should have the eclwatch_WUGraphLegend class identifier", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        expect(legend._class).toContain("eclwatch_WUGraphLegend");
    });

    it("should return an empty disabled list by default", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        const disabled = legend.disabled();
        expect(Array.isArray(disabled)).toBe(true);
        expect(disabled.length).toBe(0);
    });

    it("should set and retrieve disabled kinds", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        legend.disabled([10, 20, 30]);
        const disabled = legend.disabled();
        expect(disabled.length).toBe(3);
        expect(disabled.map(Number)).toEqual(expect.arrayContaining([10, 20, 30]));
    });

    it("should toggle a kind on", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        legend.toggle(42);
        expect(legend.disabled().map(Number)).toContain(42);
    });

    it("should toggle a kind off after being enabled", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        legend.toggle(42);
        legend.toggle(42);
        expect(legend.disabled().map(Number)).not.toContain(42);
    });

    it("should support method chaining on disabled()", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        const returned = legend.disabled([1]);
        expect(returned).toBe(legend);
    });

    it("should expose click, mouseover, and mouseout event methods", () => {
        const { WUGraphLegend } = eclwatchBundle;
        const legend = new WUGraphLegend();
        expect(typeof legend.click).toBe("function");
        expect(typeof legend.mouseover).toBe("function");
        expect(typeof legend.mouseout).toBe("function");
    });

    it("should also export WUGraph and other eclwatch components", () => {
        const { WUGraph, WUResult, WUStatus } = eclwatchBundle;
        expect(typeof WUGraph).toBe("function");
        expect(typeof WUResult).toBe("function");
        expect(typeof WUStatus).toBe("function");
    });
});
