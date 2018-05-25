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
    update() {
        super.update.apply(this, arguments);

        this._icon_widget.render();
        this._desc_widget.render();
        this._title_widget.render();
        const title_bbox = this._title_widget.getBBox(true);
        const icon_bbox = this._icon_widget.getBBox(true);
        const desc_bbox = this._desc_widget.getBBox(true);
        const _anno_h = this.annotationIcons().length > 0 ? this.annotationDiameter() + this.padding() : 0;
        const background_bbox = {
            width: title_bbox.width + (this.padding() * 2),
            height: icon_bbox.height + title_bbox.height + _anno_h + this.arrowHeight() + desc_bbox.height + (this.padding() * 5)
        };

        this._background_widget
            .height(background_bbox.height)
            .width(background_bbox.width);
        const icon_y = -background_bbox.height + (icon_bbox.height / 2) + this.padding();
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
}
EntityPin.prototype._class += " common_EntityPin";
