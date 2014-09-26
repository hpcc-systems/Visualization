(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "css!./Text"], factory);
    } else {
        root.Entity = factory(root.SVGWidget);
    }
}(this, function (SVGWidget) {
    function Text() {
        SVGWidget.call(this);

        this._class = "text";
        this._text = "";
        this._anchor = "middle";
    };
    Text.prototype = Object.create(SVGWidget.prototype);

    Text.prototype.text = function (_) {
        if (!arguments.length) return this._text;
        this._text = "" + _;
        return this;
    };

    Text.prototype.anchor = function (_) {
        if (!arguments.length) return this._anchor;
        this._anchor = _;
        return this;
    };

    Text.prototype.enter = function (domNode, element) {
        this._textElement = element.append("text")
            .style("text-anchor", this._anchor)
        ;
    };

    Text.prototype.update = function (domNode, element) {
        var textParts = this._text.split("\n");
        var textLine = this._textElement.selectAll("tspan").data(textParts, function (d) { return d; });
        textLine.enter().append("tspan")
            .attr("class", function (d, i) { return "tspan_" + i; })
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
            .attr("transform", function (d) { return "translate(0," + (- bbox.height / 1.7) + ")"; })
        ;
    };

    return Text;
}));
