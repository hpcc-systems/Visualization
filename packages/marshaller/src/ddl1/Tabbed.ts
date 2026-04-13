import { Grid, Tabbed as TabbedLayout } from "@hpcc-js/layout";
import { HipieDDLMixin } from "./HipieDDLMixin";

export class Tabbed extends TabbedLayout {
    _ddlDashboards;

    constructor() {
        super();
        HipieDDLMixin.call(this);

        this.surfacePadding_default(0);
    }

    content() {
        const retVal = [];
        this.widgets().forEach(function (surface) {
            const grid = surface.widget();
            grid.content().forEach(function (widget) {
                retVal.push(widget);
            });
        });
        return retVal;
    }

    populateContent() {
        const cellDensity = 3;
        this._ddlDashboards.forEach(dashboard => {
            const grid = new Grid().surfacePadding("0px");
            this.addTab(grid, dashboard.dashboard.title);
            let cellRow = 0;
            let cellCol = 0;
            const maxCol = Math.floor(Math.sqrt(dashboard.visualizations.length));
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
        });

        const vizCellMap = {};
        this.content().forEach(function (cell) {
            let widget = cell.widget();
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
                const targetVizs = viz.events.getUpdatesVisualizations();
                const targetIDs = targetVizs.filter(function (targetViz) {
                    return vizCellMap[targetViz.id];
                }).map(function (targetViz) {
                    return vizCellMap[targetViz.id].id();
                });
                vizCellMap[viz.id].indicateTheseIds(targetIDs);
            });
        }, this);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    render(callback) {
        this._marshallerRender(TabbedLayout.prototype, callback);
        return this;
    }

    commsError(source, error) {
        alert("Comms Error:\n" + source + "\n" + error);
    }

    //  HipieDDLMixin  ---
    _marshallerRender: (BaseClass, callback) => this;
}
Tabbed.prototype.mixin(HipieDDLMixin);
Tabbed.prototype._class += " marshaller_Tabbed";
