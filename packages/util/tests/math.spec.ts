import { degreesToRadians, normalize, normalizeDegrees, normalizeRadians, radiansToDegrees, cartesianToPolar, polarToCartesian } from "@hpcc-js/util";
import { describe, it, expect } from "vitest";

describe("math", function () {
    it("degreesToRadians", function () {
        expect(degreesToRadians(0)).to.equal(0);
        expect(degreesToRadians(180)).to.equal(Math.PI);
    });
    it("radiansToDegrees", function () {
        expect(radiansToDegrees(0)).to.equal(0);
        expect(radiansToDegrees(Math.PI)).to.equal(180);
    });
    it("polarToCartesian", function () {
        const result = polarToCartesian(0, 0);
        expect(result.x).to.equal(0);
        expect(result.y).to.equal(0);
    });
    it("cartesianToPolar", function () {
        const result = cartesianToPolar(0, 0);
        expect(result.r).to.equal(0);
        expect(result.theta).to.equal(0);
    });
    it("normalizeRadians", function () {
        expect(normalizeRadians(Math.PI * 10)).to.be.a("number");
        expect(normalizeRadians(1000, -100, 100)).to.equal(0);
    });
    it("normalizeDegrees", function () {
        expect(normalizeDegrees(1000)).to.equal(-80);
        expect(normalizeDegrees(0)).to.equal(0);
    });
    it("normalize", function () {
        expect(normalize(1000, 0, 365)).to.equal(270);
        expect(normalize(1000, -100, 100)).to.equal(0);
    });
});
