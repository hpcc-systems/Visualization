import { Axis } from "@hpcc-js/chart";
import { SVGWidget } from "@hpcc-js/common";
import { ReactGantt } from "./ReactGantt";

export type IAxisGanttData = [ string, number | string, number | string, any? ] | any[];

export class ReactAxisGantt extends SVGWidget {

    protected _topAxis: Axis = new Axis("center")
        .orientation("top")
        .type("linear")
        .shrinkToFit("none")
        .overlapMode("hide")
        .extend(0)
        .tickFormat("d")
        ;
    protected _gantt: ReactGantt = new ReactGantt("center")
        .stroke("#000000")
        ;
    protected _bottomAxis: Axis = new Axis("center")
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

    protected rangeRenderer;

    constructor(){
        super();
        this._drawStartPos = "origin";
        this.rangeRenderer = function () {
            const ret = this._gantt.rangeRenderer.apply(this._gantt, arguments);
            if(!arguments.length)return ret;
            return this;
        };
    }

    resizeWrappers() {

        const w = this.width();
        const h = this.height();

        const axisHeight = this.axisHeight(); //TODO: Dynamic scaling to allow for small resolutions?
        
        const contentHeight = (h - (axisHeight * 2));
        const borderOffset1 = this.strokeWidth();
        this._topRect
            .attr("height", axisHeight)
            .attr("width", w)
            .attr("fill", "transparent")
            ;
        this._topAxisElement.attr("transform", "translate(0 0)");
        this._topAxis.resize({height:axisHeight, width:w});
        this._contentRect
            .attr("height", contentHeight)
            .attr("width", w)
            .attr("fill", "transparent")
            ;
        this._contentElement.attr("transform", `translate(0 ${axisHeight + borderOffset1})`);
        this._gantt.resize({height:contentHeight, width:w});
        this._bottomRect
            .attr("height", axisHeight)
            .attr("width", w)
            .attr("fill", "transparent")
            ;
        this._bottomAxisElement.attr("transform", `translate(0 ${axisHeight + contentHeight + borderOffset1})`);
        this._bottomAxis.resize({height:axisHeight, width:w});
    }

    enter(domNode, element){
        super.enter(domNode, element);

        this._gantt.click = (row, col, sel) => {
            this.click(row, col, sel);
        };

        this._gantt.dblclick = (row, col, sel) => {
            this.dblclick(row, col, sel);
        };

        this._topAxisElement = element.append("g")
            .attr("class", "top-axis-wrapper")
            ;
        this._topRect = this._topAxisElement.append("rect")
            .attr("class", "top-axis-rect")
            ;
        this._contentElement = element.append("g")
            .attr("class", "content-wrapper")
            ;
        this._contentRect = this._contentElement.append("rect")
            .attr("class", "content-rect")
            ;
        this._bottomAxisElement = element.append("g")
            .attr("class", "bottom-axis-wrapper")
            ;
        this._bottomRect = this._bottomAxisElement.append("rect")
            .attr("class", "top-axis-rect")
            ;
        this._topAxis.target(this._topAxisElement.node());
        this._gantt.target(this._contentElement.node()).bucketHeight(30);
        this._bottomAxis.target(this._bottomAxisElement.node());

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
            .render()
            ;
        this._bottomAxis
            .fontFamily(this.axisFontFamily())
            .fontSize(this.axisFontSize())
            .tickLength(this.axisTickLength())
            .low(nextLow)
            .high(nextHigh)
            .render()
            ;
    }

    update(domNode, element){
        super.update(domNode, element);
        this._topAxis.tickFormat(this.tickFormat()).render();
        this._bottomAxis.tickFormat(this.tickFormat()).render();
        this._gantt.render();
    }

    columns(): string[];
    columns(_: string[]): this;
    columns(_?: string[]): this | string[] {
        const retVal = super.columns.apply(this, arguments);
        if(arguments.length > 0) {
            this._gantt.columns(_);
        }
        return retVal;
    }

    data(): IAxisGanttData[];
    data(_: IAxisGanttData[]): this;
    data(_?: IAxisGanttData[]): this | IAxisGanttData[] {
        const retVal = super.data.apply(this, arguments);
        if(arguments.length > 0) {
            const ganttData: any[] = this.data().map(n=>{
                const ret = [...n];
                ret[1] = isNaN(n[1] as any) ? new Date(n[1]).getTime() : Number(n[1]);
                ret[2] = isNaN(n[2] as any) ? new Date(n[2]).getTime() : Number(n[2]);
                return ret;
            });
            this._gantt._minStart = Math.min(...ganttData.map(n=>n[1])) ?? 0;
            this._gantt._maxEnd = Math.max(...ganttData.map(n=>n[2])) ?? 1;
            this._gantt.data(ganttData);
        }
        return retVal;
    }

    resize(_size?: { width: number, height: number }) {
        const retVal = super.resize.apply(this, arguments);

        if(this._topAxisElement){
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
ReactAxisGantt.prototype._class += " timeline_ReactAxisGantt";

export interface ReactAxisGantt {
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
    bucketColumn(): string;
    bucketColumn(_: string): this;
    maxZoom(): number;
    maxZoom(_: number): this;
}
ReactAxisGantt.prototype.publish("tickFormat", null, "string", "Format rule applied to axis tick labels", undefined, { optional: true });
ReactAxisGantt.prototype.publish("axisHeight", 22, "number", "Height of axes (pixels)");
ReactAxisGantt.prototype.publish("overlapTolerence", 2, "number", "overlapTolerence");
ReactAxisGantt.prototype.publish("smallestRangeWidth", 10, "number", "Width of the shortest range (pixels)");
ReactAxisGantt.prototype.publish("axisFontSize", null, "number", "Font size of axis tick labels");
ReactAxisGantt.prototype.publish("axisFontFamily", null, "string", "Font family of axis tick labels");
ReactAxisGantt.prototype.publish("axisTickLength", null, "number", "Length of axis ticks");
ReactAxisGantt.prototype.publishProxy("gutter", "_gantt");
ReactAxisGantt.prototype.publishProxy("renderMode", "_gantt");
ReactAxisGantt.prototype.publishProxy("strokeWidth", "_gantt");
ReactAxisGantt.prototype.publishProxy("fontSize", "_gantt");
ReactAxisGantt.prototype.publishProxy("fontFamily", "_gantt");
ReactAxisGantt.prototype.publishProxy("stroke", "_gantt");
ReactAxisGantt.prototype.publishProxy("cornerRadius", "_gantt");
ReactAxisGantt.prototype.publishProxy("titleColumn", "_gantt");
ReactAxisGantt.prototype.publishProxy("startDateColumn", "_gantt");
ReactAxisGantt.prototype.publishProxy("endDateColumn", "_gantt");
ReactAxisGantt.prototype.publishProxy("iconColumn", "_gantt");
ReactAxisGantt.prototype.publishProxy("colorColumn", "_gantt");
ReactAxisGantt.prototype.publishProxy("bucketColumn", "_gantt");
ReactAxisGantt.prototype.publishProxy("maxZoom", "_gantt");
ReactAxisGantt.prototype.publishProxy("bucketHeight", "_gantt");
