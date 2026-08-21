import * as topojson from "topojson-client";
import { topoJsonFolder } from "../Choropleth.ts";
import { fetchJson } from "../fetchJson.ts";
import { US } from "./US.ts";

let usCounties = null;
const usCountyNames = {};

export class USCounties extends US {

    init(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = (usCounties ? Promise.resolve(usCounties) : fetchJson(`${topoJsonFolder()}/us-counties.json`).then(data => usCounties = data)).then((usCounties: any) => {
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
        return this.tooltipText(this.rowToObj(row), `<b>${usCountyNames[featureID]}</b>:  ${value}`);
    }
}
USCounties.prototype._class += " map_USCounties";
