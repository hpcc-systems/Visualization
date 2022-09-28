import { SVGGlowFilter } from "@hpcc-js/common";
import { React, Subgraph, SubgraphProps, Vertex, VertexProps } from "@hpcc-js/react";
import { BasicEdge, BasicEdgeProps } from "./edge";
import { GraphReactT } from "./graphReactT";

export class Graph2 extends GraphReactT<SubgraphProps, VertexProps, BasicEdgeProps> {

    protected _centroidFilter: SVGGlowFilter;

    constructor() {
        super(Subgraph, Vertex, BasicEdge);
        this._reactCentroidRenderer = Vertex;
        this._reactVertexRenderer2 = Vertex;
        super.vertexRenderer((props) => {
            return props.centroid ? this._reactCentroidRenderer(props) : this._reactVertexRenderer2(props);
        });
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

    protected _reactVertexRenderer2: React.FunctionComponent<VertexProps>;
    vertexRenderer(): React.FunctionComponent<VertexProps>;
    vertexRenderer(_: React.FunctionComponent<VertexProps>): this;
    vertexRenderer(_?: React.FunctionComponent<VertexProps>): this | React.FunctionComponent<VertexProps> {
        if (!arguments.length) return this._reactVertexRenderer2;
        this._reactVertexRenderer2 = _;
        return this;
    }

    protected _reactCentroidRenderer: React.FunctionComponent<VertexProps>;
    centroidRenderer(): React.FunctionComponent<VertexProps>;
    centroidRenderer(_: React.FunctionComponent<VertexProps>): this;
    centroidRenderer(_?: React.FunctionComponent<VertexProps>): this | React.FunctionComponent<VertexProps> {
        if (!arguments.length) return this._reactCentroidRenderer;
        this._reactCentroidRenderer = _;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._centroidFilter = new SVGGlowFilter(this._svgDefs, this._id + "_glow");
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._centroidFilter.update(this.centroidColor());
    }
}
Graph2.prototype._class += " graph_Graph2";

export interface Graph2 {
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

Graph2.prototype.publish("vertexTextHeight", 10, "number", "Vertex Text Height");
Graph2.prototype.publish("vertexTextPadding", 4, "number", "Vertex Text Padding");
Graph2.prototype.publish("vertexIconHeight", 50, "number", "Vertex Icon Height");
Graph2.prototype.publish("vertexIconPadding", 10, "number", "Vertex Icon Padding");
Graph2.prototype.publish("vertexIconStrokeWidth", 0, "number", "Vertex Icon Stroke Width");
Graph2.prototype.publish("vertexIconFontFamily", "FontAwesome", "string", "Vertex Icon Font Family");
Graph2.prototype.publish("vertexLabelFontFamily", "Verdana", "string", "Vertex Label Font Family");
Graph2.prototype.publish("highlightSelectedPathToCentroid", true, "boolean", "Highlight path to Center Vertex (for selected vertices)");

Graph2.prototype.publish("centroidColor", "#00A000", "html-color", "Centroid Glow Color");
Graph2.prototype.publish("centroidScale", 1, "number", "Centroid Scale");
Graph2.prototype.publish("centroidTextHeight", 12, "number", "Centroid Text Height");
Graph2.prototype.publish("centroidTextPadding", 4, "number", "Centroid Text Padding");
Graph2.prototype.publish("centroidIconHeight", 50, "number", "Centroid Icon Height");
Graph2.prototype.publish("centroidIconPadding", 10, "number", "Centroid Icon Padding");
Graph2.prototype.publish("centroidIconStrokeWidth", 4, "number", "Centroid Icon Stroke Width");
Graph2.prototype.publish("centroidIconFontFamily", "FontAwesome", "string", "Centroid Icon Font Family");
Graph2.prototype.publish("centroidLabelFontFamily", "Verdana", "string", "Centroid Label Font Family");

