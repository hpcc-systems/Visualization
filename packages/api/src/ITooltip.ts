import { Widget } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { tip } from "./Tooltip.ts";

import "../src/ITooltip.css";

declare const event: object;

//  Use old school class declaration as this is a mixin  ---
export function ITooltip(this: any) {
    this.tooltip = tip();

    if (this.tooltipLabelFormat_exists()) {
        this._labelFormatter = d3Format(this.tooltipLabelFormat() as string);
    }

    if (this.tooltipValueFormat_exists()) {
        this._valueFormatter = d3Format(this.tooltipValueFormat() as string);
    }

    if (this.layerEnter) {
        const layerEnter = this.layerEnter;
        this.layerEnter = function (_base, svgElement, _domElement) {
            if (!this._parentOverlay) {
                this._parentOverlay = _base._parentOverlay;
            }
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
            this.tooltipExit();
            layerExit.apply(this, arguments);
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
            this.tooltipExit();
            exit.apply(this, arguments);
        };
    }
}
ITooltip.prototype = Object.create(Widget.prototype);
ITooltip.prototype.constructor = ITooltip;

// abstract target(): any;
// abstract target(_: any): this;

ITooltip.prototype.tooltipEnter = function (element) {
    const overlayElement = this.parentOverlay();
    if (!overlayElement.empty()) {
        this.tooltip.rootElement(overlayElement.node().parentNode);
    }
    element.call(this.tooltip);
};

ITooltip.prototype.tooltipUpdate = function () {
    this.tooltip.offset(() => {
        if (event && this.tooltipFollowMouse()) {
            const d3tipElement: HTMLDivElement = document.querySelector(".d3-tip"); // d3Tip offers no reference to the '.d3-tip' element...?
            d3tipElement.style.display = "block";
            d3tipElement.style.left = this.tooltipOffset() + ((event as any).clientX) + "px";
            d3tipElement.style.top = (event as any).clientY + "px";
            return [];
        }
        switch (this.tooltip.direction()()) {
            case "e":
                return [0, this.tooltipOffset()];
            default:
                return [-this.tooltipOffset(), 0];
        }
    });

    let classed = this.tooltip.attr("class");
    if (classed) {
        classed = classed.split(" notick").join("") + (this.tooltipTick() ? "" : " notick") + (this.tooltipStyle() === "none" ? " hidden" : "");
        classed = classed.split(" ")
            .filter(function (_class) {
                return _class.indexOf("ITooltip-tooltipStyle-") !== 0;
            })
            .join(" ")
            ;
        classed += " ITooltip-tooltipStyle-" + this.tooltipStyle();
        this.tooltip
            .attr("class", classed)
            ;
    }
};

ITooltip.prototype.tooltipExit = function () {
    if (this.tooltip) {
        this.tooltip.destroy();
    }
};

ITooltip.prototype._tooltipHTML = function (d) {
    return d;
};

ITooltip.prototype.tooltipHTML = function (_) {
    return this.tooltip.html(_);
};

ITooltip.prototype.tooltipFormat = function (opts: { label?: string | number, series?: string | number, value?: Date | string | number, arr?: Array<{ color: string, label: string, value: string }> } = {}) {
    opts.label = opts.label === undefined ? "" : opts.label;
    if (this._labelFormatter) {
        opts.label = this._labelFormatter(opts.label) || "";
    } else if (this.formatData && this.parseData) {
        opts.label = this.formatData(this.parseData(opts.label));
    }
    opts.series = opts.series || "";
    if (opts.value instanceof Date) {
        opts.value = opts.value || "";
    } else if (this._valueFormatter) {
        opts.value = this._valueFormatter(opts.value) || "";
    } else if (this.formatValue && this.parseValue) {
        opts.value = this.formatValue(this.parseValue(opts.value));
    }
    switch (this.tooltipStyle()) {
        case "none":
            break;
        case "series-table":
            let html = '<table class="ITooltip-series-table">'
                + "<thead>"
                + '<tr><th colspan="2">' + opts.label + "</th></tr>"
                + "</thead>"
                + "<tbody>";
            opts.arr.forEach(function (row) {
                html += "<tr>";
                html += "<td>";
                html += '<div class="series-table-row-color" style="background-color:' + row.color + '"></div>';
                html += '<div class="series-table-row-label">' + row.label + "</div>";
                html += "</td>";
                html += '<td><div class="series-table-row-value">' + row.value + "</div></td>";
                html += "</tr>";
            });
            html += "</tbody>";
            html += "</table>";
            return html;
        default:
            if (opts.series) {
                return "<span style='color:" + this.tooltipSeriesColor() + "'>" + opts.series + "</span> / <span style='color:" + this.tooltipLabelColor() + "'>" + opts.label + "</span>:  <span style='color:" + this.tooltipValueColor() + "'>" + opts.value + "</span>";
            }
            if (opts.label !== "") {
                return "<span style='color:" + this.tooltipLabelColor() + "'>" + opts.label + "</span>:  <span style='color:" + this.tooltipValueColor() + "'>" + opts.value + "</span>";
            }
            return "<span style='color:" + this.tooltipValueColor() + "'>" + opts.value + "</span>";
    }
};

