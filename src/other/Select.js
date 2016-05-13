"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "css!./Select"], factory);
    } else {
        root.other_Select = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Select(target) {
        HTMLWidget.call(this);
    }
    Select.prototype = Object.create(HTMLWidget.prototype);
    Select.prototype.constructor = Select;
    Select.prototype._class += " other_Select";

    Select.prototype.publish("label", null, "string", "Label for select");
    Select.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
    Select.prototype.publish("textColumn", null, "set", "Select value(s)", function () { return this.columns(); }, { optional: true });
    Select.prototype.publish("multiple", false, "boolean", "Multiple selection");
    Select.prototype.publish("selectSize", 5, "number", "Size of multiselect box", null, { disable: function (w) { return !w.multiple(); } });

    Select.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._span = element.append("span");
        this._label = this._span.append("label")
            .attr("for", this.id() + "_select")
        ;

        var context = this;
        this._select = this._span.append("select")
            .attr("id", this.id() + "_select")
            .on("change", function (d) {
                var options = [];
                var options_dom_node = context._select.node().options;
                for (var i = 0; i < options_dom_node.length; ++i) {
                    var optionNode = options_dom_node[i];
                    if (optionNode.selected) {
                        options.push(optionNode.value);
                    }
                }
                context.click(options);
            })
        ;
    };

    Select.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._label
            .text(this.label())
        ;
        this._select
            .attr("multiple", this.multiple() ? this.multiple() : null)
            .attr("size", this.multiple() && this.selectSize() ? this.selectSize() : null)
        ;

        var option = this._select.selectAll(".dataRow").data(this.data());
        option.enter().append("option")
            .attr("class", "dataRow")
        ;
        var context = this;
        var columns = this.columns();
        option
            .attr("value", function (row) { return row[columns.indexOf(context.valueColumn())]; })
            .text(function (row) { return row[columns.indexOf(context.textColumn())]; })
        ;
        option.exit().remove();
    };

    Select.prototype.exit = function (domNode, element) {
        this._span.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Select.prototype.click = function (v) {
        console.log(v);
    };

    return Select;
}));
