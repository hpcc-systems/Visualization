"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../layout/Grid", "./HipieDDLMixin"], factory);
    } else {
        root.marshaller_HTML = factory(root.d3, root.layout_Grid, root.marshaller_HipieDDLMixin);
    }
}(this, function (d3, Grid, HipieDDLMixin) {
    function HTML() {
        Grid.call(this);
        HipieDDLMixin.call(this);

        this.surfacePadding(0);
    }
    HTML.prototype = Object.create(Grid.prototype);
    HTML.prototype.constructor = HTML;
    HTML.prototype.mixin(HipieDDLMixin);
    HTML.prototype._class += " marshaller_HTML";

    HTML.prototype.populateContent = function () {
        var cellRow = 0;
        var cellCol = 0;
        var cellDensity = this.cellDensity();
        for (var key in this._ddlDashboards) {
            var maxCol = Math.floor(Math.sqrt(this._ddlDashboards[key].visualizations.length));
            this._ddlDashboards[key].visualizations.forEach(function (viz) {
                if (viz.newWidgetSurface) {
                    while (this.getCell(cellRow * cellDensity, cellCol * cellDensity) !== null) {
                        cellCol++;
                        if (cellCol % maxCol === 0) {
                            cellRow++;
                            cellCol = 0;
                        }
                    }
                    this.setContent(cellRow, cellCol, viz.newWidgetSurface);
                }
            }, this);
        }

        var vizCellMap = {};
        this.content().forEach(function (cell) {
            var widget = cell.widget();
            if (widget && widget.classID() === "layout_Surface") {
                widget = widget.widget();
            }
            if (widget) {
                vizCellMap[widget.id()] = cell;
            }
        });

        for (key in this._ddlDashboards) {
            this._ddlDashboards[key].visualizations.forEach(function (viz, idx) {
                if (viz.properties.flyout || viz.parentVisualization) {
                    return;
                }
                var targetVizs = viz.events.getUpdatesVisualizations();
                var targetIDs = targetVizs.filter(function (targetViz) {
                    return vizCellMap[targetViz.id];
                }).map(function (targetViz) {
                    return vizCellMap[targetViz.id].id();
                });
                vizCellMap[viz.id].indicateTheseIds(targetIDs);
            });
        }
    };

    HTML.prototype.enter = function (domNode, element) {
        Grid.prototype.enter.apply(this, arguments);
    };

    HTML.prototype.render = function (callback) {
        this._marshallerRender(Grid.prototype, callback);
        return this;
    };

    HTML.prototype.commsError = function (source, error) {
        alert("Comms Error:\n" + source + "\n" + error);
    };

    return HTML;
}));
