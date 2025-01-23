import { html, svg, render } from "lit-html";
import type { BaseProps, EdgeBaseProps, SubgraphBaseProps, VertexBaseProps } from "../common/graphT.ts";
import { GraphT, RendererT } from "../common/graphT.ts";
import type { Component } from "./component.ts";
import { TextBox } from "./textBox.ts";
import { icon } from "./icon.ts";

export { html, svg, EdgeBaseProps, SubgraphBaseProps, VertexBaseProps };

export function adapter<T extends BaseProps>(component: Component<T>): RendererT<T> {
    return (props: T, element: SVGGElement) => {
        const componentTpl = component(props);
        render(componentTpl, element as any);
        return componentTpl;
    };
}

const defaultSubgraphRenderer = ({
    text = "",
}: SubgraphBaseProps) => {
    return svg`<text font-family="monospace" font-size="10px" text-anchor="middle" dominant-baseline="middle" fill="black">${text}</text>`;
};

const defaultVertexRenderer = ({
    text
}: VertexBaseProps) => {

    return svg`\
    ${icon({ imageChar: "" })}
    ${TextBox({ text: { text } })}
`;
};

const defaultEdgeRenderer = ({
    strokeWidth,
    path,
    markerStart,
    markerEnd,
}: EdgeBaseProps<VertexBaseProps>) => {
    return svg`<path d="${path}" marker-start="${markerStart}" marker-end="${markerEnd}" style="stroke-width:${strokeWidth}px"></path>`;
};

export class GraphHtmlT<SG extends SubgraphBaseProps, V extends VertexBaseProps, E extends EdgeBaseProps<V>> extends GraphT<SG, V, E> {

    constructor(subgraphRenderer: Component<SG> = defaultSubgraphRenderer, vertexRenderer: Component<V> = defaultVertexRenderer, edgeRenderer: Component<E> = defaultEdgeRenderer) {
        super(adapter(subgraphRenderer), adapter<V>(vertexRenderer), adapter(edgeRenderer));
    }
}
GraphHtmlT.prototype._class += " graph_GraphHtmlT";
