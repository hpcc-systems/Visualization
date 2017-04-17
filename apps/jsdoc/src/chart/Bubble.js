/**
 * @file HPCC VIZ Bubble
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/I2DChart", "../common/Text", "../common/FAChar", "css!./Bubble"], factory);
    } else {
        root.chart_Bubble = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.common_Text, root.common_FAChar);
    }
}(this, function (d3, SVGWidget, I2DChart, Text, FAChar) {
    /**
     * @class chart_Bubble
     * @extends common_SVGWidget
     * @implements api_I2DChart
     */
    function Bubble(target) {
        SVGWidget.call(this);
        I2DChart.call(this);
        /**
         * Specifies the draw start position depending on widget type "origin" (x:0, y:0) or "center"
         * @member {string} _drawStartPos
         * @memberof chart_Bubble
         * @private
         */
        this._drawStartPos = "origin";

        this.labelWidgets = {};

        this.d3Pack = d3.layout.pack()
            .sort(function (a, b) { return a < b ? -1 : a > b ? 1 : 0; })
            .size([this.width(), this.height()])
            .value(function (d) { return d[1]; })
        ;
    }
    Bubble.prototype = Object.create(SVGWidget.prototype);
    Bubble.prototype.constructor = Bubble;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof chart_Bubble
     * @private
     */
    Bubble.prototype._class += " chart_Bubble";
    Bubble.prototype.implements(I2DChart.prototype);

    Bubble.prototype.publish("paletteID", "default", "set", "Palette ID", Bubble.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Bubble.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    /**
     * Sets/Gets size of widget.
     * @method size
     * @memberof chart_Bubble
     * @instance
     * @param {Object} [size] An object with the properties "width" and "height".
     * @param {Mixed} [size.width] Width in pixels.
     * @param {Mixed} [size.height] Height in pixels.
     * @returns {Widget|Object}
     * @example <caption>Example with specific height and width in pixels.</caption>
     * widget.size({width:"100",height:"100"}).render();
     * @example <caption>Example getting size.</caption>
     * var size = widget.size();
     */
    Bubble.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            this.d3Pack
                .size([this.width(), this.height()])
            ;
        }
        return retVal;
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof chart_Bubble
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Bubble.prototype.update = function (domNode, element) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var node = element.selectAll(".node")
            .data(this._data.length ? this.d3Pack.nodes({ children: this.cloneData() }).filter(function (d) { return !d.children; }) : [], function (d) { return d[0]; })
        ;

        //  Enter  ---
        node.enter().append("g")
            .attr("class", "node")
            .attr("opacity", 0)
            .on("click", function (d) {
                context.click(context.rowToObj(d), context._columns[1]);
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("circle")
                    .attr("r", function (d) { return d.r; })
                    .append("title")
                ;
                if (d.__viz_faChar) {
                    context.labelWidgets[d[0]] = new FAChar()
                        .char(d.__viz_faChar)
                        .target(this)
                        .render()
                    ;
                } else {
                    context.labelWidgets[d[0]] = new Text()
                        .text(d[0])
                        .target(this)
                        .render()
                    ;
                }
            })
        ;

        //  Update  ---
        node.transition()
            .attr("opacity", 1)
            .each(function (d) {
                var element = d3.select(this);
                var pos = { x: d.x, y: d.y };
                element.select("circle").transition()
                    .attr("transform", function (d) { return "translate(" + pos.x + "," + pos.y + ")"; })
                    .style("fill", function (d) { return context._palette(d[0]); })
                    .attr("r", function (d) { return d.r; })
                    .select("title")
                        .text(function (d) { return d[0] + " (" + d[1] + ")"; })
                ;
                if (d.__viz_faChar) {
                    context.labelWidgets[d[0]]
                        .pos(pos)
                        .render()
                    ;
                } else {
                    var label = d[0];
                    var labelWidth = context.labelWidgets[d[0]].getBBox().width;
                    if (d.r * 2 < 16) {
                        label = "";
                    } else if (d.r * 2 < labelWidth) {
                        label = label[0] + "...";
                    }
                    context.labelWidgets[d[0]]
                        .pos(pos)
                        .text(label)
                        .render()
                    ;
                }
            })
        ;

        //  Exit  ---
        node.exit().transition()
            .style("opacity", 0)
            .remove()
        ;
    };

    return Bubble;
}));
