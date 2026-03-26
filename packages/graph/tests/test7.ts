import { Graphviz } from "../src/index.ts";

const arrowTypes: Graphviz.ArrowType[] = [
    "normal", "inv", "dot", "invdot", "odot", "invodot", "none", "tee",
    "empty", "invempty", "diamond", "odiamond", "ediamond", "crow",
    "box", "obox", "open", "halfopen", "vee"
];
const edgeStyles: Graphviz.EdgeStyle[] = ["solid", "dashed", "dotted", "bold", "tapered"];
const shapes: Graphviz.Shape[] = [
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

// --- Subgraph 1: Arrow type combos, single horizontal row of vertical (TB) examples ---
const ARROW_COLS = arrowTypes.length;
const numArrowBlocks = Math.ceil(arrowTypes.length / ARROW_COLS);
// Each block gets two rank=same rows: one for source nodes, one for target nodes
const arrowRowSubgraphs: Graphviz.Cluster[] = Array.from({ length: numArrowBlocks }, (_, i): Graphviz.Cluster[] => [
    { id: `sgArrowsRow${i}s`, parentID: "sgArrows", rank: "same" as const, cluster: false },
    { id: `sgArrowsRow${i}t`, parentID: "sgArrows", rank: "same" as const, cluster: false },
]).flat();
const arrowVertices: Graphviz.Node[] = arrowTypes.flatMap((arrow, i): Graphviz.Node[] => [
    { id: `a${i}s`, label: arrow, shape: "none", parentID: `sgArrowsRow${Math.floor(i / ARROW_COLS)}s` },
    { id: `a${i}t`, label: arrow, shape: "none", parentID: `sgArrowsRow${Math.floor(i / ARROW_COLS)}t` },
]);
const arrowEdges: Graphviz.Edge[] = arrowTypes.map((arrow, i): Graphviz.Edge => ({
    id: `ea${i}`,
    sourceID: `a${i}s`,
    targetID: `a${i}t`,
    label: `${arrow} / ${edgeStyles[i % edgeStyles.length]}`,
    style: edgeStyles[i % edgeStyles.length],
    arrowhead: arrow,
    arrowtail: arrow
}));
// Invisible edges to order blocks: last target row of block i → first source row of block i+1
// const arrowRowEdges: Graphviz.Edge[] = Array.from({ length: numArrowBlocks - 1 }, (_, i) => ({
//     id: `ear${i}`,
//     sourceID: `a${Math.min((i + 1) * ARROW_COLS - 1, arrowTypes.length - 1)}t`,
//     targetID: `a${(i + 1) * ARROW_COLS}s`,
//     style: "invis",
//     parentID: "sgArrows",
// }));

// --- Subgraph 2: All vertex shapes, laid out as a grid ---
const SHAPE_COLS = 6;
const shapeRowSubgraphs: Graphviz.Cluster[] = Array.from(
    { length: Math.ceil(shapes.length / SHAPE_COLS) },
    (_, i): Graphviz.Cluster => ({ id: `sgShapesRow${i}`, parentID: "sgShapes", rank: "same" as const, cluster: false })
);
const shapeVertices = shapes.map((shape, i): Graphviz.Node => ({
    id: `s${i}`,
    label: shape,
    shape,
    parentID: `sgShapesRow${Math.floor(i / SHAPE_COLS)}`,
}));

// Invisible inter-row edges force vertical rank ordering between rows
const shapeRowEdges = shapeRowSubgraphs.slice(0, -1).map((_, i): Graphviz.Edge => ({
    id: `esr${i}`,
    sourceID: `s${i * SHAPE_COLS}`,
    targetID: `s${(i + 1) * SHAPE_COLS}`,
    style: "invis",
}));

// --- Subgraph 3: Custom SVG content vertices ---
// const customVertices: Graphviz.Node[] = [
//     {
//         id: "c1", label: "Custom 1", parentID: "sgCustom",
//         svgTpl: `<g>
//             <circle cx="18" cy="13" r="9" fill="white" fill-opacity="0.25"/>
//             <path d="M14,11 L18,7 L22,11 M18,7 L18,18 M13,18 L23,18" stroke="black" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
//             <text x="34" y="17" font-family="arial" font-size="11" font-weight="bold" fill="white">%label%</text>
//             <text x="14" y="42" font-family="arial" font-size="10" fill="var(--gv-fg)">ID: %id%</text>
//             <text x="14" y="58" font-family="arial" font-size="9" fill="#888">Ready</text>
//             <circle cx="164" cy="56" r="6" fill="#0e7a0d"/>
//             <path d="M161,56 L163,58 L167,54" stroke="white" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
//         </g>`
//     },
//     {
//         id: "c2", label: "Custom 3", parentID: "sgCustom", stroke: "white",
//         svgTpl: `<g>
//             <rect x="0" y="0" width="640" height="480" rx="8" fill="#f9dede" stroke="transparent" stroke-width="2"/>
//             <text x="60" y="20" text-anchor="middle" font-family="arial" font-size="11" fill="#242424">%label%</text>
//             <text x="60" y="38" text-anchor="middle" font-family="arial" font-size="10" fill="#666">ID: %id%</text>
//         </g>`
//     },
//     {
//         id: "c3", label: "Custom 2", parentID: "sgCustom", shape: "circle",
//         svgTpl: `<g>
//             <circle cx="20" cy="20" r="18" fill="#4cc2ff" stroke="var(--gv-fg)" stroke-width="2"/>
//             <text x="20" y="25" text-anchor="middle" font-family="arial" font-size="12" fill="white">%id%</text>
//         </g>`
//     },

// ];
// const customEdges: Graphviz.Edge[] = [
//     { id: "ec1", sourceID: "c1", targetID: "c2" },
//     { id: "ec2", sourceID: "c2", targetID: "c3" },
// ];

// Invisible edge to rank sgArrows above sgShapes
const clusterOrderEdge: Graphviz.Edge = {
    id: "eClusterOrder",
    sourceID: "a11t",
    targetID: "s3",
    style: "invis",
};

// --- Subgraph: Examples from https://renenyffenegger.ch/notes/tools/Graphviz/examples/index ---

// 1. Dotted edges etc
const exDottedVertices: Graphviz.Node[] = [
    { id: "exDot_A", label: "A", shape: "diamond", parentID: "sgExDotted" },
    { id: "exDot_B", label: "B", shape: "box", parentID: "sgExDotted" },
    { id: "exDot_C", label: "C", shape: "circle", parentID: "sgExDotted" },
    { id: "exDot_D", label: "D", parentID: "sgExDotted" },
];
const exDottedEdges: Graphviz.Edge[] = [
    { id: "exDot_e1", sourceID: "exDot_A", targetID: "exDot_B", style: "dashed", color: "grey" },
    { id: "exDot_e2", sourceID: "exDot_A", targetID: "exDot_C", color: "black:invis:black" },
    { id: "exDot_e3", sourceID: "exDot_A", targetID: "exDot_D", penwidth: 5, arrowhead: "none" },
];

// 2. Shape: record vs. plaintext
const exRecordVertices: Graphviz.Node[] = [
    { id: "exRec_A", shape: "record", label: "shape=record|{above|middle|below}|right", fontname: "Arial", parentID: "sgExRecord" },
    { id: "exRec_B", shape: "plaintext", label: "shape=plaintext|{curly|braces and|bars without}|effect", fontname: "Arial", parentID: "sgExRecord" },
];
const exRecordEdges: Graphviz.Edge[] = [];

// 3. Multiple edges
const exMultiVertices: Graphviz.Node[] = [
    { id: "exMul_A", label: "A", parentID: "sgExMulti" },
    { id: "exMul_B", label: "B", parentID: "sgExMulti" },
    { id: "exMul_C", label: "C", parentID: "sgExMulti" },
    { id: "exMul_D", label: "D", parentID: "sgExMulti" },
    { id: "exMul_F", label: "F", parentID: "sgExMulti" },
];
const exMultiEdges: Graphviz.Edge[] = [
    { id: "exMul_e1", sourceID: "exMul_A", targetID: "exMul_B" },
    { id: "exMul_e2", sourceID: "exMul_A", targetID: "exMul_C" },
    { id: "exMul_e3", sourceID: "exMul_A", targetID: "exMul_D" },
    { id: "exMul_e4", sourceID: "exMul_B", targetID: "exMul_F" },
    { id: "exMul_e5", sourceID: "exMul_C", targetID: "exMul_F" },
    { id: "exMul_e6", sourceID: "exMul_D", targetID: "exMul_F" },
];

// 4. Left, mid and right aligned text
const exAlignVertices: Graphviz.Node[] = [
    { id: "exAlign_a", shape: "record", fontname: "Arial", label: "one\\ltwo three\\lfour five six seven\\l", parentID: "sgExAlign" },
    { id: "exAlign_b", shape: "record", fontname: "Arial", label: "one\\ntwo three\\nfour five six seven", parentID: "sgExAlign" },
    { id: "exAlign_c", shape: "record", fontname: "Arial", label: "one\\rtwo three\\rfour five six seven\\r", parentID: "sgExAlign" },
];
const exAlignEdges: Graphviz.Edge[] = [
    { id: "exAlign_e1", sourceID: "exAlign_a", targetID: "exAlign_b" },
    { id: "exAlign_e2", sourceID: "exAlign_b", targetID: "exAlign_c" },
];

// 5. Giving the graph a title
const exTitleVertices: Graphviz.Node[] = [
    { id: "exTitle_FOO", label: "FOO", shape: "plaintext", parentID: "sgExTitle" },
    { id: "exTitle_BAR", label: "BAR", shape: "plaintext", parentID: "sgExTitle" },
    { id: "exTitle_BAZ", label: "BAZ", shape: "plaintext", parentID: "sgExTitle" },
];
const exTitleEdges: Graphviz.Edge[] = [
    { id: "exTitle_e1", sourceID: "exTitle_FOO", targetID: "exTitle_BAR" },
    { id: "exTitle_e2", sourceID: "exTitle_FOO", targetID: "exTitle_BAZ" },
];

// 6. HTML like labels
const exHtmlLabelVertices: Graphviz.Node[] = [
    { id: "exHtml_FOO", label: "<The <font color='red'><b>foo</b></font>,<br/> the <font point-size='20'>bar</font> and<br/> the <i>baz</i>>", shape: "plaintext", parentID: "sgExHtmlLabel" },
    { id: "exHtml_BAR", label: "BAR", shape: "plaintext", parentID: "sgExHtmlLabel" },
    { id: "exHtml_BAZ", label: "BAZ", shape: "plaintext", parentID: "sgExHtmlLabel" },
];
const exHtmlLabelEdges: Graphviz.Edge[] = [
    { id: "exHtml_e1", sourceID: "exHtml_FOO", targetID: "exHtml_BAR" },
    { id: "exHtml_e2", sourceID: "exHtml_FOO", targetID: "exHtml_BAZ" },
];

// 7. rank
const exRankVertices: Graphviz.Node[] = [
    { id: "exRank_rA", label: "rA", shape: "record", parentID: "sgExRank" },
    { id: "exRank_sA", label: "sA", shape: "record", parentID: "sgExRank" },
    { id: "exRank_tA", label: "tA", shape: "record", parentID: "sgExRank" },
    { id: "exRank_uB", label: "uB", shape: "record", parentID: "sgExRank" },
    { id: "exRank_vB", label: "vB", shape: "record", parentID: "sgExRank" },
    { id: "exRank_wB", label: "wB", shape: "record", parentID: "sgExRank" },
    { id: "exRank_t", label: "t", shape: "record", parentID: "sgExRank" },
    { id: "exRank_u", label: "u", shape: "record", parentID: "sgExRank" },
];
const exRankEdges: Graphviz.Edge[] = [
    { id: "exRank_e3", sourceID: "exRank_t", targetID: "exRank_rA" },
    { id: "exRank_e1", sourceID: "exRank_rA", targetID: "exRank_sA" },
    { id: "exRank_e2", sourceID: "exRank_sA", targetID: "exRank_vB" },
    { id: "exRank_e4", sourceID: "exRank_uB", targetID: "exRank_vB" },
    { id: "exRank_e5", sourceID: "exRank_wB", targetID: "exRank_u" },
    { id: "exRank_e6", sourceID: "exRank_wB", targetID: "exRank_tA" },
];

// 8. Subgraph (clusters)
const exSubgraphVertices: Graphviz.Node[] = [
    { id: "exSg_nd_1", label: "Node 1", shape: "record", parentID: "sgExSubgraph" },
    { id: "exSg_nd_2", label: "Node 2", shape: "record", parentID: "sgExSubgraph" },
    { id: "exSg_nd_3_a", label: "Above Right Node 3", shape: "record", parentID: "sgExSubgraph" },
    { id: "exSg_nd_3_l", label: "Left of Node 3", shape: "record", parentID: "sgExSgClusterR" },
    { id: "exSg_nd_3", label: "Node 3", shape: "record", parentID: "sgExSgClusterR" },
    { id: "exSg_nd_3_r", label: "Right of Node 3", shape: "record", parentID: "sgExSgClusterR" },
    { id: "exSg_nd_4", label: "Node 4", shape: "record", parentID: "sgExSubgraph" },
];
const exSubgraphEdges: Graphviz.Edge[] = [
    { id: "exSg_e1", sourceID: "exSg_nd_3_a", targetID: "exSg_nd_3_r" },
    { id: "exSg_e2", sourceID: "exSg_nd_1", targetID: "exSg_nd_2" },
    { id: "exSg_e3", sourceID: "exSg_nd_2", targetID: "exSg_nd_3" },
    { id: "exSg_e4", sourceID: "exSg_nd_3", targetID: "exSg_nd_4" },
    { id: "exSg_e5", sourceID: "exSg_nd_3_l", targetID: "exSg_nd_3", color: "grey", arrowhead: "none" },
    { id: "exSg_e6", sourceID: "exSg_nd_3", targetID: "exSg_nd_3_r", color: "grey", arrowhead: "none" },
];

// 9. Nested clusters
const exNestedVertices: Graphviz.Node[] = [
    { id: "exNest_a", label: "a", parentID: "sgExNestC1" },
    { id: "exNest_b", label: "b", parentID: "sgExNestGC1" },
    { id: "exNest_c", label: "c", parentID: "sgExNestGC2" },
    { id: "exNest_d", label: "d", parentID: "sgExNestGC2" },
    { id: "exNest_e", label: "e", parentID: "sgExNestC2" },
];
const exNestedEdges: Graphviz.Edge[] = [];

// 10. HTML table
const exHtmlTableVertices: Graphviz.Node[] = [
    {
        id: "exHtmlTbl_a", shape: "plaintext", color: "blue", parentID: "sgExHtmlTable",
        label: `<
     <table border='1' cellborder='0'>
       <tr><td>col 1</td><td>foo</td></tr>
       <tr><td>COL 2</td><td>bar</td></tr>
     </table>
  >`
    },
];
const exHtmlTableEdges: Graphviz.Edge[] = [];

// 11. Nested HTML table
const exNestedHtmlTableVertices: Graphviz.Node[] = [
    {
        id: "exNestTbl_a", shape: "plaintext", parentID: "sgExNestedHtmlTable",
        label: `<
      <table border='0' cellborder='1' color='blue' cellspacing='0'>
        <tr><td>foo</td><td>bar</td><td>baz</td></tr>
        <tr><td cellpadding='4'>
          <table color='orange' cellspacing='0'>
            <tr><td>one  </td><td>two  </td><td>three</td></tr>
            <tr><td>four </td><td>five </td><td>six  </td></tr>
            <tr><td>seven</td><td>eight</td><td>nine </td></tr>
          </table>
        </td>
        <td colspan='2' rowspan='2'>
          <table color='pink' border='0' cellborder='1' cellpadding='10' cellspacing='0'>
            <tr><td>eins</td><td>zwei</td><td rowspan='2'>drei<br/>sechs</td></tr>
            <tr><td>vier</td><td>fünf</td></tr>
          </table>
        </td>
        </tr>
        <tr><td>abc</td></tr>
      </table>
    >`
    },
];
const exNestedHtmlTableEdges: Graphviz.Edge[] = [];

// 12. Colors
const exColorsVertices: Graphviz.Node[] = [
    {
        id: "exCol_some_node", shape: "plaintext", parentID: "sgExColors",
        label: `<
     <table border="0" cellborder="1" cellspacing="0">
       <tr><td bgcolor="yellow">Foo</td></tr>
       <tr><td bgcolor="lightblue"><font color="#0000ff">Bar</font></td></tr>
       <tr><td bgcolor="#f0e3ff"><font color="#ff1020">Baz</font></td></tr>
     </table>>`
    },
];
const exColorsEdges: Graphviz.Edge[] = [];

// 13. Rounded box
const exRoundedVertices: Graphviz.Node[] = [
    {
        id: "exRnd_a", shape: "plaintext", parentID: "sgExRounded",
        label: `<
     <table border='1' cellborder='0' style='rounded'>
       <tr><td>col 1</td><td>foo</td></tr>
       <tr><td>COL 2</td><td>bar</td></tr>
     </table>
  >`
    },
];
const exRoundedEdges: Graphviz.Edge[] = [];

// 14. Ports
const exPortsVertices: Graphviz.Node[] = [
    {
        id: "exPort_parent", shape: "plaintext", parentID: "sgExPorts",
        label: `<
     <table border='1' cellborder='1'>
       <tr><td colspan="3">The foo, the bar and the baz</td></tr>
       <tr><td port='port_one'>First port</td><td port='port_two'>Second port</td><td port='port_three'>Third port</td></tr>
     </table>
  >`
    },
    {
        id: "exPort_child1", shape: "plaintext", parentID: "sgExPorts",
        label: `<
     <table border='1' cellborder='0'>
       <tr><td>1</td></tr>
     </table>
  >`
    },
    {
        id: "exPort_child2", shape: "plaintext", parentID: "sgExPorts",
        label: `<
     <table border='1' cellborder='0'>
       <tr><td>2</td></tr>
     </table>
  >`
    },
    {
        id: "exPort_child3", shape: "plaintext", parentID: "sgExPorts",
        label: `<
     <table border='1' cellborder='0'>
       <tr><td>3</td></tr>
     </table>
  >`
    },
];
const exPortsEdges: Graphviz.Edge[] = [
    { id: "exPort_e1", sourceID: "exPort_parent", targetID: "exPort_child1", tailport: "port_one" },
    { id: "exPort_e2", sourceID: "exPort_parent", targetID: "exPort_child2", tailport: "port_two" },
    { id: "exPort_e3", sourceID: "exPort_parent", targetID: "exPort_child3", tailport: "port_three" },
];

// 15. Project Dependencies
const exProjVertices: Graphviz.Node[] = [
    {
        id: "exProj_menu", shape: "plaintext", fontname: "Sans serif", fontsize: 8, parentID: "sgExProj",
        label: `<
   <table border="1" cellborder="0" cellspacing="1">
     <tr><td align="left"><b>Task 1</b></td></tr>
     <tr><td align="left">Choose Menu</td></tr>
     <tr><td align="left"><font color="darkgreen">done</font></td></tr>
   </table>>`
    },
    {
        id: "exProj_ingredients", shape: "plaintext", fontname: "Sans serif", fontsize: 8, parentID: "sgExProj",
        label: `<
   <table border="1" cellborder="0" cellspacing="1">
     <tr><td align="left"><b>Task 2</b></td></tr>
     <tr><td align="left">Buy ingredients</td></tr>
     <tr><td align="left"><font color="darkgreen">done</font></td></tr>
   </table>>`
    },
    {
        id: "exProj_invitation", shape: "plaintext", fontname: "Sans serif", fontsize: 8, parentID: "sgExProj",
        label: `<
   <table border="1" cellborder="0" cellspacing="1">
     <tr><td align="left"><b>Task 4</b></td></tr>
     <tr><td align="left">Send invitation</td></tr>
     <tr><td align="left"><font color="darkgreen">done</font></td></tr>
   </table>>`
    },
    {
        id: "exProj_cook", shape: "plaintext", fontname: "Sans serif", fontsize: 8, parentID: "sgExProj",
        label: `<
   <table border="1" cellborder="0" cellspacing="1">
     <tr><td align="left"><b>Task 5</b></td></tr>
     <tr><td align="left">Cook</td></tr>
     <tr><td align="left"><font color="red">todo</font></td></tr>
   </table>>`
    },
    {
        id: "exProj_table", shape: "plaintext", fontname: "Sans serif", fontsize: 8, parentID: "sgExProj",
        label: `<
   <table border="1" cellborder="0" cellspacing="1">
     <tr><td align="left"><b>Task 3</b></td></tr>
     <tr><td align="left">Lay table</td></tr>
     <tr><td align="left"><font color="red">todo</font></td></tr>
   </table>>`
    },
    {
        id: "exProj_eat", shape: "plaintext", fontname: "Sans serif", fontsize: 8, parentID: "sgExProj",
        label: `<
   <table border="1" cellborder="0" cellspacing="1">
     <tr><td align="left"><b>Task 6</b></td></tr>
     <tr><td align="left">Eat</td></tr>
     <tr><td align="left"><font color="red">todo</font></td></tr>
   </table>>`
    },
];
const exProjEdges: Graphviz.Edge[] = [
    { id: "exProj_e1", sourceID: "exProj_menu", targetID: "exProj_ingredients" },
    { id: "exProj_e2", sourceID: "exProj_ingredients", targetID: "exProj_cook" },
    { id: "exProj_e3", sourceID: "exProj_invitation", targetID: "exProj_cook" },
    { id: "exProj_e4", sourceID: "exProj_table", targetID: "exProj_eat" },
    { id: "exProj_e5", sourceID: "exProj_cook", targetID: "exProj_eat" },
];

// --- Combine all example data ---
const examplesVertices: Graphviz.Node[] = [
    ...exDottedVertices,
    ...exRecordVertices,
    ...exMultiVertices,
    ...exAlignVertices,
    ...exTitleVertices,
    ...exHtmlLabelVertices,
    ...exRankVertices,
    ...exSubgraphVertices,
    ...exNestedVertices,
    ...exHtmlTableVertices,
    ...exNestedHtmlTableVertices,
    ...exColorsVertices,
    ...exRoundedVertices,
    ...exPortsVertices,
    ...exProjVertices,
];
const examplesEdges: Graphviz.Edge[] = [
    ...exDottedEdges,
    ...exRecordEdges,
    ...exMultiEdges,
    ...exAlignEdges,
    ...exTitleEdges,
    ...exHtmlLabelEdges,
    ...exRankEdges,
    ...exSubgraphEdges,
    ...exNestedEdges,
    ...exHtmlTableEdges,
    ...exNestedHtmlTableEdges,
    ...exColorsEdges,
    ...exRoundedEdges,
    ...exPortsEdges,
    ...exProjEdges,
];
const examplesSubgraphs: Graphviz.Cluster[] = [
    { id: "sgExamples", label: "Examples" },
    // Per-example clusters
    { id: "sgExDotted", label: "Dotted edges etc", parentID: "sgExamples" },
    { id: "sgExRecord", label: "Shape: record vs. plaintext", parentID: "sgExamples" },
    { id: "sgExMulti", label: "Multiple edges", parentID: "sgExamples" },
    { id: "sgExAlign", label: "Left, mid and right aligned text", parentID: "sgExamples" },
    { id: "sgExTitle", label: "Giving the graph a title", parentID: "sgExamples" },
    { id: "sgExHtmlLabel", label: "HTML like labels", parentID: "sgExamples" },
    { id: "sgExRank", label: "rank", parentID: "sgExamples" },
    { id: "sgExSubgraph", label: "Subgraph (clusters)", parentID: "sgExamples" },
    { id: "sgExSgClusterR", label: "", parentID: "sgExSubgraph" },
    { id: "sgExSgRankSame", label: "", parentID: "sgExSgClusterR", rank: "same", cluster: false },
    { id: "sgExNested", label: "Nested clusters", parentID: "sgExamples" },
    { id: "sgExNestParent", label: "Parent", parentID: "sgExNested" },
    { id: "sgExNestC1", label: "Child one", parentID: "sgExNestParent" },
    { id: "sgExNestGC1", label: "Grand-Child one", parentID: "sgExNestC1" },
    { id: "sgExNestGC2", label: "Grand-Child two", parentID: "sgExNestC1" },
    { id: "sgExNestC2", label: "Child two", parentID: "sgExNestParent" },
    { id: "sgExHtmlTable", label: "HTML table", parentID: "sgExamples" },
    { id: "sgExNestedHtmlTable", label: "Nested HTML table", parentID: "sgExamples" },
    { id: "sgExColors", label: "Colors", parentID: "sgExamples" },
    { id: "sgExRounded", label: "Rounded box", parentID: "sgExamples" },
    { id: "sgExPorts", label: "Ports", parentID: "sgExamples" },
    { id: "sgExProj", label: "Project Dependencies", parentID: "sgExamples" },
];

const VERTEX_ARR: Graphviz.Node[] = [...arrowVertices, ...shapeVertices, ...examplesVertices];
const EDGE_ARR: Graphviz.Edge[] = [...arrowEdges, ...shapeRowEdges, clusterOrderEdge, ...examplesEdges];

const SUBGRAPH_ARR: Graphviz.Cluster[] = [
    { id: "sgArrows", label: "Arrow Types" },
    { id: "sgShapes", label: "Vertex Shapes" },
    { id: "sgCustom", label: "Custom SVG Content" },
    ...arrowRowSubgraphs,
    ...shapeRowSubgraphs,
    ...examplesSubgraphs,
];

const GRAPH: Graphviz.Graph = {
    label: "Legend",
    labelloc: "t",
    fontsize: 24,
    labeljust: "c",
    fontnames: "svg",
    graphDefaults: { fontname: "Arial", labeljust: "l" },
    nodeDefaults: { fontname: "Arial" },
    edgeDefaults: { fontname: "Arial" },

};

let store = new Graphviz.Store();
store.load(VERTEX_ARR, EDGE_ARR, SUBGRAPH_ARR, GRAPH);

// store = store.createView(["exRec_B", "s31"]);

export class Test7 extends Graphviz.Widget {

    constructor() {
        super();
        this.data({
            vertices: store.vertices(),
            edges: store.edges(),
            subgraphs: store.subgraphs(),
            graph: store.graph()
        });
        setTimeout(() => {
            this.setClass("unknown", ["s17", "s19", "s21", "s23", "s25", "s27", "s29", "s31"]);
            this.setClass("complete", ["s1", "s3", "s5", "s7", "s9", "s11", "s13", "s15"]);
            this.setClass("failed", ["s0", "s2", "s4", "s6", "s8", "s10", "s12", "s14"]);
            this.setClass("running", ["s16", "s18", "s20", "s22", "s24", "s26", "s28", "s30"]);
        }, 2000);
    }
}
