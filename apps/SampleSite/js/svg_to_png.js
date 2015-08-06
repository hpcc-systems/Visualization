var g_replaceBodyWithPNG = false;
$(function(){
    var urlSplitArr = window.location.search.split("?");
    var urlSplit = urlSplitArr[urlSplitArr.length-1];
    if(typeof (urlSplit) !== 'undefined' && urlSplit === 'png'){
        g_replaceBodyWithPNG = true;
    }
})
function downloadGridPng(obj,replaceBody) {
    replaceBody = false;
    $('rect[class^="resize"]').each(function(){$(this).css('fill','transparent')});
    
    _forceInlineStyles('button',['float']);
    _forceInlineStyles('div','background-color');
    _forceInlineStyles('line,path,rect,g.common_Shape',['fill','stroke']);
    _forceInlineStyles('table',['border-collapse']);
    _forceInlineStyles('tspan',['font-family','fill','stroke','font-size','line-height','visibility']);
    _forceInlineStyles('th,td,tr',[
        'background-color','color','font-family',
        'font-size','border-color','border-width',
        'border-style','border-collapse',
        'padding-top','padding-right','padding-bottom','padding-left'
    ]);
    if(replaceBody){
        bodyPng(obj,'Grid.png');
        $('body').css({'background-color':'#ffffff','background-image':'none'});
    } else {
        getPng(obj,'Grid.png');
    }
    
    function _forceInlineStyles(cssSelector,cssStyles) {
        $(cssSelector).each(function() {
            for(var i in cssStyles){
                var style = $(this).css(cssStyles[i]);
                if(style === 'rgb(0, 0, 0)'){
                    style = 'currentColor';
                }
                $(this).css(cssStyles[i], style);
            }
        });
    }
}
function downloadAllPng() {
    forceSvgInlineStyles();
    $('.layout_Surface').each(function() {
        var $svg = $(this).find('svg');
        var title = $(this).children('.surfaceTitle');
        if ($svg.length > 0 && title.length > 0) {
            var srcPathArr = title.text().split('/');
            if (srcPathArr.length > 1) {
                var domNode = $svg.get(0);
                var fileName = srcPathArr.join('_').toUpperCase() + ".png";
                saveSvgAsPng(domNode, fileName);
            }
        }
    })
}

