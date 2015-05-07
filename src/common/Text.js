"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "css!./Text"], factory);
    } else {
        root.common_Text = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    function Text() {
        SVGWidget.call(this);
    };
    Text.prototype = Object.create(SVGWidget.prototype);
    Text.prototype._class += " common_Text";

    Text.prototype.publish("text", "", "string", "Display Text");
    Text.prototype.publish("font_family", "", "string", "Font Family");
    Text.prototype.publish("font_size", null, "number", "Font Size (px)");
    Text.prototype.publish("anchor", "middle", "set", "Anchor Position", ["start", "middle", "end"]);
    Text.prototype.publish("color_fill", null, "html-color", "Fill Color");

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
            .attr("font-family", this.font_family())
            .attr("font-size", this.font_size())
        ;
        var textParts = this.text().split("\n");
        var textLine = this._textElement.selectAll("tspan").data(textParts, function (d) { return d; });
        textLine.enter().append("tspan")
            .attr("class", function (d, i) { return "tspan_" + i; })
            .attr("dy", "1em")
            .attr("x", "0")
        ;
        textLine
            .style("fill", this.color_fill())
            .text(function (d) { return d; })
        ;
        textLine.exit()
            .remove()
        ;

        var bbox = { width: 0, height: 0 };
        try {   //  https://bugzilla.mozilla.org/show_bug.cgi?id=612118
            bbox = this._textElement.node().getBBox();
        } catch (e) {
        }
        var xOffset = 0;
        switch(this.anchor()) {
            case "start":
                xOffset = -bbox.width / 2;
                break;
            case "end":
                xOffset = bbox.width / 2;
                break;
        };
        var yOffset = -(bbox.y + bbox.height / 2);

        this._textElement
            .style("text-anchor", this.anchor())
            .attr("transform", function (d) { return "translate(" + xOffset + "," + yOffset + ")"; })
        ;
    };

    return Text;
}));
