(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./D3Widget", "d3/d3"], factory);
    } else {
        root.Entity = factory(root.D3Widget, root.d3);
    }
}(this, function (D3Widget, d3) {
    function Text(target) {
        D3Widget.call(this, target);
        this._class = "text";
        this._text = "";
    };
    Text.prototype = Object.create(D3Widget.prototype);

    Text.prototype.text = function (_) {
        if (!arguments.length) return this._text;
        this._text = _;
        return this;
    };

    Text.prototype.enter = function (domNode, element) {
        this._textElement = element.append("text")
            .style("text-anchor", "middle")
        ;
    };

    Text.prototype.update = function (domNode, element) {
        var textParts = this._text.split("\n");
        var textLine = this._textElement.selectAll("tspan").data(textParts, function (d) { return d; });
        textLine.enter().append("tspan")
            .attr("dy", "1em")
            .attr("x", "0")
        ;
        textLine
            .text(function (d) { return d; })
        ;
        textLine.exit()
            .remove()
        ;

        var bbox = this._textElement.node().getBBox();
        this._textElement
            .attr("transform", function (d) { return "translate(0," + ((-bbox.height / 2)) + ")"; })
        ;
    };

    return Text;
}));
