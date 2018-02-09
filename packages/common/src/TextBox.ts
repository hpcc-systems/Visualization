import { Shape } from "./Shape";
import { SVGWidget } from "./SVGWidget";
import { Text } from "./Text";
import { ISize } from "./Widget";

import "../src/TextBox.css";

export class TextBox extends SVGWidget {

    protected _shape: Shape;
    protected _text: Text;

    constructor() {
        super();

        this._shape = new Shape()
            .shape("rect")
            .on("click", () => {
                this.click();
            })
            .on("dblclick", () => {
                this.dblclick();
            })
            ;
        this._text = new Text();
    }

    padding(_) {
        this.paddingLeft(_);
        this.paddingRight(_);
        this.paddingTop(_);
        this.paddingBottom(_);
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._shape
            .target(domNode)
            .tooltip(this.tooltip())
            .render()
            ;
        this._text
            .target(element.append("g").node())
            .render()
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._text
            .render()
            ;
        const textBBox = this._text.getBBox(true);
        const size = {
            width: this.fixedSize() ? this.fixedSize().width : textBBox.width + this.paddingLeft() + this.paddingRight(),
            height: this.fixedSize() ? this.fixedSize().height : textBBox.height + this.paddingTop() + this.paddingBottom()
        };
        this._shape
            .width(size.width)
            .height(size.height)
            .render()
            ;
        if (this.fixedSize()) {
            switch (this.anchor()) {
                case "start":
                    this._text
                        .x(-this.fixedSize().width / 2 + textBBox.width / 2 + (this.paddingLeft() + this.paddingRight()) / 2)
                        .render()
                        ;
                    break;
                case "end":
                    this._text
                        .x(this.fixedSize().width / 2 - textBBox.width / 2 - (this.paddingLeft() + this.paddingRight()) / 2)
                        .render()
                        ;
                    break;
            }
        }
        const bbox = this._text.getBBox();
        this._text.visible(bbox.width <= size.width && bbox.height <= size.height);
    }

    exit(domNode, element) {
        this._shape
            .target(null)
            ;
        this._text
            .target(null)
            ;
        super.exit(domNode, element);
    }

    click() {
    }

    dblclick() {
    }

    text: { (): string; (_: string): TextBox; };
    shape_colorFill: { (): string; (_: string): TextBox; };
    shape_colorStroke: { (): string; (_: string): TextBox; };
    text_colorFill: { (): string; (_: string): TextBox; };
    anchor: { (): string; (_: string): TextBox; };
}
TextBox.prototype._class += " common_TextBox";

TextBox.prototype.publishProxy("text", "_text");
TextBox.prototype.publishProxy("shape_colorStroke", "_shape", "colorStroke");
TextBox.prototype.publishProxy("shape_colorFill", "_shape", "colorFill");
TextBox.prototype.publishProxy("text_colorFill", "_text", "colorFill");
TextBox.prototype.publishProxy("anchor", "_text");

export interface TextBox {
    paddingLeft(): number;
    paddingLeft(_: number): this;
    paddingRight(): number;
    paddingRight(_: number): this;
    paddingTop(): number;
    paddingTop(_: number): this;
    paddingBottom(): number;
    paddingBottom(_: number): this;
    fixedSize(): ISize;
    fixedSize(_: ISize): this;
    tooltip(): string;
    tooltip(_: string): this;
}
TextBox.prototype.publish("paddingLeft", 4, "number", "Padding:  Left", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingRight", 4, "number", "Padding:  Right", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingTop", 4, "number", "Padding:  Top", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingBottom", 4, "number", "Padding:  Bottom", null, { tags: ["Private"] });
TextBox.prototype.publish("fixedSize", null, "boolean");
TextBox.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
