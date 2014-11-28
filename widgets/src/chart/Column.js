(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./XYAxis", "./IBar", "css!./Column"], factory);
    } else {
        root.Column = factory(root.d3, root.XYAxis, root.IBar);
    }
}(this, function (d3, XYAxis, IBar) {
    function Column(target) {
        XYAxis.call(this);
        IBar.call(this);

        this._class = "column";
    };
    Column.prototype = Object.create(XYAxis.prototype);
    Column.prototype.implements(IBar.prototype);

    Column.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;
        var column = this.svgData.selectAll(".columnRect")
            .data(this._xyData[0])
        ;

        var title = column
          .enter().append("rect")
            .attr("class", "columnRect")
            .on("click", function (d) {
                context.click(d);
            })
            .append("title")
        ;

        column.transition()
            .attr("class", "columnRect")
            .attr("x", function (d) { return context.x(d.label); })
            .attr("width", this.x.rangeBand())
            .attr("y", function (d) { return context.y(d.weight); })
            .attr("height", function (d) { return height - context.y(d.weight); })
        ;

        title
            .text(function (d) { return d.label + " (" + d.weight + ")"; })
        ;

        column.exit().transition()
            .remove()
        ;
    };

    return Column;
}));
