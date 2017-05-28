import { json as d3Json } from "d3-request";
import { select as d3Select } from "d3-selection";
import * as topojson from "topojson";
import { Choropleth } from "./Choropleth";

let usStates = null;
let features = null;
let rFeatures = null;

export class ChoroplethStates extends Choropleth {
    _selection;
    choroPaths;

    constructor() {
        super();

        this.projection("AlbersUsaPr");
    }

    layerEnter(base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = usStates.topology;
        this._choroTopologyObjects = usStates.topology.objects.states;

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3Select(null);
        const context = this;
        this
            .tooltipHTML(function (d) {
                const code = rFeatures[d[0]].id;
                return context.tooltipFormat({ label: usStates.stateNames[code].name, value: d[1] });
            })
            ;
    }

    layerUpdate(base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        const context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .attr("vector-effect", "non-scaling-stroke")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            .merge(this.choroPaths)
            .attr("d", function (d) {
                const retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown US State:  " + d);
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
                if (usStates) {
                    resolve();
                }
                d3Json(`${this._topoJsonFolder}/us-states.json`, function (_usStates) {
                    usStates = _usStates;
                    features = topojson.feature(usStates.topology, usStates.topology.objects.states).features;
                    rFeatures = {};
                    for (const key in features) {
                        if (features[key].id) {
                            rFeatures[usStates.stateNames[features[key].id].code] = features[key];
                        }
                    }
                    resolve();
                });
            });
        }
        return this._topoJsonPromise;
    }
}
ChoroplethStates.prototype._class += " map_ChoroplethStates";
