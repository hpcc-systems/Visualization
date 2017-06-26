"use strict";
define(["d3", "src/other/Persist", "./layoutFactory"], function (d3, Persist, layoutFactory) {
    describe("Persist", function (done) {
        this.timeout(10000);
        describe("Grid", function () {
            var grid;
            it("create", function (done) {
                assert.equal(d3.select("#persistSource").html(), "");
                layoutFactory.Grid.simple(function(widget) {
                    grid = widget
                        .target("persistSource")
                        .render(function () {
                            assert.notEqual(d3.select("#persistSource").html(), "");
                            done();
                        })
                    ;
                });
            });
            it("clone", function (done) {
                assert.equal(d3.select("#persistTarget").html(), "");
                Persist.clone(grid, function (widget) {
                    assert.isNotNull(widget);
                    widget
                        .target("persistTarget")
                        .render(function () {
                            assert.notEqual(d3.select("#persistTarget").html(), "");
                            assert.equal(Persist.serialize(widget), Persist.serialize(widget));
                            done();
                        })
                    ;
                })
            });
            it("destroy", function () {
                grid.target(null);
                assert.equal(d3.select("#persistSource").html(), "");
            });
        });
    });
});
