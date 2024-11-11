import { min as d3Min, max as d3Max } from "d3-array";
import { Axis } from "@hpcc-js/chart";
import { Border2 } from "@hpcc-js/layout";
import { React } from "@hpcc-js/react";
import { ReactGantt } from "./ReactGantt.ts";
import { IAxisGanttData } from "./ReactAxisGantt.ts";

export class ReactAxisGanttSeries extends Border2 {

    protected _topAxis: Axis = new Axis("origin")
        .orientation("top")
        .type("linear")
        .shrinkToFit("none")
        .overlapMode("hide")
        .extend(0)
        .tickFormat("d")
        ;
    protected _gantt: ReactGantt = new ReactGantt("origin")
        .stroke("#000000")
        .fitHeightToContent(true)
        ;
    protected _bottomAxis: Axis = new Axis("origin")
        .orientation("bottom")
        .type("linear")
        .shrinkToFit("none")
        .overlapMode("hide")
        .extend(0)
        .tickFormat("d")
        ;

    protected _topAxisElement;
    protected _contentElement;
    protected _bottomAxisElement;
    protected _topRect;
    protected _contentRect;
    protected _bottomRect;

    constructor() {
        super();
        this.centerOverflowX_default("hidden");
        this.centerOverflowY_default("auto");
    }

    selection(_: any[]): this;
    selection(): any[];
    selection(_?: any[]): any[] | this {
        if (!arguments.length) return this._gantt.selection();
        this._gantt.selection(_);
        return this;
    }

    rangeRenderer(): React.FunctionComponent;
    rangeRenderer(_: React.FunctionComponent): this;
    rangeRenderer(_?: React.FunctionComponent): this | React.FunctionComponent {
        const ret = this._gantt.rangeRenderer.apply(this._gantt, arguments);
        if (!arguments.length) return ret;
        return this;
    }

    resizeWrappers() {

        const w = this.width();
        const h = this.height();

        const axisHeight = this.axisHeight(); //TODO: Dynamic scaling to allow for small resolutions?
        const contentHeight = (h - (axisHeight * 2));

        this.bottomHeight(axisHeight);

        this._topWA.resize({
            width: w,
            height: axisHeight
        });
        this._centerWA.resize({
            width: w,
            height: contentHeight
        });
        this._bottomWA.resize({
            width: w,
            height: axisHeight
        });
        this.top().render();
        this.bottom().render();
        this.center().render();
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._gantt.click = (row, col, sel) => {
            this.click(row, col, sel);
        };

        this._gantt.dblclick = (row, col, sel) => {
            this.dblclick(row, col, sel);
        };

        this.top(this._topAxis);
        this.center(this._gantt);
        this.bottom(this._bottomAxis);

        this.resizeWrappers();

        this._gantt.zoomedHook = (transform) => {
            this.onzoom(transform);
        };
    }

    onzoom(transform) {
        const w = this.width();
        const low = this._gantt._minStart;
        const high = this._gantt._maxEnd;
        const range = high - low;
        const wpp = range / w;
        const nextLow = Math.floor(low - (wpp * (transform.x / transform.k)));
        const nextHigh = Math.ceil((range / transform.k) + nextLow);

        this._topAxis
            .fontFamily(this.axisFontFamily())
            .fontSize(this.axisFontSize())
            .tickLength(this.axisTickLength())
            .low(nextLow)
            .high(nextHigh)
            .lazyRender()
            ;
        this._bottomAxis
            .fontFamily(this.axisFontFamily())
            .fontSize(this.axisFontSize())
            .tickLength(this.axisTickLength())
            .low(nextLow)
            .high(nextHigh)
            .lazyRender()
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._topAxis.tickFormat(this.tickFormat()).render();
        this._bottomAxis.tickFormat(this.tickFormat()).render();
        this._gantt.render();
    }

    columns(): string[];
    columns(_: string[]): this;
    columns(_?: string[]): this | string[] {
        const retVal = super.columns.apply(this, arguments);
        if (arguments.length > 0) {
            this._gantt.columns(_);
        }
        return retVal;
    }

