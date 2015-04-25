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
        this._class = "layout_Surface";

        this._tag = "div";
    };
    Surface.prototype = Object.create(HTMLWidget.prototype);

    Surface.prototype.publish("title", "", "string", "Title");
    Surface.prototype.publish("widget", null, "widget", "Widget");

    Surface.prototype.testData = function () {
        this.title("ABC");
        this.widget(new Surface().widget(new MultiChart().testData()));
        return this;
    };

    Surface.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Surface.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var titles = element.selectAll(".surfaceTitle").data(this._title ? [this._title] : []);
        titles.enter().insert("h3", "div")
            .attr("class", "surfaceTitle")
        ;
        titles
            .text(function (d) { return d; })
        ;
        titles.exit().remove();

        var widgets = element.selectAll("#" + this._id + " > .surfaceWidget").data(this._widget ? [this._widget] : [], function (d) { return d._id; });

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
                var width = context.clientWidth();
                var height = context.clientHeight();
                if (context._title) {
                    height -= context.calcHeight(element.select("h3"));
                }
                var widgetDiv = d3.select(this);
                height -= context.calcFrameHeight(widgetDiv);
                width -= context.calcFrameWidth(widgetDiv);
                d
                    .resize({ width: width, height: height })
                ;
            })
        ;
        widgets.exit().each(function (d) {
            //console.log("surface exit:" + d._class + d._id);
            d.target(null);
        }).remove();
    };

    Surface.prototype.exit = function (domNode, element) {
        if (this._widget) {
            this._widget = null;
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Surface.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (widget) {
            if (context._widget) {
                context._widget.render(function (widget) {
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
