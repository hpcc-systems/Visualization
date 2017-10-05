import { HeatMap } from "@hpcc-js/other";
import { Layer } from "./Layer";

import "../src/Heat.css";

export class Heat extends Layer {
    _heatTransform;
    heat;
    _prevProjection;

    constructor() {
        super();
    }

    layerEnter(base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);
        this._parentOverlay.style("pointer-events", "none");
        this._heatTransform = domElement
            .style("pointer-events", "none")
            .append("div")
            .attr("class", this.classID())
            .style("width", base.width() + "px")
            .style("height", base.height() + "px")
            ;
        this.heat = new HeatMap()
            .target(this._heatTransform.node())
            ;
    }

    layerUpdate(base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._heatTransform
            .style("opacity", this.opacity())
            .style("width", base.width() + "px")
            .style("height", base.height() + "px")
            ;
        this.heat.resize(base.size());
        this.layerZoomed(base);
    }

    layerExit(base) {
        delete this._prevProjection;
        this.heat.target(null);
        delete this.heat;
    }

    layerZoomed(base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        const latField = this._db.fieldByLabel(this.latColumn());
        const longField = this._db.fieldByLabel(this.longColumn());
        this.heat
            .columns(this.columns())
            .data(this.visible() ? this.data().map(function (row) {
                const lat = latField ? row[latField.idx] : row[0];
                const long = longField ? row[longField.idx] : row[1];
                const transform = base.zoomTranslate();
                const pos = base.project(lat, long);
                const scale = base.zoomScale();
                pos[0] *= scale;
                pos[1] *= scale;
                return [transform[0] + pos[0], transform[1] + pos[1], row[4] || 0.5];
            }) : [])
            .render()
            ;
    }

    latColumn: { (): string; (_: string): Heat };
    latColumn_exists: () => boolean;
    longColumn: { (): string; (_: string): Heat };
    longColumn_exists: () => boolean;
    opacity: { (): number; (_: number): Heat };
    opacity_exists: () => boolean;
}
Heat.prototype._class += " map_Heat";

Heat.prototype.publish("latColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Heat.prototype.publish("longColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
Heat.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

// Heat.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
// Heat.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");
