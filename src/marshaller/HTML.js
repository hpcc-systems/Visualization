"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../layout/Grid", "./HipieDDL", "../layout/Surface", "../layout/Cell"], factory);
    } else {
        root.marshaller_HTML = factory(root.d3, root.layout_Grid, root.marshaller_HipieDDL, root.layout_Surface, root.layout_Cell);
    }
}(this, function (d3, Grid, HipieDDL, Surface, Cell) {
    function HTML() {
        Grid.call(this);
        this._class = "marshaller_HTML";
    };
    HTML.prototype = Object.create(Grid.prototype);

    HTML.prototype.publish("ddl_url", "", "string", "DDL URL");
    HTML.prototype.publish("proxy_mappings", [], "array", "Proxy Mappings");
    HTML.prototype.publish("databomb", "", "string", "Data Bomb");

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

    function createGraphData(marshaller, databomb) {
        if (databomb instanceof Object) {
        } else if (databomb){
            databomb = JSON.parse(databomb);
        }
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
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
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
        if (this.ddl_url() === "" || this.ddl_url() === this._prev_ddl_url) {
            return Grid.prototype.render.apply(this, arguments);
        }

        this._prev_ddl_url = this.ddl_url();
        var marshaller = new HipieDDL.Marshaller().proxyMappings(this.proxy_mappings());
        var context = this;
        var args = arguments;
        //this.clearContent();
        if (this.ddl_url()[0] === "[" || this.ddl_url()[0] === "{") {
            marshaller.parse(this.ddl_url(), function () {
                postParse();
            });
        } else {
            marshaller.url(this.ddl_url(), function () {
                postParse();
            });
        }
        function postParse() {
            var dashboards = createGraphData(marshaller, context.databomb());
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
