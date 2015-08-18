"use strict";
define(["d3", "src/form/Slider", "src/common/Icon", "src/other/Table", "src/other/Paginator"], function (d3, Slider, Icon, Table, Paginator) {
    describe("functionality tests for individual widgets", function () {
        this.timeout(10000);

        describe("Slider Tests", function () {
            var widget = { path: "src/form/Slider" };
            var element = d3.select("#testWidget");
            var vizWidget, widgetDiv, testDiv;

            it("Adding widget and making sure if all the components are loaded properly", function () {
                testDiv = element.append("div")
                    .attr("class", "widgetTest")
                ;
                widgetDiv = testDiv.append("div")
                    .attr("class", "widget " +  widget.path)
                ;
                testDiv.append("center")
                    .attr("class", "title")
                    .text(widget.path)
                ;
                vizWidget = new Slider()
                    .target(widgetDiv.node())
                    .testData()
                    .showPlay(true)
                    .render()
                ;
                assert.instanceOf(vizWidget._playIcon, Icon, "playIcon is an instanceOf Icon");
                assert.instanceOf(vizWidget._loopIcon, Icon, "playIcon is an instanceOf Icon");
                assert.isAbove(vizWidget._playIcon._renderCount, 0, "The render count is greater than 0");
            });

            it("Checking play functionality", function (done) {
                var initialValue = vizWidget.value();
                vizWidget.play();
                setTimeout(function() {
                    assert.isAbove(vizWidget.value(), initialValue, "The Slider value should be greater than initial value");
                    vizWidget.pause();
                    vizWidget.data(90);
                    vizWidget.play();
                }, 2000);

                setTimeout(function() {
                    assert.equal(vizWidget.value(), vizWidget.high(), "Finally it stops at max on the slider");
                    vizWidget.play();
                    assert.isBelow(vizWidget.value(), initialValue, "The Slider value should restart from 0");
                    done();
                }, 4500);
            });


            it("Removing the widget from the page", function (done) {
                assert.notEqual(widgetDiv.html(), "");
                vizWidget.target(null);
                assert.equal(widgetDiv.html(), "");
                done();
            });

        });
    });
});
