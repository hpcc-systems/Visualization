import { HTMLWidget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

import "../src/FlexGrid.css";

export class FlexGrid extends HTMLWidget {
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        d3Select(domNode.parentNode)
            .style("height", "100%")
            .style("width", "100%")
            ;
    }
    update(domNode, element) {
        super.update(domNode, element);
        const context = this;

        const cachedSizes = [];
        this.updateFlexParent(element);
        const listItems = element.selectAll(".FlexGrid-list-item").data(this.widgets(), w => w.id());
        listItems.enter()
            .append("div")
            .classed("FlexGrid-list-item", true)
            .each(function(w) {
                w.target(this);
            })
            .merge(listItems)
            .style("min-height", this.itemMinHeight() + "px")
            .style("min-width", this.itemMinWidth() + "px")
            .style("flex-basis", (n, i) => {
                const flexBasis = this.widgetsFlexBasis()[i];
                return typeof flexBasis !== "undefined" ? flexBasis : this.flexBasis();
            })
            .style("flex-grow", (n, i) => {
                const flexGrow = this.widgetsFlexGrow()[i];
                return typeof flexGrow !== "undefined" ? flexGrow : this.flexGrow();
            })
            .style("border-width", this.borderWidth() + "px")
            .style("border-color", this.itemBorderColor())
            .each(function() {
                this.firstChild.style.display = "none";
            })
            .each(function() {
                const rect = this.getBoundingClientRect();
                cachedSizes.push([
                    rect.width,
                    rect.height
                ]);
            })
            .each(function(w, i) {
                this.firstChild.style.display = "block";
                w.resize({
                    width: cachedSizes[i][0] - (2 * context.borderWidth()),
                    height: cachedSizes[i][1] - (2 * context.borderWidth())
                });
            })
            ;
        listItems.exit()
            .each(function(w) {
                w.target(null);
            })
            .remove()
            ;
    }
    exit(domNode, element) {
        super.exit(domNode, element);
    }
    updateFlexParent(element) {
        element
            .style("height", "100%")
            .style("flex-direction", this.orientation() === "horizontal" ? "row" : "column")
            .style("flex-wrap", this.flexWrap())
            .style("align-items", this.alignItems())
            .style("align-content", this.alignContent())
            .style("overflow-x", () => {
                if (this.orientation() === "horizontal" && this.flexWrap() === "nowrap" && !this.disableScroll()) {
                    return "scroll";
                }
                return "hidden";
            })
            .style("overflow-y", () => {
                if (this.orientation() === "vertical" && this.flexWrap() === "nowrap" && !this.disableScroll()) {
                    return "scroll";
                }
                return "hidden";
            })
            ;
    }
}
FlexGrid.prototype._class += " layout_FlexGrid";

export interface FlexGrid {
    widgets(): any;
    widgets(_: any): this;
    orientation(): "horizontal" | "vertical";
    orientation(_: "horizontal" | "vertical"): this;
    flexWrap(): "nowrap" | "wrap" | "wrap-reverse";
    flexWrap(_: "nowrap" | "wrap" | "wrap-reverse"): this;
    itemMinHeight(): number;
    itemMinHeight(_: number): this;
    itemMinWidth(): number;
    itemMinWidth(_: number): this;
    alignItems(): "flex-start" | "center" | "flex-end" | "stretch";
    alignItems(_: "flex-start" | "center" | "flex-end" | "stretch"): this;
    alignContent(): "flex-start" | "center" | "flex-end" | "stretch" | "space-between" | "space-around";
    alignContent(_: "flex-start" | "center" | "flex-end" | "stretch" | "space-between" | "space-around"): this;
    itemBorderColor(): string;
    itemBorderColor(_: string): this;
    borderWidth(): number;
    borderWidth(_: number): this;
    flexGrow(): number;
    flexGrow(_: number): this;
    widgetsFlexGrow(): number[];
    widgetsFlexGrow(_: number[]): this;
    flexBasis(): string;
    flexBasis(_: string): this;
    widgetsFlexBasis(): string[];
    widgetsFlexBasis(_: string[]): this;
    disableScroll(): boolean;
    disableScroll(_: boolean): this;

}

FlexGrid.prototype.publish("itemBorderColor", "transparent", "html-color", "Color of list item borders");
FlexGrid.prototype.publish("borderWidth", 0, "number", "Width of list item borders (pixels)");
FlexGrid.prototype.publish("orientation", "horizontal", "set", "Controls the flex-direction of the list items", ["horizontal", "vertical"]);
FlexGrid.prototype.publish("flexWrap", "wrap", "set", "Controls the line wrap when overflow occurs", ["nowrap", "wrap", "wrap-reverse"]);
FlexGrid.prototype.publish("disableScroll", false, "boolean", "If false, scrollbar will show (when flexWrap is set to 'nowrap')", null, {disable: (w: any) => w.flexWrap() !== "nowrap" });
FlexGrid.prototype.publish("itemMinHeight", 64, "number", "Minimum height of a list item (pixels)");
FlexGrid.prototype.publish("itemMinWidth", 64, "number", "Minimum width of a list item (pixels)");
FlexGrid.prototype.publish("alignItems", "stretch", "set", "Controls normal alignment of items", ["flex-start", "center", "flex-end", "stretch"]);
FlexGrid.prototype.publish("alignContent", "stretch", "set", "Controls normal alignment of item rows", ["flex-start", "center", "flex-end", "stretch", "space-between", "space-around"]);
FlexGrid.prototype.publish("flexGrow", 1, "number", "Default flex-grow style for all list items");
FlexGrid.prototype.publish("flexBasis", "10%", "string", "Default flex-basis style for all list items");
FlexGrid.prototype.publish("widgetsFlexGrow", [], "array", "Array of flex-grow values keyed on the widgets array");
FlexGrid.prototype.publish("widgetsFlexBasis", [], "array", "Array of flex-basis values keyed on the widgets array");
FlexGrid.prototype.publish("widgets", [], "widgetArray", "Array of widgets to be rendered as list items");
