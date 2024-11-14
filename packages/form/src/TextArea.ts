import { Input } from "./Input.ts";

export class TextArea extends Input {
    constructor() {
        super();

        this._tag = "div";
        this.type("textarea");
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    calcHeight() {
        return Math.max(this.minHeight_exists() ? this.minHeight() : 0, this.height());
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._inputElement[0]
            .attr("rows", this.rows())
            .attr("cols", this.cols())
            .attr("wrap", this.wrap())
            .attr("spellcheck", this.spellcheck())
            .style("height", this.calcHeight() + "px")
            ;
    }

}
TextArea.prototype._class += " form_TextArea";

export interface TextArea {
    rows(): number;
    rows(_: number): this;
    rows_exists(): boolean;
    cols(): number;
    cols(_: number): this;
    cols_exists(): boolean;
    wrap(): string;
    wrap(_: string): this;
    wrap_exists(): boolean;
    minHeight(): number;
    minHeight(_: number): this;
    minHeight_exists(): boolean;
    spellcheck(): boolean;
    spellcheck(_: boolean): this;
    spellcheck_exists(): boolean;
}

TextArea.prototype.publish("rows", null, "number", "Rows", null, { optional: true });
TextArea.prototype.publish("cols", null, "number", "Columns", null, { optional: true });
TextArea.prototype.publish("wrap", "off", "set", "Wrap", ["off", "on"]);
TextArea.prototype.publish("minHeight", null, "number", "Minimum Height", null, { optional: true });
TextArea.prototype.publish("spellcheck", null, "boolean", "Input spell checking", { optional: true });
