"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/I2DChart", "css!font-awesome", "css!./Summary"], factory);
    } else {
        root.chart_Summary = factory(root.d3, root.common_HTMLWidget, root.api_I2DChart);
    }
}(this, function (d3, HTMLWidget, I2DChart) {
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

    Summary.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null);
    Summary.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null);
    Summary.prototype.publish("valueIcon", "fa-briefcase", "string", "FA Char icon class");
    Summary.prototype.publish("moreText", "More Info", "string", "More text");
    Summary.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class");
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

    Summary.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._mainDiv = element.append("div")
        ;
        var context = this;
        this._headerDiv = this._mainDiv.append("h2")
            .on("click", function (d) {
                context.click(context.data()[context._playIntervalIdx], context.columns()[1], true);
            })
        ;
        this._textDiv = this._mainDiv.append("div")
            .attr("class", "text")
            .on("click", function (d) {
                context.click(context.data()[context._playIntervalIdx], context.columns()[1], true);
            })
        ;
    };

    Summary.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        if (this.data().length) {

        }
        var data = this.data();
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
            .attr("class", "content bgIcon " + this.valueIcon())
            .style({
                "background-color": this.colorFill(),
                "color": this.colorStroke(),
                "min-width": this.minWidth_exists() ? this.minWidth() + "px" : null,
                "min-height": this.minHeight_exists() ? this.minHeight() + "px" : null
            })
        ;
        this._headerDiv
            .style("color", this.colorStroke())
            .text(row[1])
        ;
        this._textDiv
            .text(row[0])
        ;
        var context = this;
        var moreDivs = this._mainDiv.selectAll(".more").data(this.moreText() ? [this.moreText()] : []);
        moreDivs.enter()
            .append("div")
            .attr("class", "more")
            .on("click", function (d) {
                var clickEvent = {};
                clickEvent[context.columns()] = context.data();
                context.click(clickEvent, "more");
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("i");
                element.append("span");
            })
        ;
        moreDivs
            .attr("style", "background-color:" + d3.rgb(this.colorFill()).darker(0.75))
        ;
        moreDivs.select("i")
            .attr("class", "fa " + this.moreIcon())
        ;
        moreDivs.select("span")
            .text(this.moreText())
        ;
        moreDivs.exit().remove();
    };

    Summary.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Summary;
}));
