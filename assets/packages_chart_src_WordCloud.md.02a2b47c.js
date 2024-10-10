import{_ as o,c as i,b as e,d as t,e as l,w as a,a as s,r as d,o as p}from"./app.ab56574e.js";const y='{"title":"WordCloud","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/chart/src/WordCloud.md"}',u={};function h(g,n,m,c,f,C){const r=d("ClientOnly");return p(),i("div",null,[n[4]||(n[4]=e("h1",{id:"wordcloud",tabindex:"-1"},[t("WordCloud "),e("a",{class:"header-anchor",href:"#wordcloud","aria-hidden":"true"},"#")],-1)),n[5]||(n[5]=e("p",null,"A word cloud chart displays words with prominence relative to the word\u2019s given weight. The larger the weight value, relative to the other word weights, the bigger it appears in the word cloud.",-1)),l(r,null,{default:a(()=>n[0]||(n[0]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[6]||(n[6]=e("p",null,[t("Use "),e("em",null,"fontFamily"),t(" to set the font family. "),e("em",null,"fontSizeFrom"),t(" and "),e("em",null,"fontSizeTo"),t(" can be used to control the range of font sizes from the minimum word weight to the maximum word weight.")],-1)),l(r,null,{default:a(()=>n[1]||(n[1]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[7]||(n[7]=e("p",null,[t("The rotation of the words are not bound to their weight. Use "),e("em",null,"angleFrom"),t(" and "),e("em",null,"angleTo"),t(" to set the minimum and maximum assigned angles. Use "),e("em",null,"angleCount"),t(" to set the number of potential angles.")],-1)),l(r,null,{default:a(()=>n[2]||(n[2]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[8]||(n[8]=e("p",null,"Below is an example with a single angle of 45 degrees and font sizes ranging from 18 to 28 pixels.",-1)),l(r,null,{default:a(()=>n[3]||(n[3]=[e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="height:400px">
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
`)])],-1)])),_:1}),n[9]||(n[9]=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/chart:WordCloud"><pre><code></code></pre></div>',3))])}var v=o(u,[["render",h]]);export{y as __pageData,v as default};
