import{_ as s,c as i,a as n,e as r,w as l,r as a,o as p,b as o}from"./app.ab56574e.js";const f='{"title":"Utilities","description":"","frontmatter":{},"headers":[],"relativePath":"packages/observablehq-compiler/src/util.md"}',c={};function d(m,e,h,b,u,k){const t=a("ClientOnly");return p(),i("div",null,[e[3]||(e[3]=n('<h1 id="utilities" tabindex="-1">Utilities <a class="header-anchor" href="#utilities" aria-hidden="true">#</a></h1><p>Various utilities and helpers.</p><hr><p><a name="download" href="#download">#</a> <strong>download</strong>(<em>impUrl</em>) =&gt; Promise&lt;ohq.Module&gt; \xB7 <a href="https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts" title="Source" target="_blank" rel="noopener noreferrer">&lt;&gt;</a></p><ul><li><em>impUrl</em>: Full url to Obaservable HQ notebook as a string.</li><li><em>returns</em>: Returns a Promise of a notebook (a JSON object).</li></ul><p>Downloads a notebook directly from <a href="https://observablehq.com/" target="_blank" rel="noopener noreferrer">Observable HQ</a> as a JSON object. The following example downloads the <a href="https://observablehq.com/@observablehq/plot" target="_blank" rel="noopener noreferrer">@observablehq/plot</a> notebook as JSON:</p>',6)),r(t,null,{default:l(()=>e[0]||(e[0]=[o("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[o("pre",null,[o("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  import { download } from "@hpcc-js/observablehq-compiler";

  const notebook = await download("https://observablehq.com/@observablehq/plot");
  const placeholder = document.getElementById("placeholder");
  placeholder.text = JSON.stringify(notebook, undefined, 4);
<\/script>
`)])],-1)])),_:1}),e[4]||(e[4]=n('<hr><p><a name="ojs2notebook" href="#ojs2notebook">#</a> <strong>ojs2notebook</strong>(<em>ojs</em>) =&gt; ohq.Module \xB7 <a href="https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts" title="Source" target="_blank" rel="noopener noreferrer">&lt;&gt;</a></p><ul><li><em>ojs</em>: String containing Observable JavaScript.</li><li><em>returns</em>: Returns the notebook as a JSON object.</li></ul><p>Transforms Observable JavaScript to a JSON notebook.</p>',4)),r(t,null,{default:l(()=>e[1]||(e[1]=[o("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[o("pre",null,[o("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  import { ojs2notebook } from "@hpcc-js/observablehq-compiler";

  const notebook = ojs2notebook(\`
    md\\\`# Simple Notebook\\\`
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
  \`);
  const placeholder = document.getElementById("placeholder");
  placeholder.text = JSON.stringify(notebook, undefined, 4);
<\/script>
`)])],-1)])),_:1}),e[5]||(e[5]=n('<p><a name="omd2notebook" href="#omd2notebook">#</a> <strong>omd2notebook</strong>(<em>omd</em>) =&gt; ohq.Module \xB7 <a href="https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts" title="Source" target="_blank" rel="noopener noreferrer">&lt;&gt;</a></p><ul><li><em>omd</em>: String containing Observable Markdown.</li><li><em>returns</em>: Returns the notebook as a JSON object.</li></ul><p>Transforms Observable Markdown to a JSON notebook.</p>',3)),r(t,null,{default:l(()=>e[2]||(e[2]=[o("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[o("pre",null,[o("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  import { omd2notebook } from "@hpcc-js/observablehq-compiler";

  const notebook = omd2notebook(\`\\
    # Simple Notebook

    * Set A
    \\\`\\\`\\\`
    a = 1
    \\\`\\\`\\\`

    * Set B
    \\\`\\\`\\\`
    b = 2
    \\\`\\\`\\\`

    * Calculate c

    \\\`\\\`\\\`
    c = a + b
    \\\`\\\`\\\`
  \`);
  const placeholder = document.getElementById("placeholder");
  placeholder.text = JSON.stringify(notebook, undefined, 4);
<\/script>
`)])],-1)])),_:1})])}var v=s(c,[["render",d]]);export{f as __pageData,v as default};
