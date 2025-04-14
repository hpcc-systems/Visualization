import { svg } from "lit-html";
import type { SubgraphBaseProps, EdgeBaseProps, VertexBaseProps } from "../common/layouts/placeholders.ts";
import { GraphHtmlT } from "./graphHtmlT.ts";

export interface EdgeProps<V extends VertexBaseProps> extends EdgeBaseProps<V> {
    graphInstance: GraphHtmlT<SubgraphBaseProps, V, EdgeProps<V>>;
}

export const edge = ({
    graphInstance,
    strokeWidth,
    path
}: EdgeProps<VertexBaseProps>) => {
    return svg`<path d="${path}" marker-start="url(#${graphInstance.id()}_source${graphInstance.sourceMarker()})" marker-end="url(#${graphInstance.id()}_target${graphInstance.targetMarker()})" style="stroke-width:${strokeWidth}px"></path>`;
};
