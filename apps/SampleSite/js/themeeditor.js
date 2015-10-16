var g_checkedFilter;
var g_theme;
var g_serial;
var g_palette;
var g_showTitles = true;
var g_showHover = true;
var widgetArrToTest = []
var g_themeEditor;
var g_args;
var g_persist;
var g_similarProps;
var g_allProps;
var g_gridCols;
var g_gridFitAll = true;
var g_mainGrid;
var body = document.getElementById("body");
var mainDiv = document.getElementById("graph-container");
var frame = null;
var main = null;
var testWidgetArr = null;
var currWidget = null;
var debouncedResize = null;
var toggleCellTitle = null;
var g_gridThis;
var g_themeObj;
var g_serialObj;

$(function() {
    g_checkedFilter = window.location.search.split("?")[1];
    g_checkedFilter = g_checkedFilter === 'png' ? undefined : g_checkedFilter;
    // buildCheckboxList();
    // initWidgetTestArr();
    window.addEventListener("TE Properties Ready",insertJQueryThemeEditorOptions,false);
});

require(["./test/Factory"],
    function (testFactory){

    var categoryOptions = d3.map(testFactory.categories).entries();
    categoryOptions.forEach(function(d,i) {
        widgetArrToTest.push({"header":getProperName(d.key)})

        var widgetOptions = d3.map(d.value).entries();
        widgetOptions.forEach(function(d2) {
            var key = d2.key;
            var obj = {};
            obj[key] = d3.map(d2.value).entries()[0].value.widgetPath;
            widgetArrToTest.push(obj);
        })
    });
    buildCheckboxList();
    initWidgetTestArr();
});

function findExceptionPartials(arr){
    var ret_arr = [];
    arr.forEach(function(b){
        for(var i in b){
            var path = b[i];
            if(_isPartialMathOnSomething(path)){
                ret_arr.push(path);
            }
        }
    });
    return ret_arr;

    function _isPartialMathOnSomething(path){
        var ret = false;
        arr.forEach(function(b){
            for(var i in b){
                var path2 = b[i];
                if(path2.indexOf(path) !== -1 && path !== path2){
                    ret = true;
                }
            }
        });
        return ret;
    }
}
function teViewSaves(method){
    var body = '';
    var saves = g_themeEditor[method]();
    for(var i in saves){
        body += '<span><b>'+i+':</b></span><br>'
        body += '<textarea style="width:100%;">'+JSON.stringify(saves[i])+'</textarea><br>';
    }
    bsModal(method === 'getThemes' ? 'Saved Themes' : 'Saved Serials',body);

    $('#modal').modal();
    $('#modal .modal-dialog').css({"width":'90%',"height":'90%'});
    $('#modal textarea').height(100);
}
g_defaultThemes();
g_defaultSerials();

