"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./XYAxis", "../api/INDChart", "../api/ITooltip", "../common/Palette", "d3-hexbin", "css!./HexBin"], factory);
    } else {
        root.chart_HexBin = factory(root.d3, root.common_SVGWidget, root.chart_XYAxis, root.api_INDChart, root.api_ITooltip, root.common_Palette);
    }
}(this, function (d3, SVGWidget, XYAxis, INDChart, ITooltip, Palette, D3HexBin) {
    D3HexBin = D3HexBin || d3.hexbin || window.d3.hexbin;

    function HexBin(target) {
        XYAxis.call(this);
        INDChart.call(this);
        ITooltip.call(this);
        this._hexbin = new D3HexBin();

        this
            .xAxisGuideLines_default(false)
            .yAxisGuideLines_default(false)
        ;
    }
    HexBin.prototype = Object.create(XYAxis.prototype);
    HexBin.prototype.constructor = HexBin;
    HexBin.prototype._class += " chart_HexBin";
    HexBin.prototype.implements(INDChart.prototype);
    HexBin.prototype.implements(ITooltip.prototype);

    HexBin.prototype._palette = Palette.rainbow("default");

    HexBin.prototype.publish("paletteID", "Blues", "set", "Palette ID", HexBin.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    HexBin.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
    HexBin.prototype.publish("binSize", 20, "number", "Bin radius", null, {range:{min:1,max:300,step:1}});

    HexBin.prototype.xPos = function (d) {
        return this.orientation() === "horizontal" ? this.dataPos(d.label) : this.valuePos(d.value);
    };

    HexBin.prototype.yPos = function (d) {
        return this.orientation() === "horizontal" ? this.valuePos(d.value) : this.dataPos(d.label);
    };

    HexBin.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal, duration) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._hexbin
            .size([width, height])
            .radius(this.binSize())
        ;

        var data = this.flattenData();
        var dataPoints = data.map(function (d, idx) { return [context.xPos(d), context.yPos(d)]; });
        var hexBinPoints = this._hexbin(dataPoints);
        var maxBinPoints = d3.max(hexBinPoints, function (d) { return d.length; });

        var points = this.svgData.selectAll(".hexagon").data(hexBinPoints, function (d, idx) { return d.i + "_" + d.j; });
        points.enter().append("path")
            .attr("class", "hexagon")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
        ;
        points.transition().duration(duration)
            .attr("d", this._hexbin.hexagon())
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(1)"; })
            .style("fill", function (d) { return context._palette(d.length, 0, maxBinPoints); })
        ;
        points.exit().transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
            .remove()
        ;
    };

    HexBin.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return HexBin;
}));
