import { Graphviz as GraphvizWasm } from "@hpcc-js/wasm-graphviz";
import type { Subgraph } from "@hpcc-js/wasm-graphviz";
import type { Widget as WidgetT } from "@hpcc-js/common";
import { Graphviz as GraphvizWidget } from "../src/index.ts";

const arrowTypes: string[] = [
    "normal", "inv", "dot", "invdot", "odot", "invodot", "none", "tee",
    "empty", "invempty", "diamond", "odiamond", "ediamond", "crow",
    "box", "obox", "open", "halfopen", "vee"
];
const edgeStyles: string[] = ["solid", "dashed", "dotted", "bold", "tapered"];
const shapes: string[] = [
    "box", "polygon", "ellipse", "oval", "circle", "point", "egg", "triangle",
    "plaintext", "plain", "diamond", "trapezium", "parallelogram", "house",
    "pentagon", "hexagon", "septagon", "octagon", "doublecircle", "doubleoctagon",
    "tripleoctagon", "invtriangle", "invtrapezium", "invhouse", "Mdiamond",
    "Msquare", "Mcircle", "rect", "rectangle", "square", "star", "none",
    "underline", "cylinder", "note", "tab", "folder", "box3d", "component",
    "promoter", "cds", "terminator", "utr", "primersite", "restrictionsite",
    "fivepoverhang", "threepoverhang", "noverhang", "assembly", "signature",
    "insulator", "ribosite", "rnastab", "proteasesite", "proteinstab",
    "rpromoter", "rarrow", "larrow", "lpromoter", "record", "Mrecord"
];

