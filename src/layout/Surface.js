"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../chart/MultiChart", "css!./Surface"], factory);
    } else {
        root.layout_Surface = factory(root.d3, root.common_HTMLWidget, root.chart_MultiChart);
    }
}(this, function (d3, HTMLWidget, MultiChart) {
    function Surface() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Surface.prototype = Object.create(HTMLWidget.prototype);
    Surface.prototype._class = "layout_Surface";

    Surface.prototype.publish("padding", null, "number", "Surface Padding (px)",null,{tags:['Intermediate']});

    Surface.prototype.publish("titlePadding", null, "number", "Title Padding (px)",null,{tags:['Intermediate']});
    Surface.prototype.publish("titleFontSize", null, "string", "Title Font Size",null,{tags:['Basic']});
    Surface.prototype.publish("titleFontColor", null, "html-color", "Title Font Color",null,{tags:['Basic']});
    Surface.prototype.publish("titleFontFamily", null, "string", "Title Font Family",null,{tags:['Basic']});
    Surface.prototype.publish("titleFontBold", true, "boolean", "Enable Bold Title Font",null,{tags:['Intermediate']});
    Surface.prototype.publish("titleBackgroundColor", null, "html-color", "Title Background Color",null,{tags:['Basic']});

    Surface.prototype.publish("backgroundColor", null, "html-color", "Surface Background Color",null,{tags:['Basic']});

    Surface.prototype.publish("borderWidth", null, "string", "Surface Border Width",null,{tags:['Basic']});
    Surface.prototype.publish("borderColor", null, "html-color", "Surface Border Color",null,{tags:['Basic']});
    Surface.prototype.publish("borderRadius", null, "string", "Surface Border Radius",null,{tags:['Basic']});

    Surface.prototype.publish("title", "", "string", "Title",null,{tags:['Intermediate']});
    Surface.prototype.publish("titleAlignment", "center", "set", "Title Alignment", ["left","right","center"],{tags:['Intermediate']});
    Surface.prototype.publish("widget", null, "widget", "Widget",null,{tags:['Advanced']});

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

        element
            .style("border-width",this.borderWidth())
            .style("border-color",this.borderColor())
            .style("border-radius",this.borderRadius())
            .style("background-color",this.backgroundColor());

        var titles = element.selectAll(".surfaceTitle").data(this.title() ? [this.title()] : []);
        titles.enter().insert("h3", "div")
            .attr("class", "surfaceTitle")
        ;
        titles
            .text(function (d) { return d; })
            .style("text-align",this.titleAlignment())
            .style("color",this.titleFontColor())
            .style("font-size",this.titleFontSize())
            .style("font-family",this.titleFontFamily())
            .style("font-weight",this.titleFontBold() ? "bold" : "normal")
            .style("background-color",this.titleBackgroundColor())
            .style("padding",this.titlePadding()+"px")
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
                var width = context.clientWidth();
                var height = context.clientHeight();
                if (context.title()) {
                    height -= context.calcHeight(element.select("h3"));
                }
                var widgetDiv = d3.select(this);
                height -= context.calcFrameHeight(widgetDiv);
                width -= context.calcFrameWidth(widgetDiv);
                d
                    .resize({ width: width, height: height })
                ;
            })
            .style("padding",this.padding()+"px")
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
    };

    return Surface;
}));
