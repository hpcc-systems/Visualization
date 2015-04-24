"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./ITree", "../common/Text", "../common/FAChar", "css!./SunburstPartition"], factory);
    } else {
        root.tree_SunburstPartition = factory(root.d3, root.common_SVGWidget, root.tree_ITree, root.common_Text, root.common_FAChar);
    }
}(this, function (d3, SVGWidget, ITree, Text, FAChar) {
    function SunburstPartition(target) {
        SVGWidget.call(this);
        ITree.call(this);
        this._class = "tree_SunburstPartition";
    };
    SunburstPartition.prototype = Object.create(SVGWidget.prototype);
    SunburstPartition.prototype.implements(ITree.prototype);

    SunburstPartition.prototype.publish("paletteID", "default", "set", "Palette ID", SunburstPartition.prototype._palette.switch());

    SunburstPartition.prototype.root = function (_) {
        if (!arguments.length) return this._root || this._data;
        this._root = _;

        if (this.svg) {
            this.svg.selectAll("path").transition()
                .duration(750)
                .attrTween("d", this.arcTweenFunc(this._root))
            ;
        }
        return this;
    };

    SunburstPartition.prototype.data = function () {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._resetRoot = true;
        }
        return this;
    };

    SunburstPartition.prototype.enter = function (domNode, element) {
        var context = this;

        this.radius = Math.min(this.width(), this.height()) / 2;

        this._xScale = d3.scale.linear()
            .range([0, 2 * Math.PI])
        ;

        this._yScale = d3.scale.sqrt()
            .range([0, this.radius])
        ;

        this.partition = d3.layout.partition()
            .value(function (d) {
                return d.value !== undefined ? d.value : 1;
            })
        ;

        this.arc = d3.svg.arc()
            .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, context._xScale(d.x))); })
            .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, context._xScale(d.x + d.dx))); })
            .innerRadius(function (d) { return Math.max(0, context._yScale(d.y)); })
            .outerRadius(function (d) { return Math.max(0, context._yScale(d.y + d.dy)); })
        ;

        this.svg = element.append("g");
    };

    SunburstPartition.prototype.update = function (domNode, element) {
        var context = this;

        this._palette = this._palette.switch(this._paletteID);
        this.radius = Math.min(this.width(), this.height()) / 2;
        this._xScale.range([0, 2 * Math.PI]);
        this._yScale.range([0, this.radius]);

        this._dataNodes = this.partition.nodes(this._data);
        var paths = this.svg.selectAll("path").data(this._dataNodes, function (d, i) { return d.id !== undefined ? d.id : i; });
        var path = paths.enter().append("path")
            .on("click", function (d) { context.click(d); })
            .on("dblclick", dblclick)
            .append("title")
        ;
        paths
            .attr("d", this.arc)
            .style("fill", function (d) {
                return d.__viz_fill ? d.__viz_fill : context._palette(d.label);
            })
            .style("stroke", function (d) {
                return d.value > 16 ? "white" : "none";
            })
            .select("title")
                .text(function (d) { return d.label })
        ;

        paths.exit().remove();

        if (this._resetRoot) {
            this._resetRoot = false;
            this.root(this._dataNodes[0]);
        }

        function dblclick(d) {
            if (d3.event) {
                d3.event.stopPropagation();
            }
            context.root(d);
        }
    };

    SunburstPartition.prototype.arcTweenFunc = function (d) {
        var xd = d3.interpolate(this._xScale.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(this._yScale.domain(), [d.y, 1]),
            yr = d3.interpolate(this._yScale.range(), [d.y ? 20 : 0, this.radius]);
        var context = this;
        return function (d, i) {
            return i
                ? function (t) { return context.arc(d); }
                : function (t) { context._xScale.domain(xd(t)); context._yScale.domain(yd(t)).range(yr(t)); return context.arc(d); };
        };
    };

    return SunburstPartition;
}));
