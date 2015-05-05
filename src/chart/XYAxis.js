"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget"], factory);
    } else {
        root.chart_XYAxis = factory(root.d3, root.common_SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    function XYAxis(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this._xScale = "";
        this.parseDate = d3.time.format("%Y-%m-%d").parse;
    };
    XYAxis.prototype = Object.create(SVGWidget.prototype);

    XYAxis.prototype.xScale = function (_) {
        if (!arguments.length) return this._xScale;
        this._xScale = _;
        return this;
    };

    XYAxis.prototype.enter = function (domNode, element) {
        var context = this;

        this.x = null;
        switch (this._xScale) {
            case "DATE":
                this.x = d3.time.scale();
                break;
            default:
                this.x = d3.scale.ordinal();
                break;
        }
        this.y = d3.scale.linear();

        this.xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(this.x)
        ;

        this.yAxis = d3.svg.axis()
            .orient("left")
            .scale(this.y)
            .tickFormat(d3.format(".2s"))
            .ticks(10)
        ;

        this.svg = element.append("g");
        this.svgData = this.svg.append("g");
        this.svgXAxis = this.svg.append("g")
            .attr("class", "x axis")
        ;
        this.svgYAxis = this.svg.append("g")
            .attr("class", "y axis")
        ;
    };

    XYAxis.prototype.calcMargin = function (domNode, element) {
        var context = this;
        var margin = { top: 8, right: 0, bottom: 24, left: 40 };
        var width = this.width() - margin.left - margin.right,
            height = this.height() - margin.top - margin.bottom;

        var test = element.append("g");

        var svgXAxis = test.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.xAxis)
        ;
        var svgYAxis = test.append("g")
            .attr("class", "y axis")
            .call(this.yAxis)
        ;

        var x_bbox = svgXAxis.node().getBBox();
        var y_bbox = svgYAxis.node().getBBox();
        margin.bottom = x_bbox.height;
        margin.left = y_bbox.width;
        test.remove();
        return margin;
    }

    XYAxis.prototype.update = function (domNode, element) {
        var context = this;

        //  Update Domain  ---
        switch (this._xScale) {
            case "DATE":
                var min = d3.min(this._data, function (data) {
                    return d3.min(data, function (d) { return context.parseDate(d[0]); });
                });
                var max = d3.max(this._data, function (data) {
                    return d3.max(data, function (d) { return context.parseDate(d[0]); });
                });
                this.x.domain([min, max]);
                break;
            default:
                this.x.domain(this._data.map(function (d) { return d[0]; }));
                break;
        }
        var min = d3.min(this._data, function (data) {
            return d3.min(data.filter(function (cell, i) { return i > 0 && context._columns[i] && context._columns[i].indexOf("__") !== 0; }), function (d) { return d; });
        });
        var max = d3.max(this._data, function (data) {
            return d3.max(data.filter(function (row, i) { return i > 0 && context._columns[i] && context._columns[i].indexOf("__") !== 0; }), function (d) { return d; });
        });
        var newMin = min - (max - min) / 10;
        if (min >= 0 && newMin < 0)
            newMin = 0;
        this.y.domain([newMin, max]);

        //  Calculate Range  ---
        if (this.x.rangeRoundBands) {
            this.x.rangeRoundBands([0, this.width()], .1);
        } else if (this.x.rangeRound) {
            this.x.range([0, this.width()]);
        }
        this.y.range([this.height(), 0]);
        var margin = this.calcMargin(domNode, element);

        //  Update Range  ---
        var width = this.width() - margin.left - margin.right,
            height = this.height() - margin.top - margin.bottom;

        if (this.x.rangeRoundBands) {
            this.x.rangeRoundBands([0, width], .1);
        } else if (this.x.rangeRound) {
            this.x.range([0, width]);
        }
        this.y.range([height, 0]);

        //  Render  ---
        this.svg.transition()
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

        this.svgXAxis.transition()
            .attr("transform", "translate(0," + height + ")")
            .call(this.xAxis)
        ;

        this.svgYAxis.transition()
            .call(this.yAxis)
        ;

        this.updateChart(domNode, element, margin, width, height);
    };

    XYAxis.prototype.updateChart = function (domNode, element, margin, width, height) {
    };

    return XYAxis;
}));
