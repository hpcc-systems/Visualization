import { json as d3Json } from "d3-request";
import * as topojson from "topojson";
import { topoJsonFolder } from "../Choropleth";
import { US } from "./US";

let usCounties = null;
const usCountyNames = {};

export class USCounties extends US {

    init(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = new Promise((resolve, reject) => {
                if (usCounties) {
                    resolve(usCounties);
                }
                d3Json(`${topoJsonFolder()}/us-counties.json`, function (_usCounties) {
                    usCounties = _usCounties;
                    resolve(usCounties);
                });
            }).then((usCounties: any) => {
                this._features = topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features;
                for (const key in this._features) {
                    if (this._features[key].id) {
                        const code = this._features[key].id;
                        const name = usCounties.countyNames[code];
                        this._features[key].properties.hpccID = code;
                        usCountyNames[code] = name;
                    }
                }

            });
        }
        return this._initPromise;
    }

    tooltipHandler(l, featureID) {
        const row = this._dataMap[featureID];
        const value = row && row[1] || "";
        return `<b>${usCountyNames[featureID]}</b>:  ${value}`;
    }
}
USCounties.prototype._class += " map_USCounties";
