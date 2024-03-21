import{_ as r,c as l,b as a,w as o,d as e,e as n,a as s,r as i,o as d}from"./app.70956d7b.js";const S='{"title":"WordCloud","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/WordCloud.md"}',h={},c=e("h1",{id:"wordcloud",tabindex:"-1"},[n("WordCloud "),e("a",{class:"header-anchor",href:"#wordcloud","aria-hidden":"true"},"#")],-1),p=e("p",null,"A word cloud chart displays words with prominence relative to the word\u2019s given weight. The larger the weight value, relative to the other word weights, the bigger it appears in the word cloud.",-1),u=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { WordCloud } from "@hpcc-js/chart";

  new WordCloud()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["Apples", 34],
          ["Bananas", 55],
          ["Carrots", 89],
          ["Danishes", 144],
          ["Eggs", 60],
          ["Figs", 72],
          ["Ginger", 92],
          ["Hazelnut", 102],
          ["Incaberries", 52],
          ["Jambalaya", 42],
      ])
      .render()
      ;
<\/script>
`)])],-1),g=e("p",null,[n("Use "),e("em",null,"fontFamily"),n(" to set the font family. "),e("em",null,"fontSizeFrom"),n(" and "),e("em",null,"fontSizeTo"),n(" can be used to control the range of font sizes from the minimum word weight to the maximum word weight.")],-1),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { WordCloud } from "@hpcc-js/chart";

  new WordCloud()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["Apples", 34],
          ["Bananas", 55],
          ["Carrots", 89],
          ["Danishes", 144],
          ["Eggs", 60],
          ["Figs", 72],
          ["Ginger", 92],
          ["Hazelnut", 102],
          ["Incaberries", 52],
          ["Jambalaya", 42],
      ])
      .fontFamily("Chilanka")
      .fontSizeFrom(12)
      .fontSizeTo(24)
      .render()
      ;
<\/script>
`)])],-1),_=e("p",null,[n("The rotation of the words are not bound to their weight. Use "),e("em",null,"angleFrom"),n(" and "),e("em",null,"angleTo"),n(" to set the minimum and maximum assigned angles. Use "),e("em",null,"angleCount"),n(" to set the number of potential angles.")],-1),f=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { WordCloud } from "@hpcc-js/chart";

  new WordCloud()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["Apples", 34],
          ["Bananas", 55],
          ["Carrots", 89],
          ["Danishes", 144],
          ["Eggs", 60],
          ["Figs", 72],
          ["Ginger", 92],
          ["Hazelnut", 102],
          ["Incaberries", 52],
          ["Jambalaya", 42],
      ])
      .angleFrom(90)
      .angleTo(0)
      .angleCount(2)
      .render()
      ;
<\/script>
`)])],-1),C=e("p",null,"Below is an example with a single angle of 45 degrees and font sizes ranging from 18 to 28 pixels.",-1),w=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
</div>
<script type="module">
  import { WordCloud } from "@hpcc-js/chart";

  new WordCloud()
      .target("placeholder")
      .columns(["Category", "Value"])
      .data([
          ["Apples", 34],
          ["Bananas", 55],
          ["Carrots", 89],
          ["Danishes", 144],
          ["Eggs", 60],
          ["Figs", 72],
          ["Ginger", 92],
          ["Hazelnut", 102],
          ["Incaberries", 52],
          ["Jambalaya", 42],
      ])
      .fontFamily("Chilanka")
      .angleFrom(45)
      .angleTo(45)
      .angleCount(1)
      .fontSizeFrom(18)
      .fontSizeTo(28)
      .render()
      ;
<\/script>
`)])],-1),y=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:WordCloud"><pre><code></code></pre></div>',3);function v(b,x,T,F,W,z){const t=i("ClientOnly");return d(),l("div",null,[c,p,a(t,null,{default:o(()=>[u]),_:1}),g,a(t,null,{default:o(()=>[m]),_:1}),_,a(t,null,{default:o(()=>[f]),_:1}),C,a(t,null,{default:o(()=>[w]),_:1}),y])}var V=r(h,[["render",v]]);export{S as __pageData,V as default};
