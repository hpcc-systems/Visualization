(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/SVGWidget", "./IWordCloud", "d3/d3", "lib/wordcloud/d3.layout.cloud", "css!./WordCloud"], factory);
    } else {
        root.Entity = factory(root.SVGWidget, root.IWordCloud, root.d3, root.d3LayoutCloud);
    }
}(this, function (SVGWidget, IWordCloud, d3, d3LayoutCloud) {
    function WordCloud() {
        SVGWidget.call(this);
        IWordCloud.call(this);

        this._class = "WordCloud";
    };
    WordCloud.prototype = Object.create(SVGWidget.prototype);
    WordCloud.prototype.implements(IWordCloud.prototype);

    WordCloud.prototype.font = function (_) {
        if (!arguments.length) return this._font;
        this._font = _;
        return this;
    };

    WordCloud.prototype.words = function (_) {
        if (!arguments.length) return this._words;
        this._words = _;
        return this;
    };

    WordCloud.prototype.enter = function (domNode, element) {
        this.cloud = d3.layout.cloud().size([this.width(), this.height()])
            .padding(2)
            .font(this._font)
            .fontSize(function (d) { return d.size; })
        ;
    };

    WordCloud.prototype.update = function (domNode, element) {
        var context = this;
        if (this._words.length && this._words[0].__viz_bounds !== undefined && false) {
            draw(this._words, this._words[0].__viz_bounds);
        } else {
            this.cloud
                .words(this._words)
                .rotate(function () {
                    if (context._words.length > 333) {
                        return ~~(Math.random() * 2) * 90 - 90;
                    }
                    return Math.random() * 180 - 90;
                })
                .on("end", draw)
                .start()
            ;
        }

        var context = this;
        function draw(data, bounds) {
            if (data.length) {
                data[0].__viz_bounds = bounds;
            }
            var w = context.width();
            var h = context.height();
            var fill = d3.scale.category20();

            scale = bounds ? Math.min(
                w / Math.abs(bounds[1].x - w / 2),
                w / Math.abs(bounds[0].x - w / 2),
                h / Math.abs(bounds[1].y - h / 2),
                h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
            words = data;
            var text = element.selectAll("text")
                .data(words, function(d) { return d.text.toLowerCase(); });
            text.transition()
                .duration(1000)
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function(d) { return d.size + "px"; });
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function(d) { return d.size + "px"; })
                .on("click", function(d) {
                    load(d.text);
                })
                .style("opacity", 1e-6)
              .transition()
                .duration(1000)
                .style("opacity", 1);
            text.style("font-family", function(d) { return d.font; })
                .style("fill", function(d) { return fill(d.text.toLowerCase()); })
                .text(function(d) { return d.text; });
            var exitGroup = context._parentElement.append("g")
                .attr("transform", element.attr("transform"));
            var exitGroupNode = exitGroup.node();
            text.exit().each(function() {
                exitGroupNode.appendChild(this);
            });
            exitGroup.transition()
                .duration(1000)
                .style("opacity", 1e-6)
                .remove();
            element.transition()
                .delay(1000)
                .duration(750)
                .attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
        }
    };

    return WordCloud;
}));
