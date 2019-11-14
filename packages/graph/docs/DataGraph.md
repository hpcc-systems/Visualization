# DataGraph

```sample-code
import { AnnotationColumn, DataGraph } from "@hpcc-js/graph";

new DataGraph()
    .target("target")
    .categories([{
        id: 0,
        faChar: "fa-question"
    },{
        id: 1,
        faChar: "fa-user"
    },{
        id: 2,
        faChar: "fa-user"
    }])
    .annotations([{
        id: 0,
        faChar: "fa-plus",
        fill: "white",
        stroke: "whitesmoke",
        faCharFill: "red"
    },{
        id: 1,
        faChar: "fa-star",
        fill: "navy",
        faCharFill: "white"
    }])
    .vertexColumns(["id", "label", "group", "centroid", "ann1", "ann2", "ann3"])
    .vertexCategoryColumn("group")
    .vertexIDColumn("id")
    .vertexLabelColumn("label")
    .vertexAnnotationColumns([
        new AnnotationColumn().columnID("ann1").annotationID("0"),
        new AnnotationColumn().columnID("ann2").annotationID("1")
    ])
    .vertices([
        [0, "Myriel", 1, true],
        [1, "Napoleon", 1, false, true, true],
        [2, "Mlle.Baptistine", 1],
        [3, "Mme.Magloire", 1],
        [4, "CountessdeLo", 1],
        [5, "Geborand", 1],
        [6, "Champtercier", 1],
        [7, "Cravatte", 1],
        [8, "Count", 1],
        [9, "OldMan", 1],
        [10, "Labarre", 2]
    ])
    .edgeColumns(["id", "source", "target", "weight"])
    .edgeIDColumn("id")
    .edgeSourceColumn("source")
    .edgeTargetColumn("target")
    .edgeWeightColumn("weight")
    .edges([
        ["1->0", 1, 0, 1],
        ["2->0", 2, 0, 8],
        ["3->0", 3, 0, 10],
        ["3->2", 3, 2, 6],
        ["4->0", 4, 0, 1],
        ["5->0", 5, 0, 1],
        ["6->0", 6, 0, 1],
        ["7->0", 7, 0, 1],
        ["8->0", 8, 0, 2],
        ["9->0", 9, 0, 1]
    ])
    .render()
    ;
```

