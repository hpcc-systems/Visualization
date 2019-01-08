import { degreesToRadians, normalize, normalizeDegrees, normalizeRadians, radiansToDegrees } from "@hpcc-js/util";
import { expect } from "chai";

describe("math", function () {
    it("degreesToRadians", function () {
        expect(degreesToRadians(0)).to.equal(0);
        expect(degreesToRadians(360)).to.equal(0);
    });
    it("radiansToDegrees", function () {
        expect(radiansToDegrees(0)).to.equal(0);
        expect(radiansToDegrees(Math.PI)).to.equal(180);
    });
    it("normalizeRadians", function () {
        expect(normalizeRadians(Math.PI * 10)).to.be.a("number");
        expect(normalizeRadians(1000, -100, 100)).to.equal(0);
    });
    it("normalizeDegrees", function () {
        expect(normalizeDegrees(1000)).to.equal(270);
        expect(normalizeDegrees(0)).to.equal(0);
    });
    it("normalize", function () {
        expect(normalize(1000, 0, 365)).to.equal(270);
        expect(normalize(1000, -100, 100)).to.equal(0);
    });
});
