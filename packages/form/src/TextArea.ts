import { Input } from "./Input";

export class TextArea extends Input {
    constructor() {
        super();

        this._tag = "div";
        this.type("textarea");
    }

    enter(domNode, element) {
        Input.prototype.enter.apply(this, arguments);
    }

    calcHeight() {
        return Math.max(this.minHeight_exists() ? this.minHeight() : 0, this.height());
    }

    update(domNode, element) {
        Input.prototype.update.apply(this, arguments);
        this._inputElement[0]
            .attr("rows", this.rows())
            .attr("cols", this.cols())
            .attr("wrap", this.wrap())
            .attr("spellcheck", this.spellcheck())
            .style("height", this.calcHeight() + "px")
            ;
    }

    rows: { (): number; (_: number): TextArea };
    rows_exists: () => boolean;
    cols: { (): number; (_: number): TextArea };
    cols_exists: () => boolean;
    wrap: { (): string; (_: string): TextArea };
    wrap_exists: () => boolean;
    minHeight: { (): number; (_: number): TextArea };
    minHeight_exists: () => boolean;
    spellcheck: { (): boolean; (_: boolean): TextArea };
    spellcheck_exists: () => boolean;
    value: { (): any; (_: any): TextArea };
}
TextArea.prototype._class += " form_TextArea";

TextArea.prototype.publish("rows", null, "number", "Rows", null, { optional: true });
TextArea.prototype.publish("cols", null, "number", "Columns", null, { optional: true });
TextArea.prototype.publish("wrap", "off", "set", "Wrap", ["off", "on"]);
TextArea.prototype.publish("minHeight", null, "number", "Minimum Height", null, { optional: true });
TextArea.prototype.publish("spellcheck", null, "boolean", "Input spell checking", { optional: true });
