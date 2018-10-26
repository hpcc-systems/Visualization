import { graphlib } from "dagre";
import { Subgraph } from "./Subgraph";

export class GraphData extends graphlib.Graph {

    constructor() {
        super({ multigraph: true, compound: true });
        super.setGraph({});
        super.setDefaultNodeLabel(function () { return {}; });
        super.setDefaultEdgeLabel(function () { return {}; });
    }

    nodeEdges(id: string) {
        return super.nodeEdges(id);
    }

    node(id: string) {
        return super.node(id);
    }

    edge(id: string) {
        return super.edge(id);
    }

    setData(subgraphs, vertices, edges, hierarchy, merge) {
        const retVal = {
            addedVertices: [],
            addedEdges: []
        };

        const allVertices = subgraphs.concat(vertices);

        //  Add new items  ---
        for (let i = 0; i < allVertices.length; ++i) {
            const entity = allVertices[i];
            if (!merge || !super.hasNode(entity._id)) {
                super.setNode(entity._id, entity);
                retVal.addedVertices.push(entity);
            }
        }
        for (let i = 0; i < edges.length; ++i) {
            const edge = edges[i];
            if (!merge || !super.hasEdge(edge._id)) {
                if (edge._sourceVertex && edge._targetVertex) {
                    super.setEdge(edge._sourceVertex._id, edge._targetVertex._id, edge, edge._id);
                    retVal.addedEdges.push(edge);
                } else {
                    console.log("Bad edge definition");
                }
            }
        }
        if (hierarchy) {
            for (let i = 0; i < hierarchy.length; ++i) {
                super.setParent(hierarchy[i].child._id, hierarchy[i].parent._id);
            }
        }

        //  Remove old items  ---
        if (merge) {
            const edgeIDs = edges.map(function (item) {
                return item._id;
            });
            this
                .filterEdges(item => edgeIDs.indexOf(item.name) < 0)
                .forEach(item => super.removeEdge(item.v, item.w, item.name))
                ;

            const vertexIDs = allVertices.map(function (item) {
                return item._id;
            });
            this
                .filterNodes(item => vertexIDs.indexOf(item) < 0)
                .forEach(item => super.removeNode(item))
                ;
        }
        return retVal;
    }

    filterEdges(pred) {
        const filtered = [];
        this.eachEdge(function (e) {
            if (pred(e)) {
                filtered.push(e);
            }
        });
        return filtered;
    }

    filterNodes(pred) {
        const filtered = [];
        this.eachNode(function (e) {
            if (pred(e)) {
                filtered.push(e);
            }
        });
        return filtered;
    }

    nodeValues(includeSubgraphs: boolean = true) {
        return super.nodes()
            .map(item => super.node(item))
            .filter(item => includeSubgraphs || !(item instanceof Subgraph))
            ;
    }

    eachNode(callback) {
        super.nodes().forEach(function (item) {
            callback(item, this.node(item));
        }, this);
    }

    edgeValues() {
        const retVal = [];
        super.edges().forEach(function (item) {
            retVal.push(this.edge(item));
        }, this);
        return retVal;
    }

    eachEdge(callback) {
        super.edges().forEach(function (item) {
            callback(item, item.v, item.w, this.edge(item));
        }, this);
    }

    neighbors(nodeID: string) {
        return super.neighbors(nodeID)
            .map(item => this.node(item));
    }

    singleNeighbors(nodeID: string) {
        return super.neighbors(nodeID)
            .filter(item => super.neighbors(item).length === 1)
            .map(item => this.node(item));
    }

    getJSON() {
        const graphObj = graphlib.json.write(this);
        return JSON.stringify(graphObj, function (key, value) {
            if (key === "value") {
                if (value._text && value._text._text) {
                    return value._text._text;
                }
                return value._id;
            }
            return value;
        }, "  ");
    }
}
