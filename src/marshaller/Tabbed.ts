import * as d3 from "d3";
import { Tabbed as TabbedLayout } from '../layout/Tabbed';
import { Grid } from '../layout/Grid';
import * as HipieDDLMixin from './HipieDDLMixin';

export function Tabbed() {
    TabbedLayout.call(this);
        HipieDDLMixin.call(this);

        this.surfacePadding_default(0);
    }
    Tabbed.prototype = Object.create(TabbedLayout.prototype);
    Tabbed.prototype.constructor = Tabbed;
    Tabbed.prototype.mixin(HipieDDLMixin);
    Tabbed.prototype._class += " marshaller_Tabbed";

    Tabbed.prototype.content = function () {
        var retVal = [];
        this.widgets().forEach(function (surface) {
            var grid = surface.widget();
            grid.content().forEach(function (widget) {
                retVal.push(widget);
        });
        });
    return retVal;
};

    Tabbed.prototype.populateContent = function () {
        var cellDensity = 3;
        this._ddlDashboards.forEach(function (dashboard) {
            var grid = new Grid().surfacePadding(0);
            this.addTab(grid, dashboard.dashboard.title);
            var cellRow = 0;
            var cellCol = 0;
            var maxCol = Math.floor(Math.sqrt(dashboard.visualizations.length));
            dashboard.visualizations.forEach(function (viz) {
                if (viz.newWidgetSurface) {
                    while (grid.getCell(cellRow * cellDensity, cellCol * cellDensity) !== null) {
                        cellCol++;
                        if (cellCol % maxCol === 0) {
                            cellRow++;
                            cellCol = 0;
                        }
                }
                    grid.setContent(cellRow * cellDensity, cellCol * cellDensity, viz.newWidgetSurface, "", cellDensity, cellDensity);
                }
            }, this);
        }, this);

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

        this._ddlDashboards.forEach(function (dashboard) {
            dashboard.visualizations.forEach(function (viz, idx) {
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
        }, this);
    };

    Tabbed.prototype.enter = function (domNode, element) {
        TabbedLayout.prototype.enter.apply(this, arguments);
    };

    Tabbed.prototype.render = function (callback) {
        this._marshallerRender(TabbedLayout.prototype, callback);
    return this;
};

Tabbed.prototype.commsError = function (source, error) {
    alert("Comms Error:\n" + source + "\n" + error);
};

