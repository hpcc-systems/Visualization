"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Palette", "../api/IGraph", "./Vertex", "./Edge", "./GraphData", "./GraphLayouts", "../other/Bag", "css!./Graph"], factory);
    } else {
        root.graph_Graph = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.api_IGraph, root.graph_Vertex, root.graph_Edge, root.graph_GraphData, root.graph_GraphLayouts, root.other_Bag);
    }
}(this, function (d3, SVGWidget, Palette, IGraph, Vertex, Edge, GraphData, GraphLayouts, Bag) {
    function Graph() {
        SVGWidget.call(this);
        IGraph.call(this);

        this.graphData = new GraphData();
        this.highlight = {
            zoom: 1.1,
            opacity: 0.33,
            edge: "1.25px"
        };
        this._selection = new Bag.Selection();
    }
    Graph.prototype = Object.create(SVGWidget.prototype);
    Graph.prototype.constructor = Graph;
    Graph.prototype._class += " graph_Graph";
    Graph.prototype.implements(IGraph.prototype);

    Graph.prototype.publish("allowDragging", true, "boolean", "Allow Dragging of Vertices", null, { tags: ["Advanced"] });
    Graph.prototype.publish("layout", "Circle", "set", "Default Layout", ["Circle", "ForceDirected", "ForceDirected2", "Hierarchy", "None"], { tags: ["Basic"] });
    Graph.prototype.publish("scale", "100%", "set", "Zoom Level", ["all", "width", "selection", "100%", "90%", "75%", "50%", "25%", "10%"], { tags: ["Basic"] });
    Graph.prototype.publish("applyScaleOnLayout", false, "boolean", "Shrink to fit on Layout", null, { tags: ["Basic"] });
    Graph.prototype.publish("highlightOnMouseOverVertex", false, "boolean", "Highlight Vertex on Mouse Over", null, { tags: ["Basic"] });
    Graph.prototype.publish("highlightOnMouseOverEdge", false, "boolean", "Highlight Edge on Mouse Over", null, { tags: ["Basic"] });
    Graph.prototype.publish("transitionDuration", 250, "number", "Transition Duration", null, { tags: ["Intermediate"] });
    Graph.prototype.publish("showEdges", true, "boolean", "Show Edges", null, { tags: ["Intermediate"] });
    Graph.prototype.publish("snapToGrid", 0, "number", "Snap to Grid", null, { tags: ["Private"] });

    Graph.prototype.publish("hierarchyRankDirection", "TB", "set", "Direction for Rank Nodes", ["TB", "BT", "LR", "RL"], { tags: ["Advanced"] });
    Graph.prototype.publish("hierarchyNodeSeparation", 50, "number", "Number of pixels that separate nodes horizontally in the layout", null, { tags: ["Advanced"] });
    Graph.prototype.publish("hierarchyEdgeSeparation", 10, "number", "Number of pixels that separate edges horizontally in the layout", null, { tags: ["Advanced"] });
    Graph.prototype.publish("hierarchyRankSeparation", 50, "number", "Number of pixels between each rank in the layout", null, { tags: ["Advanced"] });

    //  Properties  ---
    Graph.prototype.getOffsetPos = function () {
        return { x: 0, y: 0 };
    };

    Graph.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this._svgZoom) {
            this._svgZoom
                .attr("x", -this._size.width / 2)
                .attr("y", -this._size.height / 2)
                .attr("width", this._size.width)
                .attr("height", this._size.height)
            ;
        }
        return retVal;
    };

    Graph.prototype.clear = function () {
        this.data({ vertices: [], edges: [], hierarchy: [], merge: false });
    };

    Graph.prototype.testData = function () {
        var rawData = {
            "nodes": [
              { "name": "Myriel", "group": 1 },
              { "name": "Napoleon", "group": 1 },
              { "name": "Mlle.Baptistine", "group": 1 },
              { "name": "Mme.Magloire", "group": 1 },
              { "name": "CountessdeLo", "group": 1 },
              { "name": "Geborand", "group": 1 },
              { "name": "Champtercier", "group": 1 },
              { "name": "Cravatte", "group": 1 },
              { "name": "Count", "group": 1 },
              { "name": "OldMan", "group": 1 },
              { "name": "Labarre", "group": 2 },
              { "name": "Valjean", "group": 2 },
              { "name": "Marguerite", "group": 3 },
              { "name": "Mme.deR", "group": 2 },
              { "name": "Isabeau", "group": 2 },
              { "name": "Gervais", "group": 2 },
              { "name": "Tholomyes", "group": 3 },
              { "name": "Listolier", "group": 3 },
              { "name": "Fameuil", "group": 3 },
              { "name": "Blacheville", "group": 3 },
              { "name": "Favourite", "group": 3 },
              { "name": "Dahlia", "group": 3 },
              { "name": "Zephine", "group": 3 },
              { "name": "Fantine", "group": 3 },
              { "name": "Mme.Thenardier", "group": 4 },
              { "name": "Thenardier", "group": 4 },
              { "name": "Cosette", "group": 5 },
              { "name": "Javert", "group": 4 },
              { "name": "Fauchelevent", "group": 0 },
              { "name": "Bamatabois", "group": 2 },
              { "name": "Perpetue", "group": 3 },
              { "name": "Simplice", "group": 2 },
              { "name": "Scaufflaire", "group": 2 },
              { "name": "Woman1", "group": 2 },
              { "name": "Judge", "group": 2 },
              { "name": "Champmathieu", "group": 2 },
              { "name": "Brevet", "group": 2 },
              { "name": "Chenildieu", "group": 2 },
              { "name": "Cochepaille", "group": 2 },
              { "name": "Pontmercy", "group": 4 },
              { "name": "Boulatruelle", "group": 6 },
              { "name": "Eponine", "group": 4 },
              { "name": "Anzelma", "group": 4 },
              { "name": "Woman2", "group": 5 },
              { "name": "MotherInnocent", "group": 0 },
              { "name": "Gribier", "group": 0 },
              { "name": "Jondrette", "group": 7 },
              { "name": "Mme.Burgon", "group": 7 },
              { "name": "Gavroche", "group": 8 },
              { "name": "Gillenormand", "group": 5 },
              { "name": "Magnon", "group": 5 },
              { "name": "Mlle.Gillenormand", "group": 5 },
              { "name": "Mme.Pontmercy", "group": 5 },
              { "name": "Mlle.Vaubois", "group": 5 },
              { "name": "Lt.Gillenormand", "group": 5 },
              { "name": "Marius", "group": 8 },
              { "name": "BaronessT", "group": 5 },
              { "name": "Mabeuf", "group": 8 },
              { "name": "Enjolras", "group": 8 },
              { "name": "Combeferre", "group": 8 },
              { "name": "Prouvaire", "group": 8 },
              { "name": "Feuilly", "group": 8 },
              { "name": "Courfeyrac", "group": 8 },
              { "name": "Bahorel", "group": 8 },
              { "name": "Bossuet", "group": 8 },
              { "name": "Joly", "group": 8 },
              { "name": "Grantaire", "group": 8 },
              { "name": "MotherPlutarch", "group": 9 },
              { "name": "Gueulemer", "group": 4 },
              { "name": "Babet", "group": 4 },
              { "name": "Claquesous", "group": 4 },
              { "name": "Montparnasse", "group": 4 },
              { "name": "Toussaint", "group": 5 },
              { "name": "Child1", "group": 10 },
              { "name": "Child2", "group": 10 },
              { "name": "Brujon", "group": 4 },
              { "name": "Mme.Hucheloup", "group": 8 }
            ],
            "links": [
              { "source": 1, "target": 0, "value": 1 },
              { "source": 2, "target": 0, "value": 8 },
              { "source": 2, "target": 0, "value": 8 },
              { "source": 3, "target": 0, "value": 10 },
              { "source": 3, "target": 2, "value": 6 },
              { "source": 4, "target": 0, "value": 1 },
              { "source": 5, "target": 0, "value": 1 },
              { "source": 6, "target": 0, "value": 1 },
              { "source": 7, "target": 0, "value": 1 },
              { "source": 8, "target": 0, "value": 2 },
              { "source": 9, "target": 0, "value": 1 },
              { "source": 11, "target": 10, "value": 1 },
              { "source": 11, "target": 3, "value": 3 },
              { "source": 11, "target": 2, "value": 3 },
              { "source": 11, "target": 0, "value": 5 },
              { "source": 12, "target": 11, "value": 1 },
              { "source": 13, "target": 11, "value": 1 },
              { "source": 14, "target": 11, "value": 1 },
              { "source": 15, "target": 11, "value": 1 },
              { "source": 17, "target": 16, "value": 4 },
              { "source": 18, "target": 16, "value": 4 },
              { "source": 18, "target": 17, "value": 4 },
              { "source": 19, "target": 16, "value": 4 },
              { "source": 19, "target": 17, "value": 4 },
              { "source": 19, "target": 18, "value": 4 },
              { "source": 20, "target": 16, "value": 3 },
              { "source": 20, "target": 17, "value": 3 },
              { "source": 20, "target": 18, "value": 3 },
              { "source": 20, "target": 19, "value": 4 },
              { "source": 21, "target": 16, "value": 3 },
              { "source": 21, "target": 17, "value": 3 },
              { "source": 21, "target": 18, "value": 3 },
              { "source": 21, "target": 19, "value": 3 },
              { "source": 21, "target": 20, "value": 5 },
              { "source": 22, "target": 16, "value": 3 },
              { "source": 22, "target": 17, "value": 3 },
              { "source": 22, "target": 18, "value": 3 },
              { "source": 22, "target": 19, "value": 3 },
              { "source": 22, "target": 20, "value": 4 },
              { "source": 22, "target": 21, "value": 4 },
              { "source": 23, "target": 16, "value": 3 },
              { "source": 23, "target": 17, "value": 3 },
              { "source": 23, "target": 18, "value": 3 },
              { "source": 23, "target": 19, "value": 3 },
              { "source": 23, "target": 20, "value": 4 },
              { "source": 23, "target": 21, "value": 4 },
              { "source": 23, "target": 22, "value": 4 },
              { "source": 23, "target": 12, "value": 2 },
              { "source": 23, "target": 11, "value": 9 },
              { "source": 24, "target": 23, "value": 2 },
              { "source": 24, "target": 11, "value": 7 },
              { "source": 25, "target": 24, "value": 13 },
              { "source": 25, "target": 23, "value": 1 },
              { "source": 25, "target": 11, "value": 12 },
              { "source": 26, "target": 24, "value": 4 },
              { "source": 26, "target": 11, "value": 31 },
              { "source": 26, "target": 16, "value": 1 },
              { "source": 26, "target": 25, "value": 1 },
              { "source": 27, "target": 11, "value": 17 },
              { "source": 27, "target": 23, "value": 5 },
              { "source": 27, "target": 25, "value": 5 },
              { "source": 27, "target": 24, "value": 1 },
              { "source": 27, "target": 26, "value": 1 },
              { "source": 28, "target": 11, "value": 8 },
              { "source": 28, "target": 27, "value": 1 },
              { "source": 29, "target": 23, "value": 1 },
              { "source": 29, "target": 27, "value": 1 },
              { "source": 29, "target": 11, "value": 2 },
              { "source": 30, "target": 23, "value": 1 },
              { "source": 31, "target": 30, "value": 2 },
              { "source": 31, "target": 11, "value": 3 },
              { "source": 31, "target": 23, "value": 2 },
              { "source": 31, "target": 27, "value": 1 },
              { "source": 32, "target": 11, "value": 1 },
              { "source": 33, "target": 11, "value": 2 },
              { "source": 33, "target": 27, "value": 1 },
              { "source": 34, "target": 11, "value": 3 },
              { "source": 34, "target": 29, "value": 2 },
              { "source": 35, "target": 11, "value": 3 },
              { "source": 35, "target": 34, "value": 3 },
              { "source": 35, "target": 29, "value": 2 },
              { "source": 36, "target": 34, "value": 2 },
              { "source": 36, "target": 35, "value": 2 },
              { "source": 36, "target": 11, "value": 2 },
              { "source": 36, "target": 29, "value": 1 },
              { "source": 37, "target": 34, "value": 2 },
              { "source": 37, "target": 35, "value": 2 },
              { "source": 37, "target": 36, "value": 2 },
              { "source": 37, "target": 11, "value": 2 },
              { "source": 37, "target": 29, "value": 1 },
              { "source": 38, "target": 34, "value": 2 },
              { "source": 38, "target": 35, "value": 2 },
              { "source": 38, "target": 36, "value": 2 },
              { "source": 38, "target": 37, "value": 2 },
              { "source": 38, "target": 11, "value": 2 },
              { "source": 38, "target": 29, "value": 1 },
              { "source": 39, "target": 25, "value": 1 },
              { "source": 40, "target": 25, "value": 1 },
              { "source": 41, "target": 24, "value": 2 },
              { "source": 41, "target": 25, "value": 3 },
              { "source": 42, "target": 41, "value": 2 },
              { "source": 42, "target": 25, "value": 2 },
              { "source": 42, "target": 24, "value": 1 },
              { "source": 43, "target": 11, "value": 3 },
              { "source": 43, "target": 26, "value": 1 },
              { "source": 43, "target": 27, "value": 1 },
              { "source": 44, "target": 28, "value": 3 },
              { "source": 44, "target": 11, "value": 1 },
              { "source": 45, "target": 28, "value": 2 },
              { "source": 47, "target": 46, "value": 1 },
              { "source": 48, "target": 47, "value": 2 },
              { "source": 48, "target": 25, "value": 1 },
              { "source": 48, "target": 27, "value": 1 },
              { "source": 48, "target": 11, "value": 1 },
              { "source": 49, "target": 26, "value": 3 },
              { "source": 49, "target": 11, "value": 2 },
              { "source": 50, "target": 49, "value": 1 },
              { "source": 50, "target": 24, "value": 1 },
              { "source": 51, "target": 49, "value": 9 },
              { "source": 51, "target": 26, "value": 2 },
              { "source": 51, "target": 11, "value": 2 },
              { "source": 52, "target": 51, "value": 1 },
              { "source": 52, "target": 39, "value": 1 },
              { "source": 53, "target": 51, "value": 1 },
              { "source": 54, "target": 51, "value": 2 },
              { "source": 54, "target": 49, "value": 1 },
              { "source": 54, "target": 26, "value": 1 },
              { "source": 55, "target": 51, "value": 6 },
              { "source": 55, "target": 49, "value": 12 },
              { "source": 55, "target": 39, "value": 1 },
              { "source": 55, "target": 54, "value": 1 },
              { "source": 55, "target": 26, "value": 21 },
              { "source": 55, "target": 11, "value": 19 },
              { "source": 55, "target": 16, "value": 1 },
              { "source": 55, "target": 25, "value": 2 },
              { "source": 55, "target": 41, "value": 5 },
              { "source": 55, "target": 48, "value": 4 },
              { "source": 56, "target": 49, "value": 1 },
              { "source": 56, "target": 55, "value": 1 },
              { "source": 57, "target": 55, "value": 1 },
              { "source": 57, "target": 41, "value": 1 },
              { "source": 57, "target": 48, "value": 1 },
              { "source": 58, "target": 55, "value": 7 },
              { "source": 58, "target": 48, "value": 7 },
              { "source": 58, "target": 27, "value": 6 },
              { "source": 58, "target": 57, "value": 1 },
              { "source": 58, "target": 11, "value": 4 },
              { "source": 59, "target": 58, "value": 15 },
              { "source": 59, "target": 55, "value": 5 },
              { "source": 59, "target": 48, "value": 6 },
              { "source": 59, "target": 57, "value": 2 },
              { "source": 60, "target": 48, "value": 1 },
              { "source": 60, "target": 58, "value": 4 },
              { "source": 60, "target": 59, "value": 2 },
              { "source": 61, "target": 48, "value": 2 },
              { "source": 61, "target": 58, "value": 6 },
              { "source": 61, "target": 60, "value": 2 },
              { "source": 61, "target": 59, "value": 5 },
              { "source": 61, "target": 57, "value": 1 },
              { "source": 61, "target": 55, "value": 1 },
              { "source": 62, "target": 55, "value": 9 },
              { "source": 62, "target": 58, "value": 17 },
              { "source": 62, "target": 59, "value": 13 },
              { "source": 62, "target": 48, "value": 7 },
              { "source": 62, "target": 57, "value": 2 },
              { "source": 62, "target": 41, "value": 1 },
              { "source": 62, "target": 61, "value": 6 },
              { "source": 62, "target": 60, "value": 3 },
              { "source": 63, "target": 59, "value": 5 },
              { "source": 63, "target": 48, "value": 5 },
              { "source": 63, "target": 62, "value": 6 },
              { "source": 63, "target": 57, "value": 2 },
              { "source": 63, "target": 58, "value": 4 },
              { "source": 63, "target": 61, "value": 3 },
              { "source": 63, "target": 60, "value": 2 },
              { "source": 63, "target": 55, "value": 1 },
              { "source": 64, "target": 55, "value": 5 },
              { "source": 64, "target": 62, "value": 12 },
              { "source": 64, "target": 48, "value": 5 },
              { "source": 64, "target": 63, "value": 4 },
              { "source": 64, "target": 58, "value": 10 },
              { "source": 64, "target": 61, "value": 6 },
              { "source": 64, "target": 60, "value": 2 },
              { "source": 64, "target": 59, "value": 9 },
              { "source": 64, "target": 57, "value": 1 },
              { "source": 64, "target": 11, "value": 1 },
              { "source": 65, "target": 63, "value": 5 },
              { "source": 65, "target": 64, "value": 7 },
              { "source": 65, "target": 48, "value": 3 },
              { "source": 65, "target": 62, "value": 5 },
              { "source": 65, "target": 58, "value": 5 },
              { "source": 65, "target": 61, "value": 5 },
              { "source": 65, "target": 60, "value": 2 },
              { "source": 65, "target": 59, "value": 5 },
              { "source": 65, "target": 57, "value": 1 },
              { "source": 65, "target": 55, "value": 2 },
              { "source": 66, "target": 64, "value": 3 },
              { "source": 66, "target": 58, "value": 3 },
              { "source": 66, "target": 59, "value": 1 },
              { "source": 66, "target": 62, "value": 2 },
              { "source": 66, "target": 65, "value": 2 },
              { "source": 66, "target": 48, "value": 1 },
              { "source": 66, "target": 63, "value": 1 },
              { "source": 66, "target": 61, "value": 1 },
              { "source": 66, "target": 60, "value": 1 },
              { "source": 67, "target": 57, "value": 3 },
              { "source": 68, "target": 25, "value": 5 },
              { "source": 68, "target": 11, "value": 1 },
              { "source": 68, "target": 24, "value": 1 },
              { "source": 68, "target": 27, "value": 1 },
              { "source": 68, "target": 48, "value": 1 },
              { "source": 68, "target": 41, "value": 1 },
              { "source": 69, "target": 25, "value": 6 },
              { "source": 69, "target": 68, "value": 6 },
              { "source": 69, "target": 11, "value": 1 },
              { "source": 69, "target": 24, "value": 1 },
              { "source": 69, "target": 27, "value": 2 },
              { "source": 69, "target": 48, "value": 1 },
              { "source": 69, "target": 41, "value": 1 },
              { "source": 70, "target": 25, "value": 4 },
              { "source": 70, "target": 69, "value": 4 },
              { "source": 70, "target": 68, "value": 4 },
              { "source": 70, "target": 11, "value": 1 },
              { "source": 70, "target": 24, "value": 1 },
              { "source": 70, "target": 27, "value": 1 },
              { "source": 70, "target": 41, "value": 1 },
              { "source": 70, "target": 58, "value": 1 },
              { "source": 71, "target": 27, "value": 1 },
              { "source": 71, "target": 69, "value": 2 },
              { "source": 71, "target": 68, "value": 2 },
              { "source": 71, "target": 70, "value": 2 },
              { "source": 71, "target": 11, "value": 1 },
              { "source": 71, "target": 48, "value": 1 },
              { "source": 71, "target": 41, "value": 1 },
              { "source": 71, "target": 25, "value": 1 },
              { "source": 72, "target": 26, "value": 2 },
              { "source": 72, "target": 27, "value": 1 },
              { "source": 72, "target": 11, "value": 1 },
              { "source": 73, "target": 48, "value": 2 },
              { "source": 74, "target": 48, "value": 2 },
              { "source": 74, "target": 73, "value": 3 },
              { "source": 75, "target": 69, "value": 3 },
              { "source": 75, "target": 68, "value": 3 },
              { "source": 75, "target": 25, "value": 3 },
              { "source": 75, "target": 48, "value": 1 },
              { "source": 75, "target": 41, "value": 1 },
              { "source": 75, "target": 70, "value": 1 },
              { "source": 75, "target": 71, "value": 1 },
              { "source": 76, "target": 64, "value": 1 },
              { "source": 76, "target": 65, "value": 1 },
              { "source": 76, "target": 66, "value": 1 },
              { "source": 76, "target": 63, "value": 1 },
              { "source": 76, "target": 62, "value": 1 },
              { "source": 76, "target": 48, "value": 1 },
              { "source": 76, "target": 58, "value": 1 }
            ]
        };

        var vertices = [];
        var edges = [];

        var palette = Palette.ordinal("dark2");

        rawData.nodes.forEach(function (node) {
            var annotation = [];
            if (Math.random() < 0.10) {
                annotation.push({
                    "faChar": "A",
                    "tooltip": "Test A",
                    "shape_colorFill": "white",
                    "image_colorFill": "red"
                });
            }
            if (Math.random() < 0.10) {
                annotation.push({
                    "faChar": "B",
                    "tooltip": "Test B",
                    "shape_colorFill": "green",
                    "shape_colorStroke": "green",
                    "image_colorFill": "white"
                });
            }
            if (Math.random() < 0.10) {
                annotation.push({
                    "faChar": "C",
                    "tooltip": "Test C",
                    "shape_colorFill": "navy",
                    "shape_colorStroke": "navy",
                    "image_colorFill": "white"
                });
            }
            vertices.push(new Vertex()
                .text(node.name)
                .textbox_shape_colorStroke(palette(node.group))
                .textbox_shape_colorFill("whitesmoke")
                .icon_shape_colorStroke(palette(node.group))
                .icon_shape_colorFill(palette(node.group))
                .annotationIcons(annotation)
                .faChar(node.name[0])
            );
        }, this);

        function createEdge(source, target, label) {
            return new Edge()
                .sourceVertex(source)
                .targetVertex(target)
                .sourceMarker("circleFoot")
                .targetMarker("arrowHead")
                .text(label || "")
            ;
        }
        rawData.links.forEach(function (link, idx) {
            edges.push(createEdge(vertices[link.source], vertices[link.target]).weight(link.value));
        }, this);

        this.data({ vertices: vertices, edges: edges });
        return this;
    };

    Graph.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (!this._data.merge) {
                this.graphData = new GraphData();
                this._renderCount = 0;
            }
            var data = this.graphData.setData(this._data.vertices, this._data.edges, this._data.hierarchy, this._data.merge);

            var context = this;
            data.addedVertices.forEach(function (item) {
                item.pos({
                    x: +Math.random() * 10 / 2 - 5,
                    y: +Math.random() * 10 / 2 - 5
                });
            });
            data.addedEdges.forEach(function (item) {
                if (item._sourceMarker)
                    item._sourceMarker = context._id + "_" + item._sourceMarker;
                if (item._targetMarker)
                    item._targetMarker = context._id + "_" + item._targetMarker;
            });

            //  Recalculate edge arcs  ---
            var dupMap = {};
            this.graphData.edgeValues().forEach(function (item) {
                if (!dupMap[item._sourceVertex._id]) {
                    dupMap[item._sourceVertex._id] = {};
                }
                if (!dupMap[item._sourceVertex._id][item._targetVertex._id]) {
                    dupMap[item._sourceVertex._id][item._targetVertex._id] = 0;
                }
                var dupEdgeCount = ++dupMap[item._sourceVertex._id][item._targetVertex._id];
                item.arcDepth(16 * dupEdgeCount);
            });
        }
        return retVal;
    };

    Graph.prototype.selection = function (_) {
        if (!arguments.length) return this._selection.get();
        this._selection.set(_);
        return this;
    };

    Graph.prototype.setZoom = function (translation, scale, transitionDuration) {
        if (this.zoom) {
            this.zoom.translate(translation);
            this.zoom.scale(scale);
            this.applyZoom(transitionDuration);
        }
    };

    Graph.prototype.applyZoom = function (transitionDuration) {
        if (d3.event && d3.event.sourceEvent && !d3.event.sourceEvent.ctrlKey && (d3.event.sourceEvent.type === "wheel" || d3.event.sourceEvent.type === "mousewheel" || d3.event.sourceEvent.type === "DOMMouseScroll")) {
            if (d3.event.sourceEvent.wheelDelta) {
                this.zoom.translate([this.prevTranslate[0], this.prevTranslate[1] + d3.event.sourceEvent.wheelDelta]);
                this.zoom.scale(this.prevScale);
            }
        }
        (transitionDuration ? this.svg.transition().duration(transitionDuration) : this.svg)
            .attr("transform", "translate(" + this.zoom.translate() + ")scale(" + this.zoom.scale() + ")")
        ;
        this.prevTranslate = this.zoom.translate();
        if (this.prevScale !== this.zoom.scale()) {
            this._fixIEMarkers();
            this.prevScale = this.zoom.scale();
        }
        this.brush.x(d3.scale.identity().domain([(-this.prevTranslate[0] - this._size.width / 2) * 1 / this.zoom.scale(), (-this.prevTranslate[0] + this._size.width / 2) * 1 / this.zoom.scale()]));
        this.brush.y(d3.scale.identity().domain([(-this.prevTranslate[1] - this._size.height / 2) * 1 / this.zoom.scale(), (-this.prevTranslate[1] + this._size.height / 2) * 1 / this.zoom.scale()]));
    };

    Graph.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        var context = this;

        //  Zoom  ---
        this.prevTranslate = [0, 0];
        this.prevScale = 1;
        this.zoom = d3.behavior.zoom()
            .scaleExtent([0.01, 4])
            .on("zoomstart", function (args) {
                context.prevTranslate = context.zoom.translate();
                context.prevScale = context.zoom.scale();
                if (d3.event.sourceEvent && d3.event.sourceEvent.shiftKey && d3.event.sourceEvent.ctrlKey) {
                    context._zoomMode = "selection";
                } else if (d3.event.sourceEvent && d3.event.sourceEvent.shiftKey) {
                    context._zoomMode = "selection";
                    context._selection.clear();
                } else {
                    context._zoomMode = "zoom";
                }
                switch (context._zoomMode) {
                    case "selection":
                        element.select(".extent")
                            .style("visibility", null)
                        ;
                        break;
                    default:
                        element.select(".extent")
                            .style("visibility", "hidden")
                        ;
                        break;
                }
            })
            .on("zoomend", function (args) {
                switch (context._zoomMode) {
                    case "selection":
                        context.zoom.translate(context.prevTranslate);
                        context.zoom.scale(context.prevScale);
                        break;
                    default:
                        break;
                }
                context._svgBrush.call(context.brush.clear());
            })
            .on("zoom", function (d) {
                switch (context._zoomMode) {
                    case "selection":
                        break;
                    default:
                        context.applyZoom();
                        break;
                }
            })
        ;
        this.brush = d3.svg.brush()
            .x(d3.scale.identity().domain([-context._size.width / 2, context._size.width / 2]))
            .y(d3.scale.identity().domain([-context._size.height / 2, context._size.height / 2]))
            .on("brushstart", function (args) {
                switch (context._zoomMode) {
                    case "selection":
                        break;
                    default:
                        break;
                }
            })
            .on("brushend", function (args) {
                switch (context._zoomMode) {
                    case "selection":
                        var extent = d3.event.target.extent();
                        context.svgV.selectAll(".graphVertex").select("*")
                            .each(function (d) {
                                if (extent[0][0] <= d.x() && d.x() < extent[1][0] && extent[0][1] <= d.y() && d.y() < extent[1][1]) {
                                    context._selection.append(d);
                                }
                            })
                        ;
                        context.graph_selection(context.selection());
                        break;
                    default:
                        break;
                }
            })
            .on("brush", function () {
                switch (context._zoomMode) {
                    case "selection":
                        var zt = context.zoom.translate();
                        console.log(zt[0]);
                        var extent = d3.event.target.extent();
                        context.svgV.selectAll(".graphVertex").select("*")
                            .classed("selected", function (d) {
                                return context._selection.isSelected(d) ||
                                    (extent[0][0] <= d.x() && d.x() < extent[1][0] && extent[0][1] <= d.y() && d.y() < extent[1][1]);
                            })
                        ;
                        break;
                    default:
                        break;
                }
            })
        ;

        //  Drag  ---
        function dragstart(d) {
            if (context.allowDragging()) {
                d3.event.sourceEvent.stopPropagation();
                context._dragging = true;
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = true;
                }
                if (context.svgMarkerGlitch) {
                    context.graphData.nodeEdges(d.id()).forEach(function (id) {
                        var edge = context.graphData.edge(id);
                        context._pushMarkers(edge.element(), edge);
                    });
                }
            }
        }
        function drag(d) {
            if (context.allowDragging()) {
                d3.event.sourceEvent.stopPropagation();
                d.move({ x: d3.event.x, y: d3.event.y });
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = true;
                    forceNode.x = forceNode.px = d3.event.x;
                    forceNode.y = forceNode.py = d3.event.y;
                }
                context.refreshIncidentEdges(d, true);
            }
        }
        function dragend(d) {
            if (context.allowDragging()) {
                d3.event.sourceEvent.stopPropagation();
                context._dragging = false;
                if (context.snapToGrid()) {
                    var snapLoc = d.calcSnap(context.snapToGrid());
                    d.move(snapLoc[0]);
                    context.refreshIncidentEdges(d, true);
                }
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = false;
                }
                if (context.svgMarkerGlitch) {
                    context.graphData.nodeEdges(d.id()).forEach(function (id) {
                        var edge = context.graphData.edge(id);
                        context._popMarkers(edge.element(), edge);
                    });
                }
            }
        }
        this.drag = d3.behavior.drag()
            .origin(function (d) {
                return d.pos();
            })
            .on("dragstart", dragstart)
            .on("dragend", dragend)
            .on("drag", drag)
        ;
        //  SVG  ---
        this._svgZoom = element.append("rect")
            .attr("class", "zoom")
            .attr("x", -this._size.width / 2)
            .attr("y", -this._size.height / 2)
            .attr("width", this._size.width)
            .attr("height", this._size.height)
        ;

        this.defs = element.append("defs");
        this.addMarkers();

        element.call(this.zoom);

        this.svg = element.append("g");
        this._svgBrush = this.svg.append("g").attr("class", "selectionBrush").call(this.brush);
        this._svgBrush.select(".background").style("cursor", null);
        context._svgBrush.call(context.brush.clear());
        this.svgC = this.svg.append("g").attr("id", this._id + "C");
        this.svgE = this.svg.append("g").attr("id", this._id + "E");
        this.svgV = this.svg.append("g").attr("id", this._id + "V");
    };

    Graph.prototype.getBounds = function (items, layoutEngine) {
        var vBounds = [[null, null], [null, null]];
        items.forEach(function (item) {
            var pos = layoutEngine ? layoutEngine.nodePos(item._id) : {x: item.x(), y: item.y(), width: item.width(), height: item.height()};
            var leftX = pos.x - pos.width / 2;
            var rightX = pos.x + pos.width / 2;
            var topY = pos.y - pos.height / 2;
            var bottomY = pos.y + pos.height / 2;
            if (vBounds[0][0] === null || vBounds[0][0] > leftX) {
                vBounds[0][0] = leftX;
            }
            if (vBounds[0][1] === null || vBounds[0][1] > topY) {
                vBounds[0][1] = topY;
            }
            if (vBounds[1][0] === null || vBounds[1][0] < rightX) {
                vBounds[1][0] = rightX;
            }
            if (vBounds[1][1] === null || vBounds[1][1] < bottomY) {
                vBounds[1][1] = bottomY;
            }
        });
        return vBounds;
    };

    Graph.prototype.getVertexBounds = function (layoutEngine) {
        return this.getBounds(this.graphData.nodeValues(), layoutEngine);
    };

    Graph.prototype.getSelectionBounds = function (layoutEngine) {
        return this.getBounds(this._selection.get(), layoutEngine);
    };

    Graph.prototype.shrinkToFit = function (bounds, transitionDuration) {
        var width = this.width();
        var height = this.height();

        var dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = 1.0 / Math.max(dx / width, dy / height);
        if (scale > 1) {
            scale = 1;
        }
        var translate = [-scale * x, -scale * y];
        this.setZoom(translate, scale, transitionDuration);
    };

    Graph.prototype._origScale = Graph.prototype.scale;
    Graph.prototype.scale = function (_, transitionDuration) {
        var retVal = Graph.prototype._origScale.apply(this, arguments);
        if (arguments.length) {
            this.zoomTo(_, transitionDuration);
        }
        return retVal;
    };

    Graph.prototype.zoomTo = function (level, transitionDuration) {
        switch (level) {
            case "all":
                this.shrinkToFit(this.getVertexBounds(), transitionDuration);
                break;
            case "width":
                var bounds = this.getVertexBounds();
                bounds[0][1] = 0;
                bounds[1][1] = 0;
                this.shrinkToFit(bounds, transitionDuration);
                break;
            case "selection":
                this.shrinkToFit(this._selection.isEmpty() ? this.getVertexBounds() : this.getSelectionBounds(), transitionDuration);
                break;
            default:
                var scale = parseInt(level);
                if (isNaN(scale) || scale <= 0 || scale > 200) {
                    scale = 100;
                }
                this.zoom.scale(scale / 100);
                this.applyZoom(transitionDuration);
                break;
        }
    };

    Graph.prototype.centerOn = function (bounds, transitionDuration) {
        var x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2;
        var translate = [x, y];
        this.setZoom(translate, 1, transitionDuration);
    };

    Graph.prototype._origLayout = Graph.prototype.layout;
    Graph.prototype.layout = function (_, transitionDuration) {
        var retVal = Graph.prototype._origLayout.apply(this, arguments);
        if (arguments.length) {
            if (this._renderCount) {
                if (this.forceLayout) {
                    this.forceLayout.force.stop();
                    this.forceLayout = null;
                }

                var context = this;
                var layoutEngine = this.getLayoutEngine();
                if (this.layout() === "ForceDirected2") {
                    this.forceLayout = layoutEngine;
                    this.forceLayout.force.on("tick", function (d) {
                        layoutEngine.vertices.forEach(function (item) {
                            var vertex = context.graphData.node(item.id);
                            if (item.fixed) {
                                item.x = item.px;
                                item.y = item.py;
                            } else {
                                item.px = item.x;
                                item.py = item.y;
                                vertex
                                    .move({ x: item.x, y: item.y })
                                ;
                            }
                        });
                        context.graphData.edgeValues().forEach(function (item) {
                            item
                                .points([], false, false)
                            ;
                        });
                        if (context.applyScaleOnLayout()) {
                            var vBounds = context.getVertexBounds(layoutEngine);
                            context.shrinkToFit(vBounds);
                        }
                    });
                    this.forceLayout.force.start();
                } else if (layoutEngine) {
                    this.forceLayout = null;
                    context._dragging = true;
                    context.graphData.nodeValues().forEach(function (item) {
                        var pos = layoutEngine.nodePos(item._id);
                        item.move({ x: pos.x, y: pos.y }, transitionDuration);
                        if (pos.width && pos.height && !item.width() && !item.height()) {
                            item
                                .width(pos.width)
                                .height(pos.height)
                                .render()
                            ;
                        }
                    });
                    context.graphData.edgeValues().forEach(function (item) {
                        var points = layoutEngine.edgePoints(item);
                        item
                            .points(points, transitionDuration)
                        ;
                    });

                    if (context.applyScaleOnLayout()) {
                        var vBounds = context.getVertexBounds(layoutEngine);
                        context.shrinkToFit(vBounds, transitionDuration);
                    }
                    this._fixIEMarkers();
                    setTimeout(function () {
                        context._dragging = false;
                    }, transitionDuration ? transitionDuration + 50 : 50);  //  Prevents highlighting during morph  ---
                }
            }
        }
        return retVal;
    };

    //  Render  ---
    Graph.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        //  Create  ---
        var vertexElements = this.svgV.selectAll("#" + this._id + "V > .graphVertex").data(this.graphData.nodeValues(), function (d) { return d.id(); });
        vertexElements.enter().append("g")
            .attr("class", "graphVertex")
            .style("opacity", 1e-6)
             //  TODO:  Events need to be optional  ---
            .on("click.selectionBag", function (d) {
                context._selection.click(d, d3.event);
            })
            .on("click", function (d) {
                context.vertex_click(d, d3.event);
            })
            .on("dblclick", function (d) {
                context.vertex_dblclick(d, d3.event);
            })
            .on("mouseover", function (d) {
                if (context._dragging)
                    return;
                context.vertex_mouseover(d3.select(this), d);
            })
            .on("mouseout", function (d) {
                if (context._dragging)
                    return;
                context.vertex_mouseout(d3.select(this), d);
            })
            .each(createV)
            .transition()
            .duration(750)
            .style("opacity", 1)
        ;
        function createV(d) {
            d
                .target(this)
                .render()
            ;
            d.element()
                .call(context.drag)
            ;
            if (d.dispatch) {
                d.dispatch.on("sizestart", function (d, loc) {
                    d.allowResize(context.allowDragging());
                    if (context.allowDragging()) {
                        context._dragging = true;
                    }
                });
                d.dispatch.on("size", function (d, loc) {
                    context.refreshIncidentEdges(d, false);
                });
                d.dispatch.on("sizeend", function (d, loc) {
                    context._dragging = false;
                    if (context.snapToGrid()) {
                        var snapLoc = d.calcSnap(context.snapToGrid());
                        d
                            .pos(snapLoc[0])
                            .size(snapLoc[1])
                            .render()
                        ;
                        context.refreshIncidentEdges(d, false);
                    }
                });
            }
        }

        var edgeElements = this.svgE.selectAll("#" + this._id + "E > .edge").data(this.showEdges() ? this.graphData.edgeValues() : [], function (d) { return d.id(); });
        edgeElements.enter().append("g")
            .attr("class", "edge")
            .style("opacity", 1e-6)
            .on("click", function (d) {
                context.edge_click(d);
            })
            .on("mouseover", function (d) {
                if (context._dragging)
                    return;
                context.edge_mouseover(d3.select(this), d);
            })
            .on("mouseout", function (d) {
                if (context._dragging)
                    return;
                context.edge_mouseout(d3.select(this), d);
            })
            .each(createE)
            .transition()
            .duration(750)
            .style("opacity", 1)
        ;
        function createE(d) {
            d
                .target(this)
                .render()
            ;
        }

        //  Update  ---
        vertexElements
            .each(updateV)
        ;
        function updateV(d) {
            d
                .render()
            ;
        }

        edgeElements
            .each(updateE)
        ;
        function updateE(d) {
            d
                .render()
            ;
        }

        //  Exit  ---
        vertexElements.exit()
            .each(function (d) { d.target(null); })
            .remove()
        ;
        edgeElements.exit()
            .each(function (d) { d.target(null); })
            .remove()
        ;

        if (!this._renderCount) {
            this._renderCount++;
            this.setZoom([0, 0], 1);
            this.layout(this.layout());
        }
    };

    //  Methods  ---
    Graph.prototype.getLayoutEngine = function () {
        switch (this.layout()) {
            case "Circle":
                return new GraphLayouts.Circle(this.graphData, this._size.width, this._size.height);
            case "ForceDirected":
                return new GraphLayouts.ForceDirected(this.graphData, this._size.width, this._size.height, true);
            case "ForceDirected2":
                return new GraphLayouts.ForceDirected(this.graphData, this._size.width, this._size.height);
            case "Hierarchy":
                return new GraphLayouts.Hierarchy(this.graphData, this._size.width, this._size.height, {
                    rankdir: this.hierarchyRankDirection(),
                    nodesep: this.hierarchyNodeSeparation(),
                    edgesep: this.hierarchyEdgeSeparation(),
                    ranksep: this.hierarchyRankSeparation()
                });
        }
        return null;//new GraphLayouts.None(this.graphData, this._size.width, this._size.height);
    };

    Graph.prototype.getNeighborMap = function (vertex) {
        var vertices = {};
        var edges = {};

        if (vertex) {
            edges = this.graphData.nodeEdges(vertex.id());
            for (var i = 0; i < edges.length; ++i) {
                var edge = this.graphData.edge(edges[i]);
                edges[edge.id()] = edge;
                if (edge._sourceVertex.id() !== vertex.id()) {
                    vertices[edge._sourceVertex.id()] = edge._sourceVertex;
                }
                if (edge._targetVertex.id() !== vertex.id()) {
                    vertices[edge._targetVertex.id()] = edge._targetVertex;
                }
            }
        }

        return {
            vertices: vertices,
            edges: edges
        };
    };

    Graph.prototype.highlightVerticies = function (vertexMap) {
        var context = this;
        var vertexElements = this.svgV.selectAll(".graphVertex");
        vertexElements.transition().duration(this.transitionDuration())
            .each("end", function (d) {
                if (vertexMap && vertexMap[d.id()]) {
                    if (d._parentElement.node() && d._parentElement.node().parentNode) {
                        d._parentElement.node().parentNode.appendChild(d._parentElement.node());
                    }
                }
            })
            .style("opacity", function (d) {
                if (!vertexMap || vertexMap[d.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
        ;
        return this;
    };

    Graph.prototype.highlightEdges = function (edgeMap) {
        var context = this;
        var edgeElements = this.svgE.selectAll(".edge");
        edgeElements
            .style("stroke-width", function (o) {
                if (edgeMap && edgeMap[o.id()]) {
                    return context.highlight.edge;
                }
                return "1px";
            }).transition().duration(this.transitionDuration())
            .style("opacity", function (o) {
                if (!edgeMap || edgeMap[o.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
        ;
        return this;
    };

    Graph.prototype.highlightVertex = function (element, d) {
        if (this.highlightOnMouseOverVertex()) {
            if (d) {
                var highlight = this.getNeighborMap(d);
                highlight.vertices[d.id()] = d;
                this.highlightVerticies(highlight.vertices);
                this.highlightEdges(highlight.edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    };

    Graph.prototype.highlightEdge = function (element, d) {
        if (this.highlightOnMouseOverEdge()) {
            if (d) {
                var vertices = {};
                vertices[d._sourceVertex.id()] = d._sourceVertex;
                vertices[d._targetVertex.id()] = d._targetVertex;
                var edges = {};
                edges[d.id()] = d;
                this.highlightVerticies(vertices);
                this.highlightEdges(edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    };

    Graph.prototype.refreshIncidentEdges = function (d, skipPushMarkers) {
        var context = this;
        this.graphData.nodeEdges(d.id()).forEach(function (id) {
            var edge = context.graphData.edge(id);
            edge
                .points([], false, skipPushMarkers)
            ;
        });
    };

    //  Events  ---
    Graph.prototype.graph_selection = function (selection) {
    };

    Graph.prototype.vertex_click = function (d) {
        d._parentElement.node().parentNode.appendChild(d._parentElement.node());
        IGraph.prototype.vertex_click.apply(this, arguments);
    };

    Graph.prototype.vertex_dblclick = function (d) {
    };

    Graph.prototype.vertex_mouseover = function (element, d) {
        this.highlightVertex(element, d);
    };

    Graph.prototype.vertex_mouseout = function (d, self) {
        this.highlightVertex(null, null);
    };

    Graph.prototype.edge_mouseover = function (element, d) {
        this.highlightEdge(element, d);
    };

    Graph.prototype.edge_mouseout = function (d, self) {
        this.highlightEdge(null, null);
    };

    Graph.prototype.addMarkers = function (clearFirst) {
        if (clearFirst) {
            this.defs.select("#" + this._id + "_arrowHead").remove();
            this.defs.select("#" + this._id + "_circleFoot").remove();
            this.defs.select("#" + this._id + "_circleHead").remove();
        }
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_arrowHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
                .attr("points", "0,0 10,5 0,10 1,5")
        ;
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id",  this._id + "_circleFoot")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 1)
            .attr("refY", 5)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
                .attr("cx", 5)
                .attr("cy", 5)
                .attr("r", 4)
        ;
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_circleHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 9)
            .attr("refY", 5)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
                .attr("cx", 5)
                .attr("cy", 5)
                .attr("r", 4)
        ;
    };

    return Graph;
}));
