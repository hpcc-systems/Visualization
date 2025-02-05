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
    path
}: EdgeBaseProps<VertexBaseProps>) => {
    return svg`<path d="${path}" style="stroke-width:${strokeWidth}px"></path>`;
};

export class GraphHtmlT<SG extends SubgraphBaseProps, V extends VertexBaseProps, E extends EdgeBaseProps<V>> extends GraphT<SG, V, E> {

    constructor(subgraphRenderer: Component<SG> = defaultSubgraphRenderer, vertexRenderer: Component<V> = defaultVertexRenderer, edgeRenderer: Component<E> = defaultEdgeRenderer) {
        super(adapter(subgraphRenderer), adapter<V>(vertexRenderer), adapter(edgeRenderer));
    }

    enterMarkers(clearFirst: boolean = false) {
        if (clearFirst) {
            this._svgDefs.select("#" + this._id + "_sourceDot").remove();
            this._svgDefs.select("#" + this._id + "_targetDot").remove();
            this._svgDefs.select("#" + this._id + "_targetArrow").remove();
        }
        this._svgDefs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_sourceDot")
            .attr("refX", 1)
            .attr("refY", 3)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
            .attr("cx", 3)
            .attr("cy", 3)
            .attr("r", 1.5)
            .attr("fill", "context-stroke")
            .attr("stroke", "context-stroke")
            ;
        this._svgDefs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_targetDot")
            .attr("refX", 5)
            .attr("refY", 3)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
            .attr("cx", 3)
            .attr("cy", 3)
            .attr("r", 1.5)
            .attr("fill", "context-stroke")
            .attr("stroke", "context-stroke")
            ;
        this._svgDefs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_targetArrow")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 5)
            .attr("markerHeight", 5)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
            .attr("points", "0,0 10,5 0,10 0,5")
            .attr("fill", "context-stroke")
            .attr("stroke", "context-stroke")
            ;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.enterMarkers();
    }
}
GraphHtmlT.prototype._class += " graph_GraphHtmlT";

export interface GraphHtmlT<SG extends SubgraphBaseProps, V extends VertexBaseProps, E extends EdgeBaseProps<V>> extends GraphT<SG, V, E> {
    sourceMarker(): "Dot" | "None";
    sourceMarker(_: "Dot" | "None"): this;
    targetMarker(): "Arrow" | "Dot" | "None";
    targetMarker(_: "Arrow" | "Dot" | "None"): this;
}

GraphHtmlT.prototype.publish("sourceMarker", "Dot", "set", "Target Marker", ["Dot", "None"]);
GraphHtmlT.prototype.publish("targetMarker", "Arrow", "set", "Target Marker", ["Arrow", "Dot", "None"]);
