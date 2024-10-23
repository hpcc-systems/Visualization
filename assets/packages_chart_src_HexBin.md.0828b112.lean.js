import{_ as s,c as l,b as n,d as t,e as a,w as r,a as o,r as d,o as p}from"./app.ab56574e.js";const y='{"title":"HexBin","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/HexBin.md"}',u={};function h(c,e,x,m,b,f){const i=d("ClientOnly");return p(),l("div",null,[e[2]||(e[2]=n("h1",{id:"hexbin",tabindex:"-1"},[t("HexBin "),n("a",{class:"header-anchor",href:"#hexbin","aria-hidden":"true"},"#")],-1)),e[3]||(e[3]=n("p",null,[t("HexBin and "),n("a",{href:"./Contour.html"},"Contour"),t(" serve a similar purpose. They summarize high density data across two continuous axes.")],-1)),a(i,null,{default:r(()=>e[0]||(e[0]=[n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { HexBin } from "@hpcc-js/chart";

  new HexBin()
      .target("placeholder")
      .columns(["X-Value", "Y-Value"])
      .data(randomData(1000))
      .xAxisType("linear")
      .render()
      ;

  function randomData(count){
      return Array(count).fill(1).map((n,x)=>{
          const y = Math.sqrt(x) * Math.random();
          return [x,y];
      });
  }
<\/script>
`)])],-1)])),_:1}),e[4]||(e[4]=n("p",null,[n("em",null,"binSize"),t(" can be used to set the size of the hexagon bins. The results can be seen in the below example.")],-1)),a(i,null,{default:r(()=>e[1]||(e[1]=[n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { HexBin } from "@hpcc-js/chart";

  let binSize = 5;

  const widget = new HexBin()
      .target("placeholder")
      .columns(["X-Value", "Y-Value"])
      .data(randomData(1000))
      .xAxisType("linear")
      .xAxisTickCount(10)
      .binSize(binSize)
      .render()
      ;

  function randomData(count){
      return Array(count).fill(1).map((n,x)=>{
          const y = Math.sqrt(x) * Math.random();
          return [x,y];
      });
  }
  let interval = 5;
  setInterval(function(){
      const next = binSize + interval;
      if(next > 20 || next <= 0){
          interval *= -1;
      }
      binSize += interval;
      widget
          .xAxisTitle("binSize = " + binSize)
          .binSize(binSize)
          .render()
          ;
  },1000);
<\/script>
`)])],-1)])),_:1}),e[5]||(e[5]=o('<p>For documentation on axis-specific properties take a look at the <a href="./XYAxis.html">Axis Documentation</a>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:HexBin"><pre><code></code></pre></div>',4))])}var g=s(u,[["render",h]]);export{y as __pageData,g as default};
