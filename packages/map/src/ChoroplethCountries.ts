import { json as d3Json } from "d3-request";
import { select as d3Select } from "d3-selection";
import * as topojson from "topojson";
import { Choropleth } from "./Choropleth";

let countries = null;
let features = null;
let rFeatures = null;

export class ChoroplethCountries extends Choropleth {
    _choroTopologyObjectsCountries;
    _choroTopologyObjectsLand;
    _selection;
    choroPaths;

    constructor() {
        super();
    }

    layerEnter(base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = countries.topology;
        this._choroTopologyObjectsCountries = countries.topology.objects.countries;
        this._choroTopologyObjectsLand = countries.topology.objects.land;
        this._choroTopologyObjects = this._choroTopologyObjectsCountries;

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3Select(null);
        const context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d[0], value: d[1] });
            })
            ;
    }

    layerUpdate(base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        const context = this;
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
            .merge(this.choroPaths)
            .attr("d", function (d) {
                const retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown Country:  " + d);
                }
                return retVal;
            })
            .style("fill", function (d) {
                const retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
            ;
        this.choroPaths.exit().remove();
    }

    layerPreRender() {
        if (!this._topoJsonPromise) {
            this._topoJsonPromise = new Promise((resolve, reject) => {
                if (countries) {
                    resolve();
                }
                d3Json(`${this._topoJsonFolder}/countries.json`, function (_countries) {
                    countries = _countries;
                    features = topojson.feature(countries.topology, countries.topology.objects.countries).features;
                    rFeatures = {};
                    for (const key in features) {
                        if (features[key].id && countries.countryNames[features[key].id]) {
                            rFeatures[countries.countryNames[features[key].id].name] = features[key];
                        }
                    }
                    resolve();
                });
            });
        }
        return this._topoJsonPromise;
    }
}
ChoroplethCountries.prototype._class += " map_ChoroplethCountries";
