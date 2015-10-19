// General Page Functions

var g_widget;
var s_widget;
var doc_page;

function buildMenu() {
    require(["d3", "src/layout/Surface", "src/layout/Grid", "src/other/Persist", "src/other/PropertyEditor", "test/Factory"], function (d3, Surface, Grid, Persist, PropertyEditor, testFactory) {
        var widgetPath = "src/chart/Column";
        var params = {};
        var sampleSelect = d3.select(".dropdown-menu");
        var categoryOptions = sampleSelect.selectAll("li").data(d3.map(testFactory.categories).entries());

        categoryOptions.enter()
            .append("li")
            .attr("value", function (d, idx) { return idx; })
            .text(function (d) { return getProperName(d.key); })
            .append("ul")
        ;
        var thisFactory = "",
            thisWidget = "";

        categoryOptions.each(function (d1, idx) {
            var categorySelect = d3.select(this).select("ul").classed("widgetMenu", true);
            var widgetOptions = categorySelect.selectAll("li").data(d3.map(d1.value).entries());
            widgetOptions.enter()
                .append("li")
                .attr("value", function (d, idx) { return idx; })
                .text(function (d) { return d.key; })
                .on("click", function (d) {
                    widgetPath = d3.map(d.value).values()[0].widgetPath;
                    getExampleCode(d1.key, d.key);
                    testWidget(d3.map(d.value).values()[0].factory);
                    $('a[href="#chartTab1"]').html(getProperName(d1.key) + ": " + d.key);
                })
            ;
        });
        categoryOptions.exit()
            .remove()
        ;
    
        var serializationSurface = new Surface()
            .target("serialization-test-wrapper")
            .surfacePadding(10)
        ;

        frame = new Surface()
            .target("widget-wrapper")
            .surfacePadding(0)
            .surfaceBorderWidth(0)
        ;
    
        function displaySerialization(sourceWidget) {
            sourceWidget = sourceWidget;
            Persist.clone(sourceWidget, function (widget) {
                serializationSurface
                    .widget(widget)
                    .render()
                ;
            });
        }

        function displaySerializationText(sourceWidget) {
            sourceWidget = sourceWidget;
            var text = JSON.stringify(Persist.serializeToObject(sourceWidget, null, false), null, "  ");
            d3.select("#serialization-json-wrapper")
                .attr("class", "prettyprint")
                .text(text)
            ;
        }

        testWidget = function (func, params) {
            func(function (widget) {
                currWidget = widget;
                if (params) {
                    for (var key in params) {
                        currWidget[key](params[key]);
                    }
                }
                frame
                    .widget(currWidget)
                    .render(function (mainWidget) {
                        displaySerialization(currWidget);
                        displaySerializationText(currWidget);
                        discover_this(currWidget);
                        updateSerialization(currWidget);
                        $('#hierarchy-wrapper').empty();
                        getHierarchyDynamically('../../' + widgetPath, widgetPath);
                        var splitPath = widgetPath.replace("src/", "").split("/");
                        getExampleCode(splitPath[0], splitPath[1]);
                        $('a[href="#chartTab1"]').unbind().on("shown.bs.tab",function(){
                            frame
                                .resize()
                                .render()
                            ;
                        });
                        doc_page = widgetPath.replace("src/", ""); 
                    })
                ;
            });
        };

        var first = true;
        frame.doResize = Surface.prototype.debounce(function () {
            this
                .resize()
                .render()
            ;
            if (first) {
                first = false;

                testWidget(d3.map(testFactory.widgets[widgetPath]).values()[0].factory, params);
                $('a[href="#chartTab1"]').html(getProperName(d3.map(testFactory.widgets[widgetPath]).values()[0].folder) + ": " + d3.map(testFactory.widgets[widgetPath]).values()[0].file);
            }
        }, 250);
        frame.doResize();
    });
}

function discover_this(widget_obj) { // from dermatology_modal.js
    $('#discover-pane').empty();
    require(["src/other/PropertyEditor"], function(PropertyEditor) {
        var PropertyEditor = new PropertyEditor()
            .data([widget_obj])
            .target("discover-pane")
            .paramGrouping("By Widget")
            // .collapsibleSections(false)
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

function getExampleCode(cat, widg){
    $.ajax({
        url: "sample_html/" + cat + "/" + widg + ".html",
        success: function(html) {
            $('#example-code-pre').text(html);
            $('#example-code-pre').removeClass('prettyprinted');
            prettyPrint();
        },
        error: function() {
            createExampleCode(cat, widg, "", function(code) {
                $('#example-code-pre').text(code);
                $('#example-code-pre').removeClass('prettyprinted');
                prettyPrint();
            });
        }
    });
}
