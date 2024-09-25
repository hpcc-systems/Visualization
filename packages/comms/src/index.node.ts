// DOM Parser polyfill  ---
import { DOMParser } from "@xmldom/xmldom";
globalThis.DOMParser = DOMParser;

import * as https from "https";
import { Agent, setGlobalDispatcher } from "undici";

globalThis.fetch["__defaultAgent"] = new Agent();
globalThis.fetch["__rejectUnauthorizedAgent"] = new Agent({
    connect: {
        rejectUnauthorized: false
    }
});
globalThis.fetch["__setGlobalDispatcher"] = setGlobalDispatcher;

import { trustwave } from "./pem/trustwave.ts";

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

globalThis.fetch["__trustwaveAgent"] = new https.Agent({
    ca: globalCA + trustwave
});

//  btoa polyfill  ---
if (typeof globalThis.btoa === "undefined") {
    globalThis.btoa = function (str: string) {
        return Buffer.from(str || "", "utf8").toString("base64");
    };
}

export * from "./index-common.ts";

//  Client Tools  ---
export * from "./clienttools/eclcc.ts";
export * from "./clienttools/eclMeta.ts";
