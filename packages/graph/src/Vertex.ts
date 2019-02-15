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
        this.pos({ x: undefined, y: undefined });
    }

    getIconBBox() {
        const iconBBox = this._icon.getBBox(true);
        const textBoxBBox = this._textBox.getBBox(true);
        switch (this.iconAnchor()) {
            case "start":
                return {
                    x: -(textBoxBBox.width / 2) + (iconBBox.width / 3),
                    y: -(textBoxBBox.height / 2) - (iconBBox.height / 3),
                    width: iconBBox.width,
                    height: iconBBox.height
                };
            case "middle":
                return {
                    x: 0,
                    y: -(textBoxBBox.height / 2) - (iconBBox.height / 3),
                    width: iconBBox.width,
                    height: iconBBox.height
                };
            case "end":
                return {
                    x: (textBoxBBox.width / 2) - (iconBBox.width / 3),
                    y: -(textBoxBBox.height / 2) - (iconBBox.height / 3),
                    width: iconBBox.width,
                    height: iconBBox.height
                };
            case "left":
                return {
                    x: -(textBoxBBox.width / 2) - iconBBox.width / 2,
                    y: 0,
                    width: iconBBox.width,
                    height: iconBBox.height
                };
            default:
        }
        return {
            x: 0,
            y: 0,
            width: iconBBox.width,
            height: iconBBox.height
        };
    }

    getBBox(refresh = false, round = false) {
        const iconBBox = this.getIconBBox();
        const textBoxBBox = this._textBox.getBBox(true);
        const x = Math.min(iconBBox.x, textBoxBBox.x);
        const y = Math.min(iconBBox.y, textBoxBBox.y);
        const right = Math.max(iconBBox.x + iconBBox.width, textBoxBBox.x + textBoxBBox.width);
        const bottom = Math.max(iconBBox.y + iconBBox.height, textBoxBBox.y + textBoxBBox.height);
        return {
            x,
            y,
            width: right - x,
            height: bottom - y
        };
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        delete this._prevHash;
        this._icon
            .target(domNode)
            ;
        this._textBox
            .target(domNode)
            ;
        element
            .on("mouseover", d => this.mouseover(d.data()))
            .on("mouseout", d => this.mouseout(d.data()))
            ;
    }

    _prevHash;
    update(domNode, element) {
        super.update(domNode, element);
        const hash = this.hashSum();
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            element.classed("centroid", this.centroid());
            element.style("filter", this.centroid() ? "url(#" + this._graphID + "_glow)" : null);
            this._icon
                .tooltip(this.iconTooltip() ? this.iconTooltip() : this.tooltip())
                .render()
                ;
            this._textBox
                .tooltip(this.tooltip())
                .render()
                ;

            const iconBBox = this.getIconBBox();
            this._icon.move(iconBBox);

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
            const bbox = this._textBox.getBBox(true);
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
                    context._annotationWidgets[idx].target(null);
                    delete context._annotationWidgets[idx];
                    element2.remove();
                })
                ;
        }
    }

    exit(domNode, element) {
        for (const key in this._annotationWidgets) {
            this._annotationWidgets[key].target(null);
        }
        this._icon.target(null);
        this._textBox.target(null);
        super.exit(domNode, element);
    }

    //  Methods  ---
    contains(point): boolean {
        return this._icon.contains(point) || this._textBox.contains(point);
    }

    intersection(pointA, pointB) {
        const i1 = this._icon.intersection(pointA, pointB);
        const i2 = this._textBox.intersection(pointA, pointB);
        if (i1 && i2) {
            return this.distance(i1, pointB) < this.distance(i2, pointB) ? i1 : i2;
        }
        return i1 || i2;
    }

    // Events ---
    mouseover(d) {
    }

    mouseout(d) {
    }
}
Vertex.prototype._class += " graph_Vertex";

export interface Vertex {
    faChar(): string;
    faChar(_: string): this;
    imageUrl(): string;
    imageUrl(_: string): this;
    icon_diameter(): number;
    icon_diameter(_: number): this;
    icon_paddingPercent(): number;
    icon_paddingPercent(_: number): this;
    icon_shape_colorFill(): string;
    icon_shape_colorFill(_: string): this;
    icon_shape_colorStroke(): string;
    icon_shape_colorStroke(_: string): this;
    icon_image_colorFill(): string;
    icon_image_colorFill(_: string): this;

    centroid(): boolean;
    centroid(_: boolean): this;

    text(): string;
    text(_: string): this;
    anchor(): string;
    anchor(_: string): this;
    textbox_shape_colorStroke(): string;
    textbox_shape_colorStroke(_: string): this;
    textbox_shape_colorFill(): string;
    textbox_shape_colorFill(_: string): this;
    textbox_text_colorFill(): string;
    textbox_text_colorFill(_: string): this;

    iconAnchor(): "" | "start" | "middle" | "end" | "left";
    iconAnchor(_: "" | "start" | "middle" | "end" | "left"): this;
    iconTooltip(): string;
    iconTooltip(_: string): this;

    tooltip(): string;
    tooltip(_: string): this;

    annotationDiameter(): number;
    annotationDiameter(_: number): this;
    annotationSpacing(): number;
    annotationSpacing(_: number): this;
    annotationIcons(): IAnnotation[];
    annotationIcons(_: IAnnotation[]): this;
}

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

Vertex.prototype.publish("iconAnchor", "start", "set", "Horizontal anchor position of icon", ["", "start", "middle", "end", "left"], { tags: ["Basic"] });
Vertex.prototype.publish("iconTooltip", "", "string", "iconTooltip", null, { tags: ["Private"] });

Vertex.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

Vertex.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter", null, { tags: ["Private"] });
Vertex.prototype.publish("annotationSpacing", 3, "number", "Annotation Spacing", null, { tags: ["Private"] });
Vertex.prototype.publish("annotationIcons", [], "array", "Annotations", null, { tags: ["Private"] });
