import { HTMLWidget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

import "../src/Select.css";

export class Select extends HTMLWidget {
    _span;
    _label;
    _select;

    constructor() {
        super();
    }

    selectData() {
        const view = this._db.rollupView([this.textColumn(), this.valueColumn()]);
        let retVal = [];
        retVal = retVal.concat(view.entries().map(function (row) {
            return {
                text: row.key,
                value: row.values.length ? row.values[0].key : "",
                origRow: row.values.length && row.values[0].value.length ? row.values[0].value[0] : []
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
        if (this.optional()) {
            retVal.unshift({ value: "", text: "" });
        }
        return retVal;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._span = element.append("span");
        this._label = this._span.append("label")
            .attr("for", this.id() + "_select")
            ;

        const context = this;
        this._select = this._span.append("select")
            .attr("id", this.id() + "_select")
            .on("change", function (d) {
                const options = [];
                const options_dom_node = context._select.node().options;
                for (let i = 0; i < options_dom_node.length; ++i) {
                    const optionNode = options_dom_node[i];
                    if (optionNode.selected) {
                        options.push((d3Select(optionNode).datum() as any).origRow);
                    }
                }
                if (options.length) {
                    context.click(context.rowToObj(options[0]), context.valueColumn(), true); // TODO:  Multiselect not support in HIPIE
                } else {
                    context.click([], context.valueColumn(), false);
                }
            })
            ;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._label
            .text(this.label())
            ;
        this._select
            .attr("multiple", this.multiple() ? this.multiple() : null)
            .attr("size", this.multiple() && this.selectSize() ? this.selectSize() : null)
            ;

        const option = this._select.selectAll(".dataRow").data(this.selectData());
        const optionUpdate = option.enter().append("option")
            .attr("class", "dataRow")
            .merge(option)
            .attr("value", function (row) { return row.value; })
            .text(function (row) { return row.text; })
            ;
        option.exit().remove();
        optionUpdate.order();
    }

    exit(domNode, element) {
        this._span.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }
    label: { (): string; (_: string): Select };
    label_exists: () => boolean;
    valueColumn: { (): string; (_: string): Select };
    valueColumn_exists: () => boolean;
    textColumn: { (): string; (_: string): Select };
    textColumn_exists: () => boolean;
    optional: { (): boolean; (_: boolean): Select };
    optional_exists: () => boolean;
    sort: { (): string; (_: string): Select };
    sort_exists: () => boolean;
    multiple: { (): boolean; (_: boolean): Select };
    multiple_exists: () => boolean;
    selectSize: { (): number; (_: number): Select };
    selectSize_exists: () => boolean;
}
Select.prototype._class += " other_Select";

Select.prototype.publish("label", null, "string", "Label for select");
Select.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
Select.prototype.publish("textColumn", null, "set", "Select value(s)", function () { return this.columns(); }, { optional: true });
Select.prototype.publish("optional", true, "boolean", "Optional Select");
Select.prototype.publish("sort", null, "set", "Sort contents", ["", "ascending", "descending"], { optional: true });
Select.prototype.publish("multiple", false, "boolean", "Multiple selection");
Select.prototype.publish("selectSize", 5, "number", "Size of multiselect box", null, { disable: w => !w.multiple() });
