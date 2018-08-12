import { csvFormat } from "d3-dsv";
// @ts-ignore ---
import * as fs from "fs";
// @ts-ignore ---
import * as airlines from "../data/airlines.json";

/*
  {
    "airport": {
      "code": "ATL",
      "name": "Atlanta, GA: Hartsfield-Jackson Atlanta International"
    },
    "statistics": {
      "flights": {
        "cancelled": 5,
        "on time": 561,
        "total": 752,
        "delayed": 186,
        "diverted": 0
      },
      "# of delays": {
        "late aircraft": 18,
        "weather": 28,
        "security": 2,
        "national aviation system": 105,
        "carrier": 34
      },
      "minutes delayed": {
        "late aircraft": 1269,
        "weather": 1722,
        "carrier": 1367,
        "security": 139,
        "total": 8314,
        "national aviation system": 3817
      }
    },
    "time": {
      "label": "2003/6",
      "year": 2003,
      "month": 6
    },
    "carrier": {
      "code": "AA",
      "name": "American Airlines Inc."
    }
  },
*/

interface Airport {
    code: string;
    name: string;
    count: number;
}

interface Carrier {
    code: string;
    name: string;
    count: number;
}

/*
interface Time {
    label: string;
    year: number;
    month: number;
}
*/

interface Stat {
    year: number;
    month: number;
    airport: string;
    carrier: string;
    ontime: number;
    cancelled: number;
    delayed: number;
    diverted: number;
    delay: number;
}

interface Info {
    airportDict: { [code: string]: Airport };
    airports: Airport[];
    carrierDict: { [code: string]: Carrier };
    carriers: Carrier[];
    stats: Stat[];
}

const info: Info = {
    airportDict: {},
    airports: [],
    carrierDict: {},
    carriers: [],
    stats: []
};

function tally(dict, key, field) {
    let item = dict[key];
    if (!item) {
        item = dict[key] = {
            ...field,
            count: 0
        };
    }
    item.count++;
}

for (const row of airlines) {
    tally(info.airportDict, row.airport.code, row.airport);
    tally(info.carrierDict, row.carrier.code, row.carrier);

    const timeParts = row.time.label.split("/");
    info.stats.push({
        year: timeParts[0],
        month: timeParts[1],
        airport: row.airport.code,
        carrier: row.carrier.code,
        ontime: row.statistics.flights["on time"],
        cancelled: row.statistics.flights.cancelled,
        delayed: row.statistics.flights.delayed,
        diverted: row.statistics.flights.diverted,
        delay: row.statistics["minutes delayed"].total
    });
}

for (const key in info.airportDict) {
    info.airports.push(info.airportDict[key]);
}

for (const key in info.carrierDict) {
    info.carriers.push(info.carrierDict[key]);
}

fs.writeFile("data/airports.csv", csvFormat(info.airports), "utf8", () => { });
fs.writeFile("data/carriers.csv", csvFormat(info.carriers), "utf8", () => { });
fs.writeFile("data/stats.csv", csvFormat(info.stats), "utf8", () => { });
