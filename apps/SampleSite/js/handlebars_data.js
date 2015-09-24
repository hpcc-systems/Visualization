var chartTabsObj = {
    tabs: [
        {
            id: 'chartTab1',
            label: 'Chart',
            content: '<div id="widget-wrapper" style="width:100%;height:500px;"></div>',
            active: true
        },
        {
            id: 'serialization-test-pane',
            label: 'Serialization Test',
            content: '<div id="serialization-test-wrapper" style="width:100%;height:500px;"></div>'
        },
        {
            id: 'serialization-json-pane',
            label: 'Serialization JSON',
            content: '<div id="serialization-json-wrapper"></div>'
        }
    ]
};
var configTabsObj = {
    tabs: [
        {
            id: 'discover-pane',
            label: 'Discover Params',
            content: '',
            active: true
        },
        {
            id: 'exampleCodeTab',
            label: 'Example Code',
            content:'<div class="pre-wrapper"> <pre id="example-code-pre" class="prettyprint lang-html">Loading...</pre> </div><br/><form id="get_example_code" action="http://codepen.io/pen/define" method="POST" target="_blank"><input type="hidden" name="data"><a><input type="submit" value="View Example On Code Pen"></a></form>'
        },
        {
            id: 'hierarchy-pane',
            label: 'Object Hierarchy',
            content: '<div id="hierarchy-wrapper"></div>'
        },
        {
            id: 'css-pane',
            label: 'Live Edit CSS',
            content: '<div id="css-wrapper"><div id="css-editor"></div></div>'
        }
    ]
};
var docMethodsObj = {
    panels: [
            //{"heading":".size()","body":"Sets the dimensions of the widget.<br/><div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\"><b>.size( sObj )</b></div>\r\n                    <div class=\"panel-body\"><b>sObj</b><br/>\r\nType: Object<br/>\r\nAn object with two methods, <i>width</i> and <i>height</i>. <code>Ex: widget.size({ width: 100, height: 100 });</code></div>\r\n                </div>"}
        ]
    };


var baseHref = "sample_html";
