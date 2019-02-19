import { Icon, Palette, SVGWidget, Text } from "@hpcc-js/common";
import "d3-transition";

import "../src/Subgraph.css";

const TITLE_SIZE = 14;
const MINMAX_SIZE = 18;

export type SubgraphMinState = "normal" | "partial";

export class Subgraph extends SVGWidget {
    protected _border;
    protected _textWidget = new Text()
        .anchor("start")
        .fontSize(TITLE_SIZE)
        ;
    protected _buttonMin = new Icon()
        .diameter(MINMAX_SIZE)
        .shape_colorStroke("#1f77b4")
        .shape_colorFill("#dcf1ff")
        .image_colorFill("#1f77b4")
        .on("click", () => {
            this.minClick();
        }, true)
        .on("dblclick", () => {
        }, true)
        ;

    protected _minState: SubgraphMinState = "normal";

    constructor() {
        super();
    }

    minState(): SubgraphMinState;
    minState(_: SubgraphMinState): this;
    minState(_?: SubgraphMinState): SubgraphMinState | this {
        if (!arguments.length) return this._minState;
        this._minState = _;
        return this;
    }

    calcIcon() {
        switch (this._minState) {
            case "normal":
                return "\uf2d2";
            case "partial":
                return "\uf2d0";
        }
    }

    getBBox(refresh = false, round = false) {
        const width = this.width();
        const height = this.height();
        return {
            x: -width / 2,
            y: -height / 2 - TITLE_SIZE,
            width,
            height
        };
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._border = element.append("rect").attr("class", "border");
        this._textWidget.target(domNode);
        this._buttonMin.target(domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);

        const bbox = this.getBBox();

        this._border
            .attr("x", bbox.x)
            .attr("y", bbox.y)
            .attr("width", bbox.width)
            .attr("height", bbox.height)
            .style("fill", this.border_colorFill())
            .style("stroke", this.border_colorStroke())
            ;

        if (this.border_colorFill_exists() && !this.title_colorFill_exists()) {
            this.title_colorFill(Palette.textColor(this.border_colorFill()));
        }
        this._textWidget
            .pos({ x: bbox.x + 4, y: bbox.y + TITLE_SIZE })
            .width(this.width() - 8)
            .text(this.showTitle() ? this.title() : "")
            .render()
            ;

        this._buttonMin
            .visible(this.showMinMax())
            .pos({ x: bbox.x + bbox.width - (MINMAX_SIZE / 2 + 4), y: bbox.y + (MINMAX_SIZE / 2 + 4) })
            .faChar(this.calcIcon())
            .render()
            ;
    }

    exit(domNode, element) {
        this._buttonMin.target(null);
        this._textWidget.target(null);
        this._border.remove();
        super.exit(domNode, element);
    }

    intersection(pointA, pointB) {
        const hits = [];
        let nearest = null;
        hits.forEach(function (item) {
            if (nearest === null || nearest.d > item.d) {
                nearest = item;
            }
        });
        return nearest && nearest.i ? nearest.i : null;
    }

    click(d) {
        console.log("Clicked: " + d.id);
    }

    minClick() {
        switch (this._minState) {
            case "normal":
                this._minState = "partial";
                break;
            case "partial":
                this._minState = "normal";
                break;
        }
        this._buttonMin
            .faChar(this.calcIcon())  // max:f2d0, restore: f2d2, min: f2d1
            .render()
            ;
    }
}
Subgraph.prototype._class += " graph_Subgraph";

export interface Subgraph {
    border_colorStroke(): string;
    border_colorStroke(_: string): this;
    border_colorFill(): string;
    border_colorFill(_: string): this;
    border_colorFill_exists: () => boolean;
    showTitle(): boolean;
    showTitle(_: boolean): this;
    title(): string;
    title(_: string): this;
    titleFontSize(): string;
    titleFontSize(_: string): this;
    title_colorFill(): string;
    title_colorFill(_: string): this;
    title_colorFill_exists: () => boolean;
    showMinMax(): boolean;
    showMinMax(_: boolean): this;
}

Subgraph.prototype.publish("border_colorStroke", null, "html-color", "Stroke Color", null, { optional: true });
Subgraph.prototype.publish("border_colorFill", null, "html-color", "Fill Color", null, { optional: true });
Subgraph.prototype.publish("showTitle", true, "boolean", "Show Title", null, { tags: ["Basic"] });
Subgraph.prototype.publish("title", "", "string", "Title", null, { tags: ["Basic"] });
Subgraph.prototype.publishProxy("titleFontSize", "_textWidget", "fontSize");
Subgraph.prototype.publishProxy("title_colorFill", "_textWidget", "colorFill");
Subgraph.prototype.publish("showMinMax", false, "boolean", "Show Min/Max", null, { tags: ["Basic"] });
