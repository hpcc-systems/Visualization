import{_ as a,c as m,b as e,d as l,e as r,w as o,a as i,r as s,o as u}from"./app.ab56574e.js";const b='{"title":"Summary","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Summary.md"}',p={};function d(c,n,h,y,S,f){const t=s("ClientOnly");return u(),m("div",null,[n[7]||(n[7]=e("h1",{id:"summary",tabindex:"-1"},[l("Summary "),e("a",{class:"header-anchor",href:"#summary","aria-hidden":"true"},"#")],-1)),n[8]||(n[8]=e("p",null,[l("Summary is commonly used to emphasize significant data points within a dashboard. It requires "),e("em",null,"labelColumn"),l(" and "),e("em",null,"valueColumn"),l(" to be specified.")],-1)),r(t,null,{default:o(()=>n[0]||(n[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Summary } from "@hpcc-js/chart";

  new Summary()
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
`)])],-1)])),_:1}),n[9]||(n[9]=e("p",null,[e("em",null,"icon"),l(" can be set to an empty string to prevent the default icon from displaying.")],-1)),n[10]||(n[10]=e("p",null,[e("em",null,"hideMoreWrapper"),l(" can hide the 'more info' section.")],-1)),n[11]||(n[11]=e("p",null,[e("em",null,"textFontSize"),l(" can be used to set the label font size.")],-1)),n[12]||(n[12]=e("p",null,[e("em",null,"headerFontSize"),l(" can be used to set the value font size.")],-1)),r(t,null,{default:o(()=>n[1]||(n[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Summary } from "@hpcc-js/chart";

  new Summary()
      .target("placeholder")
      .columns(["Summary", "Score"])
      .data([
          ["Cars", 128]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .icon("")
      .hideMoreWrapper(true)
      .headerFontSize(120)
      .textFontSize(20)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[13]||(n[13]=e("p",null,[e("em",null,"icon"),l(" can also be used to specify a class to be given to the icon's html element. In the example below a FontAwesome class is assigned.")],-1)),n[14]||(n[14]=e("p",null,[e("em",null,"colorFill"),l(" sets the background color.")],-1)),n[15]||(n[15]=e("p",null,[e("em",null,"colorStroke"),l(" sets the text and icon color.")],-1)),r(t,null,{default:o(()=>n[2]||(n[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Summary } from "@hpcc-js/chart";

  new Summary()
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
      .hideMoreWrapper(true)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[16]||(n[16]=e("p",null,[e("em",null,"moreIcon"),l(" can be used to specify a class to be given to the 'more info' icon's html element. In the example below a FontAwesome class is assigned.")],-1)),n[17]||(n[17]=e("p",null,[e("em",null,"moreText"),l(" can be used to specify content for the 'more info' section.")],-1)),r(t,null,{default:o(()=>n[3]||(n[3]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Summary } from "@hpcc-js/chart";

  new Summary()
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
      .moreIcon("fa-user-md")
      .moreText("32 doctors")
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[18]||(n[18]=e("p",null,[e("em",null,"moreIcon"),l(" can also be set to an empty string to prevent the default icon from displaying.")],-1)),n[19]||(n[19]=e("p",null,[l("If "),e("em",null,"moreTextHTML"),l(" is set to "),e("em",null,"true"),l(" then the content within "),e("em",null,"moreText"),l(" will be rendered as HTML.")],-1)),r(t,null,{default:o(()=>n[4]||(n[4]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Summary } from "@hpcc-js/chart";

  new Summary()
      .target("placeholder")
      .columns(["Summary", "Score"])
      .data([
          ["Tweets", 512]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .icon("fa-twitter")
      .colorFill("#eeeeee")
      .colorStroke("#30336b")
      .moreIcon("")
      .moreText("<button onclick=\\"alert('More info here')\\">Click for more info</button>")
      .moreTextHTML(true)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[20]||(n[20]=e("p",null,[e("em",null,"playInterval"),l(" can be used to cycle through multiple data rows. In the below example the play interval is set to 2000 milliseconds (two seconds).")],-1)),r(t,null,{default:o(()=>n[5]||(n[5]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Summary } from "@hpcc-js/chart";

  new Summary()
      .target("placeholder")
      .columns(["Summary", "Score"])
      .data([
          ["Cars", 128],
          ["Trucks", 64]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .icon("")
      .hideMoreWrapper(true)
      .headerFontSize(120)
      .textFontSize(20)
      .playInterval(2000)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[21]||(n[21]=e("p",null,[e("em",null,"iconColumn"),l(", "),e("em",null,"moreIconColumn"),l(", "),e("em",null,"moreTextColumn"),l(", "),e("em",null,"colorFillColumn"),l(" and "),e("em",null,"colorStrokeColumn"),l(" can be set to designate data row columns for these properties. This allows the properties to change for each data row.")],-1)),r(t,null,{default:o(()=>n[6]||(n[6]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { Summary } from "@hpcc-js/chart";

  new Summary()
      .target("placeholder")
      .columns(["Summary", "Score", "Icon", "MoreIcon", "Details", "Background", "TextColor"])
      .data([
          ["Cars", 128, "fa-automobile", "fa-truck", "64 Trucks", "grey", "black"],
          ["Cold days", 256, "fa-thermometer-empty", "fa-thermometer", "16 Hot days", "#30336b", "white"]
      ])
      .labelColumn("Summary")
      .valueColumn("Score")
      .iconColumn("Icon")
      .moreTextColumn("Details")
      .moreIconColumn("MoreIcon")
      .colorFillColumn("Background")
      .colorStrokeColumn("TextColor")
      .playInterval(2000)
      .render()
      ;
<\/script>
`)])],-1)])),_:1}),n[22]||(n[22]=i('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:Summary"><pre><code></code></pre></div>',3))])}var g=a(p,[["render",d]]);export{b as __pageData,g as default};
