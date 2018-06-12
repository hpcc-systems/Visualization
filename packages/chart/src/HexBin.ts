import { INDChart, ITooltip } from "@hpcc-js/api";
import { InputField, Palette, SVGWidget } from "@hpcc-js/common";
import { max as d3Max } from "d3-array";
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

        const data = this.flattenData();
        const dataPoints = data.map(function (d) { return [context.xPos(host, d), context.yPos(host, d)]; });
        const hexBinPoints = this._hexbin(dataPoints);
        const maxBinPoints = d3Max(hexBinPoints, function (d: any) { return d.length; });

        const points = element.selectAll(".hexagon").data(hexBinPoints, function (d) { return d.i + "_" + d.j; });
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
    }

    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

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
HexBin.prototype.publish("binSize", 20, "number", "Bin radius", null, { range: { min: 1, max: 300, step: 1 } });
