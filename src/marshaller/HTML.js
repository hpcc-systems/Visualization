"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../layout/Grid", "./HipieDDL", "../layout/Surface", "../layout/Cell", "../layout/Popup", "../other/Persist", "./FlyoutButton"], factory);
    } else {
        root.marshaller_HTML = factory(root.d3, root.layout_Grid, root.marshaller_HipieDDL, root.layout_Surface, root.layout_Cell, root.layout_Popup, root.other_Persist, root.marshaller_FlyoutButton);
    }
}(this, function (d3, Grid, HipieDDL, Surface, Cell, Popup, Persist, FlyoutButton) {
    function HTML() {
        Grid.call(this);

        this.surfacePadding(0);
    }
    HTML.prototype = Object.create(Grid.prototype);
    HTML.prototype.constructor = HTML;
    HTML.prototype._class += " marshaller_HTML";

    HTML.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:["Private"]});
    HTML.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:["Private"]});
    HTML.prototype.publish("proxyMappings", {}, "object", "Proxy Mappings",null,{tags:["Private"]});
    HTML.prototype.publish("clearDataOnUpdate", true, "boolean", "Clear data prior to refresh", null);
    HTML.prototype.publish("propogateClear", false, "boolean", "Propogate clear to dependent visualizations", null);
    HTML.prototype.publish("missingDataString", "***MISSING***", "string", "Missing data display string");

    HTML.prototype.enter = function(domNode, element) {
        Grid.prototype.enter.apply(this, arguments);
        this.popupContainer = element.append("div")
            .classed("popup-container", true)
            .style({"height": "100px", "position": "absolute","z-index":1000}); // have it figure out z-index of parent and make it 1 more?
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

    HTML.prototype.render = function (callback) {
        if (this.ddlUrl() === "" || (this.ddlUrl() === this._prev_ddlUrl && this.databomb() === this._prev_databomb)) {
            if (this.marshaller) {
                this.marshaller
                    .proxyMappings(this.proxyMappings())
                    .clearDataOnUpdate(this.clearDataOnUpdate())
                    .propogateClear(this.propogateClear())
                    .missingDataString(this.missingDataString())
                ;
            }
            return Grid.prototype.render.apply(this, arguments);
        } else if (this._prev_ddlUrl && this._prev_ddlUrl !== this.ddlUrl()) {
            //  DDL has actually changed (not just a deserialization)
            this
                .clearContent()
            ;
        }
        this._prev_ddlUrl = this.ddlUrl();
        this._prev_databomb = this.databomb();

        //  Gather existing widgets for reuse  ---
        var widgetArr = [];
        Persist.widgetArrayWalker(this.content(), function (w) {
            widgetArr.push(w);
        });
        var widgetMap = d3.map(widgetArr, function (d) {
            return d.id();
        });
        var removedMap = d3.map(widgetArr.filter(function (d) { return d.id().indexOf(d._idSeed) !== 0 && d.id().indexOf("_pe") !== 0; }), function (d) {
            return d.id();
        });
        var context = this;
        this.marshaller = new HipieDDL.Marshaller()
            .proxyMappings(this.proxyMappings())
            .clearDataOnUpdate(this.clearDataOnUpdate())
            .propogateClear(this.propogateClear())
            .missingDataString(this.missingDataString())
            .widgetMappings(widgetMap)
            .on("commsError", function (source, error) {
                context.commsError(source, error);
            })
        ;

        //  Parse DDL  ---
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
            for (var key in dashboards) {
                var popupVisualizations = [];
                var mainVisualizations = [];
                dashboards[key].visualizations.forEach(function (viz, idx) {
                    removedMap.remove(viz.id);
                    if (viz.properties.flyout) {
                        popupVisualizations.push(viz);
                    } else {
                        mainVisualizations.push(viz);
                    }
                });
                removedMap.forEach(function (key, value) {
                    context.clearContent(value);
                });
                var cellRow = 0;
                var cellCol = 0;
                var cellDensity = context.cellDensity();
                var maxCol = Math.floor(Math.sqrt(mainVisualizations.length));
                mainVisualizations.forEach(function (viz, idx) {
                    if (!context.marshaller.widgetMappings().get(viz.id)) {
                        var widgetSurface = null;
                        if (viz.widget instanceof Surface || viz.widget.classID() === "composite_MegaChart") {
                            widgetSurface = viz.widget;
                        } else {
                            widgetSurface = new Surface()
                                .widget(viz.widget)
                            ;
                        }
                        viz.widget.size({ width: 0, height: 0 });
                        widgetSurface.title(viz.title);
                        while (context.getCell(cellRow * cellDensity, cellCol * cellDensity) !== null) {
                            cellCol++;
                            if (cellCol % maxCol === 0) {
                                cellRow++;
                                cellCol = 0;
                            }
                        }
                        context.setContent(cellRow, cellCol, widgetSurface);
                    }
                });

                popupVisualizations.forEach(function (viz, idx) {
                    var targetVizs = viz.events.getUpdatesVisualizations();
                    targetVizs.forEach(function (targetViz) {
                        switch (targetViz.widget.classID()) {
                            case "composite_MegaChart":
                                var flyoutButton = new FlyoutButton()
                                    .title(viz.title)
                                    .widget(viz.widget)
                                ;
                                targetViz.widget.toolbarWidgets().push(flyoutButton);
                                break;
                        }
                    });
                });
            }

            var vizCellMap = {};
            context.content().forEach(function (cell) {
                var widget = cell.widget();
                if (widget && widget.classID() === "layout_Surface") {
                    widget = widget.widget();
                }
                if (widget) {
                    vizCellMap[widget.id()] = cell;
                }
            });

            for (key in dashboards) {
                dashboards[key].visualizations.forEach(function (viz, idx) {
                    if (viz.properties.flyout) {
                        return;
                    }
                    var targetVizs = viz.events.getUpdatesVisualizations();
                    var targetIDs = targetVizs.map(function (targetViz) {
                        return vizCellMap[targetViz.id].id();
                    });
                    vizCellMap[viz.id].indicateTheseIds(targetIDs);
                });
            }

            Grid.prototype.render.call(context, function (widget) {
                for (var dashKey in dashboards) {
                    for (var dsKey in dashboards[dashKey].dashboard.datasources) {
                        dashboards[dashKey].dashboard.datasources[dsKey].fetchData({}, true);
                    }
                }
                var timeoutCounter = 0;
                var intervalHandler = setInterval(function () {
                    if (context.marshaller.commsDataLoaded() || ++timeoutCounter > 120) {
                        clearInterval(intervalHandler);
                        if (callback) {
                            callback(widget);
                        }
                    }
                }, 500);
            });
        }
        return this;
    };

    HTML.prototype.commsError = function (source, error) {
        alert("Comms Error:\n" + source + "\n" + error);
    };

    return HTML;
}));
