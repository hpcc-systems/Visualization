import{_ as s,c as t,b as p,w as o,a as e,r as c,o as l,d as n}from"./app.70956d7b.js";const q='{"title":"@hpcc-js/graph","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"}],"relativePath":"packages/graph/README.md"}',u={},i=e("",6),r=n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="target" style="height:600px">
</div>
<script type="module">
    import { Graph2 } from "@hpcc-js/graph";
    import { CentroidVertex3, Vertex3 } from "@hpcc-js/react";

    const vertices = [
        {
            id: 0,
            text: "JAKE MCKEE",
            centroid: true,
            icon: {
                imageChar: "\uF508"
            },
            subText: {
                text: "03/26/2020",
                textFill: "#555555"
            },
            annotationMeta: [
                greyAnno(10, 15, -5),
                dAnno(15, -4),
                exclamationAnno(15, -4),
            ]

        },
        {
            id: 1,
            text: "123 Main St",
            icon: {
                imageChar: "\uF279",
            },
            subText: {
                text: "03/26/2020",
                textFill: "#555555"
            },
            annotationMeta: [
                greyAnno(13,5,-1),
                exclamationAnno(),
            ]
        },
        {
            id: 2,
            text: "555-55-5555",
            icon: {
                imageChar: "\uF2C2",
            },
            subText: {
                text: "03/26/2020",
                textFill: "#555555"
            },
            annotationMeta: [
                greyAnno(8,5,-1),
                exclamationAnno(),
            ]
        },
        {
            id: 3,
            text: "Jmckee@gmail.com",
            icon: {
                imageChar: "\uF1FA"
            },
            subText: {
                text: "03/26/2020",
                textFill: "#555555"
            },
            annotationMeta: [
                greyAnno(5,5,-1),
                exclamationAnno(),
            ]
        },
        {
            id: 4,
            text: "303-123-1234",
            icon: {
                imageChar: "\uF095"
            },
            subText: {
                text: "03/26/2020",
                textFill: "#555555"
            },
            annotationMeta: [
                greyAnno(5,5,-1),
                checkmarkAnno(),
            ]
        },
        {
            id: 5,
            text: "123039923",
            icon: {
                imageChar: "\uF155",
            },
            subText: {
                text: "03/26/2020",
                textFill: "#555555"
            },
            annotationMeta: [
                greyAnno(5,5,-1),
                checkmarkAnno()
            ]
        },
        {
            id: 6,
            text: "FL-2372-3982-9292-2929",
            icon: {
                imageChar: "\uF5DE",
            },
            subText: {
                text: "03/26/2020",
                textFill: "#555555"
            },
            annotationMeta: [
                greyAnno(5,5,-1),
                checkmarkAnno(),
            ]
        },
        {
            id: 7,
            text: "11.12.3.301.31",
            icon: {
                imageChar: "\uF57D"
            },
            subText: {
                text: "03/26/2020",
            },
            annotationMeta: [
                greyAnno(8,5,-1),
                exclamationAnno(),
            ]
        },
    ];

    function greyAnno(text, padding = 5, yOffset = -1){
        return {
            text: text+"",
            fill: "#555555",
            stroke: "#555555",
            textFill: "#ffffff",
            padding: padding,
            yOffset: yOffset
        }
    }
    function dAnno(){
        return {
            text: "D",
            fill: "#ED1C24",
            stroke: "#ED1C24",
            textFill: "#ffffff",
            fontFamily: "Arial",
            padding: 15,
            yOffset: -4
        };
    }
    function exclamationAnno(padding, yOffset){
        return {
            text: "\uF06A",
            fill: "#ED1C24",
            stroke: "#ED1C24",
            textFill: "#ffffff",
            fontFamily: "Arial",
            padding: padding,
            yOffset: yOffset,
            fontFamily: "'Font Awesome 5 Free'",
        };
    }
    function checkmarkAnno(padding, yOffset){
        return {
            text: "\uF058",
            fill: "#00802B",
            stroke: "#00802B",
            textFill: "#ffffff",
            fontFamily: "'Font Awesome 5 Free'",
            padding: padding,
            yOffset: yOffset,
        };
    }
    const graphData = { vertices };
    graphData.edges = vertices.slice(1).map((n,i)=>{
        return {
            id: i,
            source: graphData.vertices[0],
            target: graphData.vertices[i+1],
        }
    })

    new Graph2()
        .target("target")
        .centroidRenderer(CentroidVertex3)
        .vertexRenderer(Vertex3)
        .edgeColor("#287EC4")
        .edgeStrokeWidth(2)
        .edgeArcDepth(0)
        .data(graphData)
        .centroidColor("#777777")
        .on("vertex_click", (row, col, sel) => console.log("click", row, col, sel))
        .on("vertex_dblclick", (row, col, sel) => console.log("dblclick", row, col, sel))
        .on("vertex_mousein", (row, col, sel) => console.log("mousein", row, col, sel))
        .on("vertex_mouseover", (row, col, sel) => console.log("mouseover", row, col, sel))
        .on("vertex_mouseout", (row, col, sel) => console.log("mouseout", row, col, sel))
        .forceDirectedAlphaDecay(0.003)
        .layout("ForceDirected")
        .transitionDuration(0)
        .render()
        ;
<\/script>
`)])],-1);function k(g,h,d,m,f,y){const a=c("ClientOnly");return l(),t("div",null,[i,p(a,null,{default:o(()=>[r]),_:1})])}var w=s(u,[["render",k]]);export{q as __pageData,w as default};
