import { type Data, type Options } from "./workers/forceDirectedOptions.ts";
// @ts-ignore
import ForceDirectedWorker from "./workers/forceDirected.ts?worker&inline";

export {
    type Options
};

export function forceDirected(data: Data, options: Options) {
    const worker = new ForceDirectedWorker();
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
