import{_ as s,c as a,b as t,d as i,e as l,w as r,a as u,r as o,o as d}from"./app.ab56574e.js";const C='{"title":"Bullet","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Bullet.md"}',p={};function h(m,e,c,v,f,b){const n=o("ClientOnly");return d(),a("div",null,[e[3]||(e[3]=t("h1",{id:"bullet",tabindex:"-1"},[i("Bullet "),t("a",{class:"header-anchor",href:"#bullet","aria-hidden":"true"},"#")],-1)),e[4]||(e[4]=t("p",null,"The Bullet chart displays a title and subtitle along with three types of values to the right. Each row's values are placed relative to the other values in that row. Their placement is unaffected by the values in other rows.",-1)),l(n,null,{default:r(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bullet } from "@hpcc-js/chart";

  new Bullet()
      .target("placeholder")
      .columns(["title", "subtitle", "measures"])
      .data([
          ["Revenue", "US$, in thousands", [220, 270, 345]],
          ["Profit  ", "%", [21, 23]],
          ["Order Size", "US$, average", [100, 320, 432]],
          ["New Customers", "count", [1000, 1650, 1943]],
          ["Satisfaction", "out of 5", [3.2, 4.7, 4.9]]
      ])
      .titleColumn("title")
      .subtitleColumn("subtitle")
      .measuresColumn("measures")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[5]||(e[5]=t("p",null,'In this example "markers" have been added.',-1)),l(n,null,{default:r(()=>e[1]||(e[1]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bullet } from "@hpcc-js/chart";

  new Bullet()
      .target("placeholder")
      .columns(["title", "subtitle", "measures", "markers"])
      .data([
          ["Revenue", "US$, in thousands", [220, 270], [250, 25]],
          ["Profit  ", "%", [21, 23], [26]],
          ["Order Size", "US$, average", [100, 320], [150, 550]],
          ["New Customers", "count", [1000, 1650], [190, 540, 750, 850, 2100]],
          ["Satisfaction", "out of 5", [3.2, 4.7], [4.4]]
      ])
      .titleColumn("title")
      .subtitleColumn("subtitle")
      .measuresColumn("measures")
      .markersColumn("markers")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[6]||(e[6]=t("p",null,'In this example "ranges" have been added.',-1)),l(n,null,{default:r(()=>e[2]||(e[2]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Bullet } from "@hpcc-js/chart";

  new Bullet()
      .target("placeholder")
      .columns(["title", "subtitle", "ranges", "measures", "markers"])
      .data([
          ["Revenue", "US$, in thousands", [150, 225, 300], [220, 270], [250, 25]],
          ["Profit  ", "%", [20, 25, 30], [21, 23], [26]],
          ["Order Size", "US$, average", [350, 500, 600], [100, 320], [550]],
          ["New Customers", "count", [1400, 2000, 2500], [1000, 1650], 2100],
          ["Satisfaction", "out of 5", [3.5, 4.25, 5], [3.2, 4.7], [4.4]]
      ])
      .titleColumn("title")
      .subtitleColumn("subtitle")
      .rangesColumn("ranges")
      .measuresColumn("measures")
      .markersColumn("markers")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),e[7]||(e[7]=u('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Bullet"><pre><code></code></pre></div>',3))])}var x=s(p,[["render",h]]);export{C as __pageData,x as default};
