"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common"], factory);
    } else {
        root.Bar = factory(root.d3, root.Common);
    }
}(this, function (d3, Common) {

    function Bar(tget) {
        Common.call(this);
        this._class = "google_Bar";
    };
    Bar.prototype = Object.create(Common.prototype);

    Bar.prototype.publish("animationDuration", 0, "number", "Animation Duration");
    Bar.prototype.publish("animationOnStartup", true, "boolean", "Animate On Startup");
    Bar.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["","linear","in","out","inAndOut"]);
    
    Bar.prototype.publish("orientation", "vertical", "set", "Bar Orientation", ["","vertical","horizontal"]);
    
    Bar.prototype.enter = function (domNode, element) {
        var context = this;

        element.style("overflow", "hidden");
        this.barChart = new google.visualization.BarChart(element.node());
        google.visualization.events.addListener(this.barChart, "select", function () {
            var selectedItem = context.barChart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]), context._columns[selectedItem.column]);
            }
        });
    };

    Bar.prototype.update = function (domNode, element) {      
        Common.prototype.update.apply(this, arguments);

        var context = this;

        this._chartOptions.animation = {
            duration:this._animationDuration,
            startup:this._animationOnStartup,
            easing:this._animationEasing
        };
        this._chartOptions.orientation = this._orientation;

        this.barChart.draw(this._data_google, this._chartOptions);
    };

    return Bar;
}));
