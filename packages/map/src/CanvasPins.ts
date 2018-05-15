import { CanvasWidget } from "@hpcc-js/common";
import { quadtree as d3quadtree } from "d3-quadtree";

export interface CanvasPinRow {
    0: number;
    1: number;
    is_cluster: boolean;
    already_flagged: boolean;
    weight: number;
    fillStyle: string;
    strokeStyle: string;
    overlap_arr: CanvasPinRow[];
}

interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

class Quadtree {
    protected _pin_h = 0;
    protected _pin_w = 0;
    protected _tree: any;
    constructor(extent: any, raw_data: any, pin_h: number, pin_w: number) {
        this._pin_h = pin_h;
        this._pin_w = pin_w;
        this._tree = d3quadtree()
            .extent(extent)
            .addAll(raw_data);
    }

    searchRect(left: number, top: number, right: number, bottom: number): CanvasPinRow[] {
        const ret: any = [];
        this._tree.visit((node: any, x1: number, y1: number, x2: number, y2: number) => {
            let next_exists = false;
            do {
                if (!node.length) {
                    if (node.data && !node.data.already_flagged) {
                        const is_overlapping = overlaps({left, right, top, bottom}, node.data);
                        if (is_overlapping) {
                            node.data.already_flagged = true;
                            ret.push(node.data);
                        }
                    }
                }
                next_exists = node = node.next;
            } while (next_exists);
            return x1 >= right || y1 >= bottom || x2 < left || y2 < top;
        });
        return ret;
        function overlaps(r1: Rect, point: CanvasPinRow) {
            return (point[0] < r1.right || point[0] > r1.left) && (point[1] < r1.bottom || point[1] > r1.top);
        }
    }
    getTreeRects(): any {
        const ret = [];
        this._tree.visit((node: any, x1: number, y1: number, x2: number, y2: number) => {
            ret.push([x1, y1, x2 - x1, y2 - y1]);
        });
        return ret;
    }
}

