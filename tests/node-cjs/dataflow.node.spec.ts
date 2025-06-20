/* eslint-disable @typescript-eslint/no-require-imports */
import { describe, it, expect } from "vitest";

describe("@hpcc-js/dataflow CommonJS compatibility", () => {
    it("should successfully require the package", () => {
        const dataflow = require("@hpcc-js/dataflow");
        expect(dataflow).toBeDefined();
        expect(Object.keys(dataflow).length).toBeGreaterThan(0);
    });

    it("should export activity functions", () => {
        const dataflow = require("@hpcc-js/dataflow");
        expect(dataflow.map).toBeDefined();
        expect(dataflow.filter).toBeDefined();
        expect(dataflow.sort).toBeDefined();
        expect(dataflow.group).toBeDefined();
        expect(dataflow.join).toBeDefined();
        expect(typeof dataflow.map).toBe("function");
        expect(typeof dataflow.filter).toBe("function");
    });

    it("should export observer functions", () => {
        const dataflow = require("@hpcc-js/dataflow");
        expect(dataflow.count).toBeDefined();
        expect(dataflow.max).toBeDefined();
        expect(dataflow.min).toBeDefined();
        expect(dataflow.mean).toBeDefined();
        expect(dataflow.median).toBeDefined();
        expect(typeof dataflow.count).toBe("function");
        expect(typeof dataflow.max).toBe("function");
    });

    it("should export utility functions", () => {
        const dataflow = require("@hpcc-js/dataflow");
        expect(dataflow.pipe).toBeDefined();
        expect(dataflow.generate).toBeDefined();
        expect(typeof dataflow.pipe).toBe("function");
        expect(typeof dataflow.generate).toBe("function");
    });

    it("should export activity types", () => {
        const dataflow = require("@hpcc-js/dataflow");
        expect(dataflow.isSource).toBeDefined();
        expect(typeof dataflow.isSource).toBe("function");
    });

    it("should support destructuring require", () => {
        const { map, filter, count, pipe, isSource, scalar } = require("@hpcc-js/dataflow");

        expect(map).toBeDefined();
        expect(filter).toBeDefined();
        expect(count).toBeDefined();
        expect(pipe).toBeDefined();
        expect(isSource).toBeDefined();
        expect(scalar).toBeDefined();
    });

    it("should work with basic map operation", () => {
        const { map } = require("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5];
        const doubled = [...map(data, x => x * 2)];

        expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    it("should work with basic filter operation", () => {
        const { filter } = require("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5];
        const evens = [...filter(data, x => x % 2 === 0)];

        expect(evens).toEqual([2, 4]);
    });

    it("should work with basic count operation", () => {
        const { count, scalar } = require("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5];
        const result = scalar(count())(data);

        expect(result).toBe(5);
    });

    it("should work with basic pipe operation", () => {
        const { pipe, map, filter } = require("@hpcc-js/dataflow");

        const data = [1, 2, 3, 4, 5, 6];
        const pipeline = pipe(
            map(x => x * 2),
            filter(x => x > 5)
        );
        const result = [...pipeline(data)];

        expect(result).toEqual([6, 8, 10, 12]);
    });

    it("should work with isSource utility", () => {
        const { isSource } = require("@hpcc-js/dataflow");

        expect(isSource([1, 2, 3])).toBe(true);
        expect(isSource("string is iterable")).toBe(true); // Strings are iterable
        expect(isSource(42)).toBe(false);
        expect(isSource(null)).toBe(null); // Returns the falsy value itself
        expect(isSource(undefined)).toBe(undefined); // Returns the falsy value itself
        expect(isSource({})).toBe(false);
    });
});
