import{_ as i,c as d,b as e,d as a,e as l,w as r,a as o,r as s,o as p}from"./app.ab56574e.js";const y='{"title":"Radar","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Radar.md"}',u={};function c(h,n,m,f,b,g){const t=s("ClientOnly");return p(),d("div",null,[n[3]||(n[3]=e("h1",{id:"radar",tabindex:"-1"},[a("Radar "),e("a",{class:"header-anchor",href:"#radar","aria-hidden":"true"},"#")],-1)),n[4]||(n[4]=e("p",null,"Radar displays continuous data across n-number of categories (rows) and n-number of series (columns).",-1)),l(t,null,{default:r(()=>n[0]||(n[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Radar } from "@hpcc-js/chart";

  new Radar()
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
`)])],-1)])),_:1}),n[5]||(n[5]=e("p",null,[e("em",null,"fontFamily"),a(" and "),e("em",null,"fontSize"),a(" can be used to control the font family and size used for the labels and guidelines.")],-1)),n[6]||(n[6]=e("p",null,[e("em",null,"pointShape"),a(" and "),e("em",null,"pointSize"),a(" can be used to control the shape and size of the data points.")],-1)),l(t,null,{default:r(()=>n[1]||(n[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Radar } from "@hpcc-js/chart";

  new Radar()
      .target("placeholder")
      .columns(["Hour", "Value"])
      .data([
          ["Dec", 134],
          ["Jan", 95],
          ["Feb", 80],
          ["Mar", 65],
          ["Apr", 59],
          ["May", 51],
          ["Jun", 58],
          ["Jul", 72],
          ["Aug", 79],
          ["Sep", 104],
          ["Oct", 134],
          ["Nov", 124]
      ])
      .fontFamily("Verdana")
      .fontSize(14)
      .pointShape("circle")
      .pointSize(3)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[7]||(n[7]=e("p",null,[e("em",null,"fillOpacity"),a(" can be used to control the opacity of the background color created by each series.")],-1)),n[8]||(n[8]=e("p",null,[e("em",null,"valueGuideRatios"),a(" can be used to control placement, and count, of the guide lines.")],-1)),n[9]||(n[9]=e("p",null,[e("em",null,"labelPaddingRatio"),a(" shrinks the chart's visible area between its column labels.")],-1)),l(t,null,{default:r(()=>n[2]||(n[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Radar } from "@hpcc-js/chart";

  new Radar()
      .target("placeholder")
      .columns(["Category", "Value 1", "Value 2"])
      .data([
          ["A", 34, 190],
          ["B", 55, 150],
          ["C", 89, 35],
          ["D", 144, 36]
      ])
      .valueGuideRatios([0.5, 1.0])
      .labelPaddingRatio(0.8)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[10]||(n[10]=o('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Radar"><pre><code></code></pre></div>',3))])}var R=i(u,[["render",c]]);export{y as __pageData,R as default};
