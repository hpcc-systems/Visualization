import { require as d3Require } from "d3-require";
import { placeholder } from "./util";

const Leaflet = {
    clusterPins: "ClusterPins",
    pins: "Pins"
};

export const geospatial = {};

function pinsFactory(type, prefix) {
    return async function* (props: { height?: number, [key: string]: any } = {}) {
        const hpccMap = await d3Require("@hpcc-js/map");

        const { div, widget } = placeholder(new hpccMap.Leaflet[type](), props);

        const columns = ["lat", "lng", "faChar", "color", "popup"];
        widget
            .latitudeColumn(columns[0])
            .longitudeColumn(columns[1])
            .faCharColumn(columns[2])
            .fillColorColumn(columns[3])
            .popupColumn(columns[4])
            .on("click", (row, col, sel, ext) => {
                div.value = sel ? row.__lparam ? row.__lparam : row : null;
                div.dispatchEvent(new CustomEvent("input"));
            })
            ;

        yield div;

        widget
            .target(div)
            .lazyRender()
            ;
    };
}

for (const key in Leaflet) {
    geospatial[key] = pinsFactory(Leaflet[key], "Leaflet");
}
