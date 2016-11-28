import { GMapLayered } from './GMapLayered';
import { Lines } from './Lines';
import { Pins } from './Pins';
export function GMapPinLine(target) {
    GMapLayered.call(this);

    var context = this;
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
GMapPinLine.prototype = Object.create(GMapLayered.prototype);
GMapPinLine.prototype.constructor = GMapPinLine;
GMapPinLine.prototype._class += " map_GMapPinLine";
    
    GMapPinLine.prototype.publish("autoScale", false, "boolean", "Auto scale to data");
       
GMapPinLine.prototype.publish("fromPinColor", "green", "color", "From Pin Color");
GMapPinLine.prototype.publish("fromLatitudeColumn", null, "set", "From Latitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromLongtitudeColumn", null, "set", "From Longtitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromColorColumn", null, "set", "From Color", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("fromTooltipColumn", null, "set", "From Tooltip", function () { return this.columns(); }, { optional: true });

GMapPinLine.prototype.publish("toPinColor", "red", "color", "To Pin Color");
GMapPinLine.prototype.publish("toLatitudeColumn", null, "set", "To Latitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toLongtitudeColumn", null, "set", "To Longtitude", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toColorColumn", null, "set", "To Color", function () { return this.columns(); }, { optional: true });
GMapPinLine.prototype.publish("toTooltipColumn", null, "set", "To Tooltip", function () { return this.columns(); }, { optional: true });

GMapPinLine.prototype.pinsData = function () {
    var columns = this.columns();
    this._fromView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongtitudeColumn()]);
    this._toView = this._db.rollupView([this.toLatitudeColumn(), this.toLongtitudeColumn()]);
    var fromRetVal = this._fromView.entries().map(function (row) {
        var firstRow = row.values[0].values[0];
        return [row.key, row.values[0].key, {
            fillColor: firstRow[columns.indexOf(this.fromColorColumn())] || this.fromPinColor(),
            tooltip: firstRow[columns.indexOf(this.fromTooltipColumn())],
            origRow: firstRow
        }];
    }, this);
    var toRetVal = this._toView.entries().map(function (row) {
        var firstRow = row.values[0].values[0];
        return [row.key, row.values[0].key, {
            fillColor: firstRow[columns.indexOf(this.toColorColumn())] || this.toPinColor(),
            tooltip: firstRow[columns.indexOf(this.toTooltipColumn())],
            origRow: firstRow
        }];
    }, this);
    return fromRetVal.concat(toRetVal);
};

GMapPinLine.prototype.linesData = function () {
    this._linesView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongtitudeColumn(), this.toLatitudeColumn(), this.toLongtitudeColumn()]);
    return this._linesView.data();
};

GMapPinLine.prototype.enter = function (domNode, element) {
    GMapLayered.prototype.enter.apply(this, arguments);
    this
        .layers([
            this._lines,
            this._pins
        ])
        ;
};

GMapPinLine.prototype.update = function (domNode, element) {
    GMapLayered.prototype.update.apply(this, arguments);
    this._pins.data(this.pinsData());
    this._lines.data(this.linesData());
        if (this.autoScale() && this._prevChecksum !== this._db.checksum()) {
            this._prevChecksum = this._db.checksum();
            this.zoomTo(this._pins.pinsData().map(function (row) { return [row.lat, row.long]; }));
        }
    };

GMapPinLine.prototype.exit = function (domNode, element) {
    GMapLayered.prototype.exit.apply(this, arguments);
};

GMapPinLine.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
};

GMapPinLine.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
};
