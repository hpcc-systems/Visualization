var widgetPublishParams = {};
var widgetNormalFunctions = {};
var widgetInheritanceSourcePathArr = [];
var widgetExtendedDoc = {};

function toggleSection(o) {
    $(o).closest('.doc-item').find('.doc-ext').slideToggle();
    $(o).closest('.doc-item').find('.chevron').toggleClass("fa-chevron-down fa-chevron-up");
}

function getExtendedDocs(src) {
    var mSrc = src.replace('/src','');
    var request = $.ajax({
        url: 'doc-templates/'+mSrc+'/extended-doc.html',
        method: "GET",
        cache: false,
        dataType: "html"
    })
    .done(function(data) {
        var elements = $(data);
        widgetExtendedDoc[src] = elements;
    })
    ;
}

function getWidgetSrcPath(response,src) {
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

function buildWidgetSrc(src) {
    getExtendedDocs(src);
    var request = $.ajax({
        url: '../../src/' + src + '.js', // this needs to change when changing dir structure
        cache: false,
        method: "GET",
        dataType: "text"
    })
    .done(function(data) {

        // interface
//        var regex = /\.prototype\.implements\((\w+)/gm;
//        widgetInterfaces[src] = [];
//        while(matches = regex.exec(data)) {
//            var match = matches[1].replace(/"/g, "");
//            widgetInterfaces[src].push(match);
//        }
//        console.log('interfaces');
//        console.log(widgetInterfaces);

        // Publish Params
        var regex = /\.prototype.publish\((["a-zA-Z]*),/gm;
        widgetPublishParams[src] = [];
        while(matches = regex.exec(data)) {
            var match = matches[1].replace(/"/g, "");
            widgetPublishParams[src].push(match);
        }
        // Prototype Functions
        //var regex = /prototype\.(\w+)(?!.*(.apply|.call))/gm; // TODO: perhaps check to make sure Common.proto where Common is the name of the file were in
        var regex = /prototype\.(\w+)/gm;
        widgetNormalFunctions[src] = [];
        while(matches = regex.exec(data)) {
            matches[1] = matches[1].replace(/"/g, "");
            widgetNormalFunctions[src].push(matches[1]);
        }

        var wSrcPathStr = getWidgetSrcPath(data,src); // Get Next Inherited Widget Src Path String

        if (wSrcPathStr) {
            widgetInheritanceSourcePathArr.push(wSrcPathStr);
            buildWidgetSrc(wSrcPathStr);
        } else {
            var object = $.extend(true, {}, widgetNormalFunctions, widgetPublishParams, widgetInterfaces); //merge two objects into a blank object
            buildDocs(object);
        }
    })
    ;
}

function buildDocs(functionArray) {
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
    widgetInheritanceSourcePathArr = [];
    widgetExtendedDoc = {};
}