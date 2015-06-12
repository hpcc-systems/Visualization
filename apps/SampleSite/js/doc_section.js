var widgetPublishParams = {};
var widgetNormalFunctions = {};
//var widgetInheritanceSourcePathArr = [];
var widgetExtendedDoc = {};
var widgetInterfaces = {};

function toggleSection(o) {
    $(o).closest('.doc-item').find('.doc-ext').slideToggle();
    $(o).closest('.doc-item').find('.chevron').toggleClass("fa-chevron-down fa-chevron-up");
}

function getExtendedDocs(wNameStr) {
    var mSrc = wNameStr.replace('/src','');
    var request = $.ajax({
        url: 'doc-templates/'+mSrc+'/extended-doc.html',
        method: "GET",
        cache: false,
        dataType: "html"
    })
    .done(function(data) {
        var elements = $(data);
        widgetExtendedDoc[wNameStr] = elements;
    })
    ;
}

function getWidgetInterfaceName(data) {
    var regex = /\.prototype\.implements\((\w+)/gm;
    //widgetInterfaces[src] = [];
    while(matches = regex.exec(data)) {
        var match = matches[1].replace(/"/g, "");
        //widgetInterfaces[src].push(match);
        return match;
    }
    return false;
}

function getWidgetParentClassName(response,src) {
    var src_obj = src.split('/'),
        return_obj = return_obj || [];

    var root_regex = new RegExp("(.+?root\." + src_obj[0] + "_" + src_obj[1] + ".+)"),
        line = response.match(root_regex);

    if (line == null) {
        root_regex = new RegExp("(.+?root\." + src_obj[1] + ".+)");
        line = response.match(root_regex);
    }
    line = line[1];

    var child_class = response.split(/Object\.create\([ \t]*([^\n\r\.]*)/)[1];
    if (child_class) {
        var regex = new RegExp("root\\.\\(*([^\\n\\r\\.]*)_" + child_class),
            folder = line.match(regex);
        if (folder) {
            class_path = folder[1] + "/" + child_class;
        } else {
            class_path = src_obj[0] + "/" + child_class;
        }
        return class_path;
    } else {
        return false;
    }
}

function buildWidgetDocumentation(wNameStr) {
    getExtendedDocs(wNameStr);
    var request = $.ajax({
        url: '../../src/' + wNameStr + '.js', // this needs to change when changing dir structure
        cache: false,
        method: "GET",
        dataType: "text"
    })
    .done(function(data) {

        // Publish Params
        var regex = /\.prototype.publish\((["a-zA-Z]*),/gm;
        widgetPublishParams[wNameStr] = [];
        while(matches = regex.exec(data)) {
            var match = matches[1].replace(/"/g, "");
            widgetPublishParams[wNameStr].push(match);
        }

        // Prototype Functions
        //var regex = /prototype\.(\w+)(?!.*(.apply|.call))/gm; // TODO: perhaps check to make sure Common.proto where Common is the name of the file were in
        var regex = /prototype\.(\w+)/gm;
        widgetNormalFunctions[wNameStr] = [];
        while(matches = regex.exec(data)) {
            matches[1] = matches[1].replace(/"/g, "");
            widgetNormalFunctions[wNameStr].push(matches[1]);
        }

        var wParentClassNameStr = getWidgetParentClassName(data,wNameStr); // Get Next Inherited Widget Src Path String
        var wInterfaceNameStr = getWidgetInterfaceName(data); // get interface

        if (wInterfaceNameStr) {
            setTimeout(function() { buildWidgetDocumentation("api/"+wInterfaceNameStr); }, 0);
        }

        if (wParentClassNameStr) {
            //widgetInheritanceSourcePathArr.push(wParentClassName);
            buildWidgetDocumentation(wParentClassNameStr);
        } else {
            var object = $.extend(true, {}, widgetNormalFunctions, widgetPublishParams); //merge two objects into a blank object
            buildDocSection(object);
        }
    })
    ;
}

function buildDocSection(functionArray) {
    $.each(functionArray,function(n,widgetSrc) {
        $.each(widgetSrc,function(i,functionName) {
            var section = $('#'+functionName, widgetExtendedDoc[n]);
            var panel = {
                "function": '.' + functionName + '()',
                "functionLocation": n,
                "body": section.html(), //TODO read each template in via AJAX
            }
            docMethodsObj.panels.push(panel);
        });
    });
    initDocSection();
}

function initDocSection() {
    $('#documentation-wrapper').html(bootstrapPanel(docMethodsObj));
}

function resetDocVars() {
    docMethodsObj.panels = [];
    widgetPublishParams = {};
    widgetInterfaces = {};
    widgetNormalFunctions = {};
    //widgetInheritanceSourcePathArr = [];
    widgetExtendedDoc = {};
}