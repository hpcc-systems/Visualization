import{_ as r,c as s,b as n,w as i,a as l,d as e,e as t,r as h,o as d}from"./app.70956d7b.js";const V='{"title":"StatChart","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/StatChart.md"}',o={},p=l('<h1 id="statchart" tabindex="-1">StatChart <a class="header-anchor" href="#statchart" aria-hidden="true">#</a></h1><p>StatChart displays a normal distribution of continuous data.</p><p>A single data row containing exactly 7 data points is required.</p><p>The <em>1st</em> data point sets the lowest value in the set.</p><p>The <em>2nd</em> data point sets the lower quartile (typically the average of the smallest half of values in the set).</p><p>The <em>3rd</em> data point sets the middle quartile (typically the median value in the set).</p><p>The <em>4th</em> data point sets the upper quartile (typically the average of the largest half of values in a set).</p><p>The <em>5th</em> data point sets the largest value in the set.</p><p>The <em>6th</em> data point sets the <em>mean</em>.</p><p>The <em>7th</em> data point sets the <em>standardDeviation</em>.</p>',10),c=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { StatChart } from "@hpcc-js/chart";

  new StatChart()
      .data([
          [34,55,89,144,233,90,20]
      ])
      .target("placeholder")
      .render()
      ;
<\/script>
`)])],-1),u=e("p",null,[t("Alternatively, the "),e("em",null,"mean"),t(" and "),e("em",null,"standardDeviation"),t(" can be set via chained methods "),e("em",null,"AFTER"),t(" the "),e("em",null,"data"),t(" row has been set.")],-1),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { StatChart } from "@hpcc-js/chart";

  new StatChart()
      .data([
          [34,55,89,144,233]
      ])
      .mean(90)
      .standardDeviation(20)
      .target("placeholder")
      .render()
      ;
<\/script>
`)])],-1),_=e("p",null,[e("em",null,"candleHeight"),t(" controls the pixel height of the "),e("em",null,"QuartileCandlestick"),t(" chart along the bottom.")],-1),g=e("p",null,[e("em",null,"domainPadding"),t(" controls the left and right padding of the interpolated "),e("em",null,"Scatter"),t(" chart (bell curve) along the top.")],-1),v=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { StatChart } from "@hpcc-js/chart";

  new StatChart()
      .data([
          [34,55,89,144,233]
      ])
      .mean(90)
      .standardDeviation(20)
      .candleHeight(50)
      .domainPadding(100)
      .target("placeholder")
      .render()
      ;
<\/script>
`)])],-1),f=e("p",null,[e("em",null,"tickFormat"),t(" can be used to specify a d3 string formatting rule to be applied to the axis tick values (see: "),e("a",{href:"./../../../docs/Getting Started/formatting.html"},"Formatting"),t(")")],-1),y=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { StatChart } from "@hpcc-js/chart";

  new StatChart()
      .target("placeholder")
      .quartiles([34,55,89,144,233])
      .mean(120)
      .standardDeviation(130)
      .tickFormat(".2s")
      .render()
      ;
<\/script>
`)])],-1),C=l('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:StatChart"><pre><code></code></pre></div>',3);function S(T,x,b,w,P,A){const a=h("ClientOnly");return d(),s("div",null,[p,n(a,null,{default:i(()=>[c]),_:1}),u,n(a,null,{default:i(()=>[m]),_:1}),_,g,n(a,null,{default:i(()=>[v]),_:1}),f,n(a,null,{default:i(()=>[y]),_:1}),C])}var k=r(o,[["render",S]]);export{V as __pageData,k as default};
