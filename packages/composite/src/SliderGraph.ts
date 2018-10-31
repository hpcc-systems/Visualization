import { HTMLWidget, Palette } from "@hpcc-js/common";
import { Slider } from "@hpcc-js/form";
import { Edge, Graph, Vertex } from "@hpcc-js/graph";
import { Layered } from "@hpcc-js/layout";
import { select as d3Select } from "d3-selection";
import { timeFormat as d3TimeFormat } from "d3-time-format";

export class SliderGraph extends HTMLWidget {
    _graph;
    _layered;
    _slider;
    _palette;
    constructor() {
        super();
        this._graph = new Graph().scale(0.8);
        this._layered = new Layered();
        this._slider = new Slider().allowRange(true);
        this._slider.change = (s) => {
            this._graph.data().vertices.forEach((vertex) => {
                let vertexValue = vertex[this.filterProperty()];
                let sliderMin = s.data()[0][0];
                let sliderMax = s.data()[0][1];
                if (this.datetimeFormat_exists()) {
                    vertexValue = new Date(vertexValue).getTime();
                    sliderMin = new Date(sliderMin).getTime();
                    sliderMax = new Date(sliderMax).getTime();
                }
                vertex.visible(sliderMin <= vertexValue && vertexValue <= sliderMax);
            });
            this._graph.data().edges.forEach((edge) => {
                edge.visible(edge._targetVertex.visible() && edge._sourceVertex.visible());
            });
        };
        this._slider.dragTick = (s) => {
            this._graph.data().vertices.forEach((vertex) => {
                let vertexValue = vertex[this.filterProperty()];
                let sliderMin = s.data()[0][0];
                let sliderMax = s.data()[0][1];
                if (this.datetimeFormat_exists()) {
                    vertexValue = new Date(vertexValue).getTime();
                    sliderMin = new Date(sliderMin).getTime();
                    sliderMax = new Date(sliderMax).getTime();
                }
                vertex.visible(sliderMin <= vertexValue && vertexValue <= sliderMax);
            });
            this._graph.data().edges.forEach((edge) => {
                edge.visible(edge._targetVertex.visible() && edge._sourceVertex.visible());
            });
        };
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        d3Select(domNode.parentNode)
            .style("position", "relative")
            .style("height", "100%")
            .style("width", "100%")
            ;
        element
            .style("position", "relative")
            .style("height", "100%")
            .style("width", "100%")
            ;

        this._layered
            .target(domNode)
            .addLayer(this._graph)
            .addLayer(this._slider, "bottom", 1, "50px")
            ;
    }
    update(domNode, element) {
        super.update(domNode, element);

        this._palette = Palette.rainbow(this.paletteID());

        this._slider.visible(this.showSlider());
        let min;
        let max;
        const vertices = this.data().map(row => {
            const vert = new Vertex().iconAnchor("middle");
            if (typeof row[1] === "object") {
                for (const property of Object.keys(row[1])) {
                    if (typeof vert[property] === "function") {
                        vert[property](row[1][property]);
                    }
                }
                if (typeof vert[this.filterProperty()] === "function") {
                    console.error(`The selected this.filterProperty(), ${this.filterProperty()}, is already a function.`);
                } else {
                    const val = (row[1][this.filterProperty()]);
                    const valTime = new Date(row[1][this.filterProperty()]).getTime();
                    vert[this.filterProperty()] = val;
                    if (typeof min === "undefined" || min > valTime)min = valTime;
                    if (typeof max === "undefined" || max < valTime)max = valTime;
                }
            }
            return vert;
        });
        vertices.forEach(vertex => {
            vertex.icon_shape_colorFill(this._palette(new Date(vertex[this.filterProperty()]).getTime(), min, max));
        });
        let edges = [];
        this.data().forEach((row, index) => {
            const subEdges = [];
            row[0].forEach(link => {
                const edge = new Edge().showArc(false);
                if (typeof link === "object") {
                    edge
                        .sourceVertex(vertices[index])
                        .targetVertex(vertices[link.index])
                        ;
                    for (const property of row[0]) {
                        if (typeof edge[property] === "function") {
                            edge[property](row[0][property]);
                        }
                    }
                } else {
                    edge
                        .sourceVertex(vertices[index])
                        .targetVertex(vertices[link])
                        ;
                }
                subEdges.push(edge);
            });
            edges = edges.concat(subEdges);
        });
        if (this.datetimeFormat_exists()) {
            const formatter = d3TimeFormat(this.datetimeFormat());
            const dates = vertices.map(vert => {
                return new Date(vert[this.filterProperty()]).getTime();
            });
            const minDatetime = Math.min(...dates);
            const maxDatetime = Math.max(...dates);
            const formattedMinDate = formatter(new Date(minDatetime * 0.95));
            const formattedMaxDate = formatter(new Date(maxDatetime * 1.05));
            this._slider
                .timePattern(this.datetimeFormat())
                .tickDateFormat(this.tickFormat_exists() ? this.tickFormat() : "%b,%Y")
                .lowDatetime(formattedMinDate)
                .highDatetime(formattedMaxDate)
                .step(1)
                .columns([this.filterProperty()])
                .data([
                    [formattedMinDate, formattedMaxDate]
                ])
                ;
        } else {
            const filterValues = vertices.map(vert => vert[this.filterProperty()]);
            const minFilterValue = Math.min(...filterValues);
            const maxFilterValue = Math.max(...filterValues);
            this._slider
                .tickValueFormat(this.tickFormat())
                .low(minFilterValue)
                .high(maxFilterValue)
                .step(maxFilterValue - minFilterValue > 10 ? 1 : 0.001)
                .columns([this.filterProperty()])
                .data([
                    [minFilterValue, maxFilterValue]
                ])
                ;
        }
        this._graph
            .data({ vertices, edges })
            ;
        this._layered
            .resize()
            .render()
            ;
    }
    exit(domNode, element) {
        super.exit(domNode, element);
    }
}
SliderGraph.prototype._class += " composite_SliderGraph";
SliderGraph.prototype._palette = Palette.rainbow("default");

export interface SliderGraph {
    padding(): number;
    padding(_: number): this;
    paletteID(): string;
    paletteID(_: string): this;
    filterProperty(): string;
    filterProperty(_: string): this;
    datetimeFormat(): string;
    datetimeFormat(_: string): this;
    datetimeFormat_exists(): boolean;
    tickFormat(): string;
    tickFormat(_: string): this;
    tickFormat_exists(): boolean;
    showSlider(): boolean;
    showSlider(_: boolean): this;
}
SliderGraph.prototype.publish("padding", 8, "number", "padding");
SliderGraph.prototype.publish("paletteID", "Blues", "set", "Color palette for this widget", SliderGraph.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
SliderGraph.prototype.publish("filterProperty", "filter", "string", "Property key that filters the graph based on the selected range of the slider");
SliderGraph.prototype.publish("datetimeFormat", null, "string", "If this is set then SliderGraph will assume the filterProperty values are datetime strings (and datetimeFormat will be the expected format)");
SliderGraph.prototype.publish("tickFormat", null, "string", "Format for the slider ticks");
SliderGraph.prototype.publish("showSlider", true, "boolean", "If true, slider displays");
