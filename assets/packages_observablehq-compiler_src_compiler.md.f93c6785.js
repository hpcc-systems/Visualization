import{_ as p,c as l,a as r,e,w as o,b as n,d as t,r as c,o as i}from"./app.ab56574e.js";const w='{"title":"Compiler","description":"","frontmatter":{},"headers":[{"level":2,"title":"Minimal JSON Notebook","slug":"minimal-json-notebook"},{"level":2,"title":"Hello World Example","slug":"hello-world-example"},{"level":2,"title":"MoreExamples","slug":"moreexamples"}],"relativePath":"packages/observablehq-compiler/src/compiler.md"}',u={};function k(d,s,m,h,b,v){const a=c("ClientOnly");return i(),l("div",null,[s[4]||(s[4]=r(`<h1 id="compiler" tabindex="-1">Compiler <a class="header-anchor" href="#compiler" aria-hidden="true">#</a></h1><p>Observable HQ Notebook Compiler and Interpreter</p><h2 id="minimal-json-notebook" tabindex="-1">Minimal JSON Notebook <a class="header-anchor" href="#minimal-json-notebook" aria-hidden="true">#</a></h2><p>While the compiler supports and persists the entire Observable HQ Notebook (v3), it only needs a minimal subset to actually function:</p><div class="language-ts"><pre><code><span class="token keyword">interface</span> <span class="token class-name">Notebook</span> <span class="token punctuation">{</span>
    files<span class="token operator">:</span> File<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    nodes<span class="token operator">:</span> Node<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    mode<span class="token operator">:</span> <span class="token string">&quot;js&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;md&quot;</span><span class="token punctuation">;</span>
    value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">File</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    mime_type<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p><a name="compile" href="#compile">#</a> <strong>compile</strong>(<em>notebook</em>) =&gt; Promise&lt;function&gt; \xB7 <a href="https://github.com/hpcc-systems/Visualization/blob/trunk/packages/observablehq/compiler/src/compiler.ts" title="Source" target="_blank" rel="noopener noreferrer">&lt;&gt;</a></p><ul><li><em>notebook</em>: JSON Notebook, see <a href="./util.html">utilities</a> for examples on how to fetch or create a notebook.</li><li><em>returns</em>: Returns a Promise to a &quot;define&quot; function that is compatible with the <a href="https://github.com/observablehq/runtime" target="_blank" rel="noopener noreferrer">&quot;@observablehq/runtime&quot;</a> and <a href="https://github.com/observablehq/inspector" target="_blank" rel="noopener noreferrer">&quot;@observablehq/inspector&quot;</a></li></ul><h2 id="hello-world-example" tabindex="-1">Hello World Example <a class="header-anchor" href="#hello-world-example" aria-hidden="true">#</a></h2><p>First take a simple hello world notebook</p><div class="language-js"><pre><code><span class="token keyword">const</span> notebook <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nodes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;md\`# \${h} \${w}\`&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;js&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;h = \\&quot;Hello\\&quot;&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;js&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;w = \\&quot;World\\&quot;&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;js&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Then import the compiler and invoke it:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> compile <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@hpcc-js/observablehq-compiler&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> compiledNotebook <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">compile</span><span class="token punctuation">(</span>notebook<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>To render it to a web page, simply follow the same steps as if you had downloaded a compiled version from ObservableHQ site:</p><div class="language-js"><pre><code>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Library<span class="token punctuation">,</span> Runtime<span class="token punctuation">,</span> Inspector <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;https://cdn.skypack.dev/@observablehq/runtime&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> placeholder <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;placeholder&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> library <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Library</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> runtime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runtime</span><span class="token punctuation">(</span>library<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">compiledNotebook</span><span class="token punctuation">(</span>runtime<span class="token punctuation">,</span> <span class="token parameter">name</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;div&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    placeholder<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>div<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Inspector</span><span class="token punctuation">(</span>div<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre></div><p>Putting it all together:</p>`,16)),e(a,null,{default:o(()=>s[0]||(s[0]=[n("hpcc-vitepress",{preview_height_ratio:"0.4",style:{width:"100%",height:"400px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:100%;overflow-y:scroll">
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
              value: "md\`# \${h} \${w}\`",
              mode: "js"
          },
          {
              id: 2,
              value: "h = \\"Hello\\"",
              mode: "js"
          },
          {
              id: 3,
              value: "w = \\"World\\"",
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
<\/script>
`)])],-1)])),_:1}),s[5]||(s[5]=n("hr",null,null,-1)),s[6]||(s[6]=n("p",null,[t("To output the generated code simply call "),n("code",null,"toString"),t(" on the compiled function:")],-1)),e(a,null,{default:o(()=>s[1]||(s[1]=[n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<hpcc-codemirror id="placeholder" mode="javascript" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  import { compile } from "@hpcc-js/observablehq-compiler";

  const notebook = {
      files: [],
      nodes: [
          {
              id: 1,
              value: "md\`# \${h} \${w}\`",
              mode: "js"
          },
          {
              id: 2,
              value: "h = \\"Hello\\"",
              mode: "js"
          },
          {
              id: 3,
              value: "w = \\"World\\"",
              mode: "js"
          }
      ]
  }

  const compiledNotebook = await compile(notebook);
  const placeholder = document.getElementById("placeholder");
  placeholder.text = compiledNotebook.toString();
<\/script>
`)])],-1)])),_:1}),s[7]||(s[7]=n("hr",null,null,-1)),s[8]||(s[8]=n("h2",{id:"moreexamples",tabindex:"-1"},[t("MoreExamples "),n("a",{class:"header-anchor",href:"#moreexamples","aria-hidden":"true"},"#")],-1)),s[9]||(s[9]=n("ul",null,[n("li",null,[n("a",{href:"https://observablehq.com/@observablehq/plot",target:"_blank",rel:"noopener noreferrer"},"@observablehq/plot")])],-1)),e(a,null,{default:o(()=>s[2]||(s[2]=[n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:400px;overflow-y:scroll">
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
<\/script>
`)])],-1)])),_:1}),s[10]||(s[10]=n("hr",null,null,-1)),s[11]||(s[11]=n("ul",null,[n("li",null,[n("a",{href:"https://observablehq.com/@mbostock/fullscreen-canvas",target:"_blank",rel:"noopener noreferrer"},"@mbostock/fullscreen-canvas")])],-1)),e(a,null,{default:o(()=>s[3]||(s[3]=[n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:400px;overflow-y:scroll">
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
<\/script>
`)])],-1)])),_:1})])}var g=p(u,[["render",k]]);export{w as __pageData,g as default};
