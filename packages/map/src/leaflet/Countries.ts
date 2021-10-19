import { json as d3Json } from "d3-request";
import * as topojson from "topojson-client";
import { topoJsonFolder } from "../Choropleth";
import { World } from "./World";

let countries = null;

export class Countries extends World {

    constructor() {
        super();
    }

    init(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = new Promise((resolve, reject) => {
                if (countries) {
                    resolve(countries);
                }
                d3Json(`${topoJsonFolder()}/countries.json`, function (_countries) {
                    countries = _countries;
                    resolve(countries);
                });
            }).then((countries: any) => {
                this._features = topojson.feature(countries.topology, countries.topology.objects.countries).features;
                for (const key in this._features) {
                    if (this._features[key].id) {
                        const code = this._features[key].id;
                        const name = countries.countryNames[code]?.name;
                        this._features[key].properties.hpccID = name;
                    }
                }
            });
        }
        return this._initPromise;
    }

    tooltipHandler(l, featureID) {
        const row = this._dataMap[featureID];
        const value = row && row[1] || "";
        return this.tooltipText(this.rowToObj(row), `<b>${featureID}</b>:  ${value}`);
    }
}
