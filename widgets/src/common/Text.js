"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "css!./Text"], factory);
    } else {
        root.Entity = factory(root.SVGWidget);
    }
}(this, function (SVGWidget) {
    function Text() {
        SVGWidget.call(this);
        this._class = "common_Text";
    };
    Text.prototype = Object.create(SVGWidget.prototype);
    Text.prototype.publish("text", "", "string", "Display Text");
    Text.prototype.publish("font_family", "", "string", "Font Family");
    Text.prototype.publish("font_size", 12, "number", "Font Size (px)");
    Text.prototype.publish("anchor", "middle", "set", "Anchor Position", ["", "start", "middle", "end"]);
    Text.prototype.publish("color_fill", "#000000", "html-color", "Fill Color");

    Text.prototype.testData = function () {
        this.text("Hello\nand\nWelcome!");
        return this;
    }

    Text.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._textElement = element.append("text");
    };

    Text.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._textElement
            .attr("font-family", this.__meta_font_family.defaultValue !== this._font_family ? this._font_family : null)
            .attr("font-size", this.__meta_font_size.defaultValue !== this._font_size ? this._font_size : null)
        ;
        var textParts = this._text.split("\n");
        var textLine = this._textElement.selectAll("tspan").data(textParts, function (d) { return d; });
        textLine.enter().append("tspan")
            .attr("class", function (d, i) { return "tspan_" + i; })
            .attr("dy", "1em")
            .attr("x", "0")
        ;
        textLine
            .style("fill", this.__meta_color_fill.defaultValue !== this._color_fill ? this._color_fill : null)
            .text(function (d) { return d; })
        ;
        textLine.exit()
            .remove()
        ;

        var bbox = this._textElement.node().getBBox();
        var xOffset = 0;
        switch(this._anchor) {
            case "start":
                xOffset = -bbox.width / 2;
                break;
            case "end":
                xOffset = bbox.width / 2;
                break;
        };
        var yOffset = -(bbox.y + bbox.height / 2);
        
        this._textElement
            .style("text-anchor", this._anchor)
            .attr("transform", function (d) { return "translate(" + xOffset + "," + yOffset + ")"; })
        ;
    };

    return Text;
}));
