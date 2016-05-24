"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGZoomWidget", "../api/ITree", "css!./Dendrogram"], factory);
    } else {
        root.tree_Dendrogram = factory(root.d3, root.common_SVGZoomWidget, root.api_ITree);
    }
}(this, function (d3, SVGZoomWidget, ITree) {
    function Dendrogram(target) {
        SVGZoomWidget.call(this);
        ITree.call(this);

        this._drawStartPos = "origin";

        var context = this;

        this._d3LayoutCluster = d3.layout.cluster();
        this._d3LayoutTree = d3.layout.tree();
        this._d3Diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return context.orientation() === "horizontal" ? [d.y, d.x] : [d.x, d.y];
            })
        ;
        this._d3DiagonalRadial = d3.svg.diagonal.radial()
            .projection(function (d) {
                return [d.y, d.x / 180 * Math.PI];
            })
        ;
    }
    Dendrogram.prototype = Object.create(SVGZoomWidget.prototype);
    Dendrogram.prototype.constructor = Dendrogram;
    Dendrogram.prototype._class += " tree_Dendrogram";
    Dendrogram.prototype.implements(ITree.prototype);

    Dendrogram.prototype.publish("paletteID", "default", "set", "Palette ID", Dendrogram.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Dendrogram.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Dendrogram.prototype.publish("circleRadius", 4.5, "number", "Text offset from circle");
    Dendrogram.prototype.publish("separation", 240, "number", "Leaf Separation");
    Dendrogram.prototype.publish("dendrogram", true, "boolean", "Dendrogram");
    Dendrogram.prototype.publish("radial", false, "boolean", "Radial");
    Dendrogram.prototype.publish("orientation", "horizontal", "set", "Orientation", ["horizontal", "vertical"], { tags: ["Private"], disabled: function () { return this.radial(); } });

    Dendrogram.prototype.enter = function (domNode, element) {
        SVGZoomWidget.prototype.enter.apply(this, arguments);
        this._renderElement.attr("opacity", 0);
    };

    Dendrogram.prototype.update = function (domNode, element, secondPass) {
        SVGZoomWidget.prototype.update.apply(this, arguments);
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._renderElement.transition().duration(500)
            .attr("opacity", 1)
        ;

        this._d3Layout = this.dendrogram() ? this._d3LayoutCluster : this._d3LayoutTree;

        if (this.radial()) {
            this._d3Layout
                .size([360, this.separation() * 2])
            ;
            this._d3Layout.separation(function separation(a, b) {
                return (a.parent === b.parent ? 1 : 2) / a.depth;
            });
        } else {
            this._d3Layout.nodeSize([14, this.separation()]);
            this._d3Layout.separation(function separation(a, b) {
                return a.parent === b.parent ? 1 : 2;
            });
        }

        var data = this.data();
        var dataNodes = this._d3Layout.nodes(data);
        var links = this._d3Layout.links(dataNodes);

        //  Lines  ---
        var transitionDuration = this._renderCount ? 500 : 0;
        var lines = this._renderElement.selectAll(".link").data(links);
        lines.enter().append("path")
            .attr("class", "link")
            .attr("d", this.radial() ? this._d3DiagonalRadial : this._d3Diagonal)
        ;
        lines.transition().duration(transitionDuration)
            .attr("d", this.radial() ? this._d3DiagonalRadial : this._d3Diagonal)
        ;
        lines.exit().remove();

        //  Nodes  ---
        var textOffsetX = this.circleRadius() + 2;
        function nodeTransform(d) {
            if (context.radial()) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            }
            return context.orientation() === "horizontal" ? "translate(" + d.y + "," + d.x + ")" : "translate(" + d.x + "," + d.y + ")";
        }
        var nodes = this._renderElement.selectAll(".node").data(dataNodes);
        nodes.transition().duration(transitionDuration)
            .attr("transform", nodeTransform)
        ;
        nodes.enter().append("g")
            .attr("class", "node")
            .attr("transform", nodeTransform)
            .on("click", function (d) { context.click(d); })
            .each(function (d, i) {
                var element = d3.select(this);
                element.append("circle");
                element.append("text");
            })
        ;
        nodes.select("circle")
            .attr("r", this.circleRadius())
            .style("fill", function (d) { return context._palette(d.label); })
            .append("title")
            .text(function (d) { return d.label; })
        ;
        nodes.select("text")
            .attr("dx", function (d) { 
                if (context.radial()) {
                    if (d.children) {
                        return d.x < 180 ? -textOffsetX : textOffsetX;
                    } else {
                        return d.x < 180 ? textOffsetX : -textOffsetX;
                    }
                } else if (context.orientation() === "vertical") {
                    return d.children ? textOffsetX : -textOffsetX;
                }
                return d.children ? -textOffsetX : textOffsetX;
            })
            .attr("dy", "0.25em")
            .style("text-anchor", function (d) {
                if (context.radial()) {
                    if (d.children) {
                        return d.x < 180 ? "end" : "start";
                    } else {
                        return d.x < 180 ? "start" : "end";
                    }
                } else if (context.orientation() === "vertical") {
                    return d.children ? "start" : "end";
                }
                return d.children ? "end" : "start";
            })
            .attr("transform", function (d) {
                if (context.radial()) {
                    return d.x < 180 ? null : "rotate(180)";
                } else if (context.orientation() === "vertical") {
                    return "rotate(-66)";
                }
                return null;
            })
            .text(function (d) { return d.label; })
        ;
        nodes.exit().remove();

        if (!this._renderCount) {
            context.zoomToFit();
        }
    };

    return Dendrogram;
}));
