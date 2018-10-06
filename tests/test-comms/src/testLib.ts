import { isBrowser, isTravis } from "@hpcc-js/util";

export const ESP_URL = isTravis ? "http://52.210.152.210.14.156" : "http://192.168.3.22:8010/";
export const QUERY_URL = isTravis ? "http://52.210.152.210.14.156" : "http://192.168.3.22:8002/";

console.log(`Test Server:  ${ESP_URL}`);
console.log(`isTravis:  ${isTravis}`);
console.log(`isBrowser:  ${isBrowser}`);
