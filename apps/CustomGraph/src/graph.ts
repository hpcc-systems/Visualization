import { GraphReactT } from "@hpcc-js/graph";
import { data } from "./data";
import { CustomVertex, CustomVertexProps } from "./vertex";
import { CustomEdge, CustomEdgeProps } from "./edge";

const vertices = data.vertices.map((v, idx): CustomVertexProps => {
    return {
        id: idx,
        text: v.name,
        scale: 0.5 + v.group / 5,
        categoryID: "" + v.group
    };
});

const edges = data.edges.map((e, idx): CustomEdgeProps => {
    return {
        id: idx,
        source: vertices[e.source],
        target: vertices[e.target],
        label: "",
        width: e.value
    };
});

export class CustomGraph extends GraphReactT<any, CustomVertexProps, CustomEdgeProps> {

    constructor() {
        super(undefined, CustomVertex, CustomEdge);

        this
            .data({ vertices, edges })
            .layout("ForceDirectedHybrid")
            .edgeArcDepth(0)
            .applyScaleOnLayout(true)

            //  Events  ---
            .on("vertex_mousein", (vertex, col, sel, anno) => console.info("vertex_mousein", vertex, anno))
            .on("vertex_mouseout", (vertex, col, sel, anno) => console.info("vertex_mouseout", vertex, anno))
            .on("vertex_mouseover", (vertex, col, sel, anno) => console.info("vertex_mouseover", vertex, anno))
            .on("vertex_click", (vertex, col, sel, anno) => console.info("vertex_click", vertex, anno))
            .on("vertex_dblclick", (vertex, col, sel, anno) => console.info("vertex_dblclick", vertex, anno))
            ;
    }
}
