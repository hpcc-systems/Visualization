export function IGraph() {
}

//  Events  ---
IGraph.prototype.vertex_click = function (_row, _col, _sel, more) {
    if (more && more.vertex) {
        console.log("Vertex click: " + more.vertex.id());
    }
};

IGraph.prototype.vertex_dblclick = function (_row, _col, _sel, more) {
    if (more && more.vertex) {
        console.log("Vertex double click: " + more.vertex.id());
    }
};

IGraph.prototype.edge_click = function (_row, _col, _sel, more) {
    if (more && more.edge) {
        console.log("Edge click: " + more.edge.id());
    }
};

IGraph.prototype.edge_dblclick = function (_row, _col, _sel, more) {
    if (more && more.edge) {
        console.log("Edge double click: " + more.edge.id());
    }
};
