import { HTMLWidget } from "@hpcc-js/common";
import { HTMLBadge } from "./HTMLBadge";

export class HTMLBadgeGroup extends HTMLWidget {
    protected _fieldsetElement;
    protected _legendElement;
    protected _divElement;
    constructor() {
        super();
    }

    protected transformData() {
        return this.data();
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._fieldsetElement = element.append("fieldset")
            .style("width", "100%")
            ;
        this._legendElement = this._fieldsetElement.append("legend");
        this._divElement = this._fieldsetElement.append("div");
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        const p = this.padding();
        const m = this.margin();
        this._fieldsetElement
            .style("border", this.border())
            .style("margin", this.margin() + "px")
            .style("padding", this.padding() + "px")
            .style("position", "relative")
            .style("width", this.fixedWidth_exists() ? this.fixedWidth() + "px" : `calc(100% - ${p * 2 + m * 2}px)`)
            .style("height", this.fixedHeight_exists() ? this.fixedHeight() + "px" : null)
            ;
        this._legendElement
            .style("font-size", this.labelFontSize() + "px")
            .style("font-family", this.labelFontFamily())
            .style("color", this.labelFontColor())
            .style("font-weight", this.labelFontWeight())
            .text(this.label())
            .style("display", this.label() ? null : "none")
            ;
        const legendRect = this._legendElement.node().getBoundingClientRect();
        const divRect = this._divElement.node().getBoundingClientRect();
        const yOffset = legendRect.top.height === 0 ? 0 : divRect.top - legendRect.top;
        this._divElement
            .style("white-space", "nowrap")
            .style("width", this.fixedWidth_exists() ? this.fixedWidth() + "px" : `${this.width() - (p * 2 + m * 2)}px`)
            .style("height", this.fixedHeight_exists() ? `${this.fixedHeight() - yOffset}px` : null)
            .style("overflow-x", this.overflowX())
            .style("overflow-y", this.overflowY())
            ;
        const entitySelection = this._divElement.selectAll(".group-entity").data(this.data());
        const entityEnter = entitySelection.enter()
            .append("div")
            .attr("class", "group-entity")
            .each(function(d) {
                d.entity = new HTMLBadge().target(this as any);
            })
            ;
        let maxWidth = 0;
        const entityUpdate = entityEnter
            .merge(entitySelection)
            .each(function(d) {
                if (typeof d === "object") {
                    for (const param of Object.keys(d)) {
                        if (typeof d.entity[param] === "function") {
                            d.entity[param](d[param]);
                        } else {
                            if (d.entity)console.warn(param + " is not a function for " + d.entity._class);
                        }
                    }
                }
                if (context.iconFontFamily_exists() && !d["iconFontFamily"]) {
                    d.entity.iconFontFamily(context.iconFontFamily());
                }
                switch (context.layoutMode()) {
                    case "float-left":
                        this.style.display = "block";
                        d.entity.float("left").autoWidth(true);
                        break;
                    case "float-right":
                        this.style.display = "block";
                        d.entity.float("right").autoWidth(true);
                        break;
                    case "horizontal":
                        this.style.display = "inline-block";
                        d.entity.float("none").autoWidth(true);
                        break;
                    case "vertical":
                        this.style.display = "block";
                        d.entity.float("none").autoWidth(false);
                        break;
                    case "columns-lr":
                        this.style.display = "block";
                        d.entity.float("left").autoWidth(false);
                        break;
                }
                const badgeWidth = d.entity.calcBadgeWidth();
                if (badgeWidth > maxWidth) {
                    maxWidth = badgeWidth;
                }
            })
            .each(function(d) {
                switch (context.layoutMode()) {
                    case "columns-lr":
                        d.entity
                            .fixedWidth(context.fixedBadgeWidth_exists() ? context.fixedBadgeWidth() : maxWidth)
                            ;
                        break;
                }
                d.entity.render();
            })
            ;
        console.log("maxWidth", maxWidth);
        entityUpdate.exit()
            .each(function(d) {
                d.entity.target(null);
            })
            .remove()
            ;
    }
}
HTMLBadgeGroup.prototype._class += " html_HTMLBadgeGroup";

export interface HTMLBadgeGroup {
    label(): string;
    label(_: string): this;
    padding(): number;
    padding(_: number): this;
    margin(): number;
    margin(_: number): this;
    border(): string;
    border(_: string): this;
    labelFontColor(): string;
    labelFontColor(_: string): this;
    labelFontFamily(): string;
    labelFontFamily(_: string): this;
    labelFontSize(): string;
    labelFontSize(_: string): this;
    labelFontWeight(): string;
    labelFontWeight(_: string): this;
    layoutMode(): string;
    layoutMode(_: string): this;
    fixedWidth(): number;
    fixedWidth(_: number): this;
    fixedHeight(): number;
    fixedHeight(_: number): this;
    fixedWidth_exists(): boolean;
    fixedHeight_exists(): boolean;
    overflowX(): string;
    overflowX(_: string): this;
    overflowY(): string;
    overflowY(_: string): this;
    iconFontFamily(): string;
    iconFontFamily(_: string): this;
    iconFontFamily_exists(): boolean;
    fixedBadgeWidth(): number;
    fixedBadgeWidth(_: number): this;
    fixedBadgeWidth_exists(): boolean;
}
HTMLBadgeGroup.prototype.publish("labelFontColor", "#333", "html-color", "Label color");
HTMLBadgeGroup.prototype.publish("labelFontFamily", "Verdana", "string", "Label font-family");
HTMLBadgeGroup.prototype.publish("labelFontSize", 18, "number", "Label font-size (pixels)");
HTMLBadgeGroup.prototype.publish("labelFontWeight", "bold", "set", "Label font-weight CSS style", ["bold", "normal"]);
HTMLBadgeGroup.prototype.publish("iconFontFamily", null, "string", "Font family of badge icons", undefined, {optional: true});
HTMLBadgeGroup.prototype.publish("label", "", "string", "Label of the group, text content added to fieldset > legend");
HTMLBadgeGroup.prototype.publish("fixedWidth", null, "number", "Fixed width of group (pixels)", undefined, {optional: true});
HTMLBadgeGroup.prototype.publish("fixedHeight", null, "number", "Fixed height of group (pixels)", undefined, {optional: true});
HTMLBadgeGroup.prototype.publish("overflowX", "hidden", "set", "CSS overflow-x style", ["auto", "scroll", "hidden"]);
HTMLBadgeGroup.prototype.publish("overflowY", "hidden", "set", "CSS overflow-y style", ["auto", "scroll", "hidden"]);
HTMLBadgeGroup.prototype.publish("layoutMode", "float-left", "set", "Entity layout mode", ["float-left", "float-right", "horizontal", "vertical", "columns-lr"]);
HTMLBadgeGroup.prototype.publish("fixedBadgeWidth", null, "number", "If set, this defines the badge widths (pixels)", undefined, {optional: true});
HTMLBadgeGroup.prototype.publish("border", "0px solid black", "string", "CSS style of fieldset border");
HTMLBadgeGroup.prototype.publish("margin", 0, "number", "Margin of fieldset (pixels)");
HTMLBadgeGroup.prototype.publish("padding", 2, "number", "Padding within the group's div wrapper (pixels)");
