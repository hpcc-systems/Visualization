import { Palette, select as d3Select, SVGGlowFilter, Utility } from "@hpcc-js/common";
import { LatLngBounds, Map } from "leaflet";
import { FeatureLayer } from "./FeatureLayer";
import { TopoJSON } from "./TopoJSON";

import "../../src/leaflet/US.css";

export class US extends FeatureLayer {

    protected _features;
    protected _selection: Utility.SimpleSelection;
    _palette;

    protected _dataMap = {};
    protected _dataMinWeight = null;
    protected _dataMaxWeight = null;

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this);
    }

    hasBounds() {
        return true;
    }

    getBounds() {
        const retVal = super.getBounds();
        return new LatLngBounds([retVal.getNorth(), retVal.getWest()], [17.755278, -64.565]);
    }

    data(_?) {
        const retVal = super.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            const context = this;
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
    }

    style(feature) {
        const d = this._dataMap[feature.properties.hpccID];
        const fillColor = d ? this._palette(d[1], this._dataMinWeight, this._dataMaxWeight) : "transparent";
        return {
            color: this.meshVisible() ? this.meshColor() : undefined,
            opacity: 1,
            weight: this.meshStrokeWidth(),
            fillColor,
            fillOpacity: this.opacity()
        };
    }

    svgGlowID() {
        return this.id() + "_svgGlow";
    }

    private _topoJson;
    private _svgElement;
    layerEnter(map: Map) {
        super.layerEnter(map);
        this._topoJson = new TopoJSON(this._features, {
            onEachFeature: (f, l) => {
                l.on("click", e => this.clickHandler(e, l, l.feature.properties.hpccID));
            }
        }).bindTooltip((l: any) => this.tooltipHandler(l, l.feature.properties.hpccID), {
            direction: "top",
            sticky: true
        });
        this.add(this._topoJson);
        if (!this._svgElement) {
            this._svgElement = d3Select(map.getContainer()).select(".leaflet-pane.leaflet-overlay-pane > svg");
            const svgDefs = this._svgElement.append("defs");
            new SVGGlowFilter(svgDefs, this.svgGlowID());
            this._selection.widgetElement(this._svgElement);
        }
    }

    layerUpdate(map: Map) {
        super.layerUpdate(map);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._topoJson.setStyle(feature => this.style(feature));
    }

    //  Events  ---
    clickHandler(e, l, featureID): boolean {
        const sel = this._selection.click(e.originalEvent.target);
        this.click(this.rowToObj(this._dataMap[featureID]), this.columns()[0], sel);
        return sel;
    }

    tooltipHandler(l, featureID) {
        const row = this._dataMap[featureID];
        const value = row && row[1] || "";
        return `<b>${featureID}</b>:  ${value}`;
    }

    //  Events  ---
    click(row, col, sel) {
    }
}
US.prototype._palette = Palette.rainbow("default");
US.prototype.mixin(Utility.SimpleSelectionMixin);

export interface US {
    autoScaleMode(): string;
    autoScaleMode(_: string): this;
    autoScaleMode_exists(): boolean;
    paletteID(): string;
    paletteID(_: string): this;
    paletteID_exists(): boolean;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    useClonedPalette_exists(): boolean;
    opacity(): number;
    opacity(_: number): this;
    opacity_default(_: number): this;
    opacity_exists(): boolean;
    meshVisible(): boolean;
    meshVisible(_: boolean): this;
    meshVisible_exists(): boolean;
    meshColor(): string;
    meshColor(_: string): this;
    meshColor_exists(): boolean;
    meshStrokeWidth(): number;
    meshStrokeWidth(_: number): this;
    meshStrokeWidth_exists(): boolean;
}

US.prototype.publish("paletteID", "YlOrRd", "set", "Color palette for this widget", US.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
US.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

US.prototype.publish("opacity", 0.5, "number", "Opacity", null, { tags: ["Advanced"] });

US.prototype.publish("meshVisible", true, "boolean", "Mesh Visibility");
US.prototype.publish("meshColor", "black", "html-color", "Stroke Color");
US.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");
US.prototype.publish("internalOnly", false, "boolean", "Internal mesh only");
