import{_ as l,c as s,b as t,w as n,a as r,r as a,o as i,d as e}from"./app.70956d7b.js";const T='{"title":"Utilities","description":"","frontmatter":{},"headers":[],"relativePath":"packages/observablehq-compiler/src/util.md"}',c={},p=r("",6),d=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  import { download } from "@hpcc-js/observablehq-compiler";

  const notebook = await download("https://observablehq.com/@observablehq/plot");
  const placeholder = document.getElementById("placeholder");
  placeholder.text = JSON.stringify(notebook, undefined, 4);
<\/script>
`)])],-1),h=r("",4),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
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
`)])],-1),b=r("",3),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<hpcc-codemirror id="placeholder" mode="json" theme="dark" style="width:100%;height:100%">
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
