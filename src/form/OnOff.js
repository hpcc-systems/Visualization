"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./OnOff"], factory);
    } else {
        root.form_OnOff = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function OnOff() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    OnOff.prototype = Object.create(HTMLWidget.prototype);
    OnOff.prototype.constructor = OnOff;
    OnOff.prototype._class += " form_OnOff";
    OnOff.prototype.implements(IInput.prototype);

    OnOff.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.classed("onoffswitch", true);
        var context = this;
        this._input = element.append("input")
            .attr("class", "onoffswitch-checkbox")
            .attr("type", "checkbox")
            .attr("id", this.id() + "_onOff")
            .on("click", function (w) {
                w.click(w);
            })
            .on("blur", function (w) {
                w.blur(w);
            })
            .on("change", function (w) {
                var vals = [];
                context._inputElement.forEach(function (d, idx) {
                    if (d.property("checked")) {
                        vals.push(d.property("value"));
                    }
                });
                context.value(vals);
                w.change(w);
            })
        ;
        var label = element.append("label")
            .attr("class", "onoffswitch-label")
            .attr("for", this.id() + "_onOff")
        ;
        label.append("span")
            .attr("class", "onoffswitch-inner")
        ;
        label.append("span")
            .attr("class", "onoffswitch-switch")
        ;
    };

    OnOff.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._input
            .attr("name", this.name())
        ;
    };

    return OnOff;
}));