// Test ESM imports for @hpcc-js/util package in browser environment
import { describe, it, expect } from "vitest";

describe("@hpcc-js/util Browser ESM compatibility", () => {
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
        const { isBrowser, isNode } = await import("@hpcc-js/util");
        expect(isBrowser).toBeDefined();
        expect(isNode).toBeDefined();
        expect(typeof isBrowser).toBe("boolean");
        expect(typeof isNode).toBe("boolean");

        // In browser environment, these should have expected values
        expect(isBrowser).toBe(true);
        expect(isNode).toBe(false);
    });

    it("should support named imports", async () => {
        const { Dictionary, hashSum, SAXStackParser, isBrowser, isNode } = await import("@hpcc-js/util");

        expect(Dictionary).toBeDefined();
        expect(hashSum).toBeDefined();
        expect(SAXStackParser).toBeDefined();
        expect(isBrowser).toBeDefined();
        expect(isNode).toBeDefined();

        // Test that they work
        const dict = new Dictionary();
        dict.set("esm-test", "works");
        expect(dict.get("esm-test")).toBe("works");

        const hash = hashSum("esm-test");
        expect(typeof hash).toBe("string");
    });

    it("should work in browser environment", async () => {
        // Browser-specific tests
        expect(typeof window).toBe("object");
        expect(typeof document).toBe("object");

        const util = await import("@hpcc-js/util");
        expect(util).toBeDefined();

        // Test browser-specific utilities
        const { isBrowser, isNode } = util;
        expect(isBrowser).toBe(true);
        expect(isNode).toBe(false);
    });

    it("should handle DOM-related operations", async () => {
        const { Dictionary } = await import("@hpcc-js/util");

        // Test that util classes work with browser DOM
        const dict = new Dictionary();
        dict.set("dom-test", document.title || "test");
        expect(dict.get("dom-test")).toBeDefined();

        // Test that we can store DOM references
        dict.set("body-ref", document.body);
        expect(dict.get("body-ref")).toBe(document.body);
    });

    it("should have expected number of exports", async () => {
        const util = await import("@hpcc-js/util");
        const exportKeys = Object.keys(util);
        expect(exportKeys.length).toBeGreaterThan(50); // Should have many exports
    });
});
