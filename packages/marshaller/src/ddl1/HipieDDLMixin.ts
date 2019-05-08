import { Platform, PropertyExt, Utility } from "@hpcc-js/common";
import { Modal, Surface } from "@hpcc-js/layout";
import { Persist } from "@hpcc-js/other";
import { map as d3Map } from "d3-collection";
import { select as d3Select } from "d3-selection";
import { FlyoutButton } from "./FlyoutButton";
import * as HipieDDL from "./HipieDDL";

const tpl =
    "<!doctype html><html><head><meta charset='utf-8'>" +
    "<script src='http://viz.hpccsystems.com/v1.14.0-rc5/dist-amd/hpcc-viz.js'></script>" +
    "<script src='http://viz.hpccsystems.com/v1.14.0-rc5/dist-amd/hpcc-viz-common.js'></script>" +
    "</head>" +
    "<body style='padding:0px; margin:0px; overflow:hidden'><div id='placeholder' style='width:100%; height:100vh'></div><script>" +
    "   require(['src/other/Persist'], function (Persist) {\n" +
    "       Persist.create({STATE}).then(function(widget) {\n" +
    "           widget\n" +
    "               .target('placeholder')\n" +
    "               .ddlUrl('{DDL}')\n" +
    "               .databomb('{DATABOMB}')\n" +
    "               .render()\n" +
    "           ;\n" +
    "       });\n" +
    "   });" +
    "</script></body></html>";

export class HipieDDLMixin extends PropertyExt {
    _ddlDashboards;
    _ddlVisualizations;
    _ddlPopupVisualizations;
    _ddlLayerVisualizations;
    _ddlModalVisualizations;
    _prev_ddlUrl;
    _prev_databomb;
    _marshaller;
    _initialState;

    constructor() {
        super();
        PropertyExt.call(this);
    }

