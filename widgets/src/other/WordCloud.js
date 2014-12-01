(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/SVGWidget", "./IWordCloud", "d3/d3", "css!./WordCloud"], factory);
    } else {
        root.Entity = factory(root.SVGWidget, root.IWordCloud, root.d3);
    }
}(this, function (SVGWidget, IWordCloud, d3) {
    var cloudLoaded = false;
    require(["lib/wordcloud/d3.layout.cloud"], function (d3LayoutClout) {
        cloudLoaded = true;
    });
    function WordCloud() {
        SVGWidget.call(this);
        IWordCloud.call(this);

        this._font = "Verdana";
        this._class = "wordcloud";

        this._padding = 1;
        this._angleFrom = -60;
        this._angleTo = 60;
        this._angleCount = 5;
        this._fontSizeFrom = 10;
        this._fontSizeTo = 48;
    };
    WordCloud.prototype = Object.create(SVGWidget.prototype);
    WordCloud.prototype.implements(IWordCloud.prototype);

    WordCloud.prototype.font = function (_) {
        if (!arguments.length) return this._font;
        this._font = _;
        return this;
    };

    WordCloud.prototype.angleFrom = function (_) {
        if (!arguments.length) return this._angleFrom;
        this._angleFrom = _;
        return this;
    };

    WordCloud.prototype.angleTo = function (_) {
        if (!arguments.length) return this._angleTo;
        this._angleTo = _;
        return this;
    };

    WordCloud.prototype.fontSizeFrom = function (_) {
        if (!arguments.length) return this._fontSizeFrom;
        this._fontSizeFrom = _;
        return this;
    };

    WordCloud.prototype.fontSizeTo = function (_) {
        if (!arguments.length) return this._fontSizeTo;
        this._fontSizeTo = _;
        return this;
    };

    WordCloud.prototype.angleTo = function (_) {
        if (!arguments.length) return this._angleTo;
        this._angleTo = _;
        return this;
    };

    WordCloud.prototype.angleCount = function (_) {
        if (!arguments.length) return this._angleCount;
        this._angleCount = _;
        return this;
    };

    WordCloud.prototype.padding = function (_) {
        if (!arguments.length) return this._padding;
        this._padding = _;
        return this;
    };

    WordCloud.prototype.data = function (_) {
        if (!arguments.length) return this._data;
        this._data = _.map(function (row) {
            var retVal = {};
            for (key in row) {
                retVal["__viz_" + key] = row[key];
            }
            return retVal;
        });
        return this;
    };

    WordCloud.prototype.enter = function (domNode, element) {
        this.cloud = d3.layout.cloud()
            .font(this._font)
            .padding(this._padding)
        ;
        this.svg = element.append("g");
    };

    WordCloud.prototype.update = function (domNode, element) {
        var context = this;
        var extent = d3.extent(this._data, function (d) {
            return d.__viz_1;
        });
        var scale = d3.scale.log().domain(extent).range([this._fontSizeFrom, this._fontSizeTo]);

        var angleDomain = d3.scale.linear().domain([0, context._angleCount - 1]).range([context._angleFrom, context._angleTo]);

        this.cloud
            .size([this.width(), this.height()])
            .words(this._data)
            .rotate(function () {
                return angleDomain(~~(Math.random() * context._angleCount));
            })
            .fontSize(function (d) {
                return scale(d.__viz_1);
            })
            .on("end", draw)
            .start()
        ;

        function draw(data, bounds) {
            var fill = d3.scale.category20();
            var text = context.svg.selectAll("text")
                .data(data, function (d) { return d.__viz_0.toLowerCase(); })
            ;
            text.transition()
                .duration(1000)
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function (d) {
                    return scale(d.__viz_1) + "px";
                })
                .style("opacity", 1)
            ;
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function(d) { 
                    return scale(d.__viz_1) + "px";
                })
                .style("font-family", function (d) { return d.font; })
                .style("fill", function (d) { return fill(d.__viz_0.toLowerCase()); })
                .text(function (d) { return d.__viz_0; })
                .on("click", function (d) {
                    context.click({label:  d.__viz_0, weight: d.__viz_1});
                })
                .style("opacity", 1e-6)
              .transition()
                .duration(1000)
                .style("opacity", 1)
            ;

            text.exit().transition().duration(1000)
                .style("opacity", 1e-4)
                .remove()
            ;

            if (bounds) {
                var w = context.width();
                var h = context.height();
                var dx = bounds[1].x - bounds[0].x,
                    dy = bounds[1].y - bounds[0].y,
                    borderScale = .9 / Math.max(dx / w, dy / h);
                context.svg.transition().delay(1000).duration(750)
                    .attr("transform", "scale(" + borderScale + ")")
                ;
            }
        }
    };

    return WordCloud;
}));
