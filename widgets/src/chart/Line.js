(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./XYAxis", "./IBar", "css!./Line"], factory);
    } else {
        root.Line = factory(root.d3, root.XYAxis, root.IBar);
    }
}(this, function (d3, XYAxis, IBar) {
    function Line(target) {
        XYAxis.call(this);
        IBar.call(this);

        this._class = "line";
    };
    Line.prototype = Object.create(XYAxis.prototype);
    Line.prototype.implements(IBar.prototype);

    Line.prototype.enter = function (domNode, element) {
        XYAxis.prototype.enter.apply(this, arguments);
        var context = this;
        this.d3Line = d3.svg.line()
            .x(function (d) { return context.x(d.label) + context.x.rangeBand() / 2; })
            .y(function (d) { return context.y(d.weight); })
        ;
        this.svgLine = this.svgData.append("path")
            .attr("class", "dataLine")
        ;
    };

    Line.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;
        this.svgLine
            .datum(this._data)
            .attr("d", this.d3Line)
        ;
    };

    return Line;
}));
