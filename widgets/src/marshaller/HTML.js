(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./HipieDDL"], factory);
    } else {
        root.HTML = factory(root.d3, root.Widget, root.HipieDDL);
    }
}(this, function (d3, Widget, HipieDDL) {
    function HTML(target) {
        Widget.call(this);

        this.marshaller = new HipieDDL.Marshaller();

        this._url = "";
    };
    HTML.prototype = Object.create(Widget.prototype);

    HTML.prototype.url = function (_) {
        if (!arguments.length) return this._url;
        this._url = _;
        return this;
    };
    
    HTML.prototype.proxyMappings = function (_) {
        var retVal = this.marshaller.proxyMappings(_);
        if (arguments.length) {
            return this;
        }
        return retVal;
    };

    HTML.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        this._target = _;
        return this;
    };

    HTML.prototype.size = function (_) {
        if (!arguments.length) return this._size;
        this._size = _;
        return this;
    };

    HTML.prototype.render = function () {
        var context = this;
        this.marshaller.url(this._url, function (response) {
            for (var key in context.marshaller.dashboards) {
                var dashboard = context.marshaller.dashboards[key];
                if (dashboard.visualizationTotal) {
                    var colCount = Math.ceil(Math.sqrt(dashboard.visualizationTotal));
                    var width = Math.floor(context._size.width / colCount) - 10;
                    d3.select("#" + context._target).selectAll("marshalViz").data(dashboard.visualizationsArray.filter(function (d) { return d.widget; }), function (d) {
                        return d.id;
                    }).enter().append("div")
                        .attr("class", "marshalViz")
                        .style({
                            width: width + "px",
                            height: width + "px",
                            display: "inline-block"
                        })
                        .each(function (item) {
                            var element = d3.select(this);
                            item.widget
                                .pos({ x: width / 2, y: width / 2 })
                                .size({ width: width, height: width })
                                .target(this)
                                .render()
                            ;
                        })
                    ;
                    for (var key in dashboard.datasources) {
                        dashboard.datasources[key].fetchData({}, true);
                    }
                }
            }
        });
    };

    return HTML;
}));
