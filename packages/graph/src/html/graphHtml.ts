import { GraphHtmlT, SubgraphBaseProps, EdgeBaseProps } from "./graphHtmlT.ts";
import { vertex, VertexProps } from "./vertex.ts";
import { edge, EdgeProps } from "./edge.ts";
import { Vertex } from "@hpcc-js/util";

export class GraphHtml extends GraphHtmlT<SubgraphBaseProps, VertexProps, EdgeProps<VertexProps>> {
    constructor() {
        super(undefined, vertex, edge);
    }

}
GraphHtml.prototype._class += " graph_GraphHtml";
