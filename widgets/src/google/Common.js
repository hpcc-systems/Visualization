(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "../chart/I2DChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.Common = factory(root.d3, root.HTMLWidget, root.I2DChart);
    }
}(this, function (d3, HTMLWidget, I2DChart) {

    function Common(tget) {
        HTMLWidget.call(this);
        I2DChart.call(this);
        this._class = "google_Common";

        this._tag = "div";

        this.columns([]);
        this.data([]);
        this._data_google = [];
    };
    Common.prototype = Object.create(HTMLWidget.prototype);
    Common.prototype.implements(I2DChart.prototype);

    Common.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var data = [this._columns].concat(this._data);
            this._data_google = google.visualization.arrayToDataTable(data);
        }
        return retVal;
    };

    return Common;
}));
