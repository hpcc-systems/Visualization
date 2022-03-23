export function IGraph() {
}
IGraph.prototype._dataFamily = "graph";

//  Events  ---
IGraph.prototype.vertex_click = function (_row, _col, _sel, more) {
    if (more && more.vertex) {
    }
};

IGraph.prototype.vertex_dblclick = function (_row, _col, _sel, more) {
    if (more && more.vertex) {
    }
};

IGraph.prototype.edge_click = function (_row, _col, _sel, more) {
    if (more && more.edge) {
    }
};

IGraph.prototype.edge_dblclick = function (_row, _col, _sel, more) {
    if (more && more.edge) {
    }
};
