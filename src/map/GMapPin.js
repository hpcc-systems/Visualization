"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./GMapLayered", "./Pins"], factory);
    } else {
        root.map_GMapPin = factory(root.d3, root.map_GMapLayered, root.map_Pins);
    }
}(this, function (d3, GMapLayered, Pins) {
    function GMapPin(target) {
        GMapLayered.call(this);

        var context = this;
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
    GMapPin.prototype = Object.create(GMapLayered.prototype);
    GMapPin.prototype.constructor = GMapPin;
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

    GMapPin.prototype.pinsData = function () {
        var columns = this.columns();
        this._view = this._db.rollupView([this.latitudeColumn(), this.longtitudeColumn()]);
        return this._view.entries().map(function (row) {
            var firstRow = row.values[0].values[0];
            return [row.key, row.values[0].key, {
                fillColor: firstRow[columns.indexOf(this.colorColumn())],
                tooltip: firstRow[columns.indexOf(this.tooltipColumn())],
                origRow: firstRow
            }];
        }, this);
    };

    GMapPin.prototype.enter = function (domNode, element) {
        GMapLayered.prototype.enter.apply(this, arguments);
        this
            .layers([
                this._pins
            ])
        ;
    };

    GMapPin.prototype.update = function (domNode, element) {
        GMapLayered.prototype.update.apply(this, arguments);
        this._pins.data(this.pinsData());
    };

    GMapPin.prototype.exit = function (domNode, element) {
        GMapLayered.prototype.exit.apply(this, arguments);
    };

    GMapPin.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    GMapPin.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    return GMapPin;
}));
