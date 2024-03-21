import{_ as r,c as a,b as o,w as l,d as e,e as n,a as s,r as c,o as i}from"./app.70956d7b.js";const E='{"title":"Summary","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/Summary.md"}',m={},u=e("h1",{id:"summary",tabindex:"-1"},[n("Summary "),e("a",{class:"header-anchor",href:"#summary","aria-hidden":"true"},"#")],-1),d=e("p",null,[n("Summary is commonly used to emphasize significant data points within a dashboard. It requires "),e("em",null,"labelColumn"),n(" and "),e("em",null,"valueColumn"),n(" to be specified.")],-1),h=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),p=e("p",null,[e("em",null,"icon"),n(" can be set to an empty string to prevent the default icon from displaying.")],-1),_=e("p",null,[e("em",null,"hideMoreWrapper"),n(" can hide the 'more info' section.")],-1),y=e("p",null,[e("em",null,"textFontSize"),n(" can be used to set the label font size.")],-1),S=e("p",null,[e("em",null,"headerFontSize"),n(" can be used to set the value font size.")],-1),f=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),v=e("p",null,[e("em",null,"icon"),n(" can also be used to specify a class to be given to the icon's html element. In the example below a FontAwesome class is assigned.")],-1),b=e("p",null,[e("em",null,"colorFill"),n(" sets the background color.")],-1),g=e("p",null,[e("em",null,"colorStroke"),n(" sets the text and icon color.")],-1),C=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),x=e("p",null,[e("em",null,"moreIcon"),n(" can be used to specify a class to be given to the 'more info' icon's html element. In the example below a FontAwesome class is assigned.")],-1),w=e("p",null,[e("em",null,"moreText"),n(" can be used to specify content for the 'more info' section.")],-1),T=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),I=e("p",null,[e("em",null,"moreIcon"),n(" can also be set to an empty string to prevent the default icon from displaying.")],-1),k=e("p",null,[n("If "),e("em",null,"moreTextHTML"),n(" is set to "),e("em",null,"true"),n(" then the content within "),e("em",null,"moreText"),n(" will be rendered as HTML.")],-1),F=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),M=e("p",null,[e("em",null,"playInterval"),n(" can be used to cycle through multiple data rows. In the below example the play interval is set to 2000 milliseconds (two seconds).")],-1),z=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),P=e("p",null,[e("em",null,"iconColumn"),n(", "),e("em",null,"moreIconColumn"),n(", "),e("em",null,"moreTextColumn"),n(", "),e("em",null,"colorFillColumn"),n(" and "),e("em",null,"colorStrokeColumn"),n(" can be set to designate data row columns for these properties. This allows the properties to change for each data row.")],-1),j=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1),A=s("",3);function V(B,N,D,H,W,$){const t=c("ClientOnly");return i(),a("div",null,[u,d,o(t,null,{default:l(()=>[h]),_:1}),p,_,y,S,o(t,null,{default:l(()=>[f]),_:1}),v,b,g,o(t,null,{default:l(()=>[C]),_:1}),x,w,o(t,null,{default:l(()=>[T]),_:1}),I,k,o(t,null,{default:l(()=>[F]),_:1}),M,o(t,null,{default:l(()=>[z]),_:1}),P,o(t,null,{default:l(()=>[j]),_:1}),A])}var O=r(m,[["render",V]]);export{E as __pageData,O as default};
