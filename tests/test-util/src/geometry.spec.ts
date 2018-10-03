import { expect } from "chai";

import { geometry } from "@hpcc-js/util";

describe("geometry", function () {
    it("degrees to radians", function () {
        expect(geometry.degreesToRadians(0)).to.equal(0);
    });
    it("radians to degrees", function () {
        expect(geometry.radiansToDegrees(0)).to.equal(0);
    });
    it("getPartialPieDimensions", function () {
        expect(geometry.getPartialPieDimensions(0, 0, 0)).to.equal({ width: 0, height: 0 });
        expect(geometry.getPartialPieDimensions(90, 180, 90)).to.equal({ width: 90, height: 90 });
    });
});
