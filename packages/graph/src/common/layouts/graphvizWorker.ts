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

export interface GraphvizWorkerResponse {
    svg: string;
}

export interface GraphvizWorkerError {
    error: string;
    errorDot: string;
}

export interface GraphvizResponse {
    terminate: () => void;
    response: Promise<GraphvizWorkerResponse | GraphvizWorkerError>;
}

export function isGraphvizWorkerResponse(response: GraphvizWorkerResponse | GraphvizWorkerError): response is GraphvizWorkerResponse {
    return (response as GraphvizWorkerResponse).svg !== undefined;
}

export function graphviz(data: Data, options: Options): GraphvizResponse {
    const worker = new GraphvizWorker();
    const response = new Promise<GraphvizWorkerResponse | GraphvizWorkerError>(resolve => {
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
