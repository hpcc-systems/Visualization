var g_containerColors = [
    ["#ED1C24", "#ED1C24", "#FAFAFA", "#FAFAFA"],
    ["#179BD7", "#179BD7", "#FAFAFA", "#EEEEEE"],
    ["rgb(44, 53, 64)", "rgb(211, 211, 211)", "#AFC8D3", "rgb(16, 12, 12)"],
    ["rgb(9, 7, 64)", "rgb(13, 13, 13)", "rgb(242, 242, 242)", "rgb(242, 171, 109)"],
    ["#F6FDE5", "rgb(5, 108, 242)", "#F6FDE5", "rgb(204, 242, 65)"],
    ["rgb(142, 59, 66)", "rgb(89, 99, 108)", "rgb(165, 116, 92)", "rgb(224, 166, 100)"],
    ["transparent", "#6E6E6E", "transparent", "transparent"],
];

var g_fonts = [
    "Arial",
    "Arial Black",
    "Calibri",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
];

$(function() {
    fillColorsTabControls();
    
    fillFontTabControls();
    fillLayoutTabControls();
    
    $('#tabs-ul > li > a').click(function(){
        var tabId = $(this).attr('href');
        var isInDesignMode = g_mainGrid.designMode();
        if(tabId === "#layout-pane"){
            if(!isInDesignMode){
                g_mainGrid.designMode(true).render();
            }
        } else {
            if(isInDesignMode){
                g_mainGrid.designMode(false).render();
            }
        }
    });
});

