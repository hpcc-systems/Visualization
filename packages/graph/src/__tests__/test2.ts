import { DataGraph } from "../graph2/dataGraph";
import { genData2 } from "./data";

export class Test2 extends DataGraph {

    constructor() {
        super();
        const g = genData2();
        this
            .layout("ForceDirected")
            .forceDirectedRepulsionStrength(-3500)
            .forceDirectedLinkDistance(150)
            .forceDirectedLinkStrength(1.5)
            .forceDirectedPinCentroid(true)
            .hierarchyDigraph(false)

            .centroidColor("#777777")

            .selectionGlowColor("#555555")
            .highlightOnMouseOverEdge(true)
            .highlightOnMouseOverVertex(true)
            .showVertexLabels(true)

            .applyScaleOnLayout(true)
            .zoomToFitLimit(1)

            .edgeArcDepth(8)
            .edgeStrokeWidth(2)
            .edgeColor("#287EC4")

            .allowDragging(true)

            .annotations([{
                id: "0",
                imageChar: "fa-plus",
                fill: "white",
                stroke: "whitesmoke",
                imageCharFill: "red"
            }, {
                id: "1",
                imageChar: "fa-star",
                fill: "navy",
                imageCharFill: "white"
            }])

            .vertexColumns(["id", "label", "fachar", "centroid", "ann1", "ann2", "expandedFAChar"])
            .vertexCentroidColumn("centroid")
            .vertexFACharColumn("fachar")
            .vertexIDColumn("id")
            .vertexLabelColumn("label")
            .vertexAnnotationColumns([
                { columnID: "ann1", annotationID: "0" } as any,
                { columnID: "ann2", annotationID: "1" } as any
            ])
            .vertexExpansionFACharColumn("expandedFAChar")
            .vertices(g.vertices)

            .edgeColumns(["source", "target", "label", "weightXXX"])
            // .edgeIDColumn("id")
            .edgeSourceColumn("source")
            .edgeTargetColumn("target")
            .edgeLabelColumn("label")
            // .edgeWeightColumn("weight")
            .edges(g.edges)

            //  Events  ---
            .on("vertex_mousein", (vertex, col, sel, anno) => console.info("vertex_mousein", vertex, anno))
            .on("vertex_mouseout", (vertex, col, sel, anno) => console.info("vertex_mouseout", vertex, anno))
            .on("vertex_mouseover", (vertex, col, sel, anno) => console.info("vertex_mouseover", vertex, anno))
            .on("vertex_click", (vertex, col, sel, anno) => console.info("vertex_click", vertex, anno))
            .on("vertex_dblclick", (vertex, col, sel, anno) => console.info("vertex_dblclick", vertex, anno))
            ;

        setTimeout(() => {
            // this.downloadPNG();
        }, 3000);
    }
}

