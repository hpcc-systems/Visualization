import { GMapLayered } from "./GMapLayered";
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

    update(domNode, element) {
        GMapLayered.prototype.update.apply(this, arguments);
        this._pins.data(this.pinsData());
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

    latitudeColumn: { (): string; (_: string): GMapPin };
    latitudeColumn_exists: () => boolean;
    longtitudeColumn: { (): string; (_: string): GMapPin };
    longtitudeColumn_exists: () => boolean;
    colorColumn: { (): string; (_: string): GMapPin };
    colorColumn_exists: () => boolean;
    tooltipColumn: { (): string; (_: string): GMapPin };
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

GMapPin.prototype.publish("latitudeColumn", null, "set", "Latitude", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("longtitudeColumn", null, "set", "Longtitude", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("colorColumn", null, "set", "Color", function () { return this.columns(); }, { optional: true });
GMapPin.prototype.publish("tooltipColumn", null, "set", "Tooltip", function () { return this.columns(); }, { optional: true });