function fillColorsTabControls() {
    var btnArr = [
        {
            "label":'Container Colors',
            "icon":'fa-sliders',
            "isDropdown":true,
            "dropdownId":'container-colors-dropdown',
            "bsButtonType":'info'
        },
        {
            "label":'Ordinal Palette',
            "icon":'fa-sliders',
            "isDropdown":true,
            "dropdownId":'ordinal-palette-dropdown',
            "bsButtonType":'info'
        },
        {
            "label":'Rainbow Palette',
            "icon":'fa-sliders',
            "isDropdown":true,
            "dropdownId":'rainbow-palette-dropdown',
            "bsButtonType":'info'
        }
    ];
    refreshTabControlsHTML($('#colors-pane .graph-options'),btnArr);
    
    fillContainerColorsDropdown(g_containerColors);
//    fillWidgetColorsDropdown();

    //<editor-fold defaultstate="collapsed" desc="Fill Dropdown Methods">
    function fillContainerColorsDropdown(arr) {
        var html = '';
        for (var i in arr) {
            html += '<li>';
            html += '<a href="javascript:void(0);">';
            for (var j in arr[i]) {
                html += '<div style="background-color:' + arr[i][j] + ';"></div>';
            }
            html += '</a>';
            html += '</li>';
        }
        html += '<li class="divider"></li>';
        html += '<li><button class="btn btn-info" style="padding-top:0;margin:8px;" data-toggle="modal" data-target="#modal" data-backdrop="false" onClick="javascript:modal_container_colors();">Customize...</button></li>';
        $('#container-colors-dropdown').html(html);
        $('#container-colors-dropdown a').click(function() {
            containerColorsOnClick($(this));
        });
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Init OnClick Events">
    function containerColorsOnClick($elm) {
        var colorArr = $elm.find('div').map(function() {
            return $(this).css('background-color');
        });
        
        var cellArr = g_mainGrid.content();
        for (var i in cellArr) {
            _setContainerColors(cellArr[i], colorArr);
        }
        g_mainGrid.render();
        
        function _setContainerColors(cellObj, colorArr) {
            cellObj
                    .surfaceBorderColor(colorArr[0])
                    .surfaceTitleFontColor(colorArr[1])
                    .surfaceBackgroundColor(colorArr[2])
                    .surfaceTitleBackgroundColor(colorArr[3])
            ;
            cellObj.__proto__
                    .surfaceBorderColor(colorArr[0])
                    .surfaceTitleFontColor(colorArr[1])
                    .surfaceBackgroundColor(colorArr[2])
                    .surfaceTitleBackgroundColor(colorArr[3])
            ;
        }
    }
    //</editor-fold>
}
function fillWidgetColorsDropdown() {
    var ordinals = g_palette.ordinal();
    var rainbows = g_palette.rainbow();
    var max = 8;
    var ordinalHTML = '';
    for (var o in ordinals) {
        var ordArr = [];
        for(var i = 0;i<max;i++){
            ordArr.push(g_palette.ordinal(ordinals[o])(i));
        }
        ordinalHTML += _html_colorLi(ordArr,ordinals[o]);
    }
    $('#ordinal-palette-dropdown').html(ordinalHTML);
    $('#ordinal-palette-dropdown a').click(function(){
        discoverPalettes(g_mainGrid, $(this).data().palette, 'ordinal');
        g_mainGrid.render();
    });
    
    var rainbowHTML = '';
    for (var r in rainbows) {
        var rainbowArr = [];
        for(var i = 0;i<max;i++){
            rainbowArr.push(g_palette.rainbow(rainbows[r])(i,0,max));
        }
        rainbowHTML += _html_colorLi(rainbowArr,rainbows[r]);
    }
    $('#rainbow-palette-dropdown').html(rainbowHTML);
    $('#rainbow-palette-dropdown a').click(function(){
        discoverPalettes(g_mainGrid, $(this).data().palette, 'rainbow');
        g_mainGrid.render();
    });
    
    function _html_colorLi(arr,palette){
        var html = '<li>';
            html += '<a data-palette="'+palette+'" href="javascript:void(0);">';
                for (var i in arr) {
                    html += '<div style="background-color:' + arr[i] + ';"></div>';
                }
            html += '</a>';
        html += '</li>';
        return html;
    }
}

function fillFontTabControls() {
    var btnArr = [
        {
            "label":'Title Font Family',
            "icon":'fa-text-height',
            "isDropdown":true,
            "dropdownId":'title-font-dropdown',
            "bsButtonType":'info'
        },
        {
            "label":'Title Font Size',
            "icon":'fa-text-width',
            "isDropdown":true,
            "dropdownId":'title-font-size-dropdown',
            "bsButtonType":'info'
        },
        {"isDivider":true},
        {
            "label":'Font Family',
            "icon":'fa-text-height',
            "isDropdown":true,
            "dropdownId":'font-dropdown',
            "bsButtonType":'info'
        },
        {
            "label":'Font Size',
            "icon":'fa-text-width',
            "isDropdown":true,
            "dropdownId":'font-size-dropdown',
            "bsButtonType":'info'
        }
    ];
    refreshTabControlsHTML($('#fonts-pane .graph-options'),btnArr);
    
    fillFontsDropdown(g_fonts);
    fillFontSizeDropdown();

    //<editor-fold defaultstate="collapsed" desc="Fill Dropdown Methods">
    function fillFontSizeDropdown() {
        var html = '';
        for (var i = 9; i < 20; i++) {
            html += '<li>';
            html += '<a href="javascript:void(0);">';
            html += '<span class="font-size-sample" style="font-size:'+(i+2)+'px;">'+(i+2)+'px</span>';
            html += '</a>';
            html += '</li>';
        }
        $('#title-font-size-dropdown,#font-size-dropdown').html(html);

        //Attempts to default to current font on page load
        var family = $('td,text,tspan').first().css('font-family');
        family = typeof (family) === 'string' ? family : 'Arial';
        $('#font-size-dropdown .font-size-sample').css('font-family', family);
        
        var tFamily = $('.layout_Grid h3,th').first().css('font-family');
        tFamily = typeof (tFamily) === 'string' ? tFamily : 'Arial';
        $('#title-font-size-dropdown .font-size-sample').css('font-family', tFamily);


        $('#font-size-dropdown a').click(function() {
            fontSizeDropdownOnClick($(this));
        });
        $('#title-font-size-dropdown a').click(function() {
            fontSizeDropdownOnClick($(this));
        });
    }
    function fillFontsDropdown(arr) {
        var html = '';
        for (var i in arr) {
            html += '<li>';
            html += '<a href="javascript:void(0);">';
            html += '<span style="font-family:' + arr[i] + '">' + arr[i] + '</span>';
            html += '</a>';
            html += '</li>';
        }
        $('#font-dropdown').html(html);
        $('#font-dropdown a').click(function() {
            fontDropdownOnClick($(this));
        });
        $('#title-font-dropdown').html(html);
        $('#title-font-dropdown a').click(function() {
            fontDropdownOnClick($(this));
        });
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Init OnClick Events">
    function fontSizeDropdownOnClick($elm) {
        var spanSamples = $elm.find('.font-size-sample');

        var titleSize = spanSamples.eq(0).css('font-size');
        var $ul = $elm.closest('ul');
        
        if($ul.attr('id') === 'title-font-size-dropdown'){
            discoverFilter(g_mainGrid, 'titleFontSize', titleSize.replace('px', ''));
        } else if ($ul.attr('id') === 'font-size-dropdown') {
            discoverFilter(g_mainGrid, 'fontSize', titleSize.replace('px', ''), 'titleFontSize');
        }
        
        g_mainGrid.render();
    }
    function fontDropdownOnClick($elm) {
        var fontSpan = $elm.find('span');
        var family = fontSpan.css('font-family');
        var $ul = $elm.closest('ul');
        console.log('$ul.attr(id):');
        console.log($ul.attr('id'));
        if($ul.attr('id') === 'title-font-dropdown'){
            $('#title-font-dropdown').find('.font-size-sample').css('font-family', family);
            discoverFilter(g_mainGrid, 'titleFontfamily', family);
        } else if ($ul.attr('id') === 'font-dropdown') {
            $('#font-dropdown').find('.font-size-sample').css('font-family', family);
            discoverFilter(g_mainGrid, 'fontfamily', family, 'titleFontfamily');
        }

        g_mainGrid.render();
    }
    //</editor-fold>
}
function fillLayoutTabControls() {
    var btnArr = [
        {
            "label":'Cell Density',
            "icon":'fa-minus',
            "btnId":'minus-grid-cells',
            "bsButtonType":'info'
        },
        {
            "label":'Cell Density',
            "icon":'fa-plus',
            "btnId":'plus-grid-cells',
            "bsButtonType":'info'
        }
    ];
    refreshTabControlsHTML($('#layout-pane .graph-options'),btnArr);
    initDesignModeControls();
    //<editor-fold defaultstate="collapsed" desc="Init OnClick Events">
    function initDesignModeControls() {
        $('#plus-grid-cells').click(function() {
            plusGridCells();
        });
        $('#minus-grid-cells').click(function() {
            minusGridCells();
        });
    }
    //</editor-fold>
}

function fillLoadSavedThemesDropdown(currentThemeName){
    var themesObj = loadAllLocal();
    var loadSelect = document.getElementById('load-theme');
    loadSelect.innerHTML = '';
    for(var themeName in themesObj){
        var isSelected = themeName === currentThemeName;
        loadSelect.appendChild(new Option(themeName,themeName,isSelected,isSelected));
    }
}

function plusGridCells() {
    var cellArr = g_mainGrid.content();
    for (var i in cellArr) {
        var gridRow = cellArr[i].gridRow();
        var gridCol = cellArr[i].gridCol();
        var gridRowSpan = cellArr[i].gridRowSpan();
        var gridColSpan = cellArr[i].gridColSpan();
        cellArr[i].gridRow(gridRow * 2);
        cellArr[i].gridCol(gridCol * 2);
        cellArr[i].gridRowSpan(gridRowSpan * 2);
        cellArr[i].gridColSpan(gridColSpan * 2);
    }
    g_mainGrid.render();
}
function minusGridCells() {
    var cellArr = g_mainGrid.content();
    var atLowerLimit = false;
    for (var i in cellArr) {
        var gridRow = cellArr[i].gridRow();
        var gridCol = cellArr[i].gridCol();
        var gridRowSpan = cellArr[i].gridRowSpan();
        var gridColSpan = cellArr[i].gridColSpan();
        if (gridRow % 2 + gridCol % 2 + gridRowSpan % 2 + gridColSpan % 2 > 0) {
            atLowerLimit = true;
        }
    }
    if (!atLowerLimit) {
        for (var i in cellArr) {
            cellArr[i].gridRow(cellArr[i].gridRow() / 2);
            cellArr[i].gridCol(cellArr[i].gridCol() / 2);
            cellArr[i].gridRowSpan(cellArr[i].gridRowSpan() / 2);
            cellArr[i].gridColSpan(cellArr[i].gridColSpan() / 2);
        }
    }
    g_mainGrid.render();
}

function refreshTabControlsHTML($graphOptions,arr){
    var html = '';
    for(var i in arr){
        if(typeof (arr[i].isDivider) !== 'undefined' && arr[i].isDivider){
            html += '<div class="btn-group divider">|</div>';
        } else {
            html += html_btnGroup(arr[i]);
        }
    }
    $graphOptions.html(html);
}

function html_btnGroup(obj){
    var btnId = '';
    var dropdownHtml = '';
    if(obj.isDropdown){
        dropdownHtml = '<ul id="'+obj.dropdownId+'" class="dropdown-menu surface-font-presets" role="menu"></ul>';
    }
    if(typeof (obj.btnId) === 'string'){
        btnId = 'id="'+obj.btnId+'"';
    }
    var html = ''+
    '<div class="btn-group">'+
        '<button '+btnId+' type="button" class="btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false">'+
            '<i class="fa '+obj.icon+'"></i>'+
            obj.label+
        '</button>'+
        dropdownHtml+
    '</div>';
    return html;
}

function modal_container_colors(){
    $('#modal .modal-title').text('Select Container Colors');
    $('#modal .modal-body').html(_customContainerColors());
    
    $('#modal').draggable();
    
    $('#modal input[type="color"]').change(function(){
        var param = $(this).data().publishparam;
        discoverFilter(g_mainGrid, param, $(this).val());
        g_mainGrid.render();
    });
    
    var dropdownTop = $('#container-colors-dropdown').offset().top;
    var dropdownLeft = $('#container-colors-dropdown').offset().left;
    
    $('#modal').css({
        'top':dropdownTop,
        'left':dropdownLeft,
    });
    $('#modal .modal-dialog').css('margin',0);
    
    function _customContainerColors(){
        var html = '<div class="row">';
        html += '<ul id="ul-color-list" class="col-xs-12">'+
                    '<li><label><span>Border Color</span><input data-publishparam="surfaceBorderColor" id="m-border-color" type="color"></label></li>'+
                    '<li><label><span>Background Color</span><input data-publishparam="surfaceBackgroundColor" id="m-background-color" type="color"></label></li>'+
                    '<li><label><span>Title Background Color</span><input data-publishparam="surfaceTitleFontColor" id="m-title-color" type="color"></label></li>'+
                    '<li><label><span>Title Font Color</span><input data-publishparam="fontColor" id="m-container-font-color" type="color"></label></li>'+
                '</ul>'
            ;
        return html;
    }
}

/* Methods relating to Persist */
function discoverFilter(obj, filter, value, excludeFilter) {
    var ret = [];
    if(obj !== null){
        var arr = g_persist.discover(obj);
        for (var i in arr) {
            if (arr[i].id.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                if(typeof (excludeFilter) === 'undefined' || arr[i].id.toLowerCase().indexOf(excludeFilter.toLowerCase()) === -1){
                    obj[arr[i].id](value);
                    ret.push(arr[i]);
                    if(typeof (arr[i].ext.tags) !== 'undefined' && arr[i].ext.tags.indexOf('Private') === -1){
                        obj.__proto__[arr[i].id](value);
                    } else {
                        console.log(obj._class);
                    }
                }
            } else if (arr[i].type === "widget") {
                    ret = ret.concat(discoverFilter(obj[arr[i].id](), filter.toLowerCase(), value, excludeFilter));
            } else if (arr[i].type === "widgetArray") {
                var wArr = obj[arr[i].id]();
                for (var w in wArr) {
                    ret = ret.concat(discoverFilter(wArr[w], filter.toLowerCase(), value, excludeFilter));
                }
            }
        }
    }
    return ret;
}
function discoverPalettes(obj, value, paletteType) {
    var ret = [];
    var arr = g_persist.discover(obj);
    for (var i in arr) {
        if (arr[i].id.toLowerCase() === "paletteid") {
            if(obj._palette.toString().indexOf(paletteType) !== -1){
                obj[arr[i].id](value);
                obj.__proto__[arr[i].id](value);
                ret.push(arr[i]);
            }
        } else if (arr[i].type === "widget") {
            ret = ret.concat(discoverPalettes(obj[arr[i].id](), value, paletteType));
        } else if (arr[i].type === "widgetArray") {
            var wArr = obj[arr[i].id]();
            for (var w in wArr) {
                ret = ret.concat(discoverPalettes(wArr[w], value, paletteType));
            }
        }
    }
    return ret;
}
function persistAll(obj){
    
    var retObj = {};
    retObj[obj._class] = g_persist.serializeToObject(obj.__proto__);
    
    var arr = g_persist.discover(obj);
    for (var i in arr) {
        var responseObj;
        if (arr[i].type === "widget") {
            responseObj = persistAll(obj[arr[i].id]());
            for(var n in responseObj){
                retObj[n] = responseObj[n];
                if(typeof (retObj[n]) === 'undefined'){
                    retObj[n] = responseObj[n];
                } else {
                    retObj[n] = _resolveConflict(retObj[n],responseObj[n]);
                }
            }
        } else if (arr[i].type === "widgetArray") {
            var wArr = obj[arr[i].id]();
            for (var w in wArr) {
                responseObj = persistAll(wArr[w]);
                for(var n in responseObj){
                    if(typeof (retObj[n]) === 'undefined'){
                        retObj[n] = responseObj[n];
                    } else {
                        retObj[n] = _resolveConflict(retObj[n],responseObj[n]);
                    }
                }
            }
        }
    }
    return retObj;
    
    function _resolveConflict(obj1,obj2){
        return $.extend(true, {}, obj1, obj2);
    }
}


/* Utility Methods */
function saveLocal(name,obj){
    var themesObj = loadAllLocal();
    
    try{
        themesObj[name] = JSON.stringify(obj);
        localStorage.themes = JSON.stringify(themesObj);
    } catch(e) {
        console.error('Failed to stringify save object.');
        themesObj = JSON.parse(localStorage.themes);
        return false;
    }
    return true;
}
function loadLocal(name){
    var themesObj = loadAllLocal();
    return themesObj[name];
}
function loadAllLocal(){
    var themesObj;
    try{
        themesObj = JSON.parse(localStorage.themes);
    } catch(e) {
//        console.error('localStorage.themes failed to parse as JSON.');
//        console.log('Removing all theme saves.');
        localStorage.themes = '{}';
        themesObj = JSON.parse(localStorage.themes);
    }
    return themesObj;
}
function deleteSaveLocal(name){
    var themesObj = loadAllLocal();
    delete themesObj[name];
    localStorage.themes = JSON.stringify(themesObj);
    
    return true;
}