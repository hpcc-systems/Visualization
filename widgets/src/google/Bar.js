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

    Bar.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["","start","center","end"]);
    Bar.prototype.publish("legendPosition", "top", "set", "Legend Position", ["","bottom","labeled","left","none","right","top"]);
    Bar.prototype.publish("legendFontColor", "#000", "html-color", "Legend Font Color");
    Bar.prototype.publish("legendFontName", "Calibri", "string", "Legend Font Name");
    Bar.prototype.publish("legendFontSize", 12, "number", "Legend Font Size");
    Bar.prototype.publish("legendFontBold", true, "boolean", "Legend Font Bold");
    Bar.prototype.publish("legendFontItalic", true, "boolean", "Legend Font Italic");
    
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
        var context = this;

        var colors = this._columns.filter(function (d, i) { return i > 0;}).map(function (row) {
            return this._palette(row);
        }, this);

        var chartOptions = {
            backgroundColor: "none",
            width: this.width(),
            height: this.height(),
            //chartArea: { width: "100%", height: "100%" },
            colors: colors,
            ///is3D: this._is3D,
            animation: {
                duration:this._animationDuration,
                startup:this._animationOnStartup,
                easing:this._animationEasing
            },
            legend: { 
                alignment: this._legendAlignment,
                position: this._legendPosition,
                maxLines:2,
                textStyle: {
                    color: this._legendFontColor,
                    fontName: this._legendFontName,
                    fontSize: this._legendFontSize,
                    bold: this._legendFontBold,
                    italic: this._legendFontItalic,
                }
            },
            orientation:this._orientation
        };

        this.barChart.draw(this._data_google, chartOptions);
    };

    return Bar;
}));
