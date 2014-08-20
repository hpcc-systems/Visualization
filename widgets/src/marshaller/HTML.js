(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/D3Widget", "./HipieDDL"], factory);
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
                    dashboard.visualizationsArray.forEach(function (item) {
                        if (item.widget) {
                            item.widget
                                .pos({ x: width / 2, y: width / 2 })
                                .size({ width: width, height: width })
                                .target(context._target)
                                .render()
                            ;
                        }
                    });
                    for (var key in dashboard.datasources) {
                        dashboard.datasources[key].processResponse(response);
                    }
                }
            }
        });
    };

    return HTML;
}));
