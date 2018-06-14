import { Icon } from "./Icon";
import { Shape } from "./Shape";
import { SVGWidget } from "./SVGWidget";
import { Text } from "./Text";
import { d3SelectionType, Widget } from "./Widget";

export interface IAnnotation {
    faChar: string;
    tooltip?: string;
    shape_colorFill?: string;
    shape_colorStroke?: string;
    image_colorFill?: string;
    shape?: string;
}

export class Entity extends SVGWidget {
    protected _icon_widget: Icon;
    protected _background_widget: Shape;
    protected _title_widget: Text;
    protected _desc_widget: Text;
    protected _annotation_widgets: { [idx: number]: { widget: SVGWidget, bbox: { x: number, y: number, width: number, height: number } } };
    protected _element_anno: d3SelectionType;
    protected _element_background: d3SelectionType;
    protected _element_desc: d3SelectionType;
    protected _element_icon: d3SelectionType;
    protected _element_title: d3SelectionType;

    constructor() {
        super();

        this._background_widget = new Shape();
        this._icon_widget = new Icon();
        this._title_widget = new Text();
        this._desc_widget = new Text();
        this._annotation_widgets = {};
    }
    enter(dn, element) {
        super.enter.apply(this, arguments);
        this._element_background = element.append("g").attr("class", "entity_shape");
        this._element_icon = element.append("g").attr("class", "entity_icon");
        this._element_title = element.append("g").attr("class", "entity_title");
        this._element_desc = element.append("g").attr("class", "entity_desc");
        this._element_anno = element.append("g").attr("class", "entity_anno");

        this._background_widget
            .target(this._element_background.node());
        this._icon_widget
            .shape_colorFill("none")
            .shape_colorStroke("none")
            .target(this._element_icon.node());
        this._title_widget
            .target(this._element_title.node());
        this._desc_widget
            .target(this._element_desc.node());
    }
    update(dn, element) {
        super.update.apply(this, arguments);
        this._desc_widget
            .fontSize(this.descriptionFontSize());
        const context = this;
        const annotations = this._element_anno.selectAll(".annotation").data(this.annotationIcons().reverse());
        annotations.enter().append("g")
            .attr("class", "annotation")
            .each(function (this: HTMLElement, d, idx) {
                const anno = new Icon()
                    .diameter(context.annotationDiameter())
                    .paddingPercent(context.annotationPaddingPercent())
                    .target(this)
                    .shape("square")
                    ;
                if (typeof d.faChar !== "undefined") anno.faChar(d.faChar);
                if (typeof d.shape !== "undefined") anno.shape(d.shape);
                if (typeof d.image_colorFill !== "undefined") anno.image_colorFill(d.image_colorFill);
                if (typeof d.shape_colorFill !== "undefined") anno.shape_colorFill(d.shape_colorFill);
                if (typeof d.shape_colorStroke !== "undefined") anno.shape_colorStroke(d.shape_colorStroke);
                anno.render();
                context._annotation_widgets[idx] = {
                    widget: anno,
                    bbox: anno.getBBox(true)
                };
            });
        element
            .on("mouseover", function () {
                element.classed("hovering", true);
                context.render();
            })
            .on("mouseout", function () {
                element.classed("hovering", false);
                context.render();
            })
            ;
    }
    moveAnnotations(x_offset: number, y_offset: number) {
        let anno_w_sum = 0;
        const anno_gap = this.annotationSpacing();
        for (const i in this._annotation_widgets) {
            const anno_bbox = this._annotation_widgets[i].bbox;
            this._annotation_widgets[i].widget.move({
                x: -anno_w_sum + x_offset - anno_bbox.width,
                y: y_offset + (anno_bbox.height / 2)
            });
            anno_w_sum += anno_bbox.width + anno_gap;
        }
    }
    render(callback?: (w: Widget) => void) {
        return super.render(w => {
            this._background_widget.render();
            this._icon_widget.render();
            this._title_widget.render();
            this._desc_widget.render();
            if (callback) {
                callback(w);
            }
        });
    }
}
Entity.prototype._class += " common_Entity";

export interface Entity {
    arrowHeight(): number;
    arrowHeight(_: number): this;
    arrowWidth(): number;
    arrowWidth(_: number): this;
    cornerRadius(): number;
    cornerRadius(_: number): this;
    padding(): number;
    padding(_: number): this;
    paddingPercent(): number;
    paddingPercent(_: number): this;

    annotationIcons(): IAnnotation[];
    annotationIcons(_: IAnnotation[]): this;
    annotationDiameter(): number;
    annotationDiameter(_: number): this;
    annotationSpacing(): number;
    annotationSpacing(_: number): this;
    annotationPaddingPercent(): number;
    annotationPaddingPercent(_: number): this;
    icon(): string;
    icon(_: string): this;
    iconColor(): string;
    iconColor(_: string): this;
    iconDiameter(): number;
    iconDiameter(_: number): this;
    iconPaddingPercent(): number;
    iconPaddingPercent(_: number): this;
    description(): string;
    description(_: string): this;
    descriptionColor(): string;
    descriptionColor(_: string): this;
    descriptionFontFamily(): string;
    descriptionFontFamily(_: string): this;
    descriptionFontSize(): number;
    descriptionFontSize(_: number): this;
    title(): string;
    title(_: string): this;
    titleColor(): string;
    titleColor(_: string): this;
    titleFontFamily(): string;
    titleFontFamily(_: string): this;
    titleFontSize(): number;
    titleFontSize(_: number): this;
    backgroundShape(): string;
    backgroundShape(_: string): this;
    backgroundColorFill(): string;
    backgroundColorFill(_: string): this;
    backgroundColorStroke(): string;
    backgroundColorStroke(_: string): this;
}

Entity.prototype.publish("padding", 8, "number", "padding");

Entity.prototype.publish("annotationPaddingPercent", 38, "number", "annotationPaddingPercent");
Entity.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter");
Entity.prototype.publish("annotationIcons", [], "array", "annotationIcons");
Entity.prototype.publish("annotationSpacing", 3, "number", "annotationSpacing");

Entity.prototype.publishProxy("icon", "_icon_widget", "faChar");
Entity.prototype.publishProxy("iconColor", "_icon_widget", "image_colorFill");
Entity.prototype.publishProxy("iconDiameter", "_icon_widget", "diameter");
Entity.prototype.publishProxy("iconPaddingPercent", "_icon_widget", "paddingPercent");

Entity.prototype.publishProxy("title", "_title_widget", "text");
Entity.prototype.publishProxy("titleColor", "_title_widget", "colorFill");
Entity.prototype.publishProxy("titleFontFamily", "_title_widget", "fontFamily");
Entity.prototype.publishProxy("titleFontSize", "_title_widget", "fontSize");

Entity.prototype.publishProxy("description", "_desc_widget", "text");
Entity.prototype.publishProxy("descriptionColor", "_desc_widget", "colorFill");
Entity.prototype.publishProxy("descriptionFontFamily", "_desc_widget", "fontFamily");
Entity.prototype.publishProxy("descriptionFontSize", "_desc_widget", "fontSize");

Entity.prototype.publishProxy("backgroundShape", "_background_widget", "shape");
Entity.prototype.publishProxy("backgroundColorFill", "_background_widget", "colorFill");
Entity.prototype.publishProxy("backgroundColorStroke", "_background_widget", "colorStroke");

Entity.prototype.publishProxy("cornerRadius", "_background_widget");
Entity.prototype.publishProxy("arrowHeight", "_background_widget");
Entity.prototype.publishProxy("arrowWidth", "_background_widget");