require(["src/layout/Surface", "src/layout/Grid", "src/other/Persist", "src/other/ThemeEditor", "src/common/Palette", "./test/Factory"],
    function (Surface, Grid, Persist, ThemeEditor, Palette, testFactory){
        g_persist = Persist;
        g_palette = Palette;

        fillWidgetColorsDropdown();
        var themeEditor = new ThemeEditor().showColumns(false).showData(false).showSettings(true);
        main = new Grid()
            .gutter(0)
            .setContent(0, 4, themeEditor, "", 2, 2)
        ;
        frame = new Surface()
            .surfacePadding(0)
            .surfaceBorderWidth(0)
            .widget(main)
            .target("graph-container")
        ;

        function displayProperties(sourceWidget) {
            //if (document.getElementById("showProperties").checked) {
                sourceWidget = sourceWidget || currWidget;
                themeEditor
                    .data([sourceWidget])
                    .render()
                ;
            //}
        }

        toggleCellTitle = function (testWidget,showHide) {
            showHide = typeof(showHide) === 'undefined' ? false : showHide;
            var cellArr = g_themeEditor._data[0].content();
            for(var i in cellArr){
                cellArr[i].title(showHide ? testWidget[i] : "");
            }
            g_themeEditor._data[0].render();
        }
        testWidgetArr = function (testWidget) {
            var includePathArr;
            g_themeEditor = themeEditor;
            themeEditor.__meta_loadedTheme.set = themeEditor.getDefaultThemes();
            themeEditor.__meta_loadedSerial.set = themeEditor.getDefaultSerials();
            if(typeof(testWidget) === "object"){
                includePathArr = ['src/layout/Grid'].concat(testWidget);
            } else {
                includePathArr = [testWidget];
            }
            require(includePathArr, function (GridWidget) {
                currWidget = new GridWidget();
                g_mainGrid = currWidget;
                g_args = arguments;
                g_theme = themeEditor.loadedTheme();
                g_serial = themeEditor.loadedSerial();
                applyTheme(arguments,themeEditor.themeMode());

                var gridCols = Math.ceil(Math.sqrt(arguments.length - 1));
                g_gridCols = typeof(g_gridCols) === 'undefined' ? gridCols : g_gridCols;

                var gridFit = g_gridFitAll ? "all" : "width";

                currWidget.fitTo(gridFit);
                gridCols = g_gridCols;

                for( var aIdx = 1; aIdx < arguments.length; aIdx++ ){
                    var cellTitle = "";
                    if(g_showTitles){
                        cellTitle = testWidget[aIdx-1];
                    }
                    testWidg = function(func, idx, title){
                        func(function(widg){
                            var widgetObj =widg;
                            var wData = widgetObj.data();
                            for(var i in wData){
                                if(/^[a-zA-Z\s]+$/.test(wData[i][0])){
                                    wData[i][0] = String.fromCharCode(65 + parseInt(i));
                                }
                            }
                            widgetObj.data(wData);
                            currWidget.setContent(Math.floor((idx-1)/gridCols), (idx-1)%gridCols, widgetObj, title);
                            currWidget.render();  
                        });
                    }
                    testWidg(d3.map(testFactory.widgets[includePathArr[aIdx]]).values()[0].factory, aIdx, cellTitle)
                   
                }
                if(typeof(currWidget.content()[0]) !== 'undefined'){
                    applyTheme([currWidget.content()[0]],themeEditor.themeMode());
                }

                main
                    .setContent(0, 0, currWidget, "", 2, 4)
                ;
                frame
                    .render(function (mainWidget) {
                        displayProperties(currWidget);
                        afterGridLoads();
                    })
                ;
            });
        }
        testWidgetArr(widgetArrToTest);
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
function applyTheme(arr,themeMode){
    for(var i in arr){
        var widget = arr[i];
        var proto = typeof(widget.prototype) !== "undefined" ? widget.prototype : Object.getPrototypeOf(widget);
        var serial = themeMode ? g_themeObj[g_theme] : g_serialObj[g_serial];
        for(var j in proto){
            if(typeof(proto[j]) !== "undefined" && proto[j] !== null && j.slice(0,7) === "__meta_"){
                if(typeof(serial[j.slice(7)]) !== "undefined"){
                    if(typeof(proto[j].trueDefaultValue) === "undefined"){
                        proto[j].trueDefaultValue = proto[j].defaultValue;
                    }
                    proto[j].defaultValue = serial[j.slice(7)];
                } else if (typeof(proto[j].trueDefaultValue) !== "undefined") {
                    proto[j].defaultValue = proto[j].trueDefaultValue;
                }
            }
        }
    }
}
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
                var isChecked = _filter(src[key]) ? 'checked' : '';
                checkHTML += '<li role="presentation"><a class="menu_item" role="menuitem" tabindex="-1" href="#"><label><input type="checkbox" value="' + src[key] + '" ' + isChecked + '/><span> ' + key + '</span></label></a></li>';
            }
        }
        ;
    });
    $checkWrapper.html(checkHTML);
    function _filter(pathString) {
        var ret = false;
        if (typeof(g_checkedFilter) === "undefined") {
            var defaultRandomChartCount = 4;
            g_checkedFilter = _defaultRandomCharts(defaultRandomChartCount);
            g_showTitles = true;
        }
        var filterArr = g_checkedFilter.split('|');
        filterArr.forEach(function(filt) {
            if (pathString.indexOf(filt) !== -1) {
                ret = true;
            }
        });
        return ret;

        function _defaultRandomCharts(n){
            var retArr = [];
            var allSrc = [];
            var excludeList = ["src/common/Text", "src/chart/MultiChart", "src/common/Composition"];
            for(var i in widgetArrToTest){
                if(typeof (widgetArrToTest[i]['header']) === 'undefined'){
                    for(var j in widgetArrToTest[i]){
                        allSrc.push(widgetArrToTest[i][j]);
                    }
                }
            }
            while(retArr.length < n){
                var randomSrcIdx = Math.floor(Math.random()*allSrc.length);
                if(excludeList.indexOf(allSrc[randomSrcIdx]) === -1 && retArr.indexOf(allSrc[randomSrcIdx]) === -1){
                    retArr.push(allSrc[randomSrcIdx]);
                }
            }
            return retArr.join('|');
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
    var checkboxArr = $("#dropdown-checkbox-wrapper input");
    widgetArrToTest = [];
    checkboxArr.each(function(i, checkbox) {
        if ($(checkbox).not(".headerCheck").is(':checked')) {
            widgetArrToTest.push($(checkbox).val());
        }
    });

    $('button.done').click(function() {
        $('#themeGroup').removeClass('open');
        initWidgetTestArr();
        testWidgetArr(widgetArrToTest);
    });
    $('button.cancel').click(function() {
        $('#themeGroup').removeClass('open');
    });
}
function afterGridLoads() {
    $('tr.sharedPropertyRow,tr.propertyRow').hover(function() {
        if(g_showHover){
            var th = $(this).children('th.te-label');
            if(typeof (th.next().children().first().attr('data-wids')) !== 'undefined'){
                var widArr = th.next().children().first().attr('data-wids').split(',');
                var widSelector = "#"+widArr.join(",#");
                var ghostHTML = '';
                $(widSelector).each(function(){
                    var w = $(this);
                    if(!$(this).hasClass('other_ThemeEditor')){
                        if (w.is('svg,svg *')) {
                            w = w.closest('svg').parent();
                        }
                        var top = w.offset().top - $(window).scrollTop();
                        var left = w.offset().left;
                        var width = w[0].getBoundingClientRect().width;
                        var height = w[0].getBoundingClientRect().height;
                        ghostHTML += ghostDiv(top, left, width, height);
                    }
                });
                $('body').append(ghostHTML);
            }
        }
    }, function() {
        if(g_showHover){
            $('.ghostDiv').remove();
        }
    });
    $('a:contains("JS chart by")').css('display','none');
    if(g_replaceBodyWithPNG){
        setTimeout(function(){
            downloadGridPng($('.layout_Grid').eq(1).parent(),true);
        },1000);
    }

}
function ghostDiv(top, left, width, height) {
    var style = "top:" + top + "px;left:" + left + "px;width:" + width + "px;height:" + height + "px;";
    var html = '<div class="ghostDiv" style="' + style + '"></div>';
    return html;
}
function insertJQueryThemeEditorOptions(){
    if($('#te-jq-show-titles').length === 0){
        var jqueryTeOptions = [
            {
                th: 'Show Titles',
                td: '<input id="te-jq-show-titles" class="te-checkbox" type="checkbox"' + (g_showTitles ? ' checked' : '') + '>'
            },
            {
                th: 'Show Hover',
                td: '<input id="te-jq-show-hover" class="te-checkbox" type="checkbox"' + (g_showHover ? ' checked' : '') + '>'
            },
            {
                th: 'Grid Columns',
                td: '<input id="te-jq-grid-cols" class="te-input" type="number" min="1" step="1" value="'+g_gridCols+'">'
            },
            {
                th: 'Grid Fit All',
                td: '<input id="te-jq-grid-fit" class="te-checkbox" type="checkbox"' + (g_gridFitAll ? ' checked' : '') + '>'
            }
        ];
        jqueryTeOptions.forEach(function(opt) {
            $('#te-themeEditorOptions').find('tbody').append('<tr class="propertyRow"><th class="te-label">' + opt.th + '</th><td>' + opt.td + '</td></tr>');
        });
        setTimeout(function(){
            $('#te-jq-show-titles').change(function() {
                var isChecked = $(this).is(':checked');
                g_showTitles = isChecked;
                toggleCellTitle(widgetArrToTest,g_showTitles);
            });
            $('#te-jq-show-hover').change(function() {
                var isChecked = $(this).is(':checked');
                g_showHover = isChecked;
            });
            $('#te-jq-grid-cols').change(function() {
                var val = $(this).val();
                g_gridCols = parseInt(val) > 0 ? parseInt(val) : undefined;
                testWidgetArr(widgetArrToTest);
            });
            $('#te-jq-grid-fit').change(function() {
                var isChecked = $(this).is(':checked');
                g_gridFitAll = isChecked;
                g_themeEditor._data[0].fitTo(g_gridFitAll ? "all" : "width").render();
            });
        },100);
    }
}
function g_defaultThemes(idx,doReset) {
    var defaultThemes = {
        "Default": {"__themeSerial": true},
        "LN Red/Grey": {"__themeSerial": true,
            "surfaceTitleBackgroundColor": "#ED1C24",
            "surfaceTitleFontColor": "#FAFAFA",
            "surfaceBackgroundColor": "#FAFAFA",
            "surfaceBorderColor": "#6D6E71",
            "surfaceBorderWidth": 1,
            "surfaceBorderRadius": 4,
            "surfaceTitleFontSize": 16,
            "surfaceTitleFontBold": false,
            "surfaceTitleAlignment": "center",
            "surfaceTitleFontFamily": "PT Sans",
            "fontFamily": "PT Sans",
            "fontSize": 12,
            "paletteID": "Set1"
        },
        "Dirty Ivory": {"__themeSerial": true,
            "surfaceTitleBackgroundColor": "#554700",
            "surfaceTitleFontColor": "#FDFEAA",
            "surfaceBackgroundColor": "#FFF1AA",
            "surfaceBorderColor": "#554700",
            "surfaceBorderWidth": 1,
            "surfaceBorderRadius": 8,
            "surfaceTitleFontSize": 16,
            "surfaceTitleFontBold": false,
            "surfaceTitleAlignment": "left",
            "fontFamily": "Tahoma",
            "paletteID": "Dark2"
        },
        "Green": {"__themeSerial": true,
            "surfaceTitleBackgroundColor": "#009C5D",
            "surfaceTitleFontColor": "#72E9B9",
            "surfaceBackgroundColor": "#72E9B9",
            "surfaceBorderColor": "#009C5D",
            "surfaceBorderWidth": 0,
            "surfaceBorderRadius": 6,
            "surfaceTitleFontSize": 14,
            "surfaceTitleFontBold": false,
            "surfaceTitleAlignment": "left",
            "fontFamily": "Verdana",
            "fontSize": 12,
            "paletteID": "hpcc20"
        },
        "Navy Blue": {"__themeSerial": true,
            "surfaceTitleBackgroundColor": "#446E82",
            "surfaceTitleFontColor": "#032535",
            "surfaceBackgroundColor": "#FAFAFA",
            "surfaceBorderColor": "#446E82",
            "surfaceBorderWidth": 1,
            "surfaceBorderRadius": 6,
            "surfaceTitleFontSize": 16,
            "surfaceTitleFontBold": false,
            "surfaceTitleAlignment": "left",
            "fontFamily": "Trebuchet MS",
            "fontSize": 12,
            "paletteID": "Set1"
        }
    };
    if(doReset){
        localStorage.themeEditorThemes = JSON.stringify(defaultThemes);
    }
    if(typeof(idx) !== 'undefined' && typeof(Object.keys(defaultThemes)[idx]) !== 'undefined'){
        g_theme = Object.keys(defaultThemes)[idx];
    }
    if(typeof(localStorage.themeEditorThemes) !== "undefined"){
        try{
            g_themeObj = JSON.parse(localStorage.themeEditorThemes);
            for(var i in defaultThemes){
                if(typeof(g_themeObj[i]) !== "object"){
                    g_themeObj[i] = defaultThemes[i];
                }
            }
        }catch(e){
            console.error(e);
            console.group("localStorage.themeEditorThemes did not parse successfully as JSON");
            console.log("Here's what it tried to parse:");
            console.log('localStorage.themeEditorThemes:');
            console.log(localStorage.themeEditorThemes);

            console.log("Reverting to defaultThemes");
            console.groupEnd();

            localStorage.themeEditorThemes = JSON.stringify(defaultThemes);
        }
    } else {
        localStorage.themeEditorThemes = JSON.stringify(defaultThemes);
    }
}
function g_defaultSerials(idx,doReset) {
    var defaultSerials = {
        "Default": {"__themeEditorSerial": true}
    };
    if(doReset){
        localStorage.themeEditorSerials = JSON.stringify(defaultSerials);
    }
    if(typeof(idx) !== 'undefined' && typeof(Object.keys(defaultSerials)[idx]) !== 'undefined'){
        g_serial = Object.keys(defaultSerials)[idx];
    }
    if(typeof(localStorage.themeEditorSerials) !== "undefined"){
        try{
            g_serialObj = JSON.parse(localStorage.themeEditorSerials);
            for(var i in defaultSerials){
                if(typeof(g_serialObj[i]) !== "object"){
                    g_serialObj[i] = defaultSerials[i];
                }
            }
        }catch(e){
            console.error(e);
            console.group("localStorage.themeEditorSerials did not parse successfully as JSON");
            console.log("Here's what it tried to parse:");
            console.log('localStorage.themeEditorSerials:');
            console.log(localStorage.themeEditorSerials);

            console.log("Reverting to defaultSerials");
            console.groupEnd();

            localStorage.themeEditorSerials = JSON.stringify(defaultSerials);
        }
    } else {
        localStorage.themeEditorSerials = JSON.stringify(defaultSerials);
    }
}
