﻿import { GMapLayered } from "./GMapLayered";
import { Pins } from "./Pins";

export class GMapPin extends GMapLayered {
    _pins;
    _view;

    constructor() {
        super();

        const context = this;
        this._pins = new Pins()
            .columns(["lat", "long", "ext"])
            .on("click", function (row, col, sel) {
                context.click(context.rowToObj(row.ext.origRow), "", sel);
                context.clickStreetView(context.rowToObj(row.ext.origRow), "", sel);
            })
            .on("dblclick", function (row, col, sel) {
                context.dblclick(context.rowToObj(row.ext.origRow), "", sel);
            })
            ;
    }

    pinsData() {
        if (this.data().length === 0) return [];
        const columns = this.columns();
        this._view = this._db.rollupView([this.latitudeColumn(), this.longitudeColumn()]);
        return this._view.entries().map(function (row) {
            const firstRow = row.values[0].value[0];
            return [row.key, row.values[0].key, {
                fillColor: firstRow[columns.indexOf(this.colorColumn())],
                tooltip: firstRow[columns.indexOf(this.tooltipColumn())],
                origRow: firstRow
            }];
        }, this);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this
            .layers([
                this._pins
            ])
            ;
    }

    private _prevChecksum;
    update(domNode, element) {
        super.update(domNode, element);
        this._pins.data(this.pinsData());
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

    clickStreetView(row, column, selected) {
        if (this.streetViewOnClick()) {
            this.streetViewAt({
                lat: +row[this.latitudeColumn()],
                lng: +row[this.longitudeColumn()]
            });
        }
    }

    dblclick(row, column, selected) {
    }
}
GMapPin.prototype._class += " map_GMapPin";

export interface GMapPin {
    autoScale(): boolean;
    autoScale(_: boolean): this;
    latitudeColumn(): string;
    latitudeColumn(_: string): this;
    latitudeColumn_exists(): boolean;
    longitudeColumn(): string;
    longitudeColumn(_: string): this;
    longitudeColumn_exists(): boolean;
    colorColumn(): string;
    colorColumn(_: string): this;
    colorColumn_exists(): boolean;
    tooltipColumn(): string;
    tooltipColumn(_: string): this;
    tooltipColumn_exists(): boolean;
    streetViewOnClick(): boolean;
    streetViewOnClick(_: boolean): this;

}

GMapPin.prototype.publish("autoScale", false, "boolean", "Auto scale to data");
GMapPin.prototype.publishProxy("pinColor", "_pins", "fillColor");
GMapPin.prototype.publishProxy("pinType", "_pins", "pinType");
GMapPin.prototype.publishProxy("pinWidth", "_pins", "pinWidth");
GMapPin.prototype.publishProxy("pinHeight", "_pins", "pinHeight");
GMapPin.prototype.publishProxy("cornerRadius", "_pins", "cornerRadius");
GMapPin.prototype.publishProxy("pinRadius", "_pins", "pinRadius");
GMapPin.prototype.publishProxy("arrowWidth", "_pins", "arrowWidth");
GMapPin.prototype.publishProxy("arrowHeight", "_pins", "arrowHeight");
GMapPin.prototype.publishProxy("textBaseline", "_pins", "textBaseline");
GMapPin.prototype.publishProxy("strokeWidth", "_pins", "strokeWidth");
GMapPin.prototype.publishProxy("omitNullLatLong", "_pins", "omitNullLatLong");

GMapPin.prototype.publish("latitudeColumn", null, "set", "Latitude", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("longitudeColumn", null, "set", "Longitude", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("colorColumn", null, "set", "Color", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("tooltipColumn", null, "set", "Tooltip", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("streetViewOnClick", false, "boolean", "Switch to street view when pin clicked");
