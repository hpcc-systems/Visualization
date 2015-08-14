/**
 * @file HPCC VIZ Pie
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/I2DChart", "../common/Text", "../common/FAChar", "css!./Pie"], factory);
    } else {
        root.chart_Pie = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.common_Text, root.common_FAChar);
    }
}(this, function (d3, SVGWidget, I2DChart, Text, FAChar) {
     /**
     * @class chart_Pie
     * @extends common_SVGWidget
     * @implements api_I2DChart
     */
    function Pie(target) {
        SVGWidget.call(this);
        I2DChart.call(this);

        /**
         * Put label inside pie or outside (true/false) respectively.
         * @member {boolean} _outerText
         * @memberof chart_Pie
         * @default false
         * @private
         */
        this._outerText = false;  //  Put label inside pie or outside (true/false)

        this._radius = 100;       // px NEED TO MAKE PUBLISH PARAM???
        this._innerRadius = 0;    // px

        this.labelWidgets = {};

        this.d3Pie = d3.layout.pie()
            .sort(function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            })
            .value(function (d) { return d[1]; })
        ;
        this.d3Arc = d3.svg.arc()
            .outerRadius(this._radius)
            .innerRadius(this._innerRadius)
        ;
    }
    Pie.prototype = Object.create(SVGWidget.prototype);
    Pie.prototype.constructor = Pie;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof chart_MultiChartSurface
     * @private
     */
    Pie.prototype._class += " chart_Pie";
    Pie.prototype.implements(I2DChart.prototype);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    /**
     * Sets/Gets size of widget. Calls underlying size() method.
     * @method size
     * @memberof chart_Pie
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
    Pie.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            this.radius(Math.min(this._size.width, this._size.height) / 2);
        }
        return retVal;
    };

    /**
     * Sets the radius of the Pie widget directly as opposed to size() method.
     * @method radius
     * @memberof chart_Pie
     * @instance
     * @param {Number} [_] Radius in pixels.
     * @returns {Widget|Number}
     * @example <caption>Example with specific height and width in pixels.</caption>
     * widget.size({width:"100",height:"100"}).render();
     * @example <caption>Example getting size.</caption>
     * var size = widget.size();
     */
    Pie.prototype.radius = function (_) {
        if (!arguments.length) return this._radius;
        this.d3Arc.outerRadius(_);
        this._radius = _;
        return this;
    };

    /**
     * Sets the radius of the inner whole, if a Donut chart is going to be rendered.
     * @method innerRadius
     * @memberof chart_Pie
     * @instance
     * @param {Number} [_] Inner radius in pixels.
     * @returns {Widget|Number}
     * @example <caption>Example with specific height and width in pixels.</caption>
     * widget.size({width:"100",height:"100"}).render();
     * @example <caption>Example getting size.</caption>
     * var size = widget.size();
     */
    Pie.prototype.innerRadius = function (_) {
        if (!arguments.length) return this._innerRadius;
        this.d3Arc.innerRadius(_);
        this._innerRadius = _;
        return this;
    };

    /**
     * Sets/Gets whether chart labels are inside or ourside the chart.
     * @method outerText
     * @memberof chart_Pie
     * @instance
     * @param {Boolean} [_] True/False
     * @returns {Widget|Boolean}
     * @example //TODO
     */
    Pie.prototype.outerText = function (_) {
        if (!arguments.length) return this._outerText;
        this._outerText = _;
        return this;
    };

    /**
     * Returns the first insersection point of the widget and a line. Given two line end points and given the widget is a circle, returns an object with [x,y] cordinates as properties.
     * @method intersection
     * @memberof common_SVGWidget
     * @instance
     * @param {Object} [pointA] An object with the properties "x" and "y".
     * @param {Mixed} [pointA.x] End point x coordinate of the line.
     * @param {Mixed} [pointA.y] End point y coordinate of the line.
     * @param {Object} [pointB] An object with the properties "x" and "y".
     * @param {Mixed} [pointB.x] End point x coordinate of the line.
     * @param {Mixed} [pointB.y] End point y coordinate of hte line.
     * @returns {Object|Null}
     * @example //TODO
     */
    Pie.prototype.intersection = function (pointA, pointB) {
        return this.intersectCircle(pointA, pointB);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof chart_Pie
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Pie.prototype.update = function (domNode, element) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var arc = element.selectAll(".arc").data(this.d3Pie(this._data), function (d) { return d.data[0]; });

        //  Enter  ---
        arc.enter().append("g")
            .attr("class", "arc")
            .attr("opacity", 0)
            .on("click", function (d) {
                context.click(context.rowToObj(d.data), context._columns[1]);
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("path")
                    .attr("d", context.d3Arc)
                    .append("title")
                ;
                if (d.data.__viz_faChar) {
                    context.labelWidgets[d.data[0]] = new FAChar()
                        .char(d.data.__viz_faChar)
                        .target(this)
                        .render()
                    ;
                } else {
                    context.labelWidgets[d.data[0]] = new Text()
                        .text(d.data[0])
                        .target(this)
                        .render()
                    ;
                }
            })
        ;

        //  Update  ---
        arc.transition()
            .attr("opacity", 1)
            .each(function (d) {
                var pos = { x: 0, y: 1 };
                if (context._outerText) {
                    var xFactor = Math.cos((d.startAngle + d.endAngle - Math.PI) / 2);
                    var yFactor = Math.sin((d.startAngle + d.endAngle - Math.PI) / 2);

                    var textBBox = context.labelWidgets[d.data[0]].getBBox();
                    var textOffset = Math.abs(xFactor) > Math.abs(yFactor) ? textBBox.width : textBBox.height;
                    pos.x = xFactor * (context._radius + textOffset);
                    pos.y = yFactor * (context._radius + textOffset);
                } else {
                    var centroid = context.d3Arc.centroid(d);
                    pos = { x: centroid[0], y: centroid[1] };
                }

                var element = d3.select(this);
                element.select("path").transition()
                    .attr("d", context.d3Arc)
                    .style("fill", function (d) { return context._palette(d.data[0]); })
                    .select("title")
                        .text(function (d) { return d.data[0] + " (" + d.data[1] + ")"; })
                ;
                context.labelWidgets[d.data[0]]
                    .pos(pos)
                    .render()
                    .element()
                        .classed("innerLabel", !context._outerText)
                        .classed("outerLabel", context._outerText)
                ;
            })
        ;

        //  Exit  ---
        arc.exit().transition()
            .style("opacity", 0)
            .remove()
        ;

        //  Label Lines  ---
        if (context._outerText) {
            var lines = element.selectAll("line").data(this.d3Pie(this._data), function (d) { return d.data[0]; });
            lines.enter().append("line")
              .attr("x1", 0)
              .attr("x2", 0)
              .attr("y1", -this._radius - 3)
              .attr("y2", -this._radius - 8)
              .attr("stroke", "gray")
              .attr("transform", function (d) {
                  return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
              });
            lines.transition()
              .attr("transform", function (d) {
                  return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
              });
            lines.exit().remove();
        }
    };

    return Pie;
}));
