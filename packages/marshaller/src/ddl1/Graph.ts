import { ResizeSurface } from "@hpcc-js/common";
import { Edge, Graph as GraphWidget } from "@hpcc-js/graph";
import { HipieDDLMixin } from "./HipieDDLMixin";

export class Graph extends GraphWidget {
    _design_mode;
    _dashboards;
    graphAttributes;
    widgetAttributes;
    _ddlVisualizations;
    _ddlPopupVisualizations;
    _ddlDashboards;

    constructor() {
        super();
        HipieDDLMixin.call(this);

        this._design_mode = false;
        this._dashboards = [];
        this.graphAttributes = ["snapToGrid", "showEdges"];
        this.widgetAttributes = ["layout", "chartType", "palette", "title", "columns", "data"];
        this.layout("Hierarchy");
        this.applyScaleOnLayout(true);
        this.content([]);
    }

    populateContent() {
        const vertices = [];
        const edges = [];
        this._ddlVisualizations.concat(this._ddlPopupVisualizations).forEach(function (viz) {
            if (viz.widget) {
                let newSurface = null;
                if (viz.widget instanceof ResizeSurface) {
                    newSurface = viz.widget
                        .size({ width: 210, height: 210 })
                        ;
                } else {
                    const width = 280;
                    const height = 210;
                    newSurface = new ResizeSurface()
                        .showTitle(true)
                        .size({ width, height })
                        .content(viz.widget)
                        ;
                }
                if (newSurface) {
                    viz.newWidgetSurface = newSurface;
                }
                vertices.push(newSurface);
            }
            viz.getInputVisualizations().forEach(() => {
            });
        }, this);
        this._ddlDashboards.forEach(dashboard => {
            dashboard.visualizations.forEach(viz => {
                viz.getInputVisualizations().forEach(inViz => {
                    edges.push(new Edge()
                        .sourceVertex(inViz.newWidgetSurface)
                        .targetVertex(viz.newWidgetSurface)
                        .targetMarker("arrowHead")
                    );
                });
            });
        });
        this.content(vertices);
        this.data({ vertices, edges });
    }

    enter(domNode, element) {
        GraphWidget.prototype.enter.apply(this, arguments);
        element.classed("graph_Graph", true);
    }

    render(callback) {
        this._marshallerRender(GraphWidget.prototype, callback);
        return this;
    }

    commsError(source, error) {
        alert("Comms Error:\n" + source + "\n" + error);
    }

    content: { (): any[]; (_: any[]): Graph };
    content_exists: () => boolean;

    //  HipieDDLMixin  ---
    _marshallerRender: (BaseClass, callback) => this;
}
Graph.prototype.mixin(HipieDDLMixin);
Graph.prototype._class += " marshaller_Graph";

// TODO Still Needed?:  Graph.prototype.publish("visualizeRoxie", false, "boolean", "Show Roxie Data Sources", null, { tags: ["Private"] });
Graph.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Basic"] });
