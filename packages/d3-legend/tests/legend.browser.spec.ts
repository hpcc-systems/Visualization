import { scaleOrdinal } from "d3-scale";
import { select } from "d3-selection";
import { describe, expect, it, vi } from "vitest";
import { legendColor } from "../src/index.ts";

describe("legendColor", () => {
    it("renders ordinal cells and dispatches the clicked datum", () => {
        const svg = select(document.body).append("svg");
        const click = vi.fn();
        const legend = legendColor()
            .scale(scaleOrdinal(["Alpha", "Beta"], ["red", "blue"]))
            .shape("path", "M0,0L5,0L5,5Z")
            .labels(({ generatedLabels }) => generatedLabels.join(" / "))
            .on("cellclick", click);

        svg.call(legend);
        svg.select("g.cell").dispatch("click");

        expect(svg.selectAll("g.legendCells g.cell").size()).toBe(2);
        expect(svg.select("path.swatch").style("fill")).toBe("red");
        expect(click).toHaveBeenCalledWith("Alpha");
        svg.remove();
    });
});
