import { HTMLWidget } from "../common/HTMLWidget";
import { IInput } from "../api/IInput";

import "./Input.css";

export function Button() {
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
