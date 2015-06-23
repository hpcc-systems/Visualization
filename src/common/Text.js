/**
 * @file Text Widget
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "css!./Text"], factory);
    } else {
        root.common_Text = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    /**
     * @class common_Text
     * @extends common_SVGWidget
     */
    function Text() {
        SVGWidget.call(this);
    }
    Text.prototype = Object.create(SVGWidget.prototype);
    Text.prototype.constructor = Text;

    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof common_Text
     * @private
     */
    Text.prototype._class += " common_Text";

    Text.prototype.publish("text", "", "string", "Display Text",null,{tags:["Private"]});
    Text.prototype.publish("fontFamily", "", "string", "Font Family",null,{tags:["Private"]});
    Text.prototype.publish("fontSize", null, "number", "Font Size (px)",null,{tags:["Private"]});
    Text.prototype.publish("anchor", "middle", "set", "Anchor Position", ["start", "middle", "end"],{tags:["Private"]});
    Text.prototype.publish("colorFill", null, "html-color", "Fill Color",null,{tags:["Private"]});

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof common_Text
     * @instance
     * @returns {Widget}
     */
    Text.prototype.testData = function () {
        this.text("Hello\nand\nWelcome!");
        return this;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Text.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._textElement = element.append("text");
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof common_Text
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Text.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._textElement
            .attr("font-family", this.fontFamily())
            .attr("font-size", this.fontSize())
        ;
        var textParts = this.text().split("\n");
        var textLine = this._textElement.selectAll("tspan").data(textParts, function (d) { return d; });
        textLine.enter().append("tspan")
            .attr("class", function (d, i) { return "tspan_" + i; })
            .attr("dy", "1em")
            .attr("x", "0")
        ;
        textLine
            .style("fill", this.colorFill())
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
        }
        var yOffset = -(bbox.y + bbox.height / 2);

        this._textElement
            .style("text-anchor", this.anchor())
            .attr("transform", function (d) { return "translate(" + xOffset + "," + yOffset + ")"; })
        ;
    };

    return Text;
}));
