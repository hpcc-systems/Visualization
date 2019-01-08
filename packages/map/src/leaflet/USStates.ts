import { json as d3Json } from "d3-request";
import * as topojson from "topojson";
import { topoJsonFolder } from "../Choropleth";
import { US } from "./US";

let usStates = null;
const usStateNames = {};

export class USStates extends US {

    init(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = new Promise((resolve, reject) => {
                if (usStates) {
                    resolve(usStates);
                }
                d3Json(`${topoJsonFolder()}/us-states.json`, function (_usStates) {
                    usStates = _usStates;
                    resolve(usStates);
                });
            }).then((usStates: any) => {
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
        return `<b>${usStateNames[featureID]}</b>:  ${value}`;
    }
}
USStates.prototype._class += " map_USStates";
