import{_ as a,c as r,b as s,w as o,a as i,r as n,o as l,d as e}from"./app.70956d7b.js";const j='{"title":"@hpcc-js/dgrid","description":"","frontmatter":{},"headers":[{"level":2,"title":"Details","slug":"details"},{"level":2,"title":"Note for Rollup.js users","slug":"note-for-rollup-js-users"}],"relativePath":"packages/dgrid/README.md"}',d={},c=i("",6),p=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="target" style="height:600px">
</div>
<script type="module">
    //  Note:  dgrid does not support "import" - this will fail
    import { Table } from "@hpcc-js/dgrid";

    new Table()
        .target("target")
        .columns(["Mother", "Father", { label: "Children", columns: ["Name", "sex", "age"] }, { label: "Pets", columns: ["Name", "type"] }])
        .data([
            ["<b>Jane</b>", "John", [["Mary", "f", 4], ["Bob", "m", 6], ["Tim", "m", 1]], [["Spot", "dog"], ["Smelly", "cat"], ["Goldie", "Fish"], ["Hammy", "Hamster"]]],
            ["Penelope", "Alex", [["Bill", "m", 1]], []],
            ["Jill", "Marcus", [], [["Flappy", "parrot"], ["Stinky", "cat"], ["Rolf", "dog"]]],
            ["Susan", "Robert", [["Jack", "m", 4], ["Alice", "f", 6]], []]
        ])
        .render()
        ;
  <\/script>
`)])],-1);function h(u,m,g,f,_,b){const t=n("ClientOnly");return l(),r("div",null,[c,s(t,null,{default:o(()=>[p]),_:1})])}var k=a(d,[["render",h]]);export{j as __pageData,k as default};
