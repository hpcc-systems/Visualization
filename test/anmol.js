"use strict";
define(["d3", "src/form/Slider", "src/common/Icon", "src/other/Table", "src/other/Paginator", "src/chart/Column"], function (d3, Slider, Icon, Table, Paginator, Column) {
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
                    .playInterval(10)
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
                }, 50);

                setTimeout(function() {
                    assert.equal(vizWidget.value(), vizWidget.high(), "Finally it stops at max on the slider");
                    vizWidget.play();
                    assert.isBelow(vizWidget.value(), initialValue, "The Slider value should restart from 0");
                    done();
                }, 100);
            });


            it("Removing the widget from the page", function (done) {
                assert.notEqual(widgetDiv.html(), "");
                vizWidget.target(null);
                assert.equal(widgetDiv.html(), "");
                done();
            });
        });

        describe("Table Tests", function () {
            var widget = { path: "src/other/Table" };
            var element = d3.select("#testWidget");
            var vizWidget, widgetDiv, testDiv;

            it("Adding widget and making sure if all the components are loaded properly", function (done) {
                this.timeout(5000);
                testDiv = element.append("div")
                    .attr("class", "widgetTest")
                ;
                widgetDiv = testDiv.append("div")
                    .attr("class", "widget " + widget.path)
                ;
                testDiv.append("center")
                    .attr("class", "title")
                    .text(widget.path)
                ;
                vizWidget = new Table()
                    .target(widgetDiv.node())
                    .columns(["Alphabets"])
                    .data(["d", "c", "e", "a", "f", "g", "z", "x", "y"])
                    .fixedHeader(false)
                    .render()
                ;
                assert.instanceOf(vizWidget._paginator, Paginator, "paginator exists and is an instance of Paginator");
                done();
            });

            it("Checking paginator functionality", function (done) {
                var page = d3.select(".paginator");
                assert.isNull(page.node(), "paginator doesn't exist");
                vizWidget.pagination(true).render();
                page = d3.select(".paginator");
                assert.isNotNull(page.node(), "paginator exists");
                done();
            });

            it("Table sorting", function (done) {
                var list = d3.selectAll(".thText");
                assert.equal(vizWidget.data()[0], "d", "initially the first char is d");
                // list.node().click();
                clickElement(list[0][list[0].length - 1], function () {
                    assert.equal(vizWidget.data()[0], "a", "now it is a");
                });

                clickElement(list[0][list[0].length - 1], function () {
                    assert.equal(vizWidget.data()[0], "z", "now it is z");
                    done();
                });

                 function clickElement(el, callback) {
                    var ev = document.createEvent("MouseEvent");
                    ev.initMouseEvent(
                      "click",
                      true /* bubble */, true /* cancelable */,
                      window, null,
                      0, 0, 0, 0, /* coordinates */
                      false, false, false, false, /* modifier keys */
                      0 /*left*/, null
                    );
                    el.dispatchEvent(ev);
                    callback();
                };

            });

            it("Removing the table widget from the page", function (done) {
                assert.notEqual(widgetDiv.html(), "");
                vizWidget.target(null);
                assert.equal(widgetDiv.html(), "");
                done();
            });
        });

        describe("Chart Tests", function () {
            var widget = { path: "src/chart/Column" };
            var element = d3.select("#testWidget");
            var vizWidget, widgetDiv, testDiv;

            it("Adding widget and making sure if all the components are loaded properly", function (done) {
                this.timeout(5000);
                testDiv = element.append("div")
                    .attr("class", "widgetTest")
                ;
                widgetDiv = testDiv.append("div")
                    .attr("class", "widget " + widget.path)
                ;
                testDiv.append("center")
                    .attr("class", "title")
                    .text(widget.path)
                ;
                vizWidget = new Column()
                    .target(widgetDiv.node())
                    .testData()
                    .render()
                ;
                assert.property(vizWidget, "orientation");
                done();
            });

            it("Checks for orientation flipping", function (done) {
                assert.equal(vizWidget.orientation(), "horizontal", "verifies if orientation is horizontal");
                vizWidget.orientation("vertical").render();
                assert.notEqual(vizWidget.orientation(), "horizontal", "verifies if orientation is vertical");
                done();
            });

            it("Removing the table widget from the page", function (done) {
                assert.notEqual(widgetDiv.html(), "");
                vizWidget.target(null);
                assert.equal(widgetDiv.html(), "");
                done();
            });
        });
    });
});
