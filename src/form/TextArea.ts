import { Input } from "./Input";

export function TextArea() {
    Input.call(this);

    this._tag = "div";
    this.type("textarea");
}
TextArea.prototype = Object.create(Input.prototype);
TextArea.prototype.constructor = TextArea;
TextArea.prototype._class += " form_TextArea";

TextArea.prototype.publish("rows", null, "number", "Rows", null, { optional: true });
TextArea.prototype.publish("cols", null, "number", "Columns", null, { optional: true });
TextArea.prototype.publish("wrap", "off", "set", "Wrap", ["off", "on"]);
TextArea.prototype.publish("minHeight", null, "number", "Minimum Height", null, { optional: true });
TextArea.prototype.publish("spellcheck", null, "boolean", "Input spell checking", { optional: true });

TextArea.prototype.enter = function (domNode, element) {
    Input.prototype.enter.apply(this, arguments);
};

TextArea.prototype.calcHeight = function () {
    return Math.max(this.minHeight_exists() ? this.minHeight() : 0, this.height());
};

TextArea.prototype.update = function (domNode, element) {
    Input.prototype.update.apply(this, arguments);
    this._inputElement[0]
        .attr("rows", this.rows())
        .attr("cols", this.cols())
        .attr("wrap", this.wrap())
        .attr("spellcheck", this.spellcheck())
        .style("height", this.calcHeight() + "px")
        ;
};
