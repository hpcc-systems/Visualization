"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Layered"], factory);
    } else {
        root.map_Layer = factory(root.map_Layered);
    }
}(this, function (Layered, PropertyExt) {
    function Layer(id) {
        Layered.call(this);
    }
    Layer.prototype = Object.create(Layered.prototype);
    Layer.prototype.constructor = Layer;
    Layer.prototype._class += " map_Layer";

    Layer.prototype.layerEnter = function (base, svgElement, domElement) {
        this._parentOverlay = base._parentOverlay;
    };

    Layer.prototype.enter = function (domNode, element) {
        Layered.prototype.enter.apply(this, arguments);
        this._svgElement = this._layersTarget.append("g");
        this._domElement = this._parentOverlay.append("div");
        this.layerEnter(this, this._svgElement, this._domElement);
    };

    Layer.prototype.layerUpdate = function (base) {
    };

    Layer.prototype.update = function (domNode, element) {
        Layered.prototype.update.apply(this, arguments);
        this.layerUpdate(this);
    };

    Layer.prototype.layerExit = function (base) {
    };

    Layer.prototype.exit = function (domNode, element) {
        this.layerExit(this);
        this._svgElement.remove();
        this._domElement.remove();
        Layered.prototype.exit.apply(this, arguments);
    };

    Layer.prototype.layerZoomed = function (base) {
    };

    Layer.prototype.zoomed = function () {
        Layered.prototype.zoomed.apply(this, arguments);
        this.layerZoomed(this);
    };

    return Layer;
}));