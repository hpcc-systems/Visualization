import * as _dagre from "dagre";

export const dagre: _dagre = _dagre.dagre || _dagre.default || _dagre;

export class GraphData extends dagre.graphlib.Graph {
    superGraphData: any;  //  Shut the compiler up  ---
    constructor() {
        super({ multigraph: true, compound: true });
        this.superGraphData = this as any;
        this.superGraphData.setGraph({});
        this.superGraphData.setDefaultNodeLabel(function () { return {}; });
        this.superGraphData.setDefaultEdgeLabel(function () { return {}; });
    }

    setData(vertices, edges, hierarchy, merge) {
        const retVal = {
            addedVertices: [],
            addedEdges: []
        };

        //  Add new items  ---
        for (let i = 0; i < vertices.length; ++i) {
            const entity = vertices[i];
            if (!merge || !this.superGraphData.hasNode(entity._id)) {
                this.superGraphData.setNode(entity._id, entity);
                retVal.addedVertices.push(entity);
            }
        }
        for (let i = 0; i < edges.length; ++i) {
            const edge = edges[i];
            if (!merge || !this.superGraphData.hasEdge(edge._id)) {
                if (edge._sourceVertex && edge._targetVertex) {
                    this.superGraphData.setEdge(edge._sourceVertex._id, edge._targetVertex._id, edge, edge._id);
                    retVal.addedEdges.push(edge);
                } else {
                    console.log("Bad edge definition");
                }
            }
        }
        if (hierarchy) {
            for (let i = 0; i < hierarchy.length; ++i) {
                this.superGraphData.setParent(hierarchy[i].child._id, hierarchy[i].parent._id);
            }
        }

        //  Remove old items  ---
        if (merge) {
            const edgeIDs = edges.map(function (item) { return item._id; });
            this.filterEdges(function (item) { return edgeIDs.indexOf(item.v + "_" + item.w) < 0; })
                .forEach(function (_item) {
                    /*  TODO  ---
                    try {
                        context.delEdge(item);
                    } catch (e) {
                        var d = 0;
                    }
                    */
                })
                ;
            const vertexIDs = vertices.map(function (item) { return item._id; });
            this.filterNodes(function (item) { return vertexIDs.indexOf(item) < 0; })
                .forEach(function (item) {
                    /*  TODO  ---
                    try {
                        context.delNode(item);
                    } catch (e) {
                    }
                    */
                })
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

    nodeValues() {
        const retVal = [];
        this.superGraphData.nodes().forEach(function (item) {
            retVal.push(this.node(item));
        }, this);
        return retVal;
    }

    eachNode(callback) {
        this.superGraphData.nodes().forEach(function (item) {
            callback(item, this.node(item));
        }, this);
    }

    edgeValues() {
        const retVal = [];
        this.superGraphData.edges().forEach(function (item) {
            retVal.push(this.edge(item));
        }, this);
        return retVal;
    }

    eachEdge(callback) {
        this.superGraphData.edges().forEach(function (item) {
            callback(item, item.v, item.w, this.edge(item));
        }, this);
    }

    getJSON() {
        const graphObj = dagre.graphlib.json.write(this);
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
