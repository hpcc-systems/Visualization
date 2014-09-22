(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget"], factory);
    } else {
        root.XYAxis = factory(root.d3, root.SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    function XYAxis(target) {
        SVGWidget.call(this);
    };
    XYAxis.prototype = Object.create(SVGWidget.prototype);

    XYAxis.prototype.enter = function (domNode, element) {
        var context = this;

        this.x = d3.scale.ordinal();
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
        ;

        x.domain(this._data.map(function (d) { return d.label; }));
        y.domain([d3.min(this._data, function (d) { return d.weight; }), d3.max(this._data, function (d) { return d.weight; })]);

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

        this.x
            .rangeRoundBands([0, width], .1)
        ;
        this.y
            .range([height, 0])
        ;

        this.xAxis
            .scale(this.x)
        ;

        this.yAxis
            .scale(this.y)
        ;

        this.svg.transition()
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

        this.x.domain(this._data.map(function (d) { return d.label; }));
        var min = d3.min(this._data, function (d) { return d.weight; });
        var max = d3.max(this._data, function (d) { return d.weight; });
        this.y.domain([min - (max - min) / 10, max]);

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
