// General Page Functions
var g_widget;
var s_widget;
function quickChartInit(path, width, height){
    var path = "src/" + path;

//########Remove when initUiGraph is no longer needed
//    if (path == "src/graph/Graph") {
//        initUiGraph();
//        return;
//    }
    require([path,"src/common/Palette"], function(WidgetObj, Palette) {

    function clonePaletteID(sourceID, targetID) {Palette.ordinal(sourceID).clone(targetID); return targetID;}

        var i = 0;
        g_widget = new WidgetObj()
            .target('widget-wrapper')
            //.paletteID(clonePaletteID("default","uid_" + i++))
            .testData()
            .render(function (widget) {
                discover_this(widget);
                updateSerialization(widget);
                $("#exportPNGButton").click(function() {
                    //var url = ""
                   //document.getElementById('myiframe').src = url;
                });
            })
        ;
        $('.loading_spinner').remove();
    });

}
function discover_this(widget_obj) { // from dermatology_modal.js
    $('#discover-pane').empty();
    require(["src/other/PropertyEditor"], function(PropertyEditor) {
        var PropertyEditor = new PropertyEditor()
            .data([widget_obj])
            .target("discover-pane")
            .paramGrouping("By Widget")
            .collapsibleSections(false)
            .show_settings(false)
            .render()
        ;
        PropertyEditor.onChange = function (widget, propID) {
            if (propID === "columns") {
            } else if (propID === "data") {
            } else {
                updateSerialization(widget);
            }
        };
    });
}
function updateSerialization(widget) {
    require(["src/other/Persist"], function (Persist) {
        function displaySerialization(sourceWidget) {
            $('#serialization-test-wrapper').empty();
            Persist.clone(sourceWidget, function (widget) {
                widget
                    .target("serialization-test-wrapper")
                    .render()
                ;
                $('a[href="#serialization-test-pane"]').unbind().on("shown.bs.tab",function(e){
                     updateSerialization(widget);
                });
                s_widget = widget;
            });
        }

        function displaySerializationText(sourceWidget) {
            sourceWidget = sourceWidget || currWidget;
            var text = JSON.stringify(Persist.serializeToObject(sourceWidget, null, false), null, "  ");
            d3.select("#serialization-json-wrapper")
                .attr("class", "prettyprint")
                .text(text)
            ;
        }
        displaySerialization(widget);
        displaySerializationText(widget);
    });
}
function update_chart(el) {
    // Note: Data Attr(s) in Handlebar Template
    var chartObjPath = $(el).data("value"),
        chartObjWidth = parseInt($(el).data("width")),
        chartObjHeight = parseInt($(el).data("height")),
        //chartObjExample = $(el).data("example-url");
        chartObjExample = $(el).data("value");

    quickChartInit(chartObjPath, chartObjWidth, chartObjHeight);
    getExampleCode("sample_html/" + chartObjPath + ".html");
    $('#hierarchy-wrapper').empty();
    getHierarchyDynamically('../../src/' + chartObjPath, chartObjPath);
    $('a[href="#chartTab1"]').html(el.html()); // Update Tab Title

    /* Doc Section */
    resetDocVars();  // Reset Vars
    buildWidgetSrc(chartObjPath); // Build Doc and Update
}
function getExampleCode(exUrl){
    $.ajax({
        url: exUrl,
        success: function(html) {
            $('#example-code-pre').text(html);
            $('#example-code-pre').removeClass('prettyprinted');
            prettyPrint();
        },
        error: function() {
            $('#example-code-pre').text('Example Code File Not Found: ' + exUrl );
        }
    });
    $('#get_example_code').attr('href', exUrl);
}

//#############Hard coded for UI Graph because of different initialization methods
//#############Remove when we are sure we are no longer need it.
//function initUiGraph () {
//    var g_widget;
//    require(["src/graph/Graph","src/common/Icon","src/graph/Vertex","src/graph/Edge","src/common/TextBox"], function (Graph,Icon,Vertex,Edge,TextBox) {
//
//        // TODO - create .testData function
//        function createEdge(source, target, label) {
//            return new Edge()
//            .sourceVertex(source)
//            .targetVertex(target)
//            .sourceMarker("circleFoot")
//            .targetMarker("arrowHead")
//            .text(label || "")
//            ;
//        }
//        var vertices = [
//            new TextBox().text("c3/Pie.js"),          // 0
//            new TextBox().text("c3/Common2D.js"),     // 1
//            new TextBox().text("chart/I2DChart.js"),  // 2
//            new TextBox().text("c3/Common.js"),       // 3
//            new TextBox().text("common/Widget.js"),   // 4
//            new Icon()
//                .size({ width: 25, height:25 })
//                .shape("circle")
//                .faChar("\uf080"),
//            new Vertex()
//                .size({ width: 100, height:100 })
//                .text("Graph\nVertex")
//                .faChar("\uf080")
//        ];
//        var edges = [
//            createEdge(vertices[0], vertices[1]),
//            createEdge(vertices[1], vertices[2]),
//            createEdge(vertices[1], vertices[3]),
//            createEdge(vertices[3], vertices[4]),
//            createEdge(vertices[0], vertices[5]),
//            createEdge(vertices[0], vertices[6])
//        ];
//        g_widget = new Graph()
//            .size({width:400,height:400})
//            .target("widget-wrapper")
//            .hierarchyOptions({ rankSep: 18 })
//            .data({ vertices: vertices, edges: edges })
//            .layout("Hierarchy")
//            .render()
//        ;
//        $('.loading_spinner').remove();
//        discover_this(g_widget);
//    });
//}