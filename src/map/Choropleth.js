"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./IChoropleth", "../other/Bag", "../api/ITooltip", "css!./Choropleth"], factory);
    } else {
        root.map_Choropleth = factory(root.d3, root.common_SVGWidget, root.map_IChoropleth, root.other_Bag, root.api_ITooltip);
    }
}(this, function (d3, SVGWidget, IChoropleth, Bag, ITooltip) {
    function Choropleth() {
        SVGWidget.call(this);
        IChoropleth.call(this);
        ITooltip.call(this);

        this._dataMap = {};
        this._dataMinWeight = 0;
        this._dataMaxWeight = 0;

        this._prevTranslate = [0, 0];
        this._prevScale = 1.0;
    }
    Choropleth.prototype = Object.create(SVGWidget.prototype);
    Choropleth.prototype.constructor = Choropleth;
    Choropleth.prototype._class += " map_Choropleth";
    Choropleth.prototype.implements(IChoropleth.prototype);
    Choropleth.prototype.implements(ITooltip.prototype);

    Choropleth.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", Choropleth.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Choropleth.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Choropleth.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this._data.forEach(function (item) {
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

    Choropleth.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            if (this._svgZoom) {
                this._svgZoom
                    .attr("x", -this._size.width / 2)
                    .attr("y", -this._size.height / 2)
                    .attr("width", this._size.width)
                    .attr("height", this._size.height)
                ;
            }
        }
        return retVal;
    };

    Choropleth.prototype.projection = function (_) {
        if (!arguments.length) return this._projection;
        this._projection = _;
        switch (this._projection) {
            case "albersUsaPr":
                this.d3Projection = this.albersUsaPr();
                break;
            case "orthographic":
                this.d3Projection = d3.geo.orthographic()
                    .clipAngle(90)
                ;
                break;
            case "mercator":
                this.d3Projection = d3.geo.mercator();
                break;
        }
        this.d3Path = d3.geo.path()
            .projection(this.d3Projection)
        ;
        return this;
    };

    Choropleth.prototype.render = function () {
        SVGWidget.prototype.render.apply(this, arguments);
        if (this._renderCount === 1) {
            this.zoomToFit();
        }
        return this;
    };

    Choropleth.prototype.enter = function (domNode, element) {
        //  Zoom  ---
        var context = this;
        this._svgZoom = element.append("rect")
            .attr("class", "zoom")
            .attr("x", -this._size.width / 2)
            .attr("y", -this._size.height / 2)
            .attr("width", this._size.width)
            .attr("height", this._size.height)
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(null, 750);
            })
        ;

        var defs = this._parentElement.insert("defs", ":first-child");
        var g = defs.append("pattern")
            .attr("id", "hash")
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", "10")
            .attr("height", "10")
            .attr("x", 0).attr("y", 0)
            .append("g");
        g.append("rect")
            .attr("class", "noFill")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 5)
            .attr("height", 5)
        ;
        g.append("rect")
            .attr("class", "noFill")
            .attr("x", 5)
            .attr("y", 5)
            .attr("width", 5)
            .attr("height", 5)
        ;

        this._svg = element.append("g");
        this._selection = new Bag.SimpleSelection(this._svg);
    };

    Choropleth.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    Choropleth.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        delete this._selection;
    };

    // A modified d3.geo.albersUsa to include Puerto Rico.
    Choropleth.prototype.albersUsaPr = function () {
        var ε = 1e-6;

        var lower48 = d3.geo.albers();

        // EPSG:3338
        var alaska = d3.geo.conicEqualArea()
            .rotate([154, 0])
            .center([-2, 58.5])
            .parallels([55, 65]);

        // ESRI:102007
        var hawaii = d3.geo.conicEqualArea()
            .rotate([157, 0])
            .center([-3, 19.9])
            .parallels([8, 18]);

        // XXX? You should check that this is a standard PR projection!
        var puertoRico = d3.geo.conicEqualArea()
            .rotate([66, 0])
            .center([0, 18])
            .parallels([8, 18]);

        var point,
            pointStream = { point: function (x, y) { point = [x, y]; } },
            lower48Point,
            alaskaPoint,
            hawaiiPoint,
            puertoRicoPoint;

        function albersUsa(coordinates) {
            var x = coordinates[0], y = coordinates[1];
            point = null;
            (lower48Point(x, y), point) ||
            (alaskaPoint(x, y), point) ||
            (hawaiiPoint(x, y), point) ||
            (puertoRicoPoint(x, y), point); // jshint ignore:line
            return point;
        }

        albersUsa.invert = function (coordinates) {
            var k = lower48.scale(),
                t = lower48.translate(),
                x = (coordinates[0] - t[0]) / k,
                y = (coordinates[1] - t[1]) / k;
            return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
                : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
                : y >= 0.204 && y < 0.234 && x >= 0.320 && x < 0.380 ? puertoRico
                : lower48).invert(coordinates);
        };

        // A naïve multi-projection stream.
        // The projections must have mutually exclusive clip regions on the sphere,
        // as this will avoid emitting interleaving lines and polygons.
        albersUsa.stream = function (stream) {
            var lower48Stream = lower48.stream(stream),
                alaskaStream = alaska.stream(stream),
                hawaiiStream = hawaii.stream(stream),
                puertoRicoStream = puertoRico.stream(stream);
            return {
                point: function (x, y) {
                    lower48Stream.point(x, y);
                    alaskaStream.point(x, y);
                    hawaiiStream.point(x, y);
                    puertoRicoStream.point(x, y);
                },
                sphere: function () {
                    lower48Stream.sphere();
                    alaskaStream.sphere();
                    hawaiiStream.sphere();
                    puertoRicoStream.sphere();
                },
                lineStart: function () {
                    lower48Stream.lineStart();
                    alaskaStream.lineStart();
                    hawaiiStream.lineStart();
                    puertoRicoStream.lineStart();
                },
                lineEnd: function () {
                    lower48Stream.lineEnd();
                    alaskaStream.lineEnd();
                    hawaiiStream.lineEnd();
                    puertoRicoStream.lineEnd();
                },
                polygonStart: function () {
                    lower48Stream.polygonStart();
                    alaskaStream.polygonStart();
                    hawaiiStream.polygonStart();
                    puertoRicoStream.polygonStart();
                },
                polygonEnd: function () {
                    lower48Stream.polygonEnd();
                    alaskaStream.polygonEnd();
                    hawaiiStream.polygonEnd();
                    puertoRicoStream.polygonEnd();
                }
            };
        };

        albersUsa.precision = function (_) {
            if (!arguments.length) return lower48.precision();
            lower48.precision(_);
            alaska.precision(_);
            hawaii.precision(_);
            puertoRico.precision(_);
            return albersUsa;
        };

        albersUsa.scale = function (_) {
            if (!arguments.length) return lower48.scale();
            lower48.scale(_);
            alaska.scale(_ * 0.35);
            hawaii.scale(_);
            puertoRico.scale(_);
            return albersUsa.translate(lower48.translate());
        };

        albersUsa.translate = function (_) {
            if (!arguments.length) return lower48.translate();
            var k = lower48.scale(), x = +_[0], y = +_[1];

            lower48Point = lower48
                .translate(_)
                .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
                .stream(pointStream).point;

            alaskaPoint = alaska
                .translate([x - 0.307 * k, y + 0.201 * k])
                .clipExtent([[x - 0.425 * k + ε, y + 0.120 * k + ε], [x - 0.214 * k - ε, y + 0.234 * k - ε]])
                .stream(pointStream).point;

            hawaiiPoint = hawaii
                .translate([x - 0.205 * k, y + 0.212 * k])
                .clipExtent([[x - 0.214 * k + ε, y + 0.166 * k + ε], [x - 0.115 * k - ε, y + 0.234 * k - ε]])
                .stream(pointStream).point;

            puertoRicoPoint = puertoRico
                .translate([x + 0.350 * k, y + 0.224 * k])
                .clipExtent([[x + 0.320 * k, y + 0.204 * k], [x + 0.380 * k, y + 0.234 * k]])
                .stream(pointStream).point;

            return albersUsa;
        };

        return albersUsa.scale(1070);
    };

    Choropleth.prototype.project = function (lat, long) {
        var pos = this.d3Projection([long, lat]);

        var offsetX = this.x() + this._prevTranslate[0];
        var offsetY = this.y() + this._prevTranslate[1];

        pos[0] *= this._prevScale;
        pos[1] *= this._prevScale;
        pos[0] += offsetX;
        pos[1] += offsetY;
        return pos;
    };

    Choropleth.prototype.zoomToFit = function (node, transitionDuration, scaleFactor) {
        scaleFactor = scaleFactor || 0.9;

        var bbox = node ? node.getBBox() : this._svg.node().getBBox();
        var x = bbox.x + bbox.width / 2;
        var y = bbox.y + bbox.height / 2;
        var scale = scaleFactor / Math.max(bbox.width / this.width(), bbox.height / this.height());
        var translate = [-scale * x, -scale * y];

        this._prevTranslate = translate;
        this._prevScale = scale;
        (transitionDuration ? this._svg.transition().duration(transitionDuration) : this._svg)
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")")
        ;
    };

    return Choropleth;
}));
