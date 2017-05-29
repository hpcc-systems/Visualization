import { Widget } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { tip } from "d3-tip";

import "../src/ITooltip.css";

export class ITooltip extends Widget {
    protected _valueFormatter;
    layerEnter;
    layerUpdate;
    layerExit;
    tooltip;

    constructor() {
        super();

        this._valueFormatter = d3Format(this.tooltipValueFormat() as string);

        if (this.layerEnter) {
            const layerEnter = this.layerEnter;
            this.layerEnter = function (_base, svgElement, _domElement) {
                this.tooltipEnter(svgElement);
                layerEnter.apply(this, arguments);
            };
            const layerUpdate = this.layerUpdate;
            this.layerUpdate = function (_base) {
                layerUpdate.apply(this, arguments);
                this.tooltipUpdate();
            };
            const layerExit = this.layerExit;
            this.layerExit = function (_base) {
                layerExit.apply(this, arguments);
                this.tooltipExit();
            };
        } else {
            const enter = this.enter;
            this.enter = function (_domNode, element) {
                this.tooltipEnter(element);
                enter.apply(this, arguments);
            };
            const update = this.update;
            this.update = function (_domNode, _element) {
                update.apply(this, arguments);
                this.tooltipUpdate();
            };
            const exit = this.exit;
            this.exit = function (_domNode, _element) {
                exit.apply(this, arguments);
                this.tooltipExit();
            };
        }
    }

    tooltipEnter(element) {
        const context = this;
        this.tooltip = tip()
            .attr("class", "d3-tip")
            .offset(function () {
                switch (context.tooltip.direction()()) {
                    case "e":
                        return [0, context.tooltipOffset()];
                    default:
                        return [-context.tooltipOffset(), 0];
                }
            })
            ;
        element.call(this.tooltip);
    }

    tooltipUpdate() {
        let classed = this.tooltip.attr("class");
        classed = classed.split(" notick").join("") + (this.tooltipTick() ? "" : " notick") + (this.tooltipStyle() === "none" ? " hidden" : "");
        this.tooltip
            .attr("class", classed)
            ;
    }

    tooltipExit() {
        if (this.tooltip) {
            this.tooltip.destroy();
        }
    }

    _tooltipHTML(d) {
        return d;
    }

    tooltipHTML(_) {
        return this.tooltip.html(_);
    }

    tooltipFormat(opts) {
        opts = opts || {};
        opts.label = opts.label === undefined ? "" : opts.label;
        opts.series = opts.series || "";
        if (opts.value instanceof Date) {
            opts.value = opts.value || "";
        } else {
            opts.value = this._valueFormatter(opts.value) || "";
        }
        switch (this.tooltipStyle()) {
            case "none":
                break;
            default:
                if (opts.series) {
                    return "<span style='color:" + this.tooltipSeriesColor() + "'>" + opts.series + "</span> / <span style='color:" + this.tooltipLabelColor() + "'>" + opts.label + "</span>:  <span style='color:" + this.tooltipValueColor() + "'>" + opts.value + "</span>";
                }
                return "<span style='color:" + this.tooltipLabelColor() + "'>" + opts.label + "</span>:  <span style='color:" + this.tooltipValueColor() + "'>" + opts.value + "</span>";
        }
    }

    tooltipStyle: { (): string; (_: string): ITooltip; };
    tooltipValueFormat: (_?) => string | ITooltip;
    tooltipSeriesColor: { (): string; (_: string): ITooltip; };
    tooltipLabelColor: { (): string; (_: string): ITooltip; };
    tooltipValueColor: { (): string; (_: string): ITooltip; };
    tooltipTick: { (): boolean; (_: boolean): ITooltip; };
    tooltipOffset: { (): number; (_: number): ITooltip; };
    tooltipOffset_default: { (): number; (_: number): ITooltip; };
}
ITooltip.prototype.publish("tooltipStyle", "default", "set", "Style", ["default", "none"], {});
ITooltip.prototype.publish("tooltipValueFormat", ",.2f", "string", "Value Format", null, {});
ITooltip.prototype.publish("tooltipSeriesColor", "#EAFFFF", "html-color", "Series Color", null, {});
ITooltip.prototype.publish("tooltipLabelColor", "#CCFFFF", "html-color", "Label Color", null, {});
ITooltip.prototype.publish("tooltipValueColor", "white", "html-color", "Value Color", null, {});
ITooltip.prototype.publish("tooltipTick", true, "boolean", "Show tooltip tick", null, {});
ITooltip.prototype.publish("tooltipOffset", 8, "number", "Offset from the cursor", null, {});

const tooltipValueFormat = ITooltip.prototype.tooltipValueFormat;
ITooltip.prototype.tooltipValueFormat = function (_?): string | ITooltip {
    const retVal = tooltipValueFormat.apply(this, arguments);
    if (arguments.length) {
        this._valueFormatter = d3Format(_);
    }
    return retVal;
};
