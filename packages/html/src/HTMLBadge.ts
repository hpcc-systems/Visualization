import { HTMLWidget } from "@hpcc-js/common";

export class HTMLBadge extends HTMLWidget {
    protected _divElement;
    protected _iconElement;
    protected _labelElement;
    constructor() {
        super();
    }

    protected transformData() {
        return this.data();
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._divElement = element.append("div");
        this._iconElement = this._divElement.append("i");
        this._labelElement = this._divElement.append("span");
    }

    update(domNode, element) {
        super.update(domNode, element);
        const p = this.padding();
        const h = Math.max(this.iconFontSize(), this.labelFontSize());

        const labelWidth = this.textSize(this.label(), this.labelFontFamily(), this.labelFontSize(), this.labelFontWeight() === "bold").width;
        const iconWidth = this.textSize(this.icon(), this.iconFontFamily(), this.iconFontSize()).width;

        this._divElement
            .style("padding", this.padding() + "px")
            .style("margin", this.margin() + "px")
            .style("border", this.border())
            .style("border-radius", this.borderRadius() + "px")
            .style("background-color", this.backgroundColor())
            .style("float", this.float())
            .style("width", this.autoWidth() ? "auto" : this.fixedWidth_exists() ? this.fixedWidth() + "px" : `calc(100% - ${(this.padding() * 2) + (this.margin() * 2)}px)`)
            .style("position", "relative")
            ;
        this._iconElement
            .style("position", "absolute")
            .style("font-size", this.iconFontSize() + "px")
            .style("font-family", this.iconFontFamily())
            .style("color", this.iconFontColor())
            .style("margin-right", this.iconMarginRight() + "px")
            .style("font-style", "normal")
            .style("line-height", h + "px")
            .style("left", p + "px")
            .style("top", p + "px")
            .text(this.icon())
            ;
        this._labelElement
            .style("position", "absolute")
            .style("font-size", this.labelFontSize() + "px")
            .style("font-weight", this.labelFontWeight())
            .style("font-family", this.labelFontFamily())
            .style("color", this.labelFontColor())
            .style("left", iconWidth + p + this.iconMarginRight() + "px")
            .style("top", p + "px")
            .style("line-height", h + "px")
            .text(this.label())
            ;
        this._divElement
            .style("min-width", (p * 2) + iconWidth + labelWidth + this.iconMarginRight() + "px")
            .style("height", h + "px")
            ;
    }
    calcLabelWidth(): number {
        return this.textSize(this.label(), this.labelFontFamily(), this.labelFontSize(), this.labelFontWeight() === "bold").width;
    }
    calcIconWidth(): number {
        return this.textSize(this.icon(), this.iconFontFamily(), this.iconFontSize()).width;
    }
    calcBadgeWidth(): number {
        const labelWidth = this.calcLabelWidth();
        const iconWidth = this.calcIconWidth();
        if (this.fixedWidth_exists()) {
            return this.fixedWidth();
        }
        return iconWidth + labelWidth + this.iconMarginRight() + (this.padding() * 2);
    }
    calcBadgeHeight(): number {
        return Math.max(this.iconFontSize(), this.labelFontSize()) + (this.padding() * 2);
    }
}
HTMLBadge.prototype._class += " html_HTMLBadge";

export interface HTMLBadge {
    icon(): string;
    icon(_: string): this;
    label(): string;
    label(_: string): this;
    autoWidth(): boolean;
    autoWidth(_: boolean): this;
    padding(): number;
    padding(_: number): this;
    margin(): number;
    margin(_: number): this;
    border(): string;
    border(_: string): this;
    borderRadius(): number;
    borderRadius(_: number): this;
    backgroundColor(): string;
    backgroundColor(_: string): this;
    float(): string;
    float(_: string): this;
    iconFontSize(): number;
    iconFontSize(_: number): this;
    iconFontFamily(): string;
    iconFontFamily(_: string): this;
    iconFontColor(): string;
    iconFontColor(_: string): this;
    iconMarginRight(): number;
    iconMarginRight(_: number): this;
    fixedWidth(): number;
    fixedWidth(_: number): this;
    fixedWidth_exists(): boolean;
    labelFontSize(): number;
    labelFontSize(_: number): this;
    labelFontFamily(): string;
    labelFontFamily(_: string): this;
    labelFontColor(): string;
    labelFontColor(_: string): this;
    labelFontWeight(): string;
    labelFontWeight(_: string): this;
}
HTMLBadge.prototype.publish("label", "TMLEntity", "string", "Label text content");
HTMLBadge.prototype.publish("icon", "H", "string", "Icon text content");
HTMLBadge.prototype.publish("autoWidth", false, "boolean", "If true, width will be set to 'auto'. If false, the width is set to '100%'");
HTMLBadge.prototype.publish("labelFontColor", "#333", "html-color", "Label font color");
HTMLBadge.prototype.publish("labelFontFamily", "Verdana", "string", "Label font-family");
HTMLBadge.prototype.publish("labelFontSize", 12, "number", "Label font-size (pixels)");
HTMLBadge.prototype.publish("labelFontWeight", "normal", "set", "Label font-weight CSS style", ["bold", "normal"]);
HTMLBadge.prototype.publish("iconMarginRight", 8, "number", "Space between icon and label (pixels)");
HTMLBadge.prototype.publish("iconFontColor", "#333", "html-color", "Icon font color");
HTMLBadge.prototype.publish("iconFontFamily", "Verdana", "string", "Icon font-family");
HTMLBadge.prototype.publish("iconFontSize", 12, "number", "Icon font-size");
HTMLBadge.prototype.publish("float", "left", "string", "CSS float style of entity div");
HTMLBadge.prototype.publish("fixedWidth", null, "number", "If set, this defines the badge width (pixels)", undefined, {optional: true});
HTMLBadge.prototype.publish("backgroundColor", "#BBB", "html-color", "Background color of entity div");
HTMLBadge.prototype.publish("borderRadius", 2, "number", "CSS border-radius of entity div (pixels)");
HTMLBadge.prototype.publish("border", "1px solid black", "string", "CSS border style of entity div");
HTMLBadge.prototype.publish("margin", 2, "number", "Margin number of entity div (pixels)");
HTMLBadge.prototype.publish("padding", 2, "number", "Padding number of entity div (pixels)");
