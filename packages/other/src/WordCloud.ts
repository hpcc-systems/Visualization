import { I2DChart, ITooltip } from "@hpcc-js/api";
import { SVGWidget } from "@hpcc-js/common";
import { extent as d3Extent } from "d3-array";
import * as D3Cloud from "d3-cloud";
import { scaleLinear as d3ScaleLinear, scaleLog as d3ScaleLog, scalePow as d3ScalePow, scaleSqrt as d3ScaleSqrt } from "d3-scale";
import { event as d3Event } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";

import "../src/WordCloud.css";

export class WordCloud extends SVGWidget {
    _prevOffsetX;
    _prevOffsetY;
    _prevZoom;
    _vizData;
    _root;
    _canvas;
    _cloud;
    _zoom;

    constructor() {
        super();
        I2DChart.call(this);
        ITooltip.call(this);

        this._prevOffsetX = this.offsetX();
        this._prevOffsetY = this.offsetY();
        this._prevZoom = this.zoom();
        this._vizData = [];
    }
    data(_) {
        const retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._vizData = _.map(function (row) {
                const retVal2 = {};
                for (const key in row) {
                    retVal2["__viz_" + key] = row[key];
                }
                return retVal2;
            });
        }
        return retVal;
    }

    enter(domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this._root = element.append("g");
        this._canvas = document.createElement("canvas");

        const context = this;
        this._zoom = d3Zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", function (evt) {
                if (d3Event && d3Event.transform) {
                    context.zoomed(context._zoom, [d3Event.transform.x, d3Event.transform.y], d3Event.transform.k);
                }
            })
            ;
        element.call(this._zoom);

        this._cloud = new D3Cloud()
            .canvas(this._canvas)
            ;

        this
            .tooltipHTML(function (d) {
                const columns = context.columns();
                const series = columns && columns.length ? columns[0] : "Word";
                return context.tooltipFormat({ label: d.__viz_0, series, value: d.__viz_1 });
            })
            ;
    }

    update(domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.zoomed(this, [this.offsetX(), this.offsetY()], this.zoom());

        const context = this;
        const extent = d3Extent(this._vizData, function (d: any) { return d.__viz_1; });
        let scaler;
        switch (this.scaleMode()) {
            case "log":
                scaler = d3ScaleLog;
                break;
            case "sqrt":
                scaler = d3ScaleSqrt;
                break;
            case "pow":
                scaler = d3ScalePow;
                break;
            case "linear":
            default:
                scaler = d3ScaleLinear;
                break;
        }
        const scale = scaler().domain(extent).range([this.fontSizeFrom(), this.fontSizeTo()]);
        const angleDomain = d3ScaleLinear().domain([0, context.angleCount() - 1]).range([context.angleFrom(), context.angleTo()]);

        this._cloud.stop()
            .size([this.width(), this.height()])
            .words(this._vizData)
            .font(this.fontFamily())
            .padding(this.padding())
            .spiral(this.spiral())
            .text(function (d) { return d.__viz_0; })
            .fontSize(function (d) { return scale(d.__viz_1); })
            // tslint:disable-next-line:no-bitwise
            .rotate(function () { return angleDomain(~~(Math.random() * context.angleCount())); })
            .on("end", draw)
            .start()
            ;

        function draw(data, bounds) {
            const text = context._root.selectAll("text")
                .data(data, function (d) { return d.__viz_0 ? d.__viz_0.toLowerCase() : ""; })
                ;
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .text(function (d) { return d.__viz_0; })
                .on("click", function (d) {
                    context.click({ label: d.__viz_0, weight: d.__viz_1 }, "", true);
                })
                .on("dblclick", function (d) {
                    context.dblclick({ label: d.__viz_0, weight: d.__viz_1 }, "", true);
                })
                .on("mouseout.tooltip", context.tooltip.hide)
                .on("mousemove.tooltip", context.tooltip.show)
                .style("opacity", 1e-6)
                .merge(text)
                .style("font-size", function (d) { return scale(d.__viz_1) + "px"; })
                .style("font-family", context.fontFamily())
                .transition().duration(1000)
                .attr("transform", function (d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("fill", function (d) { return context._palette(d.__viz_0 ? d.__viz_0.toLowerCase() : ""); })
                .style("opacity", 1)
                ;
            text.exit().transition().duration(1000)
                .style("opacity", 1e-4)
                .remove()
                ;
        }
    }

    zoomed(source, translate, scale) {
        if (translate[0] !== this._prevOffsetX || translate[1] !== this._prevOffsetY || scale !== this._prevZoom) {
            this._root.attr("transform", d3Event.transform);
            switch (source) {
                case this:
                    this._zoom
                        .scale(scale)
                        .translate(translate)
                        ;
                    break;
                case this._zoom:
                    this.offsetX(translate[0]);
                    this.offsetY(translate[1]);
                    this.zoom(scale);
                    break;
            }
            this._prevOffsetX = translate[0];
            this._prevOffsetY = translate[1];
            this._prevZoom = scale;
        }
    }

    paletteID: { (): string; (_: string): WordCloud };
    paletteID_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): WordCloud };
    useClonedPalette_exists: () => boolean;
    fontFamily: { (): string; (_: string): WordCloud };
    fontFamily_exists: () => boolean;
    fontSizeFrom: { (): number; (_: number): WordCloud };
    fontSizeFrom_exists: () => boolean;
    fontSizeTo: { (): number; (_: number): WordCloud };
    fontSizeTo_exists: () => boolean;
    angleFrom: { (): number; (_: number): WordCloud };
    angleFrom_exists: () => boolean;
    angleTo: { (): number; (_: number): WordCloud };
    angleTo_exists: () => boolean;
    angleCount: { (): number; (_: number): WordCloud };
    angleCount_exists: () => boolean;
    padding: { (): number; (_: number): WordCloud };
    padding_exists: () => boolean;
    scaleMode: { (): string; (_: string): WordCloud };
    scaleMode_exists: () => boolean;
    spiral: { (): string; (_: string): WordCloud };
    spiral_exists: () => boolean;
    offsetX: { (): number; (_: number): WordCloud };
    offsetX_exists: () => boolean;
    offsetY: { (): number; (_: number): WordCloud };
    offsetY_exists: () => boolean;
    zoom: { (): number; (_: number): WordCloud };
    zoom_exists: () => boolean;

    //  I2DChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip  ---
    tooltip;
    tooltipHTML: (_?) => any;
    tooltipFormat: (opts) => any;
    tooltipStyle: { (): string; (_: string): WordCloud };
    tooltipStyle_exists: () => boolean;
    tooltipValueFormat: { (): string; (_: string): WordCloud };
    tooltipValueFormat_exists: () => boolean;
    tooltipSeriesColor: { (): string; (_: string): WordCloud };
    tooltipSeriesColor_exists: () => boolean;
    tooltipLabelColor: { (): string; (_: string): WordCloud };
    tooltipLabelColor_exists: () => boolean;
    tooltipValueColor: { (): string; (_: string): WordCloud };
    tooltipValueColor_exists: () => boolean;
    tooltipTick: { (): boolean; (_: boolean): WordCloud };
    tooltipTick_exists: () => boolean;
    tooltipOffset: { (): number; (_: number): WordCloud };
    tooltipOffset_exists: () => boolean;

}
WordCloud.prototype._class += " other_WordCloud";
WordCloud.prototype.implements(I2DChart.prototype);
WordCloud.prototype.implements(ITooltip.prototype);

