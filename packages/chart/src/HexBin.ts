import { I2DAggrChart, ITooltip } from "@hpcc-js/api";
import { InputField, SVGWidget } from "@hpcc-js/common";
import { extent as d3Extent, max as d3Max, min as d3Min } from "d3-array";
import { hexbin as d3HexBin } from "d3-hexbin";
import { XYAxis } from "./XYAxis";

import "../src/HexBin.css";

export class HexBin extends XYAxis {
    static __inputs: InputField[] = [{
        id: "x",
        type: "any"
    }, {
        id: "y",
        type: "number"
    }];

    _hexbin;
    protected _dataMinWeight;
    protected _dataMaxWeight;
    constructor() {
        super();
        I2DAggrChart.call(this);
        this.tooltipValueFormat_default(",.0f");
        ITooltip.call(this);
        this.tooltipHTML(d => {
            const seriesExtent = d3Extent<{ label: any, value: any }>(d, d => d.label);
            const labelExtent = d3Extent<{ label: any, value: any }>(d, d => d.value);
            return this.tooltipFormat({
                series: seriesExtent[0] === seriesExtent[1] ? seriesExtent[0] : `${seriesExtent[0]} -> ${seriesExtent[1]}`,
                label: labelExtent[0] === labelExtent[1] ? labelExtent[0] : `${labelExtent[0]} -> ${labelExtent[1]}`,
                value: d.length
            });
        });
        this._hexbin = d3HexBin()
            .x(d => d.x)
            .y(d => d.y)
            ;
        this
            .xAxisGuideLines_default(false)
            .yAxisGuideLines_default(false)
            ;
    }

    xPos(host: XYAxis, d) {
        return host.orientation() === "horizontal" ? host.dataPos(d.label) : host.valuePos(d.value);
    }

    yPos(host: XYAxis, d) {
        return host.orientation() === "horizontal" ? host.valuePos(d.value) : host.dataPos(d.label);
    }

    layerUpdate(host: XYAxis, element, duration: number = 250) {
        super.layerUpdate(host, element, duration);
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._hexbin
            .extent([0, 0], [this.width(), this.height()])
            .radius(this.binSize())
            ;

        const data = this.data();
        const flatData = this.flattenData();
        const dataPoints = flatData.map(d => {
            return {
                x: context.xPos(host, d),
                y: context.yPos(host, d),
                label: host.parseData(d.label),
                value: host.parseValue(d.value),
                origRow: d
            };
        });
        const hexBinPoints = this._hexbin(dataPoints);
        const minBinPoints = d3Min(hexBinPoints, function (d: any) { return d.length; });
        const maxBinPoints = d3Max(hexBinPoints, function (d: any) { return d.length; });
        this._dataMinWeight = minBinPoints;
        this._dataMaxWeight = maxBinPoints;

        const points = element.selectAll(".hexagon").data(hexBinPoints, function (d) { return d.i + "_" + d.j; });
        points.enter().append("path")
            .attr("class", "hexagon")
            .call(host._selection.enter.bind(host._selection))
            .on("click", function (d: any) {
                context.click(d.map(row => host.rowToObj(data[row.origRow.rowIdx])), context.columns()[1], host._selection.selected(this));
            })
            .on("dblclick", function (d: any) {
                context.dblclick(d.map(row => host.rowToObj(data[row.origRow.rowIdx])), context.columns()[1], host._selection.selected(this));
            })
            .on("mouseout.tooltip", context.tooltip.hide)
            .on("mousemove.tooltip", context.tooltip.show)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
            .merge(points).transition().duration(duration)
            .attr("d", this._hexbin.hexagon())
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(1)"; })
            .style("fill", function (d) { return context._palette(d.length, minBinPoints, maxBinPoints); })
            ;
        points.exit().transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
            .remove()
            ;
    }

    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

    //  Events  ---
    click(row: object[], column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }
    dblclick(row: object[], column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
    tooltipValueFormat: (_) => string;
    tooltipValueFormat_default: (_) => string;

    paletteID: { (): string; (_: string): HexBin; };
    useClonedPalette: { (): boolean; (_: boolean): HexBin; };
    binSize: { (): number; (_: number): HexBin; };
}
HexBin.prototype._class += " chart_HexBin";
HexBin.prototype.implements(I2DAggrChart.prototype);
HexBin.prototype.implements(ITooltip.prototype);

HexBin.prototype.publish("paletteID", "Blues", "set", "Palette ID", HexBin.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
HexBin.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
HexBin.prototype.publish("binSize", 20, "number", "Bin radius", null, { range: { min: 1, max: 300, step: 1 } });
