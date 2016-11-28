import * as d3 from "d3";
import * as topojson from "topojson";
import { Choropleth } from './Choropleth';

    var usCounties = null;
    var features = null;
    var rFeatures = null;
var fipsFormatter = d3.format("05d");
export function ChoroplethCounties() {
    Choropleth.call(this);

    this.projection("albersUsaPr");
}
ChoroplethCounties.prototype = Object.create(Choropleth.prototype);
ChoroplethCounties.prototype.constructor = ChoroplethCounties;
ChoroplethCounties.prototype._class += " map_ChoroplethCounties";

ChoroplethCounties.prototype.publish("onClickFormatFIPS", false, "boolean", "format FIPS code as a String on Click");

ChoroplethCounties.prototype.layerEnter = function (base, svgElement, domElement) {
    Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = usCounties.topology;
        this._choroTopologyObjects = usCounties.topology.objects.counties;

    this._selection.widgetElement(this._choroplethData);
    this.choroPaths = d3.select(null);
    var context = this;
    this
        .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: usCounties.countyNames[+d[0]], value: context._dataMap[d[0]] ? context._dataMap[d[0]][1] : "N/A" });
        })
        ;
};

ChoroplethCounties.prototype.layerUpdate = function (base) {
    Choropleth.prototype.layerUpdate.apply(this, arguments);
    this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
    var context = this;

    function eventRow(d) {
        return context.onClickFormatFIPS() ? context._dataMap[d[0]].map(function (cell, idx) {
            return context.onClickFormatFIPS() && idx === 0 ? fipsFormatter(cell) : cell;
        }) : context._dataMap[d[0]];
    }

    this.choroPaths.enter().append("path")
        .attr("class", "data")
        .call(this._selection.enter.bind(this._selection))
        .on("click", function (d) {
            if (context._dataMap[d[0]]) {
                context.click(context.rowToObj(eventRow(d)), "weight", context._selection.selected(this));
            }
        })
        .on("dblclick", function (d) {
            if (context._dataMap[d[0]]) {
                context.dblclick(context.rowToObj(eventRow(d)), "weight", context._selection.selected(this));
            }
        })
        .on("mouseout.tooltip", this.tooltip.hide)
        .on("mousemove.tooltip", this.tooltip.show)
        ;
    this.choroPaths
        .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[+d[0]]);  //  Global "fix" for leading zero is not wanted here.  Should really fix in JSON file (id) but file is too big to edit.
            if (!retVal) {
                    console.log("Unknown US County:  " + d[0]);
            }
            return retVal;
        })
        .style("fill", function (d) {
            var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
            return retVal;
        })
        ;
    this.choroPaths.exit().remove();
};

ChoroplethCounties.prototype.layerPreRender = function () {
    if (!this._topoJsonPromise) {
        this._topoJsonPromise = new Promise(function (resolve, reject) {
            if (usCounties) {
                resolve();
            }
            require(["json!src/map/TopoJSON/us-counties.json"], function (_usCounties) {
                usCounties = _usCounties;
                features = topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features;
                rFeatures = {};
                for (var key in features) {
                    if (features[key].id) {
                        rFeatures[features[key].id] = features[key];
                    }
                }
                resolve();
            });
        });
    }
    return this._topoJsonPromise;
};
