import { omd2notebookKit, ojs2notebookKit, compileKit, html2notebook } from "../src/index.ts";
import { NotebookRuntime } from "../src/kit/runtime.ts";

// import "@observablehq/notebook-kit/theme-air.css";
// import "@observablehq/notebook-kit/theme-coffee.css";
// import "@observablehq/notebook-kit/theme-cotton.css";
// import "@observablehq/notebook-kit/theme-deep-space.css";
// import "@observablehq/notebook-kit/theme-glacier.css";
// import "@observablehq/notebook-kit/theme-ink.css";
// import "@observablehq/notebook-kit/theme-midnight.css";
// import "@observablehq/notebook-kit/theme-near-midnight.css";
// import "@observablehq/notebook-kit/theme-ocean-floor.css";
// import "@observablehq/notebook-kit/theme-parchment.css";
// import "@observablehq/notebook-kit/theme-slate.css";
// import "@observablehq/notebook-kit/theme-stark.css";
// import "@observablehq/notebook-kit/theme-sun-faded.css";

// import "@hpcc-js/common/font-awesome/css/font-awesome.min.css";

export async function testHtml(target: string): Promise<void> {

  const element = document.getElementById(target) as HTMLDivElement;
  if (!element) {
    throw new Error(`Element with id ${target} not found`);
  }

  // const html = await fetch("../tests/albers-usa-projection.txt");
  const html = await fetch("../tests/system-guide.txt")
    .then((response) => {
      return response.text();
    });
  const notebook = html2notebook(html);
  const definitions = compileKit(notebook);
  const runtime = new NotebookRuntime();
  runtime.render(definitions, element);
}

export function testOmd(target: string): void {
  const element = document.getElementById(target) as HTMLDivElement;
  if (!element) {
    throw new Error(`Element with id ${target} not found`);
  }
  const omd2 = `\

## Imports (dot)

\`\`\`
dot\`digraph { x -> y -> z; }\`;
\`\`\`

\`\`\`
import { dot } from "@gordonsmith/graphviz";
\`\`\`

# Five-Minute Introduction

\`\`\`ecl
r := RECORD
    STRING20 Subject;
    INTEGER4 Result;
END;

d := DATASET([
    {'English', 92}, 
    {'French', 86}, 
    {'Irish', 80}, 
    {'Math', 98}, 
    {'Geography', 55}, 
    {'Computers', 25}], r);
OUTPUT(d, {Label := Subject, Value := Result}, NAMED('BarChartData'));
\`\`\`

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

Cells can have names. This allows a cell's value to be referenced by other cells.

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

`; const omd = `\
# Five-Minute Introduction

\`\`\`ecl
r := RECORD
    STRING20 Subject;
    INTEGER4 Result;
END;

d := DATASET([
    {'English', 92}, 
    {'French', 86}, 
    {'Irish', 80}, 
    {'Math', 98}, 
    {'Geography', 55}, 
    {'Computers', 25}], r);
OUTPUT(d, {Label := Subject, Value := Result}, NAMED('BarChartData'));
\`\`\`

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

`;

  const notebook = omd2notebookKit(omd2);
  const definitions = compileKit(notebook);
  const runtime = new NotebookRuntime();
  runtime.render(definitions, element);
}

export function testOjs(target: string): void {
  const element = document.getElementById(target) as HTMLDivElement;
  if (!element) {
    throw new Error(`Element with id ${target} not found`);
  }
  const ojs = `\
2 * 3 * 7
{
    let sum = 0;
    for (let i = 0; i <= 100; ++i) {
        sum += i;
    }
    return sum;
}

md \`# lib.ojs\`;

mo = 38 + 40;
`;

  const notebook = ojs2notebookKit(ojs);
  const definitions = compileKit(notebook);
  const runtime = new NotebookRuntime();
  runtime.render(definitions, element);
}