import { GraphHtmlT, SubgraphBaseProps, EdgeBaseProps } from "./graphHtmlT.ts";
import { vertex, VertexProps } from "./vertex.ts";

export class GraphHtml extends GraphHtmlT<SubgraphBaseProps, VertexProps, EdgeBaseProps> {
    constructor() {
        super(undefined, vertex);
    }

}
GraphHtml.prototype._class += " graph_GraphHtml";
