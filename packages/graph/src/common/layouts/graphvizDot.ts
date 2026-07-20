import { type Engine } from "@hpcc-js/wasm-graphviz";
import { isLayoutSuccess, type LayoutSVG } from "./workers/graphvizDotOptions.ts";
// @ts-ignore
import GraphvizDotWorker from "./workers/graphvizDot.ts?worker&inline";

export {
    isLayoutSuccess,
    type LayoutSVG
};

export interface GraphvizDotResponse {
    response: Promise<string>;
    terminate: () => void;
}

export function graphvizDot(dot: string, layout: Engine = "dot"): GraphvizDotResponse {
    const worker = new GraphvizDotWorker();
    const response = new Promise<string>((resolve, reject) => {
        worker.onmessage = event => {
            if (isLayoutSuccess(event.data)) {
                resolve(event.data.svg);
            } else {
                reject(new Error(event.data.error));
            }
            worker.terminate();
        };
        worker.postMessage({ dot, layout });
    });
    return {
        terminate: (): void => worker.terminate(),
        response
    };
}
