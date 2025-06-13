// Test ESM imports for @hpcc-js/dataflow package in browser environment
import { describe, it, expect } from "vitest";

describe("@hpcc-js/dataflow Browser ESM compatibility", () => {
    it("should successfully import the package", async () => {
        const dataflow = await import("@hpcc-js/dataflow");
        expect(dataflow).toBeDefined();
        expect(Object.keys(dataflow).length).toBeGreaterThan(0);
    });

    it("should export activity functions", async () => {
        const { map, filter, sort, group, join } = await import("@hpcc-js/dataflow");
        expect(map).toBeDefined();
        expect(filter).toBeDefined();
        expect(sort).toBeDefined();
        expect(group).toBeDefined();
        expect(join).toBeDefined();
        expect(typeof map).toBe("function");
        expect(typeof filter).toBe("function");
    });

    it("should export observer functions", async () => {
        const { count, max, min, mean, median } = await import("@hpcc-js/dataflow");
        expect(count).toBeDefined();
        expect(max).toBeDefined();
        expect(min).toBeDefined();
        expect(mean).toBeDefined();
        expect(median).toBeDefined();
        expect(typeof count).toBe("function");
        expect(typeof max).toBe("function");
    });

    it("should export utility functions", async () => {
        const { pipe, generate } = await import("@hpcc-js/dataflow");
        expect(pipe).toBeDefined();
        expect(generate).toBeDefined();
        expect(typeof pipe).toBe("function");
        expect(typeof generate).toBe("function");
    });

    it("should export activity types", async () => {
        const { isSource } = await import("@hpcc-js/dataflow");
        expect(isSource).toBeDefined();
        expect(typeof isSource).toBe("function");
    });

    it("should support named imports", async () => {
        const { map, filter, count, pipe, isSource, scalar } = await import("@hpcc-js/dataflow");

        expect(map).toBeDefined();
        expect(filter).toBeDefined();
        expect(count).toBeDefined();
        expect(pipe).toBeDefined();
        expect(isSource).toBeDefined();
        expect(scalar).toBeDefined();
    });

    it("should work with basic map operation", async () => {
        const { map } = await import("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5];
        const doubled = [...map(data, x => x * 2)];

        expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    it("should work with basic filter operation", async () => {
        const { filter } = await import("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5];
        const evens = [...filter(data, x => x % 2 === 0)];

        expect(evens).toEqual([2, 4]);
    });

    it("should work with basic count operation", async () => {
        const { count, scalar } = await import("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5];
        const result = scalar(count())(data);

        expect(result).toBe(5);
    }); it("should work with basic pipe operation", async () => {
        const { pipe, map, filter, sort } = await import("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5, 6];
        const pipeline = pipe(
            filter(x => x % 2 === 0),
            map(x => x * x),
            sort((a, b) => b - a)
        );
        const result = [...pipeline(data)];

        expect(result).toEqual([36, 16, 4]);
    });

    it("should work with isSource utility", async () => {
        const { isSource } = await import("@hpcc-js/dataflow");

        expect(isSource([1, 2, 3])).toBe(true);
        expect(isSource("string is iterable")).toBe(true); // Strings are iterable
        expect(isSource(42)).toBe(false);
        expect(isSource(null)).toBe(null); // Returns the falsy value itself
        expect(isSource(undefined)).toBe(undefined); // Returns the falsy value itself
        expect(isSource({})).toBe(false);
    });

    it("should work with statistical observers", async () => {
        const { max, min, mean, scalar } = await import("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5];

        expect(scalar(max())(data)).toBe(5);
        expect(scalar(min())(data)).toBe(1);
        expect(scalar(mean())(data)).toBe(3);
    });

    it("should work with sort activity", async () => {
        const { sort } = await import("@hpcc-js/dataflow"); const data = [3, 1, 4, 1, 5, 9, 2, 6];
        const sorted = [...sort(data, (a, b) => a - b)];

        expect(sorted).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    it("should work with advanced pipeline operations", async () => {
        const { pipe, map, filter, sort } = await import("@hpcc-js/dataflow");

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
        // Browser-specific tests
        expect(typeof window).toBe("object");
        expect(typeof document).toBe("object");

        const dataflow = await import("@hpcc-js/dataflow");
        expect(dataflow).toBeDefined();

        // Test that dataflow operations work with browser data
        const { map, filter } = dataflow;
        const browserData = Array.from(document.querySelectorAll("*")).slice(0, 5).map((_, i) => i + 1);
        const processed = [...filter(map(browserData, x => x * 2), x => x > 2)];
        expect(processed).toEqual([4, 6, 8, 10]);
    });

    it("should handle browser-specific data processing", async () => {
        const { pipe, map, filter, count, scalar } = await import("@hpcc-js/dataflow");

        // Test processing DOM-related data
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
        const dataflow = await import("@hpcc-js/dataflow");
        const exportKeys = Object.keys(dataflow);
        expect(exportKeys.length).toBeGreaterThan(20); // Should have many exports
    });
});
