import { textColor } from "./Palette";
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
                .colorFill_default(this._shape.colorFill_exists() ? textColor(this._shape.colorFill()) : undefined)
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

    text: { (): string; (_: string): TextBox; };
    shape_colorFill: { (): string; (_: string): TextBox; };
    shape_colorStroke: { (): string; (_: string): TextBox; };
    text_colorFill: { (): string; (_: string): TextBox; };
    paddingLeft: { (): number; (_: number): TextBox; };
    paddingRight: { (): number; (_: number): TextBox; };
    paddingTop: { (): number; (_: number): TextBox; };
    paddingBottom: { (): number; (_: number): TextBox; };
    anchor: { (): "start" | "middle" | "end"; (_: "start" | "middle" | "end"): TextBox; };
    fixedSize: { (): ISize; (_: ISize): TextBox; };
    tooltip: { (): string; (_: string): TextBox; };
}
TextBox.prototype._class += " common_TextBox";

TextBox.prototype.publishProxy("text", "_text");
TextBox.prototype.publishProxy("shape_colorStroke", "_shape", "colorStroke");
TextBox.prototype.publishProxy("shape_colorFill", "_shape", "colorFill");
TextBox.prototype.publishProxy("text_colorFill", "_text", "colorFill");
TextBox.prototype.publish("paddingLeft", 4, "number", "Left padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingRight", 4, "number", "Right padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingTop", 4, "number", "Top padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publish("paddingBottom", 4, "number", "Bottom padding (in pixels)", null, { tags: ["Private"] });
TextBox.prototype.publishProxy("anchor", "_text");
TextBox.prototype.publish("fixedSize", null);

TextBox.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
