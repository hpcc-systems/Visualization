import { Hsv, hsv, interpolateHsv, interpolateHsvLong } from "@hpcc-js/util";
import { describe, expect, it } from "vitest";

describe("hsv", function () {
    it("converts between RGB and HSV", function () {
        const color = hsv("#ff8000");
        expect(color.h).toBeCloseTo(30.117647, 4);
        expect(color.s).toBeCloseTo(1, 4);
        expect(color.v).toBeCloseTo(1, 4);
        expect(color.rgb().formatHex()).toBe("#ff8000");
    });

    it("creates brighter and darker colors", function () {
        const color = new Hsv(120, 0.5, 0.5);
        expect(color.brighter().v).toBeCloseTo(0.5 / 0.7);
        expect(color.darker().v).toBeCloseTo(0.5 * 0.7);
        expect(color.displayable()).toBe(true);
    });

    it("interpolates hue over the short and long paths", function () {
        expect(interpolateHsv("hsl(350, 100%, 50%)", "hsl(10, 100%, 50%)")(0.5)).toBe("rgb(255, 0, 0)");
        expect(interpolateHsvLong("hsl(350, 100%, 50%)", "hsl(10, 100%, 50%)")(0.5)).toBe("rgb(0, 255, 255)");
    });
});