(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Gauge = factory(root.Common);
    }
}(this, function (Common) {
    function Gauge(target) {
        Common.call(this);

        this._class = "c3_gauge";
        this._type = "gauge";
        this._config.data = {
            columns: []
        };
    };
    Gauge.prototype = Object.create(Common.prototype);
    
    Gauge.prototype.publish("low", 0, "number", "Gauge lower bound");
    Gauge.prototype.publish("high", 100, "number", "Gauge higher bound");

    Gauge.prototype.enter = function (domNode, element) {
        this._config.gauge = {
            min: this.low(),
            max: this.high()
        };

        Common.prototype.enter.apply(this, arguments);     
    };

    Gauge.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);
        
        this.c3Chart.load({
            columns: data
        });
               
    };

    return Gauge;
}));