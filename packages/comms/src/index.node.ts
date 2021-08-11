
//  fetch polyfill  ---
import { root } from "@hpcc-js/util";
import fetch from "node-fetch";
if (typeof root.fetch === "undefined") {
    root.fetch = fetch;
}

import * as https from "https";
import { trustwave } from "./pem/trustwave";

root.fetch.__rejectUnauthorizedAgent = new https.Agent({
    rejectUnauthorized: false
});

let globalCA = "";
if (https.globalAgent.options.ca !== undefined) {
    if (Array.isArray(https.globalAgent.options.ca) && https.globalAgent.options.ca.length) {
        if (typeof https.globalAgent.options.ca[0] === "string") {
            globalCA = https.globalAgent.options.ca.join("\n");
        } else if (https.globalAgent.options.ca[0] instanceof Buffer) {
            globalCA = https.globalAgent.options.ca.map(row => row.toString()).join("\n");
        }
    } else if (typeof https.globalAgent.options.ca === "string") {
        globalCA = https.globalAgent.options.ca;
    } else if (https.globalAgent.options.ca instanceof Buffer) {
        globalCA = https.globalAgent.options.ca.toString();
    }
    globalCA += "\n";
}

root.fetch.__trustwaveAgent = new https.Agent({
    ca: globalCA + trustwave
});

//  btoa polyfill  ---
import { Buffer } from "safe-buffer";
if (typeof root.btoa === "undefined") {
    root.btoa = function (str: string) {
        return Buffer.from(str || "", "utf8").toString("base64");
    };
}

export * from "./index-common";

//  Client Tools  ---
export * from "./clienttools/eclcc";
export * from "./clienttools/eclMeta";
