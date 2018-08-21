import { I1DChart } from "@hpcc-js/api";
import { InputField } from "@hpcc-js/common";
import { contourDensity as d3ContourDensity } from "d3-contour";
import { geoPath } from "d3-geo";
import { XYAxis } from "./XYAxis";

export class Contour extends XYAxis {
    static __inputs: InputField[] = [{
        id: "x",
        type: "any"
    }, {
        id: "y",
        type: "number"
    }];

    protected _dataMinWeight;
    protected _dataMaxWeight;
    constructor() {
        super();
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

    layerEnter(host: XYAxis, element, duration: number = 250) {
        super.layerEnter(host, element, duration);
    }

    layerUpdate(host: XYAxis, element, duration: number = 250) {
        super.layerUpdate(host, element, duration);

        this._palette = this._palette.switch(this.paletteID());

        const data = this.flattenData(this.layerColumns(host), this.layerData(host));
        const contourData = d3ContourDensity()
            .x(d => this.xPos(host, d))
            .y(d => this.yPos(host, d))
            .size([this.width(), this.height()])
            .bandwidth(this.contourBandwidth())
            (data)
            ;
        const _vals = contourData.map(d => d.value);
        const minValue = Math.min.apply(this, _vals);
        const maxValue = Math.max.apply(this, _vals);
        this._dataMinWeight = minValue;
        this._dataMaxWeight = maxValue;
        const lines = element.selectAll("path").data(contourData);
        lines.enter().append("path")
            .merge(lines)
            .attr("d", geoPath())
            .attr("fill", d => this.showContourFill() ? this._palette(d.value, minValue, maxValue) : "none")
            .attr("stroke", this.contourStrokeColor())
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", this.contourStrokeWidth())
            ;
        lines.exit().remove();
    }

    exit(_domNode, _element) {
        super.exit(_domNode, _element);
    }
}
Contour.prototype._class += " chart_Contour";
Contour.prototype.implements(I1DChart.prototype);

export interface Contour {
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    showContourFill(): boolean;
    showContourFill(_: boolean): this;
    showContour(): boolean;
    showContour(_: boolean): this;
    contourBandwidth(): number;
    contourBandwidth(_: number): this;
    contourStrokeColor(): string;
    contourStrokeColor(_: string): this;
    contourStrokeWidth(): number;
    contourStrokeWidth(_: number): this;
}
Contour.prototype.publish("paletteID", "YlGnBu", "string", "paletteID");
Contour.prototype.publish("useClonedPalette", true, "boolean", "useClonedPalette");
Contour.prototype.publish("showContourFill", true, "boolean", "showContourFill");
Contour.prototype.publish("showContour", true, "boolean", "Show contour");
Contour.prototype.publish("contourBandwidth", 40, "number", "contourBandwidth");
Contour.prototype.publish("contourStrokeColor", "#2C3A47", "html-color", "contourStrokeColor");
Contour.prototype.publish("contourStrokeWidth", 1, "number", "contourStrokeWidth");
