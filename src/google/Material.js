import { CommonND } from "./CommonND";

export function Material() {
    CommonND.call(this);
}
Material.prototype = Object.create(CommonND.prototype);
Material.prototype.constructor = Material;
Material.prototype._class += " google_Material";

function materialHack(type, callback, depth) {
    depth = depth || 0;
    try {
        //  Could be file:
        require([(document.location.protocol === "https:" ? "https:" : "http:") + "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js", "goog!visualization,1.1,packages:[" + type + "]"], function () {
            try {
                require(["./CommonND"], function () {
                    callback();
                });
            } catch (e) {
                materialHack(type, callback, depth + 1);
            }
        });
    } catch (e) {
        materialHack(type, callback, depth + 1);
    }
}

Material.prototype.render = function (callback) {
    var context = this;
    var args = arguments;
    materialHack(this._gType, function () {
        CommonND.prototype.render.apply(context, args);
    });
    return this;
};
