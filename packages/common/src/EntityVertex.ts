import { Entity } from "./Entity";
import { TextBox } from "./TextBox";
import { d3SelectionType } from "./Widget";

export class EntityVertex extends Entity {
    protected _textbox_widget: TextBox;
    protected _element_textbox: d3SelectionType;
    constructor() {
        super();
        this._textbox_widget = new TextBox();
    }
    enter(domNode, element) {
        this._element_textbox = element.append("g").attr("class", "entity_textbox");
        super.enter(domNode, element);
        this._textbox_widget.target(this._element_textbox.node());
    }
    update() {
        super.update.apply(this, arguments);
        this._textbox_widget
            .text(this._title_widget.text());
        this._icon_widget
            .shape_colorFill(this.iconColorFill())
            .shape_colorStroke(this.iconColorStroke());
        this._background_widget
            .colorFill("none")
            .colorStroke("none");

        this._icon_widget.render();
        this._textbox_widget.render();
        const icon_bbox = this._icon_widget.getBBox(true);
        const text_bbox = this._textbox_widget.getBBox(true);
        let _icon_x = 0;
        let _icon_y = -(text_bbox.height / 2) - (icon_bbox.height / 3);
        switch (this.iconAnchor()) {
            case "start":
                _icon_x = -(text_bbox.width / 2) + (icon_bbox.width / 3);
                break;
            case "end":
                _icon_x = (text_bbox.width / 2) - (icon_bbox.width / 3);
                break;
            case "left":
                _icon_x = -(text_bbox.width / 2) - (icon_bbox.width / 2);
                _icon_y = 0;
                break;
        }
        this._icon_widget.move({
            x: _icon_x,
            y: _icon_y
        });
        this.moveAnnotations(text_bbox.width / 2, text_bbox.height / 2);
    }
}
EntityVertex.prototype._class += " common_EntityVertex";

export interface EntityVertex {
    iconAnchor(): string;
    iconAnchor(_: string): this;
    iconColorFill(): string;
    iconColorFill(_: string): this;
    iconColorStroke(): string;
    iconColorStroke(_: string): this;
    shape_colorStroke(): string;
    shape_colorStroke(_: string): this;
    shape_colorFill(): string;
    shape_colorFill(_: string): this;
    text_colorFill(): string;
    text_colorFill(_: string): this;

    textboxColorStroke(): string;
    textboxColorStroke(_: string): this;
    textboxColorFill(): string;
    textboxColorFill(_: string): this;
    textboxFontColor(): string;
    textboxFontColor(_: string): this;
}

EntityVertex.prototype.publish("iconAnchor", "start", "set", "iconAnchor", ["", "start", "middle", "end", "left"]);
EntityVertex.prototype.publish("iconColorFill", null, "html-color", "iconColorFill");
EntityVertex.prototype.publish("iconColorStroke", null, "html-color", "iconColorStroke");

EntityVertex.prototype.publishProxy("textboxColorStroke", "_textbox_widget", "shape_colorStroke");
EntityVertex.prototype.publishProxy("textboxColorFill", "_textbox_widget", "shape_colorFill");
EntityVertex.prototype.publishProxy("textboxFontColor", "_textbox_widget", "text_colorFill");
