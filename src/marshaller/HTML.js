"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../layout/Grid", "./HipieDDL", "../layout/Surface", "../layout/Cell", "../layout/Popup", "../other/Persist"], factory);
    } else {
        root.marshaller_HTML = factory(root.d3, root.layout_Grid, root.marshaller_HipieDDL, root.layout_Surface, root.layout_Cell, root.layout_Popup, root.other_Persist);
    }
}(this, function (d3, Grid, HipieDDL, Surface, Cell, Popup, Persist) {
    function HTML() {
        Grid.call(this);

        this.surfacePadding(0);

        this.flyoutWidgets = {};
    }
    HTML.prototype = Object.create(Grid.prototype);
    HTML.prototype.constructor = HTML;
    HTML.prototype._class += " marshaller_HTML";

    HTML.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:["Private"]});
    HTML.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:["Private"]});
    HTML.prototype.publish("proxyMappings", {}, "object", "Proxy Mappings",null,{tags:["Private"]});
    HTML.prototype.publish("propogateClear", false, "boolean", "Propogate clear to dependent visualizations", null);

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
                    .propogateClear(this.propogateClear())
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
        var context = this;
        this.marshaller = new HipieDDL.Marshaller()
            .proxyMappings(this.proxyMappings())
            .propogateClear(this.propogateClear())
            .widgetMappings(d3.map(widgetArr, function (d) {
                return d.id();
            }))
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
            if (context.marshaller.widgetMappings().empty()) {
                var vizCellMap = {};
                var vizPopupMap = {};

                for (var key in dashboards) {
                    var cellRow = 0;
                    var cellCol = 0;

                    var popupVisualizations = [];
                    var mainVisualizations = [];

                    dashboards[key].visualizations.forEach(function (viz, idx) {
                        if (viz.properties.flyout) {
                            popupVisualizations.push(viz);
                        } else {
                            mainVisualizations.push(viz);
                        }
                    });

                    var maxCol = Math.floor(Math.sqrt(mainVisualizations.length));

                    mainVisualizations.forEach(function (viz, idx) {
                        if (viz.widget instanceof Surface || viz.widget.classID() === "composite_MegaChart") {
                            viz.widgetSurface = viz.widget;
                        } else {
                            viz.widgetSurface = new Surface()
                                .widget(viz.widget)
                            ;
                        }
                        if (idx && (idx % maxCol === 0)) {
                            cellRow++;
                            cellCol = 0;
                        }
                        viz.widget.size({ width: 0, height: 0 });
                        viz.widgetSurface.title(viz.title);
                        context.setContent(cellRow, cellCol, viz.widgetSurface);
                        vizCellMap[viz.id] = context.getWidgetCell(viz.widgetSurface.id());

                        cellCol++;
                    });

                    popupVisualizations.forEach(function (viz, idx) {
                        var popup = context.flyoutWidgets[viz.id] = new Popup()
                            .size({width: 400, height: 400}) // waiting on fix for auto size
                            .position("absolute")
                            .widget(new Surface()
                                .title(viz.title)
                                .surfaceBackgroundColor("rgb(234, 249, 255)")
                                .widget(viz.widget)
                                .buttonAnnotations([
                                    {
                                        id: "",
                                        label: "\uf00d",
                                        width: 20,
                                        padding: "0px 5px",
                                        class: "close",
                                        font: "FontAwesome",
                                    }
                                ])
                                .on("click", function(obj) {
                                    if (obj.class === "close") {
                                        popup
                                            .visible(false)
                                            .popupState(false)
                                            .render();
                                    }
                                })  
                            );
   
                            var targetVizs = viz.events.getUpdatesVisualizations();
                            var targetIDs = targetVizs.map(function (targetViz) {
                                return vizCellMap[targetViz.id].id();
                            });
                            targetIDs.forEach(function (target) {
                                if (!vizPopupMap[target]) {
                                    vizPopupMap[target] = [];
                                }
                                vizPopupMap[target].push(context.flyoutWidgets[viz.id]);
                            });      
                    });
                }

                for (key in dashboards) {
                    dashboards[key].visualizations.forEach(function (viz, idx) {
                        if (viz.properties.flyout) {
                            return;
                        }
                        var targetVizs = viz.events.getUpdatesVisualizations();
                        if (Object.keys(vizPopupMap).indexOf(vizCellMap[viz.id].id()) !== -1) {
                            var buttonAnnotations = vizPopupMap[vizCellMap[viz.id].id()].map(function (popup, idx) {
                                return {
                                        id: "button_" + viz.id + "_" + popup.id() + "_" + idx,
                                        label: "\uf044",
                                        width: 20,
                                        padding: "0px 5px",
                                        class: "popup-flyout",
                                        font: "FontAwesome",
                                       };
                            });
                            vizCellMap[viz.id].widget()
                                .buttonAnnotations(buttonAnnotations)
                                .on("click", function(obj) {
                                    if (obj.class === "popup-flyout") {
                                        var idx = obj.id.split("_").pop();
                                        var popup = vizPopupMap[vizCellMap[viz.id].id()][idx];
                                            popup
                                                .visible(true)
                                                .popupState(true)
                                                .render();
                                    }
                                });
                        }
                        var targetIDs = targetVizs.map(function (targetViz) {
                            return vizCellMap[targetViz.id].id();
                        });
                        vizCellMap[viz.id].indicateTheseIds(targetIDs);
                    });
                }
            }
            
            Grid.prototype.render.call(context, function (widget) {
                for (var key in widget.flyoutWidgets) {
                    var popupWidget = widget.flyoutWidgets[key];
                    popupWidget.target(widget.popupContainer.node()).render(function(popup) {
                        popup
                            .top(document.documentElement.clientHeight / 2 - popup._size.height / 2)
                            .left(document.documentElement.clientWidth / 2 - popup._size.width / 2)
                            .visible(false)
                            .popupState(false)
                            .render();
                    });
                }
                for (var dashKey in dashboards) {
                    for (var dsKey in dashboards[dashKey].dashboard.datasources) {
                        dashboards[dashKey].dashboard.datasources[dsKey].fetchData({}, true);
                    }
                }
                if (callback) {
                    callback(widget);
                }
            });
        }
        return this;
    };

    HTML.prototype.commsError = function (source, error) {
        alert("Comms Error:\n" + source + "\n" + error);
    };

    return HTML;
}));
