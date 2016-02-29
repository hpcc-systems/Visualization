"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input.css"], factory);
    } else {
        root.form_Button = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function Button() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    Button.prototype = Object.create(HTMLWidget.prototype);
    Button.prototype.constructor = Button;
    Button.prototype._class += " form_Button";
    Button.prototype.implements(IInput.prototype);

    Button.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        this._inputElement[0] = element.append("button")
            .attr("name", this.name())
            .on("click", function (w) {
                w.click(w);
            })
            .on("blur", function (w) {
                w.blur(w);
            })
            .on("change", function (w) {
                context.value([context._inputElement[0].property("value")]);
                w.change(w);
            })
        ;
    };

    Button.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._inputElement[0].text(this.value());
    };

    return Button;
}));