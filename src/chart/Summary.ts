import { rgb as d3Rgb } from "d3-color";
import { select as d3Select } from "d3-selection";
import "d3-transition";
import { I2DChart } from "../api/I2DChart";
import { HTMLWidget } from "../common/HTMLWidget";

// import "font-awesome/css/font-awesome.css";
import "./Summary.css";

const TEXT = "text";
const HTML = "html";

export function Summary() {
    HTMLWidget.call(this);
    this._tag = "div";

    this._drawStartPos = "center";
    this.playInterval(this.playInterval());
    this._playIntervalIdx = 0;
}
Summary.prototype = Object.create(HTMLWidget.prototype);
Summary.prototype.constructor = Summary;
Summary.prototype.implements(I2DChart.prototype);
Summary.prototype._class += " chart_Summary";

Summary.prototype.publish("iconColumn", null, "set", "Select Icon Column", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("icon", "fa-briefcase", "string", "FA Char icon class", null, { disable: (w) => { return w.iconColumn(); } });

Summary.prototype.publish("hideLabel", false, "boolean", "Hide label column");
Summary.prototype.publish("labelColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: (w) => { return w.hideLabel(); } });
Summary.prototype.publish("labelHTML", false, "boolean", "Allow HTML", null, { disable: (w) => { return w.hideLabel(); } });

Summary.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("valueHTML", false, "boolean", "Allow HTML");

Summary.prototype.publish("hideMore", false, "boolean", "Hide More Information");
Summary.prototype.publish("moreIconColumn", null, "set", "Select More Icon Column", function () { return this.columns(); }, { optional: true, disable: (w) => { return w.hideMore(); } });
Summary.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class", null, { disable: (w) => { return w.hideMore() || w.moreIconColumn(); } });
Summary.prototype.publish("moreTextColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: (w) => { return w.hideMore(); } });
Summary.prototype.publish("moreText", "More Info", "string", "More text", null, { disable: (w) => { return w.hideMore() || w.moreTextColumn(); } });
Summary.prototype.publish("moreTextHTML", false, "boolean", "Allow HTML", null, { disable: (w) => { return w.hideMore(); } });

Summary.prototype.publish("colorFillColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null, { disable: (w) => { return w.colorFillColumn(); } });
Summary.prototype.publish("colorStrokeColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
Summary.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null, { disable: (w) => { return w.colorStrokeColumn(); } });

Summary.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
Summary.prototype.publish("minWidth", 225, "number", "Minimum Width");
Summary.prototype.publish("minHeight", 150, "number", "Minimum Height");
Summary.prototype.publish("playInterval", null, "number", "Play Interval", null, { optional: true });

const playInterval = Summary.prototype.playInterval;
Summary.prototype.playInterval = function (_) {
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

Summary.prototype.lookupFieldIdx = function (propID, defaultIdx) {
    let retVal = defaultIdx;
    if (this[propID + "_exists"]()) {
        retVal = this.columns().indexOf(this[propID]());
        if (retVal < 0) {
            return undefined;
        }
    }
    return retVal;
};

Summary.prototype.lookupFieldText = function (propID, defaultIdx) {
    if (this[propID + "_exists"]()) {
        return this[propID]();
    }
    if (defaultIdx !== undefined) {
        return this.columns()[defaultIdx] || "";
    }
    return "";
};

Summary.prototype.currentRow = function () {
    return this.data()[this._playIntervalIdx];
};

Summary.prototype.summaryData = function () {
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
};

Summary.prototype.enter = function (_domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
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
};

Summary.prototype.update = function (_domNode, element) {
    HTMLWidget.prototype.update.apply(this, arguments);
    if (this.data().length) {

    }
    const data = this.summaryData();
    if (this._playIntervalIdx >= data.length) {
        this._playIntervalIdx = 0;
    }
    const row = this._playIntervalIdx < data.length ? data[this._playIntervalIdx] : ["", ""];
    element
        .style({
            width: this.fixedSize() ? this.minWidth_exists() ? this.minWidth() + "px" : null : "100%",
            height: this.fixedSize() ? this.minHeight_exists() ? this.minHeight() + "px" : null : "100%"
        })
        ;
    this._mainDiv
        .attr("class", "content bgIcon " + row.icon)
        .transition()
        .style("background-color", row.fill)
        .style("color", row.stroke)
        .style("min-width", this.minWidth_exists() ? this.minWidth() + "px" : null)
        .style("min-height", this.minHeight_exists() ? this.minHeight() + "px" : null)
        ;
    this._headerDiv
        .transition()
        .style("color", row.stroke)
    [this.valueHTML() ? HTML : TEXT](row.value)
        ;
    this._textDiv
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
        .transition()
        .style("background-color", d3Rgb(row.fill).darker(0.75))
        ;
    moreDivs.select("i")
        .attr("class", function (d) { return "fa " + d.moreIcon; })
        ;
    moreDivs.select("span")[this.moreTextHTML() ? HTML : TEXT](function (d) { return d.moreText; })
        ;
    moreDivs.exit().remove();
};

Summary.prototype.exit = function (_domNode, _element) {
    HTMLWidget.prototype.exit.apply(this, arguments);
};
