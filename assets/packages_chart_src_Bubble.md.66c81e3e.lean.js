import{_ as i,c as s,b as t,d as l,e as r,w as a,a as o,r as d,o as p}from"./app.ab56574e.js";const B='{"title":"Bubble","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Bubble.md"}',u={};function c(h,e,b,g,m,v){const n=d("ClientOnly");return p(),s("div",null,[e[2]||(e[2]=t("h1",{id:"bubble",tabindex:"-1"},[l("Bubble "),t("a",{class:"header-anchor",href:"#bubble","aria-hidden":"true"},"#")],-1)),e[3]||(e[3]=t("p",null,"A bubble chart represents a categorical data by displaying circles sized relative to each category's value. The circles are sized automatically to fit their target element.",-1)),r(n,null,{default:a(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bubble } from "@hpcc-js/chart";

  new Bubble()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 144]
      ])
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[4]||(e[4]=t("p",null,[t("em",null,"paletteID"),l(" can be used to assign an ordinal color palette.")],-1)),e[5]||(e[5]=t("p",null,[t("em",null,"selectionGlowColor"),l(" can be used to change the glow color when a bubble is selected.")],-1)),r(n,null,{default:a(()=>e[1]||(e[1]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bubble } from "@hpcc-js/chart";

  new Bubble()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["A", 34],
          ["B", 55],
          ["C", 89],
          ["D", 1440]
      ])
      .paletteID("FlatUI_British")
      .selectionGlowColor("#00FF00")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[6]||(e[6]=o('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Bubble"><pre><code></code></pre></div>',3))])}var y=i(u,[["render",c]]);export{B as __pageData,y as default};
