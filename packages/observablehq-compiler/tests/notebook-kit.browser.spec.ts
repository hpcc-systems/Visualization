import { describe, it, expect } from "vitest";
import { Inspector } from "@observablehq/inspector";
import { Library } from "@observablehq/stdlib";
import { Runtime } from "@observablehq/runtime";
import { ohq, ohqnk } from "@hpcc-js/observablehq-compiler";
import { auto_mark_heatmap } from "./notebook-kit";

const link = globalThis.document.createElement("link");
link.rel = "stylesheet";
link.href = "./__moduleRoot__/dist/index.css";
document.head.appendChild(link);

const placeholder = globalThis.document.createElement("div");
globalThis.document.body.appendChild(placeholder);

describe("notebook-kit-compiler", function () {
    it("notebook-kit", async () => {
        const compiledNB = await ohqnk.compile(auto_mark_heatmap);

        const library = new Library();
        const runtime = new Runtime(library);

        compiledNB(runtime, name => {
            const div = globalThis?.document.createElement("div");
            placeholder.appendChild(div);
            return new Inspector(div);
        });
    });
});
