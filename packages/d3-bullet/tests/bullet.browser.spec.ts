import { select } from "d3-selection";
import { describe, expect, it } from "vitest";
import { bullet } from "../src/index.ts";

describe("bullet", () => {
    it("renders ranges, measures, markers, and an axis", async () => {
        const svg = select(document.body).append("svg");
        const group = svg.append("g").datum({
            ranges: [150, 225, 300],
            measures: [220, 270],
            markers: [250]
        });

        group.call(bullet().width(300).height(30));
        await new Promise(resolve => setTimeout(resolve, 300));

        expect(group.selectAll("rect.range").size()).toBe(3);
        expect(group.selectAll("rect.measure").size()).toBe(2);
        expect(group.selectAll("line.marker").size()).toBe(1);
        expect(group.selectAll("g.axis").size()).toBe(1);
        expect(Number(group.select("rect.range").attr("width"))).toBe(300);
        svg.remove();
    });
});
