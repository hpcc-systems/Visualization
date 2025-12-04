// DOM Parser polyfill  ---
import { root } from "@hpcc-js/util";
import { DOMParser } from "@xmldom/xmldom";
root.DOMParser = DOMParser;

//  fetch polyfill  ---
import fetch, { Headers, Request, Response, } from "node-fetch";

import * as https from "node:https";
import { Buffer } from "node:buffer";
import { Agent, setGlobalDispatcher } from "undici";

if (typeof root.fetch === "undefined") {
    //  NodeJS < v18  ---
    root.fetch = fetch;
    root.Headers = Headers;
    root.Request = Request;
    root.Response = Response;
    root.fetch.__rejectUnauthorizedAgent = new https.Agent({
        rejectUnauthorized: false
    });
} else {
    //  NodeJS >= v18  ---
    root.fetch.__defaultAgent = new Agent();
    root.fetch.__rejectUnauthorizedAgent = new Agent({
        connect: {
            rejectUnauthorized: false
        }
    });
    root.fetch.__setGlobalDispatcher = setGlobalDispatcher;
}

//  AbortController polyfill  ---
import AbortController from "abort-controller";
if (typeof root.AbortController === "undefined") {
    root.AbortController = AbortController;
}

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

root.fetch.__trustwaveAgent = new https.Agent({
    ca: globalCA + trustwave
});

export * from "./index.common.ts";

//  Client Tools  ---
export * from "./clienttools/eclcc.ts";
export * from "./clienttools/eclMeta.ts";