ITooltip.prototype.tooltipKeyValueFormat = function (titleKey: string, obj: object): string {
    let body = "";
    for (const key in obj) {
        if (key !== titleKey) {
            const value = obj && obj[key] ? obj[key] : "";
            body += `<tr><td style="${this.tooltipLabelColor_exists() ? "color:" + this.tooltipLabelColor() : ""}">${key}</td><td style="font-weight:normal">${value}</td></tr>`;
        }
    }
    return `<table>
                    <thead>
                        <tr><th colspan="2" style="font-weight:bold;font-size:16px">${obj[titleKey]}</th></tr>
                    </thead>
                    <tbody>
                        ${body}
                    </tbody>
                </table>`;
};

export interface ITooltip {
    tooltipStyle: { (): "default" | "none" | "series-table"; (_: "default" | "none" | "series-table"): ITooltip; };
    tooltipFollowMouse: { (): boolean; (_: boolean): ITooltip; };
    tooltipLabelFormat: (_?) => string | ITooltip;
    tooltipLabelFormat_exists: () => boolean;
    tooltipValueFormat: (_?) => string | ITooltip;
    tooltipValueFormat_exists: () => boolean;
    tooltipSeriesColor: { (): string; (_: string): ITooltip; };
    tooltipLabelColor: { (): string; (_: string): ITooltip; };
    tooltipLabelColor_exists: () => boolean;
    tooltipValueColor: { (): string; (_: string): ITooltip; };
    tooltipTick: { (): boolean; (_: boolean): ITooltip; };
    tooltipOffset: { (): number; (_: number): ITooltip; };
    tooltipOffset_default: { (): number; (_: number): ITooltip; };
}
ITooltip.prototype.publish("tooltipStyle", "default", "set", "Style mode", ["default", "none", "series-table"], {});
ITooltip.prototype.publish("tooltipFollowMouse", false, "boolean", "If true, the tooltip will follow mouse movement", null, {});
ITooltip.prototype.publish("tooltipLabelFormat", undefined, "string", "Format of tooltip label(s) (the domain axis)", null, {});
ITooltip.prototype.publish("tooltipValueFormat", undefined, "string", "Number format of tooltip value(s)", null, {});
ITooltip.prototype.publish("tooltipSeriesColor", "#EAFFFF", "html-color", "Color of tooltip series text", null, {});
ITooltip.prototype.publish("tooltipLabelColor", "#CCFFFF", "html-color", "Color of tooltip label text (the domain axis)", null, {});
ITooltip.prototype.publish("tooltipValueColor", "white", "html-color", "Color of tooltip value(s)", null, {});
ITooltip.prototype.publish("tooltipTick", true, "boolean", "Show tooltip tick", null, {});
ITooltip.prototype.publish("tooltipOffset", 8, "number", "Offset from the cursor", null, {});

const tooltipLabelFormat = ITooltip.prototype.tooltipLabelFormat;
ITooltip.prototype.tooltipLabelFormat = function (_?): string | ITooltip {
    const retVal = tooltipLabelFormat.call(this, _);
    if (_ !== undefined) {
        this._labelFormatter = d3Format(_);
    }
    return retVal;
};

const tooltipValueFormat = ITooltip.prototype.tooltipValueFormat;
ITooltip.prototype.tooltipValueFormat = function (_?): string | ITooltip {
    const retVal = tooltipValueFormat.call(this, _);
    if (_ !== undefined) {
        this._valueFormatter = d3Format(_);
    }
    return retVal;
};
