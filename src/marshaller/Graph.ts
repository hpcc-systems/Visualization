import { ResizeSurface } from '../common/ResizeSurface';
import { Graph as GraphWidget } from '../graph/Graph';
import { Edge } from '../graph/Edge';
import { HipieDDLMixin } from './HipieDDLMixin';

export function Graph() {
    GraphWidget.call(this);
    HipieDDLMixin.call(this);

    this._design_mode = false;
    this._dashboards = [];
    this.graphAttributes = ["snapToGrid", "showEdges"];
    this.widgetAttributes = ["layout", "chartType", "palette", "title", "columns", "data"];
    this.layout("Hierarchy");
    this.applyScaleOnLayout(true);
    this.content([]);
}
Graph.prototype = Object.create(GraphWidget.prototype);
Graph.prototype.constructor = Graph;
Graph.prototype.mixin(HipieDDLMixin);
Graph.prototype._class += " marshaller_Graph";

//TODO Still Needed?:  Graph.prototype.publish("visualizeRoxie", false, "boolean", "Show Roxie Data Sources", null, { tags: ["Private"] });
Graph.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Basic"] });

Graph.prototype.populateContent = function () {
    var vertices = [];
    var edges = [];
    this._ddlVisualizations.concat(this._ddlPopupVisualizations).forEach(function (viz) {
        if (viz.widget) {
            var newSurface = null;
            if (viz.widget instanceof ResizeSurface) {
                newSurface = viz.widget
                    .size({ width: 210, height: 210 })
                    ;
            } else {
                var width = 280;
                var height = 210;
                newSurface = new ResizeSurface()
                    .showTitle(true)
                    .size({ width: width, height: height })
                    .content(viz.widget)
                    ;
            }
            if (newSurface) {
                viz.newWidgetSurface = newSurface;
            }
            vertices.push(newSurface);
        }
        viz.getInputVisualizations().forEach(function () {
        }, this);
    }, this);
    this._ddlDashboards.forEach(function (dashboard) {
        dashboard.visualizations.forEach(function (viz) {
            viz.getInputVisualizations().forEach(function (inViz) {
                edges.push(new Edge()
                    .sourceVertex(inViz.newWidgetSurface)
                    .targetVertex(viz.newWidgetSurface)
                    .targetMarker("arrowHead")
                );
            }, this);
        }, this);
    }, this);
    this.content(vertices);
    this.data({ vertices: vertices, edges: edges });
};

Graph.prototype.enter = function (domNode, element) {
    GraphWidget.prototype.enter.apply(this, arguments);
    element.classed("graph_Graph", true);
};

Graph.prototype.render = function (callback) {
    this._marshallerRender(GraphWidget.prototype, callback);
    return this;
};

Graph.prototype.commsError = function (source, error) {
    alert("Comms Error:\n" + source + "\n" + error);
};
