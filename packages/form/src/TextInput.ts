import { Input } from "./Input";

import "../src/TextInput.css";

export class TextInput extends Input {
    _inputHeight;
    _inputInnerHeight;
    _textMeasurement;
    constructor() {
        super();

        this._tag = "div";
        this.type("text");
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._inputInnerHeight = this.fontSize() + this.padding();
        this._inputHeight = this._inputInnerHeight + this.padding();

        element
            .style("font-size", this.fontSize() + "px")
            ;
        const p = this.padding();
        const context = this;
        this._textMeasurement = this.textSize(this.placeholder(), this.fontFamily(), this.fontSize());
        this._labelElement[0]
            .style("left", p + "px")
            .style("color", this.placeholderColor())
            ;
        if (this.value() === "") {
            this.maximizeLabel();
        } else {
            this.minimizeLabel();
        }
        this._inputElement[0]
            .attr("spellcheck", this.spellcheck())
            .style("height", this._inputInnerHeight + "px")
            .style("width", `calc(100% - ${(this.padding() * 2) + (this.borderWidth() * 2) + 2}px)`)
            .style("font-size", this.fontSize() + "px")
            .style("padding", `${p * 2}px ${p}px 0px ${p}px`)
            .on("blur", function() {
                if (this.value === "") {
                    context.maximizeLabel();
                } else {
                    context.minimizeLabel();
                }
                context.blur(context);
            })
            .on("keyup", function() {
                context.value(this.value);
                context.keyup(context);
            })
            .on("focus", function() {
                context.minimizeLabel();
                context.focus(context);
            })
            ;
        this._labelElement[0]
            .style("visibility", this.placeholder_exists() ? "visible" : "hidden")
            .text(this.placeholder())
            ;
    }
    minimizeLabel() {
        this._labelElement[0]
            .style("line-height", this.pinnedLabelSize() + "px")
            .style("font-size", this.pinnedLabelSize() + "px")
            .style("top", this.padding() + "px")
            ;
    }
    maximizeLabel() {
        this._labelElement[0]
            .style("line-height", this.fontSize() + "px")
            .style("font-size", this.fontSize() + "px")
            .style("top", `${this.padding() + (this._inputHeight / 2) - (this._textMeasurement.height / 2)}px`)
            ;
    }

    value: { (): any; (_: any): TextInput };
}
TextInput.prototype._class += " form_TextInput";

export interface TextInput {
    padding(): number;
    padding(_: number): this;
    placeholder(): string;
    placeholder(_: string): this;
    placeholder_exists(): boolean;
    placeholderColor(): string;
    placeholderColor(_: string): this;

    borderWidth(): number;
    borderWidth(_: number): this;
    fontSize(): number;
    fontSize(_: number): this;
    spellcheck(): boolean;
    spellcheck(_: boolean): this;
    pinnedLabelSize(): number;
    pinnedLabelSize(_: number): this;
    fontFamily(): string;
    fontFamily(_: string): this;

}

TextInput.prototype.publish("borderWidth", 1, "number", "Width of border (pixels)");
TextInput.prototype.publish("padding", 4, "number", "Padding size (pixels)");
TextInput.prototype.publish("placeholder", "", "string", "Placeholder/label for this input");
TextInput.prototype.publish("placeholderColor", "#777", "html-color", "Color of the label text");
TextInput.prototype.publish("fontSize", 18, "number", "Font size of value text (pixels)");
TextInput.prototype.publish("spellcheck", false, "boolean", "Input spell checking");
TextInput.prototype.publish("pinnedLabelSize", 10, "number", "Font size of pinned input label (label that displays while the input has content) (pixels)");
TextInput.prototype.publish("fontFamily", "Verdana", "string", "Font family");
