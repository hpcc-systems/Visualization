import { sum } from "d3-array";
import { dispatch } from "d3-dispatch";
import { format, formatLocale, formatPrefix, formatSpecifier } from "d3-format";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import "d3-transition";

export interface LegendLabelContext {
    i: number;
    genLength: number;
    generatedLabels: string[];
    domain: unknown[];
    range: unknown[];
    labelDelimiter: string;
}

export type LegendLabels = string[] | ((context: LegendLabelContext) => string);

export interface LegendColor {
    (selection: any): void;
    scale(): any;
    scale(_: any): this;
    cells(): any;
    cells(_: any): this;
    cellFilter(): any;
    cellFilter(_: any): this;
    shape(): string;
    shape(_: string, path?: string): this;
    shapeWidth(): number;
    shapeWidth(_: number): this;
    shapeHeight(): number;
    shapeHeight(_: number): this;
    shapeRadius(): number;
    shapeRadius(_: number): this;
    shapePadding(): number;
    shapePadding(_: number): this;
    labels(): LegendLabels;
    labels(_: LegendLabels): this;
    labelAlign(): string;
    labelAlign(_: "start" | "middle" | "end"): this;
    locale(): any;
    locale(_: any): this;
    labelFormat(): any;
    labelFormat(_: string): this;
    labelOffset(): number;
    labelOffset(_: number): this;
    labelDelimiter(): string;
    labelDelimiter(_: string): this;
    labelWrap(): number | undefined;
    labelWrap(_: number | undefined): this;
    useClass(): boolean;
    useClass(_: boolean): this;
    orient(): string;
    orient(_: "horizontal" | "vertical"): this;
    ascending(): boolean;
    ascending(_: boolean): this;
    classPrefix(): string;
    classPrefix(_: string): this;
    title(): string;
    title(_: string): this;
    titleWidth(): number | undefined;
    titleWidth(_: number | undefined): this;
    on(typename: string): ((...args: any[]) => void) | undefined;
    on(typename: string, callback: (...args: any[]) => void): this;
}

const identity = (value: any) => value;

function reverse(values: any[]) {
    return [...values].reverse();
}

function wrapText(text: any, width: number) {
    text.each(function () {
        const textSelection = select(this);
        const words = textSelection.text().split(/\s+/).reverse();
        let word: string | undefined;
        let line: string[] = [];
        const lineHeight = 1.2;
        const dy = parseFloat(textSelection.attr("dy")) || 0;
        let tspan = textSelection.text(null).append("tspan").attr("x", 0).attr("dy", `${dy}em`);

        while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if ((tspan.node() as SVGTextContentElement).getComputedTextLength() > width && line.length > 1) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = textSelection.append("tspan").attr("x", 0).attr("dy", `${lineHeight + dy}em`).text(word);
            }
        }
    });
}

function mergeLabels(generated: string[], labels: LegendLabels, domain: any[], range: any[], labelDelimiter: string) {
    if (Array.isArray(labels)) {
        if (!labels.length) return generated;
        return generated.map((label, index) => labels[index] ?? label);
    }
    if (typeof labels === "function") {
        return generated.map((_label, i) => labels({
            i,
            genLength: generated.length,
            generatedLabels: generated,
            domain,
            range,
            labelDelimiter
        }));
    }
    return generated;
}

function calculateType(scale: any, ascending: boolean, cells: any, labels: LegendLabels, labelFormat: (value: any) => string, labelDelimiter: string) {
    let data: any[];
    let generatedLabels: string[];
    let feature: (value: any) => any;

    if (scale.invertExtent) {
        data = scale.range();
        generatedLabels = data.map(value => {
            const extent = scale.invertExtent(value);
            return `${labelFormat(extent[0])} ${labelDelimiter} ${labelFormat(extent[1])}`;
        });
        feature = identity;
    } else if (scale.ticks) {
        const domain = scale.domain();
        if (cells.length > 1) {
            data = cells;
        } else {
            const count = Number(cells);
            const increment = (domain[domain.length - 1] - domain[0]) / (count - 1);
            data = Array.from({ length: count }, (_, index) => domain[0] + index * increment);
        }
        generatedLabels = data.map(labelFormat);
        feature = value => scale(value);
    } else {
        data = scale.domain();
        generatedLabels = [...data];
        feature = value => scale(value);
    }

    const range = scale.range ? scale.range() : scale.domain();
    const mergedLabels = mergeLabels(generatedLabels, labels, scale.domain(), range, labelDelimiter);
    return ascending ? { data: reverse(data), labels: reverse(mergedLabels), feature } : { data, labels: mergedLabels, feature };
}

