import { HTMLWidget } from "@hpcc-js/common";
import { Library, Runtime, Inspector } from "@observablehq/runtime";
import { omd2notebook, compile } from "@hpcc-js/observablehq-compiler";
import { renderShort } from "../../test-data/src/index";

export const text = `\
# Hello World!!!!

\`\`\`
h = "Hello";
w = "World";
\`\`\`
---
\`\`\`
h + " " + w + "!"
\`\`\`
`;

class TestWidget extends HTMLWidget {
    constructor(protected compiledNB: Awaited<ReturnType<typeof compile>>) {
        super();
    }

    enter(domNode: HTMLElement, element: any) {
        super.enter(domNode, element);

        const library = new Library();
        const runtime = new Runtime(library);
        this.compiledNB(runtime, name => {
            const div = document.createElement("div");
            domNode.appendChild(div);
            return new Inspector(div);
        });
    }

    update(domNode: HTMLElement, element: any) {
        super.update(domNode, element);
    }
}

describe("@hpcc-js/observable-md", () => {

    describe("OMD Render", async () => {
        const ohqnb = omd2notebook(text);
        const compiledNB = await compile(ohqnb);

        renderShort(new TestWidget(compiledNB));
    });
});
