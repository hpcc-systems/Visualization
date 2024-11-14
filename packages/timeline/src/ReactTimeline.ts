import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3-time-format";
import { ReactAxisGantt } from "./ReactAxisGantt.ts";

export class ReactTimeline extends ReactAxisGantt {

    protected _axisLabelFormatter;//TODO: add a type to this? d3 time formatting function type?

    constructor() {
        super();
        this._drawStartPos = "origin";
        this._topAxis.type("time");
        this._bottomAxis.type("time");

        this.tooltipHTML((d: any) => {
            const parser = d3TimeParse("%Q");
            const startTime = parser(d[1]);
            const endTime = parser(d[2]);

            const formatter = d3TimeFormat(this.tooltipTimeFormat());
            return `<div style="text-align:center;">${d[0]}<br/><br/>${formatter(startTime)} -&gt; ${formatter(endTime)}</div>`;
        });
    }

    update(domNode, element) {
        super.update(domNode, element);

        if (this.timePattern_exists()) {

            let minTimestamp = Infinity;
            let maxTimestamp = -Infinity;
            let lowDateStr = "";
            let highDateStr = "";
            this.data().map(n => {
                const start = new Date(n[1]).getTime();
                const end = new Date(n[2]).getTime();
                if (minTimestamp > start) {
                    minTimestamp = start;
                    lowDateStr = "" + n[1];
                }
                if (maxTimestamp < end) {
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
        const parseTime = d3TimeParse("%Q");
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
}
ReactTimeline.prototype._class += " timeline_ReactTimeline";

export interface ReactTimeline {
    _tooltipHTML(_): string;

    timePattern(): string;
    timePattern(_: string): this;
    timePattern_exists(): boolean;
    tooltipTimeFormat(): string;
    tooltipTimeFormat(_: string): this;
}
ReactTimeline.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time pattern used for parsing datetime strings on each data row", null, { optional: true });
ReactTimeline.prototype.publish("tooltipTimeFormat", "%Y-%m-%d", "string", "Time format used in the default html tooltip");