    _gatherDashboards(marshaller, databomb) {
        if (databomb instanceof Object) {
        } else if (databomb) {
            databomb = JSON.parse(databomb);
        }
        this._ddlDashboards = [];
        this._ddlVisualizations = [];
        this._ddlPopupVisualizations = [];
        this._ddlLayerVisualizations = [];
        this._ddlModalVisualizations = [];
        const context = this;
        let curr = null;
        marshaller.accept({
            visit: (item) => {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        visualizations: [],
                        popupVisualizations: [],
                        layerVisualizations: [],
                        modalVisualizations: []
                    };
                    context._ddlDashboards.push(curr);
                } else if (item instanceof HipieDDL.Datasource) {
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (item.datasource.databomb) {
                        item.datasource.comms.databombOutput(item.from, item.id);
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        if (item.properties.flyout) {
                            curr.popupVisualizations.push(item);
                            context._ddlPopupVisualizations.push(item);
                        } else if (item.parentVisualization) {
                            curr.layerVisualizations.push(item);
                            context._ddlLayerVisualizations.push(item);
                        } else if (item.properties.modalIfData && !context.disableModals()) {
                            curr.modalVisualizations.push(item);
                            context._ddlModalVisualizations.push(item);
                        } else {
                            curr.visualizations.push(item);
                            context._ddlVisualizations.push(item);
                        }
                    }
                }
            }
        });
    }

    _marshallerRender(BaseClass, callback) {
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
        const widgetArr = [];
        Persist.widgetArrayWalker(this.content(), function (w) {
            widgetArr.push(w);
        });
        const widgetMap = d3Map(widgetArr, function (d) {
            return d.id();
        });
        const removedMap = d3Map(widgetArr.filter(function (d) { return d.id().indexOf(d._idSeed) !== 0 && d.id().indexOf("_pe") !== 0; }), function (d) {
            return d.id();
        });

        const context = this;
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
            context._ddlVisualizations.forEach(function (viz) {
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
                viz.widget.classed({ flyout: true });
                const targetVizs = viz.events.getUpdatesVisualizations();
                targetVizs.forEach(function (targetViz) {
                    switch (targetViz.widget.classID()) {
                        case "composite_MegaChart":
                            if (!viz._flyoutButton) {
                                viz._flyoutButton = new FlyoutButton()
                                    .classed({ "composite_MegaChart-flyout": true })
                                    .title(viz.title)
                                    .widget(viz.widget)
                                    .autoClose(context.autoCloseFlyout())
                                    ;
                                targetViz.widget.toolbarWidgets().push(viz._flyoutButton);
                            } else {
                                targetViz.widget.toolbarWidgets().push(viz._flyoutButton.reference());
                            }
                            break;
                    }
                });
            });
            context._ddlModalVisualizations.forEach(function (viz) {
                if (viz.widget.showCSV) {
                    viz.widget.showToolbar(true);
                } else if (viz.widget.showToolbar) {
                    viz.widget.showToolbar(false);
                }
                viz._modalTarget = d3Select("body").append("div").node();
                viz._modal = new Modal().target(viz._modalTarget)
                    .overflowX("hidden")
                    .overflowY("hidden")
                    ;
                viz._modal._widget = viz.widget;
                const origRender = viz.widget.render;
                viz.widget.render = function (callback) {
                    if (this.__inModal) {
                        return origRender.apply(this, arguments);
                    }
                    if (this.data().length) {
                        this.__inModal = true;
                        const widgetContext = this;
                        const modalTitle = viz.widget.title();
                        if (viz.widget.showToolbar()) {
                            viz.widget.title("");
                        }
                        viz._modal
                            .title(modalTitle)
                            .visible(true)
                            .fixedWidth("80%")
                            .fixedHeight("80%")
                            .render(function (w) {
                                if (callback) {
                                    callback(widgetContext);
                                }
                                setTimeout(function () {
                                    widgetContext.__inModal = false;
                                }, 300);  //  Must be longer than debounce timeout...
                            });
                    } else {
                        if (callback) {
                            callback(this);
                        }
                    }
                    return this;
                };
            });
            removedMap.each(function (key, value) {
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
    }

    primeData(state) {
        if (this._marshaller) {
            return this._marshaller.primeData(state);
        }
        return Promise.resolve();
    }

    dashboards() {
        const retVal = {};
        for (const key in this._marshaller.dashboards) {
            retVal[key] = {};
            this._marshaller.dashboards[key].visualizations.forEach(function (ddlViz) {
                retVal[key][ddlViz.id] = ddlViz.widget;
            }, this);
        }
        return retVal;
    }

    visualizations() {
        return this._marshaller._visualizationArray.map(function (ddlViz) {
            return ddlViz.newWidgetSurface || ddlViz.widget;
        });
    }

    generateTestPage() {
        if (this._marshaller) {
            const context = this;
            const state = Persist.serialize(context, function (widget, publishItem) {
                if (publishItem.id === "databomb" || publishItem.id === "ddlUrl") {
                    return true;
                }
                return false;
            });
            const databomb = this._marshaller.createDatabomb();
            const page = tpl
                .replace("{VERSION}", Platform.version())
                .replace("{STATE}", state)
                .replace("{DDL}", context._marshaller._json.replace("WUID", "databomb"))
                .replace("{DATABOMB}", JSON.stringify(databomb))
                ;
            Utility.downloadString("TEXT", page, "test");
        }
    }

    vizEvent(sourceWidget, eventID, row, col, selected) {
    }

    commsEvent(ddlSource, eventID, request, response) {
    }

    state(_) {
        if (!arguments.length) {
            return this.serializeState();
        }
        this.deserializeState(_);
        return this;
    }

    serializeState() {
        return {
            marshaller: this._marshaller ? this._marshaller.serializeState() : {}
        };
    }

    deserializeState(state) {
        if (this._marshaller) {
            this._marshaller.deserializeState(state.marshaller);
        } else {
            this._initialState = state;
        }
        return this;
    }

    serializeRequests() {
        let retVal = null;
        this._ddlPopupVisualizations.concat(this._ddlVisualizations).forEach(function (ddlViz) {
            if (ddlViz.hasSelection()) {
                if (!retVal) {
                    retVal = {};
                }
                retVal[ddlViz.id] = ddlViz.reverseMappedSelection();
            }
        });
        return retVal;
    }
    //  HipieDDLMixin abstract methods  ---
    content: () => this;
    populateContent: () => this;
    clearContent: (value?) => this;

    ddlUrl: { (): string; (_: string): HipieDDLMixin };
    ddlUrl_exists: () => boolean;
    databomb: { (): string; (_: string): HipieDDLMixin };
    databomb_exists: () => boolean;
    proxyMappings: { (): object; (_: object): HipieDDLMixin };
    proxyMappings_exists: () => boolean;
    timeout: { (): number; (_: number): HipieDDLMixin };
    timeout_exists: () => boolean;
    clearDataOnUpdate: { (): boolean; (_: boolean): HipieDDLMixin };
    clearDataOnUpdate_exists: () => boolean;
    propogateClear: { (): boolean; (_: boolean): HipieDDLMixin };
    propogateClear_exists: () => boolean;
    missingDataString: { (): string; (_: string): HipieDDLMixin };
    missingDataString_exists: () => boolean;
    autoCloseFlyout: { (): boolean; (_: boolean): HipieDDLMixin };
    autoCloseFlyout_exists: () => boolean;
    disableModals: { (): boolean; (_: boolean): HipieDDLMixin };
}
HipieDDLMixin.prototype.mixin(PropertyExt);
HipieDDLMixin.prototype._class += " marshaller_HipieDDLMixin";

HipieDDLMixin.prototype.publish("ddlUrl", "", "string", "DDL URL", null, { tags: ["Private"] });
HipieDDLMixin.prototype.publish("databomb", "", "string", "Data Bomb", null, { tags: ["Private"] });
HipieDDLMixin.prototype.publish("proxyMappings", {}, "object", "Proxy Mappings", null, { tags: ["Private"] });
HipieDDLMixin.prototype.publish("timeout", null, "number", "Timout (seconds)", null, { optional: true });
HipieDDLMixin.prototype.publish("clearDataOnUpdate", true, "boolean", "Clear data prior to refresh", null);
HipieDDLMixin.prototype.publish("propogateClear", false, "boolean", "Propogate clear to dependent visualizations", null);
HipieDDLMixin.prototype.publish("missingDataString", "***MISSING***", "string", "Missing data display string");
HipieDDLMixin.prototype.publish("autoCloseFlyout", true, "boolean", "Auto Close Flyout Filters");
HipieDDLMixin.prototype.publish("disableModals", false, "boolean", "If true, widgets with 'modalIfData' will display as standard Grid widgets");
