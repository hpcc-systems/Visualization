import * as d3 from "d3";
import * as topojson from "topojson";
import { Choropleth } from './Choropleth';

var countries = null;
var features = null;
var rFeatures = null;

export function ChoroplethCountries() {
    Choropleth.call(this);
}
ChoroplethCountries.prototype = Object.create(Choropleth.prototype);
ChoroplethCountries.prototype.constructor = ChoroplethCountries;
ChoroplethCountries.prototype._class += " map_ChoroplethCountries";

ChoroplethCountries.prototype.layerEnter = function (base, svgElement, domElement) {
    Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = countries.topology;
        this._choroTopologyObjectsCountries = countries.topology.objects.countries;
        this._choroTopologyObjectsLand = countries.topology.objects.land;
    this._choroTopologyObjects = this._choroTopologyObjectsCountries;

    this._selection.widgetElement(this._choroplethData);
    this.choroPaths = d3.select(null);
    var context = this;
    this
        .tooltipHTML(function (d) {
            return context.tooltipFormat({ label: d[0], value: d[1] });
        })
    ;
};

ChoroplethCountries.prototype.layerUpdate = function (base) {
    Choropleth.prototype.layerUpdate.apply(this, arguments);

    this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
    var context = this;
    this.choroPaths.enter().append("path")
        .attr("class", "data")
        .call(this._selection.enter.bind(this._selection))
        .on("click", function (d) {
            if (context._dataMap[d[0]]) {
                context.click(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(this));
            }
        })
        .on("dblclick", function (d) {
            if (context._dataMap[d[0]]) {
                context.dblclick(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(this));
            }
        })
        .on("mouseout.tooltip", this.tooltip.hide)
        .on("mousemove.tooltip", this.tooltip.show)
    ;
    this.choroPaths
        .attr("d", function (d) {
            var retVal = base._d3GeoPath(rFeatures[d[0]]);
            if (!retVal) {
                console.log("Unknown Country:  " + d);
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

ChoroplethCountries.prototype.layerPreRender = function () {
    if (!this._topoJsonPromise) {
        this._topoJsonPromise = new Promise(function (resolve, reject) {
            if (countries) {
                resolve();
            }
            require(["json!src/map/TopoJSON/countries.json"], function (_countries) {
                countries = _countries;
                features = topojson.feature(countries.topology, countries.topology.objects.countries).features;
                rFeatures = {};
                for (var key in features) {
                    if (features[key].id && countries.countryNames[features[key].id]) {
                        rFeatures[countries.countryNames[features[key].id].name] = features[key];
                    }
                }
                resolve();
            });
        });
    }
    return this._topoJsonPromise;
};
