"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Choropleth", "topojson", "./us-states"], factory);
    } else {
        root.map_ChoroplethStates = factory(root.d3, root.map_Choropleth, root.topojson, root.map_usStates);
    }
}(this, function (d3, Choropleth, topojson, usStates) {
    function ChoroplethStates() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);
    ChoroplethStates.prototype.constructor = ChoroplethStates;
    ChoroplethStates.prototype._class += " map_ChoroplethStates";

    ChoroplethStates.prototype.testData = function () {
        var nameCodeMap = {};
        for (var key in usStates.stateNames) {
            var item = usStates.stateNames[key];
            nameCodeMap[item.name] = item.code;
        }

        var rawData = [
            { name: "Alabama", weight: 4779736 }, { name: "Alaska", weight: 710231 }, { name: "Arizona", weight: 6392017 }, { name: "Arkansas", weight: 2915918 }, { name: "California", weight: 37253956 }, { name: "Colorado", weight: 5029196 }, { name: "Connecticut", weight: 3574097 }, { name: "District of Columbia", weight: 601723 }, { name: "Florida", weight: 18801310 }, { name: "Georgia", weight: 9687653 }, { name: "Hawaii", weight: 1360301 }, { name: "Idaho", weight: 1567582 }, { name: "Illinois", weight: 12830632 }, { name: "Indiana", weight: 6483802 }, { name: "Iowa", weight: 3046355 }, { name: "Maine", weight: 1328361 }, { name: "Maryland", weight: 5773552 }, { name: "Massachusetts", weight: 6547629 }, { name: "Michigan", weight: 9883640 }, { name: "Minnesota", weight: 5303925 }, { name: "Mississippi", weight: 2967297 }, { name: "Missouri", weight: 5988927 }, { name: "Montana", weight: 989415 }, { name: "Nebraska", weight: 1826341 }, { name: "Nevada", weight: 2700551 }, { name: "New Hampshire", weight: 1316470 }, { name: "New Jersey", weight: 8791894 }, { name: "New Mexico", weight: 2059179 }, { name: "New York", weight: 19378102 }, { name: "North Carolina", weight: 9535483 }, { name: "North Dakota", weight: 672591 }, { name: "Ohio", weight: 11536504 }, { name: "Oklahoma", weight: 3751351 }, { name: "Oregon", weight: 3831074 }, { name: "Pennsylvania", weight: 12702379 }, { name: "Rhode Island", weight: 1052567 }, { name: "South Carolina", weight: 4625364 }, { name: "South Dakota", weight: 814180 }, { name: "Tennessee", weight: 6346105 }, { name: "Texas", weight: 25145561 }, { name: "Utah", weight: 2763885 }, { name: "Vermont", weight: 625741 }, { name: "Virginia", weight: 8001024 }, { name: "Washington", weight: 6724540 }, { name: "West Virginia", weight: 1852994 }, { name: "Wisconsin", weight: 5686986 }, { name: "Wyoming", weight: 563626 }
        ];

        this.columns(["State", "Weight", "Label"]);
        var stateData = rawData.map(function (item) {
            return [nameCodeMap[item.name], item.weight, item.name];
        });
        this.data(stateData);
        return this;
    };

    ChoroplethStates.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usStates.topology, usStates.topology.objects.states).features);

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .on("click", function (d) {
                var code = usStates.stateNames[d.id].code;
                if (context._dataMap[code]) {
                    context.click(context.rowToObj(context._dataMap[code]), "weight");
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
                d3.select(this)
                    .style("fill", weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight))
                    .select("title")
                    .text(usStates.stateNames[d.id].name + (weight === undefined ? "" : " (" + weight + ")"))
                ;
            })
        ;
        //console.timeEnd("ChoroplethStates.prototype.update");
    };

    return ChoroplethStates;
}));
