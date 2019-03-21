import { Edge as GLEdge, GraphEdge, graphlib, Node as GLNode } from "dagre";

class GraphlibGraph extends graphlib.Graph {
}

interface GraphlibGraph {
    nodeEdges(outNodeName: string, inNodeName?: string): GLEdge[] | undefined;
    removeEdge(outNodeName: string, inNodeName: string, name?: string): graphlib.Graph;
}

export interface GraphLabel {
    debugTiming?: boolean;
}

export class GraphData {

    private _g: GraphlibGraph;

    constructor() {
        this._g = new GraphlibGraph({ multigraph: true, compound: true });
        this._g.setGraph({});
        this._g.setDefaultNodeLabel(function () { return { debug: "error" }; });
        this._g.setDefaultEdgeLabel(function () { return { debug: "error" }; });
    }

    parent(cn: string): string {
        return this._g.parent(cn);
    }

    private filterNodes(pred) {
        const filtered = [];
        this.eachNode(function (e) {
            if (pred(e)) {
                filtered.push(e);
            }
        });
        return filtered;
    }

    eachNode(callback) {
        this._g.nodes().forEach(function (item) {
            callback(item, this.node(item));
        }, this);
    }

    private filterEdges(pred): GLEdge[] {
        const filtered = [];
        this.eachEdge(function (e) {
            if (pred(e)) {
                filtered.push(e);
            }
        });
        return filtered;
    }

    eachEdge(callback) {
        this._g.edges().forEach(function (item) {
            callback(item, item.v, item.w, this.edge(item));
        }, this);
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
            if (!merge || !this._g.hasNode(entity._id)) {
                this._g.setNode(entity._id, entity);
                retVal.addedVertices.push(entity);
            }
        }
        for (let i = 0; i < edges.length; ++i) {
            const edge = edges[i];
            if (!merge || !this._g.hasEdge(edge._id)) {
                if (edge._sourceVertex && edge._targetVertex) {
                    this._g.setEdge(edge._sourceVertex._id, edge._targetVertex._id, edge, edge._id);
                    retVal.addedEdges.push(edge);
                } else {
                    console.log("Bad edge definition");
                }
            }
        }
        if (hierarchy) {
            for (let i = 0; i < hierarchy.length; ++i) {
                this._g.setParent(hierarchy[i].child._id, hierarchy[i].parent._id);
            }
        }

        //  Remove old items  ---
        if (merge) {
            const edgeIDs = edges.map(function (item) {
                return item._id;
            });
            this
                .filterEdges(item => edgeIDs.indexOf(item.name) < 0)
                .forEach(item => this._g.removeEdge(item.v, item.w, item.name))
                ;

            const vertexIDs = allVertices.map(function (item) {
                return item._id;
            });
            this
                .filterNodes(item => vertexIDs.indexOf(item) < 0)
                .forEach(item => this._g.removeNode(item))
                ;
        }
        return retVal;
    }

    node(id: string): GLNode {
        return this._g.node(id);
    }

    nodeCount(): number {
        return this._g.nodeCount();
    }

    nodes(): GLNode[] {
        return this._g.nodes().map(n => this._g.node(n));
    }

    nodeEdges(id: string): GLEdge[] {
        return this._g.nodeEdges(id);
    }

    edge(glEdge: GLEdge): GraphEdge {
        return this._g.edge(glEdge);
    }

    edges(): GraphEdge[] {
        return this._g.edges().map(e => this._g.edge(e));
    }

    neighbors(id: string) {
        return this._g.neighbors(id).map(n => this._g.node(n));
    }

    singleNeighbors(id: string) {
        return this._g.neighbors(id)
            .filter((n: any) => this._g.neighbors(n).length === 1)
            .map(item => this._g.node(item as any));
    }

    gatherShortestPath(pathObj, targetID) {
        const retVal = [];
        let walkID = targetID;
        let pathItem = pathObj[walkID];
        while (pathItem) {
            if (pathItem.distance < Infinity && pathItem.predecessor) {
                const anEdge = this._g.nodeEdges(walkID, pathItem.predecessor)[0];
                retVal.push(this._g.edge(anEdge as any));
            }
            walkID = pathItem.predecessor;
            pathItem = pathObj[walkID];
        }
        return retVal;
    }

    shortestPath(sourceID: string, targetID: string) {
        return this.gatherShortestPath(graphlib.alg.dijkstra(this._g, sourceID), targetID);
    }

    undirectedShortestPath(sourceID: string, targetID: string) {
        return this.gatherShortestPath(graphlib.alg.dijkstra(this._g, sourceID, null, v => this._g.nodeEdges(v) as any), targetID);
    }

    getJSON() {
        const graphObj = graphlib.json.write(this._g);
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
