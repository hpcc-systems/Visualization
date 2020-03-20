import { isBrowser, isCI as utilIsTravis } from "@hpcc-js/util";

export const isCI = utilIsTravis;
export const ESP_URL = isCI ? "http://52.210.14.156:8010/" : "http://localhost:8010/";
export const QUERY_URL = isCI ? "http://52.210.14.156:8002/" : "http://localhost:8002/";

console.log(`Test Server:  ${ESP_URL}`);
console.log(`isCI:  ${isCI}`);
console.log(`isBrowser:  ${isBrowser}`);
