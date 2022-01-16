import { OJSRuntime } from "./ojsRuntime";
import { OMDRuntime } from "./omdRuntime";

import "../src/domRender.css";

export function renderTo(domNode: string | HTMLElement, languageId: string, ojs: string, path: string) {
    const compiler = languageId === "omd" ? new OMDRuntime(domNode) : new OJSRuntime(domNode);

    compiler.evaluate("", ojs, path);
}
