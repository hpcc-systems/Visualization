// DOM Parser polyfill  ---
import { DOMParser } from "xmldom";
import { root } from "@hpcc-js/util";
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

export * from "./index";
