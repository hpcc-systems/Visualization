import { describe, it, expect, beforeAll } from "vitest";
import { simpleRequire } from "./util.js";

describe("@hpcc-js/dataflow Browser UMD compatibility", () => {
    let dataflowUMD;

    beforeAll(async () => {
        const module = await simpleRequire("@hpcc-js/dataflow", "./node_modules/@hpcc-js/dataflow/dist/index.umd.cjs");
        dataflowUMD = module.default || module;
    });

    it("should successfully load the UMD package", () => {
        expect(dataflowUMD).toBeDefined();
        expect(typeof dataflowUMD).toBe("object");
        expect(Object.keys(dataflowUMD).length).toBeGreaterThan(0);
    });

    it("should export activity functions", async () => {
        const { map, filter, sort, group, join } = dataflowUMD;
        expect(map).toBeDefined();
        expect(filter).toBeDefined();
        expect(sort).toBeDefined();
        expect(group).toBeDefined();
        expect(join).toBeDefined();
        expect(typeof map).toBe("function");
        expect(typeof filter).toBe("function");
    });

    it("should export observer functions", async () => {
        const { count, max, min, mean, median } = dataflowUMD;
        expect(count).toBeDefined();
        expect(max).toBeDefined();
        expect(min).toBeDefined();
        expect(mean).toBeDefined();
        expect(median).toBeDefined();
        expect(typeof count).toBe("function");
        expect(typeof max).toBe("function");
    });

    it("should export utility functions", async () => {
        const { pipe, generate } = dataflowUMD;
        expect(pipe).toBeDefined();
        expect(generate).toBeDefined();
        expect(typeof pipe).toBe("function");
        expect(typeof generate).toBe("function");
    });

    it("should export activity types", async () => {
        const { isSource } = dataflowUMD;
        expect(isSource).toBeDefined();
        expect(typeof isSource).toBe("function");
    });

    it("should support named imports", async () => {
        const { map, filter, count, pipe, isSource, scalar } = dataflowUMD;

        expect(map).toBeDefined();
        expect(filter).toBeDefined();
        expect(count).toBeDefined();
        expect(pipe).toBeDefined();
        expect(isSource).toBeDefined();
        expect(scalar).toBeDefined();
    });

    it("should work with basic map operation", async () => {
        const { map } = dataflowUMD;

        const data = [1, 2, 3, 4, 5];
        const doubled = [...map(data, x => x * 2)];

        expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    it("should work with basic filter operation", async () => {
        const { filter } = dataflowUMD;

        const data = [1, 2, 3, 4, 5];
        const evens = [...filter(data, x => x % 2 === 0)];

        expect(evens).toEqual([2, 4]);
    });

    it("should work with basic count operation", async () => {
        const { count, scalar } = dataflowUMD;

        const data = [1, 2, 3, 4, 5];
        const result = scalar(count())(data);

        expect(result).toBe(5);
    });

    it("should work with basic pipe operation", async () => {
        const { pipe, map, filter } = dataflowUMD;

        const data = [1, 2, 3, 4, 5, 6];
        const pipeline = pipe(
            map(x => x * 2),
            filter(x => x > 5)
        );
        const result = [...pipeline(data)];

        expect(result).toEqual([6, 8, 10, 12]);
    });

    it("should work with isSource utility", async () => {
        const { isSource } = dataflowUMD;

        expect(isSource([1, 2, 3])).toBe(true);
        expect(isSource("string is iterable")).toBe(true);
        expect(isSource(42)).toBe(false);
        expect(isSource(null)).toBe(null);
        expect(isSource(undefined)).toBe(undefined);
        expect(isSource({})).toBe(false);
    });

    it("should work with statistical observers", async () => {
        const { max, min, mean, scalar } = dataflowUMD;

        const data = [1, 2, 3, 4, 5];

        expect(scalar(max())(data)).toBe(5);
        expect(scalar(min())(data)).toBe(1);
        expect(scalar(mean())(data)).toBe(3);
    });

    it("should work with sort activity", async () => {
        const { sort } = dataflowUMD;

        const data = [3, 1, 4, 1, 5, 9, 2, 6];
        const sorted = [...sort(data)];

        expect(sorted).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    it("should work with advanced pipeline operations", async () => {
        const { pipe, map, filter, sort } = dataflowUMD;

        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const pipeline = pipe(
            filter(x => x % 2 === 0),
            map(x => x * x),
            sort((a, b) => b - a)
        );
        const result = [...pipeline(data)];

        expect(result).toEqual([100, 64, 36, 16, 4]);
    });

    it("should work in browser environment", async () => {
        expect(typeof window).toBe("object");
        expect(typeof document).toBe("object");

        const dataflow = dataflowUMD;
        expect(dataflow).toBeDefined();

        const { map, filter } = dataflow;
        const browserData = Array.from(document.querySelectorAll("*")).slice(0, 5).map((_, i) => i + 1);
        const processed = [...filter(map(browserData, x => x * 2), x => x > 2)];
        expect(processed).toEqual([4, 6, 8, 10]);
    });

    it("should handle browser-specific data processing", async () => {
        const { pipe, map, filter, count, scalar } = dataflowUMD;

        const bodyLength = document.body ? document.body.innerHTML.length : 100;
        const testData = Array.from({ length: 10 }, (_, i) => i + bodyLength);

        const pipeline = pipe(
            filter(x => x % 2 === 0),
            map(x => x / 2)
        );

        const processed = [...pipeline(testData)];
        const processedCount = scalar(count())(processed);

        expect(processedCount).toBeGreaterThan(0);
        expect(Array.isArray(processed)).toBe(true);
    });

    it("should have expected number of exports", async () => {
        const dataflow = dataflowUMD;
        const exportKeys = Object.keys(dataflow);
        expect(exportKeys.length).toBeGreaterThan(20);
    });
});
