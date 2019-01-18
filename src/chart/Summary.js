"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/I2DChart", "css!font-awesome", "css!./Summary"], factory);
    } else {
        root.chart_Summary = factory(root.d3, root.common_HTMLWidget, root.api_I2DChart);
    }
}(this, function (d3, HTMLWidget, I2DChart) {
    var TEXT = "text";
    var HTML = "html";

    function Summary() {
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
    Summary.prototype.publish("icon", "fa-briefcase", "string", "FA Char icon class", null, { disable: function (w) { return w.iconColumn(); } });

    Summary.prototype.publish("headerFontSize", null, "number", "headerFontSize", null, { optional: true });
    Summary.prototype.publish("textFontSize", null, "number", "textFontSize", null, { optional: true });
    Summary.prototype.publish("moreFontSize", null, "number", "moreFontSize", null, { optional: true });
    Summary.prototype.publish("iconFontSize", null, "number", "iconFontSize", null, { optional: true });

    Summary.prototype.publish("hideLabel", false, "boolean", "Hide label column");
    Summary.prototype.publish("labelColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: function (w) { return w.hideLabel(); } });
    Summary.prototype.publish("labelHTML", false, "boolean", "Allow HTML", null, { disable: function (w) { return w.hideLabel(); } });

    Summary.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("valueHTML", false, "boolean", "Allow HTML");

    Summary.prototype.publish("hideMore", false, "boolean", "Hide More Information");
    Summary.prototype.publish("moreIconColumn", null, "set", "Select More Icon Column", function () { return this.columns(); }, { optional: true, disable: function (w) { return w.hideMore(); } });
    Summary.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class", null, { disable: function (w) { return w.hideMore() || w.moreIconColumn(); } });
    Summary.prototype.publish("moreTextColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: function (w) { return w.hideMore(); } });
    Summary.prototype.publish("moreText", "More Info", "string", "More text", null, { disable: function (w) { return w.hideMore() || w.moreTextColumn(); } });
    Summary.prototype.publish("moreTextHTML", false, "boolean", "Allow HTML", null, { disable: function (w) { return w.hideMore(); }});

    Summary.prototype.publish("colorFillColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null, { disable: function (w) { return w.colorFillColumn(); } });
    Summary.prototype.publish("colorStrokeColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null, { disable: function (w) { return w.colorStrokeColumn(); } });

    Summary.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
    Summary.prototype.publish("minWidth", 225, "number", "Minimum Width");
    Summary.prototype.publish("minHeight", 150, "number", "Minimum Height");
    Summary.prototype.publish("playInterval", null, "number", "Play Interval", null, { optional: true });

    var playInterval = Summary.prototype.playInterval;
    Summary.prototype.playInterval = function (_) {
        var retVal = playInterval.apply(this, arguments);
        if (arguments.length) {
            if (this._playIntervalHandle) {
                clearInterval(this._playIntervalHandle);
            }
            var context = this;
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
        var retVal = defaultIdx;
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
        var labelFieldIdx;  //  undefined
        if (!this.hideLabel()) {
            labelFieldIdx = this.lookupFieldIdx("labelColumn", 0);
        }
        var iconFieldIdx = this.lookupFieldIdx("iconColumn");
        var valueFieldIdx = this.lookupFieldIdx("valueColumn", 1);
        var moreIconIdx;  //  undefined
        var moreTextIdx;  //  undefined
        if (!this.hideMore()) {
            moreIconIdx = this.lookupFieldIdx("moreIconColumn");
            moreTextIdx = this.lookupFieldIdx("moreTextColumn");
        }
        var colorFillIdx = this.lookupFieldIdx("colorFillColumn");
        var colorStrokeIdx = this.lookupFieldIdx("colorStrokeColumn");
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


    Summary.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._mainDiv = element.append("div")
        ;
        var context = this;
        this._headerDiv = this._mainDiv.append("h2")
            .on("click", function (d) {
                context.click(context.rowToObj(context.currentRow()), context.lookupFieldText("valueColumn", 1), true);
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(context.currentRow()), context.lookupFieldText("valueColumn", 1), true);
            })
        ;
        this._textDiv = this._mainDiv.append("div")
            .attr("class", "text")
            .on("click", function (d) {
                context.click(context.rowToObj(context.currentRow()), context.lookupFieldText("labelColumn", 0), true);
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(context.currentRow()), context.lookupFieldText("labelColumn", 0), true);
            })
        ;
    };

    Summary.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        if (this.data().length) {

        }
        var data = this.summaryData();
        if (this._playIntervalIdx >= data.length) {
            this._playIntervalIdx = 0;
        }
        var row = this._playIntervalIdx < data.length ? data[this._playIntervalIdx] : ["", ""];
        element
            .style({
                width: this.fixedSize() ? this.minWidth_exists() ? this.minWidth() + "px" : null : "100%",
                height: this.fixedSize() ? this.minHeight_exists() ? this.minHeight() + "px" : null : "100%"
            })
        ;
        this._mainDiv
            .attr("class", "content bgIcon " + row.icon)
            .transition()
            .style({
                "background-color": row.fill,
                "color": row.stroke,
                "min-width": this.minWidth_exists() ? this.minWidth() + "px" : null,
                "min-height": this.minHeight_exists() ? this.minHeight() + "px" : null,
                "font-size": this.iconFontSize_exists() ? this.iconFontSize() + "px" : null
            })
        ;
        this._headerDiv
            .transition()
            .style("color", row.stroke)
            .style("font-size", this.headerFontSize_exists() ? this.headerFontSize() + "px" : null)
            [this.valueHTML() ? HTML : TEXT](row.value)
        ;
        this._textDiv
            .style("font-size", this.textFontSize_exists() ? this.textFontSize() + "px" : null)
            [this.labelHTML() ? HTML : TEXT](row.label)
        ;
        var context = this;
        var moreDivs = this._mainDiv.selectAll(".more").data([row]);
        moreDivs.enter()
            .append("div")
            .attr("class", "more")
            .on("click", function (d) {
                context.click(context.rowToObj(context.currentRow()), context.lookupFieldText("moreTextColumn") || "more", true);
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("i");
                element.append("span");
            })
        ;
        moreDivs
            .style("font-size", this.moreFontSize_exists() ? this.moreFontSize() + "px" : null)
            .transition()
            .style("background-color", d3.rgb(row.fill).darker(0.75))
        ;
        moreDivs.select("i")
            .attr("class", function (d) { return "fa " + d.moreIcon; })
        ;
        moreDivs.select("span")
            [this.moreTextHTML() ? HTML : TEXT](function (d) { return d.moreText; })
        ;
        moreDivs.exit().remove();
    };

    Summary.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Summary;
}));
