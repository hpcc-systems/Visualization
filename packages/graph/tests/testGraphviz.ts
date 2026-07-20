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

    const sgArrows = g.addSubgraph("sgArrows");
    sgArrows.setAttr("label", "Arrow Types");

    const arrowSrcRows: Subgraph[] = [];
    const arrowTgtRows: Subgraph[] = [];
    for (let i = 0; i < numArrowBlocks; i++) {
        const src = sgArrows.addSubgraph(`sgArrowsRow${i}s`, { color: "none" });
        src.setAttr("rank", "same");
        arrowSrcRows.push(src);
        const tgt = sgArrows.addSubgraph(`sgArrowsRow${i}t`, { color: "none" });
        tgt.setAttr("rank", "same");
        arrowTgtRows.push(tgt);
    }

    arrowTypes.forEach((arrow, i) => {
        const rowIdx = Math.floor(i / ARROW_COLS);
        arrowSrcRows[rowIdx].addNode(`a${i}s`, { label: "", shape: "none" });
        arrowTgtRows[rowIdx].addNode(`a${i}t`, { label: arrow, shape: "none" });
    });

    arrowTypes.forEach((arrow, i) => {
        g.addEdge(`a${i}s`, `a${i}t`, {
            id: `ea${i}`,
            label: edgeStyles[i % edgeStyles.length],
            style: edgeStyles[i % edgeStyles.length] as any,
            arrowhead: arrow as any,
            arrowtail: arrow as any
        });
    });

    // ---- Vertex Shapes ----
    const SHAPE_COLS = 6;
    const numShapeRows = Math.ceil(shapes.length / SHAPE_COLS);

    const sgShapes = g.addSubgraph("sgShapes");
    sgShapes.setAttr("label", "Vertex Shapes");

    const shapeRows: Subgraph[] = [];
    for (let i = 0; i < numShapeRows; i++) {
        const row = sgShapes.addSubgraph(`sgShapesRow${i}`, { color: "none", bgcolor: "none" });

        row.setAttr("rank", "same");
        shapeRows.push(row);
    }

    shapes.forEach((shape, i) => {
        const rowIdx = Math.floor(i / SHAPE_COLS);
        shapeRows[rowIdx].addNode(`s${i}`, { label: shape, shape: shape as any });
    });

    // Invisible inter-row edges to force vertical rank ordering
    for (let i = 0; i < numShapeRows - 1; i++) {
        g.addEdge(`s${i * SHAPE_COLS}`, `s${(i + 1) * SHAPE_COLS}`, { id: `esr${i}`, style: "invis" });
    }

    // Invisible edge to rank arrow section above shapes section
    g.addEdge("a11t", "s3", { id: "eClusterOrder", style: "invis" });

    // ---- Custom SVG Content ----
    const sgCustom = g.addSubgraph("sgCustom");
    sgCustom.setAttr("label", "Custom SVG Content");

    sgCustom
        .addNode("c1", { label: "Custom Rect" })
        .addNode("c2", { label: "Custom Circle" })
        .addNode("c3", { label: "Pipeline Stage" });
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
        .addEdge("c1", "c2", { id: "ec1" })
        .addEdge("c2", "c3", { id: "ec2" });

    // ---- Custom HTML Content ----
    const sgHtmlContent = g.addSubgraph("sgHtmlContent");
    sgHtmlContent.setAttr("label", "Custom HTML Content");

    sgHtmlContent
        .addNode("h1", { label: "HTML Card" })
        .addNode("h2", { label: "HTML Progress" });
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
        .addEdge("h1", "h2", { id: "ec3" });

    // ---- Hyperlinks & Tooltips ----
    const sgHyperlinks = g.addSubgraph("sgHyperlinks");
    sgHyperlinks
        .setAttr("label", "Hyperlinks & Tooltips")
        .addNode("hl_url_blank", { label: "GitHub\n(URL, target=_blank)", shape: "box", URL: "https://github.com", target: "_blank", tooltip: "Opens GitHub in a new tab", fillcolor: "#ddeeff", style: "filled" })
        .addNode("hl_href_blank", { label: "Graphviz Docs\n(href, target=_blank)", shape: "ellipse", href: "https://graphviz.org", target: "_blank", tooltip: "Graphviz documentation \u2014 opens in a new tab", fillcolor: "#ddffdd", style: "filled" })
        .addNode("hl_url_same", { label: "Node Attrs Docs\n(URL, no target)", shape: "diamond", URL: "https://graphviz.org/doc/info/attrs.html", tooltip: "Opens in the same tab (default)", fillcolor: "#fff0dd", style: "filled" })
        .addNode("hl_tooltip_only", { label: "Hover me\n(tooltip only)", shape: "box", tooltip: "This node has a tooltip but no hyperlink", fillcolor: "#f0f0f0", style: "filled" });

    g.addEdge("hl_url_blank", "hl_href_blank", { id: "hl_e1", label: "edge URL", edgeURL: "https://graphviz.org/doc/info/attrs.html#k:edgeURL", target: "_blank", edgetooltip: "This edge also has a URL" })
        .addEdge("hl_href_blank", "hl_url_same", { id: "hl_e2" })
        .addEdge("hl_url_same", "hl_tooltip_only", { id: "hl_e3" });

    // ---- Examples (from https://renenyffenegger.ch/notes/tools/Graphviz/examples/index) ----
    const sgExamples = g.addSubgraph("sgExamples", { label: "Examples" });

    // 1. Dotted edges etc
    const sgExDotted = sgExamples.addSubgraph("sgExDotted", { label: "Dotted edges etc" });
    sgExDotted
        .addNode("exDot_A", { label: "A", shape: "diamond" })
        .addNode("exDot_B", { label: "B", shape: "box" })
        .addNode("exDot_C", { label: "C", shape: "circle" })
        .addNode("exDot_D", { label: "D" });
    g.addEdge("exDot_A", "exDot_B", { id: "exDot_e1", style: "dashed", color: "grey" })
        .addEdge("exDot_A", "exDot_C", { id: "exDot_e2", color: "black:invis:black" })
        .addEdge("exDot_A", "exDot_D", { id: "exDot_e3", penwidth: 5, arrowhead: "none" });

    // 2. Shape: record vs. plaintext
    const sgExRecord = sgExamples.addSubgraph("sgExRecord", { label: "Shape: record vs. plaintext" });
    sgExRecord
        .addNode("exRec_A", { shape: "record", label: "shape=record|{above|middle|below}|right", fontname: "Arial" })
        .addNode("exRec_B", { shape: "plaintext", label: "shape=plaintext|{curly|braces and|bars without}|effect", fontname: "Arial" });

    // 3. Multiple edges
    const sgExMulti = sgExamples.addSubgraph("sgExMulti", { label: "Multiple edges" });
    sgExMulti
        .addNode("exMul_A", { label: "A" })
        .addNode("exMul_B", { label: "B" })
        .addNode("exMul_C", { label: "C" })
        .addNode("exMul_D", { label: "D" })
        .addNode("exMul_F", { label: "F" });
    g.addEdge("exMul_A", "exMul_B", { id: "exMul_e1" })
        .addEdge("exMul_A", "exMul_C", { id: "exMul_e2" })
        .addEdge("exMul_A", "exMul_D", { id: "exMul_e3" })
        .addEdge("exMul_B", "exMul_F", { id: "exMul_e4" })
        .addEdge("exMul_C", "exMul_F", { id: "exMul_e5" })
        .addEdge("exMul_D", "exMul_F", { id: "exMul_e6" });

    // 4. Left, mid and right aligned text
    const sgExAlign = sgExamples.addSubgraph("sgExAlign", { label: "Left, mid and right aligned text" });
    sgExAlign
        .addNode("exAlign_a", { shape: "record", fontname: "Arial", label: "one\\ltwo three\\lfour five six seven\\l" })
        .addNode("exAlign_b", { shape: "record", fontname: "Arial", label: "one\\ntwo three\\nfour five six seven" })
        .addNode("exAlign_c", { shape: "record", fontname: "Arial", label: "one\\rtwo three\\rfour five six seven\\r" });
    g.addEdge("exAlign_a", "exAlign_b", { id: "exAlign_e1" })
        .addEdge("exAlign_b", "exAlign_c", { id: "exAlign_e2" });

    // 5. Giving the graph a title
    const sgExTitle = sgExamples.addSubgraph("sgExTitle", { label: "Giving the graph a title" });
    sgExTitle
        .addNode("exTitle_FOO", { label: "FOO", shape: "plaintext" })
        .addNode("exTitle_BAR", { label: "BAR", shape: "plaintext" })
        .addNode("exTitle_BAZ", { label: "BAZ", shape: "plaintext" });
    g.addEdge("exTitle_FOO", "exTitle_BAR", { id: "exTitle_e1" })
        .addEdge("exTitle_FOO", "exTitle_BAZ", { id: "exTitle_e2" });

    // 6. HTML like labels
    const sgExHtmlLabel = sgExamples.addSubgraph("sgExHtmlLabel", { label: "HTML like labels" });
    sgExHtmlLabel
        .addNode("exHtml_FOO", { shape: "plaintext" })
        .addNode("exHtml_BAR", { label: "BAR", shape: "plaintext" })
        .addNode("exHtml_BAZ", { label: "BAZ", shape: "plaintext" });
    g.setNodeHtmlAttr("exHtml_FOO", "label", "The <font color='red'><b>foo</b></font>,<br/> the <font point-size='20'>bar</font> and<br/> the <i>baz</i>")
        .addEdge("exHtml_FOO", "exHtml_BAR", { id: "exHtml_e1" })
        .addEdge("exHtml_FOO", "exHtml_BAZ", { id: "exHtml_e2" });

    // 7. rank
    const sgExRank = sgExamples.addSubgraph("sgExRank", { label: "rank" });
    sgExRank
        .addNode("exRank_rA", { label: "rA", shape: "record" })
        .addNode("exRank_sA", { label: "sA", shape: "record" })
        .addNode("exRank_tA", { label: "tA", shape: "record" })
        .addNode("exRank_uB", { label: "uB", shape: "record" })
        .addNode("exRank_vB", { label: "vB", shape: "record" })
        .addNode("exRank_wB", { label: "wB", shape: "record" })
        .addNode("exRank_t", { label: "t", shape: "record" })
        .addNode("exRank_u", { label: "u", shape: "record" });
    g.addEdge("exRank_t", "exRank_rA", { id: "exRank_e3" })
        .addEdge("exRank_rA", "exRank_sA", { id: "exRank_e1" })
        .addEdge("exRank_sA", "exRank_vB", { id: "exRank_e2" })
        .addEdge("exRank_uB", "exRank_vB", { id: "exRank_e4" })
        .addEdge("exRank_wB", "exRank_u", { id: "exRank_e5" })
        .addEdge("exRank_wB", "exRank_tA", { id: "exRank_e6" });

    // 8. Subgraph (clusters)
    const sgExSubgraph = sgExamples.addSubgraph("sgExSubgraph", { label: "Subgraph (clusters)" });
    sgExSubgraph
        .addNode("exSg_nd_1", { label: "Node 1", shape: "record" })
        .addNode("exSg_nd_2", { label: "Node 2", shape: "record" })
        .addNode("exSg_nd_3_a", { label: "Above Right Node 3", shape: "record" })
        .addNode("exSg_nd_4", { label: "Node 4", shape: "record" });
    const sgExSgClusterR = sgExSubgraph.addSubgraph("sgExSgClusterR", { label: "" });
    sgExSgClusterR
        .addNode("exSg_nd_3_l", { label: "Left of Node 3", shape: "record" })
        .addNode("exSg_nd_3", { label: "Node 3", shape: "record" })
        .addNode("exSg_nd_3_r", { label: "Right of Node 3", shape: "record" })
        .addEdge("exSg_nd_3_l", "exSg_nd_3", { id: "exSg_e5" })
        .addEdge("exSg_nd_3", "exSg_nd_3_r", { id: "exSg_e6" });
    const sgExSgClusterR2 = sgExSubgraph.addSubgraph("sgExSgClusterR2", { label: "" });
    sgExSgClusterR2
        .addNode("exSg2_nd_3_l", { label: "Left of Node 3", shape: "record" })
        .addNode("exSg2_nd_3", { label: "Node 3", shape: "record" })
        .addNode("exSg2_nd_3_r", { label: "Right of Node 3", shape: "record" })
        .addEdge("exSg2_nd_3_l", "exSg2_nd_3", { id: "exSg2_e5" })
        .addEdge("exSg2_nd_3", "exSg2_nd_3_r", { id: "exSg2_e6" });
    const sgExSgClusterR3 = sgExSubgraph.addSubgraph("sgExSgClusterR3", { label: "" });
    sgExSgClusterR3
        .addNode("exSg3_nd_3_l", { label: "Left of Node 3", shape: "record" })
        .addNode("exSg3_nd_3", { label: "Node 3", shape: "record" })
        .addNode("exSg3_nd_3_r", { label: "Right of Node 3", shape: "record" })
        .addEdge("exSg3_nd_3_l", "exSg3_nd_3", { id: "exSg3_e5" })
        .addEdge("exSg3_nd_3", "exSg3_nd_3_r", { id: "exSg3_e6" });
    g.addEdge("exSg_nd_3_a", "exSg_nd_3_r", { id: "exSg_e1" })
        .addEdge("exSg_nd_1", "exSg_nd_2", { id: "exSg_e2" })
        .addEdge("exSg_nd_2", "exSg_nd_3", { id: "exSg_e3" })
        .addEdge("exSg_nd_3", "exSg_nd_4", { id: "exSg_e4" });
    g.addEdge("exSg_nd_3_a", "exSg2_nd_3_r", { id: "exSg2_e1" })
        .addEdge("exSg_nd_1", "exSg_nd_2", { id: "exSg2_e2" })
        .addEdge("exSg_nd_2", "exSg2_nd_3", { id: "exSg2_e3" })
        .addEdge("exSg2_nd_3", "exSg_nd_4", { id: "exSg2_e4" });
    g.addEdge("exSg_nd_3_a", "exSg3_nd_3_r", { id: "exSg3_e1" })
        .addEdge("exSg_nd_1", "exSg_nd_2", { id: "exSg3_e2" })
        .addEdge("exSg_nd_2", "exSg3_nd_3", { id: "exSg3_e3" })
        .addEdge("exSg3_nd_3", "exSg_nd_4", { id: "exSg3_e4" });

    // 9. Nested clusters
    const sgExNested = sgExamples.addSubgraph("sgExNested", { label: "Nested clusters" });
    const sgExNestParent = sgExNested.addSubgraph("sgExNestParent", { label: "Parent" });
    const sgExNestC1 = sgExNestParent.addSubgraph("sgExNestC1", { label: "Child one" });
    const sgExNestGC1 = sgExNestC1.addSubgraph("sgExNestGC1", { label: "Grand-Child one" });
    const sgExNestGC2 = sgExNestC1.addSubgraph("sgExNestGC2", { label: "Grand-Child two" });
    const sgExNestC2 = sgExNestParent.addSubgraph("sgExNestC2", { label: "Child two" });
    sgExNestC1.addNode("exNest_a", { label: "a" });
    sgExNestGC1.addNode("exNest_b", { label: "b" });
    sgExNestGC2
        .addNode("exNest_c", { label: "c" })
        .addNode("exNest_d", { label: "d" });
    sgExNestC2.addNode("exNest_e", { label: "e" });

    // 10. HTML table
    const sgExHtmlTable = sgExamples.addSubgraph("sgExHtmlTable", { label: "HTML table" });
    sgExHtmlTable.addNode("exHtmlTbl_a", { shape: "plaintext", color: "blue" });
    g.setNodeHtmlAttr("exHtmlTbl_a", "label",
        "<table border='1' cellborder='0'>" +
        "<tr><td>col 1</td><td>foo</td></tr>" +
        "<tr><td>COL 2</td><td>bar</td></tr>" +
        "</table>");

    // 11. Nested HTML table
    const sgExNestedHtmlTable = sgExamples.addSubgraph("sgExNestedHtmlTable", { label: "Nested HTML table" });
    sgExNestedHtmlTable.addNode("exNestTbl_a", { shape: "plaintext" });
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
    const sgExColors = sgExamples.addSubgraph("sgExColors", { label: "Colors" });
    sgExColors.addNode("exCol_some_node", { shape: "plaintext" });
    g.setNodeHtmlAttr("exCol_some_node", "label",
        '<table border="0" cellborder="1" cellspacing="0">' +
        '<tr><td bgcolor="yellow">Foo</td></tr>' +
        '<tr><td bgcolor="lightblue"><font color="#0000ff">Bar</font></td></tr>' +
        '<tr><td bgcolor="#f0e3ff"><font color="#ff1020">Baz</font></td></tr>' +
        "</table>");

    // 13. Rounded box
    const sgExRounded = sgExamples.addSubgraph("sgExRounded", { label: "Rounded box" });
    sgExRounded.addNode("exRnd_a", { shape: "plaintext" });
    g.setNodeHtmlAttr("exRnd_a", "label",
        "<table border='1' cellborder='0' style='rounded'>" +
        "<tr><td>col 1</td><td>foo</td></tr>" +
        "<tr><td>COL 2</td><td>bar</td></tr>" +
        "</table>");

    // 14. Ports
    const sgExPorts = sgExamples.addSubgraph("sgExPorts", { label: "Ports" });
    sgExPorts
        .addNode("exPort_parent", { shape: "plaintext" })
        .addNode("exPort_child1", { shape: "plaintext" })
        .addNode("exPort_child2", { shape: "plaintext" })
        .addNode("exPort_child3", { shape: "plaintext" });
    g.setNodeHtmlAttr("exPort_parent", "label",
        "<table border='1' cellborder='1'>" +
        "<tr><td colspan='3'>The foo, the bar and the baz</td></tr>" +
        "<tr><td port='port_one'>First port</td><td port='port_two'>Second port</td><td port='port_three'>Third port</td></tr>" +
        "</table>");
    g.setNodeHtmlAttr("exPort_child1", "label", "<table border='1' cellborder='0'><tr><td>1</td></tr></table>");
    g.setNodeHtmlAttr("exPort_child2", "label", "<table border='1' cellborder='0'><tr><td>2</td></tr></table>");
    g.setNodeHtmlAttr("exPort_child3", "label", "<table border='1' cellborder='0'><tr><td>3</td></tr></table>");
    g.addEdge("exPort_parent", "exPort_child1", { id: "exPort_e1" })
        .setEdgeAttr("exPort_parent", "exPort_child1", "", "tailport", "port_one")
        .addEdge("exPort_parent", "exPort_child2", { id: "exPort_e2" })
        .setEdgeAttr("exPort_parent", "exPort_child2", "", "tailport", "port_two")
        .addEdge("exPort_parent", "exPort_child3", { id: "exPort_e3" })
        .setEdgeAttr("exPort_parent", "exPort_child3", "", "tailport", "port_three");

    // 15. Project Dependencies
    const sgExProj = sgExamples.addSubgraph("sgExProj", { label: "Project Dependencies" });
    sgExProj
        .addNode("exProj_menu", { shape: "plaintext", fontname: "Sans serif", fontsize: 8 })
        .addNode("exProj_ingredients", { shape: "plaintext", fontname: "Sans serif", fontsize: 8 })
        .addNode("exProj_invitation", { shape: "plaintext", fontname: "Sans serif", fontsize: 8 })
        .addNode("exProj_cook", { shape: "plaintext", fontname: "Sans serif", fontsize: 8 })
        .addNode("exProj_table", { shape: "plaintext", fontname: "Sans serif", fontsize: 8 })
        .addNode("exProj_eat", { shape: "plaintext", fontname: "Sans serif", fontsize: 8 });
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
    g.addEdge("exProj_menu", "exProj_ingredients", { id: "exProj_e1" })
        .addEdge("exProj_ingredients", "exProj_cook", { id: "exProj_e2" })
        .addEdge("exProj_invitation", "exProj_cook", { id: "exProj_e3" })
        .addEdge("exProj_table", "exProj_eat", { id: "exProj_e4" })
        .addEdge("exProj_cook", "exProj_eat", { id: "exProj_e5" });

    const graphvizWidget = new class extends GraphvizWidget.Widget {
        render(callback?: (w: WidgetT) => void): this {
            return super.render((w: WidgetT) => {
                this.clearClass("complete");
                this.clearClass("failed");
                this.clearClass("running");
                this.clearClass("unknown");

                this.setClass("unknown", ["s17", "s19", "s21", "s23", "s25", "s27", "s29", "s31", "sgExSubgraph"]);
                this.setClass("complete", [
                    "s1", "s3", "s5", "s7", "s9", "s11", "s13", "s15",
                    "exSg_nd_1", "exSg_nd_2", "exSg_nd_3_a", "exSg_nd_3_l", "exSg_nd_3", "exSg_nd_3_r", "exSg_nd_4",
                    "exSg_e1", "exSg_e2", "exSg_e3", "exSg_e4", "exSg_e5", "exSg_e6",
                    "sgExSgClusterR",
                ]);
                this.setClass("failed", ["s0", "s2", "s4", "s6", "s8", "s10", "s12", "s14",
                    "exSg2_nd_1", "exSg2_nd_3_a", "exSg2_nd_3_l", "exSg2_nd_3", "exSg2_nd_3_r",
                    "exSg2_e1", "exSg2_e2", "exSg2_e3",
                    "sgExSgClusterR2"]);
                this.setClass("running", ["s16", "s18", "s20", "s22", "s24", "s26", "s28", "s30",
                    "exSg3_nd_1", "exSg3_nd_3_a", "exSg3_nd_3_l", "exSg3_nd_3", "exSg3_nd_3_r",
                    "exSg3_e1", "exSg3_e2", "exSg3_e3",
                    "sgExSgClusterR3"]);

                this.zoomToFit();
                callback?.(w);
            });
        }

        vertexButtonClicked(id: string, action: string) {
            console.info(`[testGraphviz] Button clicked - node: "${id}", action: "${action}"`);
        }
    }().data(g);
    return graphvizWidget;
}
