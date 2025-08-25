import { NotebookRuntime, type DefineState, type Definition } from "@observablehq/notebook-kit/runtime";

import { kit, omd2notebookKit, ojs2notebookKit } from "../src/index.ts";

import "@observablehq/notebook-kit/index.css";
import "@observablehq/notebook-kit/theme-slate.css";

class NotebookRuntimeEx extends NotebookRuntime {

    stateById = new Map<number, DefineState>();

    constructor() {
        super();
    }

    add(cellId: number, definition: Definition, placeholderDiv: HTMLDivElement): void {
        let state = this.stateById.get(cellId);
        if (state) {
            state.variables.forEach((v) => v.delete());
            state.variables = [];
        } else {
            state = { root: placeholderDiv, expanded: [], variables: [] };
            this.stateById.set(cellId, state);
        }
        this.define(state, definition);
    }

    remove(cellId: number): void {
        const state = this.stateById.get(cellId);
        if (!state) return;
        state.root.remove();
        state.variables.forEach((v) => v.delete());
        this.stateById.delete(cellId);
    }

    removeAll(): void {
        const keys = Array.from(this.stateById.keys());
        for (const key of keys) {
            this.remove(key);
        }
    }
}

export function testHtml(target: string): void {

    const element = document.getElementById(target) as HTMLDivElement;
    if (!element) {
        throw new Error(`Element with id ${target} not found`);
    }
    const html = `\
<!doctype html>
<notebook>
  <title>Observable Notebooks 2.0 System guide</title>
  <script id="1" type="text/markdown">
    # Observable Notebooks 2.0 <span style="color: var(--theme-foreground-faint);">System guide</span>

    <link rel="stylesheet" href="./style.css">
  </script>
  <script id="38" type="text/markdown">
    Notebooks are interactive documents comprised of small programs called _cells_. Cells can be written in JavaScript, Markdown, HTML, and other languages. Most logic is coded in JavaScript, while prose is typically written in Markdown.
  </script>
  <script id="41" type="module" pinned="">
    const language = "JavaScript";

    display(\`This cell is \${language}.\`);
  </script>
  <script id="42" type="text/markdown" pinned="">
    This cell is _Markdown_.
  </script>
  <script id="43" type="text/html" pinned="">
    And this cell is <i>HTML</i>.
  </script>
  <script id="47" type="text/markdown">
    Notebooks are live: code runs when you load the notebook, showing the latest output. A saved notebook only stores cells' source code, not its output. (Though you can capture and store additional data in file attachments.)
  </script>
  <script id="48" type="text/markdown" pinned="">
    This cell ran at \`\${(new Date).toLocaleString("se")}\`.
  </script>
  <script id="39" type="text/markdown">
    <aside>Like hot module replacement, reactivity helps you develop faster because code re-runs automatically as you edit.</aside>

    Notebooks are reactive: cells run automatically like in a spreadsheet, re-running whenever referenced variables change. Reactivity makes it easier to implement interactive controls (or _inputs_), animations, and asynchronous operations such as loading data.
  </script>
  <script id="44" type="module" pinned="">
    const x = view(Inputs.range([0, 100], {label: "x", step: 1}));
    const y = 2;
  </script>
  <script id="46" type="module" pinned="">
    x ** y
  </script>
  <script id="50" type="text/markdown">
    Top-level variables defined in JavaScript cells, such as \`x\` and \`y\` above, can be referenced in other cells. For Markdown, HTML, and other non-JavaScript cells, use dollar-curly expressions <code>$\\\{…}</code> to interpolate dynamic values.
  </script>
  <script id="51" type="text/markdown" pinned="">
    The value of \${tex\`\${x}^\${y} = \${(x ** y).toLocaleString().replace(/,/g, "\\,")}\`}.
  </script>
  <script id="3" type="text/markdown">
    ---

    ## JavaScript

    Use JavaScript cells to render charts, inputs, and other dynamic content. JavaScript cells can also declare top-level variables, say to load data or declare helper functions.
  </script>
  <script id="8" type="text/markdown">
    JavaScript cells come in two forms: *expression* cells and *program* cells. An expression cell contains a single JavaScript expression (note the lack of semicolon) and implicitly displays its value:
  </script>
  <script id="6" type="module" pinned="">
    1 + 2
  </script>
  <script id="9" type="text/markdown">
    A program cell, in contrast, contains statements (typically with semicolons) and declarations, and doesn't display anything by default; however, you can call \`display\` to display something:
  </script>
  <script id="7" type="module" pinned="">
    const foo = 1 + 2;

    display(foo);
  </script>
  <script id="15" type="text/markdown">
    <aside>You can call <code>display</code> multiple times to display multiple things. When a cell re-runs, anything previously displayed will be cleared.</aside>

    When displaying --- either implicitly or explicitly --- if the displayed value is a DOM node, it will be inserted directly into the page. Anything else is displayed using the _inspector_, which is useful for debugging. You can use the [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) to create content, though we recommend a library such as [Hypertext Literal](https://github.com/observablehq/htl), [Observable Plot](https://observablehq.com/plot/), or [D3](https://d3js.org).
  </script>
  <script id="16" type="module" pinned="">
    function greeting(name) {
      return html\`Hello, <i>\${name}</i>!\`;
    }
  </script>
  <script id="17" type="module" pinned="">
    greeting("world")
  </script>
  <script id="19" type="module" pinned="">
    Plot.lineY(AMZN, {x: "Date", y: "Close"}).plot({y: {grid: true}})
  </script>
  <script id="56" type="text/markdown">
    When a top-level variable is defined as a promise, referencing cells will implicitly await the promise and only see the resolved value.
  </script>
  <script id="61" type="module" pinned="">
    const delayed = new Promise((resolve) => setTimeout(() => resolve("hello"), 10000));
  </script>
  <script id="62" type="module" pinned="">
    delayed
  </script>
  <script id="63" type="text/markdown">
    When a top-level variable is defined as a generator, referencing cells will see only the latest yield value and will re-run whenever the generator yields a new value. This is typically used for interaction, animation, and live data.
  </script>
  <script id="64" type="module" pinned="">
    const tick = (async function* () {
      do {
        yield new Date();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } while (true);
    })();
  </script>
  <script id="66" type="module" pinned="">
    tick
  </script>
  <script id="58" type="text/markdown">
    The built-in \`view\` function displays the given input and returns a generator that yields the current value of the input.
  </script>
  <script id="67" type="module" pinned="">
    const name = view(Inputs.text({label: "Name"}));
  </script>
  <script id="68" type="text/markdown" pinned="">
    Hello, \${name || "anonymous"}!
  </script>
  <script id="75" type="text/markdown">
    The built-in \`FileAttachment\` function references a local file. It is typically used to load data. For security purposes, you can only load local files that live in the same directory, or a subdirectory, of the current notebook.
  </script>
  <script id="76" type="module" pinned="">
    const AMZN = FileAttachment("./AMZN.csv").csv({typed: true});
  </script>
  <script id="77" type="module" pinned="">
    Inputs.table(AMZN)
  </script>
  <script id="78" type="text/markdown">
    To load live data, you can use \`fetch\`, \`WebSocket\`, and other standard web APIs.
  </script>
  <script id="82" type="module" pinned="">
    const world = fetch("https://cdn.jsdelivr.net/npm/world-atlas/land-110m.json")
      .then((response) => response.ok ? response.json() : Promise.reject(response.status))
      .then(display);
  </script>
  <script id="69" type="text/markdown">
    The notebook standard library includes a handful of additional built-ins:

    - \`display\` - a function to display a value
    - \`view\` - a function to display an input and return its value generator
    - \`invalidation\` - a promise for disposing resources when a cell is re-run
    - \`visibility\` - a promise to wait for a cell to become visible
    - \`width\` - the current page width
    - \`now\` - the current time
  </script>
  <script id="59" type="text/markdown">
    A handful of recommended libraries (and sample datasets) are also available by default, including:
    - \`Inputs\` - Observable Inputs
    - \`htl\`, \`html\`, \`svg\` - Observable Hypertext Literal
    - \`Plot\` - Observable Plot
    - \`d3\` - D3.js
    - \`tex\` - a tagged template literal for \${tex\`\KaTeX\`}
    - \`md\` - a tagged template literal for Markdown
    - \`penguins\` - the Palmer Archipelago penguins dataset
  </script>
  <script id="79" type="text/markdown">
    You can load additional libraries from npm using an \`npm:\` <code class="language-js">import</code>.
  </script>
  <script id="81" type="module" pinned="">
    import he from "npm:he";

    display(he.encode("foo © bar ≠ baz 𝌆 qux"));
  </script>
  <script id="71" type="text/markdown">
    ---

    ## Markdown

    <aside>Markdown and HTML cells are rendered statically, offering better page load performance than JavaScript cells.</aside>

    Markdown cells are typically used for prose, images, and other static content. Markdown is [CommonMark](https://commonmark.org/)-compliant, supports HTML in Markdown, automatic linkification, automatic typographic enhancements such as curly quotes and dashes, and automatic linking of headings.
  </script>
  <script id="83" type="text/markdown">
    Use dollar-curly <code>$\\\{…}</code> expressions to interpolate dynamic JavaScript values into Markdown, including text, DOM nodes, and bits of dynamic Markdown.
  </script>
  <script id="84" type="text/markdown" pinned="">
    Hello, \${atob("d29ybGQ=")}!
  </script>
  <script id="5" type="text/markdown">
    ---

    ## HTML

    HTML cells are used similarly to Markdown cells, and also support dollar-curly <code>$\\\{…}</code> interpolation. Unlike Markdown cells, HTML cells automatically escape any interpolated values, providing additional safety when handling dynamic and user-specified content.
  </script>
  <script id="73" type="text/html" pinned="">
    Interpolated values are considered text, \${"not <i>HTML</i>"}.
  </script>
</notebook>
  `;
    const runtime = new NotebookRuntimeEx();
    const notebook = kit.html2notebook(html);
    const compiled = kit.compile(notebook);
    compiled.forEach((cell, cellId) => {
        let container = element.querySelector(`#${target}-${cellId}`) as HTMLDivElement;
        if (!container) {
            container = document.createElement("div");
            container.className = "observable-kit-cell-output";
            container.id = `${target}-${cellId}`;
            element.appendChild(container);
        }

        runtime.add(cellId, cell, container);
    });
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

    const runtime = new NotebookRuntimeEx();
    const notebook = omd2notebookKit(omd2);
    const compiled = kit.compile(notebook);
    compiled.forEach((cell, cellId) => {
        let container = element.querySelector(`#${target}-${cellId}`) as HTMLDivElement;
        if (!container) {
            container = document.createElement("div");
            container.className = "observable-kit-cell-output";
            container.id = `${target}-${cellId}`;
            element.appendChild(container);
        }
        runtime.add(cellId, cell, container);
    });
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

    const runtime = new NotebookRuntimeEx();
    const notebook = ojs2notebookKit(ojs);
    const compiled = kit.compile(notebook);
    compiled.forEach((cell, cellId) => {
        let container = element.querySelector(`#${target}-${cellId}`) as HTMLDivElement;
        if (!container) {
            container = document.createElement("div");
            container.className = "observable-kit-cell-output";
            container.id = `${target}-${cellId}`;
            element.appendChild(container);
        }
        runtime.add(cellId, cell, container);
    });
}