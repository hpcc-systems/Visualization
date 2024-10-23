import{_ as s,c as d,a as i,e as l,w as r,b as t,d as a,r as p,o as h}from"./app.ab56574e.js";const x='{"title":"StatChart","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/StatChart.md"}',o={};function u(m,e,c,g,v,f){const n=p("ClientOnly");return h(),d("div",null,[e[4]||(e[4]=i('<h1 id="statchart" tabindex="-1">StatChart <a class="header-anchor" href="#statchart" aria-hidden="true">#</a></h1><p>StatChart displays a normal distribution of continuous data.</p><p>A single data row containing exactly 7 data points is required.</p><p>The <em>1st</em> data point sets the lowest value in the set.</p><p>The <em>2nd</em> data point sets the lower quartile (typically the average of the smallest half of values in the set).</p><p>The <em>3rd</em> data point sets the middle quartile (typically the median value in the set).</p><p>The <em>4th</em> data point sets the upper quartile (typically the average of the largest half of values in a set).</p><p>The <em>5th</em> data point sets the largest value in the set.</p><p>The <em>6th</em> data point sets the <em>mean</em>.</p><p>The <em>7th</em> data point sets the <em>standardDeviation</em>.</p>',10)),l(n,null,{default:r(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[5]||(e[5]=t("p",null,[a("Alternatively, the "),t("em",null,"mean"),a(" and "),t("em",null,"standardDeviation"),a(" can be set via chained methods "),t("em",null,"AFTER"),a(" the "),t("em",null,"data"),a(" row has been set.")],-1)),l(n,null,{default:r(()=>e[1]||(e[1]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[6]||(e[6]=t("p",null,[t("em",null,"candleHeight"),a(" controls the pixel height of the "),t("em",null,"QuartileCandlestick"),a(" chart along the bottom.")],-1)),e[7]||(e[7]=t("p",null,[t("em",null,"domainPadding"),a(" controls the left and right padding of the interpolated "),t("em",null,"Scatter"),a(" chart (bell curve) along the top.")],-1)),l(n,null,{default:r(()=>e[2]||(e[2]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[8]||(e[8]=t("p",null,[t("em",null,"tickFormat"),a(" can be used to specify a d3 string formatting rule to be applied to the axis tick values (see: "),t("a",{href:"./../../../docs/Getting Started/formatting.html"},"Formatting"),a(")")],-1)),l(n,null,{default:r(()=>e[3]||(e[3]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),e[9]||(e[9]=i('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:StatChart"><pre><code></code></pre></div>',3))])}var C=s(o,[["render",u]]);export{x as __pageData,C as default};
