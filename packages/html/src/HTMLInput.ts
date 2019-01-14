import { IInput, ITooltip } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/HTMLInput.css";

export class HTMLInput extends HTMLWidget {

    _br;
    _span;
    _help;
    _reqSymbol;
    _input;
    _inputElement;
    constructor() {
        super();
        IInput.call(this);
        ITooltip.call(this);
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        // this._help = element.append("i")
        //     .classed("informational-tooltip", true)
        //     .on("mouseout.tooltip", this.tooltip.hide)
        //     .on("mousemove.tooltip", this.tooltip.show)
        //     ;
        this._span = element.append("span")
            ;
        this._input = element.append("input");

        this._span
            .style("font-size", this.fontSize() + "px")
            ;
    }
    update(domNode, element) {
        super.update(domNode, element);
        this._span
            .html(this.label() + `<i style="color:${this.requiredColor()};display:${this.required() ? "inline-block" : "none"}">*</i>`)
            ;
        // this._help
        //     .style("display", this.helpText_exists() ? "inline-block" : "none")
        //     .html(this.helpText_exists() ? "?" : "")
        //     ;
        this
            .tooltipHTML(d => {
                return this.helpText();
            })
            ;
        this._input
            .style("width", this.fixedWidth_exists() ? this.fixedWidth() + "px" : null)
            .style("min-width", this.minWidth() + "px")
            .style("min-height", this.minHeight() + "px")
            .style("padding-left", (this.gutter() - 1) + "px")
            .style("padding-right", (this.gutter() - 1) + "px")
            .style("padding-top", (this.gutter() * 2) + "px")
            ;
        if (this.widthPercentage_exists()) {
            element.style("width", "100%");
            this._input.style("width", `calc(100% - ${this.gutter() * 2}px)`);
        }
    }
    exit(domNode, element) {
        // super.exit(domNode, element);
    }

    //  IInput  ---
    name: { (): string; (_: string): HTMLInput };
    name_exists: () => boolean;
    label_exists: () => boolean;
    value: { (): any; (_: any): HTMLInput };
    value_exists: () => boolean;
    validate: { (): string; (_: string): HTMLInput };
    validate_exists: () => boolean;
    blur: (w) => void;
    click: (w) => void;
    dblclick: (w) => void;
    change: (w, complete?: boolean) => void;

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
}
HTMLInput.prototype._class += " html_HTMLInput";
HTMLInput.prototype.implements(IInput.prototype);
HTMLInput.prototype.implements(ITooltip.prototype);

export interface HTMLInput {
    gutter(): number;
    gutter(_: number): this;
    label(): string;
    label(_: string): this;
    minWidth(): number;
    minWidth(_: number): this;
    minHeight(): number;
    minHeight(_: number): this;
    fixedWidth(): number;
    fixedWidth(_: number): this;
    fixedWidth_exists(): boolean;
    widthPercentage(): number;
    widthPercentage(_: number): this;
    widthPercentage_exists(): boolean;
    fontSize(): number;
    fontSize(_: number): this;
    required(): boolean;
    required(_: boolean): this;
    helpText(): string;
    helpText(_: string): this;
    helpText_exists(): boolean;
    linebreak(): boolean;
    linebreak(_: boolean): this;
    requiredColor(): string;
    requiredColor(_: string): this;
}
HTMLInput.prototype.publish("linebreak", false, "boolean", "If true, a 'br' element will be inserted before this input");
HTMLInput.prototype.publish("helpText", "", "string", "Text to display in a tooltip when the label is hovered.", null, {optional: true});
HTMLInput.prototype.publish("required", false, "boolean", "If true, the input will indicate that it is required.");
HTMLInput.prototype.publish("gutter", 6, "number", "General purpose spacing variable (pixels)");
HTMLInput.prototype.publish("fixedWidth", null, "number", "Fixed width of input element (pixels)", null, {optional: true});
HTMLInput.prototype.publish("minWidth", 50, "number");
HTMLInput.prototype.publish("minHeight", 24, "number");
HTMLInput.prototype.publish("fontSize", 16, "number");
HTMLInput.prototype.publish("requiredColor", "red", "html-color", "Color that indicates required");
HTMLInput.prototype.publish("widthPercentage", null, "number", "Percentage of row width", null, {optional: true});
