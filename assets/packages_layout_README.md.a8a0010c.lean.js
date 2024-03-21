import{_ as s,c as t,b as p,w as o,a as c,r as e,o as l,d as n}from"./app.70956d7b.js";const q='{"title":"@hpcc-js/layout","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"}],"relativePath":"packages/layout/README.md"}',u={},i=c("",6),k=n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="target" style="height:600px">
</div>
<script type="module">
    import { Column, Pie, Line, Step } from "@hpcc-js/chart";
    import { Carousel } from "@hpcc-js/layout"; //  Has dependency on "dgrid" so can't be used in a module...

    const columns = ["Subject", "Year 1", "Year 2", "Year 3"];
    const data = [
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ];

    const carousel = new Carousel()
        .widgets([
            new Pie().columns(columns).data(data),
            new Line().columns(columns).data(data),
            new Column().columns(columns).data(data),
            new Step().columns(columns).data(data)
        ])
        .target("target")
        .render()
        ;

    var active = 0;
    setInterval(function () {
        carousel.active(++active % 4).render();
    }, 3000);
<\/script>
`)])],-1);function r(g,m,d,h,y,f){const a=e("ClientOnly");return l(),t("div",null,[i,p(a,null,{default:o(()=>[k]),_:1})])}var _=s(u,[["render",r]]);export{q as __pageData,_ as default};
