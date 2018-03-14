import { Icon, SVGWidget, TextBox } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

import "../src/Vertex.css";

export interface IAnnotation {
    faChar: string;
    tooltip?: string;
    shape_colorFill?: string;
    shape_colorStroke?: string;
    image_colorFill?: string;
}

export class Vertex extends SVGWidget {
    protected _icon: Icon;
    protected _textBox: TextBox;
    protected _annotationWidgets: {};
    protected _graphID;

    constructor() {
        super();

        this._icon = new Icon();
        this._textBox = new TextBox();
        this._annotationWidgets = {};
    }

    enter(domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        delete this._prevHash;
        this._icon
            .target(domNode)
            .render()
            ;
        this._textBox
            .target(domNode)
            .render()
            ;
        element
            .on("mouseover", d => this.mouseover(d.data()))
            .on("mouseout", d => this.mouseout(d.data()))
            ;
    }

    _prevHash;
    update(_domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        const hash = this.hash();
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            element.classed("centroid", this.centroid());
            element.style("filter", this.centroid() ? "url(#" + this._graphID + "_glow)" : null);
            this._icon
                .tooltip(this.iconTooltip() ? this.iconTooltip() : this.tooltip())
                .render()
                ;
            const iconClientSize = this._icon.getBBox(true);
            this._textBox
                .tooltip(this.tooltip())
                .render()
                ;
            const bbox = this._textBox.getBBox(true);
            switch (this.iconAnchor()) {
                case "start":
                    this._icon
                        .move({
                            x: -(bbox.width / 2) + (iconClientSize.width / 3),
                            y: -(bbox.height / 2) - (iconClientSize.height / 3)
                        });
                    break;
                case "middle":
                    this._icon
                        .move({
                            x: 0,
                            y: -(bbox.height / 2) - (iconClientSize.height / 3)
                        });
                    break;
                case "end":
                    this._icon
                        .move({
                            x: (bbox.width / 2) - (iconClientSize.width / 3),
                            y: -(bbox.height / 2) - (iconClientSize.height / 3)
                        });
                    break;
                case "left":
                    this._icon
                        .move({
                            x: -(bbox.width / 2) - iconClientSize.width / 2,
                            y: 0
                        });
                    break;
                default:
            }

            const context = this;
            const annotations = element.selectAll(".annotation").data(this.annotationIcons());
            const annotationsEnter = annotations.enter().append("g")
                .attr("class", "annotation")
                .each(function (_d, idx) {
                    context._annotationWidgets[idx] = new Icon()
                        .target(this)
                        .shape("square")
                        ;
                })
                ;
            let xOffset = bbox.width / 2;
            const yOffset = bbox.height / 2;
            annotationsEnter.merge(annotations)
                .each(function (d, idx) {
                    const annotationWidget = context._annotationWidgets[idx];
                    annotationWidget
                        .diameter(context.annotationDiameter())
                        .shape_colorFill(context.textbox_shape_colorFill())
                        .shape_colorStroke(context.textbox_shape_colorStroke())
                        ;
                    for (const key in d) {
                        if (annotationWidget[key]) {
                            annotationWidget[key](d[key]);
                        } else if ((window as any).__hpcc_debug) {
                            console.log("Invalid annotation property:  " + key);
                        }
                    }
                    annotationWidget.render();

                    const aBBox = annotationWidget.getBBox(true);
                    annotationWidget
                        .move({
                            x: xOffset - aBBox.width / 2 + 4,
                            y: yOffset + aBBox.height / 2 - 4
                        })
                        ;
                    xOffset -= aBBox.width + context.annotationSpacing();
                })
                ;
            annotations.exit()
                .each(function (_d, idx) {
                    const element2 = d3Select(this);
                    delete context._annotationWidgets[idx];
                    element2.remove();
                })
                ;
        }
    }

    exit(domNode, _element) {
        super.exit.apply(this, arguments);
        this._icon.target(null);
        this._textBox.target(null);
    }

    //  Methods  ---
    contains(point): boolean {
        return this._icon.contains(point) || this._textBox.contains(point);
    }

    intersection(pointA, pointB) {
        const i1 = this._icon.intersection(pointA, pointB);
        if (i1)
            return i1;
        const i2 = this._textBox.intersection(pointA, pointB);
        if (i2)
            return i2;
        return null;
    }

    // Events ---
    mouseover(d) {
    }

    mouseout(d) {
    }

    faChar: { (): string; (_: string): Vertex; };
    imageUrl: { (): string; (_: string): Vertex; };
    icon_diameter: { (): number; (_: number): Vertex; };
    icon_paddingPercent: { (): number; (_: number): Vertex; };
    icon_shape_colorFill: { (): string; (_: string): Vertex; };
    icon_shape_colorStroke: { (): string; (_: string): Vertex; };
    icon_image_colorFill: { (): string; (_: string): Vertex; };

    centroid: { (): boolean; (_: boolean): Vertex; };

    text: { (): string; (_: string): Vertex; };
    anchor: { (): string; (_: string): Vertex; };
    textbox_shape_colorStroke: { (): string; (_: string): Vertex; };
    textbox_shape_colorFill: { (): string; (_: string): Vertex; };
    textbox_text_colorFill: { (): string; (_: string): Vertex; };

    iconAnchor: { (): "" | "start" | "middle" | "end" | "left"; (_: "" | "start" | "middle" | "end" | "left"): Vertex; };
    iconTooltip: { (): string; (_: string): Vertex; };

    tooltip: { (): string; (_: string): Vertex; };

    annotationDiameter: { (): number; (_: number): Vertex; };
    annotationSpacing: { (): number; (_: number): Vertex; };
    annotationIcons: { (): IAnnotation[]; (_: IAnnotation[]): Vertex; };
}
Vertex.prototype._class += " graph_Vertex";

Vertex.prototype.publishProxy("faChar", "_icon");
Vertex.prototype.publishProxy("imageUrl", "_icon");
Vertex.prototype.publishProxy("icon_diameter", "_icon", "diameter");
Vertex.prototype.publishProxy("icon_paddingPercent", "_icon", "paddingPercent");
Vertex.prototype.publishProxy("icon_shape_colorFill", "_icon", "shape_colorFill");
Vertex.prototype.publishProxy("icon_shape_colorStroke", "_icon", "shape_colorStroke");
Vertex.prototype.publishProxy("icon_image_colorFill", "_icon", "image_colorFill");

Vertex.prototype.publish("centroid", false, "boolean", "Centroid Vertex");

Vertex.prototype.publishProxy("text", "_textBox");
Vertex.prototype.publishProxy("anchor", "_textBox");
Vertex.prototype.publishProxy("textbox_shape_colorStroke", "_textBox", "shape_colorStroke");
Vertex.prototype.publishProxy("textbox_shape_colorFill", "_textBox", "shape_colorFill");
Vertex.prototype.publishProxy("textbox_text_colorFill", "_textBox", "text_colorFill");

Vertex.prototype.publish("iconAnchor", "start", "set", "Icon Anchor Position", ["", "start", "middle", "end", "left"], { tags: ["Basic"] });
Vertex.prototype.publish("iconTooltip", "", "string", "iconTooltip", null, { tags: ["Private"] });

Vertex.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

Vertex.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter", null, { tags: ["Private"] });
Vertex.prototype.publish("annotationSpacing", 3, "number", "Annotation Spacing", null, { tags: ["Private"] });
Vertex.prototype.publish("annotationIcons", [], "array", "Annotations", null, { tags: ["Private"] });
