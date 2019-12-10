import { HTMLWidget } from "@hpcc-js/common";

export class FlexInput extends HTMLWidget {
    protected _span;
    protected _input;
    protected _wrapper;
    constructor() {
        super();
    }

    collapseLabel() {
        this._span
            .style("font-size", this.collapsedFontSize() + "px")
            .style("top", (this.padding() / 4) + "px")
            .style("left", this.padding() + "px")
            ;
        this._input
            .style("padding", `${this.padding() * 2}px ${this.padding()}px ${this.padding() / 4}px ${this.padding()}px`)
            .style("font-size", this.fontSize() + "px")
            ;
    }

    uncollapseLabel() {
        this._span
            .style("font-size", this.fontSize() + "px")
            .style("top", this.padding() + "px")
            .style("left", this.padding() + "px")
            ;
        this._input
            .style("padding", `${this.padding()}px`)
            .style("font-size", this.fontSize() + "px")
            ;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._wrapper = element.append("div")
            .attr("class", "flex-input-wrapper")
            .style("position", "relative")
            ;
        this._input = element.append("input")
            .attr("class", "flex-input-input")
            .style("position", "absolute")
            .style("display", "inline-block")
            ;
        this._span = element.append("span")
            .attr("class", "flex-input-span")
            .style("position", "absolute")
            .style("display", "inline-block")
            ;
    }
    update(domNode, element) {
        super.update(domNode, element);

        const isCollapsed = this.lockCollapse() || this.collapsed() || this.value() !== "";

        if (isCollapsed) {
            this.collapseLabel();
        } else {
            this.uncollapseLabel();
        }

        this._span
            .style("font-family", this.fontSize() + "px")
            .style("transition", "all 400ms")
            .text(this.label())
            ;
        this._input
            .style("font-family", this.fontSize() + "px")
            .style("box-sizing", "border-box")
            .style("height", this.padding() + this.fontSize() + this.collapsedFontSize() + "px")
            ;
        this._input.property("value", this.value());

        this._input
            .on("focus", () => {
                this.collapseLabel();
            })
            .on("blur", () => {
                if (this._input.property("value") === "") {
                    this.uncollapseLabel();
                } else {
                    this.collapseLabel();
                }
            })
            .on("change", () => {
                this.value(this._input.property("value"));
                this.change(this);
            })
            .on("keyup", () => {
                this.value(this._input.property("value"));
                this.change(this);
            })
            ;

    }

    change(_: FlexInput) {}
}
FlexInput.prototype._class += " other_FlexInput";

export interface FlexInput {
    padding(): number;
    padding(_: number): this;
    label(): string;
    label(_: string): this;
    value(): string;
    value(_: string): this;
    lockCollapse(): boolean;
    lockCollapse(_: boolean): this;
    collapsed(): boolean;
    collapsed(_: boolean): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    collapsedFontSize(): number;
    collapsedFontSize(_: number): this;
}

FlexInput.prototype.publish("collapsedFontSize", 12, "number", "Size of collapsed font (pixels)");
FlexInput.prototype.publish("fontSize", 16, "number", "Size of font (pixels)");
FlexInput.prototype.publish("fontFamily", "Arial", "string", "Font family");
FlexInput.prototype.publish("padding", 8, "number", "padding");
FlexInput.prototype.publish("label", "", "string", "String label");
FlexInput.prototype.publish("value", "", "string", "String value");
FlexInput.prototype.publish("lockCollapse", false, "boolean", "Label is always collapsed");
FlexInput.prototype.publish("collapsed", false, "boolean", "Label is collapsed", null, {disable: w => w.lockCollapse()});
