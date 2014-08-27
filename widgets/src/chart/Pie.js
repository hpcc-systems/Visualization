(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/D3Widget", "../common/Palette", "./IPie", "../common/Text", "../common/FAChar", "css!./Pie"], factory);
    } else {
        root.Pie = factory(root.d3, root.D3Widget, root.Palette, root.IPie, root.Text, root.FAChar);
    }
}(this, function (d3, D3Widget, Palette, IPie, Text, FAChar) {
    function Pie(target) {
        D3Widget.call(this);
        IPie.call(this);

        this._class = "pie";

        this.labelWidgets = {};

        this.d3Pie = d3.layout.pie()
            .sort(function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            })
            .value(function (d) { return d.weight; })
        ;
        this.d3Arc = d3.svg.arc()
            .outerRadius(this._radius)
            .innerRadius(this._innerRadius)
        ;
    };
    Pie.prototype = Object.create(D3Widget.prototype);
    Pie.prototype.implements(IPie.prototype);

    Pie.prototype.d3Color = Palette.ordinal("category20");

    Pie.prototype.size = function (_) {
        var retVal = D3Widget.prototype.size.call(this, _);
        if (arguments.length) {
            this.radius(Math.min(this._size.width, this._size.height) / 2);
        }
        return retVal;
    };

    Pie.prototype.radius = function (_) {
        if (!arguments.length) return this.d3Arc.outerRadius();
        this.d3Arc.outerRadius(_);
        this._radius = _;
        return this;
    };

    Pie.prototype.innerRadius = function (_) {
        if (!arguments.length) return this.d3Arc.innerRadius();
        this.d3Arc.innerRadius(_);
        this._innerRadius = _;
        return this;
    };

    Pie.prototype.outerText = function (_) {
        if (!arguments.length) return this._outerText;
        this._outerText = _;
        return this;
    };

    Pie.prototype.intersection = function (pointA, pointB) {
        return this.intersectCircle(pointA, pointB);
    };

    Pie.prototype.update = function (domNode, element) {
        var context = this;

        var arc = element.selectAll(".arc").data(this.d3Pie(this._data), function (d) { return d.data.label; });

        //  Enter  ---
        arc.enter().append("g")
            .attr("class", "arc")
            .attr("opacity", 0)
            .on("click", function (d) {
                context.click(d.data);
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("path")
                    .style("fill", function (d) { return context.d3Color(d.data.label); })
                    .attr("d", context.d3Arc)
                    .append("title")
                ;
                if (d.data.__viz_faChar) {
                    context.labelWidgets[d.data.label] = new FAChar()
                        .char(d.data.__viz_faChar)
                        .target(this)
                        .render()
                    ;
                } else {
                    context.labelWidgets[d.data.label] = new Text()
                        .text(d.data.label)
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

                    var textBBox = context.labelWidgets[d.data.label].getBBox();
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
                    .select("title")
                        .text(function (d) { return d.data.label + " (" + d.data.weight + ")"; })
                ;
                context.labelWidgets[d.data.label]
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
            var lines = element.selectAll("line").data(this.d3Pie(this._data), function (d) { return d.data.label; });
            var r = this.radius();
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
