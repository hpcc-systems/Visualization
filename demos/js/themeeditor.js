var g_checkedFilter;
var g_theme;
var g_serial;
var g_showTitles = true;
var g_showHover = false;
$(function() {
    g_checkedFilter = window.location.search.split("?")[1];
    buildCheckboxList();
    initWidgetTestArr();
    window.addEventListener("TE Properties Ready",insertJQueryThemeEditorOptions,false);
});
var widgetArrToTest = [
    {"header": "Shape"},
    {"Shape": "src/common/Shape"},
    {"Text": "src/common/Text"},
    {"Text Box": "src/common/TextBox"},
    {"FA Char": "src/common/FAChar"},
    {"Icon": "src/common/Icon"},
    {"List": "src/common/List"},
    {"Menu": "src/common/Menu"},
    {"Surface": "src/common/Surface"},
    {"header": "C3 Charts"},
    {"Area Chart": "src/c3chart/Area"},
    {"Bar Chart": "src/c3chart/Bar"},
    {"Column Chart": "src/c3chart/Column"},
    {"Line Chart": "src/c3chart/Line"},
    {"Scatter Chart": "src/c3chart/Scatter"},
    {"Step Chart": "src/c3chart/Step"},
    {"Pie Chart": "src/c3chart/Pie"},
    {"Donut Chart": "src/c3chart/Donut"},
    {"Gauge Chart": "src/c3chart/Gauge"},
    {"header": "Google Charts"},
    {"Pie Chart": "src/google/Pie"},
    {"Bar Chart": "src/google/Bar"},
    {"Column Chart": "src/google/Column"},
    {"Line Chart": "src/google/Line"},
    {"Area Chart": "src/google/Area"},
    {"header": "D3 Charts"},
    {"Column Chart": "src/chart/Column"},
    {"Bubble Chart": "src/chart/Bubble"},
    {"Line Chart": "src/chart/Line"},
    {"Pie Chart": "src/chart/Pie"},
    {"MultiChart": "src/chart/MultiChart"},
    {"MultiChart Surface": "src/chart/MultiChartSurface"},
    {"header": "Choropleth"},
    {"Choropleth (States)": "src/map/ChoroplethStates"},
    {"Choropleth (Counties)": "src/map/ChoroplethCounties"},
    {"Choropleth (Countries)": "src/map/ChoroplethCountries"},
    {"header": "Other"},
    {"Dendrogram": "src/tree/Dendrogram"},
    {"Circle Packing": "src/tree/CirclePacking"},
    {"Sunburst Partition": "src/tree/SunburstPartition"},
    {"Vertext": "src/graph/Vertex"},
    {"Table": "src/other/Table"},
    {"Marshaller": "src/marshaller/HTML"},
    {"header": "AmCharts"},
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
    {"Scatter Chart": "src/amchart/Scatter"},
];


function buildCheckboxList() {
    var $checkWrapper = $("#dropdown-checkbox-wrapper");
    var checkHTML = '';
    widgetArrToTest.forEach(function(src) {
        for (var key in src) {
            if (key === "header") {
                checkHTML += '<li role="presentation" class="dropdown-header">' + src[key] + '</li>';
            } else {
//                var preChecked = ["Step Chart","Dendrogram"];
//                var isChecked = preChecked.indexOf(key) !== -1 ? 'checked' : '';
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
            g_checkedFilter = "src";
            g_showTitles = false;
        }
        var filterArr = g_checkedFilter.split('|');
        filterArr.forEach(function(filt) {
            if (pathString.indexOf(filt) !== -1) {
                ret = true;
            }
        });
        return ret;
    }
}
function initWidgetTestArr() {
    var checkboxArr = $("#dropdown-checkbox-wrapper input");
    widgetArrToTest = [];
    checkboxArr.each(function(i, checkbox) {
        if ($(checkbox).is(':checked')) {
            widgetArrToTest.push($(checkbox).val());
        }
    });

    $('button.done').click(function() {
        $('#themeGroup').removeClass('open');
        initWidgetTestArr();
        testWidgetArr(widgetArrToTest);
    });
}
function afterGridLoads() {
    $('tr.sharedPropertyRow,tr.propertyRow').hover(function() {
        if(g_showHover){
            var th = $(this).children('th.te-label');
            var widArr = th.next().children().first().attr('data-wids').split(',');
            widArr.forEach(function(wid) {
                var w = $('#' + wid);
                if (w.is('svg,svg *')) {
                    w = w.closest('svg').parent();
                }
                var top = w.offset().top - $(window).scrollTop();
                var left = w.offset().left;
                var width = w[0].getBoundingClientRect().width;
                var height = w[0].getBoundingClientRect().height;
                $('body').append(ghostDiv(top, left, width, height));
            })
        }
    }, function() {
        if(g_showHover){
            $('.ghostDiv').remove();
        }
    });
    $('a:contains("JS chart by")').hide();
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
                td: '<input id="te-jq-show-titles" class="te-checkbox" type="checkbox"' + (g_showTitles ? ' checked' : '') + '>',
            },
            {
                th: 'Show Hover',
                td: '<input id="te-jq-show-hover" class="te-checkbox" type="checkbox"' + (g_showHover ? ' checked' : '') + '>',
            },
        ];
        jqueryTeOptions.forEach(function(opt) {
            $('#te-themeEditorOptions').find('tbody').append('<tr><th class="te-label">' + opt.th + '</th><td>' + opt.td + '</td></tr>');
        });
        setTimeout(function(){
            $('#te-jq-show-titles').change(function() {
                var isChecked = $(this).is(':checked');
                g_showTitles = isChecked;
                testWidgetArr(widgetArrToTest);
            });
            $('#te-jq-show-hover').change(function() {
                var isChecked = $(this).is(':checked');
                g_showHover = isChecked;
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
            "surfaceBorderRadius": 0,
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
        },
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
        "Default": {"__themeEditorSerial": true},
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