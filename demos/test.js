function doTest() {
    require(["d3", "test/Factory", "src/common/Utility"], function (d3, testFactory, Utility) {
        var params = Utility.urlParams();
        var someWidgets = [];
        for (var key in params) {
            if (params[key] === undefined) {
                someWidgets.push(key);
            }
        }
        var element = d3.select("#section");
        var idx = 0;
        d3.map(testFactory.categories).entries().forEach(function (category) {
            element
                .append("br")
                .style("clear", "both")
            ;
            element.append("b")
                .text(category.key)
            ;
            element
                .append("br")
                .style("clear", "both")
            ;
            var categoryDiv = element
                .append("div")
            ;
            d3.map(category.value).entries().forEach(function (widget) {
                d3.map(widget.value).entries().forEach(function (sample) {
                    var widgetPath = sample.value.widgetPath;
                    if (!someWidgets.length || someWidgets.every(function (param) { return widgetPath.indexOf(param) >= 0; })) {
                        d3.timer(function () {
                            var testDiv = categoryDiv.append("div")
                                .attr("class", "widgetTest")
                            ;
                            var widgetDiv = testDiv.append("div")
                                .attr("class", "thumb")
                            ;
                            switch (category.key) {
                                case "common":
                                    switch (widget.key) {
                                        case "Composition":
                                            widgetDiv
                                                .classed("xwide", true)
                                                .classed("xlarge", true)
                                            ;
                                            break;
                                        default:
                                            widgetDiv
                                                .classed("small", true)
                                            ;
                                    }
                                    break;
                                case "layout":
                                case "marshaller":
                                case "kendo":
                                    widgetDiv
                                        .classed("xwide", true)
                                        .classed("xlarge", true)
                                    ;
                                    break;
                                default:
                                    widgetDiv
                                        .classed("large", true)
                                    ;

                            }
                            idx += 1000;
                            try {
                                sample.value.factory(function (testWidget) {
                                    testDiv.append("center")
                                        .attr("class", "title")
                                        .text(widget.key + " - " + sample.key)
                                    ;
                                    testWidget
                                        .target(widgetDiv.node())
                                        .render()
                                    ;
                                });
                            } catch (e) {
                            }
                            return true;
                        }, ++idx * 100);
                    }
                });
            });
        });
    });
}