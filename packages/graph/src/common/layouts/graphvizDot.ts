import { type Engine } from "@hpcc-js/wasm-graphviz";
import { isLayoutSuccess, type LayoutSVG } from "./workers/graphvizDotOptions.ts";
// @ts-ignore
import GraphvizDotWorker from "./workers/graphvizDot.ts?worker&inline";

export interface GraphvizDotResponse {
    response: Promise<string>;
    terminate: () => void;
}

export function graphvizDot(dot: string, layout: Engine = "dot", format: string = "svg"): GraphvizDotResponse {
    const worker = new GraphvizDotWorker();
    const response = new Promise<string>((resolve, reject) => {
        worker.onmessage = event => {
            const data: LayoutSVG = event.data;
            if (isLayoutSuccess(data)) {
                resolve(data.svg);
            } else {
                reject(new Error(data.error));
            }
            worker.terminate();
        };
        worker.postMessage({ dot, layout, format });
    });
    return {
        terminate: (): void => worker.terminate(),
        response
    };
}
