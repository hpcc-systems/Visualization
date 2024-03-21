import{_ as t,c as p,b as a,w as e,a as l,d as n,e as o,r as c,o as r}from"./app.70956d7b.js";const R='{"title":"Compiler","description":"","frontmatter":{},"headers":[{"level":2,"title":"Minimal JSON Notebook","slug":"minimal-json-notebook"},{"level":2,"title":"Hello World Example","slug":"hello-world-example"},{"level":2,"title":"MoreExamples","slug":"moreexamples"}],"relativePath":"packages/observablehq-compiler/src/compiler.md"}',i={},u=l("",16),d=n("hpcc-vitepress",{preview_height_ratio:"0.4",style:{width:"100%",height:"400px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:100%;overflow-y:scroll">
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
`)])],-1),k=n("hr",null,null,-1),m=n("p",null,[o("To output the generated code simply call "),n("code",null,"toString"),o(" on the compiled function:")],-1),h=n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<hpcc-codemirror id="placeholder" mode="javascript" theme="dark" style="width:100%;height:100%">
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
`)])],-1),b=n("hr",null,null,-1),v=n("h2",{id:"moreexamples",tabindex:"-1"},[o("MoreExamples "),n("a",{class:"header-anchor",href:"#moreexamples","aria-hidden":"true"},"#")],-1),y=n("ul",null,[n("li",null,[n("a",{href:"https://observablehq.com/@observablehq/plot",target:"_blank",rel:"noopener noreferrer"},"@observablehq/plot")])],-1),w=n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:400px;overflow-y:scroll">
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
`)])],-1),g=n("hr",null,null,-1),f=n("ul",null,[n("li",null,[n("a",{href:"https://observablehq.com/@mbostock/fullscreen-canvas",target:"_blank",rel:"noopener noreferrer"},"@mbostock/fullscreen-canvas")])],-1),_=n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:400px;overflow-y:scroll">
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
`)])],-1);function q(x,N,j,I,E,C){const s=c("ClientOnly");return r(),p("div",null,[u,a(s,null,{default:e(()=>[d]),_:1}),k,m,a(s,null,{default:e(()=>[h]),_:1}),b,v,y,a(s,null,{default:e(()=>[w]),_:1}),g,f,a(s,null,{default:e(()=>[_]),_:1})])}var S=t(i,[["render",q]]);export{R as __pageData,S as default};
