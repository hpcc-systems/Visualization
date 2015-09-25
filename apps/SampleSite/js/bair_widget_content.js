
function widget_googleMap(borderWidget,detailsObj) {
    return new borderWidget()
            .topCellSize(48)
            .leftCellSize(0)//TODO: This shouldnt need to be set
            .setContent("topSection", new htmlWidget().html(widgetHeader(detailsObj)))
            .setContent("centerSection", new htmlWidget().html('<div id="map-canvas" class="full-height"></div>'))
}
function widget_resultsData(borderWidget,detailsObj) {
    return new borderWidget()
            .topCellSize(48)
            .setContent("topSection", new htmlWidget().html(widgetHeader(detailsObj)))
            .leftCellSize(200).setContent("leftSection", new htmlWidget().html('<div class="resultsDataLeftNav"></div>'))
            .setContent("centerSection",
                new borderWidget()
                    .borderWidth(0)
                    .topCellSize(48).setContent("topSection", new htmlWidget().html('<div class="resultsDataAboveTable"></div>'))
                    .bottomCellSize(48).setContent("bottomSection", new htmlWidget().html('<div class="resultsDataBelowTable"></div>'))
                    .setContent("centerSection", new htmlWidget().html())
            )
}

function widgetHeader(wObj) {
    var html = '<div id="' + wObj.id + '" class="hpanel drag-cell">';
    html += _head();
    html += _body();
    return html + '</div>';
    function _head() {
        var ret = '<div class="panel-heading hbuilt">' +
                '<div class="panel-tools">' +
                _controls() +
                '</div>' +
                '<span class="panel-title">' + wObj.title + '</span>' +
                _headingContent() +
                '</div>';
        return ret;
        function _controls() {
            var cont = '';
            for (var c in wObj.controls) {
                var cObj = wObj.controls[c];
                cont += '<a id="' + cObj.id + '" href="javascript:void(0);"><i class="' + cObj.icon + '"></i></a>';
            }
            return cont;
        }
        function _headingContent() {
            var cont = '';
            for (var c in wObj.headingContent) {
                var hcObj = wObj.headingContent[c];
                switch (hcObj.contentType) {
                    case 'html':
                        cont += '<div class="panel-item">' + hcObj.html + '</div>';
                        break;
                    case 'divider':
                        cont += '<div class="heading-divider panel-item"></div>';
                        break;
                }
            }
            return cont;
        }
    }
    function _body() {
        var ret = '';
        if (wObj.body !== '') {
            ret = '<div class="panel-body" style="padding:0px;border-top:1px!important;">' +
                    wObj.body +
                    '</div>';
        }
        return ret;
    }
}