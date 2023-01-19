import { I2DChart, ITooltip } from "@hpcc-js/api";
import { d3Event, InputField, SVGWidget, Utility, zoom as d3Zoom } from "@hpcc-js/common";
import { extent as d3Extent } from "d3-array";
import { scaleLinear as d3ScaleLinear, scaleLog as d3ScaleLog, scalePow as d3ScalePow, scaleSqrt as d3ScaleSqrt } from "d3-scale";
import { d3Cloud } from "./D3Cloud";

import "../src/WordCloud.css";

export class WordCloud extends SVGWidget {
    static __inputs: InputField[] = [{
        id: "label",
        type: "string"
    }, {
        id: "value",
        type: "number"
    }];

    private _prevOffsetX;
    private _prevOffsetY;
    private _prevZoom;
    private _root;
    private _canvas;
    private _d3Cloud;
    private _d3Zoom;

    constructor() {
        super();
        I2DChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._prevOffsetX = this.offsetX();
        this._prevOffsetY = this.offsetY();
        this._prevZoom = this.zoom();
    }

    calcData() {
        return this.data().map(row => {
            return {
                __viz_label: row[0],
                __viz_weight: row[1],
                __viz_row: row
            };
        });
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._selection.widgetElement(element);

        this._root = element.append("g");
        this._canvas = document.createElement("canvas");

        const context = this;
        this._d3Zoom = d3Zoom()
            .scaleExtent([0.1, 10])
            ;
        this._d3Zoom
            .on("zoom", function (evt) {
                const event = d3Event();
                if (event && event.transform) {
                    context.zoomed(context._d3Zoom, [event.transform.x, event.transform.y], event.transform.k);
                }
            })
            ;
        element.call(this._d3Zoom);

        this
            .tooltipHTML(function (d) {
                const columns = context.columns();
                const series = columns && columns.length ? columns[0] : "Word";
                return context.tooltipFormat({ label: d.__viz_label, series, value: d.__viz_weight });
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._d3Cloud = d3Cloud()
            .canvas(() => this._canvas)
            ;

        this.zoomed(this, [this.offsetX(), this.offsetY()], this.zoom());

        const data = this.calcData();
        const context = this;
        const extent = d3Extent(data, function (d: any) { return d.__viz_weight; });
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

        this._d3Cloud.stop()
            .size([this.width(), this.height()])
            .words(data)
            .font(this.fontFamily())
            .padding(this.padding())
            .spiral(this.spiral())
            .text(function (d) {
                return d.__viz_label.trim();
            })
            .fontSize(function (d) {
                return scale(d.__viz_weight);
            })
            .rotate((d, i) => angleDomain(i % context.angleCount()))
            .on("word", w => {
            })
            .on("end", draw)
            .start()
            ;

        function draw(data, bounds) {
            const text = context._root.selectAll("text")
                .data(data, function (d) { return d.__viz_label ? d.__viz_label.toLowerCase() : ""; })
                ;
            text.enter().append("text")
                .attr("tabindex", 0)
                .attr("text-anchor", "middle")
                .call(context._selection.enter.bind(context._selection))
                .text(function (d) { return d.__viz_label; })
                .on("click", function (d) {
                    context.click(context.rowToObj(d.__viz_row), context.columns()[1], context._selection.selected(this));
                })
                .on("dblclick", function (d) {
                    context.dblclick(context.rowToObj(d.__viz_row), context.columns()[1], context._selection.selected(this));
                })
                .on("mouseout.tooltip", context.tooltip.hide)
                .on("mousemove.tooltip", context.tooltip.show)
                .style("opacity", 1e-6)
                .merge(text)
                .style("font-size", function (d) { return scale(d.__viz_weight) + "px"; })
                .style("font-family", context.fontFamily())
                .transition().duration(1000)
                .attr("transform", function (d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("fill", function (d) { return context._palette(d.__viz_label ? d.__viz_label.toLowerCase() : ""); })
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
            this._root.attr("transform", translate);
            switch (source) {
                case this:
                    /*
                        this._d3Zoom
                            .scale(scale)
                            .translate(translate)
                            ;
                    */
                    break;
                case this._d3Zoom:
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

    //  SimpleSelectionMixin
    _selection: Utility.SimpleSelection;
}
WordCloud.prototype._class += " chart_WordCloud";
WordCloud.prototype.implements(I2DChart.prototype);
WordCloud.prototype.implements(ITooltip.prototype);
WordCloud.prototype.mixin(Utility.SimpleSelectionMixin);

WordCloud.prototype.publish("paletteID", "default", "set", "Color palette for this widget", WordCloud.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
WordCloud.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

WordCloud.prototype.publish("fontFamily", "Impact", "string", "Font Name", null, { tags: ["Basic"] });
WordCloud.prototype.publish("fontSizeFrom", 6, "number", "Minimum font size (pixels)", null, { tags: ["Basic"] });
WordCloud.prototype.publish("fontSizeTo", 48, "number", "Maximum font size (pixels)", null, { tags: ["Basic"] });
WordCloud.prototype.publish("angleFrom", -60, "number", "Minimum angle (degrees)", null, { tags: ["Basic"] });
WordCloud.prototype.publish("angleTo", 60, "number", "Maximum angle (degrees)", null, { tags: ["Basic"] });
WordCloud.prototype.publish("angleCount", 5, "number", "Number of different angles", null, { tags: ["Basic"] });
WordCloud.prototype.publish("padding", 0, "number", "Padding between words (pixels)", null, { tags: ["Intermediate"] });
WordCloud.prototype.publish("scaleMode", "linear", "set", "Text scaling mode", ["linear", "log", "sqrt", "pow"], { tags: ["Intermediate"] });
WordCloud.prototype.publish("spiral", "archimedean", "set", "Text scaling mode", ["archimedean", "rectangular"], { tags: ["Intermediate"] });
WordCloud.prototype.publish("offsetX", 0, "number", "X offset", null, { tags: ["Advanced"] });
WordCloud.prototype.publish("offsetY", 0, "number", "Y offset", null, { tags: ["Advanced"] });
WordCloud.prototype.publish("zoom", 1, "number", "Zoom", null, { tags: ["Advanced"] });
