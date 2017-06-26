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
        const columns = this.columns();
        this._fromView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongtitudeColumn()]);
        this._toView = this._db.rollupView([this.toLatitudeColumn(), this.toLongtitudeColumn()]);
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
        this._linesView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongtitudeColumn(), this.toLatitudeColumn(), this.toLongtitudeColumn()]);
        return this._linesView.data();
    }

    enter(domNode, element) {
        GMapLayered.prototype.enter.apply(this, arguments);
        this
            .layers([
                this._lines,
                this._pins
            ])
            ;
    }

    update(domNode, element) {
        GMapLayered.prototype.update.apply(this, arguments);
        this._pins.data(this.pinsData());
        this._lines.data(this.linesData());
    }

    exit(domNode, element) {
        GMapLayered.prototype.exit.apply(this, arguments);
    }

    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }
    fromPinColor: { (): string; (_: string): GMapPinLine };
    fromPinColor_exists: () => boolean;
    fromLatitudeColumn: { (): string; (_: string): GMapPinLine };
    fromLatitudeColumn_exists: () => boolean;
    fromLongtitudeColumn: { (): string; (_: string): GMapPinLine };
    fromLongtitudeColumn_exists: () => boolean;
    fromColorColumn: { (): string; (_: string): GMapPinLine };
    fromColorColumn_exists: () => boolean;
    fromTooltipColumn: { (): string; (_: string): GMapPinLine };
    fromTooltipColumn_exists: () => boolean;
    toPinColor: { (): string; (_: string): GMapPinLine };
    toPinColor_exists: () => boolean;
    toLatitudeColumn: { (): string; (_: string): GMapPinLine };
    toLatitudeColumn_exists: () => boolean;
    toLongtitudeColumn: { (): string; (_: string): GMapPinLine };
    toLongtitudeColumn_exists: () => boolean;
    toColorColumn: { (): string; (_: string): GMapPinLine };
    toColorColumn_exists: () => boolean;
    toTooltipColumn: { (): string; (_: string): GMapPinLine };
    toTooltipColumn_exists: () => boolean;

}
GMapPinLine.prototype._class += " map_GMapPinLine";

GMapPinLine.prototype.publish("fromPinColor", "green", "html-color", "From Pin Color");
GMapPinLine.prototype.publish("fromLatitudeColumn", null, "set", "From Latitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromLongtitudeColumn", null, "set", "From Longtitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromColorColumn", null, "set", "From Color", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromTooltipColumn", null, "set", "From Tooltip", function () { return this.columns(); }, { optional: true });

GMapPinLine.prototype.publish("toPinColor", "red", "html-color", "To Pin Color");
GMapPinLine.prototype.publish("toLatitudeColumn", null, "set", "To Latitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toLongtitudeColumn", null, "set", "To Longtitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toColorColumn", null, "set", "To Color", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toTooltipColumn", null, "set", "To Tooltip", function () { return this.columns(); }, { optional: true });
