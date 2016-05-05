"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery","kendo.all.min","../common/HTMLWidget"], factory);
    } else {
        root.kendo_Bar = factory();
    }
}(this, function (jquery, kendo, HTMLWidget) {



    function Bar() {
        HTMLWidget.call(this);

        var context = this;
        this._tag = "div";
        this._type = "unknown";
        this._chartType = "BarChart";
    }
    Bar.prototype = Object.create(HTMLWidget.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " kendo_Bar";


    Bar.prototype.init = function (domNode, element) {  };


    Bar.prototype.update = function (domNode, element) {

        console.log(JSON.stringify(this.data()));
        console.log(JSON.stringify(this.columns()));
        var create = function() {


                var kendoChartOptions = {
                    title: {
                        text: "Site Visitors Stats \n /thousands/"
                    },
                    legend: {
                        visible: false
                    },
                    seriesDefaults: {
                        type: "bar"
                    },
                    series: [{
                        name: "Total Visits",
                        data: [56000, 63000, 74000, 91000, 117000, 138000]
                    }, {
                        name: "Unique visitors",
                        data: [52000, 34000, 23000, 48000, 67000, 83000]
                    }],
                    valueAxis: {
                        max: 140000,
                        line: {
                            visible: false
                        },
                        minorGridLines: {
                            visible: true
                        },
                        labels: {
                            rotation: "auto"
                        }
                    },
                    categoryAxis: {
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                        majorGridLines: {
                            visible: false
                        }
                    },
                    tooltip: {
                        visible: true,
                        template: "#= series.name #: #= value #"
                    }
                };

                $("#"+domNode.id).kendoChart(kendoChartOptions);

        };

        $(document).ready(create);
        $(document).bind("kendo:skinChange", create);

    };

    return Bar;
}));
