import { render, React, SubgraphProps, VertexProps } from "@hpcc-js/react";
import { EdgeProps, GraphT, RendererT } from "./graphT";

function adapter<T>(reactRenderer: React.FunctionComponent<T>): RendererT<T> {
    return (props: T, element: SVGGElement) => render(reactRenderer, props, element);
}

export class GraphReactT<SG extends SubgraphProps, V extends VertexProps, E extends EdgeProps> extends GraphT<SG, V, E>  {

    constructor(subgraphRenderer: React.FunctionComponent<SG>, vertexRenderer: React.FunctionComponent<V>, edgeRenderer: React.FunctionComponent<E>) {
        super(adapter(subgraphRenderer), adapter(vertexRenderer), adapter(edgeRenderer));
    }

    private _reactSubgraphRenderer: React.FunctionComponent<SG>;
    subgraphRenderer(): React.FunctionComponent<SG>;
    subgraphRenderer(_: React.FunctionComponent<SG>): this;
    subgraphRenderer(_?: React.FunctionComponent<SG>): this | React.FunctionComponent<SG> {
        if (!arguments.length) return this._reactSubgraphRenderer;
        this._reactSubgraphRenderer = _;
        super.subgraphRenderer(adapter(this._reactSubgraphRenderer));
        return this;
    }

    private _reactVertexRenderer: React.FunctionComponent<V>;
    vertexRenderer(): React.FunctionComponent<V>;
    vertexRenderer(_: React.FunctionComponent<V>): this;
    vertexRenderer(_?: React.FunctionComponent<V>): this | React.FunctionComponent<V> {
        if (!arguments.length) return this._reactVertexRenderer;
        this._reactVertexRenderer = _;
        super.vertexRenderer((props: V, element: SVGGElement) => render(this._reactVertexRenderer, props, element));
        return this;
    }

    private _reactEdgeRenderer: React.FunctionComponent<E>;
    edgeRenderer(): React.FunctionComponent<E>;
    edgeRenderer(_: React.FunctionComponent<E>): this;
    edgeRenderer(_?: React.FunctionComponent<E>): this | React.FunctionComponent<E> {
        if (!arguments.length) return this._reactEdgeRenderer;
        this._reactEdgeRenderer = _;
        super.edgeRenderer((props: E, element: SVGGElement) => render(this._reactEdgeRenderer, props, element));
        return this;
    }
}
