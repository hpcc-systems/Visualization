# Utilities

Various utilities and helpers.

---

<a name="download" href="#download">#</a> **download**(_impUrl_) => Promise\<ohq.Module\> · [<>](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts "Source")

* _impUrl_:  Full url to Obaservable HQ notebook as a string.
* _returns_: Returns a Promise of a notebook (a JSON object).

Downloads a notebook directly from [Observable HQ](https://observablehq.com/) as a JSON object.  The following example downloads the [@observablehq/plot](https://observablehq.com/@observablehq/plot) notebook as JSON:

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
    </hpcc-codemirror>
    <script type="module">
      import "@hpcc-js/wc-editor";
      import { download } from "@hpcc-js/observablehq-compiler";

      const notebook = await download("https://observablehq.com/@observablehq/plot");
      const placeholder = document.getElementById("placeholder");
      placeholder.text = JSON.stringify(notebook, undefined, 4);
    </script>
  </hpcc-vitepress>
</ClientOnly>

---

<a name="ojs2notebook" href="#ojs2notebook">#</a> **ojs2notebook**(_ojs_) => ohq.Module · [<>](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts "Source")

* _ojs_:  String containing Observable JavaScript.
* _returns_: Returns the notebook as a JSON object.

Transforms Observable JavaScript to a JSON notebook.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
    </hpcc-codemirror>
    <script type="module">
      import "@hpcc-js/wc-editor";
      import { ojs2notebook } from "@hpcc-js/observablehq-compiler";

      const notebook = ojs2notebook(`
        md\`# Simple Notebook\`
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
      `);
      const placeholder = document.getElementById("placeholder");
      placeholder.text = JSON.stringify(notebook, undefined, 4);
    </script>
  </hpcc-vitepress>
</ClientOnly>

<a name="omd2notebook" href="#omd2notebook">#</a> **omd2notebook**(_omd_) => ohq.Module · [<>](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts "Source")

* _omd_:  String containing Observable Markdown.
* _returns_: Returns the notebook as a JSON object.

Transforms Observable Markdown to a JSON notebook.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
    </hpcc-codemirror>
    <script type="module">
      import "@hpcc-js/wc-editor";
      import { omd2notebook } from "@hpcc-js/observablehq-compiler";

      const notebook = omd2notebook(`\
        # Simple Notebook

        * Set A
        \`\`\`
        a = 1
        \`\`\`

        * Set B
        \`\`\`
        b = 2
        \`\`\`

        * Calculate c

        \`\`\`
        c = a + b
        \`\`\`
      `);
      const placeholder = document.getElementById("placeholder");
      placeholder.text = JSON.stringify(notebook, undefined, 4);
    </script>
  </hpcc-vitepress>
</ClientOnly>

