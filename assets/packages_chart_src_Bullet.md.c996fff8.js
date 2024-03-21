import{_ as s,c as r,b as n,w as l,d as e,e as a,a as i,r as o,o as u}from"./app.70956d7b.js";const k='{"title":"Bullet","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Bullet.md"}',d={},c=e("h1",{id:"bullet",tabindex:"-1"},[a("Bullet "),e("a",{class:"header-anchor",href:"#bullet","aria-hidden":"true"},"#")],-1),h=e("p",null,"The Bullet chart displays a title and subtitle along with three types of values to the right. Each row's values are placed relative to the other values in that row. Their placement is unaffected by the values in other rows.",-1),p=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),m=e("p",null,'In this example "markers" have been added.',-1),_=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),v=e("p",null,'In this example "ranges" have been added.',-1),f=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),b=i('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Bullet"><pre><code></code></pre></div>',3);function g(C,x,S,w,B,y){const t=o("ClientOnly");return u(),r("div",null,[c,h,n(t,null,{default:l(()=>[p]),_:1}),m,n(t,null,{default:l(()=>[_]),_:1}),v,n(t,null,{default:l(()=>[f]),_:1}),b])}var $=s(d,[["render",g]]);export{k as __pageData,$ as default};
