import { DataGraph } from "./graph2/dataGraph";

export class Test extends DataGraph {

    constructor() {
        super();
        this
            .forceDirectedRepulsionStrength(-3500)
            .forceDirectedLinkDistance(150)
            .forceDirectedLinkStrength(1.5)
            .layout("ForceDirectedHybrid")
            .hierarchyDigraph(false)
            .applyScaleOnLayout(true)
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
            .vertexColumns(["id", "label", "fachar", "centroid", "ann1", "ann2", "ann3"])
            .vertexFACharColumn("fachar")
            .vertexIDColumn("id")
            .vertexLabelColumn("label")
            .vertexAnnotationColumns([
                { columnID: "ann1", annotationID: "0" } as any,
                { columnID: "ann2", annotationID: "1" } as any
            ])
            .vertices([
                ["a", "myriel@gmail.com", "fa-at", false],
                [1, "Napoleon", "fa-user-o", false, true, true],
                [2, "Mlle.Baptistine", "fa-user-o"],
                [3, "Mme.Magloire", "fa-user-o"],
                [4, "CountessdeLo", "fa-user-o"],
                [5, "Geborand", "fa-user-o"],
                [6, "Champtercier", "fa-user-o"],
                [7, "Cravatte", "fa-user-o"],
                [8, "(561)888-8888", "fa-phone"],
                [9, "123-12-1234", "fa-address-card-o"],
                [10, "192.168.0.100", "fa-globe"],
                [11, "28 Mean Street, FL 33487", "fa-map-o"],
                [12, "(561)999-9999", "fa-phone"],
                [13, "123-45-6789", "fa-address-card-o"],
                [14, "123-23-2345", "fa-address-card-o"],
                [15, "(561)777-9999", "fa-phone"],
                [16, "123-45-0000", "fa-address-card-o"],
                [17, "192.168.0.22", "fa-globe"],
                [18, "11 Arcia Ave, FL 33487", "fa-map-o"],
                [19, "123-45-1111", "fa-address-card-o"],
                [20, "123-45-1111", "fa-address-card-o"],
                [21, "192.168.0.22", "fa-globe"],
                [22, "(561)777-9999", "fa-phone"],
                [23, "111-11-1111", "fa-address-card-o"],
                [24, "192.168.0.33", "fa-globe"],
            ])
            .edgeColumns(["source", "target", "label", "weightXXX"])
            // .edgeIDColumn("id")
            .edgeSourceColumn("source")
            .edgeTargetColumn("target")
            .edgeLabelColumn("label")
            // .edgeWeightColumn("weight")
            .edges([
                [1, "a", "XXX", 1],
                [2, "a", "", 8],
                [3, "a", "", 10],
                [4, "a", "", 6],
                [5, "a", "", 1],
                [6, "a", "", 1],
                [7, "a", "", 1],
                [1, 8, "", 1],
                [1, 9, "", 1],
                [1, 10, "", 1],
                [1, 11, "", 1],
                [2, 12, "", 1],
                [2, 13, "", 1],
                [2, 10, "", 1],
                [2, 11, "", 1],
                [3, 12, "", 1],
                [3, 14, "", 1],
                [3, 10, "", 1],
                [3, 11, "", 1],
                [4, 15, "", 1],
                [4, 16, "", 1],
                [4, 17, "", 1],
                [17, 11, "", 1],
                [5, 17, "", 1],
                [5, 18, "", 1],
                [5, 19, "", 1],
                [6, 18, "", 1],
                [6, 20, "", 1],
                [6, 21, "", 1],
                [6, 22, "", 1],
                [7, 22, "", 1],
                [7, 23, "", 1],
                [7, 24, "", 1],
            ])
            ;
    }
}
