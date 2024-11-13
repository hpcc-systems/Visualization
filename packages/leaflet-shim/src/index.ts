import * as L from "leaflet";

export * from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export * from "./plugins/Leaflet.GoogleMutant";
export { BeautifyIcon } from "./plugins/BeautifyIcon";
export * from "./plugins/D3SvgOverlay";
export { HeatLayer as LHeatLayer } from "./plugins/HeatLayer";

export type MarkerClusterGroup = L.MarkerClusterGroup;
export const MarkerClusterGroup = L.MarkerClusterGroup;

export const Draw = L.Draw;
