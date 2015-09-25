var handleIdSeed = 0;
$(function(){
    setTimeout(function(){
        toggleHandleMode();
    },1000);
});
function toggleHandleMode(){
    //addHandles($('.hpanel').first());
    findCommonBorders($('#wrapper > .content > .row > div'));
}
var g_edges = {};
var topEdges = {};
var rightEdges = {};
var bottomEdges = {};
var leftEdges = {};
var g_sharedLines = {};
var xSharedLines = [];
var ySharedLines = [];
function findCommonBorders($elmArr){
//    setTimeout(function(){
//        setAsAbsolute($elmArr);
//    },100);
    var handleSize = 10;
    xSharedLines = [];
    ySharedLines = [];
    var xUnique = [];
    var yUnique = [];
    g_edges.topEdges = {};
    g_edges.rightEdges = {};
    g_edges.bottomEdges = {};
    g_edges.leftEdges = {};
    $elmArr.each(function(){
        var box = $(this).offset();
        var h = $(this).outerHeight();
        var w = $(this).outerWidth();
        if(typeof(g_edges.topEdges[box.top]) === 'undefined'){
            g_edges.topEdges[box.top] = [];
        }
        if(typeof(g_edges.rightEdges[box.left+w]) === 'undefined'){
            g_edges.rightEdges[box.left+w] = [];
        }
        if(typeof(g_edges.bottomEdges[box.top+h]) === 'undefined'){
            g_edges.bottomEdges[box.top+h] = [];
        }
        if(typeof(g_edges.leftEdges[box.left]) === 'undefined'){
            g_edges.leftEdges[box.left] = [];
        }
        g_edges.topEdges[box.top].push($(this));
        g_edges.rightEdges[box.left+w].push($(this));
        g_edges.bottomEdges[box.top+h].push($(this));
        g_edges.leftEdges[box.left].push($(this));
    });
    //Find X-Axis Shared Borders
    var xEdgeKeys = _objKeys(g_edges.leftEdges).concat(_objKeys(g_edges.rightEdges));
    for(var idx in xEdgeKeys){
        console.group('xEdgeKeys['+idx+']');
        var xEdges = [];
        if(typeof(g_edges.rightEdges[xEdgeKeys[idx]]) !== 'undefined' 
            && typeof(g_edges.leftEdges[xEdgeKeys[idx]]) !== 'undefined'){
            xEdges = g_edges.rightEdges[xEdgeKeys[idx]].concat(g_edges.leftEdges[xEdgeKeys[idx]]);
        }
        else if(typeof(g_edges.leftEdges[xEdgeKeys[idx]]) !== 'undefined'
            && g_edges.leftEdges[xEdgeKeys[idx]].length > 0){
            xEdges = g_edges.leftEdges[xEdgeKeys[idx]];
        }
        else if(typeof(g_edges.rightEdges[xEdgeKeys[idx]]) !== 'undefined'
            && g_edges.rightEdges[xEdgeKeys[idx]].length > 0){
            xEdges = g_edges.rightEdges[xEdgeKeys[idx]];
        }
        var yMin = undefined;
        var yMax = undefined;
        for(var n in xEdges){
            var box = xEdges[n].get(0).getBoundingClientRect();
            var h = xEdges[n].outerHeight();
            yMin = typeof (yMin) !== 'undefined' ? yMin : box.top;
            yMax = typeof (yMax) !== 'undefined' ? yMax : box.top + h;
            if(yMin > box.top){
                yMin = box.top;
            }
            if(yMax < box.top + h){
                yMax = box.top + h;
            }
        }
        console.log('Left: '+xEdgeKeys[idx]);
        console.log('yMin/Max: '+yMin + ' ' + yMax);
        console.groupEnd();
        if(xUnique.indexOf(xEdgeKeys[idx]+'-'+yMin+'-'+yMax)===-1){
            //Vert Line
            xSharedLines.push({
                'left':xEdgeKeys[idx]-(handleSize/2),
                'top':yMin+(handleSize/2),
                'height':yMax-yMin-handleSize,
                'width':handleSize,
                'elms':xEdges
            });
            xUnique.push(xEdgeKeys[idx]+'-'+yMin+'-'+yMax);
        }
    }
    var yEdgeKeys = _objKeys(g_edges.topEdges).concat(_objKeys(g_edges.bottomEdges));
    for(var idx in yEdgeKeys){
        console.groupCollapsed('yEdgeKeys['+idx+']');
        var yEdges = [];
        if(typeof(g_edges.bottomEdges[yEdgeKeys[idx]]) !== 'undefined' 
            && typeof(g_edges.topEdges[yEdgeKeys[idx]]) !== 'undefined'){
            yEdges = g_edges.bottomEdges[yEdgeKeys[idx]].concat(g_edges.topEdges[yEdgeKeys[idx]]);
        }
        else if(typeof(g_edges.topEdges[yEdgeKeys[idx]]) !== 'undefined'
            && g_edges.topEdges[yEdgeKeys[idx]].length > 0){
            yEdges = g_edges.topEdges[yEdgeKeys[idx]];
        }
        else if(typeof(g_edges.bottomEdges[yEdgeKeys[idx]]) !== 'undefined'
            && g_edges.bottomEdges[yEdgeKeys[idx]].length > 0){
            yEdges = g_edges.bottomEdges[yEdgeKeys[idx]];
        }
        var xMin = undefined;
        var xMax = undefined;
        for(var n in yEdges){
            var box = yEdges[n].get(0).getBoundingClientRect();
            var w = yEdges[n].outerWidth();
            if(typeof (xMin) === 'undefined'){
                xMin = parseFloat(box.left);
            }
            if(typeof (xMax) === 'undefined'){
                xMax = parseFloat(box.left + w);
            }
            xMin = typeof (xMin) !== 'undefined' ? xMin : parseFloat(box.left);
            xMax = typeof (xMax) !== 'undefined' ? xMax : parseFloat(box.left + w);
            if(xMin > box.left){
                xMin = box.left;
            }
            if(xMax < box.left + w){
                xMax = box.left + w;
            }
        }
        console.log('Top: '+yEdgeKeys[idx]);
        console.log('xMin/Max: '+xMin + ' ' + xMax);
        console.groupEnd();
        if(yUnique.indexOf(yEdgeKeys[idx]+'-'+xMin+'-'+xMax)===-1){
            //Horizontal Line
            ySharedLines.push({
                'left':xMin+(handleSize/2),
                'top':yEdgeKeys[idx]-(handleSize/2),
                'height':handleSize,
                'width':xMax-xMin-handleSize,
                'elms':yEdges
            });
            yUnique.push(yEdgeKeys[idx]+'-'+xMin+'-'+xMax);
        }
    }
    g_sharedLines = {
        'x':xSharedLines,
        'y':ySharedLines
    };
    lines2Handles('vert',g_sharedLines['x']);
    lines2Handles('horiz',g_sharedLines['y']);
    $('.grab-handle.handle-orient-horiz').draggable({axis:"y"});
    $('.grab-handle.handle-orient-vert').draggable({axis:"x"});
    
    function _objKeys(obj){
        var retArr = [];
        for(var k in obj){
            retArr.push(k);
        }
        return retArr;
    }
    
}
function lines2Handles(orient,lineObjArr){
    var handlesHTML = '';
    for(var l in lineObjArr){
        handlesHTML += _createHandle(lineObjArr[l]);
    }
    $('body').append(handlesHTML);
    
    function _createHandle(lineObj){
        var elmIdx = handleIdSeed;
        handleIdSeed++;
        lineObj.elms.forEach(function(elm){
            elm.addClass('handled-elm-'+elmIdx);
        });
        return  _handle('handle-'+elmIdx,lineObj.height,lineObj.width,lineObj.left,lineObj.top);
        
        function _handle(id,height,width,left,top){
            var div = '<div id="'+id+'" ';
            div += 'style="height:'+height+'px;width:'+width+'px;left:'+left+'px;top:'+top+'px;" ';
            div += 'class="grab-handle handle-orient-'+orient+'"></div>';
            return div;
        }
    }
}
function setAsAbsolute($arr){
    var wrapperOffset = $('#wrapper').offset();
    $arr.each(function(i,n){
        var t = $(n).offset().top;
        var l = $(n).offset().left;
        $(n).css({
            top:t-wrapperOffset.top,
            left:l-wrapperOffset.left,
        });
    });
    $arr.each(function(i,n){
        $(n).css({
            position:'absolute'
        });
    });
}