"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./ITree", "css!./Dendrogram"], factory);
    } else {
        root.Dendrogram = factory(root.d3, root.SVGWidget, root.ITree);
    }
}(this, function (d3, SVGWidget, ITree) {
    function Dendrogram(target) {
        SVGWidget.call(this);
        ITree.call(this);

        this._class = "tree_Dendrogram";

        this._drawStartPos = "origin";
        this._maxTextWidth = 0;
    };
    Dendrogram.prototype = Object.create(SVGWidget.prototype);
    Dendrogram.prototype.implements(ITree.prototype);
	
    Dendrogram.prototype.publish("paletteID", "default", "set", "Palette ID", Dendrogram.prototype._palette.switch());
    Dendrogram.prototype.publish("textOffset", 8, "number", "Text offset from circle");

    Dendrogram.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this.layout = d3.layout.cluster();

        this.diagonal = d3.svg.diagonal()
            .projection(function (d) { return [d.y, d.x]; })
        ;
    };

    Dendrogram.prototype.update = function (domNode, element, secondPass) {
        var context = this;
        SVGWidget.prototype.update.apply(this, arguments);
		
        this._palette = this._palette.switch(this._paletteID);

        //  Pad to allow text to display  ---
        this.x(this._maxTextWidth);
        var width = this.width() - this._maxTextWidth * 2;
        this.layout
            .size([this.height(), width])
        ;

        var nodes = this.layout.nodes(this.data());
        var links = this.layout.links(nodes);

        //  Lines  ---
        var lines = element.selectAll(".link").data(links);
        lines.enter().append("path")
            .attr("class", "link")
        ;
        lines
            .attr("d", this.diagonal)
        ;
        lines.exit().remove();

        //  Nodes  ---
        var nodes = element.selectAll(".node").data(nodes);

        nodes.enter().append("g")
            .attr("class", "node")
            .on("click", function (d) { context.click(d); })
            .each(function (d) {
                var element = d3.select(this);
                element.append("circle");
                element.append("text");
            })
        ;

        var maxTextWidth = 0;
        nodes
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
        ;
        nodes.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) { return context._palette(d.label); })
            .append("title")
            .text(function (d) { return d.label; })
        ;
        nodes.select("text")
            .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
            .attr("dx", function (d) { return d.children ? -context._textOffset : context._textOffset; })
            .attr("dy", 3)
            .text(function (d) { return d.label; })
            .each(function (d) {
                if (!secondPass) {
                    var bbox = d3.select(this).node().getBBox();
                    if (bbox.width > maxTextWidth) {
                        maxTextWidth = bbox.width;
                    }
                }
            })
        ;
        maxTextWidth += this._textOffset;

        nodes.exit().remove();

        if (!secondPass && this._maxTextWidth !== maxTextWidth) {
            this._maxTextWidth = maxTextWidth;
            this.update(domNode, element, true);
        }
    };

    return Dendrogram;
}));
