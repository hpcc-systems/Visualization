import{_ as i,c as d,b as e,d as t,e as a,w as o,a as l,r as s,o as u}from"./app.ab56574e.js";const b='{"title":"Contour","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Contour.md"}',p={};function h(c,n,x,m,f,v){const r=s("ClientOnly");return u(),d("div",null,[n[2]||(n[2]=e("h1",{id:"contour",tabindex:"-1"},[t("Contour "),e("a",{class:"header-anchor",href:"#contour","aria-hidden":"true"},"#")],-1)),n[3]||(n[3]=e("p",null,[t("Contour and "),e("a",{href:"./HexBin.html"},"HexBin"),t(" serve a similar purpose. They summarize high density data across two continuous axes.")],-1)),a(r,null,{default:o(()=>n[0]||(n[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Contour } from "@hpcc-js/chart";

  new Contour()
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
`)])],-1)])),_:1}),n[4]||(n[4]=e("p",null,[e("em",null,"contourBandwidth"),t(" can be used to control the standard deviation of the contour algorithm. The results can be seen in the below example.")],-1)),a(r,null,{default:o(()=>n[1]||(n[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Contour } from "@hpcc-js/chart";

  let bandwidth = 10;

  const widget = new Contour()
      .target("placeholder")
      .columns(["X-Value", "Y-Value"])
      .data(randomData(1000))
      .xAxisType("linear")
      .xAxisTickCount(10)
      .contourBandwidth(bandwidth)
      .render()
      ;

  function randomData(count){
      return Array(count).fill(1).map((n,x)=>{
          const y = Math.sqrt(x) * Math.random();
          return [x,y];
      });
  }
  let interval = 10;
  setInterval(function(){
      const next = bandwidth + interval;
      if(next > 100 || next <= 0){
          interval *= -1;
      }
      bandwidth += interval;
      widget
          .xAxisTitle("bandwidth = " + bandwidth)
          .contourBandwidth(bandwidth)
          .render()
          ;
  },1000);
<\/script>
`)])],-1)])),_:1}),n[5]||(n[5]=l('<p>For documentation on axis-specific properties take a look at the <a href="./XYAxis.html">Axis Documentation</a>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Contour"><pre><code></code></pre></div>',4))])}var y=i(p,[["render",h]]);export{b as __pageData,y as default};
