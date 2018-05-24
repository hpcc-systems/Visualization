import { Icon, SVGWidget, Text } from "@hpcc-js/common";
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
        super.enter.apply(this, arguments);
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
            ;

        this._textWidget
            .pos({ x: bbox.x + 4, y: bbox.y + TITLE_SIZE })
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

    exit(_domNode, _element) {
        super.exit.apply(this, arguments);
        this._border.remove();
        this._textWidget.target(null);
        this._buttonMin.target(null);
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

    showTitle: { (): boolean; (_: boolean): Subgraph; };
    title: { (): string; (_: string): Subgraph; };
    titleFontSize: { (): string; (_: string): Subgraph; };
    showMinMax: { (): boolean; (_: boolean): Subgraph; };
}
Subgraph.prototype._class += " graph_Subgraph";

Subgraph.prototype.publish("showTitle", true, "boolean", "Show Title", null, { tags: ["Basic"] });
Subgraph.prototype.publish("title", "", "string", "Title", null, { tags: ["Basic"] });
Subgraph.prototype.publishProxy("titleFontSize", "_textWidget", "fontSize");
Subgraph.prototype.publish("showMinMax", false, "boolean", "Show Min/Max", null, { tags: ["Basic"] });
