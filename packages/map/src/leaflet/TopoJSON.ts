import { json as d3Json } from "d3-request";
import { GeoJSON, Map } from "leaflet";
import * as topojson from "topojson";
import { topoJsonFolder } from "../Choropleth";
import { FeatureLayer } from "./FeatureLayer";

export class TopoJSON extends GeoJSON {

    constructor(data, options) {
        super(data, options);
    }

    addData(data) {
        let geojson;
        let key;
        if (data.type === "Topology") {
            for (key in data.objects) {
                if (data.objects.hasOwnProperty(key)) {
                    geojson = topojson.feature(data, data.objects[key]);
                    super.addData.call(this, geojson);
                }
            }
            return this;
        }
        super.addData.call(this, data);
        return this;
    }
}

let usStates = null;
let usCounties = null;
let features = null;
let rFeatures = null;
export class TopoJSONLayer extends FeatureLayer {

    initStates(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = new Promise((resolve, reject) => {
                if (usStates) {
                    resolve();
                }
                d3Json(`${topoJsonFolder()}/us-states.json`, function (_usStates) {
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
        return this._initPromise;
    }

    initCounties(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = new Promise((resolve, reject) => {
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
        return this._initPromise;
    }

    init(): Promise<void> {
        return this.initCounties();
    }

    layerEnter(map: Map) {
        super.layerEnter(map);
        const topoJSON = new TopoJSON(features, {
            style(feature) {
                return {
                    color: "#000",
                    opacity: 1,
                    weight: 1,
                    fillColor: "#35495d",
                    fillOpacity: 0.2
                };
            }
        });
        this.add(topoJSON);
    }
}
