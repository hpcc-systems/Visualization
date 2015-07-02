"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/I2DChart", "../common/Text", "../common/FAChar", "css!./Pie"], factory);
    } else {
        root.chart_Pie = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.common_Text, root.common_FAChar);
    }
}(this, function (d3, SVGWidget, I2DChart, Text, FAChar) {
    function Pie(target) {
        SVGWidget.call(this);
        I2DChart.call(this);

        this.labelWidgets = {};

        this.d3Pie = d3.layout.pie()
            .sort(function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            })
            .value(function (d) { return d[1]; })
        ;
        this.d3Arc = d3.svg.arc()
            .outerRadius(this.radius())
            .innerRadius(this.innerRadius())
        ;
    }
    Pie.prototype = Object.create(SVGWidget.prototype);
    Pie.prototype._class += " chart_Pie";
    Pie.prototype.implements(I2DChart.prototype);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(),{tags:['Basic','Shared']});
    Pie.prototype.publish("outerText", false, "boolean", "Sets label position inside or outside chart",null,{tags:['Basic']});
    Pie.prototype.publish("radius", 100, "number", "Sets radius in pixels of pie chart",null,{tags:['Basic']});
    Pie.prototype.publish("innerRadius", 0, "number", "Sets radius in pixels of center hole in pie chart (donut)",null,{tags:['Basic']});

    Pie.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            this.radius(Math.min(this._size.width, this._size.height) / 2);
        }
        return retVal;
    };

    Pie.prototype._radius = Pie.prototype.radius;
    Pie.prototype.radius = function (_) {
        var retVal = Pie.prototype._radius.apply(this, arguments);
        if (arguments.length) {
            this.d3Arc.outerRadius(_);
        }
        return retVal;
    };

    Pie.prototype._innerRadius = Pie.prototype.innerRadius;
    Pie.prototype.innerRadius = function (_) {
        var retVal = Pie.prototype._innerRadius.apply(this, arguments);
        if (arguments.length) {
            this.d3Arc.innerRadius(_);
        }
        return retVal;
    };

    Pie.prototype.intersection = function (pointA, pointB) {
        return this.intersectCircle(pointA, pointB);
    };

    Pie.prototype.update = function (domNode, element) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
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
