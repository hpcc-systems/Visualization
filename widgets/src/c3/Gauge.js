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
    Gauge.prototype.publish("units", "%", "string", "Gauge unit data is represented in. Default: %");
    Gauge.prototype.publish("arcWidth", 75, "number", "Gauge width of arc");
    
    Gauge.prototype.enter = function (domNode, element) {
        this._config.gauge = {
            min: this.low(),
            max: this.high(),
            units: this.units(),
            width: this.arcWidth(),
        };
        
        this._config.data = { columns: [[this.columns()[0], this._data]] }; // 1D

        Common.prototype.enter.apply(this, arguments);     
    };

    Gauge.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);

        var data = [[this.columns()[0], this._data]];
        
        this.c3Chart.load({
            columns: data
        });
               
    };

    return Gauge;
}));