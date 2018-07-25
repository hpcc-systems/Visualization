import { Entity } from "./Entity";
import { d3SelectionType } from "./Widget";

export class EntityPin extends Entity {
    protected _element_textbox: d3SelectionType;
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
    }
    update(domNode, element) {
        super.update.apply(this, arguments);

        const is_hovering = element.classed("hovering");

        const title_bbox = !this.titleOnlyShowOnHover() || is_hovering ? this._title_widget.getBBox(true) : { height: 0, width: 0 };
        const icon_bbox = !this.iconOnlyShowOnHover() || is_hovering ? this._icon_widget.getBBox(true) : { height: 0, width: 0 };
        const desc_bbox = !this.descriptionOnlyShowOnHover() || is_hovering ? this._desc_widget.getBBox(true) : { height: 0, width: 0 };
        const _anno_h = !this.annotationOnlyShowOnHover() || is_hovering ? this.annotationIcons().length > 0 ? this.annotationDiameter() + this.padding() : 0 : 0;
        const background_bbox = this.calcBackgroundBBox(is_hovering, title_bbox, icon_bbox, desc_bbox, _anno_h);

        this._title_widget.display(!this.titleOnlyShowOnHover() || is_hovering);
        this._icon_widget.display(!this.iconOnlyShowOnHover() || is_hovering);
        this._desc_widget.display(!this.descriptionOnlyShowOnHover() || is_hovering);

        this._background_widget
            .height(background_bbox.height)
            .width(background_bbox.width);
        const icon_y = -background_bbox.height + icon_bbox.height + (this.padding() / 2);
        const title_y = icon_y + (icon_bbox.height / 2) + (title_bbox.height / 2) + this.padding();
        const desc_y = title_y + (title_bbox.height / 2) + (desc_bbox.height / 2) + this.padding();
        const anno_y = desc_y + (desc_bbox.height / 2) + this.padding();
        this._title_widget.move({
            x: 0,
            y: title_y
        });
        this._desc_widget.move({
            x: 0,
            y: desc_y
        });
        this._icon_widget.move({
            x: 0,
            y: icon_y
        });
        this.moveAnnotations(background_bbox.width / 2, anno_y);

    }
    calcHeight() {
        const is_hovering = true;
        const title_bbox = !this.titleOnlyShowOnHover() || is_hovering ? this._title_widget.getBBox(true) : { height: 0, width: 0 };
        const icon_bbox = !this.iconOnlyShowOnHover() || is_hovering ? this._icon_widget.getBBox(true) : { height: 0, width: 0 };
        const desc_bbox = !this.descriptionOnlyShowOnHover() || is_hovering ? this._desc_widget.getBBox(true) : { height: 0, width: 0 };
        const _anno_h = !this.annotationOnlyShowOnHover() || is_hovering ? this.annotationIcons().length > 0 ? this.annotationDiameter() + this.padding() : 0 : 0;
        const background_bbox = this.calcBackgroundBBox(is_hovering, title_bbox, icon_bbox, desc_bbox, _anno_h);

        return background_bbox.height;
    }
    calcBackgroundBBox(is_hovering, title_bbox, icon_bbox, desc_bbox, _anno_h) {
        const content_width = Math.max(title_bbox.width, icon_bbox.width, desc_bbox.width);
        const background_bbox = {
            width: content_width + (this.padding() * 2),
            height: icon_bbox.height + title_bbox.height + _anno_h + this.arrowHeight() + desc_bbox.height + (this.padding() * 5)
        };
        let remove_padding = 0;
        if (this.titleOnlyShowOnHover() && !is_hovering) {
            remove_padding += this.padding();
        }
        if (this.iconOnlyShowOnHover() && !is_hovering) {
            remove_padding += this.padding();
        }
        if (this.descriptionOnlyShowOnHover() && !is_hovering) {
            remove_padding += this.padding();
        }
        if (this.annotationIcons().length === 0 || this.annotationOnlyShowOnHover() && !is_hovering) {
            remove_padding += this.padding();
        }
        background_bbox.height -= remove_padding;
        return background_bbox;
    }
}
EntityPin.prototype._class += " common_EntityPin";

export interface EntityPin {
    titleOnlyShowOnHover(): boolean;
    titleOnlyShowOnHover(_: boolean): this;
    iconOnlyShowOnHover(): boolean;
    iconOnlyShowOnHover(_: boolean): this;
    descriptionOnlyShowOnHover(): boolean;
    descriptionOnlyShowOnHover(_: boolean): this;
    annotationOnlyShowOnHover(): boolean;
    annotationOnlyShowOnHover(_: boolean): this;
}

EntityPin.prototype.publish("titleOnlyShowOnHover", false, "boolean", "titleOnlyShowOnHover");
EntityPin.prototype.publish("iconOnlyShowOnHover", false, "boolean", "iconOnlyShowOnHover");
EntityPin.prototype.publish("descriptionOnlyShowOnHover", false, "boolean", "descriptionOnlyShowOnHover");
EntityPin.prototype.publish("annotationOnlyShowOnHover", false, "boolean", "annotationOnlyShowOnHover");
