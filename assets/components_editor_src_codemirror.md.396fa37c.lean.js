import{_ as a,c as n,b as t,d as o,e as i,w as d,a as l,r as s,o as c}from"./app.ab56574e.js";const v='{"title":"CodeMirror Editor","description":"","frontmatter":{},"headers":[{"level":2,"title":"Attributes","slug":"attributes"},{"level":3,"title":"mode","slug":"mode"},{"level":3,"title":"theme","slug":"theme"},{"level":2,"title":"Properties","slug":"properties"},{"level":3,"title":"text","slug":"text"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Credits","slug":"credits"},{"level":3,"title":"CodeMirror","slug":"codemirror"}],"relativePath":"components/editor/src/codemirror.md"}',h={};function p(u,e,m,g,b,f){const r=s("ClientOnly");return c(),n("div",null,[e[2]||(e[2]=t("h1",{id:"codemirror-editor",tabindex:"-1"},[o("CodeMirror Editor "),t("a",{class:"header-anchor",href:"#codemirror-editor","aria-hidden":"true"},"#")],-1)),e[3]||(e[3]=t("p",null,[t("strong",null,"tag"),o(": "),t("code",null,"<hpcc-codemirror>")],-1)),i(r,null,{default:d(()=>e[0]||(e[0]=[t("hpcc-vitepress",{preview_border:"0px",preview_height_ratio:"0.5",style:{width:"100%",height:"400px"}},[t("pre",null,[t("code",null,`<hpcc-codemirror mode="json" theme="dark" style="width:100%;height:100%">
</hpcc-codemirror>

<script type="module">
  import "@hpcc-js/wc-editor";

  document.querySelector('hpcc-codemirror').text = \`\\
  {
    "aaa":123, 
    "bbb":"ddd", 
    "c":3, 
    "d":true
  }\`;
<\/script>
`)])],-1)])),_:1}),e[4]||(e[4]=t("hr",null,null,-1)),i(r,null,{default:d(()=>e[1]||(e[1]=[t("hpcc-vitepress",{preview_border:"0px",preview_height_ratio:"0.5",style:{width:"100%",height:"400px"}},[t("pre",null,[t("code",null,`<hpcc-codemirror mode="json" theme="dark" style="width:100%;height:100%">
  {
    "aaa":123, 
    "bbb":"ddd", 
    "c":3, 
    "d":true
  }
 </hpcc-codemirror>
<script type="module">
  import "@hpcc-js/wc-editor";
  setTimeout(()=>{
    document.querySelector('hpcc-codemirror').text = "Hello and Welcome!";
  }, 3000);
<\/script>
`)])],-1)])),_:1}),e[5]||(e[5]=l('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>See <a href="./../../../README.html">Getting Started</a> for details on how to include @hpcc-js/codemirror in your application</p></div><h2 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-hidden="true">#</a></h2><h3 id="mode" tabindex="-1"><code>mode</code> <a class="header-anchor" href="#mode" aria-hidden="true">#</a></h3><p><i>Text to be displayed in the editor</i></p><p><strong>Type:</strong> <code>&quot;html&quot; | &quot;json&quot; | &quot;javascript&quot;</code></p><ul><li><p><code>html</code>: HTML document</p></li><li><p><code>JSON</code>: JSON document</p></li></ul><p><strong>Default Value:</strong> html</p><h3 id="theme" tabindex="-1"><code>theme</code> <a class="header-anchor" href="#theme" aria-hidden="true">#</a></h3><p><i>Text to be displayed in the editor</i></p><p><strong>Type:</strong> <code>&quot;light&quot; | &quot;dark&quot;</code></p><ul><li><p><code>light</code>: Light theme</p></li><li><p><code>dark</code>: Dark theme</p></li></ul><p><strong>Default Value:</strong> light</p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><h3 id="text" tabindex="-1"><code>text</code> <a class="header-anchor" href="#text" aria-hidden="true">#</a></h3><p><i>Text to be displayed in the editor</i></p><p><strong>Type:</strong> <code>string</code></p><p><strong>Default Value:</strong></p><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-hidden="true">#</a></h2><h3 id="codemirror" tabindex="-1">CodeMirror <a class="header-anchor" href="#codemirror" aria-hidden="true">#</a></h3><p><em>CodeMirror 6 is a rewrite of the CodeMirror code editor. It greatly improves the library&#39;s accessibility and touchscreen support, provides better content analysis and a modern programming interface. The new system matches the existing code in features and performance. It is not API-compatible with the old code.</em></p><ul><li><a href="https://codemirror.net/6/" target="_blank" rel="noopener noreferrer">Home Page</a></li><li><a href="https://github.com/codemirror/codemirror.next/" target="_blank" rel="noopener noreferrer">GitHub</a></li></ul>',22))])}var y=a(h,[["render",p]]);export{v as __pageData,y as default};
