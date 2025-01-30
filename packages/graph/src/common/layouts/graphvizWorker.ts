import { type Cluster, type Data, type Engine, isLayoutSuccess, type Node, type LayoutError, type Options } from "./workers/graphvizOptions.ts";
// @ts-ignore
import GraphvizWorker from "./workers/graphviz.ts?worker&inline";

export {
    type Cluster,
    type Engine,
    isLayoutSuccess,
    type Node,
    type LayoutError,
    type Options
};

export function graphviz(data: Data, options: Options) {
    const worker = new GraphvizWorker();
    const response = new Promise<string>(resolve => {
        worker.onmessage = event => {
            resolve(event.data);
            worker.terminate();
        };
        worker.postMessage([data, options]);
    });
    return {
        terminate: () => worker.terminate(),
        response
    };
}
