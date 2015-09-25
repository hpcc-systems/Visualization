$(function(){
    renderTabbedObjs('main');
});
var timerStart = Date.now();
var g_tabs;
var g_grids;
var g_useTabs = false;
function renderTabbedObjs(targetId){
    if(typeof (g_tabbedObjArr) !== 'undefined'){
        require(['src/layout/TabbedContent','src/layout/Grid'],function(Tabs,Grid){
            var pendingCallbacks = g_tabbedObjArr.length;
            if(g_useTabs){
                g_tabs = new Tabs().target(targetId);
            } else {
                g_grids = new Grid().fitTo("width").target(targetId);
            }

            var srcList = [];

            for(var idx in g_tabbedObjArr){
                g_tabbedObjArr[idx]['widgets'].forEach(function(obj){
                    if(srcList.indexOf(obj['src']) === -1){
                        srcList.push(obj['src']);
                    }
                });
            }
            require(srcList,function(){
                for(var idx in g_tabbedObjArr){
                    var tabLabel = g_tabbedObjArr[idx]['tabLabel'];
                    var widgetArr = g_tabbedObjArr[idx]['widgets'];

                    var grid = new Grid();
                    if(g_useTabs){
                        if(typeof (g_fitTo) !== 'undefined'){
                            grid.fitTo(g_fitTo);
                        }
                        g_tabs.addTab(grid, tabLabel);
                    } else {
                        grid.fitTo("all");
                        var y = typeof (g_graphPlacement) !== 'undefined' ? g_graphPlacement[idx].y : idx;
                        var x = typeof (g_graphPlacement) !== 'undefined' ? g_graphPlacement[idx].x : 0;
                        var w = typeof (g_graphPlacement) !== 'undefined' ? g_graphPlacement[idx].w : 1;
                        var h = typeof (g_graphPlacement) !== 'undefined' ? g_graphPlacement[idx].h : 1;
                        g_grids.setContent(y, x, grid, tabLabel, h, w);
                    }

                    for(var i in widgetArr){
                        var wIdx = srcList.indexOf(widgetArr[i]['src']);
                        var widget = new arguments[wIdx]()
                            .data(widgetArr[i]['data'])
                            .columns(widgetArr[i]['columns'])
                        ;
                        if(typeof (widgetArr[i]['click']) === 'function'){
                            widget.on('click',widgetArr[i]['click']);
                        }
                        applyPublishParams(widget,widgetArr[i]['params']);
                        grid.setContent(
                                widgetArr[i]['grid']['y'],
                                widgetArr[i]['grid']['x'],
                                widget,
                                widgetArr[i]['grid']['title'],
                                widgetArr[i]['grid']['ySpan'],
                                widgetArr[i]['grid']['xSpan']
                            )
                        ;
                    }
                    pendingCallbacks--;
                    if(pendingCallbacks === 0){
                        if(g_useTabs){
                            g_tabs.render(function(){
                                $('a:contains("JS chart by amCharts")').hide();
                            });
                        } else {
                            g_grids.render(function(){
                                $('a:contains("JS chart by amCharts")').hide();
                            });
                        }
                    }
                }
            });
        });
    }
}
function applyPublishParams(obj,params){
    for(var p in params){
        if(typeof (obj[p]) === 'function'){
            obj[p](params[p]);
        }
    }
}
function doResize(){}