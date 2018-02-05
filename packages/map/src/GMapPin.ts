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
            })
            .on("dblclick", function (row, col, sel) {
                context.dblclick(context.rowToObj(row.ext.origRow), "", sel);
            })
            ;
    }

    pinsData() {
        if (this.data().length === 0) return [];
        const columns = this.columns();
        this._view = this._db.rollupView([this.latitudeColumn(), this.longtitudeColumn()]);
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
        GMapLayered.prototype.enter.apply(this, arguments);
        this
            .layers([
                this._pins
            ])
            ;
    }

    private _prevChecksum;
    update(domNode, element) {
        GMapLayered.prototype.update.apply(this, arguments);
        this._pins.data(this.pinsData());
        if (this.autoScale() && this._prevChecksum !== this._db.checksum()) {
            this._prevChecksum = this._db.checksum();
            this.zoomTo(this._pins.pinsData().map(function (row) { return [row.lat, row.long]; }));
        }
    }

    exit(domNode, element) {
        GMapLayered.prototype.exit.apply(this, arguments);
    }

    click(row, column, selected) {
        if (this.streetViewOnClick()) {
            this.streetViewAt({
                lat: +row[this.latitudeColumn()],
                lng: +row[this.longtitudeColumn()]
            });
        }
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }

    latitudeColumn_exists: () => boolean;
    longtitudeColumn_exists: () => boolean;
    colorColumn_exists: () => boolean;
    tooltipColumn_exists: () => boolean;
}
GMapPin.prototype._class += " map_GMapPin";

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

export interface GMapPin {
    autoScale(): boolean;
    autoScale(_: boolean): this;
    latitudeColumn(): string;
    latitudeColumn(_: string): this;
    longtitudeColumn(): string;
    longtitudeColumn(_: string): this;
    colorColumn(): string;
    colorColumn(_: string): this;
    tooltipColumn(): string;
    tooltipColumn(_: string): this;
    streetViewOnClick(): boolean;
    streetViewOnClick(_: boolean): this;
}
GMapPin.prototype.publish("autoScale", false, "boolean", "Auto scale to data");
GMapPin.prototype.publish("latitudeColumn", null, "set", "Latitude", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("longtitudeColumn", null, "set", "Longtitude", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("colorColumn", null, "set", "Color", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("tooltipColumn", null, "set", "Tooltip", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("streetViewOnClick", false, "boolean", "Switch to street view when pin clicked");