function forceSvgInlineStyles() {
    $('line,path,rect').each(function() {
        var fill = $(this).css('fill');
        var stroke = $(this).css('stroke');
        $(this).css('fill', fill);
        $(this).css('stroke', stroke);
    })
}
function bodyPng($obj,fileName) {
    $('body').append('<canvas id="canvas" width="900" height="900" style="display:none;"></canvas>');
    var mySheetList = ['layout/Grid.css', 'layout/Surface.css'];
    var cssObjArr = [];
    for (var i in document.styleSheets) {
        var sheet = document.styleSheets[i];
        if (typeof (sheet.href) === 'string') {
            for (var j in mySheetList) {
                if (sheet.href.indexOf(mySheetList[j]) !== -1) {
                    cssObjArr.push(sheet);
                }
            }
        }
    }
    fillCanvasBody($obj, cssObjArr, fileName);
}
function getPng($obj,fileName) {
    $('body').append('<canvas id="canvas" width="900" height="900" style="display:none;"></canvas>');
    var mySheetList = ['layout/Grid.css', 'layout/Surface.css'];
    var cssObjArr = [];
    for (var i in document.styleSheets) {
        var sheet = document.styleSheets[i];
        if (typeof (sheet.href) === 'string') {
            for (var j in mySheetList) {
                if (sheet.href.indexOf(mySheetList[j]) !== -1) {
                    cssObjArr.push(sheet);
                }
            }
        }
    }
    fillCanvas($obj, cssObjArr, fileName);
}
function fillCanvas($domNode, cssObjArr, fileName) {
    for (var i in cssObjArr) {
        for (var j in cssObjArr[i].rules) {
            var selector = cssObjArr[i].rules[j].selectorText;
            if (typeof (selector) !== 'undefined') {
                var n = 0;
                while (cssObjArr[i].rules[j].style[n] !== '') {
                    var styleName = cssObjArr[i].rules[j].style[n];
                    $(selector).each(function() {
                        $(this).css(styleName, $(this).css(styleName));
                    });
                    n++;
                }
            }
        }
    }
    var $canvas = $("#canvas");
    $canvas.attr('height', $domNode.outerHeight());
    $canvas.attr('width', $domNode.outerWidth());
    var html = $domNode.html();
    rasterizeHTML.drawHTML(html, $canvas.get(0)).then(function() {
        var a = document.createElement('a');
        a.download = fileName;
        a.href = $canvas.get(0).toDataURL('image/png');
        document.body.appendChild(a);
        a.click();
    });
}
function fillCanvasBody($domNode, cssObjArr, fileName) {
    for (var i in cssObjArr) {
        for (var j in cssObjArr[i].rules) {
            var selector = cssObjArr[i].rules[j].selectorText;
            if (typeof (selector) !== 'undefined') {
                var n = 0;
                while (cssObjArr[i].rules[j].style[n] !== '') {
                    var styleName = cssObjArr[i].rules[j].style[n];
                    $(selector).each(function() {
                        $(this).css(styleName, $(this).css(styleName));
                    });
                    n++;
                }
            }
        }
    }
    var $canvas = $("#canvas");
    $canvas.attr('height', $domNode.outerHeight() + 30);
    $canvas.attr('width', $domNode.outerWidth() + 30);
    var html = $domNode.html();
	//console.log('<html><head><title>Static Viz</title></head><body style="background-image: none; background-color: rgb(255, 255, 255);"><img src="'+$canvas.get(0).toDataURL('image/png')+'"></body></html>');
//    console.log('$domNode.get(0):');
//    console.log($domNode.get(0));
//    saveSvgAsPng($('svg').get(0), "diagram.png");
    rasterizeHTML.drawHTML(html, $canvas.get(0)).then(function() {
        console.dir($canvas.get(0).toDataURL('image/png'));
//        window.open(document.getElementById('canvas').toDataURL(), "toDataURL() image", "width=600, height=200");
//        $('body').html('<img src="'+$canvas.get(0).toDataURL('image/png')+'">');
    });
}
(function() {
    var out$ = typeof exports != 'undefined' && exports || this;

    var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

    function isExternal(url) {
        return url && url.lastIndexOf('http', 0) == 0 && url.lastIndexOf(window.location.host) == -1;
    }

    function inlineImages(el, callback) {
        var images = el.querySelectorAll('image');
        var left = images.length;
        if (left == 0) {
            callback();
        }
        for (var i = 0; i < images.length; i++) {
            (function(image) {
                var href = image.getAttribute('xlink:href');
                if (href) {
                    if (isExternal(href.value)) {
                        console.warn("Cannot render embedded images linking to external hosts: " + href.value);
                        return;
                    }
                }
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var img = new Image();
                href = href || image.getAttribute('href');
                img.src = href;
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    image.setAttribute('xlink:href', canvas.toDataURL('image/png'));
                    left--;
                    if (left == 0) {
                        callback();
                    }
                }
                img.onerror = function() {
                    console.log("Could not load " + href);
                    left--;
                    if (left == 0) {
                        callback();
                    }
                }
            })(images[i]);
        }
    }

    function styles(el, selectorRemap) {
        var css = "";
        var sheets = document.styleSheets;
        for (var i = 0; i < sheets.length; i++) {
            if (isExternal(sheets[i].href)) {
                console.warn("Cannot include styles from other hosts: " + sheets[i].href);
                continue;
            }
            var rules = sheets[i].cssRules;
            if (rules != null) {
                for (var j = 0; j < rules.length; j++) {
                    var rule = rules[j];
                    if (typeof (rule.style) != "undefined") {
                        var match = null;
                        try {
                            match = el.querySelector(rule.selectorText);
                        } catch (err) {
                            console.warn('Invalid CSS selector "' + rule.selectorText + '"', err);
                        }
                        if (match) {
                            var selector = selectorRemap ? selectorRemap(rule.selectorText) : rule.selectorText;
                            css += selector + " { " + rule.style.cssText + " }\n";
                        } else if (rule.cssText.match(/^@font-face/)) {
                            css += rule.cssText + '\n';
                        }
                    }
                }
            }
        }
        return css;
    }

    out$.svgAsDataUri = function(el, options, cb) {
        options = options || {};
        options.scale = options.scale || 1;
        var xmlns = "http://www.w3.org/2000/xmlns/";

        inlineImages(el, function() {
            var outer = document.createElement("div");
            var clone = el.cloneNode(true);
            var width, height;
            if (el.tagName == 'svg') {
                width = parseInt(clone.getAttribute('width') || clone.style.width || out$.getComputedStyle(el).getPropertyValue('width'));
                height = parseInt(clone.getAttribute('height') || clone.style.height || out$.getComputedStyle(el).getPropertyValue('height'));
            } else {
                var box = el.getBBox();
                width = box.x + box.width;
                height = box.y + box.height;
                clone.setAttribute('transform', clone.getAttribute('transform').replace(/translate\(.*?\)/, ''));

                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                svg.appendChild(clone)
                clone = svg;
            }

            clone.setAttribute("version", "1.1");
            clone.setAttributeNS(xmlns, "xmlns", "http://www.w3.org/2000/svg");
            clone.setAttributeNS(xmlns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
            clone.setAttribute("width", width * options.scale);
            clone.setAttribute("height", height * options.scale);
            clone.setAttribute("viewBox", "0 0 " + width + " " + height);
            outer.appendChild(clone);

            var css = styles(el, options.selectorRemap);
            var s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            s.innerHTML = "<![CDATA[\n" + css + "\n]]>";
            var defs = document.createElement('defs');
            defs.appendChild(s);
            clone.insertBefore(defs, clone.firstChild);

            var svg = doctype + outer.innerHTML;
            var uri = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
            if (cb) {
                cb(uri);
            }
        });
    }

    out$.saveSvgAsPng = function(el, name, options) {
        options = options || {};
        out$.svgAsDataUri(el, options, function(uri) {
            var image = new Image();
            image.src = uri;
            image.onload = function() {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                var a = document.createElement('a');
                a.download = name;
                a.href = canvas.toDataURL('image/png');
                document.body.appendChild(a);
                a.click();
            }
        });
    }
})();
