import { select } from "d3-selection";
import { describe, expect, it } from "vitest";
import { annotation, annotationCalloutElbow } from "../src/index.ts";

describe("annotation", () => {
    it("renders an elbow callout using accessors", () => {
        const svg = select(document.body).append("svg");
        const generator = annotation()
            .type(annotationCalloutElbow)
            .annotations([{
                data: { x: 10, y: 20 },
                dx: 30,
                dy: 40,
                note: { label: "Value", align: "middle" }
            }])
            .accessors({ x: datum => datum.x, y: datum => datum.y });

        svg.call(generator);

        expect(svg.select("g.annotation").attr("transform")).toBe("translate(10,20)");
        expect(svg.select("path.connector").attr("d")).toBe("M0,0L30,30L30,40");
        expect(svg.select("text.annotation-note-label").text()).toBe("Value");
        svg.remove();
    });
});
