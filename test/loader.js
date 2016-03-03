"use strict";
define(["src/Loader"], function (Loader) {
    describe("Loader", function () {
        this.timeout(10000);
        it("cdn1", function (done) {
            Loader.cdn("v1.10.0-rc10", function (require) {
                require(["src/common/Platform"], function (Platform) {
                    assert.equal(Platform.prototype.version(), "1.10.0-rc10");
                    done();
                });
            });
        });
        it("cdn2", function (done) {
            Loader.cdn("v1.8.4", function (require) {
                require(["src/common/Widget"], function (Widget) {
                    assert.equal(Widget.prototype._class, "common_Widget");
                    done();
                });
            });
        });
        it.skip("github", function (done) {
            Loader.github("GH-1512", "GordonSmith", function (require) {
                require(["src/common/Platform"], function (Platform) {
                    assert.equal(Platform.prototype.version(), "1.12.0-dev");
                    done();
                });
            });
        });
    });
});

