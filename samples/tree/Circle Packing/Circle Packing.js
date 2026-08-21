import { CirclePacking } from '@hpcc-js/tree';

new CirclePacking()
    .target("target")
    .data(getData())
    .render()
    ;

function getData() {
    return {
        label: "root",
        children: [
            {
                label: "analytics",
                children: [
                    {
                        label: "cluster",
                        children: [
                            { label: "AgglomerativeCluster", "size": 3938 },
                            { label: "CommunityStructure", "size": 3812 },
                            { label: "HierarchicalCluster", "size": 6714 },
                            { label: "MergeEdge", "size": 743 }
                        ]
                    },
                    {
                        label: "graph",
                        children: [
                            { label: "BetweennessCentrality", "size": 3534 },
                            { label: "LinkDistance", "size": 5731 },
                            { label: "MaxFlowMinCut", "size": 7840 },
                            { label: "ShortestPaths", "size": 5914 },
                            { label: "SpanningTree", "size": 3416 }
                        ]
                    },
                    {
                        label: "optimization",
                        children: [
                            { label: "AspectRatioBanker", "size": 7074 }
                        ]
                    }
                ]
            },
            {
                label: "animate",
                children: [
                    { label: "Easing", "size": 17010 },
                    { label: "FunctionSequence", "size": 5842 },
                    {
                        label: "interpolate",
                        children: [
                            { label: "ArrayInterpolator", "size": 1983 },
                            { label: "ColorInterpolator", "size": 2047 },
                            { label: "DateInterpolator", "size": 1375 },
                            { label: "Interpolator", "size": 8746 },
                            { label: "MatrixInterpolator", "size": 2202 },
                            { label: "NumberInterpolator", "size": 1382 },
                            { label: "ObjectInterpolator", "size": 1629 },
                            { label: "PointInterpolator", "size": 1675 },
                            { label: "RectangleInterpolator", "size": 2042 }
                        ]
                    },
                    { label: "ISchedulable", "size": 1041 },
                    { label: "Parallel", "size": 5176 },
                    { label: "Pause", "size": 449 },
                    { label: "Scheduler", "size": 5593 },
                    { label: "Sequence", "size": 5534 },
                    { label: "Transition", "size": 9201 },
                    { label: "Transitioner", "size": 19975 },
                    { label: "TransitionEvent", "size": 1116 },
                    { label: "Tween", "size": 6006 }
                ]
            },
            {
                label: "data",
                children: [
                    {
                        label: "converters",
                        children: [
                            { label: "Converters", "size": 721 },
                            { label: "DelimitedTextConverter", "size": 4294 },
                            { label: "GraphMLConverter", "size": 9800 },
                            { label: "IDataConverter", "size": 1314 },
                            { label: "JSONConverter", "size": 2220 }
                        ]
                    },
                    { label: "DataField", "size": 1759 },
                    { label: "DataSchema", "size": 2165 },
                    { label: "DataSet", "size": 586 },
                    { label: "DataSource", "size": 3331 },
                    { label: "DataTable", "size": 772 },
                    { label: "DataUtil", "size": 3322 }
                ]
            },
            {
                label: "display",
                children: [
                    { label: "DirtySprite", "size": 8833 },
                    { label: "LineSprite", "size": 1732 },
                    { label: "RectSprite", "size": 3623 },
                    { label: "TextSprite", "size": 10066 }
                ]
            },
            {
                label: "flex",
                children: [
                    { label: "FlareVis", "size": 4116 }
                ]
            },
            {
                label: "physics",
                children: [
                    { label: "DragForce", "size": 1082 },
                    { label: "GravityForce", "size": 1336 },
                    { label: "IForce", "size": 319 },
                    { label: "NBodyForce", "size": 10498 },
                    { label: "Particle", "size": 2822 },
                    { label: "Simulation", "size": 9983 },
                    { label: "Spring", "size": 2213 },
                    { label: "SpringForce", "size": 1681 }
                ]
            },
            {
                label: "query",
                children: [
                    { label: "AggregateExpression", "size": 1616 },
                    { label: "And", "size": 1027 },
                    { label: "Arithmetic", "size": 3891 },
                    { label: "Average", "size": 891 },
                    { label: "BinaryExpression", "size": 2893 },
                    { label: "Comparison", "size": 5103 },
                    { label: "CompositeExpression", "size": 3677 },
                    { label: "Count", "size": 781 },
                    { label: "DateUtil", "size": 4141 },
                    { label: "Distinct", "size": 933 },
                    { label: "Expression", "size": 5130 },
                    { label: "ExpressionIterator", "size": 3617 },
                    { label: "Fn", "size": 3240 },
                    { label: "If", "size": 2732 },
                    { label: "IsA", "size": 2039 },
                    { label: "Literal", "size": 1214 },
                    { label: "Match", "size": 3748 },
                    { label: "Maximum", "size": 843 },
                    {
                        label: "methods",
                        children: [
                            { label: "add", "size": 593 },
                            { label: "and", "size": 330 },
                            { label: "average", "size": 287 },
                            { label: "count", "size": 277 },
                            { label: "distinct", "size": 292 },
                            { label: "div", "size": 595 },
                            { label: "eq", "size": 594 },
                            { label: "fn", "size": 460 },
                            { label: "gt", "size": 603 },
                            { label: "gte", "size": 625 },
                            { label: "iff", "size": 748 },
                            { label: "isa", "size": 461 },
                            { label: "lt", "size": 597 },
                            { label: "lte", "size": 619 },
                            { label: "max", "size": 283 },
                            { label: "min", "size": 283 },
                            { label: "mod", "size": 591 },
                            { label: "mul", "size": 603 },
                            { label: "neq", "size": 599 },
                            { label: "not", "size": 386 },
                            { label: "or", "size": 323 },
                            { label: "orderby", "size": 307 },
                            { label: "range", "size": 772 },
                            { label: "select", "size": 296 },
                            { label: "stddev", "size": 363 },
                            { label: "sub", "size": 600 },
                            { label: "sum", "size": 280 },
                            { label: "update", "size": 307 },
                            { label: "variance", "size": 335 },
                            { label: "where", "size": 299 },
                            { label: "xor", "size": 354 },
                            { label: "_", "size": 264 }
                        ]
                    },
                    { label: "Minimum", "size": 843 },
                    { label: "Not", "size": 1554 },
                    { label: "Or", "size": 970 },
                    { label: "Query", "size": 13896 },
                    { label: "Range", "size": 1594 },
                    { label: "StringUtil", "size": 4130 },
                    { label: "Sum", "size": 791 },
                    { label: "Variable", "size": 1124 },
                    { label: "Variance", "size": 1876 },
                    { label: "Xor", "size": 1101 }
                ]
            },
            {
                label: "scale",
                children: [
                    { label: "IScaleMap", "size": 2105 },
                    { label: "LinearScale", "size": 1316 },
                    { label: "LogScale", "size": 3151 },
                    { label: "OrdinalScale", "size": 3770 },
                    { label: "QuantileScale", "size": 2435 },
                    { label: "QuantitativeScale", "size": 4839 },
                    { label: "RootScale", "size": 1756 },
                    { label: "Scale", "size": 4268 },
                    { label: "ScaleType", "size": 1821 },
                    { label: "TimeScale", "size": 5833 }
                ]
            },
            {
                label: "util",
                children: [
                    { label: "Arrays", "size": 8258 },
                    { label: "Colors", "size": 10001 },
                    { label: "Dates", "size": 8217 },
                    { label: "Displays", "size": 12555 },
                    { label: "Filter", "size": 2324 },
                    { label: "Geometry", "size": 10993 },
                    {
                        label: "heap",
                        children: [
                            { label: "FibonacciHeap", "size": 9354 },
                            { label: "HeapNode", "size": 1233 }
                        ]
                    },
                    { label: "IEvaluable", "size": 335 },
                    { label: "IPredicate", "size": 383 },
                    { label: "IValueProxy", "size": 874 },
                    {
                        label: "math",
                        children: [
                            { label: "DenseMatrix", "size": 3165 },
                            { label: "IMatrix", "size": 2815 },
                            { label: "SparseMatrix", "size": 3366 }
                        ]
                    },
                    { label: "Maths", "size": 17705 },
                    { label: "Orientation", "size": 1486 },
                    {
                        label: "palette",
                        children: [
                            { label: "ColorPalette", "size": 6367 },
                            { label: "Palette", "size": 1229 },
                            { label: "ShapePalette", "size": 2059 },
                            { label: "SizePalette", "size": 2291 }
                        ]
                    },
                    { label: "Property", "size": 5559 },
                    { label: "Shapes", "size": 19118 },
                    { label: "Sort", "size": 6887 },
                    { label: "Stats", "size": 6557 },
                    { label: "Strings", "size": 22026 }
                ]
            },
            {
                label: "vis",
                children: [
                    {
                        label: "axis",
                        children: [
                            { label: "Axes", "size": 1302 },
                            { label: "Axis", "size": 24593 },
                            { label: "AxisGridLine", "size": 652 },
                            { label: "AxisLabel", "size": 636 },
                            { label: "CartesianAxes", "size": 6703 }
                        ]
                    },
                    {
                        label: "controls",
                        children: [
                            { label: "AnchorControl", "size": 2138 },
                            { label: "ClickControl", "size": 3824 },
                            { label: "Control", "size": 1353 },
                            { label: "ControlList", "size": 4665 },
                            { label: "DragControl", "size": 2649 },
                            { label: "ExpandControl", "size": 2832 },
                            { label: "HoverControl", "size": 4896 },
                            { label: "IControl", "size": 763 },
                            { label: "PanZoomControl", "size": 5222 },
                            { label: "SelectionControl", "size": 7862 },
                            { label: "TooltipControl", "size": 8435 }
                        ]
                    },
                    {
                        label: "data",
                        children: [
                            { label: "Data", "size": 20544 },
                            { label: "DataList", "size": 19788 },
                            { label: "DataSprite", "size": 10349 },
                            { label: "EdgeSprite", "size": 3301 },
                            { label: "NodeSprite", "size": 19382 },
                            {
                                label: "render",
                                children: [
                                    { label: "ArrowType", "size": 698 },
                                    { label: "EdgeRenderer", "size": 5569 },
                                    { label: "IRenderer", "size": 353 },
                                    { label: "ShapeRenderer", "size": 2247 }
                                ]
                            },
                            { label: "ScaleBinding", "size": 11275 },
                            { label: "Tree", "size": 7147 },
                            { label: "TreeBuilder", "size": 9930 }
                        ]
                    },
                    {
                        label: "events",
                        children: [
                            { label: "DataEvent", "size": 2313 },
                            { label: "SelectionEvent", "size": 1880 },
                            { label: "TooltipEvent", "size": 1701 },
                            { label: "VisualizationEvent", "size": 1117 }
                        ]
                    },
                    {
                        label: "legend",
                        children: [
                            { label: "Legend", "size": 20859 },
                            { label: "LegendItem", "size": 4614 },
                            { label: "LegendRange", "size": 10530 }
                        ]
                    },
                    {
                        label: "operator",
                        children: [
                            {
                                label: "distortion",
                                children: [
                                    { label: "BifocalDistortion", "size": 4461 },
                                    { label: "Distortion", "size": 6314 },
                                    { label: "FisheyeDistortion", "size": 3444 }
                                ]
                            },
                            {
                                label: "encoder",
                                "children": [
                                    { label: "ColorEncoder", "size": 3179 },
                                    { label: "Encoder", "size": 4060 },
                                    { label: "PropertyEncoder", "size": 4138 },
                                    { label: "ShapeEncoder", "size": 1690 },
                                    { label: "SizeEncoder", "size": 1830 }
                                ]
                            },
                            {
                                label: "filter",
                                "children": [
                                    { label: "FisheyeTreeFilter", "size": 5219 },
                                    { label: "GraphDistanceFilter", "size": 3165 },
                                    { label: "VisibilityFilter", "size": 3509 }
                                ]
                            },
                            { label: "IOperator", "size": 1286 },
                            {
                                label: "label",
                                "children": [
                                    { label: "Labeler", "size": 9956 },
                                    { label: "RadialLabeler", "size": 3899 },
                                    { label: "StackedAreaLabeler", "size": 3202 }
                                ]
                            },
                            {
                                label: "layout",
                                "children": [
                                    { label: "AxisLayout", "size": 6725 },
                                    { label: "BundledEdgeRouter", "size": 3727 },
                                    { label: "CircleLayout", "size": 9317 },
                                    { label: "CirclePackingLayout", "size": 12003 },
                                    { label: "DendrogramLayout", "size": 4853 },
                                    { label: "ForceDirectedLayout", "size": 8411 },
                                    { label: "IcicleTreeLayout", "size": 4864 },
                                    { label: "IndentedTreeLayout", "size": 3174 },
                                    { label: "Layout", "size": 7881 },
                                    { label: "NodeLinkTreeLayout", "size": 12870 },
                                    { label: "PieLayout", "size": 2728 },
                                    { label: "RadialTreeLayout", "size": 12348 },
                                    { label: "RandomLayout", "size": 870 },
                                    { label: "StackedAreaLayout", "size": 9121 },
                                    { label: "TreeMapLayout", "size": 9191 }
                                ]
                            },
                            { label: "Operator", "size": 2490 },
                            { label: "OperatorList", "size": 5248 },
                            { label: "OperatorSequence", "size": 4190 },
                            { label: "OperatorSwitch", "size": 2581 },
                            { label: "SortOperator", "size": 2023 }
                        ]
                    },
                    { label: "Visualization", "size": 16540 }
                ]
            }
        ]
    };
}