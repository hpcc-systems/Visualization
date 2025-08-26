import { JSDOM } from "jsdom";

const { window } = new JSDOM();
globalThis.document = window.document;
globalThis.DOMParser = window.DOMParser;

export * from "./index.ts";
