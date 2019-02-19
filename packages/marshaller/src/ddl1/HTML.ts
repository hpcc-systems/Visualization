import { Grid } from "@hpcc-js/layout";
import { HipieDDLMixin } from "./HipieDDLMixin";

export class HTML extends Grid {
    _ddlDashboards: any[];
    // tslint:disable-next-line:variable-name
    surfacePadding_default: (n: number) => void;
    _marshallerRender: (...args: any[]) => any;

    constructor() {
        super();
        HipieDDLMixin.call(this);

        this.surfacePadding_default(0);
    }

    populateContent() {
        let cellRow = 0;
        let cellCol = 0;
        const cellDensity = 3;
        this._ddlDashboards.forEach(dashboard => {
            const maxCol = Math.floor(Math.sqrt(dashboard.visualizations.length));
            dashboard.visualizations.forEach(viz => {
                if (viz.newWidgetSurface) {
                    while (this.getCell(cellRow * cellDensity, cellCol * cellDensity) !== null) {
                        cellCol++;
                        if (cellCol % maxCol === 0) {
                            cellRow++;
                            cellCol = 0;
                        }
                    }
                    this.setContent(cellRow * cellDensity, cellCol * cellDensity, viz.newWidgetSurface, "", cellDensity, cellDensity);
                }
            });
        });

        const vizCellMap = {};
        this.content().forEach(function (cell) {
            let widget: any = cell.widget();
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
        this._marshallerRender(Grid.prototype, callback);
        return this;
    }

    commsError(source, error) {
        alert("Comms Error:\n" + source + "\n" + error);
    }
}
HTML.prototype.mixin(HipieDDLMixin);
HTML.prototype._class += " marshaller_HTML";
