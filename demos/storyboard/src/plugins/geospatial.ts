import * as hpccMap from "@hpcc-js/map";
import { div } from "./util";

const Leaflet = {
    clusterPins: "ClusterPins",
    pins: "Pins"
};

export const geospatial = {};

function pinsFactory(type, prefix) {
    return async function* (props: { height?: number, [key: string]: any } = {}) {
        try {
            const Widget = hpccMap[prefix][type];
            const columns = ["lat", "lng", "faChar", "color", "popup"];
            const cp = new Widget()
                .columns(columns)
                .latitudeColumn(columns[0])
                .longitudeColumn(columns[1])
                .faCharColumn(columns[2])
                .fillColorColumn(columns[3])
                .popupColumn(columns[4])
                .on("click", (row, col, sel) => {
                    // _div.notify(sel ? row?.__lparam ? row?.__lparam : row : null);
                })
                ;

            const _div = div(cp, props);

            yield _div;

            _div.widget
                .target(_div)
                .lazyRender()
                ;
        } catch (e) {
            debugger;
        }
    };
}

for (const key in Leaflet) {
    geospatial[key] = pinsFactory(Leaflet[key], "Leaflet");
}
