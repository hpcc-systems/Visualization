import{_ as r,c,b as o,w as l,d as e,e as n,a,r as s,o as i}from"./app.70956d7b.js";const B='{"title":"SummaryC","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/SummaryC.md"}',m={},d=e("h1",{id:"summaryc",tabindex:"-1"},[n("SummaryC "),e("a",{class:"header-anchor",href:"#summaryc","aria-hidden":"true"},"#")],-1),u=e("p",null,[n("SummaryC is commonly used to emphasize significant data points within a dashboard. It requires "),e("em",null,"labelColumn"),n(" and "),e("em",null,"valueColumn"),n(" to be specified.")],-1),p=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { SummaryC } from "@hpcc-js/chart";

  new SummaryC()
      .target("placeholder")
      .columns(["Summary", "Score"])
      .data([
          ["Cars", 128]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .render()
      ;
<\/script>
`)])],-1),h=e("p",null,[e("em",null,"icon"),n(" can be set to an empty string to prevent the default icon from displaying.")],-1),_=e("p",null,[e("em",null,"fontSizeRatio"),n(" can be used to set the font size ration between the value size and the label size.")],-1),y=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { SummaryC } from "@hpcc-js/chart";

  new SummaryC()
      .target("placeholder")
      .columns(["Summary", "Score"])
      .data([
          ["Cars", 128]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .icon("")
      .fontSizeRatio(0.38)
      .render()
      ;
<\/script>
`)])],-1),S=a("<p><em>icon</em> can also be used to assign a FontAwesome icon by class.</p><p><em>iconSizeRatio</em> can be used to control the icon&#39;s size relative to the overall height.</p><p><em>colorFill</em> sets the background color.</p><p><em>colorStroke</em> sets the text and icon color.</p><p><em>iconBaseline</em> controls the vertical placement of the icon.</p>",5),C=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { SummaryC } from "@hpcc-js/chart";

  new SummaryC()
      .target("placeholder")
      .columns(["Summary", "Score"])
      .data([
          ["Users", 256]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .icon("fa-users")
      .colorFill("#eeeeee")
      .colorStroke("#30336b")
      .iconSizeRatio(0.5)
      .iconBaseline("middle")
      .render()
      ;
<\/script>
`)])],-1),f=e("p",null,[e("em",null,"playInterval"),n(" can be used to cycle through multiple data rows. In the below example the play interval is set to 2000 milliseconds (two seconds).")],-1),v=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { SummaryC } from "@hpcc-js/chart";

  new SummaryC()
      .target("placeholder")
      .columns(["Summary", "Score", "Icon"])
      .data([
          ["Cars", 128, "fa-automobile"],
          ["Trucks", 64, "fa-truck"]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .iconColumn("Icon")
      .playInterval(2000)
      .render()
      ;
<\/script>
`)])],-1),b=e("p",null,[e("em",null,"iconColumn"),n(", "),e("em",null,"colorFillColumn"),n(" and "),e("em",null,"colorStrokeColumn"),n(" can be set to designate data row columns for these properties. This allows the properties to change for each data row.")],-1),g=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { SummaryC } from "@hpcc-js/chart";

  new SummaryC()
      .target("placeholder")
      .columns(["Summary", "Score", "Icon", "Background", "TextColor"])
      .data([
          ["Cold days", 56, "fa-thermometer-0", "#95a5a6", "#34495e"],
          ["Cool days", 120, "fa-thermometer-1", "white", "#2980b9"],
          ["Warm days", 130, "fa-thermometer-2", "#f1c40f", "#d35400"],
          ["Hot days", 59, "fa-thermometer-3", "#c0392b", "#ecf0f1"]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .iconColumn("Icon")
      .colorFillColumn("Background")
      .colorStrokeColumn("TextColor")
      .playInterval(2000)
      .render()
      ;
<\/script>
`)])],-1),w=a('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:SummaryC"><pre><code></code></pre></div>',3);function x(T,I,k,P,z,A){const t=s("ClientOnly");return i(),c("div",null,[d,u,o(t,null,{default:l(()=>[p]),_:1}),h,_,o(t,null,{default:l(()=>[y]),_:1}),S,o(t,null,{default:l(()=>[C]),_:1}),f,o(t,null,{default:l(()=>[v]),_:1}),b,o(t,null,{default:l(()=>[g]),_:1}),w])}var j=r(m,[["render",x]]);export{B as __pageData,j as default};