export function legendColor(): LegendColor {
    let scale: any = scaleLinear();
    let shape = "rect";
    let shapeWidth = 15;
    let shapeHeight = 15;
    let shapeRadius = 10;
    let shapePadding = 2;
    let cells: any = [5];
    let cellFilter: any;
    let labels: LegendLabels = [];
    let classPrefix = "";
    let useClass = false;
    let title = "";
    let locale: any = { format, formatPrefix };
    let specifier: any = formatSpecifier(".01f");
    let labelOffset = 10;
    let labelAlign = "middle";
    let labelDelimiter = "to";
    let labelWrap: number | undefined;
    let orient = "vertical";
    let ascending = false;
    let path: string | undefined;
    let titleWidth: number | undefined;
    const dispatcher = dispatch("cellover", "cellout", "cellclick");

    function legend(svg: any) {
        const type = calculateType(scale, ascending, cells, labels, locale.format(specifier), labelDelimiter);
        if (cellFilter) {
            const filtered = type.data.map((data, i) => ({ data, label: type.labels[i] })).filter(cellFilter);
            type.data = filtered.map(item => item.data);
            type.labels = filtered.map(item => item.label);
        }

        const legendGroups = svg.selectAll(`g.${classPrefix}legendCells`).data([scale]);
        legendGroups.enter().append("g").attr("class", `${classPrefix}legendCells`);

        let cell = svg.select(`.${classPrefix}legendCells`).selectAll(`.${classPrefix}cell`).data(type.data);
        const cellEnter = cell.enter().append("g").attr("class", `${classPrefix}cell`);
        cellEnter.append(shape).attr("class", `${classPrefix}swatch`);
        cellEnter
            .on("mouseover.legend", function (_event, datum) { dispatcher.call("cellover", this, datum); })
            .on("mouseout.legend", function (_event, datum) { dispatcher.call("cellout", this, datum); })
            .on("click.legend", function (_event, datum) { dispatcher.call("cellclick", this, datum); });

        cell.exit().remove();
        cell = cellEnter.merge(cell);

        const shapes = cell.select(`${shape}.${classPrefix}swatch`);
        if (shape === "rect") shapes.attr("height", shapeHeight).attr("width", shapeWidth);
        else if (shape === "circle") shapes.attr("r", shapeRadius);
        else if (shape === "line") shapes.attr("x1", 0).attr("x2", shapeWidth).attr("y1", 0).attr("y2", 0);
        else if (shape === "path") shapes.attr("d", path);

        let text = cell.selectAll(`text.${classPrefix}label`).data((_datum, index) => [type.labels[index]]);
        text = text.enter().append("text").attr("class", `${classPrefix}label`).merge(text).text(identity);
        if (labelWrap) text.call(wrapText, labelWrap);

        const textSize = text.nodes().map(node => node.getBBox());
        const shapeSize = shapes.nodes().map(node => node.getBBox());
        if (!useClass) {
            shapes.style(shape === "line" ? "stroke" : "fill", type.feature);
        } else {
            shapes.attr("class", datum => `${classPrefix}swatch ${type.feature(datum)}`);
        }

        const textAlign = labelAlign === "start" ? 0 : labelAlign === "middle" ? 0.5 : 1;
        if (orient === "vertical") {
            const cellSizes = textSize.map((size, index) => Math.max(size.height, shapeSize[index].height));
            cell.attr("transform", (_datum, index) => `translate(0, ${sum(cellSizes.slice(0, index)) + index * shapePadding})`);
            text.attr("transform", (_datum, index) => `translate(${shapeSize[index].width + shapeSize[index].x + labelOffset}, ${shapeSize[index].y + shapeSize[index].height / 2 + 5})`);
        } else {
            cell.attr("transform", (_datum, index) => `translate(${index * (shapeSize[index].width + shapePadding)},0)`);
            text.attr("transform", (_datum, index) => `translate(${shapeSize[index].width * textAlign + shapeSize[index].x}, ${shapeSize[index].height + shapeSize[index].y + labelOffset + 8})`).style("text-anchor", labelAlign);
        }

        const titleSelection = svg.selectAll(`text.${classPrefix}legendTitle`).data(title ? [title] : []);
        titleSelection.enter().append("text").attr("class", `${classPrefix}legendTitle`).merge(titleSelection).text(identity);
        titleSelection.exit().remove();
        if (title && titleWidth) svg.select(`text.${classPrefix}legendTitle`).call(wrapText, titleWidth);
        if (title) {
            const titleHeight = svg.select(`text.${classPrefix}legendTitle`).node().getBBox().height;
            const cellsNode = svg.select(`.${classPrefix}legendCells`).node();
            svg.select(`.${classPrefix}legendCells`).attr("transform", `translate(${-cellsNode.getBBox().x},${titleHeight})`);
        } else {
            svg.select(`.${classPrefix}legendCells`).attr("transform", null);
        }
    }

    const api = legend as LegendColor;
    const property = (name: string, get: () => any, set: (value: any) => void) => {
        api[name] = function (value?: any) {
            if (!arguments.length) return get();
            set(value);
            return api;
        };
    };
    property("scale", () => scale, value => { scale = value; });
    property("cells", () => cells, value => { if (value.length > 1 || value >= 2) cells = value; });
    property("cellFilter", () => cellFilter, value => { cellFilter = value; });
    api.shape = function (value?: string, shapePath?: string): any {
        if (!arguments.length) return shape;
        if (["rect", "circle", "line"].includes(value!) || value === "path" && typeof shapePath === "string") {
            shape = value!;
            path = shapePath;
        }
        return api;
    } as any;
    property("shapeWidth", () => shapeWidth, value => { shapeWidth = +value; });
    property("shapeHeight", () => shapeHeight, value => { shapeHeight = +value; });
    property("shapeRadius", () => shapeRadius, value => { shapeRadius = +value; });
    property("shapePadding", () => shapePadding, value => { shapePadding = +value; });
    property("labels", () => labels, value => { labels = value; });
    property("labelAlign", () => labelAlign, value => { if (["start", "middle", "end"].includes(value)) labelAlign = value; });
    property("locale", () => locale, value => { locale = formatLocale(value); });
    api.labelFormat = function (value?: string): any {
        if (!arguments.length) return locale.format(specifier);
        specifier = formatSpecifier(value!);
        return api;
    } as any;
    property("labelOffset", () => labelOffset, value => { labelOffset = +value; });
    property("labelDelimiter", () => labelDelimiter, value => { labelDelimiter = value; });
    property("labelWrap", () => labelWrap, value => { labelWrap = value; });
    property("useClass", () => useClass, value => { if (typeof value === "boolean") useClass = value; });
    property("orient", () => orient, value => { const normalized = value.toLowerCase(); if (["horizontal", "vertical"].includes(normalized)) orient = normalized; });
    property("ascending", () => ascending, value => { ascending = !!value; });
    property("classPrefix", () => classPrefix, value => { classPrefix = value; });
    property("title", () => title, value => { title = value; });
    property("titleWidth", () => titleWidth, value => { titleWidth = value; });
    api.on = function (...args: any[]): any {
        const value = (dispatcher.on as any)(...args);
        return value === dispatcher ? api : value;
    };
    return api;
}

export const legendHelpers = {
    defaultLocale: { format, formatPrefix },
    defaultFormatSpecifier: ".01f",
    defaultDelimiter: "to"
};

export default { legendColor, legendHelpers };
