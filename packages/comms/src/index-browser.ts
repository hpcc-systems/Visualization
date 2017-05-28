// Promise polyfill  ---
import "es6-promise/auto";

//  XHR polyfill  ---
import { request as d3Request } from "d3-request";
import { initD3Request } from "./connection";
initD3Request(d3Request);

export * from "./index";