export async function testGraphviz(): Promise<GraphvizWidget.Widget> {
    const graphviz = await GraphvizWasm.load();
    const g = graphviz.createGraph("G", "directed");

    // Graph-level attributes (mirrors GRAPH in test7)
    g.setGraphAttr("label", "Legend")
        .setGraphAttr("labelloc", "t")
        .setGraphAttr("fontsize", 24)
        .setGraphAttr("labeljust", "c")
        .setGraphAttr("fontnames", "svg")
        .setDefaultGraphAttr("fontname", "Arial")
        .setDefaultGraphAttr("labeljust", "l")
        .setDefaultNodeAttr("fontname", "Arial")
        .setDefaultEdgeAttr("fontname", "Arial");

    // ---- Arrow Types ----
    const ARROW_COLS = arrowTypes.length; // all in a single horizontal row
    const numArrowBlocks = Math.ceil(arrowTypes.length / ARROW_COLS); // = 1

    const sgArrows = g.addSubgraph("cluster_sgArrows");
    sgArrows.setAttr("label", "Arrow Types");

    const arrowSrcRows: Subgraph[] = [];
    const arrowTgtRows: Subgraph[] = [];
    for (let i = 0; i < numArrowBlocks; i++) {
        const src = sgArrows.addSubgraph(`sgArrowsRow${i}s`);
        src.setAttr("rank", "same");
        arrowSrcRows.push(src);
        const tgt = sgArrows.addSubgraph(`sgArrowsRow${i}t`);
        tgt.setAttr("rank", "same");
        arrowTgtRows.push(tgt);
    }

    arrowTypes.forEach((arrow, i) => {
        const rowIdx = Math.floor(i / ARROW_COLS);
        arrowSrcRows[rowIdx].addNode({ name: `a${i}s`, attrs: { id: `a${i}s`, label: "", shape: "none" } });
        arrowTgtRows[rowIdx].addNode({ name: `a${i}t`, attrs: { id: `a${i}t`, label: arrow, shape: "none" } });
    });

    arrowTypes.forEach((arrow, i) => {
        g.addEdge({
            tail: `a${i}s`,
            head: `a${i}t`,
            attrs: {
                id: `ea${i}`,
                label: edgeStyles[i % edgeStyles.length],
                style: edgeStyles[i % edgeStyles.length] as any,
                arrowhead: arrow as any,
                arrowtail: arrow as any
            }
        });
    });

    // ---- Vertex Shapes ----
    const SHAPE_COLS = 6;
    const numShapeRows = Math.ceil(shapes.length / SHAPE_COLS);

    const sgShapes = g.addSubgraph("cluster_sgShapes");
    sgShapes.setAttr("label", "Vertex Shapes");

    const shapeRows: Subgraph[] = [];
    for (let i = 0; i < numShapeRows; i++) {
        const row = sgShapes.addSubgraph(`sgShapesRow${i}`);
        row.setAttr("rank", "same");
        shapeRows.push(row);
    }

    shapes.forEach((shape, i) => {
        const rowIdx = Math.floor(i / SHAPE_COLS);
        shapeRows[rowIdx].addNode({ name: `s${i}`, attrs: { id: `s${i}`, label: shape, shape: shape as any } });
    });

    // Invisible inter-row edges to force vertical rank ordering
    for (let i = 0; i < numShapeRows - 1; i++) {
        g.addEdge({ tail: `s${i * SHAPE_COLS}`, head: `s${(i + 1) * SHAPE_COLS}`, attrs: { id: `esr${i}`, style: "invis" } });
    }

    // Invisible edge to rank arrow section above shapes section
    g.addEdge({ tail: "a11t", head: "s3", attrs: { id: "eClusterOrder", style: "invis" } });

    // ---- Custom SVG Content ----
    const sgCustom = g.addSubgraph("cluster_sgCustom");
    sgCustom.setAttr("label", "Custom SVG Content");

    sgCustom
        .addNode({ name: "c1", attrs: { id: "c1", label: "Custom Rect" } })
        .addNode({ name: "c2", attrs: { id: "c2", label: "Custom Circle" } })
        .addNode({ name: "c3", attrs: { id: "c3", label: "Pipeline Stage" } });
    g.setNodeAttr("c1", "svgWidth", 180)
        .setNodeAttr("c1", "svgHeight", 80)
        .setNodeAttr("c1", GraphvizWidget.CUSTOM_SVG, `<g>
            <rect x="0" y="0" width="180" height="80" rx="8" fill="#f9dede" stroke="#c00" stroke-width="2"/>
            <text x="90" y="22" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#242424">Custom Rect</text>
            <text x="90" y="38" text-anchor="middle" font-family="Arial" font-size="10" fill="#666">ID: c1</text>
            <rect x="10" y="52" width="72" height="20" rx="4" fill="#2e7d32" stroke="#1b5e20" stroke-width="1" data-action="approve" style="cursor:pointer"/>
            <text x="46" y="66" text-anchor="middle" font-family="Arial" font-size="10" fill="white" pointer-events="none">Approve</text>
            <rect x="98" y="52" width="72" height="20" rx="4" fill="#c62828" stroke="#7f0000" stroke-width="1" data-action="reject" style="cursor:pointer"/>
            <text x="134" y="66" text-anchor="middle" font-family="Arial" font-size="10" fill="white" pointer-events="none">Reject</text>
        </g>`)
        .setNodeAttr("c2", "svgWidth", 80)
        .setNodeAttr("c2", "svgHeight", 80)
        .setNodeAttr("c2", GraphvizWidget.CUSTOM_SVG, `<g>
            <circle cx="40" cy="32" r="28" fill="#4cc2ff" stroke="var(--gv-fg)" stroke-width="2"/>
            <text x="40" y="28" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="white">Custom</text>
            <text x="40" y="42" text-anchor="middle" font-family="Arial" font-size="11" fill="white">Circle</text>
            <rect x="15" y="62" width="50" height="16" rx="4" fill="#0277bd" stroke="#01579b" stroke-width="1" data-action="info" style="cursor:pointer"/>
            <text x="40" y="74" text-anchor="middle" font-family="Arial" font-size="9" fill="white" pointer-events="none">Info</text>
        </g>`)
        .setNodeAttr("c3", "svgWidth", 200)
        .setNodeAttr("c3", "svgHeight", 90)
        .setNodeAttr("c3", GraphvizWidget.CUSTOM_SVG, `<g>
            <rect x="0" y="0" width="200" height="90" rx="6" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
            <text x="100" y="20" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#1b5e20">Pipeline Stage</text>
            <text x="100" y="36" text-anchor="middle" font-family="Arial" font-size="10" fill="#555">Status: Idle</text>
            <rect x="8" y="54" width="55" height="20" rx="4" fill="#1565c0" stroke="#0d47a1" stroke-width="1" data-action="run" style="cursor:pointer"/>
            <text x="35" y="68" text-anchor="middle" font-family="Arial" font-size="10" fill="white" pointer-events="none">Run</text>
            <rect x="73" y="54" width="54" height="20" rx="4" fill="#f57f17" stroke="#e65100" stroke-width="1" data-action="skip" style="cursor:pointer"/>
            <text x="100" y="68" text-anchor="middle" font-family="Arial" font-size="10" fill="white" pointer-events="none">Skip</text>
            <rect x="137" y="54" width="55" height="20" rx="4" fill="#6a1b9a" stroke="#4a148c" stroke-width="1" data-action="reset" style="cursor:pointer"/>
            <text x="164" y="68" text-anchor="middle" font-family="Arial" font-size="10" fill="white" pointer-events="none">Reset</text>
        </g>`)
        .addEdge({ tail: "c1", head: "c2", attrs: { id: "ec1" } })
        .addEdge({ tail: "c2", head: "c3", attrs: { id: "ec2" } });

    // ---- Custom HTML Content ----
    const sgHtmlContent = g.addSubgraph("cluster_sgHtmlContent");
    sgHtmlContent.setAttr("label", "Custom HTML Content");

    sgHtmlContent
        .addNode({ name: "h1", attrs: { id: "h1", label: "HTML Card" } })
        .addNode({ name: "h2", attrs: { id: "h2", label: "HTML Progress" } });
    g.setNodeAttr("h1", "svgWidth", 200)
        .setNodeAttr("h1", "svgHeight", 100)
        .setNodeAttr("h1", GraphvizWidget.CUSTOM_HTML, `<div style="box-sizing:border-box;width:200px;height:100px;padding:8px;font-family:Arial,sans-serif;background:#fff8e1;border:2px solid #f9a825;border-radius:8px;">
  <div style="font-weight:bold;font-size:13px;color:#e65100;margin-bottom:4px;">HTML Card</div>
  <div style="font-size:11px;color:#555;margin-bottom:8px;">Rich content via &lt;foreignObject&gt;</div>
  <div style="display:flex;gap:6px;">
    <button data-action="edit" style="flex:1;padding:3px 0;font-size:11px;background:#1565c0;color:#fff;border:none;border-radius:4px;cursor:pointer;">Edit</button>
    <button data-action="delete" style="flex:1;padding:3px 0;font-size:11px;background:#c62828;color:#fff;border:none;border-radius:4px;cursor:pointer;">Delete</button>
  </div>
</div>`)
        .setNodeAttr("h2", "svgWidth", 200)
        .setNodeAttr("h2", "svgHeight", 90)
        .setNodeAttr("h2", GraphvizWidget.CUSTOM_HTML, `<div style="box-sizing:border-box;width:200px;height:90px;padding:8px;font-family:Arial,sans-serif;background:#e8f5e9;border:2px solid #388e3c;border-radius:8px;">
  <div style="font-weight:bold;font-size:12px;color:#1b5e20;margin-bottom:6px;">Build Progress</div>
  <div style="font-size:10px;color:#555;margin-bottom:4px;">Compiling... 68%</div>
  <div style="background:#c8e6c9;border-radius:4px;height:10px;overflow:hidden;">
    <div style="width:68%;height:100%;background:#2e7d32;"></div>
  </div>
  <div style="margin-top:8px;display:flex;gap:6px;">
    <button data-action="cancel" style="flex:1;padding:3px 0;font-size:11px;background:#b71c1c;color:#fff;border:none;border-radius:4px;cursor:pointer;">Cancel</button>
    <button data-action="details" style="flex:1;padding:3px 0;font-size:11px;background:#0277bd;color:#fff;border:none;border-radius:4px;cursor:pointer;">Details</button>
  </div>
</div>`)
        .addEdge({ tail: "h1", head: "h2", attrs: { id: "ec3" } });

    // ---- Hyperlinks & Tooltips ----
    const sgHyperlinks = g.addSubgraph("cluster_sgHyperlinks");
    sgHyperlinks
        .setAttr("label", "Hyperlinks & Tooltips")
        .addNode({ name: "hl_url_blank", attrs: { id: "hl_url_blank", label: "GitHub\n(URL, target=_blank)", shape: "box", URL: "https://github.com", target: "_blank", tooltip: "Opens GitHub in a new tab", fillcolor: "#ddeeff", style: "filled" } })
        .addNode({ name: "hl_href_blank", attrs: { id: "hl_href_blank", label: "Graphviz Docs\n(href, target=_blank)", shape: "ellipse", href: "https://graphviz.org", target: "_blank", tooltip: "Graphviz documentation \u2014 opens in a new tab", fillcolor: "#ddffdd", style: "filled" } })
        .addNode({ name: "hl_url_same", attrs: { id: "hl_url_same", label: "Node Attrs Docs\n(URL, no target)", shape: "diamond", URL: "https://graphviz.org/doc/info/attrs.html", tooltip: "Opens in the same tab (default)", fillcolor: "#fff0dd", style: "filled" } })
        .addNode({ name: "hl_tooltip_only", attrs: { id: "hl_tooltip_only", label: "Hover me\n(tooltip only)", shape: "box", tooltip: "This node has a tooltip but no hyperlink", fillcolor: "#f0f0f0", style: "filled" } });

    g.addEdge({ tail: "hl_url_blank", head: "hl_href_blank", attrs: { id: "hl_e1", label: "edge URL", edgeURL: "https://graphviz.org/doc/info/attrs.html#k:edgeURL", target: "_blank", edgetooltip: "This edge also has a URL" } })
        .addEdge({ tail: "hl_href_blank", head: "hl_url_same", attrs: { id: "hl_e2" } })
        .addEdge({ tail: "hl_url_same", head: "hl_tooltip_only", attrs: { id: "hl_e3" } });

    // ---- Examples (from https://renenyffenegger.ch/notes/tools/Graphviz/examples/index) ----
    const sgExamples = g.addSubgraph({ name: "cluster_sgExamples", attrs: { id: "sgExamples", label: "Examples" } });

    // 1. Dotted edges etc
    const sgExDotted = sgExamples.addSubgraph({ name: "cluster_sgExDotted", attrs: { label: "Dotted edges etc" } });
    sgExDotted
        .addNode({ name: "exDot_A", attrs: { id: "exDot_A", label: "A", shape: "diamond" } })
        .addNode({ name: "exDot_B", attrs: { id: "exDot_B", label: "B", shape: "box" } })
        .addNode({ name: "exDot_C", attrs: { id: "exDot_C", label: "C", shape: "circle" } })
        .addNode({ name: "exDot_D", attrs: { id: "exDot_D", label: "D" } });
    g.addEdge({ tail: "exDot_A", head: "exDot_B", attrs: { id: "exDot_e1", style: "dashed", color: "grey" } })
        .addEdge({ tail: "exDot_A", head: "exDot_C", attrs: { id: "exDot_e2", color: "black:invis:black" } })
        .addEdge({ tail: "exDot_A", head: "exDot_D", attrs: { id: "exDot_e3", penwidth: 5, arrowhead: "none" } });

    // 2. Shape: record vs. plaintext
    const sgExRecord = sgExamples.addSubgraph({ name: "cluster_sgExRecord", attrs: { label: "Shape: record vs. plaintext" } });
    sgExRecord
        .addNode({ name: "exRec_A", attrs: { id: "exRec_A", shape: "record", label: "shape=record|{above|middle|below}|right", fontname: "Arial" } })
        .addNode({ name: "exRec_B", attrs: { id: "exRec_B", shape: "plaintext", label: "shape=plaintext|{curly|braces and|bars without}|effect", fontname: "Arial" } });

    // 3. Multiple edges
    const sgExMulti = sgExamples.addSubgraph({ name: "cluster_sgExMulti", attrs: { label: "Multiple edges" } });
    sgExMulti
        .addNode({ name: "exMul_A", attrs: { id: "exMul_A", label: "A" } })
        .addNode({ name: "exMul_B", attrs: { id: "exMul_B", label: "B" } })
        .addNode({ name: "exMul_C", attrs: { id: "exMul_C", label: "C" } })
        .addNode({ name: "exMul_D", attrs: { id: "exMul_D", label: "D" } })
        .addNode({ name: "exMul_F", attrs: { id: "exMul_F", label: "F" } });
    g.addEdge({ tail: "exMul_A", head: "exMul_B", attrs: { id: "exMul_e1" } })
        .addEdge({ tail: "exMul_A", head: "exMul_C", attrs: { id: "exMul_e2" } })
        .addEdge({ tail: "exMul_A", head: "exMul_D", attrs: { id: "exMul_e3" } })
        .addEdge({ tail: "exMul_B", head: "exMul_F", attrs: { id: "exMul_e4" } })
        .addEdge({ tail: "exMul_C", head: "exMul_F", attrs: { id: "exMul_e5" } })
        .addEdge({ tail: "exMul_D", head: "exMul_F", attrs: { id: "exMul_e6" } });

    // 4. Left, mid and right aligned text
    const sgExAlign = sgExamples.addSubgraph({ name: "cluster_sgExAlign", attrs: { label: "Left, mid and right aligned text" } });
    sgExAlign
        .addNode({ name: "exAlign_a", attrs: { id: "exAlign_a", shape: "record", fontname: "Arial", label: "one\\ltwo three\\lfour five six seven\\l" } })
        .addNode({ name: "exAlign_b", attrs: { id: "exAlign_b", shape: "record", fontname: "Arial", label: "one\\ntwo three\\nfour five six seven" } })
        .addNode({ name: "exAlign_c", attrs: { id: "exAlign_c", shape: "record", fontname: "Arial", label: "one\\rtwo three\\rfour five six seven\\r" } });
    g.addEdge({ tail: "exAlign_a", head: "exAlign_b", attrs: { id: "exAlign_e1" } })
        .addEdge({ tail: "exAlign_b", head: "exAlign_c", attrs: { id: "exAlign_e2" } });

    // 5. Giving the graph a title
    const sgExTitle = sgExamples.addSubgraph({ name: "cluster_sgExTitle", attrs: { label: "Giving the graph a title" } });
    sgExTitle
        .addNode({ name: "exTitle_FOO", attrs: { id: "exTitle_FOO", label: "FOO", shape: "plaintext" } })
        .addNode({ name: "exTitle_BAR", attrs: { id: "exTitle_BAR", label: "BAR", shape: "plaintext" } })
        .addNode({ name: "exTitle_BAZ", attrs: { id: "exTitle_BAZ", label: "BAZ", shape: "plaintext" } });
    g.addEdge({ tail: "exTitle_FOO", head: "exTitle_BAR", attrs: { id: "exTitle_e1" } })
        .addEdge({ tail: "exTitle_FOO", head: "exTitle_BAZ", attrs: { id: "exTitle_e2" } });

    // 6. HTML like labels
    const sgExHtmlLabel = sgExamples.addSubgraph({ name: "cluster_sgExHtmlLabel", attrs: { label: "HTML like labels" } });
    sgExHtmlLabel
        .addNode({ name: "exHtml_FOO", attrs: { id: "exHtml_FOO", shape: "plaintext" } })
        .addNode({ name: "exHtml_BAR", attrs: { id: "exHtml_BAR", label: "BAR", shape: "plaintext" } })
        .addNode({ name: "exHtml_BAZ", attrs: { id: "exHtml_BAZ", label: "BAZ", shape: "plaintext" } });
    g.setNodeHtmlAttr("exHtml_FOO", "label", "The <font color='red'><b>foo</b></font>,<br/> the <font point-size='20'>bar</font> and<br/> the <i>baz</i>")
        .addEdge({ tail: "exHtml_FOO", head: "exHtml_BAR", attrs: { id: "exHtml_e1" } })
        .addEdge({ tail: "exHtml_FOO", head: "exHtml_BAZ", attrs: { id: "exHtml_e2" } });

    // 7. rank
    const sgExRank = sgExamples.addSubgraph({ name: "cluster_sgExRank", attrs: { label: "rank" } });
    sgExRank
        .addNode({ name: "exRank_rA", attrs: { id: "exRank_rA", label: "rA", shape: "record" } })
        .addNode({ name: "exRank_sA", attrs: { id: "exRank_sA", label: "sA", shape: "record" } })
        .addNode({ name: "exRank_tA", attrs: { id: "exRank_tA", label: "tA", shape: "record" } })
        .addNode({ name: "exRank_uB", attrs: { id: "exRank_uB", label: "uB", shape: "record" } })
        .addNode({ name: "exRank_vB", attrs: { id: "exRank_vB", label: "vB", shape: "record" } })
        .addNode({ name: "exRank_wB", attrs: { id: "exRank_wB", label: "wB", shape: "record" } })
        .addNode({ name: "exRank_t", attrs: { id: "exRank_t", label: "t", shape: "record" } })
        .addNode({ name: "exRank_u", attrs: { id: "exRank_u", label: "u", shape: "record" } });
    g.addEdge({ tail: "exRank_t", head: "exRank_rA", attrs: { id: "exRank_e3" } })
        .addEdge({ tail: "exRank_rA", head: "exRank_sA", attrs: { id: "exRank_e1" } })
        .addEdge({ tail: "exRank_sA", head: "exRank_vB", attrs: { id: "exRank_e2" } })
        .addEdge({ tail: "exRank_uB", head: "exRank_vB", attrs: { id: "exRank_e4" } })
        .addEdge({ tail: "exRank_wB", head: "exRank_u", attrs: { id: "exRank_e5" } })
        .addEdge({ tail: "exRank_wB", head: "exRank_tA", attrs: { id: "exRank_e6" } });

    // 8. Subgraph (clusters)
    const sgExSubgraph = sgExamples.addSubgraph({ name: "cluster_sgExSubgraph", attrs: { id: "sgExSubgraph", label: "Subgraph (clusters)" } });
    sgExSubgraph
        .addNode({ name: "exSg_nd_1", attrs: { id: "exSg_nd_1", label: "Node 1", shape: "record" } })
        .addNode({ name: "exSg_nd_2", attrs: { id: "exSg_nd_2", label: "Node 2", shape: "record" } })
        .addNode({ name: "exSg_nd_3_a", attrs: { id: "exSg_nd_3_a", label: "Above Right Node 3", shape: "record" } })
        .addNode({ name: "exSg_nd_4", attrs: { id: "exSg_nd_4", label: "Node 4", shape: "record" } });
    const sgExSgClusterR = sgExSubgraph.addSubgraph({ name: "cluster_sgExSgClusterR", attrs: { id: "sgExSgClusterR", label: "" } });
    sgExSgClusterR
        .addNode({ name: "exSg_nd_3_l", attrs: { id: "exSg_nd_3_l", label: "Left of Node 3", shape: "record" } })
        .addNode({ name: "exSg_nd_3", attrs: { id: "exSg_nd_3", label: "Node 3", shape: "record" } })
        .addNode({ name: "exSg_nd_3_r", attrs: { id: "exSg_nd_3_r", label: "Right of Node 3", shape: "record" } });
    sgExSgClusterR.addSubgraph("sgExSgRankSame").setAttr("rank", "same");
    g.addEdge({ tail: "exSg_nd_3_a", head: "exSg_nd_3_r", attrs: { id: "exSg_e1" } })
        .addEdge({ tail: "exSg_nd_1", head: "exSg_nd_2", attrs: { id: "exSg_e2" } })
        .addEdge({ tail: "exSg_nd_2", head: "exSg_nd_3", attrs: { id: "exSg_e3" } })
        .addEdge({ tail: "exSg_nd_3", head: "exSg_nd_4", attrs: { id: "exSg_e4" } })
        .addEdge({ tail: "exSg_nd_3_l", head: "exSg_nd_3", attrs: { id: "exSg_e5", color: "grey", arrowhead: "none" } })
        .addEdge({ tail: "exSg_nd_3", head: "exSg_nd_3_r", attrs: { id: "exSg_e6", color: "grey", arrowhead: "none" } });

    // 9. Nested clusters
    const sgExNested = sgExamples.addSubgraph({ name: "cluster_sgExNested", attrs: { label: "Nested clusters" } });
    const sgExNestParent = sgExNested.addSubgraph({ name: "cluster_sgExNestParent", attrs: { label: "Parent" } });
    const sgExNestC1 = sgExNestParent.addSubgraph({ name: "cluster_sgExNestC1", attrs: { label: "Child one" } });
    const sgExNestGC1 = sgExNestC1.addSubgraph({ name: "cluster_sgExNestGC1", attrs: { label: "Grand-Child one" } });
    const sgExNestGC2 = sgExNestC1.addSubgraph({ name: "cluster_sgExNestGC2", attrs: { label: "Grand-Child two" } });
    const sgExNestC2 = sgExNestParent.addSubgraph({ name: "cluster_sgExNestC2", attrs: { label: "Child two" } });
    sgExNestC1.addNode({ name: "exNest_a", attrs: { id: "exNest_a", label: "a" } });
    sgExNestGC1.addNode({ name: "exNest_b", attrs: { id: "exNest_b", label: "b" } });
    sgExNestGC2
        .addNode({ name: "exNest_c", attrs: { id: "exNest_c", label: "c" } })
        .addNode({ name: "exNest_d", attrs: { id: "exNest_d", label: "d" } });
    sgExNestC2.addNode({ name: "exNest_e", attrs: { id: "exNest_e", label: "e" } });

    // 10. HTML table
    const sgExHtmlTable = sgExamples.addSubgraph({ name: "cluster_sgExHtmlTable", attrs: { label: "HTML table" } });
    sgExHtmlTable.addNode({ name: "exHtmlTbl_a", attrs: { id: "exHtmlTbl_a", shape: "plaintext", color: "blue" } });
    g.setNodeHtmlAttr("exHtmlTbl_a", "label",
        "<table border='1' cellborder='0'>" +
        "<tr><td>col 1</td><td>foo</td></tr>" +
        "<tr><td>COL 2</td><td>bar</td></tr>" +
        "</table>");

    // 11. Nested HTML table
    const sgExNestedHtmlTable = sgExamples.addSubgraph({ name: "cluster_sgExNestedHtmlTable", attrs: { label: "Nested HTML table" } });
    sgExNestedHtmlTable.addNode({ name: "exNestTbl_a", attrs: { id: "exNestTbl_a", shape: "plaintext" } });
    g.setNodeHtmlAttr("exNestTbl_a", "label",
        "<table border='0' cellborder='1' color='blue' cellspacing='0'>" +
        "<tr><td>foo</td><td>bar</td><td>baz</td></tr>" +
        "<tr><td cellpadding='4'>" +
        "<table color='orange' cellspacing='0'>" +
        "<tr><td>one  </td><td>two  </td><td>three</td></tr>" +
        "<tr><td>four </td><td>five </td><td>six  </td></tr>" +
        "<tr><td>seven</td><td>eight</td><td>nine </td></tr>" +
        "</table>" +
        "</td>" +
        "<td colspan='2' rowspan='2'>" +
        "<table color='pink' border='0' cellborder='1' cellpadding='10' cellspacing='0'>" +
        "<tr><td>eins</td><td>zwei</td><td rowspan='2'>drei<br/>sechs</td></tr>" +
        "<tr><td>vier</td><td>f\u00fcnf</td></tr>" +
        "</table>" +
        "</td>" +
        "</tr>" +
        "<tr><td>abc</td></tr>" +
        "</table>");

    // 12. Colors
    const sgExColors = sgExamples.addSubgraph({ name: "cluster_sgExColors", attrs: { label: "Colors" } });
    sgExColors.addNode({ name: "exCol_some_node", attrs: { id: "exCol_some_node", shape: "plaintext" } });
    g.setNodeHtmlAttr("exCol_some_node", "label",
        '<table border="0" cellborder="1" cellspacing="0">' +
        '<tr><td bgcolor="yellow">Foo</td></tr>' +
        '<tr><td bgcolor="lightblue"><font color="#0000ff">Bar</font></td></tr>' +
        '<tr><td bgcolor="#f0e3ff"><font color="#ff1020">Baz</font></td></tr>' +
        "</table>");

    // 13. Rounded box
    const sgExRounded = sgExamples.addSubgraph({ name: "cluster_sgExRounded", attrs: { label: "Rounded box" } });
    sgExRounded.addNode({ name: "exRnd_a", attrs: { id: "exRnd_a", shape: "plaintext" } });
    g.setNodeHtmlAttr("exRnd_a", "label",
        "<table border='1' cellborder='0' style='rounded'>" +
        "<tr><td>col 1</td><td>foo</td></tr>" +
        "<tr><td>COL 2</td><td>bar</td></tr>" +
        "</table>");

    // 14. Ports
    const sgExPorts = sgExamples.addSubgraph({ name: "cluster_sgExPorts", attrs: { label: "Ports" } });
    sgExPorts
        .addNode({ name: "exPort_parent", attrs: { id: "exPort_parent", shape: "plaintext" } })
        .addNode({ name: "exPort_child1", attrs: { id: "exPort_child1", shape: "plaintext" } })
        .addNode({ name: "exPort_child2", attrs: { id: "exPort_child2", shape: "plaintext" } })
        .addNode({ name: "exPort_child3", attrs: { id: "exPort_child3", shape: "plaintext" } });
    g.setNodeHtmlAttr("exPort_parent", "label",
        "<table border='1' cellborder='1'>" +
        "<tr><td colspan='3'>The foo, the bar and the baz</td></tr>" +
        "<tr><td port='port_one'>First port</td><td port='port_two'>Second port</td><td port='port_three'>Third port</td></tr>" +
        "</table>");
    g.setNodeHtmlAttr("exPort_child1", "label", "<table border='1' cellborder='0'><tr><td>1</td></tr></table>");
    g.setNodeHtmlAttr("exPort_child2", "label", "<table border='1' cellborder='0'><tr><td>2</td></tr></table>");
    g.setNodeHtmlAttr("exPort_child3", "label", "<table border='1' cellborder='0'><tr><td>3</td></tr></table>");
    g.addEdge({ tail: "exPort_parent", head: "exPort_child1", attrs: { id: "exPort_e1" } })
        .setEdgeAttr("exPort_parent", "exPort_child1", "", "tailport", "port_one")
        .addEdge({ tail: "exPort_parent", head: "exPort_child2", attrs: { id: "exPort_e2" } })
        .setEdgeAttr("exPort_parent", "exPort_child2", "", "tailport", "port_two")
        .addEdge({ tail: "exPort_parent", head: "exPort_child3", attrs: { id: "exPort_e3" } })
        .setEdgeAttr("exPort_parent", "exPort_child3", "", "tailport", "port_three");

    // 15. Project Dependencies
    const sgExProj = sgExamples.addSubgraph({ name: "cluster_sgExProj", attrs: { label: "Project Dependencies" } });
    sgExProj
        .addNode({ name: "exProj_menu", attrs: { id: "exProj_menu", shape: "plaintext", fontname: "Sans serif", fontsize: 8 } })
        .addNode({ name: "exProj_ingredients", attrs: { id: "exProj_ingredients", shape: "plaintext", fontname: "Sans serif", fontsize: 8 } })
        .addNode({ name: "exProj_invitation", attrs: { id: "exProj_invitation", shape: "plaintext", fontname: "Sans serif", fontsize: 8 } })
        .addNode({ name: "exProj_cook", attrs: { id: "exProj_cook", shape: "plaintext", fontname: "Sans serif", fontsize: 8 } })
        .addNode({ name: "exProj_table", attrs: { id: "exProj_table", shape: "plaintext", fontname: "Sans serif", fontsize: 8 } })
        .addNode({ name: "exProj_eat", attrs: { id: "exProj_eat", shape: "plaintext", fontname: "Sans serif", fontsize: 8 } });
    g.setNodeHtmlAttr("exProj_menu", "label",
        '<table border="1" cellborder="0" cellspacing="1">' +
        '<tr><td align="left"><b>Task 1</b></td></tr>' +
        '<tr><td align="left">Choose Menu</td></tr>' +
        '<tr><td align="left"><font color="darkgreen">done</font></td></tr>' +
        "</table>");
    g.setNodeHtmlAttr("exProj_ingredients", "label",
        '<table border="1" cellborder="0" cellspacing="1">' +
        '<tr><td align="left"><b>Task 2</b></td></tr>' +
        '<tr><td align="left">Buy ingredients</td></tr>' +
        '<tr><td align="left"><font color="darkgreen">done</font></td></tr>' +
        "</table>");
    g.setNodeHtmlAttr("exProj_invitation", "label",
        '<table border="1" cellborder="0" cellspacing="1">' +
        '<tr><td align="left"><b>Task 4</b></td></tr>' +
        '<tr><td align="left">Send invitation</td></tr>' +
        '<tr><td align="left"><font color="darkgreen">done</font></td></tr>' +
        "</table>");
    g.setNodeHtmlAttr("exProj_cook", "label",
        '<table border="1" cellborder="0" cellspacing="1">' +
        '<tr><td align="left"><b>Task 5</b></td></tr>' +
        '<tr><td align="left">Cook</td></tr>' +
        '<tr><td align="left"><font color="red">todo</font></td></tr>' +
        "</table>");
    g.setNodeHtmlAttr("exProj_table", "label",
        '<table border="1" cellborder="0" cellspacing="1">' +
        '<tr><td align="left"><b>Task 3</b></td></tr>' +
        '<tr><td align="left">Lay table</td></tr>' +
        '<tr><td align="left"><font color="red">todo</font></td></tr>' +
        "</table>");
    g.setNodeHtmlAttr("exProj_eat", "label",
        '<table border="1" cellborder="0" cellspacing="1">' +
        '<tr><td align="left"><b>Task 6</b></td></tr>' +
        '<tr><td align="left">Eat</td></tr>' +
        '<tr><td align="left"><font color="red">todo</font></td></tr>' +
        "</table>");
    g.addEdge({ tail: "exProj_menu", head: "exProj_ingredients", attrs: { id: "exProj_e1" } })
        .addEdge({ tail: "exProj_ingredients", head: "exProj_cook", attrs: { id: "exProj_e2" } })
        .addEdge({ tail: "exProj_invitation", head: "exProj_cook", attrs: { id: "exProj_e3" } })
        .addEdge({ tail: "exProj_table", head: "exProj_eat", attrs: { id: "exProj_e4" } })
        .addEdge({ tail: "exProj_cook", head: "exProj_eat", attrs: { id: "exProj_e5" } });

    const graphvizWidget = new class extends GraphvizWidget.Widget {
        render(callback?: (w: WidgetT) => void): this {
            return super.render((w: WidgetT) => {
                this.clearClass("complete");
                this.clearClass("failed");
                this.clearClass("running");
                this.clearClass("unknown");

                this.setClass("unknown", ["s17", "s19", "s21", "s23", "s25", "s27", "s29", "s31"]);
                this.setClass("complete", [
                    "s1", "s3", "s5", "s7", "s9", "s11", "s13", "s15",
                    "exSg_nd_1", "exSg_nd_2", "exSg_nd_3_a", "exSg_nd_3_l", "exSg_nd_3", "exSg_nd_3_r", "exSg_nd_4",
                    "exSg_e1", "exSg_e2", "exSg_e3", "exSg_e4", "exSg_e5", "exSg_e6",
                    "sgExSubgraph", "sgExSgClusterR",
                ]);
                this.setClass("failed", ["s0", "s2", "s4", "s6", "s8", "s10", "s12", "s14"]);
                this.setClass("running", ["s16", "s18", "s20", "s22", "s24", "s26", "s28", "s30"]);

                callback?.(w);
            });
        }

        vertexButtonClicked(id: string, action: string) {
            console.info(`[testGraphviz] Button clicked - node: "${id}", action: "${action}"`);
        }
    }().data(g);
    return graphvizWidget;
}
