import { HTMLWidget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

import "../src/FieldsetForm.css";

export class FieldsetForm extends HTMLWidget {
    _fieldset;
    _legend;
    _div;
    constructor() {
        super();
    }

    values() {
        return this.widgets().map(w => {
            return [w.label(), w.value()];
        });
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._fieldset = element.append("fieldset");
        this._div = this._fieldset.append("div");
        this._legend = this._fieldset.append("legend");
    }
    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        this._legend
            .style("display", this.label() ? "auto" : "none")
            .text(this.label())
            ;
        this._fieldset
            .style("padding", this.padding() + "px");
        const dataSelection = this._div.selectAll(".group-item").data(this.widgets(), w => w.id());

        const dataEnter = dataSelection
            .enter()
            .append("div")
            .classed("group-item", true)
            .each(function(w) {
                w.target(this);
            })
            ;
        let linebreakCount = 0;
        const dataUpdate = dataEnter
            .merge(dataSelection)
            .style("float", this.itemFloat())
            .style("margin", `${this.itemMargin()}px 0 0 ${this.itemMargin()}px`)
            .style("min-height", this.itemMinHeight())
            .style("min-width", this.itemMinWidth())
            .each(function(w, idx) {
                if (typeof w.linebreak === "function") {
                    if (w.linebreak()) {
                        if (!this.previousSibling || this.previousSibling.className !== "linebreak-div") {
                            const linebreakDiv = document.createElement("div");
                            linebreakDiv.className = "linebreak-div";
                            this.parentNode.insertBefore(linebreakDiv, this.parentNode.childNodes[idx + linebreakCount]);
                            linebreakCount++;
                        }
                    } else {
                        if (this.previousSibling) {
                            if (this.previousSibling.className === "linebreak-div") {
                                d3Select(this.previousSibling).remove();
                            }
                        }
                    }
                }
                if (typeof w.widthPercentage === "function" && w.widthPercentage_exists()) {
                    const widthOffset = (context.padding() * 2) + context.itemMargin();
                    d3Select(this)
                        .style("width", `calc(${w.widthPercentage()}% - ${widthOffset}px)`)
                        ;
                }
            })
            ;

        dataUpdate.exit()
            .each(w => w.target(null))
            .remove()
            ;
    }
    exit(domNode, element) {
        // super.exit(domNode, element);

    }
}
FieldsetForm.prototype._class += " html_FieldsetForm";

export interface FieldsetForm {
    padding(): number;
    padding(_: number): this;
    label(): string;
    label(_: string): this;
    itemFloat(): string;
    itemFloat(_: string): this;
    itemMargin(): number;
    itemMargin(_: number): this;
    itemMinHeight(): string;
    itemMinHeight(_: string): this;
    itemMinWidth(): string;
    itemMinWidth(_: string): this;
    widgets(): any;
    widgets(_: any): this;
}
FieldsetForm.prototype.publish("padding", 6, "number", "Padding around the fieldset (pixels)");
FieldsetForm.prototype.publish("widgets", [], "widgetArray");
FieldsetForm.prototype.publish("label", "", "string");
FieldsetForm.prototype.publish("itemMinWidth", "60px", "string");
FieldsetForm.prototype.publish("itemMinHeight", "20px", "string");
FieldsetForm.prototype.publish("itemMargin", 8, "number");
FieldsetForm.prototype.publish("itemFloat", "left", "string");
