import{_ as l,c as s,b as t,w as n,a as r,r as a,o as i,d as e}from"./app.70956d7b.js";const T='{"title":"Utilities","description":"","frontmatter":{},"headers":[],"relativePath":"packages/observablehq-compiler/src/util.md"}',c={},p=r('<h1 id="utilities" tabindex="-1">Utilities <a class="header-anchor" href="#utilities" aria-hidden="true">#</a></h1><p>Various utilities and helpers.</p><hr><p><a name="download" href="#download">#</a> <strong>download</strong>(<em>impUrl</em>) =&gt; Promise&lt;ohq.Module&gt; \xB7 <a href="https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts" title="Source" target="_blank" rel="noopener noreferrer">&lt;&gt;</a></p><ul><li><em>impUrl</em>: Full url to Obaservable HQ notebook as a string.</li><li><em>returns</em>: Returns a Promise of a notebook (a JSON object).</li></ul><p>Downloads a notebook directly from <a href="https://observablehq.com/" target="_blank" rel="noopener noreferrer">Observable HQ</a> as a JSON object. The following example downloads the <a href="https://observablehq.com/@observablehq/plot" target="_blank" rel="noopener noreferrer">@observablehq/plot</a> notebook as JSON:</p>',6),d=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  import { download } from "@hpcc-js/observablehq-compiler";

  const notebook = await download("https://observablehq.com/@observablehq/plot");
  const placeholder = document.getElementById("placeholder");
  placeholder.text = JSON.stringify(notebook, undefined, 4);
<\/script>
`)])],-1),h=r('<hr><p><a name="ojs2notebook" href="#ojs2notebook">#</a> <strong>ojs2notebook</strong>(<em>ojs</em>) =&gt; ohq.Module \xB7 <a href="https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts" title="Source" target="_blank" rel="noopener noreferrer">&lt;&gt;</a></p><ul><li><em>ojs</em>: String containing Observable JavaScript.</li><li><em>returns</em>: Returns the notebook as a JSON object.</li></ul><p>Transforms Observable JavaScript to a JSON notebook.</p>',4),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
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
`)])],-1),b=r('<p><a name="omd2notebook" href="#omd2notebook">#</a> <strong>omd2notebook</strong>(<em>omd</em>) =&gt; ohq.Module \xB7 <a href="https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/util.ts" title="Source" target="_blank" rel="noopener noreferrer">&lt;&gt;</a></p><ul><li><em>omd</em>: String containing Observable Markdown.</li><li><em>returns</em>: Returns the notebook as a JSON object.</li></ul><p>Transforms Observable Markdown to a JSON notebook.</p>',3),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
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
`)])],-1);function _(k,g,f,v,S,y){const o=a("ClientOnly");return i(),s("div",null,[p,t(o,null,{default:n(()=>[d]),_:1}),h,t(o,null,{default:n(()=>[m]),_:1}),b,t(o,null,{default:n(()=>[u]),_:1})])}var j=l(c,[["render",_]]);export{T as __pageData,j as default};
