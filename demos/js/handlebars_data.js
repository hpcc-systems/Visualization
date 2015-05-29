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
            content:'<div class="pre-wrapper"> <pre id="example-code-pre" class="prettyprint">Loading...</pre> </div><br/><a id="get_example_code" href="#" target="_blank">Demo Example Code (Plain)</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="get_example_code" href="#" target="_blank">Demo Example Code (JSFiddle)</a>'
        },
        {
            id: 'hierarchy-pane',
            label: 'Object Hierarchy',
            content: '<div id="hierarchy-wrapper"></div>'
        },
        {
            id: 'css-pane',
            label: 'Live Edit CSS',
            content: '<div id="css-wrapper"><textarea id="css-textarea"></textarea></div>'
        }
    ]
};
var docMethodsObj = {
    panels: [
            //{"heading":".size()","body":"Sets the dimensions of the widget.<br/><div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\"><b>.size( sObj )</b></div>\r\n                    <div class=\"panel-body\"><b>sObj</b><br/>\r\nType: Object<br/>\r\nAn object with two methods, <i>width</i> and <i>height</i>. <code>Ex: widget.size({ width: 100, height: 100 });</code></div>\r\n                </div>"}
        ]
    };


var baseHref = "sample_html";
var dropDownObj = {
    items: [{
            'title': 'AM Charts'},
        {
            'name':'Bar Chart',
            'path':'amchart/Bar',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'Bar.html'},
        {
            'name':'Floating Column Chart',
            'path':'amchart/FloatingColumn',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_floating_column.php'},
        {
            'name':'Line Chart',
            'path':'amchart/Line',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_line.php'},
        {
            'name':'Area Chart',
            'path':'amchart/Area',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_area.php'},
        {
            'name':'Bubble Chart',
            'path':'amchart/Bubble',
            'width': '400',
            'height': '400',
            'sample_url': baseHref + 'basic_am_bubble.php'},
        {
            'name':'Pie Chart',
            'path':'amchart/Pie',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_pie.php'},
        {
            'name':'Pyramid Chart',
            'path':'amchart/Pyramid',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_pyramid.php'},
        {
            'name':'Polar Chart',
            'path':'amchart/Polar',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_polar.php'},
        {
            'name':'Scatter Chart',
            'path':'amchart/Scatter',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_scatter.php'},
        {
            'name':'Candlestick Chart',
            'path':'amchart/Candle',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_candle.php'},
        {
            'name':'Gauge Chart',
            'path':'amchart/Gauge',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_gauge.php'},
        {
            'name':'Funnel Chart',
            'path':'amchart/Funnel',
            'width': '400',
            'height': '500',
            'sample_url': baseHref + 'basic_am_funnel.php'},
        {
            'title': 'Google Charts'},
        {
            'name':'Google Bar Chart',
            'path':'google/Bar',
            'sample_url': baseHref + 'basic_google_bar.php'},
        {
            'name':'Google Column Chart',
            'path':'google/Column',
            'sample_url': baseHref + 'basic_google_column.php'},
        {
            'name':'Google Line Chart',
            'path':'google/Line',
            'sample_url': baseHref + 'basic_google_line.php'},
        {
            'name':'Google Area Chart',
            'path':'google/Area',
            'sample_url': baseHref + 'basic_google_area.php'},
        {
            'name':'Google Pie Chart',
            'path':'google/Pie',
            'sample_url': baseHref + 'basic_google_pie.php'},
        {
            'name':'Google Timeline Chart',
            'path':'google/Timeline',
            'sample_url': baseHref + 'basic_google_timeline.php'},
        {
            'name':'Google TreeMap Chart',
            'path':'google/TreeMap',
            'sample_url': baseHref + 'basic_google_treemap.php'},
        {
            'name':'Google Scatter Chart',
            'path':'google/Scatter',
            'sample_url': baseHref + 'basic_google_scatter.php',
            'height': '400'},
        {
            'title': 'D3 Charts'},
        {
            'name':'D3 Column Chart',
            'path':'chart/Column',
            'width':'250',
            'height': '250',
            'sample_url': baseHref + 'basic_d3_column.php'},
        {
            'name':'D3 Line Chart',
            'path':'chart/Line',
            'width':'450',
            'height': '250',
            'sample_url': baseHref + 'basic_d3_line.php'},
        {
            'name':'D3 Pie Chart',
            'path':'chart/Pie',
            'width':'250',
            'height': '250',
            'sample_url': baseHref + 'basic_d3_pie.php'},
        {
            'name':'D3 Bubble Chart',
            'path':'chart/Bubble',
            'width':'450',
            'height': '250',
            'sample_url': baseHref + 'basic_d3_bubble.php'},
//        {
//            'name':'D3 Timeline Chart',
//            'path':'chart/TimeLine',
//            'width':'250',
//            'height': '250',
//            'sample_url': baseHref + 'basic_d3_timeline.php'},
        {
            'title': 'C3 Charts'},
        {
            'name':'C3 Bar Chart',
            'path':'c3chart/Bar',
            'sample_url': baseHref + 'basic_c3_bar.php'},
        {
            'name':'C3 Column Chart',
            'path':'c3chart/Column',
            'sample_url': baseHref + 'basic_c3_column.php'},
        {
            'name':'C3 Line Chart',
            'path':'c3chart/Line',
            'sample_url': baseHref + 'basic_c3_line.php'},
        {
            'name':'C3 Pie Chart',
            'path':'c3chart/Pie',
            'sample_url': baseHref + 'basic_c3_pie.php'},
        {
            'name':'C3 Donut Chart',
            'path':'c3chart/Donut',
            'sample_url': baseHref + 'basic_c3_donut.php'},
        {
            'name':'C3 Gauge Chart',
            'path':'c3chart/Gauge',
            'sample_url': baseHref + 'basic_c3_gauge.php'},
        {
            'name':'C3 Area Chart',
            'path':'c3chart/Area',
            'sample_url': baseHref + 'basic_c3_area.php'},
        {
            'name':'C3 Scatter Chart',
            'path':'c3chart/Scatter',
            'sample_url': baseHref + 'basic_c3_scatter.php'},
        {
            'name':'C3 Step Chart',
            'path':'c3chart/Step',
            'sample_url': baseHref + 'basic_c3_step.php'},
        {
            'title': 'Choropleth',
            'sample_url': baseHref + 'basic_google_line.php'},
        {
            'name':'Choropleth (County)',
            'path':'map/ChoroplethCounties',
            'width':'500',
            'height':'500',
            'sample_url': baseHref + 'basic_choropleth_county.php'},
        {
            'name':'Choropleth (State)',
            'path':'map/ChoroplethStates',
            'width':'500',
            'height':'500',
            'sample_url': baseHref + 'basic_choropleth_state.php'},
        {
            'name':'Choropleth (Country)',
            'path':'map/ChoroplethCountries',
            'width':'500',
            'height':'500',
            'sample_url': baseHref + 'basic_choropleth_country.php'},
        {
            'name':'Choropleth (Google)',
            'path':'map/GMap',
            'width':'500',
            'height':'500',
            'sample_url': baseHref + 'basic_choropleth_google.php'},
        {
            'title': 'Other'},
        {
            'name':'Slider',
            'path':'other/Slider',
            'width':'400',
            'height':'100',
            'sample_url': baseHref + 'basic_slider.php'},
        {
            'name':'Table',
            'path':'other/Table',
            'sample_url': baseHref + 'basic_table.php'},
        {
            'name':'Sunburst Partition',
            'path':'tree/SunburstPartition',
            'width':'300',
            'height':'300',
            'sample_url': baseHref + 'basic_sunburst_partition.php'},
        {
            'name':'Circle Packing',
            'path':'tree/CirclePacking',
            'width':'300',
            'height':'300',
            'sample_url': baseHref + 'basic_circle_packing.php'},
        {
            'name':'Dendrogram',
            'path':'tree/Dendrogram',
            'width':'450',
            'height':'500',
            'sample_url': baseHref + 'basic_dendrogram.php'},
        {
            'name':'Word Cloud',
            'path':'other/WordCloud',
            'width':'250',
            'height':'250',
            'sample_url': baseHref + 'basic_wordcloud.php'},
        {
            'title': 'UI'},
        {
            'name':'Shape',
            'path':'common/Shape',
            'width':'300',
            'height':'300',
            'sample_url': baseHref + 'basic_shape.php'},
        {
            'name':'Text',
            'path':'common/Text',
            'width':'100',
            'height':'100',
            'sample_url': baseHref + 'basic_text.php'},
        {
            'name':'Text Box',
            'path':'common/TextBox',
            'width':'300',
            'height':'200',
            'sample_url': baseHref + 'basic_textbox.php'},
        {
            'name':'Vertex',
            'path':'graph/Vertex',
            'width':'100',
            'height':'100',
            'sample_url': baseHref + 'basic_vertex.php'},
        {
            'name':'List',
            'path':'common/List',
            'width':'300',
            'height':'300',
            'sample_url': baseHref + 'basic_list.php'},
        {
            'name':'Icon',
            'path':'common/Icon',
            'width':'300',
            'height':'300',
            'sample_url': baseHref + 'basic_icon.php'},
        {
            'name':'Menu',
            'path':'common/Menu',
            'width':'200',
            'height':'250',
            'sample_url': baseHref + 'basic_menu.php'},
        {
            'name':'FAChar',
            'path':'common/FAChar',
            'width':'25',
            'height':'25',
            'sample_url': baseHref + 'basic_fachar.php'},
        {
            'name':'MultiChart Surface',
            'path':'chart/MultiChartSurface',
            'width':'250',
            'height':'250',
            'sample_url': baseHref + 'basic_multichart_surface.php'},
        {
            'name':'MultiChart',
            'path':'chart/MultiChart',
            'width':'250',
            'height':'250',
            'sample_url': baseHref + 'basic_multichart.php'},
        {
            'name':'Resize Surface',
            'path':'common/ResizeSurface',
            'width':'300',
            'height':'300',
            'sample_url': baseHref + 'basic_resize_surface.php'},
        {
            'name':'Surface',
            'path':'common/Surface',
            'width':'400',
            'height':'300',
            'sample_url': baseHref + 'basic_surface.php'},
//        {
//            'name':'Graph',
//            'path':'graph/Graph',
//            'width':'500',
//            'height':'500',
//            'sample_url': baseHref + 'graph_example.php'},
        {
            'name':'Graph Marshaller',
            'path':'marshaller/Graph',
            'sample_url': baseHref + 'graph_example.php'
        }]
    };
