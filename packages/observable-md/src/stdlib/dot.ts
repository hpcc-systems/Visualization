import { require as d3Require } from "d3-require";

export async function* dot(dotStr: string, props: { height?: number, [key: string]: any } = {}) {
    const hpccWasm = await d3Require("@hpcc-js/wasm");
    hpccWasm.wasmFolder("https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist");

    const div: any = document.createElement("div");
    div.style.height = `${props.height || 240}px`;

    yield div;

    const svg = await hpccWasm.graphviz.dot(dotStr);
    div.innerHTML = svg;
}
