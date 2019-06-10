import { graphviz } from "@hpcc-js/wasm";
import { expect } from "chai";


describe("graphviz", () => {
    const dot = `
        digraph G {
            node [shape=rect];

            subgraph cluster_0 {
                style=filled;
                color=lightgrey;
                node [style=filled,color=white];
                a0 -> a1 -> a2 -> a3;
                label = "process #1";
            }

            subgraph cluster_1 {
                node [style=filled];
                b0 -> b1 -> b2 -> b3;
                label = "process #2";
                color=blue
            }

            start -> a0;
            start -> b0;
            a1 -> b3;
            b2 -> a3;
            a3 -> a0;
            a3 -> end;
            b3 -> end;

            start [shape=Mdiamond];
            end [shape=Msquare];
        }
    `;

    it("circo", async function () {
        return graphviz.doLayout(dot, "svg", "circo").then(svg => {
            expect(svg).to.not.be.empty;
            const div = document.createElement("DIV");
            div.innerHTML = svg;
            document.body.appendChild(div);
        });
    });

    it("dot", async function () {
        return graphviz.doLayout(dot, "svg", "dot").then(svg => {
            expect(svg).to.not.be.empty;
            const div = document.createElement("DIV");
            div.innerHTML = svg;
            document.body.appendChild(div);
        });
    });

    it("fdp", async function () {
        return graphviz.doLayout(dot, "svg", "fdp").then(svg => {
            expect(svg).to.not.be.empty;
            const div = document.createElement("DIV");
            div.innerHTML = svg;
            document.body.appendChild(div);
        });
    });

    it("neato", async function () {
        return graphviz.doLayout(dot, "svg", "neato").then(svg => {
            expect(svg).to.not.be.empty;
            const div = document.createElement("DIV");
            div.innerHTML = svg;
            document.body.appendChild(div);
        });
    });

    it("osage", async function () {
        return graphviz.doLayout(dot, "svg", "osage").then(svg => {
            expect(svg).to.not.be.empty;
            const div = document.createElement("DIV");
            div.innerHTML = svg;
            document.body.appendChild(div);
        });
    });

    it("patchwork", async function () {
        return graphviz.doLayout(dot, "svg", "patchwork").then(svg => {
            expect(svg).to.not.be.empty;
            const div = document.createElement("DIV");
            div.innerHTML = svg;
            document.body.appendChild(div);
        });
    });

    it("twopi", async function () {
        return graphviz.doLayout(dot, "svg", "twopi").then(svg => {
            expect(svg).to.not.be.empty;
            const div = document.createElement("DIV");
            div.innerHTML = svg;
            document.body.appendChild(div);
        });
    });
});
