import { descending } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { timerFlush } from "d3-timer";
import "d3-transition";

export interface BulletDatum {
    ranges: number[];
    markers: number[];
    measures: number[];
    [key: string]: unknown;
}

export type BulletAccessor<Datum = BulletDatum> = (this: SVGElement, datum: Datum, index: number) => number[];
export type BulletOrientation = "left" | "right" | "top" | "bottom";

export interface BulletGenerator<Datum = BulletDatum> {
    (selection: any): void;
    orient(): BulletOrientation;
    orient(_: BulletOrientation): this;
    ranges(): BulletAccessor<Datum>;
    ranges(_: BulletAccessor<Datum>): this;
    markers(): BulletAccessor<Datum>;
    markers(_: BulletAccessor<Datum>): this;
    measures(): BulletAccessor<Datum>;
    measures(_: BulletAccessor<Datum>): this;
    width(): number;
    width(_: number): this;
    height(): number;
    height(_: number): this;
    tickFormat(): ((domainValue: number, index: number) => string) | null;
    tickFormat(_: ((domainValue: number, index: number) => string) | null): this;
}

function defaultRanges(datum: BulletDatum) {
    return datum.ranges;
}

function defaultMarkers(datum: BulletDatum) {
    return datum.markers;
}

function defaultMeasures(datum: BulletDatum) {
    return datum.measures;
}

function bulletWidth(scale: (value: number) => number) {
    const zero = scale(0);
    return (value: number) => Math.abs(scale(value) - zero);
}

export function bullet<Datum = BulletDatum>(): BulletGenerator<Datum> {
    let orient: BulletOrientation = "left";
    let reverse = false;
    let vertical = false;
    let ranges = defaultRanges as BulletAccessor<Datum>;
    let markers = defaultMarkers as BulletAccessor<Datum>;
    let measures = defaultMeasures as BulletAccessor<Datum>;
    let width = 380;
    let height = 30;
    let tickFormatter: ((domainValue: number, index: number) => string) | null = null;

    function generator(selection: any) {
        selection.each(function (datum: Datum, index: number) {
            const rangeValues = ranges.call(this, datum, index).slice().sort(descending);
            const markerValues = markers.call(this, datum, index).slice().sort(descending);
            const measureValues = measures.call(this, datum, index).slice().sort(descending);
            const group = select(this);
            const extentX = vertical ? height : width;
            const extentY = vertical ? width : height;

            let wrap = group.select<SVGGElement>("g.wrap");
            if (wrap.empty()) wrap = group.append("g").attr("class", "wrap");
            wrap.attr("transform", vertical ? `rotate(90)translate(0,${-width})` : null);

            const maxValue = Math.max(rangeValues[0] || 0, markerValues[0] || 0, measureValues[0] || 0);
            const nextScale = scaleLinear()
                .domain([0, maxValue])
                .range(reverse ? [extentX, 0] : [0, extentX]);
            const previousScale = (this as any).__chart__ || scaleLinear()
                .domain([0, Infinity])
                .range(nextScale.range());
            (this as any).__chart__ = nextScale;

            const previousWidth = bulletWidth(previousScale);
            const nextWidth = bulletWidth(nextScale);

            const range = wrap.selectAll<SVGRectElement, number>("rect.range").data(rangeValues);
            range.exit().remove();
            range.enter().append("rect")
                .attr("class", (_value, rangeIndex) => `range s${rangeIndex}`)
                .attr("width", previousWidth)
                .attr("height", extentY)
                .attr("x", value => reverse ? previousScale(value) : 0)
                .merge(range)
                .transition()
                .attr("x", value => reverse ? nextScale(Number(value)) : 0)
                .attr("width", nextWidth)
                .attr("height", extentY);

            const measure = wrap.selectAll<SVGRectElement, number>("rect.measure").data(measureValues);
            measure.exit().remove();
            measure.enter().append("rect")
                .attr("class", (_value, measureIndex) => `measure s${measureIndex}`)
                .attr("width", previousWidth)
                .attr("height", extentY / 3)
                .attr("x", value => reverse ? previousScale(value) : 0)
                .attr("y", extentY / 3)
                .merge(measure)
                .transition()
                .attr("width", nextWidth)
                .attr("height", extentY / 3)
                .attr("x", value => reverse ? nextScale(Number(value)) : 0)
                .attr("y", extentY / 3);

            const marker = wrap.selectAll<SVGLineElement, number>("line.marker").data(markerValues);
            marker.exit().remove();
            marker.enter().append("line")
                .attr("class", "marker")
                .attr("x1", previousScale)
                .attr("x2", previousScale)
                .attr("y1", extentY / 6)
                .attr("y2", extentY * 5 / 6)
                .merge(marker)
                .transition()
                .attr("x1", nextScale)
                .attr("x2", nextScale)
                .attr("y1", extentY / 6)
                .attr("y2", extentY * 5 / 6);

            const axisGenerator = (vertical ? axisLeft(nextScale) : axisBottom(nextScale)).tickFormat(tickFormatter);
            let axis = group.selectAll<SVGGElement, number>("g.axis").data([0]);
            axis = axis.enter().append("g").attr("class", "axis").merge(axis);
            axis.attr("transform", vertical ? null : `translate(0,${extentY})`).call(axisGenerator);
        });
        timerFlush();
    }

    const api = generator as BulletGenerator<Datum>;
    api.orient = function (value?: BulletOrientation): any {
        if (!arguments.length) return orient;
        orient = value!;
        reverse = orient === "right" || orient === "bottom";
        vertical = orient === "top" || orient === "bottom";
        return api;
    } as any;
    api.ranges = function (value?: BulletAccessor<Datum>): any {
        if (!arguments.length) return ranges;
        ranges = value!;
        return api;
    } as any;
    api.markers = function (value?: BulletAccessor<Datum>): any {
        if (!arguments.length) return markers;
        markers = value!;
        return api;
    } as any;
    api.measures = function (value?: BulletAccessor<Datum>): any {
        if (!arguments.length) return measures;
        measures = value!;
        return api;
    } as any;
    api.width = function (value?: number): any {
        if (!arguments.length) return width;
        width = +value!;
        return api;
    } as any;
    api.height = function (value?: number): any {
        if (!arguments.length) return height;
        height = +value!;
        return api;
    } as any;
    api.tickFormat = function (value?: ((domainValue: number, index: number) => string) | null): any {
        if (!arguments.length) return tickFormatter;
        tickFormatter = value ?? null;
        return api;
    } as any;
    return api;
}

