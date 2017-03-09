import { HTMLWidget } from "../common/HTMLWidget";
import { IInput } from "../api/IInput";

import "./Input.css";

export function Input() {
    HTMLWidget.call(this);
    IInput.call(this);

    this._tag = "div";
    this._inputElement = [];
    this._labelElement = [];
}
Input.prototype = Object.create(HTMLWidget.prototype);
Input.prototype.constructor = Input;
Input.prototype._class += " form_Input";
Input.prototype.implements(IInput.prototype);

Input.prototype.publish("type", "text", "set", "Input type", ["number", "button", "checkbox", "date", "text", "textarea", "search", "email", "time", "datetime", "hidden"]);
Input.prototype.publish("inlineLabel", null, "string", "Input Label", null, { optional: true });

Input.prototype.checked = function (_) {
    if (!arguments.length) return this._inputElement[0] ? this._inputElement[0].property("checked") : false;
    if (this._inputElement[0]) {
        this._inputElement[0].property("checked", _);
    }
    return this;
};

Input.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);

    this._labelElement[0] = element.append("label")
        .attr("for", this.id() + "_input")
        .style("visibility", this.inlineLabel_exists() ? "visible" : "hidden")
        ;

    var context = this;
    switch (this.type()) {
        case "button":
            this._inputElement[0] = element.append("button")
                .attr("id", this.id() + "_input")
                ;
            break;
        case "textarea":
            this._inputElement[0] = element.append("textarea")
                .attr("id", this.id() + "_input")
                ;
            break;
        default:
            this._inputElement[0] = element.append("input")
                .attr("id", this.id() + "_input")
                .attr("type", this.type())
                ;
            break;
    }

    this._inputElement.forEach(function (e, idx) {
        e.attr("name", context.name());
        e.on("click", function (w) {
            w.click(w);
        });
        e.on("blur", function (w) {
            w.blur(w);
        });
        e.on("change", function (w) {
            context.value([e.property("value")]);
            w.change(w);
        });
            e.on("keyup", function (w) {
                context.value([e.property("value")]);
                w.change(w);
            });
        });
    };

Input.prototype.update = function (domNode, element) {
    HTMLWidget.prototype.update.apply(this, arguments);

    this._labelElement[0]
        .style("visibility", this.inlineLabel_exists() ? "visible" : "hidden")
        .text(this.inlineLabel())
        ;
    switch (this.type()) {
        case "button":
            this._inputElement[0].text(this.value());
            break;
        case "textarea":
            this._inputElement[0].property("value", this.value());
            break;
        default:
            this._inputElement[0].attr("type", this.type());
            this._inputElement[0].property("value", this.value());
            break;
    }
};
