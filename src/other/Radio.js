"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "css!./Radio"], factory);
    } else {
        root.other_Radio = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Radio(target) {
        HTMLWidget.call(this);
    }
    Radio.prototype = Object.create(HTMLWidget.prototype);
    Radio.prototype.constructor = Radio;
    Radio.prototype._class += " other_Radio";

    Radio.prototype.publish("label", null, "string", "Label for Radio");
    Radio.prototype.publish("valueColumn", null, "set", "Radio display value", function () { return this.columns(); }, { optional: true });
    Radio.prototype.publish("textColumn", null, "set", "Radio value(s)", function () { return this.columns(); }, { optional: true });
    Radio.prototype.publish("sort", null, "set", "Sort contents", ["", "ascending", "descending"], { optional: true });

    Radio.prototype.RadioData = function () {
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

    Radio.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._span = element.append("span");
        this._label = this._span.append("label")
            .attr("for", this.id() + "_Radio")
        ;
        this._Radio = this._span.append("div")
            .attr("id", this.id() + "_Radio");
    };

    Radio.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        this._label
            .text(this.label());
        d3.selectAll('#_w3_Radio label').remove();
        var RadioOptions = this._Radio.selectAll(".dataRow").data(this.RadioData());
        var label = RadioOptions.enter().append("label");
        label.attr("class", "dataRow Radio_label");
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
        var  Radio = label.append('input');
            Radio.attr("class", "Radio_input");
            Radio.attr("type","Radio")
                .attr("name", "tableRadioGroup")
                .attr("value", function (row) { return row.value; });

        RadioOptions.exit().remove();
        RadioOptions.order();
    };

    Radio.prototype.exit = function (domNode, element) {
        this._span.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Radio.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Radio;
}));
