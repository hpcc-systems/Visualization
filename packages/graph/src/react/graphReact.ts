import { IconEx, Icons, render } from "@hpcc-js/react";
import { React, Subgraph, SubgraphProps, Vertex, VertexProps, Edge, EdgeProps } from "@hpcc-js/react";
import { GraphReactT } from "./graphReactT.ts";
import { GraphDataProps, HierarchyBase } from "../common/graphT.ts";

//  Backward compatibility layer  ---
export type ISubgraph = SubgraphProps;
export type IVertex = VertexProps;
export type IEdge = EdgeProps;
export type IHierarchy = HierarchyBase<ISubgraph, IVertex>;
export type IGraphData2 = GraphDataProps<ISubgraph, IVertex, IEdge>;

export class GraphReact extends GraphReactT<ISubgraph, IVertex, IEdge> {

    constructor() {
        super(Subgraph, Vertex, Edge);
        this._reactCentroidRenderer = Vertex;
        this._reactVertexRenderer2 = Vertex;
        super.vertexRenderer((props) => {
            return props.centroid ? this._reactCentroidRenderer(props) : this._reactVertexRenderer2(props);
        });
    }

    protected _categories: IconEx[] = [];
    categories(): IconEx[];
    categories(_: IconEx[]): this;
    categories(_?: IconEx[]): IconEx[] | this {
        if (_ === void 0) return this._categories;
        this._categories = _;
        return this;
    }

    protected _annotations: IconEx[] = [];
    annotations(): IconEx[];
    annotations(_: IconEx[]): this;
    annotations(_?: IconEx[]): IconEx[] | this {
        if (_ === void 0) return this._annotations;
        this._annotations = _;
        return this;
    }

    calcProps(_props: VertexProps): VertexProps {
        const props = super.calcProps(_props);
        if (!props.icon) props.icon = {};
        if (props.centroid) {
            props.textHeight = props.textHeight ? props.textHeight : this.centroidTextHeight() * this.centroidScale();
            props.textPadding = props.textPadding ? props.textPadding : this.centroidTextPadding() * this.centroidScale();
            props.textFontFamily = props.textFontFamily ? props.textFontFamily : this.centroidLabelFontFamily();
            props.icon.height = props.icon.height ? props.icon.height : this.centroidIconHeight() * this.centroidScale();
            props.icon.padding = props.icon.padding ? props.icon.padding : this.centroidIconPadding() * this.centroidScale();
            props.icon.strokeWidth = props.icon.strokeWidth ? props.icon.strokeWidth : this.centroidIconStrokeWidth();
            props.icon.imageFontFamily = props.icon.imageFontFamily ? props.icon.imageFontFamily : this.centroidIconFontFamily();
        } else {
            props.textHeight = props.textHeight ? props.textHeight : this.vertexTextHeight();
            props.textPadding = props.textPadding ? props.textPadding : this.vertexTextPadding();
            props.textFontFamily = props.textFontFamily ? props.textFontFamily : this.vertexLabelFontFamily();
            props.icon.height = props.icon.height ? props.icon.height : this.vertexIconHeight();
            props.icon.padding = props.icon.padding ? props.icon.padding : this.vertexIconPadding();
            props.icon.strokeWidth = props.icon.strokeWidth ? props.icon.strokeWidth : this.vertexIconStrokeWidth();
            props.icon.imageFontFamily = props.icon.imageFontFamily ? props.icon.imageFontFamily : this.vertexIconFontFamily();
        }
        const text = props.icon.imageChar;
        const fontFamily = props.icon.imageFontFamily;
        const fontSize = props.icon.height - props.icon.padding;
        const rect = this.textRect(text, fontFamily, fontSize);

        props.icon.yOffset = -(rect.top - (fontSize / 2)) - (rect.height / 2) + (props.icon.padding > 0 ? fontSize / props.icon.padding / 2 : 0);
        return props;
    }

    protected _reactVertexRenderer2: React.FunctionComponent<any>;
    vertexRenderer<T extends VertexProps>(): React.FunctionComponent<T>;
    vertexRenderer<T extends VertexProps>(_: React.FunctionComponent<T>): this;
    vertexRenderer<T extends VertexProps>(_?: React.FunctionComponent<T>): this | React.FunctionComponent<T> {
        if (!arguments.length) return this._reactVertexRenderer2;
        this._reactVertexRenderer2 = _;
        return this;
    }

