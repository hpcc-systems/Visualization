import { InputField } from "@hpcc-js/common";
import { json as d3Json } from "d3-request";
import { select as d3Select } from "d3-selection";
import * as topojson from "topojson";
import { Choropleth, topoJsonFolder } from "./Choropleth";

let usCounties = null;
let features = null;
let rFeatures = null;

export class ChoroplethCounties extends Choropleth {
    static __inputs: InputField[] = [{
        id: "fips",
        type: "string"
    }, {
        id: "value",
        type: "number"
    }];

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
                const code = d[0];
                return context.tooltipFormat({ label: usCounties.countyNames[code], value: context._dataMap[code] ? context._dataMap[code][1] : "N/A" });
            })
            ;
    }

    layerUpdate(base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this._choroplethData
            .style("stroke", this.meshVisible() ? null : "black")
            ;

        this.choroPaths = this._choroplethData.selectAll(".shape").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        const context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "shape")
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
                d3Json(`${topoJsonFolder()}/us-counties.json`, function (_usCounties) {
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
