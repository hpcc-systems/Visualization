var gridCols = 2;
var frame = null;
var main = null;
var g_mainGrid;
var g_persist;
var g_palette;
var testWidget;
var mainGrid;
var initialGridObj;

function closeMe() {
    alert("You Clicked Close");
};
function minimizeMe() {
    alert("You Clicked Minimize");
};
function maximizeMe() {
    alert("You Clicked Maximize");
};

require(["src/layout/Surface", "src/layout/Grid", "src/other/Persist", "src/common/Palette", "./test/Factory", "./test/DataFactory"],
    function (Surface, Grid, Persist, Palette, Factory, DataFactory) {
        var main = new Grid();
        g_grid = main;
        g_persist = Persist;
        g_palette = Palette;

        if(typeof (fillWidgetColorsDropdown) === 'function'){
            fillWidgetColorsDropdown();
        }

        var targetId = typeof (g_targetId) === "undefined" ? "graph-container" : g_targetId;
        var frame = new Surface()
            .surfacePadding(0)
            .widget(main)
            .target(targetId)
        ;

        createDynamicGrid = function (gridObj, gridCols) {
            var mainGrid = new Grid();
            g_mainGrid = mainGrid;
            var startItteration = function (index) {
                createWidget(index, function(){
                    index++;

                    if (index < gridObj.length) {
                        startItteration(index, mainGrid, main, frame);
                    } else {
                        main.setContent(0, 0, mainGrid, "");
                        frame.render(function() {
                            afterGridLoads(gridObj);
                        });
                    }
                });
            };

            function createWidget(index, callback) {
                var cellTitle = gridObj[index]["title"];

                var srcPath =  [];
                for (var i = 0; i < gridObj[index]["src"].length; i++) {
                    srcPath.push(gridObj[index]["src"][i]);
                }

                var cellGrid = new Grid();
                require(srcPath, function (SrcWidget) {
                    var place = {col: 0, row: 0, colSpan: 1, rowSpan: 1};
                        for (var i = 0; i < srcPath.length; i++) {
                            var thisWidget = new arguments[i];
                            if(typeof (gridObj[index]['childPlacement']) === 'undefined'){
                                place.row = Math.floor((i)/gridCols);
                                place.col = (i)%gridCols;
                            } else {
                                place = gridObj[index]['childPlacement'][i];
                            }
                            if(typeof (gridObj[index]['columns']) !== 'undefined' && typeof (gridObj[index]['data']) !== 'undefined'){
                                try{
                                    thisWidget
                                        .columns(gridObj[index]['columns'][i])
                                        .data(gridObj[index]['data'][i])
                                    ;
                                } catch(e) {
                                    console.log('Failed when loading user specified columns and/or data.');
                                    console.log('testData will be used to display the chart');
                                    console.log('e:');
                                    console.log(e);
                                }
                            } else {
                               console.log("No Data Found for: ")
                               console.log(gridObj[index]); 
                            }
                            if(typeof (gridObj[index]['params']) !== 'undefined'){
                                for(var paramId in gridObj[index]['params'][i]){
                                    if(typeof (thisWidget[paramId]) !== 'undefined'){
                                        thisWidget[paramId](gridObj[index]['params'][i][paramId]);
                                    } else {
                                        console.log('Param Doesnt exist:');
                                        console.log('paramId:');
                                        console.log(paramId);
                                        console.log("for this:");
                                        console.log(thisWidget._class);
                                    }
                                }
                            }
                            cellGrid.setContent(place.row, place.col, thisWidget, "", place.rowSpan, place.colSpan);
                        }
                        for (var i = 0; i < srcPath.length; i++) {
                            var thisWidget = new arguments[i];

                        }
                    if(typeof (gridObj[index]['myPlacement']) !== 'undefined'){
                        mainGrid.setContent(
                            gridObj[index]['myPlacement']['row'],
                            gridObj[index]['myPlacement']['col'],
                            cellGrid,
                            cellTitle,
                            gridObj[index]['myPlacement']['rowSpan'],
                            gridObj[index]['myPlacement']['colSpan']
                        );
                    } else {
                        mainGrid.setContent(Math.floor((index)/gridCols), (index)%gridCols,cellGrid,cellTitle);
                    }
                    gridObj[index]["id"] = cellGrid._id;

                    callback();
                });
            }

            startItteration(0);
        };

        createDynamicGrid(initialGridObj, gridCols);

        resize = function () {
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
function afterGridLoads(gridObj) {
    for (var j = 0; j < gridObj.length; j++) {
        var gridTitle = gridObj[j]["title"];
        gridObj[j]["buttons"].forEach(function(i){
            if (gridTitle) {
                var targ = $("#" + gridObj[j]["id"]).closest(".surfaceWidget").siblings("h3.surfaceTitle").find(".html-button-container")[0];
            } else {
                if (!$(".no_title_btn_cntr").length) {
                    $("#" + gridObj[j]["id"]).closest(".surfaceWidget").append("<span class='no_title_btn_cntr'></span>");
                }
                var targ = $("#" + gridObj[j]["id"]).closest(".surfaceWidget").find(".no_title_btn_cntr")[0];
//                console.log(targ);
            }

            require(["src/form/Input"], function (Input) {
                var button = new Input()
                    .type(i.type)
                    .value(i.value)
                    .label(i.label)
                    .name(i.name)
                    .target(targ)
                    .render()
                ;
                if (i.class) {
                    $(button._element[0]).addClass(i.class);
                }
                if (i.title) {
                    $(button._element[0]).attr("title", i.title);
                }
                button.click = function(d) { alert('Click registered on: ' + button.__prop_name ); };
            });
        });

        $("#" + gridObj[j]["id"]).closest(".surfaceWidget").each(function() {
            $(this).append("<div class=\"view_source btn btn-xs btn-default\" id=\"" + j + "\"><i class=\"fa fa-eye\"></i>&nbsp;View Source</div>");
        });
    }

    $(".view_source").on("click", function() {
        var newGridObj = initialGridObj;
        var id = $(this).attr("id");
        var srcPath = newGridObj[id]["src"];
        var args = "";
        var srcString = "";
        srcPath.forEach(function(i) {
            srcString = srcString  + ((srcString === '') ? '' : '", "')  + i;
            args = args + ((args === '') ? '' : ', ' ) + i.split(/[/]+/).pop();
        });
        srcString = '["src/layout/Grid", "' + srcString + '"]';
        var place = newGridObj[id]['childPlacement'];

        var html = '<!DOCTYPE html>\n';
            html += '<html>\n';
            html += '   <head>\n';
            html += '       <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.18/require.min.js"></script>\n';
            html += '       <script type="text/javascript" src="config.js"></script>\n';
            html += '   </head>\n';
            html += '   <body>\n';
            html += '       <script>\n';
            html += '           require('+ srcString + ', function (Grid, ' + args + ') {\n';
            html += '               new Grid()\n';

        srcPath.forEach(function(i, index) {
            var widget = i.split(/[/]+/).pop();
            if (place) {
                var placeArr = place[index];
                html += '                   .setContent(' + placeArr.row + ',' + placeArr.col + ', new ' + widget + '().testData(), "",' + placeArr.rowSpan + ',' + placeArr.colSpan + ')\n';
            } else {
                html += '                   .setContent(' + Math.floor((index)/2) + ',' + (index)%2 + ', new ' + widget + '().testData(), "")\n';
            }
        });

            html += '                   .target("widget-wrapper")\n';
            html += '                   .render()\n';
            html += '               ;\n';
            html += '           });\n';
            html += '       </script>\n';
            html += '       <div id="widget-wrapper" style="height: 95vh"></div>\n';
            html += '   </body>\n';
            html += '</html>';

        bsModal('Copy the code below to your own project','<pre class="source prettyprint"></pre>');
        $('#modal .source').text(html);

        prettyPrint();
        $('#modal').modal();
        $('#modal .modal-dialog').css({"width":'90%'});
    });

    if(typeof (g_replaceBodyWithPNG) !== 'undefined' && g_replaceBodyWithPNG){
        setTimeout(function(){
            downloadGridPng($('#graph-container'),true);
        },1000)
    }
    $('.layout_Grid').each(function(){
        var grid = $(this);
        var cellClass = 'cell_'+grid.attr('id');
        var cellArr = $('.'+cellClass);
        var gridTop = grid.offset().top;
        var gridHeight = 0;
        cellArr.each(function(){
            var y = $(this).outerHeight() + $(this).offset().top;
            if(y - gridTop > gridHeight){
                gridHeight = y - gridTop;
            }
        });
        grid.height(gridHeight);
    });
    $('#toggle-design-mode').change(function(){

    })
}
