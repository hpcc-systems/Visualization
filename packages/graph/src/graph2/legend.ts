import { Vertex2 } from "@hpcc-js/react";
import { Graph2 } from "./graph";

export class GraphLegend extends Graph2 {

    constructor() {
        super();
        this._iconBar.buttons([]);
        this.vertexRenderer(Vertex2)
            .layout("Hierarchy")
            .hierarchyRankDirection("LR")
            .hierarchyNodeSeparation(30)
            .allowDragging(false)
            .highlightOnMouseOverVertex(false)
            ;
    }

    update(domNode, element) {

        const dataHasChanged = true;

        if (dataHasChanged) {
            const categories = [];
            const vertices = [];
            let id = 0;
            const targetVertices = this.graph().data().vertices;
            const targetCategories = this.graph().categories();
            const targetAnnotations = this.graph().annotations();
            targetCategories.forEach((category, i) => {
                categories.push({
                    ...category,
                    offsetTextY: 8,
                    id
                });
                const catCount = targetVertices.filter(n => n.categoryID === category.id).length;
                vertices.push({
                    ...category,
                    categoryID: id,
                    text: `${category.description ? category.description : `Category #${i}`} (${catCount})`,
                    textboxFill: "transparent",
                    textboxStroke: "transparent",
                    offsetTextY: 8,
                    id: id + targetAnnotations.length + targetCategories.length
                });
                id++;
            });
            targetAnnotations.forEach((annotation, i) => {
                categories.push({
                    ...annotation,
                    shape: "square",
                    offsetTextY: 8,
                    id
                });
                const annoCount = targetVertices.filter(n => n.annotations && (n.annotations as any).includes(annotation.id)).length;
                vertices.push({
                    ...annotation,
                    categoryID: id,
                    textboxFill: "transparent",
                    textboxStroke: "transparent",
                    offsetTextY: 8,
                    text: `${annotation.description ? annotation.description : `Annotation #${i}`} (${annoCount})`,
                    id: id + targetAnnotations.length + targetCategories.length
                });
                id++;
            });
            this.categories(categories);
            this.data({
                vertices,
                edges: []
            });
        }

        super.update(domNode, element);
    }
}
GraphLegend.prototype._class += " graph_GraphLegend";

export interface GraphLegend {
    graph(): Graph2;
    graph(_: Graph2): this;
}

GraphLegend.prototype.publish("graph", null, "widget", "Graph that provides legend content");
