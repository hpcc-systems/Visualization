import * as topojson from "topojson-client";
import { topoJsonFolder } from "../Choropleth.ts";
import { fetchJson } from "../fetchJson.ts";
import { US } from "./US.ts";

let usStates = null;
const usStateNames = {};

export class USStates extends US {

    init(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = (usStates ? Promise.resolve(usStates) : fetchJson(`${topoJsonFolder()}/us-states.json`).then(data => usStates = data)).then((usStates: any) => {
                this._features = topojson.feature(usStates.topology, usStates.topology.objects.states).features;
                for (const key in this._features) {
                    if (this._features[key].id) {
                        const { code, name } = usStates.stateNames[this._features[key].id];
                        this._features[key].properties.hpccID = code;
                        usStateNames[code] = name;
                    }
                }
            });
        }
        return this._initPromise;
    }

    tooltipHandler(l, featureID) {
        const row = this._dataMap[featureID];
        const value = row && row[1] || "";
        return this.tooltipText(this.rowToObj(row), `<b>${usStateNames[featureID]}</b>:  ${value}`);
    }
}
USStates.prototype._class += " map_USStates";
