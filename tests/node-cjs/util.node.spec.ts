/* eslint-disable @typescript-eslint/no-require-imports */
import { describe, it, expect } from "vitest";

describe("@hpcc-js/util CommonJS compatibility", () => {
    it("should successfully require the package", () => {
        const util = require("@hpcc-js/util");
        expect(util).toBeDefined();
        expect(Object.keys(util).length).toBeGreaterThan(0);
    });

    it("should export Dictionary class", () => {
        const util = require("@hpcc-js/util");
        expect(util.Dictionary).toBeDefined();

        const dict = new util.Dictionary();
        dict.set("test", "value");
        const result = dict.get("test");
        expect(result).toBe("value");
    });

    it("should export hashSum function", () => {
        const util = require("@hpcc-js/util");
        expect(util.hashSum).toBeDefined();

        const hash1 = util.hashSum("test");
        const hash2 = util.hashSum("test");
        expect(hash1).toBe(hash2);
        expect(typeof hash1).toBe("string");
    });

    it("should export SAXStackParser class", () => {
        const util = require("@hpcc-js/util");
        expect(util.SAXStackParser).toBeDefined();

        const parser = new util.SAXStackParser();
        expect(typeof parser).toBe("object");
        expect(parser).toBeInstanceOf(util.SAXStackParser);
    });

    it("should export platform utilities", () => {
        const util = require("@hpcc-js/util");
        expect(util.isNode).toBeDefined();
        expect(typeof util.isNode).toBe("boolean");
    });

    it("should support destructuring require", () => {
        const { Dictionary, hashSum, SAXStackParser, isNode } = require("@hpcc-js/util");

        expect(Dictionary).toBeDefined();
        expect(hashSum).toBeDefined();
        expect(SAXStackParser).toBeDefined();
        expect(isNode).toBeDefined();

        const dict = new Dictionary();
        dict.set("cjs-test", "works");
        expect(dict.get("cjs-test")).toBe("works");

        const hash = hashSum("cjs-test");
        expect(typeof hash).toBe("string");
    });

    it("should have expected number of exports", () => {
        const util = require("@hpcc-js/util");
        const exportKeys = Object.keys(util);
        expect(exportKeys.length).toBeGreaterThan(50);
    });
});
