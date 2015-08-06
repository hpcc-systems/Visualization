var visibleWidgets = [];
var g_gridFitAll = false;
var mainDiv = document.getElementById("graph-container");
var g_checkedFilter;

$(function() {
    g_checkedFilter = window.location.search.split("?")[1];
    g_checkedFilter = g_checkedFilter === 'png' ? undefined : g_checkedFilter;
    buildCheckboxList();
    initWidgetTestArr();
});

var widgetArrToTest = [
    {"header": "D3 Charts",
        src:[
            {"Column Chart": "src/chart/Column"},
            {"Bubble Chart": "src/chart/Bubble"},
            {"Line Chart": "src/chart/Line"},
            {"Scatter Chart": "src/chart/Scatter"},
            {"Step Chart": "src/chart/Step"},
            {"Pie Chart": "src/chart/Pie"},
            {"Area Chart": "src/chart/Area"},
            {"MultiChart Surface": "src/chart/MultiChartSurface"}
        ]},
    {"header": "C3 Charts",
        src:[
            {"Area Chart": "src/c3chart/Area"},
            {"Bar Chart": "src/c3chart/Bar"},
            {"Column Chart": "src/c3chart/Column"},
            {"Line Chart": "src/c3chart/Line"},
            {"Scatter Chart": "src/c3chart/Scatter"},
            {"Step Chart": "src/c3chart/Step"},
            {"Pie Chart": "src/c3chart/Pie"},
            {"Donut Chart": "src/c3chart/Donut"},
            {"Gauge Chart": "src/c3chart/Gauge"}
        ]},
    {"header": "Google Charts",
        src:[
            {"Pie Chart": "src/google/Pie"},
            {"Bar Chart": "src/google/Bar"},
            {"Column Chart": "src/google/Column"},
            {"Line Chart": "src/google/Line"},
            {"Area Chart": "src/google/Area"},
            {"Timeline Chart": "src/google/Timeline"},
            {"TreeMap Chart": "src/google/TreeMap"},
            {"Scatter Chart": "src/google/Scatter"}
        ]},
    {"header": "Choropleth",
        src:[
            {"Choropleth (States)": "src/map/ChoroplethStates"},
            {"Choropleth (Counties)": "src/map/ChoroplethCounties"},
            {"Choropleth (Countries)": "src/map/ChoroplethCountries"}
        ]},
    {"header": "Miscellaneous",
        src:[
            {"Dendrogram": "src/tree/Dendrogram"},
            {"Circle Packing": "src/tree/CirclePacking"},
            {"Sunburst Partition": "src/tree/SunburstPartition"},
            {"Vertext": "src/graph/Vertex"},
            {"Table": "src/other/Table"},
            {"HTML Marshaller": "src/marshaller/HTML"}
        ]},
    {"header": "AmCharts",
        src:[
            {"Area Chart": "src/amchart/Area"},
            {"Bar Chart": "src/amchart/Bar"},
            {"Bubble Chart": "src/amchart/Bubble"},
            {"Candle Chart": "src/amchart/Candle"},
            {"Floating Column Chart": "src/amchart/FloatingColumn"},
            {"Funnel Chart": "src/amchart/Funnel"},
            {"Gauge Chart": "src/amchart/Gauge"},
            {"Line Chart": "src/amchart/Line"},
            {"Pie Chart": "src/amchart/Pie"},
            {"Polar Chart": "src/amchart/Polar"},
            {"Pyramid Chart": "src/amchart/Pyramid"},
            {"Scatter Chart": "src/amchart/Scatter"}
        ]},
    {"header": "UI Widgets",
        src:[
            {"Shape": "src/common/Shape"},
            {"Text": "src/common/Text"},
            {"Text Box": "src/common/TextBox"},
            {"FA Char": "src/common/FAChar"},
            {"Icon": "src/common/Icon"},
            {"List": "src/common/List"},
            {"Menu": "src/common/Menu"},
            {"Surface": "src/common/Surface"}
        ]},
    {"header": "Form Widgets",
        src:[
            {"Form": "src/form/Form"},
            {"Input": "src/form/Input"},
            {"Slider": "src/form/Slider"}
        ]}
];

