// Test ESM imports for @hpcc-js/util package
import { describe, it, expect } from "vitest";

describe("@hpcc-js/util ESM compatibility", () => {
    it("should successfully import the package", async () => {
        const util = await import("@hpcc-js/util");
        expect(util).toBeDefined();
        expect(Object.keys(util).length).toBeGreaterThan(0);
    });

    it("should export Dictionary class", async () => {
        const { Dictionary } = await import("@hpcc-js/util");
        expect(Dictionary).toBeDefined();

        const dict = new Dictionary();
        dict.set("test", "value");
        const result = dict.get("test");
        expect(result).toBe("value");
    });

    it("should export hashSum function", async () => {
        const { hashSum } = await import("@hpcc-js/util");
        expect(hashSum).toBeDefined();

        const hash1 = hashSum("test");
        const hash2 = hashSum("test");
        expect(hash1).toBe(hash2);
        expect(typeof hash1).toBe("string");
    });

    it("should export SAXStackParser class", async () => {
        const { SAXStackParser } = await import("@hpcc-js/util");
        expect(SAXStackParser).toBeDefined();

        const parser = new SAXStackParser();
        expect(typeof parser).toBe("object");
        expect(parser).toBeInstanceOf(SAXStackParser);
    });

    it("should export platform utilities", async () => {
        const { isNode } = await import("@hpcc-js/util");
        expect(isNode).toBeDefined();
        expect(typeof isNode).toBe("boolean");
    });

    it("should support named imports", async () => {
        const { Dictionary, hashSum, SAXStackParser, isNode } = await import("@hpcc-js/util");

        expect(Dictionary).toBeDefined();
        expect(hashSum).toBeDefined();
        expect(SAXStackParser).toBeDefined();
        expect(isNode).toBeDefined();

        const dict = new Dictionary();
        dict.set("esm-test", "works");
        expect(dict.get("esm-test")).toBe("works");

        const hash = hashSum("esm-test");
        expect(typeof hash).toBe("string");
    });

    it("should have expected number of exports", async () => {
        const util = await import("@hpcc-js/util");
        const exportKeys = Object.keys(util);
        expect(exportKeys.length).toBeGreaterThan(50);
    });
});
