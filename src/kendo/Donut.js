"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery","kendo.all.min","../common/HTMLWidget"], factory);
    } else {
        root.kendo_Donut = factory();
    }
}(this, function (jquery, kendo, HTMLWidget) {



    function Donut() {
        HTMLWidget.call(this);

        var context = this;
        this._tag = "div";
        this._type = "unknown";
        this._chartType = "DonutChart";
    }
    Donut.prototype = Object.create(HTMLWidget.prototype);
    Donut.prototype.constructor = Donut;
    Donut.prototype._class += " kendo_Donut";


    Donut.prototype.init = function (domNode, element) {  };


    Donut.prototype.update = function (domNode, element) {

        var donutData = [];

        this.data().forEach(function(ele, ind, arr){
            donutData.push({category:ele[0],value:ele[1]});
        });

        console.log(JSON.stringify(this.data()));
        console.log(this.columns());

        function createChart() {
            $(domNode).kendoChart({
                title: {
                    position: "bottom",

                },
                legend: {
                    visible: false
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    type: "donut",
                    startAngle: 150
                },
                series: [{
                    name: "2011",
                    data: donutData
                
                }, ],
                tooltip: {
                    visible: true,
                    template: "#= category # (#= series.name #): #= value #%"
                }
            });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);

    };

    return Donut;
}));
