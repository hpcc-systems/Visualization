import { describe, it, expect, beforeAll } from "vitest";
import { simpleRequire } from "./util.js";

describe("@hpcc-js/util Browser UMD compatibility", () => {
    let utilUMD;

    beforeAll(async () => {
        const module = await simpleRequire("@hpcc-js/util", "./node_modules/@hpcc-js/util/dist/index.umd.cjs");
        utilUMD = module.default || module;
    });

    it("should export Dictionary class", async () => {
        const { Dictionary } = utilUMD;
        expect(Dictionary).toBeDefined();

        const dict = new Dictionary();
        dict.set("test", "value");
        const result = dict.get("test");
        expect(result).toBe("value");
    });

    it("should export hashSum function", async () => {
        const { hashSum } = utilUMD;
        expect(hashSum).toBeDefined();

        const hash1 = hashSum("test");
        const hash2 = hashSum("test");
        expect(hash1).toBe(hash2);
        expect(typeof hash1).toBe("string");
    });

    it("should export SAXStackParser class", async () => {
        const { SAXStackParser } = utilUMD;
        expect(SAXStackParser).toBeDefined();

        const parser = new SAXStackParser();
        expect(typeof parser).toBe("object");
        expect(parser).toBeInstanceOf(SAXStackParser);
    });

    it("should export platform utilities", async () => {
        const { isBrowser, isNode } = utilUMD;
        expect(isBrowser).toBeDefined();
        expect(isNode).toBeDefined();
        expect(typeof isBrowser).toBe("boolean");
        expect(typeof isNode).toBe("boolean");

        expect(isBrowser).toBe(true);
        expect(isNode).toBe(false);
    });

    it("should support named imports", async () => {
        const { Dictionary, hashSum, SAXStackParser, isBrowser, isNode } = utilUMD;

        expect(Dictionary).toBeDefined();
        expect(hashSum).toBeDefined();
        expect(SAXStackParser).toBeDefined();
        expect(isBrowser).toBeDefined();
        expect(isNode).toBeDefined();

        const dict = new Dictionary();
        dict.set("esm-test", "works");
        expect(dict.get("esm-test")).toBe("works");

        const hash = hashSum("esm-test");
        expect(typeof hash).toBe("string");
    });

    it("should work in browser environment", async () => {
        expect(typeof window).toBe("object");
        expect(typeof document).toBe("object");

        const util = utilUMD;
        expect(util).toBeDefined();

        const { isBrowser, isNode } = util;
        expect(isBrowser).toBe(true);
        expect(isNode).toBe(false);
    });

    it("should handle DOM-related operations", async () => {
        const { Dictionary } = utilUMD;

        const dict = new Dictionary();
        dict.set("dom-test", document.title || "test");
        expect(dict.get("dom-test")).toBeDefined();

        dict.set("body-ref", document.body);
        expect(dict.get("body-ref")).toBe(document.body);
    });

    it("should have expected number of exports", async () => {
        const util = utilUMD;
        const exportKeys = Object.keys(util);
        expect(exportKeys.length).toBeGreaterThan(50);
    });
});
