import { hashSum, scopedLogger } from "@hpcc-js/util";
import { graphviz } from "../common/graphT.ts";
import { GraphvizResponse, GraphvizWorkerResponse, GraphvizWorkerError, isGraphvizWorkerResponse } from "../common/layouts/graphvizWorker.ts";
export { isGraphvizWorkerResponse } from "../common/layouts/graphvizWorker.ts";

const logger = scopedLogger("src/graphviz/layout.ts");

interface GraphvizWorkerEx extends GraphvizResponse {

    svg?: string;
    error?: string;
}

export enum LayoutStatus {
    UNKNOWN,
    STARTED,
    LONG_RUNNING,
    COMPLETED,
    FAILED
}

export function isLayoutComplete(status: LayoutStatus) {
    return status === LayoutStatus.COMPLETED || status === LayoutStatus.FAILED;
}

class LayoutCache {

    protected _cache: { [key: string]: GraphvizWorkerEx } = {};

    calcSVG(dot: string): Promise<GraphvizWorkerResponse | GraphvizWorkerError> {
        const hashDot = hashSum(dot);
        if (!(hashDot in this._cache)) {
            this._cache[hashDot] = graphviz(dot, "dot");
            this._cache[hashDot].response.then(response => {
                if (isGraphvizWorkerResponse(response)) {
                    this._cache[hashDot].svg = response.svg as string;
                } else {
                    logger.error(`Invalid DOT:  ${response.error}`);
                    this._cache[hashDot].error = response.error;
                }
            }).catch(e => {
                logger.error(`Invalid DOT:  ${e}`);
                this._cache[hashDot].error = e;
            });
        }
        return this._cache[hashDot].response;
    }

    svg(dot: string) {
        const hashDot = hashSum(dot);
        if (hashDot in this._cache) {
            return this._cache[hashDot].svg;
        }
        return "";
    }

    status(dot: string): LayoutStatus {
        const hashDot = hashSum(dot);
        if (!(hashDot in this._cache)) {
            return LayoutStatus.UNKNOWN;
        } else if (this._cache[hashDot].svg) {
            return LayoutStatus.COMPLETED;
        } else if (this._cache[hashDot].error) {
            return LayoutStatus.FAILED;
        }
        return LayoutStatus.STARTED;
    }

    isComplete(dot: string): boolean {
        return isLayoutComplete(this.status(dot));
    }
}

export const layoutCache = new LayoutCache();