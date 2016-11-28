import { Layer } from './Layer';
import * as Utility from './Utility';
import "css!./OpenStreet";

export function OpenStreet() {
    Layer.call(this);
}
OpenStreet.prototype = Object.create(Layer.prototype);
OpenStreet.prototype.constructor = OpenStreet;
OpenStreet.prototype._class += " map_OpenStreet";

OpenStreet.prototype._copyrightText = "© OpenStreetMap contributors";

OpenStreet.prototype.publish("tileProvider", "OpenStreetMap", "set", "Tile Provider", ["OpenStreetMap", "OpenStreetMap Hot", "MapQuest", "MapQuest Sat", "Stamen Watercolor", "OpenCycleMap"], { tags: ["Basic", "Shared"] });

OpenStreet.prototype.layerEnter = function (base, svgElement, domElement) {
    Layer.prototype.layerEnter.apply(this, arguments);

    this._tile = Utility.Tile();
    this._openStreetTransform = svgElement.append("g");
    this._openStreet = this._openStreetTransform.append("g");
    this._copyright = svgElement.append("text")
        .attr("x", -100)
        .attr("y", -100)
        .style("opacity", 0.5)
        .text(this._copyrightText)
        ;
    this._copyrightBBox = this._copyright.node().getBBox();
};

OpenStreet.prototype.layerUpdate = function (base) {
    if (!this.visible()) {
        this._copyright.text("");
    } else {
        this._copyright
            .attr("x", base.width() - this._copyrightBBox.width - this._copyrightBBox.height / 2)
            .attr("y", base.height() - this._copyrightBBox.height / 2)
            .text(this._copyrightText)
            ;
    }
};

OpenStreet.prototype.layerZoomed = function (base) {
    var tiles = [];
    if (this.visible()) {
        var maxSize = base.project(-85, 180);
        if (!maxSize || maxSize[0] <= 0 || maxSize[1] <= 0) {
            maxSize = [base.width(), base.height()];
        }
        this._tile
            .size([Math.min(base.width(), maxSize[0]), Math.min(base.height(), maxSize[1])])
            .scale(base._zoom.scale() * (1 << 12))
            .translate(base._zoom.translate())
            ;
        tiles = this._tile();
        this._openStreetTransform
            .attr("transform", "scale(" + tiles.scale + ")translate(" + tiles.translate + ")")
            ;
    }
    if (this._prevTileProvider !== this.tileProvider()) {
        this._openStreet.selectAll("image").remove();
        this._prevTileProvider = this.tileProvider();
    }
    var context = this;
        var protocol = window.location.protocol === "https:" ? "https:" : "http:";
    var image = this._openStreet.selectAll("image").data(tiles, function (d) { return d[2] + "/" + d[0] + "/" + d[1]; });
    image.enter().append("image")
        .attr("xlink:href", function (d) {
            switch (context.tileProvider()) {
                case "OpenStreetMap Hot":
                        return protocol + "//" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.fr/hot/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                case "MapQuest":
                        return protocol + "//otile" + ["1", "2", "3", "4"][Math.random() * 4 | 0] + ".mqcdn.com/tiles/1.0.0/osm/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                case "MapQuest Sat":
                        return protocol + "//otile" + ["1", "2", "3", "4"][Math.random() * 4 | 0] + ".mqcdn.com/tiles/1.0.0/sat/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                case "Stamen Watercolor":
                        return protocol + "//" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.stamen.com/watercolor/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                case "OpenCycleMap":
                        return protocol + "//" + ["a", "b"][Math.random() * 2 | 0] + ".tile.opencyclemap.org/cycle/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                default:
                        return protocol + "//" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
            }
        })
        .attr("width", 1)
        .attr("height", 1)
        .attr("x", function (d) { return d[0]; })
        .attr("y", function (d) { return d[1]; })
        .style("opacity", 0.0)
        .transition().duration(500)
        .style("opacity", 1)
        ;
    image.exit()
        .remove()
        ;
};
