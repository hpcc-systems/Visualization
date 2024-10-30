import { textColor } from "./Palette.ts";
import { Shape } from "./Shape.ts";
import { SVGWidget } from "./SVGWidget.ts";
import { Text } from "./Text.ts";
import { ISize } from "./Widget.ts";

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
        this._text = new Text()
            .on("click", () => {
                this.click();
            })
            .on("dblclick", () => {
                this.dblclick();
            })
            ;
    }

    padding(_) {
        this.paddingLeft(_);
        this.paddingRight(_);
        this.paddingTop(_);
        this.paddingBottom(_);
        return this;
    }

    getTextX(width) {
        switch (this.anchor()) {
            case "start":
                return -width / 2;
            case "end":
                return width / 2;
        }
        return 0;
    }

    getBBox(refresh = false, round = false) {
        const textBBox = this._text.getBBox(true);
        const width = this.fixedSize() ? this.fixedSize().width : textBBox.width + this.paddingLeft() + this.paddingRight();
        const height = this.fixedSize() ? this.fixedSize().height : textBBox.height + this.paddingTop() + this.paddingBottom();
        return {
            x: -width - 2,
            y: -height - 2,
            width,
            height
        };
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        delete this._prevHash;
        this._shape
            .target(domNode)
            .tooltip(this.tooltip())
            ;
        this._text
            .target(domNode)
            ;
    }

    _prevHash;
    update(domNode, element) {
        super.update(domNode, element);
        const hash = this.hashSum();
        if (this._prevHash !== hash) {
            this._prevHash = hash;

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

            this._text
                .x(this.getTextX(textBBox.width))
                .colorFill_default(this._shape.colorFill_exists() ? textColor(this._shape.colorFill()) : null)
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
            this._text.visible(textBBox.width <= size.width && textBBox.height <= size.height);
        }
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
}
TextBox.prototype._class += " common_TextBox";

export interface TextBox {
    text(): string;
    text(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    shape_colorFill(): string;
    shape_colorFill(_: string): this;
    shape_colorStroke(): string;
    shape_colorStroke(_: string): this;
    text_colorFill(): string;
    text_colorFill(_: string): this;
    text_fontFamily(): string;
    text_fontFamily(_: string): this;
    paddingLeft(): number;
    paddingLeft(_: number): this;
    paddingRight(): number;
    paddingRight(_: number): this;
    paddingTop(): number;
    paddingTop(_: number): this;
    paddingBottom(): number;
    paddingBottom(_: number): this;
    anchor(): "start" | "middle" | "end";
    anchor(_: "start" | "middle" | "end"): this;
    fixedSize(): ISize;
    fixedSize(_: ISize): this;
    tooltip(): string;
    tooltip(_: string): this;
}

TextBox.prototype.publishProxy("text", "_text");
TextBox.prototype.publishProxy("fontSize", "_text", "fontSize");
TextBox.prototype.publishProxy("shape_colorStroke", "_shape", "colorStroke");
TextBox.prototype.publishProxy("shape_colorFill", "_shape", "colorFill");
TextBox.prototype.publishProxy("text_colorFill", "_text", "colorFill");
TextBox.prototype.publishProxy("text_fontFamily", "_text", "fontFamily");
TextBox.prototype.publish("paddingLeft", 4, "number", "Left padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingRight", 4, "number", "Right padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingTop", 4, "number", "Top padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingBottom", 4, "number", "Bottom padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publishProxy("anchor", "_text");
TextBox.prototype.publish("fixedSize", null);

TextBox.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
