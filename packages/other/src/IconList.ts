import { CanvasWidget } from "@hpcc-js/common";

export class IconList extends CanvasWidget {
    ctx;
    constructor() {
        super();
    }
    update(domNode, element) {
        super.update(domNode, element);
        this.ctx = domNode.getContext("2d");
        this.draw();
    }

    draw() {
        const context = this;
        const cell_w = this.width() / (this.data().length || 1);
        const cell_h = this.height();
        const cell_iw = cell_w - (this.detailPadding() * 2);
        const icon_size = cell_h * this.iconHeightRatio();
        const icon_h = _calc_icon_h(icon_size);
        const detail_row_count = this.data() && this.data()[0][1] && this.data()[0][1] ? this.data()[0][1].length : 0;
        const detail_size = (cell_h - icon_size - this.detailPadding()) / detail_row_count;
        const detail_h = _calc_detail_h(detail_size);
        this.ctx.strokeStyle = "#ff00ff";
        this.ctx.font = `${icon_h}px FontAwesome`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "bottom";
        this.data().forEach((row, row_idx) => {
            this.ctx.fillStyle = row[2] && row[2].icon_color ? row[2].icon_color : this.iconColor();
            this.ctx.fillText(row[0], row_idx * cell_w + cell_w / 2, icon_h);
        });
        this.ctx.font = `${detail_h}px Verdana`;
        this.ctx.textBaseline = "top";
        this.data().forEach((row, row_idx) => {
            const cell_center_x = row_idx * cell_w + cell_w / 2;
            row[1].forEach((detail, detail_idx) => {
                this.ctx.fillStyle = row[2] && row[2].detail_color ? row[2].detail_color : this.detailColor();
                this.ctx.fillText(
                    detail,
                    cell_center_x,
                    icon_h + (detail_idx * detail_h)
                );
            });
        });
        function _calc_icon_h(icon_size) {
            let size_mult = 1;
            context.ctx.font = `${icon_size}px FontAwesome`;
            context.data().forEach((row) => {
                const icon_bbox = context.ctx.measureText(row[0]);
                if (icon_bbox.width > cell_iw && cell_iw / icon_bbox.width < size_mult) {
                    size_mult = cell_iw / icon_bbox.width;
                }
            });
            return icon_size * size_mult;
        }
        function _calc_detail_h(detail_size) {
            let size_mult = 1;
            context.ctx.font = `${detail_size}px Verdana`;
            context.data().forEach((row) => {
                row[1].forEach((detail) => {
                    const detail_bbox = context.ctx.measureText(detail);
                    if (detail_bbox.width > cell_iw && cell_iw / detail_bbox.width < size_mult) {
                        size_mult = cell_iw / detail_bbox.width;
                    }
                });
            });
            return detail_size * size_mult;
        }
    }
}
IconList.prototype._class += " other_IconList";

export interface IconList {
    detailPadding(): number;
    detailPadding(_: number): this;
    iconColor(): string;
    iconColor(_: string): this;
    detailColor(): string;
    detailColor(_: string): this;
    iconHeightRatio(): number;
    iconHeightRatio(_: number): this;

}
IconList.prototype.publish("detailPadding", 8, "number", "detailPadding");
IconList.prototype.publish("iconColor", "#000", "string");
IconList.prototype.publish("detailColor", "#000", "string");
IconList.prototype.publish("iconHeightRatio", 0.618, "number");
