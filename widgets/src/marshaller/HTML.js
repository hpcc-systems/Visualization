"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../layout/Grid", "./HipieDDL", "../layout/Surface", "../layout/Cell"], factory);
    } else {
        root.HTML = factory(root.d3, root.Grid, root.HipieDDL, root.Surface, root.Cell);
    }
}(this, function (d3, Grid, HipieDDL, Surface, Cell) {
    function HTML() {
        Grid.call(this);
        this._class = "marshaller_HTML";
    };
    HTML.prototype = Object.create(Grid.prototype);

    HTML.prototype.publish("ddl_url", "", "string", "DDL URL");
    HTML.prototype.publish("proxy_mappings", [], "array", "Proxy Mappings");

    HTML.prototype.testData = function () {
        //this.ddl_url("http://10.239.227.24:8010/WsWorkunits/WUResult?Wuid=W20150311-200229&ResultName=leeddx_issue_652_nestedfunctions_Comp_Ins002_DDL");
        return this;
    };

    HTML.prototype.content = function () {
        return Grid.prototype.content.apply(this, arguments);
    };

    HTML.prototype.setContent = function (row, col, widget, title, rowSpan, colSpan) {
        return Grid.prototype.setContent.apply(this, arguments);
    };

    HTML.prototype.enter = function (domNode, element) {
        Grid.prototype.enter.apply(this, arguments);
    };

    function createGraphData(marshaller) {
        var curr = null;
        var dashboards = {};
        marshaller.accept({
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        visualizations: [],
                    };
                    dashboards[item.getQualifiedID()] = curr;
                } else if (item instanceof HipieDDL.DataSource) {
                } else if (item instanceof HipieDDL.Output) {
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        curr.visualizations.push(item);
                    }
                }
            }
        });
        return dashboards;
    };

    HTML.prototype.render = function (callback) {
        if (this._ddl_url === "" || this._ddl_url === this._prev_ddl_url) {
            return Grid.prototype.render.apply(this, arguments);
        }

        this._prev_ddl_url = this._ddl_url;
        var marshaller = new HipieDDL.Marshaller().proxyMappings(this._proxy_mappings);
        var context = this;
        var args = arguments;
        //this.clearContent();
        if (this._ddl_url[0] === "[" || this._ddl_url[0] === "{") {
            marshaller.parse(this._ddl_url, function () {
                postParse();
            });
        } else {
            marshaller.url(this._ddl_url, function () {
                postParse();
            });
        }
        function postParse() {
            var dashboards = createGraphData(marshaller);
            var row = 0;
            for (var key in dashboards) {
                var cellRow = 0;
                var cellCol = 0;
                var maxCol = Math.floor(Math.sqrt(dashboards[key].visualizations.length));
                dashboards[key].visualizations.forEach(function (viz, idx) {
                    if (idx && (idx % maxCol === 0)) {
                        cellRow++;
                        cellCol = 0;
                    }
                    viz.widget.size({ width: 0, height: 0 });
                    var existingWidget = context.getContent(viz.widget._id);
                    if (existingWidget) {
                        viz.setWidget(existingWidget, true);
                    } else {
                        var d = 0;
                        context.setContent(cellRow, cellCol, viz.widget, viz.title);
                    }
                    cellCol++;
                });
                for (var key2 in dashboards[key].dashboard.datasources) {
                    dashboards[key].dashboard.datasources[key2].fetchData({}, true);
                }
            }
            Grid.prototype.render.call(context, function (widget) {
                if (callback) {
                    callback(widget);
                }
            });
        }
        return this;
    }

    return HTML;
}));
