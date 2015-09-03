"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../common/TextBox", "css!./AbsoluteSurface",], factory);
    } else {
        root.layout_AbsoluteSurface = factory(root.d3, root.common_HTMLWidget, root.common_TextBox);
    }
}(this, function (d3, HTMLWidget, TextBox) {
    function AbsoluteSurface() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    AbsoluteSurface.prototype = Object.create(HTMLWidget.prototype);
    AbsoluteSurface.prototype.constructor = AbsoluteSurface;
    AbsoluteSurface.prototype._class += " layout_AbsoluteSurface";

    AbsoluteSurface.prototype.publish("units", "percent", "set", "Units", ["pixels", "percent"]);
    AbsoluteSurface.prototype.publish("widgetX", 0, "number", "Widget XPos");
    AbsoluteSurface.prototype.publish("widgetY", 0, "number", "Widget YPos");
    AbsoluteSurface.prototype.publish("widgetWidth", "100", "string", "Widget Width, omit for full");
    AbsoluteSurface.prototype.publish("widgetHeight", "100", "string", "Widget Height, omit for full");
    AbsoluteSurface.prototype.publish("widget", null, "widget", "Widget", null, { tags: ["Private"] });
    AbsoluteSurface.prototype.publish("opacity", 1, "number", "Opacity");

    AbsoluteSurface.prototype.testData = function () {
        this
            .widgetX(25)
            .widgetY(25)
            .widgetWidth(50)
            .widgetHeight(50)
            .widget(new TextBox().testData())
        ;
        return this;
    };

    AbsoluteSurface.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    AbsoluteSurface.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var xPos = 0, yPos = 0, width = this.clientWidth(), height = this.clientHeight();
        switch (this.units()) {
            case "pixels":
                xPos = this.widgetX();
                yPos = this.widgetY();
                width = this.widgetWidth() === "" ? width - xPos : Number(this.widgetWidth());
                height = this.widgetHeight() === "" ? height - yPos : Number(this.widgetHeight());
                break;
            case "percent":
                xPos = this.widgetX() * width / 100;
                yPos = this.widgetY() * height / 100;
                width = this.widgetWidth() === "" ? width - xPos : Number(this.widgetWidth() * width / 100);
                height = this.widgetHeight() === "" ? height - yPos : Number(this.widgetHeight() * height / 100);
                break;
        }
        element.style("opacity", this.opacity());

        var widgets = element.selectAll("#" + this._id + " > .placeholder").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });
        widgets.enter().append("div")
            .attr("class", "placeholder")
            .each(function (d) {
                d.target(this);
            })
        ;
        widgets
            .style({
                left: xPos + "px",
                top: yPos + "px",
                width: width + "px",
                bottom: height + "px"
            })
            .each(function (d) {
                d
                    .resize({ width: width, height: height })
                ;
            })
        ;
        widgets.exit().each(function (d) {
            d.target(null);
        }).remove();
    };

    AbsoluteSurface.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return AbsoluteSurface;
}));
