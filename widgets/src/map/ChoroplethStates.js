"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./us-states"], factory);
    } else {
        root.map_ChoroplethStates = factory(root.d3, root.map_Choropleth, root.topojson, root.usStates);
    }
}(this, function (d3, Choropleth, topojson, usStates) {
    function ChoroplethStates() {
        Choropleth.call(this);
        this._class = "map_ChoroplethStates";

        this.projection("albersUsaPr");
    };
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);

    ChoroplethStates.prototype.testData = function () {
        var nameCodeMap = {};
        for (var key in usStates.stateNames) {
            var item = usStates.stateNames[key];
            nameCodeMap[item.name] = item.code;
        }

        var rawData = [
            { name: "Alabama", data: 4779736 }, { name: "Alaska", data: 710231 }, { name: "Arizona", data: 6392017 }, { name: "Arkansas", data: 2915918 }, { name: "California", data: 37253956 }, { name: "Colorado", data: 5029196 }, { name: "Connecticut", data: 3574097 }, { name: "District of Columbia", data: 601723 }, { name: "Florida", data: 18801310 }, { name: "Georgia", data: 9687653 }, { name: "Hawaii", data: 1360301 }, { name: "Idaho", data: 1567582 }, { name: "Illinois", data: 12830632 }, { name: "Indiana", data: 6483802 }, { name: "Iowa", data: 3046355 }, { name: "Maine", data: 1328361 }, { name: "Maryland", data: 5773552 }, { name: "Massachusetts", data: 6547629 }, { name: "Michigan", data: 9883640 }, { name: "Minnesota", data: 5303925 }, { name: "Mississippi", data: 2967297 }, { name: "Missouri", data: 5988927 }, { name: "Montana", data: 989415 }, { name: "Nebraska", data: 1826341 }, { name: "Nevada", data: 2700551 }, { name: "New Hampshire", data: 1316470 }, { name: "New Jersey", data: 8791894 }, { name: "New Mexico", data: 2059179 }, { name: "New York", data: 19378102 }, { name: "North Carolina", data: 9535483 }, { name: "North Dakota", data: 672591 }, { name: "Ohio", data: 11536504 }, { name: "Oklahoma", data: 3751351 }, { name: "Oregon", data: 3831074 }, { name: "Pennsylvania", data: 12702379 }, { name: "Rhode Island", data: 1052567 }, { name: "South Carolina", data: 4625364 }, { name: "South Dakota", data: 814180 }, { name: "Tennessee", data: 6346105 }, { name: "Texas", data: 25145561 }, { name: "Utah", data: 2763885 }, { name: "Vermont", data: 625741 }, { name: "Virginia", data: 8001024 }, { name: "Washington", data: 6724540 }, { name: "West Virginia", data: 1852994 }, { name: "Wisconsin", data: 5686986 }, { name: "Wyoming", data: 563626 }
        ];

        this.columns(["State", "Weight", "Data", "Label"]);
        var stateData = rawData.map(function (item) {
            item.weight = item.data;
            return [nameCodeMap[item.name], item.weight, item.data, item.name];
        });
        this.data(stateData);
        return this;
    };

    ChoroplethStates.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usStates.topology, usStates.topology.objects.states).features)

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .on("click", function (d) {
                var code = usStates.stateNames[d.id].code;
                if (context._dataMap[code]) {
                    context.click(context.rowToObj(context._dataMap[code]), "data");
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
        ;
        this.choroPaths
            .append("title")
        ;
    };

    ChoroplethStates.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        //console.time("ChoroplethStates.prototype.update");
        var context = this;
        //  Update  ---
            this.choroPaths
                .attr("d", this.d3Path)
                .each(function (d) {
                    var code = usStates.stateNames[d.id].code;
                    var weight = context._dataMap[code] ? context._dataMap[code][1] : undefined;
                    var data = context._dataMap[code] ? context._dataMap[code][2] : undefined;
                    d3.select(this)
                        .style("fill", weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight))
                        .select("title")
                        .text(usStates.stateNames[d.id].name + (data === undefined ? "" : " (" + data + ")"))
                    ;
                })
            ;
            this.zoomToFit(null,0,0.95);
        //console.timeEnd("ChoroplethStates.prototype.update");
    };

    return ChoroplethStates;
}));
