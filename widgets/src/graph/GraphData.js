(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["lib/graphlib/graphlib"], factory);
    } else {
        root.GraphData = factory();
    }
}(this, function () {
    function GraphData() {
        graphlib.Digraph.call(this);
    };
    GraphData.prototype = Object.create(graphlib.Digraph.prototype);

    GraphData.prototype.setData = function (vertices, edges, merge) {
        var context = this;
        var retVal = {
            addedVertices: [],
            addedEdges: []
        }

        //  Add new items  ---
        for (var i = 0; i < vertices.length; ++i) {
            var entity = vertices[i];
            if (!merge || !this.hasNode(entity._id)) {
                this.addNode(entity._id, entity)
                retVal.addedVertices.push(entity);
            }
        }
        for (var i = 0; i < edges.length; ++i) {
            var edge = edges[i];
            if (!merge || !this.hasEdge(edge._id)) {
                this.addEdge(edge._id, edge._sourceVertex._id, edge._targetVertex._id, edge);
                retVal.addedEdges.push(edge);
            }
        }
        //  Remove old items  ---
        if (merge) {
            var edgeIDs = edges.map(function (item) { return item.data().id; });
            this.filterEdges(function (item) { return edgeIDs.indexOf(item) < 0; })
                .forEach(function (item) {
                    try {
                        context.delEdge(item);
                    } catch (e) {
                        var d = 0;
                    }
                })
            ;
            var vertexIDs = vertices.map(function (item) { return item._id; });
            this.filterNodes(function (item) { return vertexIDs.indexOf(item) < 0; }).nodes()
                .forEach(function (item) {
                    try {
                        context.delNode(item);
                    } catch (e) {
                        var d = 0;
                    }
                })
            ;
        }
        return retVal;
    };

    GraphData.prototype.filterEdges = function (pred) {
        var filtered = [];
        this.eachEdge(function (e) {
            if (pred(e)) {
                filtered.push(e);
            }
        });
        return filtered;
    };

    GraphData.prototype.nodeValues = function () {
        var retVal = [];
        this.eachNode(function (u, value) {
            retVal.push(value);
        });
        return retVal;
    };

    GraphData.prototype.edgeValues = function () {
        var retVal = [];
        var context = this;
        this.eachEdge(function (e, source, target, value) {
            retVal.push(value);
        });
        return retVal;
    };

    return GraphData;
}));
