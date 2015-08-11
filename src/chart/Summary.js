"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/I1DChart", "css!font-awesome", "css!./Summary"], factory);
    } else {
        root.chart_Summary = factory(root.d3, root.common_HTMLWidget, root.api_I1DChart);
    }
}(this, function (d3, HTMLWidget, I1DChart) {
    function Summary() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._drawStartPos = "center";

    }
    Summary.prototype = Object.create(HTMLWidget.prototype);
    Summary.prototype.constructor = Summary;
    Summary.prototype.implements(I1DChart.prototype);
    Summary.prototype._class += " chart_Summary";

    Summary.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null);
    Summary.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null);
    Summary.prototype.publish("valueIcon", "fa-briefcase", "string", "FA Char icon class");
    Summary.prototype.publish("moreText", "More Info", "string", "More text");
    Summary.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class");
    Summary.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
    Summary.prototype.publish("minWidth", 225, "number", "Minimum Width");
    Summary.prototype.publish("minHeight", 150, "number", "Minimum Height");

    Summary.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._mainDiv = element.append("div")
        ;
        var context = this;
        this._headerDiv = this._mainDiv.append("h2")
            .on("click", function (d) {
                var clickEvent = {};
                clickEvent[context.columns()] = context.data();
                context.click(clickEvent, "value");
            })
        ;
        this._textDiv = this._mainDiv.append("div")
            .attr("class", "text")
            .on("click", function (d) {
                var clickEvent = {};
                clickEvent[context.columns()] = context.data();
                context.click(clickEvent, "text");
            })
        ;
    };

    Summary.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        element
            .style({
                width: this.fixedSize() ? this.minWidth() + "px" : "100%",
                height: this.fixedSize() ? this.minHeight() + "px" : "100%"
            })
        ;
        this._mainDiv
            .attr("class", "content bgIcon " + this.valueIcon())
            .style({
                "background-color": this.colorFill(),
                "color": this.colorStroke(),
                "min-width": this.minWidth() + "px",
                "min-height": this.minHeight() + "px"
            })
        ;
        this._headerDiv
            .style("color", this.colorStroke())
            .text(this.data())
        ;
        this._textDiv
            .text(this.columns())
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