export class CanvasPins extends CanvasWidget {
    _ctx;
    _quadtree_rect_arr;
    _drawData;
    _overlap_count = 0;
    _sub_overlap_count = 0;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter.apply(this, arguments);
        this.resize(this._size);
    }

    update(domNode, element) {
        super.update.apply(this, arguments);
        this._ctx = this.element().node().getContext("2d");
        const needs_data_skew = this.topLeftX_exists() && this.topLeftY_exists() && this.bottomRightX_exists() && this.bottomRightY_exists();
        const _data = (needs_data_skew ? this.skewedData() : this.data())
            .map(row => [...row])
            .map(row => {
                row.is_cluster = false;
                row.already_flagged = false;
                row.weight = row[2];
                row.fillStyle = "#FFFFFF";
                row.strokeStyle = "#000000";
                row.overlap_arr = [];
                return row;
            });
        this._ctx.clearRect(0, 0, this.width(), this.height());

        this._drawData = this.enableClustering() ? this.applyClustering(_data) : _data;

        this.draw(this._drawData);
    }

    applyClustering(data: Readonly<CanvasPinRow[]>) {
        const context = this;
        this._overlap_count = 0;
        const arrow_height = 8;
        const pin_h = this.pinHeight();
        const pin_w = this.pinWidth();
        const half_w = pin_w / 2;
        const half_h = pin_h / 2;
        const qt = new Quadtree([[0, 0], [this.size().width, this.size().height]], data, pin_h, pin_w);
        this._quadtree_rect_arr = qt.getTreeRects();
        switch (this.clusterMode()) {
            case "default":
                data = data.map(row => {
                    if (!row.already_flagged) {
                        const mult = this.searchRectMult();
                        const left = row[0] - half_w * mult;
                        const top = row[1] - half_h * mult - arrow_height;
                        const right = row[0] + half_w * mult;
                        const bottom = row[1] + half_h * mult - arrow_height;
                        row.overlap_arr = qt.searchRect(left, top, right, bottom).filter(n => n !== row);
                        if (row.overlap_arr.length === 0) {
                            row.already_flagged = false;
                        }
                    }
                    return row;
                });
                data.forEach(data_row => {
                    if (data_row.already_flagged && data_row.overlap_arr.length) {
                        data.push(cluster_arr([data_row, ...data_row.overlap_arr]));
                    }
                });
                break;
            case "grid":
                const grid_cell_w = this.gridCellSize();
                const grid_cell_h = this.gridCellSize();
                const grid_row_count = Math.ceil(this.size().width / grid_cell_w);
                const grid_col_count = Math.ceil(this.size().height / grid_cell_h);
                for (let _col = 0; _col < grid_col_count; _col++) {
                    for (let _row = 0; _row < grid_row_count; _row++) {
                        const left = grid_cell_w * _row;
                        const top = grid_cell_h * _col;
                        const right = grid_cell_w * (_row + 1);
                        const bottom = grid_cell_h * (_col + 1);
                        const overlap_arr = qt.searchRect(left, top, right, bottom);
                        if (overlap_arr.length > 1) {
                            const x = left + (grid_cell_w / 2);
                            const y = top + (grid_cell_h / 2);
                            data.push(cluster_arr(overlap_arr, x, y));
                        }
                    }
                }
                break;
        }
        return data;

        function cluster_arr(arr: CanvasPinRow[], x?: number, y?: number): CanvasPinRow {
            const arr_weight = arr.reduce((a, b) => {
                b.already_flagged = true;
                return a + b[2];
            }, 0);
            const _x = typeof x !== "undefined" ? x : context.useAveragePos() ? arr.reduce((a, b) => a + b[0] * b[2], 0) / arr_weight : arr[0][0];
            const _y = typeof y !== "undefined" ? y : context.useAveragePos() ? arr.reduce((a, b) => a + b[1] * b[2], 0) / arr_weight : arr[0][1];
            return {
                0: _x,
                1: _y,
                weight: arr.reduce((a, b) => a + b[2], 0),
                is_cluster: true,
                already_flagged: false,
                fillStyle: "#FFFFFF",
                strokeStyle: "#000000",
                overlap_arr: []
            };
        }
    }

    drawQuadtree() {
        if (!this._quadtree_rect_arr) return;
        this._ctx.strokeStyle = "#000000";
        this._quadtree_rect_arr.forEach(n => {
            this._ctx.strokeRect(n[0], n[1], n[2], n[3]);
        });
    }
    draw(data_arr) {
        const context = this;
        const ctx = this._ctx;
        if (this.showQuadtree()) this.drawQuadtree();
        const arrow_height = this.arrowHeight();
        const arrow_width = this.arrowWidth();
        const pin_h = this.pinHeight();
        const pin_w = this.pinWidth();
        const weight_bonus: number = this.radiusWeightMult();
        let heaviest_cluster = 0;
        if (this.useWeightedRadius()) {
            data_arr.filter(n => n.is_cluster).forEach(n => {
                if (heaviest_cluster < n.weight) {
                    heaviest_cluster = n.weight;
                }
            });
        }
        data_arr
            .filter(n => !n.already_flagged)
            .sort((a, b) => a[1] > b[1] ? 1 : -1)
            .forEach(d => {
                if (d.is_cluster || this.allCircles()) {
                    let _radius = pin_w / 2;
                    if (this.useWeightedRadius()) {
                        _radius += pin_w * (weight_bonus * d.weight / heaviest_cluster);
                    }
                    drawCirclePin({
                        icon: d.weight,
                        left: Math.floor(d[0] - _radius) + 0.5,
                        top: Math.floor(d[1] - _radius - arrow_height) + 0.5,
                        radius: _radius,
                        arrow_height,
                        arrow_width
                    });
                } else {
                    drawSquarePin({
                        fillStyle: d.fillStyle,
                        strokeStyle: d.strokeStyle,
                        icon: d.weight,
                        left: Math.floor(d[0] - (pin_w / 2)) + 0.5,
                        top: Math.floor(d[1] - pin_h - arrow_height) + 0.5,
                        width: pin_w,
                        height: pin_h,
                        arrow_height,
                        arrow_width
                    });
                }
            });

        function drawCirclePin(p: any) {
            p.width = p.radius * 2;
            p.height = p.width;
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = "#000000";
            ctx.beginPath();
            ctx.arc(p.left + (p.width / 2), p.top + (p.height / 2), p.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            drawPinText(p);
        }
        function drawSquarePin(p: any) {
            ctx.fillStyle = p.fillStyle;
            ctx.strokeStyle = "#000000";
            ctx.fillRect(p.left, p.top, p.width, p.height);
            ctx.strokeRect(p.left, p.top, p.width, p.height);
            drawArrow(p);
            drawPinText(p);
        }
        function drawArrow(p: any, is_offset?: boolean) {
            const a_x0 = p.left + (p.width / 2) - (p.arrow_width / 2);
            const a_x1 = p.left + (p.width / 2);
            const a_x2 = p.left + (p.width / 2) + (p.arrow_width / 2);
            let a_y0 = p.top + p.height;
            let a_y1 = a_y0 + p.arrow_height;
            let a_y2 = a_y0;
            if (!is_offset) {
                ctx.fillStyle = "#FFFFFF";
                ctx.strokeStyle = "#000000";
            } else {
                ctx.fillStyle = "#FFFFFF";
                ctx.strokeStyle = "#FFFFFF";
                a_y0 -= 2;
                a_y1 -= 2;
                a_y2 -= 2;
            }
            ctx.beginPath();
            ctx.moveTo(a_x0, a_y0);
            ctx.lineTo(a_x1, a_y1);
            ctx.lineTo(a_x2, a_y2);
            ctx.lineTo(a_x0, a_y0);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            if (!is_offset) drawArrow(p, true);
        }
        function drawPinText(p: any) {
            ctx.font = `${context.pinFontSize()}px '${context.pinFontFamily()}'`;
            const x = p.left + (p.width / 2);
            const y = p.top + (p.height / 2);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000000";
            let size_dec = 0;
            let txt_w = ctx.measureText(p.icon).width;
            while (txt_w > p.width || !context.shrinkFontToPin()) {
                size_dec++;
                ctx.font = `${context.pinFontSize() - size_dec}px '${context.pinFontFamily()}'`;
                txt_w = ctx.measureText(p.icon).width;
            }
            ctx.fillText(p.icon, x, y);
        }
    }

    skewedData() {
        const context = this;
        const retArr = [];
        const arr = this.data();
        const box = this.size();

        const coordsWidth = this.bottomRightX() - this.topLeftX();
        const coordsHeight = this.bottomRightY() - this.topLeftY();

        const pixelValueX = coordsWidth / box.width;
        const pixelValueY = coordsHeight / box.height;

        arr.forEach(function (n) {
            const left = Math.abs(n[0] - context.topLeftX());
            const top = Math.abs(n[1] - context.topLeftY());

            const newX = left / pixelValueX;
            const newY = top / pixelValueY;

            retArr.push([newX, newY, n[2]]);
        });

        return retArr;
    }
}
CanvasPins.prototype._class += " map_CanvasPins";

