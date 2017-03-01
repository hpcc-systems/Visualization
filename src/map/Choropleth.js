"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Layer", "../common/Palette", "../common/Utility", "css!./Choropleth"], factory);
    } else {
        root.map_Choropleth = factory(root.d3, root.topojson, root.map_Layer, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, topojson, Layer, Palette, Utility) {
    function Choropleth() {
        Layer.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._dataMap = {};
        this._path = d3.select(null);
    }
    Choropleth.prototype = Object.create(Layer.prototype);
    Choropleth.prototype.constructor = Choropleth;
    Choropleth.prototype._class += " map_Choropleth";
    Choropleth.prototype.mixin(Utility.SimpleSelectionMixin);

    Choropleth.prototype._palette = Palette.rainbow("default");

    Choropleth.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", Choropleth.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    Choropleth.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    Choropleth.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Choropleth.prototype.publish("meshVisible", true, "boolean", "Mesh Visibility");
    Choropleth.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
    Choropleth.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");
    Choropleth.prototype.publish("internalOnly", false, "boolean", "Internal mesh only");
    Choropleth.prototype.publish("autoScaleMode", "mesh", "set", "Auto Scale", ["none", "mesh", "data"], { tags: ["Basic"], override: true });

    Choropleth.prototype.data = function (_) {
        var retVal = Layer.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this.data().forEach(function (item) {
                context._dataMap[item[0]] = item;
                if (!context._dataMinWeight || item[1] < context._dataMinWeight) {
                    context._dataMinWeight = item[1];
                }
                if (!context._dataMaxWeight || item[1] > context._dataMaxWeight) {
                    context._dataMaxWeight = item[1];
                }
            });
        }
        return retVal;
    };

    Choropleth.prototype.getDataBounds = function () {
        var bbox = this._choroplethData.node().getBBox();
        var retVal = {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
        };
        var scale = this._zoom.scale();
        retVal.x *= scale;
        retVal.y *= scale;
        retVal.width *= scale;
        retVal.height *= scale;
        var translate = this._zoom.translate();
        retVal.x += translate[0];
        retVal.y += translate[1];
        return retVal;
    };

    Choropleth.prototype.autoScale = function () {
        switch (this.autoScaleMode()) {
            case "none":
                return;
            case "mesh":
                this.shrinkToFit(this.getBounds());
                break;
            case "data":
                this.shrinkToFit(this.getDataBounds());
                break;
        }
    };

    Choropleth.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._choroplethTransform = svgElement;
        this._choroplethData = this._choroplethTransform.append("g");
        this._choropleth = this._choroplethTransform.append("path")
            .attr("class", "mesh")
        ;
    };

    Choropleth.prototype.layerUpdate = function (base, forcePath) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        if (!this.visible() || !this.meshVisible()) {
            this._choropleth.attr("d", "");
            delete this._prevProjection;
            return;
        }

        if (forcePath || this._prevProjection !== base.projection() || this._prevInternalOnly !== this.internalOnly()) {
            this._choropleth
                .attr("d", base._d3GeoPath(topojson.mesh(this._choroTopology, this._choroTopologyObjects, this.internalOnly() ? function (a, b) { return a !== b; } : function (a, b) { return true; })))
            ;
            this._prevProjection = base.projection();
            this._prevInternalOnly = this.internalOnly();
        }
        this._choroplethTransform
            .style("opacity", this.opacity())
            .style("stroke", this.meshColor())
        ;
    };

    Choropleth.prototype.layerExit = function (base) {
        delete this._prevProjection;
        delete this._prevInternalOnly;
    };

    Choropleth.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);

        this._choroplethTransform
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .style("stroke-width", this.meshStrokeWidth() / base._zoom.scale() + "px")
        ;
    };

    //  Events  ---
    Choropleth.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    Choropleth.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Choropleth;
}));