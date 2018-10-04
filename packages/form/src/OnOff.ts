import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/OnOff.css";

export class OnOff extends HTMLWidget {
    _inputElement = [];
    _input;

    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.classed("onoffswitch", true);
        const context = this;
        this._input = element.append("input")
            .attr("class", "onoffswitch-checkbox")
            .attr("type", "checkbox")
            .attr("id", this.id() + "_onOff")
            .on("click", function (w) {
                w.click(w);
            })
            .on("blur", function (w) {
                w.blur(w);
            })
            .on("change", function (w) {
                const vals = [];
                context._inputElement.forEach(function (d, idx) {
                    if (d.property("checked")) {
                        vals.push(d.property("value"));
                    }
                });
                context.value(vals);
                w.change(w, true);
            })
            ;
        const label = element.append("label")
            .attr("class", "onoffswitch-label")
            .attr("for", this.id() + "_onOff")
            ;
        const inner = label.append("div")
            .attr("class", "onoffswitch-inner")
            ;
        inner.append("div")
            .attr("class", "onoffswitch-offText")
            .style("padding-right", (this.containerRadius() / 2) + "px")
            .text(this.offText())
            ;
        inner.append("div")
            .attr("class", "onoffswitch-onText")
            .style("padding-left", (this.containerRadius() / 2) + "px")
            .style("width", `calc(100% - ${(this.containerRadius() / 2)}px)`)
            .text(this.onText())
            ;
        label.append("div")
            .attr("class", "onoffswitch-switch")
            ;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._input
            .attr("name", this.name())
            ;
        element
            .style("margin-left", this.marginLeft() + "px")
            .style("margin-bottom", this.marginBottom() + "px")
            .style("width", this.minWidth() + "px")
            ;

        const _switch_size = this.minHeight() - (this.gutter() * 4);

        element.select(".onoffswitch-switch")
            .style("height", _switch_size + "px")
            .style("width", _switch_size + "px")
            .style("top", (this.gutter() * 2) + 1 + "px")
            .style("border-radius", this.switchRadius() + "px")
            ;
        element.select(".onoffswitch-inner")
            .style("min-height", this.minHeight() + "px")
            ;
        element.select(".onoffswitch-label")
            .style("border-radius", this.containerRadius() + "px")
            ;
        element.select(".onoffswitch-offText")
            .style("color", this.offFontColor())
            .style("background-color", this.offColor())
            ;
        element.select(".onoffswitch-onText")
            .style("color", this.onFontColor())
            .style("background-color", this.onColor())
            ;
    }

    //  IInput  ---
    name: { (): string; (_: string): OnOff };
    name_exists: () => boolean;
    label: { (): string; (_: string): OnOff };
    label_exists: () => boolean;
    value: { (): any; (_: any): OnOff };
    value_exists: () => boolean;
    validate: { (): string; (_: string): OnOff };
    validate_exists: () => boolean;
}
OnOff.prototype._class += " form_OnOff";
export interface OnOff {
    marginLeft(): number;
    marginLeft(_: number): this;
    marginBottom(): number;
    marginBottom(_: number): this;
    minWidth(): number;
    minWidth(_: number): this;
    minHeight(): number;
    minHeight(_: number): this;
    gutter(): number;
    gutter(_: number): this;
    offText(): string;
    offText(_: string): this;
    onText(): string;
    onText(_: string): this;
    switchRadius(): number;
    switchRadius(_: number): this;
    containerRadius(): number;
    containerRadius(_: number): this;
    offColor(): string;
    offColor(_: string): this;
    onColor(): string;
    onColor(_: string): this;
    offFontColor(): string;
    offFontColor(_: string): this;
    onFontColor(): string;
    onFontColor(_: string): this;

}
OnOff.prototype.implements(IInput.prototype);

OnOff.prototype.publish("marginLeft", 0, "number", "Margin left of OnOff");
OnOff.prototype.publish("marginBottom", 0, "number", "Margin bottom of OnOff");
OnOff.prototype.publish("minWidth", 100, "number", "Minimum width of OnOff (pixels)");
OnOff.prototype.publish("minHeight", 20, "number", "Minimum height of OnOff (pixels)");
OnOff.prototype.publish("gutter", 1, "number", "Space between switch and border of OnOff (pixels)");
OnOff.prototype.publish("onText", "Save", "string", "Text to display when 'ON'");
OnOff.prototype.publish("offText", "Properties", "string", "Text to display when 'OFF'");
OnOff.prototype.publish("switchRadius", 10, "number", "Border radius of switch (pixels)");
OnOff.prototype.publish("containerRadius", 10, "number", "Border radius of OnOff (pixels)");
OnOff.prototype.publish("onColor", "#2ecc71", "html-color", "Background color when 'ON'");
OnOff.prototype.publish("offColor", "#ecf0f1", "html-color", "Background color when 'OFF'");
OnOff.prototype.publish("onFontColor", "#2c3e50", "html-color", "Font color when 'ON'");
OnOff.prototype.publish("offFontColor", "#7f8c8d", "html-color", "Font color when 'OFF'");
