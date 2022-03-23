﻿import { GMapLayered } from "./GMapLayered";
import { Lines } from "./Lines";
import { Pins } from "./Pins";

export class GMapPinLine extends GMapLayered {
    _lines;
    _pins;
    _fromView;
    _toView;
    _linesView;

    constructor() {
        super();

        const context = this;
        this._lines = new Lines();
        this._pins = new Pins()
            .columns(["lat", "long", "ext"])
            .on("click", function (row, col, sel) {
                context.click(context.rowToObj(row.ext.origRow), "", sel);
            })
            .on("dblclick", function (row, col, sel) {
                context.click(context.rowToObj(row.ext.origRow), "", sel);
            })
            ;
    }

    pinsData() {
        if (this.data().length === 0) return [];
        const columns = this.columns();
        this._fromView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongitudeColumn()]);
        this._toView = this._db.rollupView([this.toLatitudeColumn(), this.toLongitudeColumn()]);
        const fromRetVal = this._fromView.entries().map(function (row) {
            const firstRow = row.values[0].value[0];
            return [row.key, row.values[0].key, {
                fillColor: firstRow[columns.indexOf(this.fromColorColumn())] || this.fromPinColor(),
                tooltip: firstRow[columns.indexOf(this.fromTooltipColumn())],
                origRow: firstRow
            }];
        }, this);
        const toRetVal = this._toView.entries().map(function (row) {
            const firstRow = row.values[0].value[0];
            return [row.key, row.values[0].key, {
                fillColor: firstRow[columns.indexOf(this.toColorColumn())] || this.toPinColor(),
                tooltip: firstRow[columns.indexOf(this.toTooltipColumn())],
                origRow: firstRow
            }];
        }, this);
        return fromRetVal.concat(toRetVal);
    }

    linesData() {
        if (this.data().length === 0) return [];
        this._linesView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongitudeColumn(), this.toLatitudeColumn(), this.toLongitudeColumn()]);
        return this._linesView.data();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this
            .layers([
                this._lines,
                this._pins
            ])
            ;
    }

    private _prevChecksum;
    update(domNode, element) {
        super.update(domNode, element);
        this._pins.data(this.pinsData());
        this._lines.data(this.linesData());
        if (this.autoScale() && this._prevChecksum !== this._db.checksum()) {
            this._prevChecksum = this._db.checksum();
            this.zoomTo(this._pins.pinsData().map(function (row) { return [row.lat, row.long]; }));
        }
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    click(row, column, selected) {
    }

    dblclick(row, column, selected) {
    }

    autoScale: { (): boolean; (_: boolean): GMapPinLine };
    fromPinColor: { (): string; (_: string): GMapPinLine };
    fromPinColor_exists: () => boolean;
    fromLatitudeColumn: { (): string; (_: string): GMapPinLine };
    fromLatitudeColumn_exists: () => boolean;
    fromLongitudeColumn: { (): string; (_: string): GMapPinLine };
    fromLongitudeColumn_exists: () => boolean;
    fromColorColumn: { (): string; (_: string): GMapPinLine };
    fromColorColumn_exists: () => boolean;
    fromTooltipColumn: { (): string; (_: string): GMapPinLine };
    fromTooltipColumn_exists: () => boolean;
    toPinColor: { (): string; (_: string): GMapPinLine };
    toPinColor_exists: () => boolean;
    toLatitudeColumn: { (): string; (_: string): GMapPinLine };
    toLatitudeColumn_exists: () => boolean;
    toLongitudeColumn: { (): string; (_: string): GMapPinLine };
    toLongitudeColumn_exists: () => boolean;
    toColorColumn: { (): string; (_: string): GMapPinLine };
    toColorColumn_exists: () => boolean;
    toTooltipColumn: { (): string; (_: string): GMapPinLine };
    toTooltipColumn_exists: () => boolean;

}
GMapPinLine.prototype._class += " map_GMapPinLine";

GMapPinLine.prototype.publish("autoScale", false, "boolean", "Auto scale to data");
GMapPinLine.prototype.publish("fromPinColor", "green", "html-color", "From Pin Color");
GMapPinLine.prototype.publish("fromLatitudeColumn", null, "set", "From Latitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromLongitudeColumn", null, "set", "From Longitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromColorColumn", null, "set", "From Color", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromTooltipColumn", null, "set", "From Tooltip", function () { return this.columns(); }, { optional: true });

GMapPinLine.prototype.publish("toPinColor", "red", "html-color", "To Pin Color");
GMapPinLine.prototype.publish("toLatitudeColumn", null, "set", "To Latitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toLongitudeColumn", null, "set", "To Longitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toColorColumn", null, "set", "To Color", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toTooltipColumn", null, "set", "To Tooltip", function () { return this.columns(); }, { optional: true });
