import { Entity } from "./Entity";
import { d3SelectionType } from "./Widget";

export class EntityCard extends Entity {
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
        this._title_widget.render();
        this._desc_widget.render();
        const icon_bbox = this._icon_widget.getBBox(true);
        const title_bbox = this._title_widget.getBBox(true);
        const desc_bbox = this._desc_widget.getBBox(true);

        let anno_w = 0;
        let anno_h = 0;
        const anno_gap = this.annotationSpacing();
        for (const i of Object.keys(this._annotation_widgets)) {
            anno_w += this._annotation_widgets[i].bbox.width + anno_gap;
            anno_h = anno_h > this._annotation_widgets[i].bbox.height ? anno_h : this._annotation_widgets[i].bbox.height;
        }

        const _background_h = Math.max(
            title_bbox.height + desc_bbox.height + (this.padding() * 3),
            anno_h + icon_bbox.height + (this.padding() * 3)
        );
        const _background_w = Math.max(
            title_bbox.width + icon_bbox.width + (this.padding() * 3),
            anno_w + desc_bbox.width + (this.padding() * 3)
        );
        this._background_widget
            .height(_background_h)
            .width(_background_w);

        this._title_widget.move({
            x: -(_background_w / 2) + (title_bbox.width / 2) + this.padding(),
            y: -(_background_h / 2) + (title_bbox.height / 2) + this.padding()
        });
        this._icon_widget.move({
            x: (_background_w / 2) - (icon_bbox.width / 2) - this.padding(),
            y: -(_background_h / 2) + (icon_bbox.height / 2) + this.padding()
        });
        this._desc_widget.move({
            x: -(_background_w / 2) + (desc_bbox.width / 2) + this.padding(),
            y: (_background_h / 2) - (desc_bbox.height / 2) - this.padding()
        });
        this.moveAnnotations((_background_w / 2), (_background_h / 2) - anno_h - this.padding());
    }
}
EntityCard.prototype._class += " common_EntityCard";
