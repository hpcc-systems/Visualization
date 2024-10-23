import { Runtime, Library, Inspector as BaseInspector } from "@observablehq/runtime";
import { compile, type ohq } from "@hpcc-js/observablehq-compiler";
import { FenceInfo, renderExecutedSrc } from "./util.ts";

class Inspector extends BaseInspector {

    constructor(protected placeholder: HTMLElement) {
        super(placeholder);
    }

    pending() {
        super.pending();
    }

    fulfilled(value: any, _name?: string) {
        switch (typeof value) {
            case "string":
                this.placeholder.innerText = value;
                break;
            default:
                super.fulfilled(value);
        }
    }

    rejected(error: Error) {
        super.rejected(error);
    }
}

export interface RenderNode extends FenceInfo {
    id: string;
    content: string;
    innerHTML?: string;
}

export async function render(nodes: RenderNode[]) {
    const displayIndex: { [key: string]: boolean } = {};
    const nb: ohq.Notebook = { nodes: [], files: [] };
    for (const node of nodes) {
        nb.nodes.push({
            id: node.id,
            name: node.id,
            mode: "js",
            value: node.content
        });
        displayIndex[node.id] = renderExecutedSrc(node);
    }
    const define = await compile(nb);
    const runtime = new Runtime(new Library());
    runtime.module(define, () => {
        define(runtime, (_name: string | undefined, id: string | number) => {
            const placeholder = globalThis?.document?.getElementById("" + id);
            if (placeholder && displayIndex[id]) {
                return new Inspector(placeholder);
            }
            return {
                pending() { },
                fulfilled(_value: any, _name?: string) { },
                rejected(_error: any, _name?: string) { }
            };
        });
    });
}
