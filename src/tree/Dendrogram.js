"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/ITree", "css!./Dendrogram"], factory);
    } else {
        root.tree_Dendrogram = factory(root.d3, root.common_SVGWidget, root.api_ITree);
    }
}(this, function (d3, SVGWidget, ITree) {
    function Dendrogram(target) {
        SVGWidget.call(this);
        ITree.call(this);

        this._drawStartPos = "origin";
        this._maxTextWidth = 0;
    }
    Dendrogram.prototype = Object.create(SVGWidget.prototype);
    Dendrogram.prototype.constructor = Dendrogram;
    Dendrogram.prototype._class += " tree_Dendrogram";
    Dendrogram.prototype.implements(ITree.prototype);

    Dendrogram.prototype.publish("paletteID", "default", "set", "Palette ID", Dendrogram.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Dendrogram.prototype.publish("textOffset", 8, "number", "Text offset from circle",null,{tags:["Private"]});
    Dendrogram.prototype.publish("orientation", "horizontal", "set", "Orientation", ["horizontal","vertical"],{tags:["Private"]});
    Dendrogram.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Dendrogram.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        var context = this;
        this.layout = d3.layout.cluster();

        this.diagonal = d3.svg.diagonal()
            .projection(function (d) { return context.orientation() === "horizontal" ? [d.y, d.x] : [d.x, d.y]; })
        ;
    };

    Dendrogram.prototype.update = function (domNode, element, secondPass) {
        var context = this;
        SVGWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        //  Pad to allow text to display  ---
        this.x(this._maxTextWidth);
        var width = this.width() - this._maxTextWidth * 2;
        if(this.orientation() === "horizontal"){
            this.layout
                .size([this.height(), width])
            ;
        } else {
            this.layout
                .size([width, this.height()])
            ;
        }

        var dataNodes = this.layout.nodes(this.data());
        var links = this.layout.links(dataNodes);

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
        var nodes = element.selectAll(".node").data(dataNodes);
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
            .attr("transform", function (d) { return context.orientation() === "horizontal" ? "translate(" + d.y + "," + d.x + ")" : "translate(" + d.x + "," + d.y + ")";  })
        ;
        nodes.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) { return context._palette(d.label); })
            .append("title")
            .text(function (d) { return d.label; })
        ;
        nodes.select("text")
            .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
            .attr("dx", function (d) { return d.children ? -context.textOffset() : context.textOffset(); })
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
        maxTextWidth += this.textOffset();

        nodes.exit().remove();

        if (!secondPass && this._maxTextWidth !== maxTextWidth) {
            this._maxTextWidth = maxTextWidth;
            this.update(domNode, element, true);
        }
    };

    return Dendrogram;
}));