WordCloud.prototype.publish("paletteID", "default", "set", "Palette ID", WordCloud.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
WordCloud.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

WordCloud.prototype.publish("fontFamily", "Impact", "string", "Font Name", null, { tags: ["Basic"] });
WordCloud.prototype.publish("fontSizeFrom", 6, "number", "Font Size From", null, { tags: ["Basic"] });
WordCloud.prototype.publish("fontSizeTo", 48, "number", "Font Size To", null, { tags: ["Basic"] });
WordCloud.prototype.publish("angleFrom", -60, "number", "Angle From", null, { tags: ["Basic"] });
WordCloud.prototype.publish("angleTo", 60, "number", "Angle To", null, { tags: ["Basic"] });
WordCloud.prototype.publish("angleCount", 5, "number", "Angle Count", null, { tags: ["Basic"] });
WordCloud.prototype.publish("padding", 0, "number", "Padding", null, { tags: ["Intermediate"] });
WordCloud.prototype.publish("scaleMode", "linear", "set", "Text scaling mode", ["linear", "log", "sqrt", "pow"], { tags: ["Intermediate"] });
WordCloud.prototype.publish("spiral", "archimedean", "set", "Text scaling mode", ["archimedean", "rectangular"], { tags: ["Intermediate"] });
WordCloud.prototype.publish("offsetX", 0, "number", "X offset", null, { tags: ["Advanced"] });
WordCloud.prototype.publish("offsetY", 0, "number", "Y offset", null, { tags: ["Advanced"] });
WordCloud.prototype.publish("zoom", 1, "number", "Zoom", null, { tags: ["Advanced"] });