export interface CanvasPins {
    clusterMode(): any;
    clusterMode(_: any): CanvasPins;
    allCircles(): boolean;
    allCircles(_: boolean): CanvasPins;
    showQuadtree(): boolean;
    showQuadtree(_: boolean): CanvasPins;
    useAveragePos(): boolean;
    useAveragePos(_: boolean): CanvasPins;
    useWeightedRadius(): boolean;
    useWeightedRadius(_: boolean): CanvasPins;
    radiusWeightMult(): number;
    radiusWeightMult(_: number): CanvasPins;
    shrinkFontToPin(): boolean;
    shrinkFontToPin(_: boolean): CanvasPins;
    enableClustering(): boolean;
    enableClustering(_: boolean): CanvasPins;
    searchRectMult(): number;
    searchRectMult(_: number): CanvasPins;
    gridCellSize(): number;
    gridCellSize(_: number): CanvasPins;
    arrowHeight(): number;
    arrowHeight(_: number): CanvasPins;
    arrowWidth(): number;
    arrowWidth(_: number): CanvasPins;
    bottomRightX(): number;
    bottomRightX(_: number): CanvasPins;
    bottomRightY(): number;
    bottomRightY(_: number): CanvasPins;
    topLeftX(): number;
    topLeftX(_: number): CanvasPins;
    topLeftY(): number;
    topLeftY(_: number): CanvasPins;
    pinHeight(): number;
    pinHeight(_: number): CanvasPins;
    pinWidth(): number;
    pinWidth(_: number): CanvasPins;
    pinFontFamily(): string;
    pinFontFamily(_: string): CanvasPins;
    pinFontSize(): number;
    pinFontSize(_: number): CanvasPins;
    bottomRightX_exists(): boolean;
    bottomRightY_exists(): boolean;
    topLeftX_exists(): boolean;
    topLeftY_exists(): boolean;
}

CanvasPins.prototype.publish("clusterMode", "default", "set", "clusterMode", ["defualt", "grid"], { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("gridCellSize", 80, "number", "gridCellSize", null, { tags: ["Basic"], optional: true });

CanvasPins.prototype.publish("allCircles", false, "boolean", "allCircles", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("showQuadtree", false, "boolean", "showQuadtree", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("useAveragePos", false, "boolean", "useAveragePos", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("shrinkFontToPin", true, "boolean", "shrinkFontToPin", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("enableClustering", true, "boolean", "enableClustering", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("useWeightedRadius", false, "boolean", "useWeightedRadius", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("radiusWeightMult", 0.5, "number", "radiusWeightMult", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("searchRectMult", 3, "number", "searchRectMult", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("bottomRightX", null, "number", "Bottom right x-value", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("bottomRightY", null, "number", "Bottom right y-value", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("topLeftX", null, "number", "Top left x-value", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("topLeftY", null, "number", "Top left y-value", null, { tags: ["Basic"], optional: true });

CanvasPins.prototype.publish("pinHeight", 20, "number", "pinHeight", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("pinWidth", 20, "number", "pinWidth", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("pinFontFamily", "Arial", "string", "pinFontFamily", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("pinFontSize", 14, "number", "pinFontSize", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("arrowHeight", 8, "number", "arrowHeight", null, { tags: ["Basic"], optional: true });
CanvasPins.prototype.publish("arrowWidth", 8, "number", "arrowWidth", null, { tags: ["Basic"], optional: true });
