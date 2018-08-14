import { isBrowser, isTravis } from "@hpcc-js/util";

export const ESP_URL = isTravis ? "http://52.51.90.23:8010/" : "http://192.168.3.22:8010/";
export const QUERY_URL = isTravis ? "http://52.51.90.23:8002/" : "http://192.168.3.22:8002/";
console.log(`Test Server:  ${ESP_URL}`);
console.log(`isTravis:  ${isTravis}`);
console.log(`isBrowser:  ${isBrowser}`);
