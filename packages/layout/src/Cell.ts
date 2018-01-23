import { Widget } from "@hpcc-js/common";
import { select as d3Select, selectAll as d3SelectAll } from "d3-selection";
import { Surface } from "./Surface";

import "../src/Cell.css";

export class Cell extends Surface {
    _indicateTheseIds;

    constructor() {
        super();
        this._indicateTheseIds = [];
    }

    indicateTheseIds(): any[];
    indicateTheseIds(_: any[]): Cell;
    indicateTheseIds(_?: any[]): any[] | Cell {
        if (!arguments.length) return this._indicateTheseIds;
        this._indicateTheseIds = _;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const context = this;
        element
            .classed("layout_Surface", true)
            .on("mouseenter", function () { context.onMouseEnter(); })
            .on("mouseleave", function () { context.onMouseLeave(); })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
    }

    onMouseEnter() {
        const arr = this.indicateTheseIds();
        const opacity = this.indicatorOpacity();
        const indicatorBorderColor = this.indicatorBorderColor();
        const indicatorGlowColor = this.indicatorGlowColor();
        for (let i = 0; i < arr.length; i++) {
            const otherElement = d3Select("#" + arr[i]);
            const otherWidget: Widget = otherElement.datum() as Widget;
            if (otherElement && otherWidget) {
                otherElement.append("div")
                    .attr("class", "update-indicator")
                    .style("width", otherWidget.width() + "px")
                    .style("height", otherWidget.height() + "px")
                    .style("opacity", opacity)
                    .style("border-color", indicatorBorderColor)
                    .style("-webkit-box-shadow", "inset 0px 0px 30px 0px " + indicatorGlowColor)
                    .style("-moz-box-shadow", "inset 0px 0px 30px 0px " + indicatorGlowColor)
                    .style("box-shadow", "inset 0px 0px 30px 0px " + indicatorGlowColor)
                    ;
            }
        }
    }

    onMouseLeave() {
        const arr = this.indicateTheseIds();
        for (let i = 0; i < arr.length; i++) {
            d3SelectAll("#" + arr[i] + " > div.update-indicator").remove();
        }
    }
}
Cell.prototype._class += " layout_Cell";

export interface Cell {
    title(): string;
    title(_: string): this;
    gridRow(): number;
    gridRow(_: number): this;
    gridCol(): number;
    gridCol(_: number): this;
    gridRowSpan(): number;
    gridRowSpan(_: number): this;
    gridColSpan(): number;
    gridColSpan(_: number): this;
    indicatorGlowColor(): string;
    indicatorGlowColor(_: string): this;
    indicatorBorderColor(): string;
    indicatorBorderColor(_: string): this;
    indicatorOpacity(): number;
    indicatorOpacity(_: number): this;
    widget(): Widget;
    widget(_: Widget): this;
}
Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position", null, { tags: ["Private"] });
Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position", null, { tags: ["Private"] });
Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span", null, { tags: ["Private"] });
Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span", null, { tags: ["Private"] });
Cell.prototype.publish("indicatorGlowColor", "#EEEE11", "html-color", "Glow color of update-indicator", null, { tags: ["Basic"] });
Cell.prototype.publish("indicatorBorderColor", "#F48A00", "html-color", "Border color of update-indicator", null, { tags: ["Basic"] });
Cell.prototype.publish("indicatorOpacity", 0.8, "number", "Opacity of update-indicator", null, { tags: ["Basic"] });
