var visibleWidgets = [];
var g_gridFitAll = false;
var mainDiv = document.getElementById("graph-container");
var g_checkedFilter;
var initialChecked;

$(function() {
    g_checkedFilter = window.location.search.split("?")[1];
    initialChecked = g_checkedFilter ? g_checkedFilter : "chart";
    buildCheckboxList();
});

require(["src/layout/Surface", "src/layout/Grid"],
    function (Surface, Grid) {
        main = new Grid()
            .gutter(0)
        ;
        frame = new Surface()
            .surfacePadding(0)
            .surfaceBorderWidth(0)
            .widget(main)
            .target("graph-container")
        ;

        testWidgetArr = function () {
            var currWidget = new Grid();
            var gridFit = g_gridFitAll ? "all" : "width";
            currWidget.fitTo(gridFit);
            var gridCols = 3; 
            var count = 0;

            var factories = d3.selectAll("li.dropdown-header")
            factories.each(function(d) {
                var widgets = d3.select(this).selectAll("ul.widgetMenu li.menu_item")
                widgets.each(function(d) {
                    if (d3.select(this).select("input").property("checked")) {
                        var func = d3.map(d.value).values()[0].factory;
                        func(function(widg) {
                            title = getProperName(d3.map(d.value).values()[0].folder) + ": " + d3.map(d.value).values()[0].file;
                            currWidget
                                .setContent(Math.floor((count)/gridCols), (count)%gridCols, widg, title)
                                .gutter(40)
                                .render()
                            ;
                            count++;
                        })
                    }

                })
            });
            main
                .setContent(0, 0, currWidget, "", 2, 4)
            ;
            frame
                .render(function () {
                    afterGridLoads();
                })
            ;
        };

        testWidgetArr();

        resize = function () {
            if (mainDiv) {
                var widthAdjustment = parseInt($('body').css('padding-left')) + parseInt($('body').css('padding-right'));
                var heightAdjustment = parseInt($("#main").css("margin-top")) + $("#main").offset().top;
                mainDiv.style.width = window.innerWidth - widthAdjustment + "px";
                mainDiv.style.height = window.innerHeight - heightAdjustment + "px";
            }

            frame
                .resize()
                .render()
            ;
        };

        debouncedResize = Surface.prototype.debounce(function () {
            resize();
        }, 250);

        resize();
    }
);

function doResize() {
    if (debouncedResize) {
        debouncedResize();
    }
}

function buildCheckboxList() {
    require(["d3", "test/Factory"], function (d3, testFactory) {
        var widgetPath = "src/chart/Column";
        var params = {};
        var sampleSelect = d3.select("#dropdown-checkbox-wrapper");
        var categoryOptions = sampleSelect.selectAll("li").data(d3.map(testFactory.categories).entries());

        categoryOptions.enter()
            .append("li")
            .attr("role", "presentation")
            .classed("dropdown-header", true)
            .text(function (d) { return getProperName(d.key); })
            .append("ul")
        ;

        var thisFactory = "",
            thisWidget = "";

        categoryOptions.each(function (d, idx) { 
            var isChecked = initialChecked === d.key ? true : false;
            var categorySelect = d3.select(this).select("ul").classed("widgetMenu", true);
            var widgetOptions = categorySelect.selectAll("li").data(d3.map(d.value).entries());
            var menuItem = widgetOptions.enter()
                .append("li")
                .classed("menu_item", true)
                .attr("role","presentation")
                .append("label")
            ;
            menuItem    
                .html(function (d) { 
                    return "<span>" + d.key + "</span>"; 
                })
            ;

            menuItem
                .append("input")
                .attr("type", "checkbox")
                .attr("value", function (d) { return d.key; })
                .property('checked', isChecked)
            ;
            widgetOptions.exit()
                .remove()
            ;
            
        });
        categoryOptions
            .insert("input", ".widgetMenu")
            .attr("type", "checkbox")
            .attr("onchange", "javascript:headerCheckboxChange(this);")
            .attr("value", function (d, idx) { return d.key; })
            .classed("headerCheck", true)
        ;
        categoryOptions.exit()
            .remove()
        ;
    });
}

function headerCheckboxChange(box){
    var $li = $(box).closest('li.dropdown-header');
    $li.find('ul.widgetMenu input[type="checkbox"]').prop('checked',$(box).is(':checked'));
}

function afterGridLoads() {
    $('a:contains("JS chart by")').css('display','none');
    if(g_replaceBodyWithPNG){
        setTimeout(function(){
            downloadGridPng($('.layout_Grid').eq(1).parent(),true);
        },1000);
    }
}

$(function(){
    //over ride the defaullt bootstrap behavior of closing the dropdown
    $('#themeGroup').on('hide.bs.dropdown', function () {
        return false;
    });
    $('#graph-container').css({
        'height':$(window).height() - $('#graph-container').offset().top - 10
    });
    $('button.done').click(function() {
        $('#themeGroup').removeClass('open');
        testWidgetArr();
    });
    $('button.cancel').click(function() {
        $('#themeGroup').removeClass('open');
    });
});
