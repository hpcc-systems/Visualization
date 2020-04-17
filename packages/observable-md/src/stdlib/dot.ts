import { hpccRequire } from "./util";

export async function* dot(dotStr: string, props: { height?: number, [key: string]: any } = {}) {
    const hpccWasm = await hpccRequire("@hpcc-js/wasm");
    hpccWasm.wasmFolder("https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist");

    const div: any = document.createElement("div");
    div.style.height = `${props.height || 240}px`;

    yield div;

    const svg = await hpccWasm.graphviz.dot(dotStr);
    div.innerHTML = svg;
}