    protected _reactCentroidRenderer: React.FunctionComponent<any>;
    centroidRenderer<T extends VertexProps>(): React.FunctionComponent<T>;
    centroidRenderer<T extends VertexProps>(_: React.FunctionComponent<T>): this;
    centroidRenderer<T extends VertexProps>(_?: React.FunctionComponent<T>): this | React.FunctionComponent<T> {
        if (!arguments.length) return this._reactCentroidRenderer;
        this._reactCentroidRenderer = _;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    updateCategories() {
        render(Icons, {
            icons: this._categories.map((c): IconEx => ({
                ...c,
                id: this.categoryID(c.id),
                fill: c.fill || "transparent",
                imageCharFill: c.imageCharFill || this._catPalette(c.id)
            }))
        }, this._svgDefsCat.node());
    }

    updateAnnotations() {
        render(Icons, {
            icons: this._annotations.map((c): IconEx => ({
                ...c,
                id: this.categoryID(c.id, "ann"),
                shape: c.shape || "square",
                height: c.height || 12,
                fill: c.fill || this._catPalette(c.id)
            }))
        }, this._svgDefsAnn.node());
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._centroidFilter.update(this.centroidColor());
    }
}
GraphReact.prototype._class += " graph_GraphReact";

export interface GraphReact {
    vertexTextHeight(): number;
    vertexTextHeight(_: number): this;
    vertexTextPadding(): number;
    vertexTextPadding(_: number): this;
    vertexIconHeight(): number;
    vertexIconHeight(_: number): this;
    vertexIconPadding(): number;
    vertexIconPadding(_: number): this;
    vertexIconStrokeWidth(): number;
    vertexIconStrokeWidth(_: number): this;
    vertexIconFontFamily(): string;
    vertexIconFontFamily(_: string): this;
    vertexLabelFontFamily(): string;
    vertexLabelFontFamily(_: string): this;

    centroidColor(): string;
    centroidColor(_: string): this;
    centroidScale(): number;
    centroidScale(_: number): this;
    centroidTextHeight(): number;
    centroidTextHeight(_: number): this;
    centroidTextPadding(): number;
    centroidTextPadding(_: number): this;
    centroidIconHeight(): number;
    centroidIconHeight(_: number): this;
    centroidIconPadding(): number;
    centroidIconPadding(_: number): this;
    centroidIconStrokeWidth(): number;
    centroidIconStrokeWidth(_: number): this;
    centroidIconFontFamily(): string;
    centroidIconFontFamily(_: string): this;
    centroidLabelFontFamily(): string;
    centroidLabelFontFamily(_: string): this;
}

GraphReact.prototype.publish("vertexTextHeight", 10, "number", "Vertex Text Height");
GraphReact.prototype.publish("vertexTextPadding", 4, "number", "Vertex Text Padding");
GraphReact.prototype.publish("vertexIconHeight", 50, "number", "Vertex Icon Height");
GraphReact.prototype.publish("vertexIconPadding", 10, "number", "Vertex Icon Padding");
GraphReact.prototype.publish("vertexIconStrokeWidth", 0, "number", "Vertex Icon Stroke Width");
GraphReact.prototype.publish("vertexIconFontFamily", "FontAwesome", "string", "Vertex Icon Font Family");
GraphReact.prototype.publish("vertexLabelFontFamily", "Verdana", "string", "Vertex Label Font Family");

GraphReact.prototype.publish("centroidColor", "#00A000", "html-color", "Centroid Glow Color");
GraphReact.prototype.publish("centroidScale", 1, "number", "Centroid Scale");
GraphReact.prototype.publish("centroidTextHeight", 12, "number", "Centroid Text Height");
GraphReact.prototype.publish("centroidTextPadding", 4, "number", "Centroid Text Padding");
GraphReact.prototype.publish("centroidIconHeight", 50, "number", "Centroid Icon Height");
GraphReact.prototype.publish("centroidIconPadding", 10, "number", "Centroid Icon Padding");
GraphReact.prototype.publish("centroidIconStrokeWidth", 4, "number", "Centroid Icon Stroke Width");
GraphReact.prototype.publish("centroidIconFontFamily", "FontAwesome", "string", "Centroid Icon Font Family");
GraphReact.prototype.publish("centroidLabelFontFamily", "Verdana", "string", "Centroid Label Font Family");

export const Graph2 = GraphReact;
