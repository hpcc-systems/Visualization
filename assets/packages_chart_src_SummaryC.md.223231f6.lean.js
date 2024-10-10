import{_ as i,c as s,b as e,d as l,e as r,w as o,a,r as m,o as u}from"./app.ab56574e.js";const v='{"title":"SummaryC","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/SummaryC.md"}',d={};function p(c,n,h,y,C,S){const t=m("ClientOnly");return u(),s("div",null,[n[5]||(n[5]=e("h1",{id:"summaryc",tabindex:"-1"},[l("SummaryC "),e("a",{class:"header-anchor",href:"#summaryc","aria-hidden":"true"},"#")],-1)),n[6]||(n[6]=e("p",null,[l("SummaryC is commonly used to emphasize significant data points within a dashboard. It requires "),e("em",null,"labelColumn"),l(" and "),e("em",null,"valueColumn"),l(" to be specified.")],-1)),r(t,null,{default:o(()=>n[0]||(n[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[7]||(n[7]=e("p",null,[e("em",null,"icon"),l(" can be set to an empty string to prevent the default icon from displaying.")],-1)),n[8]||(n[8]=e("p",null,[e("em",null,"fontSizeRatio"),l(" can be used to set the font size ration between the value size and the label size.")],-1)),r(t,null,{default:o(()=>n[1]||(n[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[9]||(n[9]=a("<p><em>icon</em> can also be used to assign a FontAwesome icon by class.</p><p><em>iconSizeRatio</em> can be used to control the icon&#39;s size relative to the overall height.</p><p><em>colorFill</em> sets the background color.</p><p><em>colorStroke</em> sets the text and icon color.</p><p><em>iconBaseline</em> controls the vertical placement of the icon.</p>",5)),r(t,null,{default:o(()=>n[2]||(n[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[10]||(n[10]=e("p",null,[e("em",null,"playInterval"),l(" can be used to cycle through multiple data rows. In the below example the play interval is set to 2000 milliseconds (two seconds).")],-1)),r(t,null,{default:o(()=>n[3]||(n[3]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[11]||(n[11]=e("p",null,[e("em",null,"iconColumn"),l(", "),e("em",null,"colorFillColumn"),l(" and "),e("em",null,"colorStrokeColumn"),l(" can be set to designate data row columns for these properties. This allows the properties to change for each data row.")],-1)),r(t,null,{default:o(()=>n[4]||(n[4]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[12]||(n[12]=a('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:SummaryC"><pre><code></code></pre></div>',3))])}var b=i(d,[["render",p]]);export{v as __pageData,b as default};
