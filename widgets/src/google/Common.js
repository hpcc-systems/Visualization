"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.Common = factory(root.d3, root.HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function Common(tget) {
        HTMLWidget.call(this);

        this._class = "google_Common";

        this._tag = "div";

        this.columns([]);
        this.data([]);
        this._data_google = [];

        this._chart = null;
    };
    Common.prototype = Object.create(HTMLWidget.prototype);

    Common.prototype.enter = function(domNode, element) {
        var context = this;
        element.style("overflow", "hidden");

        switch(this._type) {
            case "bar":
                var chartType = 'BarChart';
            break;
            case "pie":
                var chartType = 'PieChart';
            break;
            case "line":
                var chartType = 'LineChart';
            break;
        }

        console.log(google.visualization);
        this._chart = new google.visualization[chartType](element.node());
        google.visualization.events.addListener(this._chart, "select", function () {
            var selectedItem = context._chart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]), context._columns[selectedItem.column]);
            }
        });
    }

    Common.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

         var chartOptions = {
            backgroundColor: "none",
            width: this.width(),
            height: this.height(),
            //chartArea: { width: "100%", height: "100%" },
            colors: this._colors,
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

        this._chart.draw(this._data_google, chartOptions);

    };
    
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
