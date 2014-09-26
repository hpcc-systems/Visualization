(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget"], factory);
    } else {
        root.XYAxis = factory(root.d3, root.SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    function XYAxis(target) {
        SVGWidget.call(this);

        this._data[0] = [];
        this._xScale = "ordinal";
    };
    XYAxis.prototype = Object.create(SVGWidget.prototype);


    XYAxis.prototype.data = function (_) {
        if (!arguments.length) return SVGWidget.prototype.data.apply(this, arguments);

        var data = [];
        data[0] = [];
        _.map(function (row) {
            if (row instanceof Array) {
                row.forEach(function (item, idx) {
                    if (!data[idx]) {
                        data[idx] = [];
                    }
                    data[idx].push(item);
                }, this);
            } else {
                if (!data[0]) {
                    data[0] = [];
                }
                data[0].push(row);
            }
        }, this);
        return SVGWidget.prototype.data.call(this, data);
    };

    XYAxis.prototype.enter = function (domNode, element) {
        var context = this;

        this.x = null;
        switch (this._xScale) {
            case "time":
                this.x = d3.time.scale();
                break;
            default:
                this.x = d3.scale.ordinal();
                break;
        }
        this.y = d3.scale.linear();

        this.xAxis = d3.svg.axis()
            .orient("bottom")
        ;

        this.yAxis = d3.svg.axis()
            .orient("left")
            .ticks(10)
        ;

        this.recenterG = element.append("g");
        this.svg = this.recenterG.append("g");
        this.svgData = this.svg.append("g");
        this.svgXAxis = this.svg.append("g")
            .attr("class", "x axis")
        ;
        this.svgYAxis = this.svg.append("g")
            .attr("class", "y axis")
        ;
    };

    XYAxis.prototype.calcMargin = function (domNode, element) {
        var margin = { top: 8, right: 0, bottom: 24, left: 40 };
        var width = this.width() - margin.left - margin.right,
            height = this.height() - margin.top - margin.bottom;

        var test = element.append("g");

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1)
        ;
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(x)
        ;
        var y = d3.scale.linear()
            .range([height, 0])
        ;
        var yAxis = d3.svg.axis()
            .orient("left")
            .scale(y)
            .tickFormat(d3.format(".2s"))
        ;

        x.domain(this._data[0].map(function (d) { return d.label; }));
        y.domain([d3.min(this._data, function (data) { 
            return d3.min(data, function (d) { return d.weight; });
        }), d3.max(this._data, function (data) {
            return d3.max(data, function (d) { return d.weight; });
        })]);

        var svgXAxis = test.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        ;
        var svgYAxis = test.append("g")
            .attr("class", "y axis")
            .call(yAxis)
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
        var margin = this.calcMargin(domNode, element);

        var width = this.width() - margin.left - margin.right,
            height = this.height() - margin.top - margin.bottom;

        if (this.x.rangeRoundBands) {
            this.x
                .rangeRoundBands([0, width], .1)
            ;
        }

        this.y
            .range([height, 0])
        ;

        this.xAxis
            .scale(this.x)
        ;

        this.yAxis
            .scale(this.y)
            .tickFormat(d3.format(".2s"))
        ;

        this.svg.transition()
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

        this.x.domain(this._data[0].map(function (d) { return d.label; }));
        var min = d3.min(this._data, function (data) {
            return d3.min(data, function (d) { return d.weight; });
        });
        var max = d3.max(this._data, function (data) {
            return d3.max(data, function (d) { return d.weight; });
        });
        var newMin = min - (max - min) / 10;
        if (min >= 0 && newMin < 0)
            newMin = 0;
        this.y.domain([newMin, max]);

        this.svgXAxis.transition()
            .attr("transform", "translate(0," + height + ")")
            .call(this.xAxis)
        ;

        this.svgYAxis.transition()
            .call(this.yAxis)
        ;

        this.updateChart(domNode, element, margin, width, height);

        this.recenterG.transition()
            .attr("transform", "translate(" + -this.width() / 2 + "," + -this.height() / 2 + ")")
        ;
    };

    XYAxis.prototype.updateChart = function (domNode, element, margin, width, height) {
    };

    return XYAxis;
}));
