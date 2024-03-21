import{_ as r,c as i,b as a,w as l,d as e,e as t,a as s,r as o,o as c}from"./app.70956d7b.js";const j='{"title":"Gauge","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Gauge.md"}',u={},p=e("h1",{id:"gauge",tabindex:"-1"},[t("Gauge "),e("a",{class:"header-anchor",href:"#gauge","aria-hidden":"true"},"#")],-1),d=e("p",null,"A gauge chart displays a value between 0 and 1 as a percentage.",-1),h=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Example")
      .value(.38)
      .render()
      ;
<\/script>
`)])],-1),g=e("p",null,[e("em",null,"tickValue"),t(" can be used to display a point of interest. "),e("em",null,"showTick"),t(" must be set to "),e("em",null,"true"),t(" in order for the tick to be visible.")],-1),v=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Gauge w/ Tick")
      .value(.38)
      .showTick(true)
      .tickValue(.62)
      .render()
      ;
<\/script>
`)])],-1),_=e("p",null,[e("em",null,"titleDescription"),t(", "),e("em",null,"valueDescription"),t(" and "),e("em",null,"tickValueDescription"),t(" can be used to specify hover text that displays while the cursor hovers the title, value or tick respectively.")],-1),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Tick & Descriptions")
      .titleDescription("My Title Description")
      .value(.38)
      .valueDescription("My Value Description")
      .showTick(true)
      .tickValue(.62)
      .tickValueDescription("My Tick Description")
      .render()
      ;
<\/script>
`)])],-1),y=e("p",null,[t("Custom colors can be specified using two properties. "),e("em",null,"colorRange"),t(" expects an array of valid css color style strings. "),e("em",null,"colorDomain"),t(" expects an array of threshold values from 0 to 1. For the best results these two arrays should have the same number of elements.")],-1),f=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("Custom Color Gauge")
      .value(0)
      .tickValue(0.5)
      .showTick(true)
      .colorDomain([0,0.25,0.5,0.75,1])
      .colorRange(["#0000FF","dodgerblue","goldenrod","orange","rgb(255,0,0)"])
      .emptyColor("#FFFFFF")
      .tickColor("red")
      .render()
      ;

  setInterval(function () {
      const v = gauge.value() + 0.25;
      gauge
          .value(v <= 1 ? v : 0)
          .lazyRender()
          ;
  }, 1000);
<\/script>
`)])],-1),k=e("p",null,"When the values change, the gauge animates to display the new values.",-1),w=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Gauge } from "@hpcc-js/chart";

  var gauge = new Gauge()
      .target("placeholder")
      .title("My Gauge")
      .titleDescription("@hpcc-js/chart")
      .value(.66)
      .valueDescription("Main")
      .showTick(true)
      .tickValue(.33)
      .tickValueDescription("Average")
      .render()
      ;

  setInterval(function () {
      gauge
          .value(Math.random())
          .tickValue(Math.random())
          .lazyRender()
          ;
  }, 3000);
<\/script>
`)])],-1),x=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Gauge"><pre><code></code></pre></div>',3);function b(G,D,T,V,C,F){const n=o("ClientOnly");return c(),i("div",null,[p,d,a(n,null,{default:l(()=>[h]),_:1}),g,a(n,null,{default:l(()=>[v]),_:1}),_,a(n,null,{default:l(()=>[m]),_:1}),y,a(n,null,{default:l(()=>[f]),_:1}),k,a(n,null,{default:l(()=>[w]),_:1}),x])}var A=r(u,[["render",b]]);export{j as __pageData,A as default};
