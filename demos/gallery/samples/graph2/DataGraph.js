import { DataGraph } from "@hpcc-js/graph";

new DataGraph()
    .edgeColorColumn("color")
    .vertexColumns(["category", "id", "label", "centroid", "faChar", "tooltip"])
    .vertices([
        [0, 0, "Aaaa", true, "A", ""],
        [0, 1, "Bbbb", false, "B", ""],
        [0, 2, "Cccc", false, "C", ""],
    ])
    .edgeColumns(["id", "source", "target", "label", "weight", "color"])
    .edges([
        [0, 0, 1, "Yellow", 1, "#ffff00"],
        [1, 1, 2, "Teal", 1, "#00ffff"],
    ])
    .target("target")
    .layout("ForceDirected")
    .applyScaleOnLayout(true)
    .allowDragging(false)
    .zoomToFitLimit(1)
    .render()
    ;
