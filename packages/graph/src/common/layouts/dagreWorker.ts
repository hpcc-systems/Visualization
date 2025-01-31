import { Data, type Hierarchy, type Options } from "./workers/dagreOptions.ts";
// @ts-ignore
import DagreWorker from "./workers/dagre.ts?worker&inline";

export {
    type Hierarchy,
    type Options
};

export function dagre(data: Data, options: Options) {

    const worker = new DagreWorker();
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