    data(): IAxisGanttData[];
    data(_: IAxisGanttData[]): this;
    data(_?: IAxisGanttData[]): this | IAxisGanttData[] {
        const retVal = super.data.apply(this, arguments);
        if (arguments.length > 0) {
            const ganttData: any[] = this.data().map(n => {
                const ret = [...n];
                ret[1] = isNaN(n[1] as any) ? new Date(n[1]).getTime() : Number(n[1]);
                ret[2] = isNaN(n[2] as any) ? new Date(n[2]).getTime() : Number(n[2]);
                return ret;
            });

            this._gantt._minStart = d3Min(ganttData, n => n[1]);
            this._gantt._maxEnd = d3Max(ganttData, n => n[2]);
            this._gantt.data(ganttData);
        }
        return retVal;
    }

    resize(_size?: { width: number, height: number }) {
        const retVal = super.resize.apply(this, arguments);

        if (this._topAxisElement) {
            this.resizeWrappers();
        }

        return retVal;
    }

    click(row, col, sel) {

    }

    dblclick(row, col, sel) {

    }

    tooltip() {
        return this._gantt._tooltip;
    }
}
ReactAxisGanttSeries.prototype._class += " timeline_ReactAxisGanttSeries";

export interface ReactAxisGanttSeries {
    tickFormat(): string;
    tickFormat(_: string): this;
    tickFormat_exists(): boolean;
    overlapTolerence(): number;
    overlapTolerence(_: number): this;
    smallestRangeWidth(): number;
    smallestRangeWidth(_: number): this;
    scaleMode(): boolean;
    scaleMode(_: boolean): this;
    fontSize(): number;
    fontSize(_: number): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    strokeWidth(): number;
    strokeWidth(_: number): this;
    stroke(): string;
    stroke(_: string): this;
    cornerRadius(): number;
    cornerRadius(_: number): this;
    axisFontSize(): number;
    axisFontSize(_: number): this;
    axisFontFamily(): string;
    axisFontFamily(_: string): this;
    axisTickLength(): number;
    axisTickLength(_: number): this;
    axisHeight(): number;
    axisHeight(_: number): this;
    titleColumn(): string;
    titleColumn(_: string): this;
    startDateColumn(): string;
    startDateColumn(_: string): this;
    endDateColumn(): string;
    endDateColumn(_: string): this;
    iconColumn(): string;
    iconColumn(_: string): this;
    colorColumn(): string;
    colorColumn(_: string): this;
    seriesColumn(): string;
    seriesColumn(_: string): this;
    bucketColumn(): string;
    bucketColumn(_: string): this;
    maxZoom(): number;
    maxZoom(_: number): this;
}
ReactAxisGanttSeries.prototype.publish("tickFormat", null, "string", "Format rule applied to axis tick labels", undefined, { optional: true });
ReactAxisGanttSeries.prototype.publish("axisHeight", 22, "number", "Height of axes (pixels)");
ReactAxisGanttSeries.prototype.publish("overlapTolerence", 2, "number", "overlapTolerence");
ReactAxisGanttSeries.prototype.publish("smallestRangeWidth", 10, "number", "Width of the shortest range (pixels)");
ReactAxisGanttSeries.prototype.publish("axisFontSize", null, "number", "Font size of axis tick labels");
ReactAxisGanttSeries.prototype.publish("axisFontFamily", null, "string", "Font family of axis tick labels");
ReactAxisGanttSeries.prototype.publish("axisTickLength", null, "number", "Length of axis ticks");
ReactAxisGanttSeries.prototype.publishProxy("gutter", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("renderMode", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("strokeWidth", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("fontSize", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("fontFamily", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("stroke", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("cornerRadius", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("titleColumn", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("startDateColumn", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("endDateColumn", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("iconColumn", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("colorColumn", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("seriesColumn", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("bucketColumn", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("maxZoom", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("evenSeriesBackground", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("oddSeriesBackground", "_gantt");
ReactAxisGanttSeries.prototype.publishProxy("bucketHeight", "_gantt");
