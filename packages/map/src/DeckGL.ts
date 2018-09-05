import { HTMLWidget } from "@hpcc-js/common";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import "deck.gl";

export class DeckGL extends HTMLWidget {

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const min = Math.min.apply(undefined, this.data().map(n => n[4]));
        const max = Math.max.apply(undefined, this.data().map(n => n[4]));
        const weightScale = d3ScaleLinear()
            .domain([min, max])
            .range([2, 30])
            ;
        const scatterLayer = new deck.ScatterplotLayer({
            data: this.getScatterData(),
            opacity: 0.3
        });
        const textLayer = new deck.TextLayer({
            data: this.getTextData()
        });
        // const layer = new HexagonLayer({
        //     id: 'hexagon-layer',
        //     data,
        //     pickable: true,
        //     extruded: true,
        //     radius: 200,
        //     elevationScale: 4,
        //     getPosition: d => d.COORDINATES,
        //     onHover: ({object}) => setTooltip(`${object.centroid.join(', ')}\nCount: ${object.points.length}`)
        // });

        const arcLayer = new deck.ArcLayer({
              data: this.getArcData(),
              getStrokeWidth: d => weightScale(d.weight),
              getSourcePosition: d => d.from.coordinates,
              getTargetPosition: d => d.to.coordinates,
              getSourceColor: d => [200, 140, 0],
              getTargetColor: d => [120, 140, 0]
            });
        new deck.DeckGL({
            container: this.target(),
            mapboxApiAccessToken: "",
            mapStyle: "https://free.tilehosting.com/styles/positron/style.json?key=U0iNgiZKlYdwvgs9UPm1",
            longitude: this.defaultLong(),
            latitude: this.defaultLat(),
            zoom: this.defaultZoom(),
            layers: [
              arcLayer,
              scatterLayer,
              textLayer,
            ]
          });
    }

    update(domNode, element) {
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);

    }
    getScatterData() {
        return this.data().map(row => {
            console.log("row", row);
            return {
                position: [row[1], row[0]],
                opacity: 0.5
            };
        });
    }
    getTextData() {
        return this.data().map(row => {
            return {
                position: [row[1], row[0]],
                text: `lat: ${row[0]} long: ${row[1]}`
            };
        });
    }
    getArcData() {
        return this.data().map(row => {
            return {
                weight: row[4],
                inbound: 72633,
                outbound: 74735,
                from: {
                    name: `lat: ${row[0]} long: ${row[1]}`,
                    coordinates: [row[1], row[0]]
                },
                to: {
                    name: `lat: ${row[2]} long: ${row[3]}`,
                    coordinates: [row[3], row[2]]
                },
            };
        });
    }
}
DeckGL.prototype._class += " map_DeckGL";
export interface DeckGL {
    defaultLat(): number;
    defaultLat(_: number): this;
    defaultLong(): number;
    defaultLong(_: number): this;
    defaultZoom(): number;
    defaultZoom(_: number): this;
}
DeckGL.prototype.publish("defaultLat", 30.25, "number", "Default Zoom Level", null, { tags: ["Basic"] });
DeckGL.prototype.publish("defaultLong", -97.75, "number", "Default Zoom Level", null, { tags: ["Basic"] });
DeckGL.prototype.publish("defaultZoom", 12, "number", "Default Zoom Level", null, { tags: ["Basic"] });
