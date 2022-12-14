import { HTMLWidget } from "@hpcc-js/common";
import { Border2 } from "@hpcc-js/layout";
import { IAxisGanttData } from "./ReactAxisGantt";
import { ReactAxisGanttSeries } from "./ReactAxisGanttSeries";
import { React, render, TextList } from "@hpcc-js/react";

export class ReactAxisLabelGantt extends Border2 {

    private _listRenderer: React.FunctionComponent = TextList;
    protected _gantt = new ReactAxisGanttSeries()
        .columns(["Label", "start", "end", "idx"])
        .seriesColumn("idx")
        ;

    protected _listWrapper: HTMLWidget = new HTMLWidget();

    constructor() {
        super();
        this.leftOverflowY("hidden");
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._gantt.click = (row, col, sel) => {
            this.click(row, col, sel);
        };

        this._gantt.dblclick = (row, col, sel) => {
            this.dblclick(row, col, sel);
        };

        this.left(this._listWrapper);
        this.center(this._gantt);
        this.resizeWrappers();
    }

    update(domNode, element) {
        super.update(domNode, element);
        this.leftWidth(this.labelWidth());
        const lhsNode = this._leftWA.element().node();

        render(
            this._listRenderer,
            {
                paddingTop: 22,
                paddingBottom: 24,
                rowHeight: this.bucketHeight() + this.gutter(),
                fontFamily: this.labelFontFamily(),
                fontSize: this.labelFontSize(),
                data: this._gantt.data().map(n => n[0]),
                onItemClick: function () {
                    // console.log("evt", evt);
                }
            },
            lhsNode
        );

        this._gantt.render();
    }

    resizeWrappers() {

        const w = this.width();
        const h = this.height();

        const axisHeight = this.axisHeight(); //TODO: Dynamic scaling to allow for small resolutions?
        const contentHeight = (h - (axisHeight * 2));
        const _labelWidth = this.labelWidth();

        this.bottomHeight(axisHeight);
        this._leftWA.resize({
            width: _labelWidth,
            height: contentHeight
        });
        this._centerWA.resize({
            width: w - _labelWidth,
            height: contentHeight
        });
        this.left().render();
        const lhsNode = this._leftWA.element().node();
        lhsNode.style.overflowX = "hidden";
        lhsNode.style.text = "hidden";
        lhsNode.style.whiteSpace = "nowrap";
        lhsNode.style.textOverflow = "ellipsis";
        
        this.center().render(()=>{
            this._gantt.centerScroll = node => {
                const scrollTop = node.scrollTop;
                lhsNode.scrollTop = scrollTop;
            };
        });
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
        const retVal = this._gantt.data.apply(this, arguments);
        if (arguments.length > 0) {
            const ganttData: any[] = this.data().map(n => {
                const ret = [...n];
                ret[1] = isNaN(n[1] as any) ? new Date(n[1]).getTime() : Number(n[1]);
                ret[2] = isNaN(n[2] as any) ? new Date(n[2]).getTime() : Number(n[2]);
                return ret;
            });

            this._gantt.data(ganttData);
        }
        return retVal;
    }

    resize(_size?: { width: number, height: number }) {
        const retVal = super.resize.apply(this, arguments);

        return retVal;
    }

    click(row, col, sel) {}

    dblclick(row, col, sel) {}

    tooltip() {
        return this._gantt.tooltip();
    }
}
ReactAxisLabelGantt.prototype._class += " timeline_ReactAxisLabelGantt";

export interface ReactAxisLabelGantt {
    labelWidth(): number;
    labelWidth(_: number): this;
    tickFormat(): string;
    tickFormat(_: string): this;
    tickFormat_exists(): boolean;
    mouseMode(): string;
    mouseMode(_: string): this;
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
    labelFontSize(): number;
    labelFontSize(_: number): this;
    labelFontFamily(): string;
    labelFontFamily(_: string): this;
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
    bucketHeight(): number;
    bucketHeight(_: number): this;
    maxZoom(): number;
    maxZoom(_: number): this;
    gutter(): number;
    gutter(_: number): this;
}
ReactAxisLabelGantt.prototype.publish("labelWidth", 100, "number", "Width of the label column (pixels)");
ReactAxisLabelGantt.prototype.publish("labelFontSize", 22, "number", "Label font size (pixels)");
ReactAxisLabelGantt.prototype.publish("labelFontFamily", "Arial", "string", "Name of label font family");
ReactAxisLabelGantt.prototype.publishProxy("tickFormat", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("axisHeight", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("mouseMode", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("overlapTolerence", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("smallestRangeWidth", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("axisFontSize", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("axisFontFamily", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("axisTickLength", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("gutter", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("renderMode", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("strokeWidth", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("fontSize", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("fontFamily", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("stroke", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("cornerRadius", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("titleColumn", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("startDateColumn", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("endDateColumn", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("iconColumn", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("colorColumn", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("seriesColumn", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("bucketColumn", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("maxZoom", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("evenSeriesBackground", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("oddSeriesBackground", "_gantt");
ReactAxisLabelGantt.prototype.publishProxy("bucketHeight", "_gantt");
