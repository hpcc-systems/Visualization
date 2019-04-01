import { isBrowser, isTravis as utilIsTravis } from "@hpcc-js/util";

export const isTravis = utilIsTravis;
export const ESP_URL = isTravis ? "http://52.210.14.156:8010/" : "http://localhost:8010/";
export const QUERY_URL = isTravis ? "http://52.210.14.156:8002/" : "http://localhost:8002/";

console.log(`Test Server:  ${ESP_URL}`);
console.log(`isTravis:  ${isTravis}`);
console.log(`isBrowser:  ${isBrowser}`);
