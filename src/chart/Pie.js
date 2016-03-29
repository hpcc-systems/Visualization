"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/I2DChart", "../common/Text", "../common/FAChar", "../common/Utility", "../api/ITooltip", "css!./Pie"], factory);
    } else {
        root.chart_Pie = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.common_Text, root.common_FAChar, root.common_Utility, root.api_ITooltip);
    }
}(this, function (d3, SVGWidget, I2DChart, Text, FAChar, Utility, ITooltip) {
    function Pie(target) {
        SVGWidget.call(this);
        I2DChart.call(this);
        ITooltip.call(this);

        this.labelWidgets = {};

        this.d3Pie = d3.layout.pie()
            .padAngle(0.0025)
            .sort(function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            })
            .value(function (d) { return d[1]; })
        ;
        this.d3Arc = d3.svg.arc()
            .padRadius(this.calcRadius())
            .innerRadius(this.innerRadius())
        ;
    }
    Pie.prototype = Object.create(SVGWidget.prototype);
    Pie.prototype.constructor = Pie;
    Pie.prototype._class += " chart_Pie";
    Pie.prototype.implements(I2DChart.prototype);
    Pie.prototype.implements(ITooltip.prototype);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Pie.prototype.publish("outerText", false, "boolean", "Sets label position inside or outside chart",null,{tags:["Basic"]});
    Pie.prototype.publish("innerRadius", 0, "number", "Sets inner pie hole radius as a percentage of the radius of the pie chart",null,{tags:["Basic"]});

    Pie.prototype.pointInArc = function (pt, ptData) {
        var r1 = this.d3Arc.innerRadius()(ptData),
            r2 = this.d3Arc.outerRadius()(ptData),
            theta1 = this.d3Arc.startAngle()(ptData),
            theta2 = this.d3Arc.endAngle()(ptData);

        var dist = pt.x * pt.x + pt.y * pt.y,
            angle = Math.atan2(pt.x, -pt.y);

        angle = (angle < 0) ? (angle + Math.PI * 2) : angle;

        return (r1 * r1 <= dist) && (dist <= r2 * r2) && (theta1 <= angle) && (angle <= theta2);
    };

    Pie.prototype.boxInArc = function (pos, bb, ptData) {
        var topLeft = { x: pos.x + bb.x, y: pos.y + bb.y };
        var topRight = { x: topLeft.x + bb.width, y: topLeft.y };
        var bottomLeft = { x: topLeft.x, y: topLeft.y + bb.height };
        var bottomRight = { x: topLeft.x + bb.width, y: topLeft.y + bb.height };
        return this.pointInArc(topLeft, ptData) && this.pointInArc(topRight, ptData) && this.pointInArc(bottomLeft, ptData) && this.pointInArc(bottomRight, ptData);
    };

    Pie.prototype.calcRadius = function (_) {
        return Math.min(this._size.width, this._size.height) / 2 - 2;
    };

    Pie.prototype.intersection = function (pointA, pointB) {
        return this.intersectCircle(pointA, pointB);
    };

    Pie.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._selection = new Utility.SimpleSelection(element);
    };

    Pie.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        this.d3Arc.innerRadius(this.innerRadius_exists() ? this.calcRadius() * this.innerRadius() / 100 : 0);
        var arc = element.selectAll(".arc").data(this.d3Pie(this.data()), function (d) { return d.data[0]; });

        //  Enter  ---
        arc.enter().append("g")
            .attr("class", "arc")
            .attr("opacity", 0)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("path")
                    .on("mouseover.tooltip", function (d) {
                        context.tooltipShow(d.data, context.columns(), 1);
                    })
                    .on("mouseout.tooltip", function (d) {
                        context.tooltipShow();
                    })
                    .on("mousemove.tooltip", function (d) {
                        context.tooltipShow(d.data, context.columns(), 1);
                    })
                    .on("mouseover", arcTween(0, 0))
                    .on("mouseout", arcTween(-5, 150))
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
                d.outerRadius = context.calcRadius() - 5;
                var pos = { x: 0, y: 1 };
                if (context.outerText()) {
                    var xFactor = Math.cos((d.startAngle + d.endAngle - Math.PI) / 2);
                    var yFactor = Math.sin((d.startAngle + d.endAngle - Math.PI) / 2);

                    var textBBox = context.labelWidgets[d.data[0]].getBBox();
                    var textOffset = Math.abs(xFactor) > Math.abs(yFactor) ? textBBox.width : textBBox.height;
                    pos.x = xFactor * (context.calcRadius() + textOffset);
                    pos.y = yFactor * (context.calcRadius() + textOffset);
                } else {
                    var centroid = context.d3Arc.centroid(d);
                    pos = { x: centroid[0], y: centroid[1] };
                }

                var element = d3.select(this);
                element.select("path").transition()
                    .attr("d", context.d3Arc)
                    .style("fill", function (d) { return context._palette(d.data[0]); })
                ;
                context.labelWidgets[d.data[0]]
                    .pos(pos)
                    .render()
                    .element()
                        .classed("innerLabel", !context.outerText())
                        .classed("outerLabel", context.outerText())
                        .style("opacity", (context.outerText() || context.boxInArc(pos, context.labelWidgets[d.data[0]].getBBox(), d)) ? null : 0)
                ;
            })
        ;

        //  Exit  ---
        arc.exit().transition()
            .style("opacity", 0)
            .remove()
        ;

        //  Label Lines  ---
        if (context.outerText()) {
            var lines = element.selectAll("line").data(this.d3Pie(this.data()), function (d) { return d.data[0]; });
            lines.enter().append("line")
              .attr("x1", 0)
              .attr("x2", 0)
              .attr("y1", -this.calcRadius() - 3)
              .attr("y2", -this.calcRadius() - 8)
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

        function arcTween(outerRadiusDelta, delay) {
            return function() {
                d3.select(this).transition().delay(delay).attrTween("d", function (d) {
                    var i = d3.interpolate(d.outerRadius, context.calcRadius() + outerRadiusDelta);
                    return function (t) { d.outerRadius = i(t); return context.d3Arc(d); };
                });
            };
        }
    };

    Pie.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
        delete this._selectionBag;
    };

    return Pie;
}));
