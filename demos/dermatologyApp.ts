import { map as d3Map } from "d3-collection";
import { select as d3Select } from "d3-selection";
import * as Utility from "../src/common/Utility";
import { Surface } from "../src/layout/Surface";
import * as Persist from "../src/other/Persist";
import { PropertyEditor } from "../src/other/PropertyEditor";
import { categories, deserializeFromURL, serializeToURL, widgets } from "../test/Factory";

declare function doResize();

export class Main {
    urlParams;
    urlParts;
    _categories = categories;
    _currWidget;
    _currTest;
    _propEditor;
    _main;
    _cloneSurface;
    _toggleDesign;
    _monitorHandle;
    _prevShowClone;

    constructor() {
        this.urlParams = Utility.urlParams();
        this.urlParts = window.location.search.split("?");

        this.initGrid();
    }

    init() {
        this.showSpinner();

        const context = this;
        deserializeFromURL(this.urlParts[1], function (widget, currTest) {
            if (widget) {
                context._currTest = currTest;
                context.showWidget(widget);
            } else {
                context.loadWidget("src/chart/Column");
            }
        });
    }

    initGrid() {
        d3Select("#switch-design").property("checked", this.urlParams["designMode"] === "true");

        this._propEditor = new PropertyEditor()
            .target("properties")
            .show_settings(true);
        ;

        this._main = null;

        this._cloneSurface = new Surface()
            .target("clone")
            ;
    };

    initPropertiesSwitch(id) {
        const context = this;
        this._toggleDesign = d3Select(id)
            .on("click", function () {
                context.showProperties();
            })
            ;
        this.showProperties();
    };

    showSpinner(_show?) {
    };

    loadWidget(widgetPath, widgetTest?, params?) {
        this.showSpinner();
        this._currTest = widgetPath + (widgetTest ? "." + widgetTest : "");
        const context = this;
        const func = widgetTest ? widgets[widgetPath][widgetTest].factory : (<any>d3Map(widgets[widgetPath]).values()[0]).factory;
        func(function (widget) {
            if (params) {
                for (const key in params) {
                    if (widget["__meta_" + key] !== undefined) {
                        if (widget["__meta_" + key].type === "array") {
                            widget[key](params[key].split(","));
                        } else {
                            widget[key](params[key]);
                        }
                    }
                }
            }
            context.showWidget(widget);
        });
    };

    openWidget(json) {
        const context = this;
        Persist.create(json, function (widget) {
            context.showWidget(widget);
        });
    };

    saveWidget(includeState = false) {
        const text = JSON.stringify(Persist.serializeToObject(this._currWidget, null, false, includeState), null, "  ");
        Utility.downloadBlob("JSON", text, this._currWidget.classID(), "persist");
    };

    showWidget(widget) {
        this.showSpinner();
        this._propEditor
            .widget(null)
            .render()
            ;
        this._currWidget = widget;
        if (this._monitorHandle) {
            this._monitorHandle.remove();
        }
        this.updateUrl();
        const context = this;
        this._monitorHandle = widget.monitor(function () {
            context.updateUrl();
            context.showClone();
        });
        if (this._main) {
            this._main.target(null);
        }
        d3Select("#cellSurface")
            .classed("supress", widget.surfaceShadow !== undefined)
            ;
        d3Select("#surface")
            .classed("supress", widget.surfaceShadow !== undefined)
            ;
        if (widget.surfaceShadow) {
            widget.surfaceBackgroundColor_default("white");
        }
        this._main = widget.target("surface")
            .render(function (_mainWidget) {
                context._prevShowClone = false;
                context.showClone();
                context.showSpinner(false);
            })
            ;
        if (widget && widget.designMode) {
            widget.designMode(this.propertiesVisible());
        }
        this._propEditor
            .widget(widget)
            .render()
            ;
    };

    cloneWidget(func) {
        Persist.clone(this._currWidget, func);
    };

    propertiesVisible() {
        return false;
    };

    showProperties() {
        const show = this.propertiesVisible();
        if (show) {
            this._propEditor
                .resize()
                .render()
                ;
        }
        if (this._currWidget && this._currWidget.designMode) {
            this._currWidget.designMode(show);
        }
        if (this._main) {
            this._main
                .resize()
                .lazyRender()
                ;
        }
    };

    cloneVisible() {
        return false;
    };

    showClone() {
        const show = this.cloneVisible();
        if (this._prevShowClone !== show) {
            doResize();
            if (show) {
                const context = this;
                this.cloneWidget(function (widget) {
                    context._cloneSurface
                        .surfacePadding(0)
                        .widget(widget)
                        .render()
                        ;
                });
            } else {
                this._cloneSurface
                    .surfacePadding(0)
                    .widget(null)
                    .render()
                    ;
            }
            this._prevShowClone = show;
        }
    };

    openTheme(json) {
        const context = this;
        Persist.applyTheme(this._currWidget, json, function () {
            context._currWidget.render(function () {
                context.showSpinner(false);
            });
        });
    };

    saveTheme() {
        const text = JSON.stringify(Persist.serializeThemeToObject(this._currWidget), null, "  ");
        Utility.downloadBlob("JSON", text, null, "theme");
    };

    resetTheme() {
        const context = this;
        Persist.removeTheme(this._currWidget, function () {
            context._currWidget.render(function () { context.showSpinner(false); });
        });
    };

    updateUrl() {
        let params = "";
        if (this._currWidget) {
            params = serializeToURL(this._currTest, this._currWidget);
        }
        try {
            window.history.pushState("", "", this.urlParts[0] + (params ? "?" + params : ""));
        } catch (e) {
            //  Local files do not have history...
        }
    };

    doResize() {
        if (this._main) {
            this._main
                .resize()
                .lazyRender()
                ;
        }
        this._propEditor
            .resize()
            .lazyRender()
            ;
        this._cloneSurface
            .resize()
            .lazyRender()
            ;
    };
}