require(["src/layout/Surface", "src/layout/Grid"],
    function (Surface, Grid) {
        main = new Grid()
            .gutter(0)
        ;
        frame = new Surface()
            .surfacePadding(0)
            .surfaceBorderWidth(0)
            .widget(main)
            .target("graph-container")
        ;

        testWidgetArr = function (testWidget) {
            var includePathArr;
            if(typeof(testWidget) === "object"){
                includePathArr = ['src/layout/Grid'].concat(testWidget);
            } else {
                includePathArr = [testWidget];
            }
            
            
            
            
            
            require(includePathArr, function (GridWidget) {
                currWidget = new GridWidget();
                g_mainGrid = currWidget;

                var gridFit = g_gridFitAll ? "all" : "width";

                currWidget.fitTo(gridFit);
                gridCols = 3; 
                var count = 0;
                widgetArrToTest.forEach(function(item,idx){
                    if(g_showTitles){
                        var groupTitle = item["header"];
                    }
                    var pathArr = item["src"];
                    pathArr.forEach(function(path, idx2) {
                        
                        for(var i in path) {
                            var cellTitle = groupTitle + ": " + i;
                            
                            if (includePathArr.indexOf(path[i]) > -1) {
                            require([path[i]], function (Widget) {

                                    var widgetObj = new Widget().testData();
                                    currWidget.setContent(Math.floor((count)/gridCols), (count)%gridCols, widgetObj, cellTitle);
                                    currWidget.gutter(40);
                                    count++;
                                });
                            }
                        }
                    });
                });

                main
                    .setContent(0, 0, currWidget, "", 2, 4)
                ;
                frame
                    .render(function () {
                        afterGridLoads();
                    })
                ;
            });
        };
        testWidgetArr(visibleWidgets);
        resize = function () {
            if (mainDiv) {
                var widthAdjustment = parseInt($('body').css('padding-left')) + parseInt($('body').css('padding-right'));
                var heightAdjustment = parseInt($("#main").css("margin-top")) + $("#main").offset().top;
                mainDiv.style.width = window.innerWidth - widthAdjustment + "px";
                mainDiv.style.height = window.innerHeight - heightAdjustment + "px";
            }

            frame
                .resize()
                .render()
            ;
        };
        debouncedResize = Surface.prototype.debounce(function () {
            resize();
        }, 250);
        resize();
    }
);

function doResize() {
    if (debouncedResize) {
        debouncedResize();
    }
}
$(function(){
    //over ride the defaullt bootstrap behavior of closing the dropdown
    $('#themeGroup').on('hide.bs.dropdown', function () {
        return false;
    });
    $('#graph-container').css({
        'height':$(window).height() - $('#graph-container').offset().top - 10
    });
    $('button.done').click(function() {
        $('#themeGroup').removeClass('open');
        initWidgetTestArr();
        testWidgetArr(visibleWidgets);
    });
    $('button.cancel').click(function() {
        console.log("j");
        $('#themeGroup').removeClass('open');
    });
});
function buildCheckboxList() {
    var $checkWrapper = $("#dropdown-checkbox-wrapper");
    var checkHTML = '';
    widgetArrToTest.forEach(function(src) {
        for (var key in src) {
            if (key === "header") {
                var headerInput = '<input type="checkbox" class="headerCheck" onchange="javascript:headerCheckboxChange(this);">';
                checkHTML += '<li role="presentation" class="dropdown-header">' + headerInput + src[key] + '</li>';
            } else {
                
                src[key].forEach(function(path) {
                    for (var key2 in path) {
                        var isChecked = _filter(path[key2]) ? 'checked' : '';
                        checkHTML += '<li role="presentation"><a class="menu_item" role="menuitem" tabindex="-1" href="#"><label><input type="checkbox" value="' + path[key2] + '" ' + isChecked + '/><span> ' + key2 + '</span></label></a></li>';
                    }
                });
            }
        }
        ;
    });
    $checkWrapper.html(checkHTML);
    function _filter(pathString) {
        var ret = false;
        if (typeof(g_checkedFilter) === "undefined") {
            g_checkedFilter = _getSource();
            g_showTitles = true;
        }
        var filterArr = g_checkedFilter.split('|');
        filterArr.forEach(function(filt) {
            if (pathString.indexOf(filt) !== -1) {
                ret = true;
            }
        });
        return ret;

        function _getSource(){
            var allSrc = [];
            var group;
            for(var i in widgetArrToTest){
                if(typeof (widgetArrToTest[i]['header']) === 'undefined'){
                    for(var j in widgetArrToTest[i]){
                        allSrc.push(widgetArrToTest[i][j]);
                    }
                } else {
                    group = widgetArrToTest[i]["header"];
                }
            }

            return allSrc.join('|');
        }
    }
}
function headerCheckboxChange(box){
    var $elm = $(box);
    var $li = $elm.closest('li.dropdown-header');
    while($li.next().length > 0 && !$li.next().hasClass('dropdown-header')){
        $li = $li.next();
        $li.find('input[type="checkbox"]').prop('checked',$elm.is(':checked'));
    }
}
function initWidgetTestArr() {
    var checkboxArr = $("#dropdown-checkbox-wrapper input").not(".headerCheck");
    visibleWidgets = [];
    checkboxArr.each(function(i, checkbox) {
        if ($(checkbox).is(':checked')) {
            visibleWidgets.push($(checkbox).val());
        }
    });
}
function afterGridLoads() {
    $('a:contains("JS chart by")').css('display','none');
    if(g_replaceBodyWithPNG){
        setTimeout(function(){
            downloadGridPng($('.layout_Grid').eq(1).parent(),true);
        },1000);
    }
}
