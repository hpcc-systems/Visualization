import { Graphviz, type Engine } from "@hpcc-js/wasm-graphviz";
import { LayoutSVG } from "./graphvizDotOptions.js";

async function graphvizDot(dot: string, layout: Engine): Promise<LayoutSVG> {
    const graphviz = await Graphviz.load();
    try {
        return {
            svg: graphviz.layout(dot, "svg", layout)
        };
    } catch (e: any) {
        if (e instanceof Error) {
            return {
                error: e.message,
                errorDot: dot
            };
        }
        throw e;
    }
}

self.onmessage = event => {
    graphvizDot(event.data.dot, event.data.layout).then(result => {
        self.postMessage(result);
    });
};