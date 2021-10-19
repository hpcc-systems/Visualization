import { json as d3Json } from "d3-request";
import * as topojson from "topojson-client";
import { topoJsonFolder } from "../Choropleth";
import { World } from "./World";

const topo_indexes = {
    "GB": ["administrative_area_level_3", "administrative_area_level_2", "administrative_area_level_1"],
    "IE": ["administrative_area_level_2", "administrative_area_level_1"],
    "ND": ["administrative_area_level_2", "administrative_area_level_1"]
};

type NameCodes = { [name: string]: { code: any, codes: any[] } };
type CodeNames = { [code: string]: { name: string, score: number, names: string[] } };
type CachedItem = { topology: any, nameIdx: NameCodes, codeIdx: CodeNames };
const _cachedRegion: { [id: string]: CachedItem } = {};
function cachedRegion(id: string): CachedItem {
    if (!_cachedRegion[id]) {
        _cachedRegion[id] = {
            topology: undefined,
            nameIdx: {},
            codeIdx: {}
        };
    }
    return _cachedRegion[id];
}

export class Region extends World {

    constructor() {
        super();
    }

    protected fetchTopo(regionID: string) {
        if (cachedRegion(regionID).topology) {
            return Promise.resolve(cachedRegion(regionID).topology);
        }
        return new Promise((resolve, reject) => {
            d3Json(`${topoJsonFolder()}/${regionID}.json`, function (region) {
                cachedRegion(regionID).topology = region;
                resolve(region);
            });
        });
    }

    protected fetchTopoIdx(regionID: string) {
        for (const _key in cachedRegion(regionID).nameIdx) {
            return Promise.resolve(cachedRegion(regionID).nameIdx);
        }
        return new Promise((resolve, reject) => {
            d3Json(`${topoJsonFolder()}/${regionID}_idx.json`, function (index) {
                const { nameIdx, codeIdx } = cachedRegion(regionID);
                topo_indexes[regionID]?.forEach(level => {
                    for (const name in index[level]) {
                        const codes = index[level][name];
                        if (Array.isArray(codes)) {
                            if (!nameIdx[name]) {
                                nameIdx[name] = { code: undefined, codes: [] };
                            }
                            nameIdx[name].codes = nameIdx[name].codes.concat(codes);
                            if (codes.length === 1) {
                                nameIdx[name].code = nameIdx[name].codes[0];
                            }
                            codes.forEach(code => {
                                if (!codeIdx[code]) {
                                    codeIdx[code] = { name: undefined, score: 9999, names: [] };
                                }
                                if (codes.length <= codeIdx[code].score) {
                                    codeIdx[code].name = name;
                                    codeIdx[code].score = codes.length;
                                }
                                codeIdx[code].names.push(name);
                            });
                        }
                    }
                });
                resolve(nameIdx);
            });
        });
    }

    updateDataMap(_?) {
        const expandedRetVal = [];
        const nameIdx = cachedRegion(this.region()).nameIdx;
        _.forEach(row => {
            const codes = nameIdx[row[0]]?.codes;
            if (codes) {
                codes?.forEach(code => {
                    expandedRetVal.push([code, row[1], row]);
                });
            } else {
                expandedRetVal.push([row[0], row[1], row]);
            }
        });
        return super.updateDataMap(expandedRetVal);
    }

    _prevRegion: string;
    init(): Promise<void> {
        const regionID = this.region();
        if (!this._initPromise || this._prevRegion !== regionID) {
            this._prevRegion = regionID;
            this._initPromise = Promise.all([
                this.fetchTopo(regionID),
                this.fetchTopoIdx(regionID)
            ]).then(([region, index]: [any, any]) => {
                this._features = topojson.feature(region, region.objects.PolbndA).features;
                for (const key in this._features) {
                    const code = this._features[key].id || key;
                    this._features[key].properties.hpccID = code;
                }
                this.updateDataMap(this.data());
            });
        }
        return this._initPromise;
    }

    tooltipHandler(l, featureID) {
        const row = this._dataMap[featureID];
        const codeIdx = cachedRegion(this.region()).codeIdx;
        const value = row && row[1] || "";
        const featureName = codeIdx[featureID]?.names.map(name => {
            if (codeIdx[featureID]?.name === name) {
                return `<u>${name}</u>`;
            }
            return name;
        }).join(", ");
        return this.tooltipText(this.rowToObj(row), `<b>${row && row[2][0] || featureName || featureID}</b>:  ${value}`);
    }
}
Region.prototype._class += " map_Region";

export interface Region {
    region(): string;
    region(_: string): this;
}

Region.prototype.publish("region", "GB", "set", "Region Data", ["AT", "BE", "BG", "BR", "CHLI", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KS", "LT", "LU", "LV", "MD", "MK", "MT", "ND", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "UA"]);

