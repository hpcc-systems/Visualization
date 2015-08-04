$(function(){
    fillLinksNavbar();
    appendBsModal();
});
function fillLinksNavbar(activeHREF){
    if(typeof (activeHREF) === 'undefined'){
        var urlSplit = window.location.pathname.split('/');
        activeHREF = urlSplit[urlSplit.length-1];
    }
    var arr = [
        {"href":"playground.html","label":"Playground"},
        {"href":"themeeditor.html","label":"Theme Editor"},
        {"href":"dynamic_grid.html","label":"Dynamic Grid"},
        {"href":"example1.html","label":"Example 1"},
        {"href":"example2.html","label":"Example 2"},
        {"href":"popups.html","label":"Popup Examples"},
        {"href":"widget_index.html","label":"Widget Index"}
    ];
    var html = '<ul class="nav navbar-nav">';
    for(var i in arr){
        if(arr[i].href === activeHREF){
            html += '<li class="active"><a href="'+arr[i].href+'">'+arr[i].label+'</a></li>';
        } else {
            html += '<li><a href="'+arr[i].href+'">'+arr[i].label+'</a></li>';
        }
    }
    html += '</ul>';
    html += '<button class="btn btn-default" style="float:right;margin-top:9px;" onclick="javascript:downloadGridPng($(\'#graph-container\'));"><i class="fa fa-download"></i>Download Grid As PNG</button>';
    $('#links-navbar').html(html);
}
function testModal(){
    var title = "Copy the code below to your own project";
    var bodyHTML = '<pre class="source prettyprint"></pre>';
    bsModal(title,bodyHTML);
    $('#modal').modal();
}
function bsModal(title,bodyHTML,btnObjArr){
    var $bsModal = $('#modal');

    $bsModal.find('.modal-title').html(title);

    $bsModal.find('.modal-body').html(bodyHTML);

    if(typeof (btnObjArr) !== 'undefined'){
        var $modalFooter = $bsModal.find('.modal-footer');
        $modalFooter.html('');
        for(var i in btnObjArr){
            var btnHTML = '<button class="'+btnObjArr[i]["class"]+'">'+btnObjArr[i]["label"]+'</button>';
            $modalFooter.append(btnHTML);
            if(typeof (btnObjArr[i]["callback"]) !== 'undefined'){
                $modalFooter.find('button:last-child').click(btnObjArr[i]["callback"]);
            }
        }
    }

    $('#modal .modal-dialog').css({"width":'auto'});
}
function categorize_choro(arr, cat_count){
    cat_count = typeof (cat_count) !== 'undefined' ? cat_count : 30;
    arr = arr.map(function(a){ a[3]=a[1]; return a; });
    arr = arr.sort(function(a,b){return a[1] > b[1] ? 1 : -1;});
    arr.forEach(function(n,i){
        arr[i][1] = Math.floor(i / Math.ceil(arr.length/cat_count));
    });
    return arr.sort(function(a,b){return a[3] < b[3] ? 1 : -1;});
}
function appendBsModal(){
    if($('#modal').length === 0){
        var html = '';
        html += '<div class="modal fade" id="modal">'+
                    '<div class="modal-dialog">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                '<h4 class="modal-title">Modal title</h4>'+
                            '</div>'+
                            '<div class="modal-body"></div>'+
                            '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-info" data-dismiss="modal">Close</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        $('body').append(html);
    }
}