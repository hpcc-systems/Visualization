import{_ as a,c as o,b as e,d as r,o as t}from"./app.ab56574e.js";const h='{"title":"DataGraph","description":"","frontmatter":{},"headers":[],"relativePath":"packages/graph/docs/DataGraph.md"}',l={};function s(i,n,c,d,u,g){return t(),o("div",null,n[0]||(n[0]=[e("h1",{id:"datagraph",tabindex:"-1"},[r("DataGraph "),e("a",{class:"header-anchor",href:"#datagraph","aria-hidden":"true"},"#")],-1),e("div",{class:"language-sample-code"},[e("pre",null,[e("code",null,`import { AnnotationColumn, DataGraph } from "@hpcc-js/graph";

new DataGraph()
    .target("target")
    .categories([{
        id: 0,
        imageChar: "fa-car"
    },{
        id: 1,
        imageChar: "fa-user"
    },{
        id: 2,
        imageChar: "fa-user"
    }])
    .annotations([{
        id: 0,
        imageChar: "fa-plus",
        fill: "white",
        stroke: "whitesmoke",
        imageCharFill: "red"
    },{
        id: 1,
        imageChar: "fa-star",
        fill: "navy",
        imageCharFill: "white"
    }])
    .vertexColumns(["id", "label", "group", "centroid", "ann1", "ann2", "ann3"])
    .vertexCategoryColumn("group")
    .vertexIDColumn("id")
    .vertexLabelColumn("label")
    .vertexAnnotationColumns([
        { columnID: "ann1", annotationID: "0"},
        { columnID: "ann2", annotationID: "1"}
    ])
    .vertices([
        [0, "Myriel", 0, true],
        [1, "Napoleon", 1, false, true, true],
        [2, "Mlle.Baptistine", 1],
        [3, "Mme.Magloire", 1],
        [4, "CountessdeLo", 1],
        [5, "Geborand", 1],
        [6, "Champtercier", 1],
        [7, "Cravatte", 1],
        [8, "Count", 1],
        [9, "OldMan", 1],
        [10, "Labarre", 2]
    ])
    .edgeColumns(["id", "source", "target", "label", "weight"])
    .edgeIDColumn("id")
    .edgeSourceColumn("source")
    .edgeTargetColumn("target")
    .edgeLabelColumn("label")
    .edgeWeightColumn("weight")
    .edges([
        ["1->0", 1, 0, "XXX", 1],
        ["2->0", 2, 0, "", 8],
        ["3->0", 3, 0, "", 10],
        ["3->2", 3, 2, "", 6],
        ["4->0", 4, 0, "", 1],
        ["5->0", 5, 0, "", 1],
        ["6->0", 6, 0, "", 1],
        ["7->0", 7, 0, "", 1],
        ["8->0", 8, 0, "", 2],
        ["9->0", 9, 0, "XXX", 1]
    ])
    .on("vertex_click", (row, col, sel) => console.log("click", row, col, sel))
    .on("vertex_mousein", (row, col, sel) => console.log("mousein", row, col, sel))
    .on("vertex_mouseover", (row, col, sel) => console.log("mouseover", row, col, sel))
    .on("vertex_mouseout", (row, col, sel) => console.log("mouseout", row, col, sel))
    .render()
    ;

`)])],-1)]))}var p=a(l,[["render",s]]);export{h as __pageData,p as default};
