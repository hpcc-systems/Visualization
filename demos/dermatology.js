﻿"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/common/Utility", "src/layout/Surface", "src/layout/Grid", "src/other/Persist", "src/other/PropertyEditor", "test/Factory"], factory);
    }
}(this, function (d3, Utility, Surface, Grid, Persist, PropertyEditor, testFactory) {
    function Main() {
        this.showSpinner();
        this.urlParams = Utility.urlParams();
        this.urlParts = window.location.search.split("?");

        this._testFactory = testFactory;

        this.initGrid();
        var context = this;
        testFactory.deserializeFromURL(this.urlParts[1], function (widget, currTest) {
            if (widget) {
                context._currTest = currTest;
                context.showWidget(widget);
            } else {
                context.loadWidget("src/chart/Column");
            }
        });
    }
    Main.prototype.constructor = Main;

    Main.prototype.initGrid = function () {
        d3.select("#switch-design").property("checked", this.urlParams["designMode"] === "true");

        this._propEditor = new PropertyEditor()
            .target("properties")
            .show_settings(true);
        ;

        this._main = null;

        this._cloneSurface = new Surface()
            .target("clone")
        ;
    };

    Main.prototype.initPropertiesSwitch = function (id) {
        var context = this;
        this._toggleDesign = d3.select(id)
            .on("click", function () {
                context.showProperties();
            })
        ;
        this.showProperties();
    };

    Main.prototype.showSpinner = function (show) {
    };

    Main.prototype.loadWidget = function (widgetPath, widgetTest, params) {
        this.showSpinner();
        this._currTest = widgetPath + (widgetTest ? "." + widgetTest : "");
        var context = this;
        var func = widgetTest ? testFactory.widgets[widgetPath][widgetTest].factory : d3.map(testFactory.widgets[widgetPath]).values()[0].factory;
        func(function (widget) {
            if (params) {
                for (var key in params) {
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

    Main.prototype.openWidget = function (json) {
        var context = this;
        Persist.create(json, function (widget) {
            context.showWidget(widget);
        });
    };

    Main.prototype.saveWidget = function (includeState) {
        var text = JSON.stringify(Persist.serializeToObject(this._currWidget, null, false, includeState), null, "  ");
        Utility.downloadBlob("JSON", text, this._currWidget.classID(), "persist");
    };

    Main.prototype.showWidget = function (widget) {
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
        var context = this;
        this._monitorHandle = widget.monitor(function () {
            context.updateUrl();
            context.showClone();
        });
        var context = this;
        if (this._main) {
            this._main.target(null);
        }
        d3.select("#cellSurface")
            .classed("supress", widget.surfaceShadow !== undefined)
        ;
        d3.select("#surface")
            .classed("supress", widget.surfaceShadow !== undefined)
        ;
        if (widget.surfaceShadow) {
            widget.surfaceBackgroundColor_default("white")
        }
        this._main = widget.target("surface")
            .render(function (mainWidget) {
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

    Main.prototype.cloneWidget = function (func) {
        Persist.clone(this._currWidget, func);
    };

    Main.prototype.propertiesVisible = function () {
        return false;
    };

    Main.prototype.showProperties = function () {
        var show = this.propertiesVisible();
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

    Main.prototype.cloneVisible = function () {
        return false;
    };

    Main.prototype.showClone = function () {
        var show = this.cloneVisible();
        if (this._prevShowClone !== show) {
            doResize();
            if (show) {
                var context = this;
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

    Main.prototype.openTheme = function (json) {
        var context = this;
        Persist.applyTheme(this._currWidget, json, function () {
            context._currWidget.render(function (w) {
                context.showSpinner(false);
            });
        });
    };

    Main.prototype.saveTheme = function () {
        var text = JSON.stringify(Persist.serializeThemeToObject(this._currWidget), null, "  ");
        Utility.downloadBlob("JSON", text, null, "theme");
    };

    Main.prototype.resetTheme = function () {
        var context = this;
        Persist.removeTheme(this._currWidget, function () {
            context._currWidget.render(function (w) { context.showSpinner(false); });
        });
    };

    Main.prototype.updateUrl = function () {
        var params = "";
        if (this._currWidget) {
            params = testFactory.serializeToURL(this._currTest, this._currWidget);
        }
        try {
            window.history.pushState("", "", this.urlParts[0] + (params ? "?" + params : ""));
        } catch (e) {
            //  Local files do not have history...
        }
    };

    Main.prototype.doResize = function () {
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

    return Main;
}));