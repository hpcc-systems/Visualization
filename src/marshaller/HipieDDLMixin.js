"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/Class", "../common/PropertyExt", "../common/Utility", "./HipieDDL", "../other/Persist", "../layout/Surface", "./FlyoutButton"], factory);
    } else {
        root.marshaller_HipieDDLMixin = factory(root.d3, root.common_Class, root.common_PropertyExt, root.common_PropertyExt, root.common_Utility, root.other_Persist, root.layout_Surface, root.marshaller_FlyoutButton);
    }
}(this, function (d3, Class, PropertyExt, Utility, HipieDDL, Persist, Surface, FlyoutButton) {

    function HipieDDLMixin() {
        Class.call(this);
        PropertyExt.call(this);
    }
    HipieDDLMixin.prototype = Object.create(Class.prototype);
    HipieDDLMixin.prototype.constructor = HipieDDLMixin;
    HipieDDLMixin.prototype.mixin(PropertyExt);
    HipieDDLMixin.prototype._class += " marshaller_HipieDDLMixin";

    HipieDDLMixin.prototype.publish("ddlUrl", "", "string", "DDL URL", null, { tags: ["Private"] });
    HipieDDLMixin.prototype.publish("databomb", "", "string", "Data Bomb", null, { tags: ["Private"] });
    HipieDDLMixin.prototype.publish("proxyMappings", {}, "object", "Proxy Mappings", null, { tags: ["Private"] });
    HipieDDLMixin.prototype.publish("timeout", null, "number", "Timout (seconds)", null, { optional: true });
    HipieDDLMixin.prototype.publish("clearDataOnUpdate", true, "boolean", "Clear data prior to refresh", null);
    HipieDDLMixin.prototype.publish("propogateClear", false, "boolean", "Propogate clear to dependent visualizations", null);
    HipieDDLMixin.prototype.publish("missingDataString", "***MISSING***", "string", "Missing data display string");

    HipieDDLMixin.prototype._gatherDashboards = function (marshaller, databomb) {
        if (databomb instanceof Object) {
        } else if (databomb) {
            databomb = JSON.parse(databomb);
        }
        this._ddlDashboards = [];
        this._ddlVisualizations = [];
        this._ddlPopupVisualizations = [];
        this._ddlLayerVisualizations = [];
        var context = this;
        var curr = null;
        marshaller.accept({
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        visualizations: [],
                        layerVisualizations: [],
                        popupVisualizations: []
                    };
                    context._ddlDashboards.push(curr);
                } else if (item instanceof HipieDDL.DataSource) {
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (item.dataSource.databomb) {
                        item.dataSource.comms.databombOutput(item.from, item.id);
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        if (item.properties.flyout) {
                            curr.popupVisualizations.push(item);
                            context._ddlPopupVisualizations.push(item);
                        } else if (item.parentVisualization) {
                            curr.layerVisualizations.push(item);
                            context._ddlLayerVisualizations.push(item);
                        } else {
                            curr.visualizations.push(item);
                            context._ddlVisualizations.push(item);
                        }
                    }
                }
            }
        });
    };

    HipieDDLMixin.prototype._marshallerRender = function (BaseClass, callback) {
        if (this.ddlUrl() === "" || (this.ddlUrl() === this._prev_ddlUrl && this.databomb() === this._prev_databomb)) {
            if (this._marshaller) {
                this._marshaller
                    .proxyMappings(this.proxyMappings())
                    .timeout(this.timeout())
                    .clearDataOnUpdate(this.clearDataOnUpdate())
                    .propogateClear(this.propogateClear())
                    .missingDataString(this.missingDataString())
                ;
            }
            return BaseClass.render.call(this, function (widget) {
                if (callback) {
                    callback(widget);
                }
            });
        }
        if (this._prev_ddlUrl && this._prev_ddlUrl !== this.ddlUrl()) {
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
        this._marshaller = new HipieDDL.Marshaller()
            .proxyMappings(this.proxyMappings())
            .clearDataOnUpdate(this.clearDataOnUpdate())
            .propogateClear(this.propogateClear())
            .missingDataString(this.missingDataString())
            .widgetMappings(widgetMap)
            .on("commsEvent", function (source, error) {
                context.commsEvent.apply(context, arguments);
            })
            .on("vizEvent", function () {
                context.vizEvent.apply(context, arguments);
            })
        ;

        //  Parse DDL  ---
        if (this.ddlUrl()[0] === "[" || this.ddlUrl()[0] === "{") {
            this._marshaller.parse(this.ddlUrl(), postParse);
        } else {
            this._marshaller.url(this.ddlUrl(), postParse);
        }

        function postParse() {
            context._gatherDashboards(context._marshaller, context.databomb());
            //  Remove existing widgets not used and prime popups ---
            context._ddlVisualizations.forEach(function(viz) {
                removedMap.remove(viz.id);
                if (!context._marshaller.widgetMappings().get(viz.id)) {
                    //  New widget  ---
                    viz.newWidgetSurface = null;
                    if (viz.widget instanceof Surface || viz.widget.classID() === "composite_MegaChart") {
                        viz.newWidgetSurface = viz.widget;
                    } else {
                        viz.newWidgetSurface = new Surface()
                            .widget(viz.widget)
                        ;
                    }
                    viz.newWidgetSurface.title(viz.title);
                    viz.widget.size({ width: 0, height: 0 });
                }
            });
            context._ddlPopupVisualizations.forEach(function (viz) {
                removedMap.remove(viz.id);
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
            removedMap.forEach(function (key, value) {
                context.clearContent(value);
            });
            context.populateContent();
            if (context._initialState) {
                context._marshaller.deserializeState(context._initialState.marshaller);
                delete context._initialState;
                BaseClass.render.call(context, callback);
            } else {
                BaseClass.render.call(context, function (widget) {
                    context._marshaller.primeData().then(function (response) {
                        if (callback) {
                            callback(widget);
                        }
                    });
                });
            }
        }
    };

    HipieDDLMixin.prototype.primeData = function (state) {
        if (this._marshaller) {
            return this._marshaller.primeData(state);
        }
        return Promise.resolve();
    };

    HipieDDLMixin.prototype.dashboards = function () {
        var retVal = {};
        for (var key in this._marshaller.dashboards) {
            retVal[key] = {};
            this._marshaller.dashboards[key].visualizations.forEach(function (ddlViz) {
                retVal[key][ddlViz.id] = ddlViz.widget;
            }, this);
        }
        return retVal;
    };


    HipieDDLMixin.prototype.visualizations = function () {
        return this._marshaller._visualizationArray.map(function (ddlViz) {
            return ddlViz.newWidgetSurface || ddlViz.widget;
        });
    };

    //  ---
    var tpl =
"<!doctype html><html><head><meta charset='utf-8'>" +
"<script src='http://viz.hpccsystems.com/v1.14.0-rc5/dist-amd/hpcc-viz.js'></script>" +
"<script src='http://viz.hpccsystems.com/v1.14.0-rc5/dist-amd/hpcc-viz-common.js'></script>" +
"</head>" +
"<body style='padding:0px; margin:0px; overflow:hidden'><div id='placeholder' style='width:100%; height:100vh'></div><script>" + 
"   require(['src/other/Persist'], function (Persist) {\n" +
"       Persist.create({STATE}, function(widget) {\n" +
"           widget\n" +
"               .target('placeholder')\n" +
"               .ddlUrl('{DDL}')\n" +
"               .databomb('{DATABOMB}')\n" +
"               .render()\n" +
"           ;\n" +
"       });\n" +
"   });" +
"</script></body></html>";

    HipieDDLMixin.prototype.generateTestPage = function () {
        if (this._marshaller) {
            var context = this;
            var state = Persist.serialize(context, function (widget, publishItem) {
                if (publishItem.id === "databomb" || publishItem.id === "ddlUrl") {
                    return true;
                }
                return false;
            });
            var databomb = this._marshaller.createDatabomb();
            var page = tpl
                .replace("{VERSION}", context.version())
                .replace("{STATE}", state)
                .replace("{DDL}", context._marshaller._json.replace("WUID", "databomb"))
                .replace("{DATABOMB}", JSON.stringify(databomb))
            ;
            Utility.downloadBlob("html", page, "test");
        }
    };

    HipieDDLMixin.prototype.vizEvent = function (sourceWidget, eventID, row, col, selected) {
    };

    HipieDDLMixin.prototype.commsEvent = function (ddlSource, eventID, request, response) {
    };

    HipieDDLMixin.prototype.state = function (_) {
        if (!arguments.length) {
            return this.serializeState();
        }
        this.deserializeState(_);
        return this;
    };

    HipieDDLMixin.prototype.serializeState = function () {
        return {
            marshaller: this._marshaller ? this._marshaller.serializeState() : {}
        };
    };

    HipieDDLMixin.prototype.deserializeState = function (state) {
        if (this._marshaller) {
            this._marshaller.deserializeState(state.marshaller);
        } else {
            this._initialState = state;
        }
        return this;
    };

    return HipieDDLMixin;
}));