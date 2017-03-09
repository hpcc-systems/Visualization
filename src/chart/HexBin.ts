import { max as d3Max } from "d3-array";
import { hexbin as d3HexBin } from "d3-hexbin";
import { INDChart } from "../api/INDChart";
import { ITooltip } from "../api/ITooltip";
import * as Palette from "../common/Palette";
import { SVGWidget } from "../common/SVGWidget";
import "./HexBin.css";
import { XYAxis } from "./XYAxis";

export class HexBin extends XYAxis {
    _hexbin;
    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);
        this._hexbin = d3HexBin();

        this
            .xAxisGuideLines_default(false)
            .yAxisGuideLines_default(false)
            ;
    }

HexBin.prototype._palette = Palette.rainbow("default");

HexBin.prototype.publish("paletteID", "Blues", "set", "Palette ID", HexBin.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
HexBin.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
HexBin.prototype.publish("binSize", 20, "number", "Bin radius", null, { range: { min: 1, max: 300, step: 1 } });

    xPos(d) {
        return this.orientation() === "horizontal" ? this.dataPos(d.label) : this.valuePos(d.value);
    };

    yPos(d) {
        return this.orientation() === "horizontal" ? this.valuePos(d.value) : this.dataPos(d.label);
    };

    updateChart(_domNode, _element, _margin, width, height, _isHorizontal, duration) {
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._hexbin
            .extent([0, 0], [width, height])
            .radius(this.binSize())
            ;

        const data = this.flattenData();
        const dataPoints = data.map(function (d) { return [context.xPos(d), context.yPos(d)]; });
        const hexBinPoints = this._hexbin(dataPoints);
        const maxBinPoints = d3Max(hexBinPoints, function (d: any) { return d.length; });

        const points = this.svgData.selectAll(".hexagon").data(hexBinPoints, function (d) { return d.i + "_" + d.j; });
        points.enter().append("path")
            .attr("class", "hexagon")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
            .merge(points).transition().duration(duration)
            .attr("d", this._hexbin.hexagon())
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(1)"; })
            .style("fill", function (d) { return context._palette(d.length, 0, maxBinPoints); })
            ;
        points.exit().transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
            .remove()
            ;
    };

    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    paletteID: { (): string; (_: string): HexBin; };
    useClonedPalette: { (): boolean; (_: boolean): HexBin; };
    binSize: { (): number; (_: number): HexBin; };
}
HexBin.prototype._class += " chart_HexBin";
HexBin.prototype.implements(INDChart.prototype);
HexBin.prototype.implements(ITooltip.prototype);

HexBin.prototype._palette = Palette.rainbow("default");

HexBin.prototype.publish("paletteID", "Blues", "set", "Palette ID", HexBin.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
HexBin.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
HexBin.prototype.publish("binSize", 20, "number", "Bin radius");
