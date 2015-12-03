"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Factory", "src/common/Utility", "require"], factory);
    } else {
        root.widgets = factory(root.d3, root.test_Factory, root.common_Utility, root.require);
    }
}(this, function (d3, testFactory, Utility, require) {

    describe("Property Editor Test", function () {
        it("Property Editor Filter Test", function (done) {
            require(["test/Factory", "src/other/PropertyEditor","src/chart/Column"], function(testFactory, PropertyEditor, Column) {

                var element = d3.select("#testWidget");
                var testDiv = element.append("div")
                    .attr("class", "widgetTest")
                ;
                var peDiv = testDiv.append("div")
                    .attr("class", "widget")
                ;
                testDiv.append("center")
                    .attr("class", "title")
                ;

                var column = new Column()
                    .target(testDiv.node())
                    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
                    .data([
                        ["Geography", 75, 68, 65],
                        ["English", 45, 55, 52],
                        ["Math", 98, 92, 90],
                        ["Science", 66, 60, 72]
                    ])
                    .render()
                ;

                var pe = new PropertyEditor()
                    .target(peDiv.node())
                    .widget(column)
                    .overrideTags(
                    {
                        "chart_Column": {
                            "stacked": ["Intermediate"]
                        }
                    })
                    .render()
                ;

                assert.deepEqual(column.tag("stacked"), ["Intermediate"]);
                done();
            });
        });
    });

}));
