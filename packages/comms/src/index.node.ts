// DOM Parser polyfill  ---
import { root } from "@hpcc-js/util";
import { DOMParser } from "xmldom";
root.DOMParser = DOMParser;

//  XHR polyfill  ---
import * as nodeRequest from "request";
import { initNodeRequest } from "./connection";
initNodeRequest(nodeRequest);

//  btoa polyfill  ---
import { Buffer } from "safe-buffer";
if (typeof root.btoa === "undefined") {
    root.btoa = function (str: string) {
        return Buffer.from(str || "", "utf8").toString("base64");
    };
}

export * from "./index-common";

//  Client Tools  ---
export { locateAllClientTools, locateClientTools, IECLError } from "./clienttools/eclcc";
export { attachWorkspace, qualifiedIDBoundary, ECLScope } from "./clienttools/eclMeta";
