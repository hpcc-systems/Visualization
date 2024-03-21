import{_ as s,c as t,b as p,w as e,a as o,r as c,o as l,d as a}from"./app.70956d7b.js";const E='{"title":"@hpcc-js/codemirror","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"}],"relativePath":"packages/codemirror/README.md"}',r={},i=o("",6),u=a("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[a("pre",null,[a("code",null,`<div id="target" style="height:600px">
</div>
<script type="module">
  import { ECLEditor } from "@hpcc-js/codemirror";

  const code = \`\\
MySample := SAMPLE(Person,10,1) // get every 10th record
SomeFile := DATASET([{'A'},{'B'},{'C'},{'D'},{'E'},
                    {'F'},{'G'},{'H'},{'I'},{'J'},
                    {'K'},{'L'},{'M'},{'N'},{'O'},
                    {'P'},{'Q'},{'R'},{'S'},{'T'},
                    {'U'},{'V'},{'W'},{'X'},{'Y'}],
                    {STRING1 Letter});
Set1 := SAMPLE(SomeFile,5,1); // returns A, F, K, P, U\`;

  new ECLEditor()
      .ecl(code)
      .target("target")
      .render()
      ;
<\/script>
`)])],-1);function k(g,d,h,m,y,f){const n=c("ClientOnly");return l(),t("div",null,[i,p(n,null,{default:e(()=>[u]),_:1})])}var q=s(r,[["render",k]]);export{E as __pageData,q as default};
