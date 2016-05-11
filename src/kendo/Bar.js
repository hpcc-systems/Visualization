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

        var data = this.data();
        var kendoCategories = [];
        var kendoSeries = [];
        this.data().forEach(function(ele, ind, arr){
            kendoCategories.push(ele[0]);

        });

        this.columns().forEach(function(ele, ind, arr){
            if(ind > 0){

                var correspondingData = [];
                data.forEach(function(dEle, dInd, dArr){
                   correspondingData.push(dEle[ind]);
                });
                kendoSeries.push({name:arr[ind], data:correspondingData});
            }
        });

        var create = function() {


                var kendoChartOptions = {
                    legend: {
                        visible: false
                    },
                    seriesDefaults: {
                        type: "bar"
                    },
                    series:kendoSeries,

                    valueAxis: {
                        max: 100,
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
                        categories: kendoCategories,
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
