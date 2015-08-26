"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../layout/Tabbed", "../layout/Grid", "./HipieDDL", "../layout/Surface", "../layout/Cell"], factory);
    } else {
        root.marshaller_Tabbed = factory(root.d3, root.layout_Tabbed, root.layout_Grid, root.marshaller_HipieDDL, root.layout_Surface, root.layout_Cell);
    }
}(this, function (d3, TabbedLayout, Grid, HipieDDL, Surface, Cell) {
    function Tabbed() {
        TabbedLayout.call(this);
    }
    Tabbed.prototype = Object.create(TabbedLayout.prototype);
    Tabbed.prototype.constructor = Tabbed;
    Tabbed.prototype._class += " marshaller_Tabbed";

    Tabbed.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:["Private"]});
    Tabbed.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:["Private"]});
    Tabbed.prototype.publish("proxyMappings", {}, "object", "Proxy Mappings",null,{tags:["Private"]});

    Tabbed.prototype.publish("designMode", false, "boolean", "Design Mode", null, { tags: ["Basic"] });

    Tabbed.prototype.testData2 = function () {
        this.ddlUrl("http://10.241.100.159:8002/WsEcl/submit/query/roxie/hipie_testrelavator3.ins002_service/json");
        //this.ddlUrl("http://10.173.147.1:8010/wsWorkunits/WUResult?Wuid=W20150617-115910&ResultName=leeddx_issue_780_formwidget_Comp_Ins002_DDL");
        //this.ddlUrl("http://10.173.147.1:8010/wsWorkunits/WUResult?Wuid=W20150617-120745&ResultName=leeddx_issue_780_formtablewidget_Comp_Ins002_DDL");
        //this.ddlUrl("http://10.241.100.159:8002/WsEcl/submit/query/roxie/hipie_testrelavator2.ins002_service/json");
        return this;
    };

    Tabbed.prototype._origDesignMode = Tabbed.prototype.designMode;
    Tabbed.prototype.designMode = function (_) {
        var retVal = Tabbed.prototype._origDesignMode.apply(this, arguments);
        if (arguments.length) {
            this.widgets().forEach(function (gridSurface) {
                gridSurface.widget().designMode(_);
            });
        }
        return retVal;
    };

    function walkDashboards(marshaller, databomb) {
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
                        visualizations: []
                    };
                    dashboards[item.getQualifiedID()] = curr;
                } else if (item instanceof HipieDDL.DataSource) {
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (item.dataSource.databomb) {
                        item.dataSource.comms.databombOutput(item.from);
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        curr.visualizations.push(item);
                    }
                }
            }
        });
        return dashboards;
    }

    Tabbed.prototype.render = function (callback) {
        if (this.ddlUrl() === "" || (this.ddlUrl() === this._prev_ddlUrl && this.databomb() === this._prev_databomb)) {
            return TabbedLayout.prototype.render.apply(this, arguments);
        } else if (this._prev_ddlUrl && this._prev_ddlUrl !== this.ddlUrl()) {
            //  DDL has actually changed (not just a deserialization)
            this
                .clearTabs()
            ;
        }
        this._prev_ddlUrl = this.ddlUrl();
        this._prev_databomb = this.databomb();

        //  Gather existing widgets for reuse  ---
        var tabContent = [];
        this.widgets().forEach(function (d) {
            tabContent = tabContent.concat(d.widget().content());
        });
        this.marshaller = new HipieDDL.Marshaller()
            .proxyMappings(this.proxyMappings())
            .widgetMappings(d3.map(tabContent.map(function (d) {
                return d.widget();
            }), function (d) {
                return d.id();
            }))
        ;

        //  Parse DDL  ---
        var context = this;
        if (this.ddlUrl()[0] === "[" || this.ddlUrl()[0] === "{") {
            this.marshaller.parse(this.ddlUrl(), function () {
                populateContent();
            });
        } else {
            this.marshaller.url(this.ddlUrl(), function () {
                populateContent();
            });
        }

        function populateContent() {
            var dashboards = walkDashboards(context.marshaller, context.databomb());
            if (!tabContent.length) {
                if (context.marshaller.dashboardTotal <= 1) {
                    context.showTabs(false);
                }
                for (var key in dashboards) {
                    var grid = new Grid();
                    context.addTab(grid, dashboards[key].dashboard.title);
                    var cellRow = 0;
                    var cellCol = 0;
                    var maxCol = Math.floor(Math.sqrt(dashboards[key].visualizations.length));
                    dashboards[key].visualizations.forEach(function (viz, idx) {
                        if (idx && (idx % maxCol === 0)) {
                            cellRow++;
                            cellCol = 0;
                        }
                        viz.widget.size({ width: 0, height: 0 });
                        grid.setContent(cellRow, cellCol, viz.widget, viz.title);
                        cellCol++;
                    });
                }
            }
            for (var dashKey in dashboards) {
                for (var dsKey in dashboards[dashKey].dashboard.datasources) {
                    dashboards[dashKey].dashboard.datasources[dsKey].fetchData({}, true);
                }
            }
            TabbedLayout.prototype.render.call(context, function (widget) {
                if (callback) {
                    callback(widget);
                }
            });
        }
        return this;
    };

    return Tabbed;
}));
