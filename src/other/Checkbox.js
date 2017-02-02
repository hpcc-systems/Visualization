"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "css!./Checkbox"], factory);
    } else {
        root.other_Checkbox = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Checkbox(target) {
        HTMLWidget.call(this);
    }
    Checkbox.prototype = Object.create(HTMLWidget.prototype);
    Checkbox.prototype.constructor = Checkbox;
    Checkbox.prototype._class += " other_Checkbox";

    Checkbox.prototype.publish("label", null, "string", "Label for Checkbox");
    Checkbox.prototype.publish("valueColumn", null, "set", "Checkbox display value", function () { return this.columns(); }, { optional: true });
    Checkbox.prototype.publish("textColumn", null, "set", "Checkbox value(s)", function () { return this.columns(); }, { optional: true });
    Checkbox.prototype.publish("sort", null, "set", "Sort contents", ["", "ascending", "descending"], { optional: true });

    Checkbox.prototype.checkboxData = function () {
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

    Checkbox.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._span = element.append("span");
        this._label = this._span.append("label")
            .attr("for", this.id() + "_checkbox")
        ;
        this._Checkbox = this._span.append("div")
            .attr("id", this.id() + "_checkbox");
    };

    Checkbox.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        this._label
            .text(this.label());
        d3.selectAll('#_w3_checkbox label').remove();
        var checkBoxOptions = this._Checkbox.selectAll(".dataRow").data(this.checkboxData());
        var label = checkBoxOptions.enter().append("label");
        label.attr("class", "dataRow checkbox_label");
        label.text(function(row){
            return row.text;
        }).on("change", function (selectedData) {
            var options = [];
            if (selectedData && selectedData.origRow) {
                options.push(selectedData.origRow);
            }

            if (options.length) {
                context.click(context.rowToObj(options[0]), context.valueColumn(), true);
            } else {
                context.click([], context.valueColumn(), false);
            }
        });
        var  checkbox = label.append('input');
            checkbox.attr("class", "checkbox_input");
            checkbox.attr("type","checkbox")
                .attr("name", "tableCheckboxGroup")
                .attr("value", function (row) { return row.value; });

        checkBoxOptions.exit().remove();
        checkBoxOptions.order();
    };

    Checkbox.prototype.exit = function (domNode, element) {
        this._span.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Checkbox.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Checkbox;
}));
