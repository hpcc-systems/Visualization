import { CanvasPins } from "./CanvasPins";
import { Layer } from "./Layer";

export class CanvasPinLayer extends Layer {
    _pinsTransform;
    pins;
    _prevProjection;

    constructor() {
        super();
        this.pins = new CanvasPins();
    }

    layerEnter(base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);
        this._parentOverlay.style("pointer-events", "none");
        this._pinsTransform = domElement
            .style("pointer-events", "none")
            .append("div")
            .attr("class", this.classID())
            .style("width", base.width() + "px")
            .style("height", base.height() + "px")
            ;
        this.pins.target(this._pinsTransform.node());
    }

    layerUpdate(base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._pinsTransform
            .style("opacity", this.opacity())
            .style("width", base.width() + "px")
            .style("height", base.height() + "px")
            ;
        this.pins.resize(base.size());
        this.layerZoomed(base);
    }

    layerExit(base) {
        delete this._prevProjection;
        this.pins.target(null);
        delete this.pins;
    }

    layerZoomed(base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        const latField = this._db.fieldByLabel(this.latColumn());
        const longField = this._db.fieldByLabel(this.longColumn());
        const weightField = this._db.fieldByLabel(this.weightColumn());
        this.pins
            .columns(this.columns())
            .data(this.visible() ? this.data().map(function (row) {
                const lat = latField ? row[latField.idx] : row[0];
                const long = longField ? row[longField.idx] : row[1];
                const weight = weightField ? row[weightField.idx] : 1;
                const transform = base.zoomTranslate();
                const pos = base.project(lat, long);
                const scale = base.zoomScale();
                pos[0] *= scale;
                pos[1] *= scale;
                return [transform[0] + pos[0], transform[1] + pos[1], weight];
            }) : [])
            .render()
            ;
    }
}
CanvasPinLayer.prototype._class += " map_CanvasPinLayer";

export interface CanvasPinLayer {
    latColumn(): string;
    latColumn(_: string): CanvasPinLayer;
    longColumn(): string;
    longColumn(_: string): CanvasPinLayer;
    weightColumn(): string;
    weightColumn(_: string): CanvasPinLayer;
    opacity(): number;
    opacity(_: number): CanvasPinLayer;
    opacity_exists(): boolean;
}

CanvasPinLayer.prototype.publishProxy("clusterMode", "pins", "clusterMode");
CanvasPinLayer.prototype.publishProxy("allCircles", "pins", "allCircles");
CanvasPinLayer.prototype.publishProxy("showQuadtree", "pins", "showQuadtree");
CanvasPinLayer.prototype.publishProxy("useAveragePos", "pins", "useAveragePos");
CanvasPinLayer.prototype.publishProxy("shrinkFontToPin", "pins", "shrinkFontToPin");
CanvasPinLayer.prototype.publishProxy("enableClustering", "pins", "enableClustering");
CanvasPinLayer.prototype.publishProxy("useWeightedRadius", "pins", "useWeightedRadius");
CanvasPinLayer.prototype.publishProxy("radiusWeightMult", "pins", "radiusWeightMult");
CanvasPinLayer.prototype.publishProxy("searchRectMult", "pins", "searchRectMult");
CanvasPinLayer.prototype.publishProxy("pinHeight", "pins", "pinHeight");
CanvasPinLayer.prototype.publishProxy("pinWidth", "pins", "pinWidth");
CanvasPinLayer.prototype.publishProxy("pinFontFamily", "pins", "pinFontFamily");
CanvasPinLayer.prototype.publishProxy("pinFontSize", "pins", "pinFontSize");
CanvasPinLayer.prototype.publishProxy("arrowHeight", "pins", "arrowHeight");
CanvasPinLayer.prototype.publishProxy("arrowWidth", "pins", "arrowWidth");
CanvasPinLayer.prototype.publish("latColumn", null, "set", "latColumn", function () { return this.columns(); }, { optional: true });
CanvasPinLayer.prototype.publish("longColumn", null, "set", "longColumn", function () { return this.columns(); }, { optional: true });
CanvasPinLayer.prototype.publish("weightColumn", null, "set", "weightColumn", function () { return this.columns(); }, { optional: true });
CanvasPinLayer.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });
