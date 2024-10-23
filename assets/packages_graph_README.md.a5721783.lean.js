import{_ as t,c as p,a as o,e,w as c,r as l,o as u,b as a}from"./app.ab56574e.js";const y='{"title":"@hpcc-js/graph","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"}],"relativePath":"packages/graph/README.md"}',i={};function r(k,n,g,d,h,m){const s=l("ClientOnly");return u(),p("div",null,[n[1]||(n[1]=o(`<h1 id="hpcc-js-graph" tabindex="-1">@hpcc-js/graph <a class="header-anchor" href="#hpcc-js-graph" aria-hidden="true">#</a></h1><p>This package is part of the mono repository &quot;@hpcc-js&quot; (aka Visualization Framework), for more information including <a href="https://github.com/hpcc-systems/Visualization/wiki/Quick-Start" target="_blank" rel="noopener noreferrer">Quick Start</a>, <a href="https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html" target="_blank" rel="noopener noreferrer">Gallery</a> and <a href="https://github.com/hpcc-systems/Visualization/wiki/Tutorials" target="_blank" rel="noopener noreferrer">Tutorials</a>, please visit the main page on GitHub: <a href="https://github.com/hpcc-systems/Visualization" target="_blank" rel="noopener noreferrer">hpcc-systems/Visualization</a>.</p><h2 id="exported-widgets" tabindex="-1">Exported Widgets <a class="header-anchor" href="#exported-widgets" aria-hidden="true">#</a></h2><ul><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/graph/Sankey.js" target="_blank" rel="noopener noreferrer">Sankey</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/graph/Les%20Miserables.js" target="_blank" rel="noopener noreferrer">Graph</a> / <a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/graph/Different%20Nodes.js" target="_blank" rel="noopener noreferrer">Graph (Example 2)</a></li><li><a href="https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/graph/Custom%20Colors.js" target="_blank" rel="noopener noreferrer">Subgraph</a></li></ul><h2 id="stand-alone-html-example" tabindex="-1">Stand-alone HTML Example <a class="header-anchor" href="#stand-alone-html-example" aria-hidden="true">#</a></h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Simple Graph<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/util<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/common<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/api<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@hpcc-js/graph<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>placeholder<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span>400px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span>400px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
            <span class="token keyword">var</span> verts <span class="token operator">=</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string-property property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\uF007&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Jane Doe&quot;</span><span class="token punctuation">,</span> <span class="token string-property property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\uF007&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;123 Main Street&quot;</span><span class="token punctuation">,</span> <span class="token string-property property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\uF015&quot;</span><span class="token punctuation">,</span> <span class="token string-property property">&quot;centroid&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/graph&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Vertex</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">faChar</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>icon<span class="token punctuation">)</span>
                    <span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> chart <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/graph&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Graph</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span><span class="token string">&quot;placeholder&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">layout</span><span class="token punctuation">(</span><span class="token string">&quot;Circle&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">vertices</span><span class="token operator">:</span> verts<span class="token punctuation">,</span>
                    <span class="token literal-property property">edges</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/graph&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Edge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sourceVertex</span><span class="token punctuation">(</span>verts<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">targetVertex</span><span class="token punctuation">(</span>verts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span><span class="token string">&quot;@hpcc-js/graph&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Edge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sourceVertex</span><span class="token punctuation">(</span>verts<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">targetVertex</span><span class="token punctuation">(</span>verts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Other layout options:&quot;</span><span class="token punctuation">,</span>chart<span class="token punctuation">.</span>__meta_layout<span class="token punctuation">.</span>set<span class="token punctuation">)</span><span class="token punctuation">;</span>
        </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,6)),e(s,null,{default:c(()=>n[0]||(n[0]=[a("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[a("pre",null,[a("code",null,`<div id="target" style="height:600px">
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
`)])],-1)])),_:1})])}var x=t(i,[["render",r]]);export{y as __pageData,x as default};
