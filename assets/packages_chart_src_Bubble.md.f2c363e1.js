import{_ as r,c as s,b as a,w as n,d as e,e as t,a as i,r as o,o as c}from"./app.70956d7b.js";const A='{"title":"Bubble","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Bubble.md"}',d={},h=e("h1",{id:"bubble",tabindex:"-1"},[t("Bubble "),e("a",{class:"header-anchor",href:"#bubble","aria-hidden":"true"},"#")],-1),p=e("p",null,"A bubble chart represents a categorical data by displaying circles sized relative to each category's value. The circles are sized automatically to fit their target element.",-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),b=e("p",null,[e("em",null,"paletteID"),t(" can be used to assign an ordinal color palette.")],-1),_=e("p",null,[e("em",null,"selectionGlowColor"),t(" can be used to change the glow color when a bubble is selected.")],-1),g=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),m=i('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Bubble"><pre><code></code></pre></div>',3);function v(f,B,y,x,C,w){const l=o("ClientOnly");return c(),s("div",null,[h,p,a(l,null,{default:n(()=>[u]),_:1}),b,_,a(l,null,{default:n(()=>[g]),_:1}),m])}var T=r(d,[["render",v]]);export{A as __pageData,T as default};
