import { format as d3Format } from "d3-format";
import { json as d3Json } from "d3-request";
import { select as d3Select } from "d3-selection";
import * as topojson from "topojson";
import { Choropleth } from "./Choropleth";

let usCounties = null;
let features = null;
let rFeatures = null;
const fipsFormatter = d3Format("05d");

export class ChoroplethCounties extends Choropleth {
    _selection;
    choroPaths;

    constructor() {
        super();

        this.projection("AlbersUsaPr");
    }

    layerEnter(base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = usCounties.topology;
        this._choroTopologyObjects = usCounties.topology.objects.counties;

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3Select(null);
        const context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: usCounties.countyNames[+d[0]], value: context._dataMap[d[0]] ? context._dataMap[d[0]][1] : "N/A" });
            })
            ;
    }

    layerUpdate(base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);
        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        const context = this;

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
            .merge(this.choroPaths)
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[+d[0]]);  //  Global "fix" for leading zero is not wanted here.  Should really fix in JSON file (id) but file is too big to edit.
                if (!retVal) {
                    console.log("Unknown US County:  " + d[0]);
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
                if (usCounties) {
                    resolve();
                }
                d3Json(`${this._topoJsonFolder}/us-counties.json`, function (_usCounties) {
                    usCounties = _usCounties;
                    features = topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features;
                    rFeatures = {};
                    for (const key in features) {
                        if (features[key].id) {
                            rFeatures[features[key].id] = features[key];
                        }
                    }
                    resolve();
                });
            });
        }
        return this._topoJsonPromise;
    }

    onClickFormatFIPS: { (): boolean; (_: boolean): ChoroplethCounties };
    onClickFormatFIPS_exists: () => boolean;
}
ChoroplethCounties.prototype._class += " map_ChoroplethCounties";

ChoroplethCounties.prototype.publish("onClickFormatFIPS", false, "boolean", "format FIPS code as a String on Click");
