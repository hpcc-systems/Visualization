"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./ITree", "../common/Text", "../common/FAChar", "css!./CirclePacking"], factory);
    } else {
        root.CirclePacking = factory(root.d3, root.SVGWidget, root.ITree, root.Text, root.FAChar);
    }
}(this, function (d3, SVGWidget, ITree, Text, FAChar) {
    function CirclePacking(target) {
        SVGWidget.call(this);
        ITree.call(this);
        this._class = "tree_CirclePacking";
    };
    CirclePacking.prototype = Object.create(SVGWidget.prototype);
    CirclePacking.prototype.implements(ITree.prototype);

    CirclePacking.prototype.enter = function (domNode, element) {
        var context = this;

        this.diameter = Math.min(this.width(), this.height());

        this.pack = d3.layout.pack()
            .size([this.diameter - 4, this.diameter - 4])
            .value(function (d) {
                return 1;
            })
        ;

        this.svg = element
            .append("g")
            .attr("transform", "rotate(30)")
    };

    CirclePacking.prototype.update = function (domNode, element) {
        var context = this;

        this.svg.selectAll("circle").remove();
        this.svg.selectAll("text").remove();

        var root = this._data;
        var focus = root;
        var nodes = this.pack.nodes(root);

        this.circle = this.svg.selectAll("circle")
            .data(nodes)
          .enter().append("circle")
            .attr("class", function (d) { return d.parent ? d.children ? "node" : "node leaf" : "node root"; })
            .style("fill", function (d) { return context._palette(d.label); })
            .on("click", function (d) { if (focus !== d) context.zoom(d), d3.event.stopPropagation(); })
        ;

        var text = this.svg.selectAll("text")
            .data(nodes)
          .enter()
            .append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
            .style("display", function (d) { return d.parent === root ? null : "none"; })
            .text(function (d) { return d.label; })
        ;

        this.node = this.svg.selectAll("circle,text");

        this.zoomTo([root.x, root.y, root.r * 2]);
    };

    CirclePacking.prototype.zoom = function (d) {
        var context = this;
        var focus0 = focus;
        var focus = d;

        var zoomCircleSel = this.svg.selectAll("circle")
          .filter(function (d) { return d === focus; })
        ;
        var zoomTextSel = this.svg.selectAll("text")
          .filter(function (d) { return d !== focus && this.style.display === "inline"; })
        ;
        zoomTextSel.transition().duration(500)
            .style("opacity", 0)
            .each("end", function (d) {
                if (d !== focus) {
                    d3.select(this)
                        .style("display", "none")
                        .style("opacity", 1)
                    ;
                }
            })
        ;

        var transition = d3.transition()
            .delay(1000)
            .duration(3000)
            .tween("zoom", function (d) {
                var i = d3.interpolateZoom(context.view, [focus.x, focus.y, focus.r * 2]);
                return function (t) { context.zoomTo(i(t)); };
            });

        transition.selectAll("text")
          .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
            .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
            .each("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
            .each("end", function (d) {
                if (d.parent !== focus) {
                    this.style.display = "none";
                }
            })
        ;
    };

    CirclePacking.prototype.zoomTo = function (v) {
        var k = this.diameter / v[2];
        this.view = v;
        this.node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")rotate(-30)"; });
        this.circle.attr("r", function (d) { return d.r * k; });
    };

    return CirclePacking;
}));
