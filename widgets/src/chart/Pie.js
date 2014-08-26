(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/D3Widget", "../common/Palette", "./IPie", "../common/Text", "../common/FAChar"], factory);
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

    Pie.prototype.radius = function (_) {
        if (!arguments.length) return this.d3Arc.outerRadius();
        this.d3Arc.outerRadius(_);
        return this;
    };

    Pie.prototype.innerRadius = function (_) {
        if (!arguments.length) return this.d3Arc.innerRadius();
        this.d3Arc.innerRadius(_);
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
        arc
            .each(function (d) {
                var element = d3.select(this);
                element.select("path").transition()
                    .attr("d", context.d3Arc)
                    .select("title")
                        .text(function (d) { return d.data.label + " (" + d.data.weight + ")"; })
                ;
                var centroid = context.d3Arc.centroid(d);
                context.labelWidgets[d.data.label]
                    .pos({ x: centroid[0], y: centroid[1] })
                    .render()
                ;
            })
        ;

        //  Exit  ---
        arc.exit().transition()
            .remove()
        ;
    };

    return Pie;
}));
