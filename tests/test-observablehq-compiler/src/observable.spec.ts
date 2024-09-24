import { compile, omd2notebook } from "@hpcc-js/observablehq-compiler";
import { Library, Runtime, Inspector } from "@observablehq/runtime";
import { expect } from "chai";

const text = `\
\`\`\`
import {checkbox, select} from "@jashkenas/inputs"

viewof sorting = select({title: 'Sorted by', options:["region","time"], value:"time"})
\`\`\`

# Five-Minute Introduction

\`\`\`
viewof colorzzz = html\`<input type="color" value="#0000ff">\`
html\`The color input (viewof colorzzz) is a \${viewof colorzzz.constructor.name}.\`
viewof colorzzz;
\`\`\`

Welcome! This notebook gives a quick overview of "Observable Markdown" a mashup of the excellent [Observable HQ](https://observablehq.com) + regular Markdown.  Here follows a quick introduction to Observable.  For a more technical introduction, see [Observable’s not JavaScript](/@observablehq/observables-not-javascript). For hands-on, see our [introductory tutorial series](/collection/@observablehq/introduction). To watch rather than read, see our [short introductory video](https://www.youtube.com/watch?v=uEmDwflQ3xE)!

Its also very easy to embed a value:  \${i} inside the Markdown!!!

Observable Markdown consists of a single markdown document with live "code" sections.

\`\`\`
2 * 3 * 7
{
let sum = 0;
for (let i = 0; i <= 100; ++i) {
    sum += i;
}
return sum;
}
\`\`\`

Cells can have names. This allows a cell’s value to be referenced by other cells.

\`\`\`
color = "red";
\`My favorite color is \${color}.\`
\`\`\`

A cell referencing another cell is re-evaluated automatically when the referenced value changes. Try editing the definition of color above and shift-return to re-evaluate.

Cells can generate DOM (HTML, SVG, Canvas, WebGL, etc.). You can use the standard DOM API like document.createElement, or use the built-in html tagged template literal:

\`\`\`
html\`<span style="background:yellow;">
My favorite language is <i>HTML</i>.
</span>\`
\`\`\`

There’s a Markdown tagged template literal, too. (This notebook is written in Markdown.)

\`\`\`
md\`My favorite language is *Markdown*.\`
\`\`\`

DOM can be made reactive simply by referring to other cells. The next cell refers to color. (Try editing the definition of color above.)

\`\`\`
html\`My favorite color is <i style="background:\${color};">\${color}</i>.\`
\`\`\`

Sometimes you need to load data from a remote server, or compute something expensive in a web worker. For that, cells can be defined asynchronously using [promises](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_promises):

\`\`\`
status = new Promise(resolve => {
setTimeout(() => {
    resolve({resolved: new Date});
}, 2000);
})
\`\`\`

A cell that refers to a promise cell sees the value when it is resolved; this implicit await means that referencing cells don’t care whether the value is synchronous or not. Edit the status cell above to see the cell below update after two seconds.

\`\`\`
status
\`\`\`

Promises are also useful for loading libraries from npm. Below, require returns a promise that resolves to the d3-fetch library:

\`\`\`
d3 = require("d3-fetch@1")
\`\`\`

If you prefer, you can use async and await explicitly (not this ):

\`\`\`
countries = (await d3.tsv("https://cdn.jsdelivr.net/npm/world-atlas@1/world/110m.tsv"))
    .sort((a, b) => b.pop_est - a.pop_est) // Sort by descending estimated population.
    .slice(0, 10) // Take the top ten.
\`\`\`

Cells can be defined as [generators](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators); a value is yielded up to sixty times a second.

\`\`\`
i = {
let i = 0;
while (true) {
    yield ++i;
}
}
\`The current value of i is \${i}.\`
\`\`\`

Any cell that refers to a generator cell sees its current value; the referencing cell is re-evaluated whenever the generator yields a new value. As you might guess, a generator can yield promises for [async iteration](https://github.com/tc39/proposal-async-iteration); referencing cells see the current resolved value.

\`\`\`
date = {
while (true) {
    yield new Promise(resolve => {
    setTimeout(() => resolve(new Date), 1000);
    });
}
}
\`\`\`

Combining these primitives—promises, generators and DOM—you can build custom user interfaces. Here’s a slider and a generator that yields the slider’s value:

\`\`\`
slider = html\`<input type=range>\`
sliderValue = Generators.input(slider)
\`\`\`

Generators.input returns a generator that yields promises. The promise resolves whenever the associated input element emits an input event. You don’t need to implement that generator by hand, though. There’s a builtin viewof operator which exposes the current value of a given input element:

\`\`\`
viewof value = html\`<input type=range>\`
value
\`\`\`

## Imports (dot)

\`\`\`
dot\`digraph { x -> y -> z; }\`;
\`\`\`

\`\`\`
import { dot } from "@gordonsmith/graphviz";
\`\`\`
`;

describe("@hpcc-js/observablehq-compiler", function () {
    this.timeout(10000);
    it("simple", async () => {
        try {
            const nb = omd2notebook(text);
            const compiledNB = await compile(nb);
            const library = new Library();
            const runtime = new Runtime(library);
            compiledNB(runtime, name => {
                const div = document.createElement("div");
                document.body.appendChild(div);
                return new Inspector(div);
            });
        }
        catch (e) {
            expect(false, e.message);
        }
    });
});
