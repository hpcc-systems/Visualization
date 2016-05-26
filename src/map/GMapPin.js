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
                context.click(row.ext.origRow, "", sel);
            })
        ;
    }
    GMapPin.prototype = Object.create(GMapLayered.prototype);
    GMapPin.prototype.constructor = GMapPin;
    GMapPin.prototype._class += " map_GMapPin";

    GMapPin.prototype.publishProxy("pinColor", "_pins", "fillColor");

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

    GMapPin.prototype.click = function (row, col, sel) {
        console.log("GMapPin-click:  ", row, col, sel);
    };

    return GMapPin;
}));
