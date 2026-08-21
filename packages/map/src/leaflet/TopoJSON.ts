import { GeoJSON, Map } from "./leaflet-shim.ts";
import * as topojson from "topojson-client";
import { topoJsonFolder } from "../Choropleth.ts";
import { fetchJson } from "../fetchJson.ts";
import { FeatureLayer } from "./FeatureLayer.ts";

export function fixDateLine(feature, layer) {
    const latlongs = layer.getLatLngs();
    latlongs.forEach(function (shape) {
        shape.forEach(function (cord) {
            if (Array.isArray(cord)) {
                const cutoff = 165;
                let lhs = 0;
                let rhs = 0;
                let vlhs = 0;
                let vrhs = 0;
                cord.forEach(function (pnt) {
                    if (pnt.lat > -62) {    //  Ignore Antartica
                        if (pnt.lng > cutoff) {
                            ++vrhs;
                        } else if (pnt.lng < -cutoff) {
                            ++vlhs;
                        }
                        if (pnt.lng > 0) {
                            ++rhs;
                        } else if (pnt.lng < 0) {
                            ++lhs;
                        }
                    }
                });
                if (vlhs > 0 && vrhs > 0) {
                    cord.forEach(function (pnt) {
                        if (pnt.lng > cutoff && lhs > rhs) {
                            pnt.lng -= 360;
                        } else if (pnt.lng < -cutoff && rhs > lhs) {
                            pnt.lng += 360;
                        }
                    });
                }
            }
        });
    });
    layer.setLatLngs(latlongs);
}

export class TopoJSON extends GeoJSON {

    constructor(data, options) {
        super(data, {
            ...options,
            onEachFeature: (feature, layer) => {
                if (options.onEachFeature) {
                    options.onEachFeature(feature, layer);
                }
                fixDateLine(feature, layer);
            }
        });
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
            this._initPromise = usStates ? Promise.resolve() :
                fetchJson(`${topoJsonFolder()}/us-states.json`).then(_usStates => {
                    usStates = _usStates;
                    features = topojson.feature(usStates.topology, usStates.topology.objects.states).features;
                    rFeatures = {};
                    for (const key in features) {
                        if (features[key].id) {
                            rFeatures[usStates.stateNames[features[key].id].code] = features[key];
                        }
                    }
                });
        }
        return this._initPromise;
    }

    initCounties(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = usCounties ? Promise.resolve() :
                fetchJson(`${topoJsonFolder()}/us-counties.json`).then(_usCounties => {
                    usCounties = _usCounties;
                    features = topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features;
                    rFeatures = {};
                    for (const key in features) {
                        if (features[key].id) {
                            rFeatures[features[key].id] = features[key];
                        }
                    }
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
