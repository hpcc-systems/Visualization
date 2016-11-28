import * as d3 from "d3";
import { HTMLWidget } from "../common/HTMLWidget";
import "css!./RadioCheckbox";

export function RadioCheckbox(target) {
    HTMLWidget.call(this);
}
RadioCheckbox.prototype = Object.create(HTMLWidget.prototype);
RadioCheckbox.prototype.constructor = RadioCheckbox;
RadioCheckbox.prototype._class += " other_RadioCheckbox";

RadioCheckbox.prototype.publish("label", null, "string", "Label for RadioCheckbox");
RadioCheckbox.prototype.publish("valueColumn", null, "set", "RadioCheckbox display value", function () { return this.columns(); }, { optional: true });
RadioCheckbox.prototype.publish("textColumn", null, "set", "RadioCheckbox value(s)", function () { return this.columns(); }, { optional: true });
RadioCheckbox.prototype.publish("sort", null, "set", "Sort contents", ["", "ascending", "descending"], { optional: true });
RadioCheckbox.prototype.publish("multiple", false, "boolean", "Multiple selection");

RadioCheckbox.prototype.rcData = function () {
    var view = this._db.rollupView([this.textColumn(), this.valueColumn()]);
    var retVal = [];
    retVal = retVal.concat(view.entries().map(function (row) {
        return {
            text: row.key,
            value: row.values.length ? row.values[0].key : "",
            origRow: row.values.length && row.values[0].values.length ? row.values[0].values[0] : []
        };
    }, this));
    if (this.sort_exists()) {
        var descending = this.sort() === "descending";
        retVal.sort(function (l, r) {
            if (l.text < r.text) return descending ? 1 : -1;
            if (l.text > r.text) return descending ? -1 : 1;
            return 0;
        });
    }
    return retVal;
};

RadioCheckbox.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
    this._span = element.append("span");
    this._label = this._span.append("label")
        .attr("for", this.id() + "_radioCheckbox")
        ;
    this._Checkbox = this._span.append("div")
        .attr("id", this.id() + "_radioCheckbox");
};

RadioCheckbox.prototype.update = function (domNode, element) {
    HTMLWidget.prototype.update.apply(this, arguments);
    var context = this;
    this._label
        .text(this.label())
        ;
    var radioCheckbox = this._Checkbox.selectAll(".dataRow").data(this.rcData());
    radioCheckbox.enter().append("div")
        .attr("class", "dataRow")
        .each(function (row, idx) {
            var checkboxDiv = d3.select(this);
            var id = context.id() + "_checkbox_" + idx;
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
            var rcDiv = d3.select(this);
            rcDiv.select("input")
                .attr("type", context.multiple() ? "checkbox" : "radio")
                .attr("value", row.value);
            rcDiv.select("label")
                .text(row.text);
        });
    radioCheckbox.exit().remove();
    radioCheckbox.order();
};

RadioCheckbox.prototype.exit = function (domNode, element) {
    this._span.remove();
    HTMLWidget.prototype.exit.apply(this, arguments);
};

RadioCheckbox.prototype.handleClick = function () {
    var options = [];
    this._Checkbox.selectAll(".dataRow > input")
        .each(function (row, idx) {
            var input = d3.select(this);
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
};

RadioCheckbox.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
