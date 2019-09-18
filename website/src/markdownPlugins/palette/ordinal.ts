import { HTMLWidget, Palette, select as d3Select, SVGWidget } from "@hpcc-js/common";

class OrdinalColors extends SVGWidget {

    _pal;
    _colors;

    constructor(palID: string) {
        super();
        this._drawStartPos = "origin";
        this._pal = Palette.ordinal(palID);
        this._colors = this._pal.colors();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const swatches = element.selectAll(".swatch").data(this._colors);
        swatches.enter().append("rect")
            .attr("class", "swatch")
            .attr("x", (d, i) => i * 20)
            .attr("width", "20")
            .attr("height", "20")
            .style("fill", d => d)
            ;
    }
}

class RainbowColors extends SVGWidget {

    _pal;
    _colors;

    constructor(palID: string) {
        super();
        this._drawStartPos = "origin";
        this._pal = Palette.rainbow(palID);
        this._colors = this._pal.colors();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const swatches = element.selectAll(".swatch").data(this._colors);
        swatches.enter().append("rect")
            .attr("class", "swatch")
            .attr("x", (d, i) => i * 10)
            .attr("width", "10")
            .attr("height", "20")
            .style("fill", d => d)
            ;
    }
}

export class OrdinalSample extends HTMLWidget {

    _palettes = Palette.fetchOrdinalItem().map(d => ({ id: d, w: new OrdinalColors(d) }));

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element
            .style("overflow-y", "scroll")
            .style("height", `${this.height()}px`)
            ;

        const context = this;
        const palettes = element.selectAll(".palette").data(this._palettes);
        palettes.enter().append("div")
            .attr("class", "palette")
            .each(function (d) {
                const div = d3Select(this);
                div.append("b")
                    .text(d.id + ":")
                    ;
                const svgDiv = div.append("div")
                    .attr("id", (d, i) => context.id() + "_" + i)
                    .style("height", "20px")
                    ;
                div.append("br");
                d.w
                    .target(svgDiv.node())
                    .render();
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
    }
}

export class RainbowSample extends HTMLWidget {

    _palettes = Palette.fetchRainbowItem().map(d => ({ id: d, w: new RainbowColors(d) }));

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element
            .style("overflow-y", "scroll")
            .style("height", `${this.height()}px`)
            ;

        const context = this;
        const palettes = element.selectAll(".palette").data(this._palettes);
        palettes.enter().append("div")
            .attr("class", "palette")
            .each(function (d) {
                const div = d3Select(this);
                div.append("b")
                    .text(d.id + ":")
                    ;
                const svgDiv = div.append("div")
                    .attr("id", (d, i) => context.id() + "_" + i)
                    .style("height", "20px")
                    ;
                div.append("br");
                d.w
                    .target(svgDiv.node())
                    .render();
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
    }
}
