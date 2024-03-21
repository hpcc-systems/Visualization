import{_ as s,c as t,b as p,w as o,a as e,r as c,o as l,d as n}from"./app.70956d7b.js";const b='{"title":"@hpcc-js/map","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"}],"relativePath":"packages/map/README.md"}',u={},i=e("",6),r=n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="target" style="height:600px">
</div>
<script type="module">
    import { Leaflet } from "@hpcc-js/map";

    new Leaflet.ClusterPins()
        .target("target")
        .columns(["latitude", "longitude", "color", "icon"])
        .data([
            [51.897969, -8.475438, "green", "fa-plus"],
            [35.652930, 139.687128],
            [37.665074, -122.384375, "navy"],
            [32.690680, -117.178540],
            [39.709455, -104.969859],
            [41.244123, -95.961610, "navy"],
            [32.688980, -117.192040],
            [45.786490, -108.526600],
            [45.796180, -108.535652],
            [45.774320, -108.494370],
            [45.777062, -108.549835, "red", "fa-minus"]
        ])
        .mapType("MapBox")
        .latitudeColumn("latitude")
        .longitudeColumn("longitude")
        .faCharColumn("icon")
        .fillColorColumn("color")
        .render()
        ;
<\/script>
`)])],-1);function k(g,m,h,d,f,q){const a=c("ClientOnly");return l(),t("div",null,[i,p(a,null,{default:o(()=>[r]),_:1})])}var _=s(u,[["render",k]]);export{b as __pageData,_ as default};
