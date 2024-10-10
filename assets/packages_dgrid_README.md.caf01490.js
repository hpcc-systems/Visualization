import{_ as r,c as s,a as i,e as o,w as n,r as l,o as d,b as t}from"./app.ab56574e.js";const y='{"title":"@hpcc-js/dgrid","description":"","frontmatter":{},"headers":[{"level":2,"title":"Details","slug":"details"},{"level":2,"title":"Note for Rollup.js users","slug":"note-for-rollup-js-users"}],"relativePath":"packages/dgrid/README.md"}',p={};function c(h,e,u,m,g,f){const a=l("ClientOnly");return d(),s("div",null,[e[1]||(e[1]=i('<h1 id="hpcc-js-dgrid" tabindex="-1">@hpcc-js/dgrid <a class="header-anchor" href="#hpcc-js-dgrid" aria-hidden="true">#</a></h1><p>This package is part of the mono repository &quot;@hpcc-js&quot; (aka Visualization Framework), for more information including quick start, demos and tutorials, please visit the main page on GitHub: <a href="https://github.com/hpcc-systems/Visualization" target="_blank" rel="noopener noreferrer">hpcc-systems/Visualization</a>.</p><h2 id="details" tabindex="-1">Details <a class="header-anchor" href="#details" aria-hidden="true">#</a></h2><p>The <strong>dgrid</strong> package contains the following visualizations:</p><h2 id="note-for-rollup-js-users" tabindex="-1">Note for Rollup.js users <a class="header-anchor" href="#note-for-rollup-js-users" aria-hidden="true">#</a></h2><p><strong>dgrid</strong> is dependent on <strong>dgrid-shim</strong> which requires some special configuration when bundling with Rollup.js - please see <a href="./../dgrid-shim/README.html">dgrid-shim</a> for more information.</p>',6)),o(a,null,{default:n(()=>e[0]||(e[0]=[t("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[t("pre",null,[t("code",null,`<div id="target" style="height:600px">
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
`)])],-1)])),_:1})])}var j=r(p,[["render",c]]);export{y as __pageData,j as default};
