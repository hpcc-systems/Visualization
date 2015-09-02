"use strict";
define(["d3", "src/other/Persist", "src/layout/Grid"], function (d3, Persist, Grid) {
    describe("Persist", function (done) {
        this.timeout(10000);
        describe("Grid", function () {
            var grid;
            var clone;
            it("create", function (done) {
                assert.equal(d3.select("#persistSource").html(), "");
                grid = new Grid()
                    .target("persistSource")
                    .testData()
                    .render(function () {
                        assert.notEqual(d3.select("#persistSource").html(), "");
                        done();
                    })
                ;
            });
            it("clone", function (done) {
                assert.equal(d3.select("#persistTarget").html(), "");
                Persist.clone(grid, function (widget) {
                    clone = widget;
                    widget
                        .target("persistTarget")
                        .testData()
                        .render(function () {
                            assert.notEqual(d3.select("#persistTarget").html(), "");
                            assert.equal(Persist.serialize(widget), Persist.serialize(clone));
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
