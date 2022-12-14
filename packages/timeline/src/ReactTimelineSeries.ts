import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3-time-format";
import { ReactAxisGanttSeries } from "./ReactAxisGanttSeries";

const parseTime = d3TimeParse("%Q");
export class ReactTimelineSeries extends ReactAxisGanttSeries {

    protected _axisLabelFormatter;//TODO: add a type to this? d3 time formatting function type?

    constructor(){
        super();
        this._topAxis.type("time");
        this._bottomAxis.type("time");

        this.tooltipHTML((d: any) => {
            const startTime = parseTime(d[1]);
            const endTime = parseTime(d[2]);

            const formatter = d3TimeFormat(this.tooltipTimeFormat());
            return `<div style="text-align:center;">${d[0]}<br/><br/>${formatter(startTime)} -&gt; ${formatter(endTime)}</div>`;
        });
    }

    update(domNode, element) {
        super.update(domNode, element);

        if(this.timePattern_exists()) {

            let minTimestamp = Infinity;
            let maxTimestamp = -Infinity;
            let lowDateStr = "";
            let highDateStr = "";
            this.data().forEach(n=>{
                const start = new Date(n[1]).getTime();
                const end = new Date(n[2]).getTime();
                if(minTimestamp > start){
                    minTimestamp = start;
                    lowDateStr = "" + n[1];
                }
                if(maxTimestamp < end){
                    maxTimestamp = end;
                    highDateStr = "" + n[2];
                }
            });
            this._topAxis
                .type("time")
                .timePattern(this.timePattern())
                .overlapMode("none")
                .tickFormat(this._axisLabelFormatter)
                .low(lowDateStr)
                .high(highDateStr)
                ;
            this._bottomAxis
                .type("time")
                .timePattern(this.timePattern())
                .overlapMode("none")
                .tickFormat(this._axisLabelFormatter)
                .low(lowDateStr)
                .high(highDateStr)
                ;
            this._gantt._minStart = minTimestamp;
            this._gantt._maxEnd = maxTimestamp;
        }
    }

    tooltipHTML(callback) {
        this._tooltipHTML = callback;
        this.tooltip().tooltipHTML(this._tooltipHTML);
        return this;
    }

    parseAxisValue(v) {
        const parsedTime = parseTime(v);

        const formatTime = d3TimeFormat(this.timePattern());
        return formatTime(parsedTime);
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
            .low(this.parseAxisValue(nextLow))
            .high(this.parseAxisValue(nextHigh))
            .render()
            ;
        this._bottomAxis
            .low(this.parseAxisValue(nextLow))
            .high(this.parseAxisValue(nextHigh))
            .render()
            ;
    }

    _tooltipHTML: (_) => string;
}
ReactTimelineSeries.prototype._class += " timeline_ReactTimelineSeries";

export interface ReactTimelineSeries {
    zoomable(): boolean;
    zoomable(_: boolean): this;
    timePattern(): string;
    timePattern(_: string): this;
    timePattern_exists(): boolean;
    tooltipTimeFormat(): string;
    tooltipTimeFormat(_: string): this;
}
ReactTimelineSeries.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time pattern used for parsing datetime strings on each data row", null, {optional:true});
ReactTimelineSeries.prototype.publish("tooltipTimeFormat", "%Y-%m-%d", "string", "Time format used in the default html tooltip");

