import { HTMLInput } from "./HTMLInput";

export class StringInput extends HTMLInput {

    private _smallLabelMult: number;
    constructor() {
        super();
        this._smallLabelMult = 0.618;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        // TODO refactor IInput to use _input and _inputs rather than the _inputElement array?
        this._inputElement = [this._input];

        this.maximizePlaceholder();
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._span
            .style("position", "absolute")
            .style("left", this.gutter() + "px")
            .style("top", this.gutter() + "px")
            ;
        this._inputElement.forEach((e, idx) => {
            e.attr("name", this.name());
            e.on("click", w => {
                w.click(w);
            });
            e.on("focus", w => {
                this.minimizePlaceholder();
            });
            e.on("blur", w => {
                if (this._input.node().value === "") {
                    this.maximizePlaceholder();
                } else {
                    this.minimizePlaceholder();
                }
                w.blur(w);
            });
            e.on("change", w => {
                this.value(e.property("value"));
                w.change(w, true);
            });
        });
    }

    minimizePlaceholder() {
        this._span.transition()
            .style("font-size", (this.fontSize() * this._smallLabelMult) + "px")
            .style("line-height", (this.fontSize() * this._smallLabelMult) + "px")
            ;
    }
    maximizePlaceholder() {
        this._span.transition()
            .style("font-size", this.fontSize() + "px")
            .style("line-height", (this.minHeight() + this.gutter()) + "px")
            ;
    }
}
StringInput.prototype._class += " form_StringInput";
