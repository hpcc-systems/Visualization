import { Graphviz, type Engine, type Format } from "@hpcc-js/wasm-graphviz";
import { LayoutSVG } from "./graphvizDotOptions.js";

async function graphvizDot(dot: string, layout: Engine, format: Format = "svg"): Promise<LayoutSVG> {
    const graphviz = await Graphviz.load();
    try {
        return {
            svg: graphviz.layout(dot, format, layout)
        };
    } catch (e: any) {
        if (e instanceof Error) {
            return {
                error: e.message
            };
        }
        throw e;
    }
}

self.onmessage = event => {
    graphvizDot(event.data.dot, event.data.layout, event.data.format).then(result => {
        self.postMessage(result);
    });
};