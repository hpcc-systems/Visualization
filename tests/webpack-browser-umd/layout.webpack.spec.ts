import { describe, it, expect, beforeAll } from "vitest";
import { loadScript } from "./util.js";

describe("@hpcc-js/layout webpack UMD bundle", () => {
    let layoutBundle: any;

    beforeAll(async () => {
        await loadScript("/layout.bundle.js");
        layoutBundle = (window as any).HpccLayout;
    });

    it("should expose HpccLayout as a window global", () => {
        expect(layoutBundle).toBeDefined();
        expect(typeof layoutBundle).toBe("object");
    });

    it("should export ChartPanel", () => {
        const { ChartPanel } = layoutBundle;
        expect(ChartPanel).toBeDefined();
        expect(typeof ChartPanel).toBe("function");
    });

    it("should instantiate ChartPanel", () => {
        const { ChartPanel } = layoutBundle;
        const panel = new ChartPanel();
        expect(panel).toBeDefined();
        expect(panel).toBeInstanceOf(ChartPanel);
    });

    it("should export Border and Border2", () => {
        const { Border, Border2 } = layoutBundle;
        expect(typeof Border).toBe("function");
        expect(typeof Border2).toBe("function");
    });

    it("should instantiate Border2", () => {
        const { Border2 } = layoutBundle;
        const b = new Border2();
        expect(b).toBeInstanceOf(Border2);
    });

    it("should export Legend", () => {
        const { Legend } = layoutBundle;
        expect(typeof Legend).toBe("function");
    });

    it("should export Grid", () => {
        const { Grid } = layoutBundle;
        expect(typeof Grid).toBe("function");
        const g = new Grid();
        expect(g).toBeInstanceOf(Grid);
    });

    it("should export Tabbed", () => {
        const { Tabbed } = layoutBundle;
        expect(typeof Tabbed).toBe("function");
        const t = new Tabbed();
        expect(t).toBeInstanceOf(Tabbed);
    });

    it("should export Surface", () => {
        const { Surface } = layoutBundle;
        expect(typeof Surface).toBe("function");
        const s = new Surface();
        expect(s).toBeInstanceOf(Surface);
    });

    it("should have multiple exports", () => {
        expect(Object.keys(layoutBundle).length).toBeGreaterThan(5);
    });
});
