import{_ as l,c as n,b as a,w as r,a as i,r as s,o as h,d as e}from"./app.70956d7b.js";const b='{"title":"@hpcc-js/chart","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"},{"level":2,"title":"Getting Started with @hpccjs","slug":"getting-started-with-hpccjs"}],"relativePath":"packages/chart/README.md"}',c={},o=i("",5),p=e("hpcc-preview",{content_selector:"pre > code",style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<head>
    <title>Simple Bar Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/common"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/api"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/chart"><\/script>
</head>
<body>
    <div id="placeholder" style="height:300px;"></div>
    <script>
        var chart = new window["@hpcc-js/chart"].Bar()
            .target("placeholder")
            .columns(["Subject", "Year 1", "Year 2", "Year 3"])
            .data([
                ["Geography", 75, 68, 65],
                ["English", 45, 55, -52],
                ["Math", 98, 92, 90],
                ["Science", 66, 60, 72]
            ])
            .render();
    <\/script>
</body>
`)])],-1),d=i("",2),m=e("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[e("pre",null,[e("code",null,`<div id="placeholder" style="width:100%;height:400px">
</div>
<script type="module">
    import { Contour } from "@hpcc-js/chart";

    new Contour()
        .target("placeholder")
        .columns(["A", "B"])
        .data([
            [10, 10],
            [20, 20],
            [20, 30],
            [30, 20],
            [40, 30],
            [30, 40],
            [10, 20],
            [20, 10]
        ])
        .contourBandwidth(80)
        .contourStrokeWidth(0)
        .yAxisType("linear")
        .xAxisType("ordinal")
        .xAxisTitle("A")
        .render()
        ;
<\/script>
`)])],-1);function u(f,_,g,y,k,x){const t=s("ClientOnly");return h(),n("div",null,[o,a(t,null,{default:r(()=>[p]),_:1}),d,a(t,null,{default:r(()=>[m]),_:1})])}var w=l(c,[["render",u]]);export{b as __pageData,w as default};
