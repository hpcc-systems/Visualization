"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "../chart/MultiChart", "css!./Surface"], factory);
    } else {
        root.layout_Surface = factory(root.common_HTMLWidget, root.chart_MultiChart);
    }
}(this, function (HTMLWidget, MultiChart) {
    function Surface() {
        HTMLWidget.call(this);

        this._tag = "div";
    };
    Surface.prototype = Object.create(HTMLWidget.prototype);
    Surface.prototype._class += " layout_Surface";

    Surface.prototype.publish("title", "", "string", "Title");
    Surface.prototype.publish("widget", null, "widget", "Widget");

    Surface.prototype.testData = function () {
        this.title("ABC");
        this.widget(new Surface().widget(new MultiChart().testData()));
        return this;
    };

    Surface.prototype.widgetSize = function (titleDiv, widgetDiv) {
        var width = this.clientWidth();
        var height = this.clientHeight();
        if (this.title()) {
            height -= this.calcHeight(titleDiv);
        }
        height -= this.calcFrameHeight(widgetDiv);
        width -= this.calcFrameWidth(widgetDiv);
        return { width: width, height: height };
    };

    Surface.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Surface.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var titles = element.selectAll(".surfaceTitle").data(this.title() ? [this.title()] : []);
        titles.enter().insert("h3", "div")
            .attr("class", "surfaceTitle")
        ;
        titles
            .text(function (d) { return d; })
        ;
        titles.exit().remove();

        var widgets = element.selectAll("#" + this._id + " > .surfaceWidget").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });

        var context = this;
        widgets.enter().append("div")
            .attr("class", "surfaceWidget")
            .each(function (d) {
                //console.log("surface enter:" + d._class + d._id);
                d.target(this);
            })
        ;
        widgets
            .each(function (d) {
                //console.log("surface update:" + d._class + d._id);
                var widgetSize = context.widgetSize(element.select("h3"), d3.select(this));
                d
                    .resize({ width: widgetSize.width, height: widgetSize.height })
                ;
            })
        ;
        widgets.exit().each(function (d) {
            //console.log("surface exit:" + d._class + d._id);
            d.target(null);
        }).remove();
    };

    Surface.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Surface.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (widget) {
            if (context.widget()) {
                context.widget().render(function (widget) {
                    if (callback) {
                        callback(widget);
                    }
                });
            } else {
                if (callback) {
                    callback(widget);
                }
            }
        });
    }

    return Surface;
}));
