(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./XYAxis", "./IBar", "css!./Bar"], factory);
    } else {
        root.Bar = factory(root.d3, root.XYAxis, root.IBar);
    }
}(this, function (d3, XYAxis, IBar) {
    function Bar(target) {
        XYAxis.call(this);
        IBar.call(this);

        this._class = "bar";
    };
    Bar.prototype = Object.create(XYAxis.prototype);
    Bar.prototype.implements(IBar.prototype);

    Bar.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;
        var bar = this.svgData.selectAll(".barRect")
            .data(this._data[0])
        ;

        var title = bar
          .enter().append("rect")
            .attr("class", "barRect")
            .on("click", function (d) {
                context.click(d);
            })
            .append("title")
        ;

        bar.transition()
            .attr("class", "barRect")
            .attr("x", function (d) { return context.x(d.label); })
            .attr("width", this.x.rangeBand())
            .attr("y", function (d) { return context.y(d.weight); })
            .attr("height", function (d) { return height - context.y(d.weight); })
        ;

        title
            .text(function (d) { return d.label + " (" + d.weight + ")"; })
        ;

        bar.exit().transition()
            .remove()
        ;
    };

    return Bar;
}));
