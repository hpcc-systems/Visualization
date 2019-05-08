import { I2DChart } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import { rgb as d3Rgb } from "d3-color";
import { select as d3Select } from "d3-selection";

import "../src/Summary.css";

const TEXT = "text";
const HTML = "html";

export class Summary extends HTMLWidget {
    protected _playIntervalIdx = 0;
    protected _mainDiv;
    protected _headerDiv;
    protected _textDiv;

    constructor() {
        super();
        this._tag = "div";

        this._drawStartPos = "center";
        this.playInterval(this.playInterval());
    }

    lookupFieldIdx(propID, defaultIdx?: number) {
        let retVal = defaultIdx;
        if (this[propID + "_exists"]()) {
            retVal = this.columns().indexOf(this[propID]());
            if (retVal < 0) {
                return undefined;
            }
        }
        return retVal;
    }

    lookupFieldText(propID, defaultIdx?: number) {
        if (this[propID + "_exists"]()) {
            return this[propID]();
        }
        if (defaultIdx !== undefined) {
            return this.columns()[defaultIdx] || "";
        }
        return "";
    }

    currentRow() {
        return this.data()[this._playIntervalIdx];
    }

    summaryData() {
        let labelFieldIdx;  //  undefined
        if (!this.hideLabel()) {
            labelFieldIdx = this.lookupFieldIdx("labelColumn", 0);
        }
        const iconFieldIdx = this.lookupFieldIdx("iconColumn");
        const valueFieldIdx = this.lookupFieldIdx("valueColumn", 1);
        let moreIconIdx;  //  undefined
        let moreTextIdx;  //  undefined
        if (!this.hideMore()) {
            moreIconIdx = this.lookupFieldIdx("moreIconColumn");
            moreTextIdx = this.lookupFieldIdx("moreTextColumn");
        }
        const colorFillIdx = this.lookupFieldIdx("colorFillColumn");
        const colorStrokeIdx = this.lookupFieldIdx("colorStrokeColumn");
        return this.formattedData().map(function (row) {
            return {
                icon: iconFieldIdx === undefined ? this.icon() : row[iconFieldIdx],
                label: labelFieldIdx === undefined ? "" : row[labelFieldIdx],
                value: row[valueFieldIdx],
                moreIcon: moreIconIdx === undefined ? (this.hideMore() ? "" : this.moreIcon()) : row[moreIconIdx],
                moreText: moreTextIdx === undefined ? (this.hideMore() ? "" : this.moreText()) : row[moreTextIdx],
                fill: colorFillIdx === undefined ? this.colorFill() : row[colorFillIdx],
                stroke: colorStrokeIdx === undefined ? this.colorStroke() : row[colorStrokeIdx]
            };
        }, this);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._mainDiv = element.append("div")
            ;
        const context = this;
        this._headerDiv = this._mainDiv.append("h2")
            .on("click", function () {
                context.click(context.rowToObj(context.currentRow()), context.lookupFieldText("valueColumn", 1), true);
            })
            .on("dblclick", function () {
                context.dblclick(context.rowToObj(context.currentRow()), context.lookupFieldText("valueColumn", 1), true);
            })
            ;
        this._textDiv = this._mainDiv.append("div")
            .attr("class", "text")
            .on("click", function () {
                context.click(context.rowToObj(context.currentRow()), context.lookupFieldText("labelColumn", 0), true);
            })
            .on("dblclick", function () {
                context.dblclick(context.rowToObj(context.currentRow()), context.lookupFieldText("labelColumn", 0), true);
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        if (this.data().length) {

        }
        const data = this.summaryData();
        if (this._playIntervalIdx >= data.length) {
            this._playIntervalIdx = 0;
        }
        const row: any = this._playIntervalIdx < data.length ? data[this._playIntervalIdx] : ["", ""];
        element.style("width", this.fixedSize() ? this.minWidth_exists() ? this.minWidth() + "px" : null : "100%");
        element.style("height", this.fixedSize() ? this.minHeight_exists() ? this.minHeight() + "px" : null : "100%");

        this._mainDiv
            .attr("class", "content bgIcon " + row.icon)
            .transition()
            .style("background-color", row.fill)
            .style("color", row.stroke)
            .style("min-width", this.minWidth_exists() ? this.minWidth() + "px" : null)
            .style("min-height", this.minHeight_exists() ? this.minHeight() + "px" : null)
            .style("font-size", this.iconFontSize() + "px")
            ;
        this._headerDiv
            .transition()
            .style("color", row.stroke)
            .style("font-size", this.headerFontSize() + "px")
        [this.valueHTML() ? HTML : TEXT](row.value)
            ;
        this._textDiv
            .style("font-size", this.textFontSize() + "px")
        [this.labelHTML() ? HTML : TEXT](row.label)
            ;
        const context = this;
        const moreDivs = this._mainDiv.selectAll(".more").data([row]);
        moreDivs.enter()
            .append("div")
            .attr("class", "more")
            .on("click", function (d) {
                context.click(context.rowToObj(context.currentRow()), context.lookupFieldText("moreTextColumn") || "more", true);
            })
            .each(function () {
                const element2 = d3Select(this);
                element2.append("i");
                element2.append("span");
            }).merge(moreDivs)
            .style("font-size", this.moreFontSize() + "px")
            .transition()
            .style("background-color", d3Rgb(row.fill).darker(0.75).toString())
            ;
        moreDivs.select("i")
            .attr("class", function (d) { return "fa " + d.moreIcon; })
            ;
        if (this.moreTextHTML()) {
            moreDivs.select("span").html(d => d.moreText);

        } else {
            moreDivs.select("span").text(d => d.moreText);
        }
        moreDivs.exit().remove();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }
}
Summary.prototype._class += " chart_Summary";
Summary.prototype.implements(I2DChart.prototype);

export interface Summary {
    iconColumn(): string;
    iconColumn(_: string): this;
    iconColumn_exists(): boolean;
    icon(): string;
    icon(_: string): this;
    icon_exists(): boolean;

    headerFontSize(): number;
    headerFontSize(_: number): this;
    textFontSize(): number;
    textFontSize(_: number): this;
    moreFontSize(): number;
    moreFontSize(_: number): this;
    iconFontSize(): number;
    iconFontSize(_: number): this;

    hideLabel(): boolean;
    hideLabel(_: boolean): this;
    hideLabel_exists(): boolean;
    labelColumn(): string;
    labelColumn(_: string): this;
    labelColumn_exists(): boolean;
    labelHTML(): boolean;
    labelHTML(_: boolean): this;
    labelHTML_exists(): boolean;

    valueColumn(): string;
    valueColumn(_: string): this;
    valueColumn_exists(): boolean;
    valueHTML(): boolean;
    valueHTML(_: boolean): this;
    valueHTML_exists(): boolean;

    hideMore(): boolean;
    hideMore(_: boolean): this;
    hideMore_exists(): boolean;
    moreIconColumn(): string;
    moreIconColumn(_: string): this;
    moreIconColumn_exists(): boolean;
    moreIcon(): string;
    moreIcon(_: string): this;
    moreIcon_exists(): boolean;
    moreTextColumn(): string;
    moreTextColumn(_: string): this;
    moreTextColumn_exists(): boolean;
    moreText(): string;
    moreText(_: string): this;
    moreText_exists(): boolean;
    moreTextHTML(): boolean;
    moreTextHTML(_: boolean): this;
    moreTextHTML_exists(): boolean;

    colorFillColumn(): string;
    colorFillColumn(_: string): this;
    colorFillColumn_exists(): boolean;
    colorFill(): string;
    colorFill(_: string): this;
    colorFill_exists(): boolean;
    colorStrokeColumn(): string;
    colorStrokeColumn(_: string): this;
    colorStrokeColumn_exists(): boolean;
    colorStroke(): string;
    colorStroke(_: string): this;
    colorStroke_exists(): boolean;

    fixedSize(): boolean;
    fixedSize(_: boolean): this;
    fixedSize_exists(): boolean;
    minWidth(): number;
    minWidth(_: number): this;
    minWidth_exists(): boolean;
    minHeight(): number;
    minHeight(_: number): this;
    minHeight_exists(): boolean;
    playInterval(): number;
    playInterval(_: number): this;
    playInterval_exists(): boolean;

    //  I2DChart  ---
    click(row, column, selected);
    dblclick(row, column, selected);
}

Summary.prototype.publish("iconColumn", null, "set", "Select Icon Column", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("icon", "fa-briefcase", "string", "FA Char icon class", null, { disable: (w) => w.iconColumn() });

Summary.prototype.publish("headerFontSize", null, "number", "headerFontSize");
Summary.prototype.publish("textFontSize", null, "number", "textFontSize");
Summary.prototype.publish("moreFontSize", null, "number", "moreFontSize");
Summary.prototype.publish("iconFontSize", null, "number", "iconFontSize");

Summary.prototype.publish("hideLabel", false, "boolean", "Hide label column");
Summary.prototype.publish("labelColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: (w) => w.hideLabel() });
Summary.prototype.publish("labelHTML", false, "boolean", "Allow HTML", null, { disable: (w) => w.hideLabel() });

Summary.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("valueHTML", false, "boolean", "Allow HTML");

Summary.prototype.publish("hideMore", false, "boolean", "Hide More Information");
Summary.prototype.publish("moreIconColumn", null, "set", "Select More Icon Column", function () { return this.columns(); }, { optional: true, disable: (w) => w.hideMore() });
Summary.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class", null, { disable: (w) => w.hideMore() || w.moreIconColumn() });
Summary.prototype.publish("moreTextColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: (w) => w.hideMore() });
Summary.prototype.publish("moreText", "More Info", "string", "More text", null, { disable: (w) => w.hideMore() || w.moreTextColumn() });
Summary.prototype.publish("moreTextHTML", false, "boolean", "Allow HTML", null, { disable: (w) => w.hideMore() });

Summary.prototype.publish("colorFillColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null, { disable: (w) => w.colorFillColumn() });
Summary.prototype.publish("colorStrokeColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null, { disable: (w) => w.colorStrokeColumn() });

Summary.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
Summary.prototype.publish("minWidth", 225, "number", "Minimum Width");
Summary.prototype.publish("minHeight", 150, "number", "Minimum Height");
Summary.prototype.publish("playInterval", null, "number", "Play Interval", null, { optional: true });

const playInterval = Summary.prototype.playInterval;
Summary.prototype.playInterval = function (_?: number): number | any {
    const retVal = playInterval.apply(this, arguments);
    if (arguments.length) {
        if (this._playIntervalHandle) {
            clearInterval(this._playIntervalHandle);
        }
        const context = this;
        if (_) {
            this._playIntervalHandle = setInterval(function () {
                context._playIntervalIdx++;
                if (context._renderCount && context.data().length) {
                    context.render();
                }
            }, _);
        }
    }
    return retVal;
};
