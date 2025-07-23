import { Library, Runtime, Inspector } from "@observablehq/runtime";
import { describe, it, expect } from "vitest";
import { compile, download, ohq, ojs2notebook } from "@hpcc-js/observablehq-compiler";
import { fa } from "./File Attachments.ts";
import { imports } from "./Introduction to Imports.ts";
import { timechart } from "./Observable TimeChart.ts";

const link = globalThis.document.createElement("link");
link.rel = "stylesheet";
link.href = "./__moduleRoot__/dist/index.css";
document.head.appendChild(link);

const placeholder = globalThis.document.createElement("div");
globalThis.document.body.appendChild(placeholder);

const ojs = `
42;
a = 1
b = 2
c = a + b
d = {
  yield 1;
  yield 2;
  yield 3;
}

viewof e = {
  let output = {};
  let listeners = [];
  output.value = 10;
  output.addEventListener = (listener) => listeners.push(listener);;
  output.removeEventListener = (listener) => {
    listeners = listeners.filter(l => l !== listener);
  };
  return output;
}

tenTimes = {
  for (let i = 0; i < 10; i++) {
    yield Promises.delay(100);
  }
}

f = {
  tenTimes;
  return (this || 0) + 1;
}
`;

describe("ojs", function () {
    it("quickstart", async function () {

        const notebook = await download("https://observablehq.com/@observablehq/summary-table");
        const compiledNB = await compile(notebook);

        const library = new Library();
        const runtime = new Runtime(library);

        compiledNB(runtime, name => {
            const div = globalThis?.document.createElement("div");
            placeholder.appendChild(div);
            return new Inspector(div);
        });
    });

    it("simple", async function () {

        const notebook = ojs2notebook(ojs);
        const define = await compile(notebook);

        const library = new Library();
        const runtime = new Runtime(library);
        const main: ohq.Module = define(runtime, name => {
            if (placeholder) {
                const div = globalThis?.document.createElement("div");
                placeholder.appendChild(div);
                return new Inspector(div);
            }
            return {
                pending() { },
                fulfilled(value) { console.info("fulfilled", name, value); },
                rejected(error) { console.error("rejected", name, error); },
            };
        });

        expect(await main.value("d")).to.equal(1);
        expect(await main.value("d")).to.equal(2);
        expect(await main.value("d")).to.equal(3);
        expect(await main.value("d")).to.equal(3);
        expect(await main.value("d")).to.equal(3);

        expect(await main.value("c")).to.equal(3);
        expect(await main.value("a")).to.equal(1);
        expect(await main.value("b")).to.equal(2);

        expect(await main.value("e")).to.equal(10);
        const viewOfE = await main.value("viewof e");
        expect(viewOfE).to.have.property("value");
        expect(viewOfE).to.have.property("addEventListener");
        expect(viewOfE).to.have.property("removeEventListener");

        await main.value("tenTimes");

        for (const cellID in define.cells) {
            define.delete(cellID);
            break;
        }
    });

    it("File Attachements", async function () {

        const define = await compile(fa as any);

        const library = new Library();
        const runtime = new Runtime(library);
        const main: ohq.Module = define(runtime, name => {
            if (placeholder) {
                const div = globalThis?.document.createElement("div");
                placeholder.appendChild(div);
                return new Inspector(div);
            }
            return {
                pending() { console.info("pending", name); },
                fulfilled(value) { console.info("fulfilled", name, value); },
                rejected(error) { console.error("rejected", name, error); },
            };
        });
        expect(main).to.be.an("object");
    });

    it("esm imports", async function () {

        const define = await compile(`\
m1 = import("../tests/m1.mjs");
x = m1.f(5, 7);
`);

        const library = new Library();
        const runtime = new Runtime(library);
        const main: ohq.Module = define(runtime, name => {
            return {
                pending() { },
                fulfilled(value) { console.info("fulfilled", name, value); },
                rejected(error) { console.error("rejected", name, error); },
            };
        });
        expect(main).to.be.an("object");
        expect(await main.value("x")).to.equal(35);
    });

    it("Introduction to Imports", async function () {

        const define = await compile(imports as any);

        const library = new Library();
        const runtime = new Runtime(library);
        const main: ohq.Module = define(runtime, name => {
            if (placeholder) {
                const div = globalThis?.document.createElement("div");
                placeholder.appendChild(div);
                return new Inspector(div);
            }
            return {
                pending() { console.info("pending", name); },
                fulfilled(value) { console.info("fulfilled", name, value); },
                rejected(error) { console.error("rejected", name, error); },
            };
        });
        expect(main).to.be.an("object");
    });

    it("Observable TimeChart", async function () {

        const define2 = await compile(timechart as any);

        const library = new Library();
        const runtime = new Runtime(library);
        const main: ohq.Module = define2(runtime, name => {
            if (placeholder) {
                const div = globalThis?.document.createElement("div");
                placeholder.appendChild(div);
                return new Inspector(div);
            }
            return {
                pending() { console.info("pending", name); },
                fulfilled(value) { console.info("fulfilled", name, value); },
                rejected(error) { console.error("rejected", name, error); },
            };
        });
        expect(main).to.be.an("object");
    });
});

