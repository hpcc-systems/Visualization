# Compiler

Observable HQ Notebook Compiler and Interpreter

##  Minimal JSON Notebook

While the compiler supports and persists the entire Observable HQ Notebook (v3), it only needs a minimal subset to actually function:

```ts
interface Notebook {
    files: File[];
    nodes: Node[];
}

interface Node {
    id: number | string;
    mode: "js" | "md";
    value: string;
}

interface File {
    name: string;
    url: string;
    mime_type?: string;
}
```  

---

<a name="compile" href="#compile">#</a> **compile**(_notebook_) => Promise\<function\> · [<>](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/compiler.ts "Source")

* _notebook_:  JSON Notebook, see [utilities](./util) for examples on how to fetch or create a notebook.
* _returns_: Returns a Promise to a "define" function that is compatible with the ["@observablehq/runtime"](https://github.com/observablehq/runtime) and ["@observablehq/inspector"](https://github.com/observablehq/inspector)

## Hello World Example

First take a simple hello world notebook 

```js
const notebook = {
    files: [],
    nodes: [
        {
            id: 1,
            value: "md`# ${h} ${w}`",
            mode: "js"
        },
        {
            id: 1,
            value: "h = \"Hello\"",
            mode: "js"
        },
        {
            id: 2,
            value: "w = \"World\"",
            mode: "js"
        }
    ]
}
```

Then import the compiler and invoke it:

```js
import { compile } from "@hpcc-js/observablehq-compiler";

const compiledNotebook = await compile(notebook);
```

To render it to a web page, simply follow the same steps as if you had downloaded a compiled version from ObservableHQ site:

```js

import { Library, Runtime, Inspector } from "https://cdn.skypack.dev/@observablehq/runtime";

const placeholder = document.getElementById("placeholder");

const library = new Library();
const runtime = new Runtime(library);

compiledNotebook(runtime, name => {
    const div = document.createElement("div");
    placeholder.appendChild(div);
    return new Inspector(div);
});

```

Putting it all together:

<ClientOnly>
  <hpcc-vitepress preview_height_ratio=0.4 style="width:100%;height:400px">
    <div id="placeholder" style="height:100%;overflow-y:scroll">
    </div>
    <script type="module">
      import { Library, Runtime, Inspector } from "https://cdn.skypack.dev/@observablehq/runtime";
      import { compile } from "@hpcc-js/observablehq-compiler";

      const placeholder = document.getElementById("placeholder");

      const notebook = {
          files: [],
          nodes: [
              {
                  id: 1,
                  value: "md`# ${h} ${w}`",
                  mode: "js"
              },
              {
                  id: 1,
                  value: "h = \"Hello\"",
                  mode: "js"
              },
              {
                  id: 2,
                  value: "w = \"World\"",
                  mode: "js"
              }
          ]
      }

      const compiledNotebook = await compile(notebook);

      const library = new Library();
      const runtime = new Runtime(library);
      compiledNotebook(runtime, name => {
          const div = document.createElement("div");
          placeholder.appendChild(div);
          return new Inspector(div);
      });
    </script>
  </hpcc-vitepress>
</ClientOnly>

---

To output the generated code simply call `toString` on the compiled function:

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <hpcc-codemirror id="placeholder" mode="javascript" theme="dark" style="width:100%;height:100%">
    </hpcc-codemirror>
    <script type="module">
      import "@hpcc-js/wc-editor";
      import { compile } from "@hpcc-js/observablehq-compiler";

      const notebook = {
          files: [],
          nodes: [
              {
                  id: 1,
                  value: "md`# ${h} ${w}`",
                  mode: "js"
              },
              {
                  id: 1,
                  value: "h = \"Hello\"",
                  mode: "js"
              },
              {
                  id: 2,
                  value: "w = \"World\"",
                  mode: "js"
              }
          ]
      }

      const compiledNotebook = await compile(notebook);
      const placeholder = document.getElementById("placeholder");
      placeholder.text = compiledNotebook.toString();
    </script>
  </hpcc-vitepress>
</ClientOnly>

---

## MoreExamples

* [@observablehq/plot](https://observablehq.com/@observablehq/plot)

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px;overflow-y:scroll">
    </div>
    <script type="module">
      import { Library, Runtime, Inspector } from "https://cdn.skypack.dev/@observablehq/runtime";
      import { download, compile } from "@hpcc-js/observablehq-compiler";

      const notebookUrl = "https://observablehq.com/@observablehq/plot";
      const placeholder = document.getElementById("placeholder");

      const notebook = await download(notebookUrl);
      const compiledNB = await compile(notebook);

      const library = new Library();
      const runtime = new Runtime(library);
      compiledNB(runtime, name => {
          const div = document.createElement("div");
          placeholder.appendChild(div);
          return new Inspector(div);
      });
    </script>
  </hpcc-vitepress>
</ClientOnly>

---

* [@mbostock/fullscreen-canvas](https://observablehq.com/@mbostock/fullscreen-canvas)

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px;overflow-y:scroll">
    </div>
    <script type="module">
      import { Library, Runtime, Inspector } from "https://cdn.skypack.dev/@observablehq/runtime";
      import { download, compile } from "@hpcc-js/observablehq-compiler";

      const notebookUrl = "https://observablehq.com/@mbostock/fullscreen-canvas";
      const placeholder = document.getElementById("placeholder");

      const notebook = await download(notebookUrl);
      const compiledNB = await compile(notebook);

      const library = new Library();
      const runtime = new Runtime(library);
      compiledNB(runtime, name => {
          const div = document.createElement("div");
          placeholder.appendChild(div);
          return new Inspector(div);
      });
    </script>
  </hpcc-vitepress>
</ClientOnly>

