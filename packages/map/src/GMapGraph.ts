import { Shape } from "@hpcc-js/common";
import { Edge, Graph } from "@hpcc-js/graph";
import { GMap } from "./GMap";

export class GMapGraph extends GMap {
    constructor() {
        super();
    }

    enter() {
        super.enter.apply(this, arguments);
        const graph = new Graph()
            .layout("None")
            .zoomable(false)
            ;

        const origRender = graph.render;
        const context = this;
        graph.render = function (callback?): Graph {
            const vertices = [];
            const edges = [];
            let prevAddr = null;
            context.data().forEach(function (row) {
                const pos2 = context._viewportSurface.project(row[0], row[1]);
                const newAddr = new Shape()
                    .shape("circle")
                    .radius(3)
                    .data(row)
                    .pos(pos2)
                    ;
                vertices.push(newAddr);
                if (prevAddr) {
                    edges.push(new Edge()
                        .sourceVertex(prevAddr)
                        .targetVertex(newAddr)
                        .sourceMarker("none")
                        .targetMarker("arrow")
                    );
                }
                prevAddr = newAddr;
            });
            this.data({ vertices, edges });
            const retVal = origRender.apply(this, arguments);
            /*
            this.graphData.nodeValues().forEach(function (vertex) {
                const pos = context._viewportSurface.project(vertex.data()[0], vertex.data()[1]);
                // pos.x -= context.width() / 2;
                // pos.y -= context.height() / 2;
                vertex.move(pos);
            });
            this.graphData.edgeValues().forEach(function (edge) {
                edge.points([]);
            });
            */
            return retVal;
        };

        this._viewportSurface.widget(graph);
    }
}
GMapGraph.prototype._class += " map_GMapGraph";
