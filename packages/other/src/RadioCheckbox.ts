import { HTMLWidget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

import "../src/RadioCheckbox.css";

export class RadioCheckbox extends HTMLWidget {
    _span;
    _label;
    _Checkbox;

    constructor() {
        super();
    }

    rcData() {
        if (this.data().length === 0) return [];
        const view = this._db.rollupView([this.textColumn(), this.valueColumn()]);
        let retVal = [];
        retVal = retVal.concat(view.entries().map(function (row) {
            return {
                text: row.key,
                value: row.values.length ? row.values[0].key : "",
                origRow: row.values.length && row.values[0].values.length ? row.values[0].values[0] : []
            };
        }, this));
        if (this.sort_exists()) {
            const descending = this.sort() === "descending";
            retVal.sort(function (l, r) {
                if (l.text < r.text) return descending ? 1 : -1;
                if (l.text > r.text) return descending ? -1 : 1;
                return 0;
            });
        }
        return retVal;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._span = element.append("span");
        this._label = this._span.append("label")
            .attr("for", this.id() + "_radioCheckbox")
            ;
        this._Checkbox = this._span.append("div")
            .attr("id", this.id() + "_radioCheckbox");
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        this._label
            .text(this.label())
            ;
        const radioCheckbox = this._Checkbox.selectAll(".dataRow").data(this.rcData());
        radioCheckbox.enter().append("div")
            .attr("class", "dataRow")
            .each(function (row, idx) {
                const checkboxDiv = d3Select(this);
                const id = context.id() + "_checkbox_" + idx;
                checkboxDiv.append("input")
                    .attr("id", id)
                    .attr("name", context.id() + "_radioCheckbox")
                    .on("change", function (selectedData) {
                        context.handleClick();
                    });
                checkboxDiv.append("label")
                    .attr("for", id);
            });
        radioCheckbox
            .each(function (row, idx) {
                const rcDiv = d3Select(this);
                rcDiv.select("input")
                    .attr("type", context.multiple() ? "checkbox" : "radio")
                    .attr("value", row.value);
                rcDiv.select("label")
                    .text(row.text);
            });
        radioCheckbox.exit().remove();
        radioCheckbox.order();
    }

    exit(domNode, element) {
        this._span.remove();
        super.exit(domNode, element);
    }

    handleClick() {
        const options = [];
        this._Checkbox.selectAll(".dataRow > input")
            .each(function (row, idx) {
                const input = d3Select(this);
                if (input.property("checked") && row && row.origRow) {
                    options.push(row.origRow);
                }
            });
        if (options.length) {
            //  TODO Handle Multiple Selections - part of 1.16.x
            this.click(this.rowToObj(options[0]), this.valueColumn(), true);
        } else {
            this.click([], this.valueColumn(), false);
        }
    }

    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    label: { (): string; (_: string): RadioCheckbox };
    label_exists: () => boolean;
    valueColumn: { (): string; (_: string): RadioCheckbox };
    valueColumn_exists: () => boolean;
    textColumn: { (): string; (_: string): RadioCheckbox };
    textColumn_exists: () => boolean;
    sort: { (): string; (_: string): RadioCheckbox };
    sort_exists: () => boolean;
    multiple: { (): boolean; (_: boolean): RadioCheckbox };
    multiple_exists: () => boolean;
}
RadioCheckbox.prototype._class += " other_RadioCheckbox";

RadioCheckbox.prototype.publish("label", null, "string", "Label for RadioCheckbox");
RadioCheckbox.prototype.publish("valueColumn", null, "set", "RadioCheckbox display value", function () { return this.columns(); }, { optional: true });
RadioCheckbox.prototype.publish("textColumn", null, "set", "RadioCheckbox value(s)", function () { return this.columns(); }, { optional: true });
RadioCheckbox.prototype.publish("sort", null, "set", "Sort contents", ["", "ascending", "descending"], { optional: true });
RadioCheckbox.prototype.publish("multiple", false, "boolean", "Multiple selection");
