import { dispatch } from "d3-dispatch";
import { select } from "d3-selection";

export interface AnnotationNote {
    title?: string;
    label?: string;
    align?: "left" | "middle" | "right" | "dynamic";
    orientation?: "topBottom" | "top" | "bottom" | "leftRight" | "left" | "right";
    lineType?: string;
    padding?: number;
    wrap?: number;
    wrapSplitter?: RegExp;
    bgPadding?: number | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
}

export interface AnnotationDatum {
    x?: number;
    y?: number;
    nx?: number;
    ny?: number;
    dx?: number;
    dy?: number;
    color?: string;
    data?: unknown;
    type?: AnnotationTypeConstructor;
    subject?: Record<string, any>;
    connector?: Record<string, any>;
    note?: AnnotationNote;
    disable?: string[];
    id?: string;
    className?: string;
}

interface AnnotationTypeSettings {
    className?: string;
    subject?: Record<string, any>;
    connector?: Record<string, any>;
    note?: Record<string, any>;
    disable?: string[];
}

export class AnnotationTypeBase {
    static typeSettings: AnnotationTypeSettings = {};
}

export type AnnotationTypeConstructor = typeof AnnotationTypeBase;

function defineType(base: AnnotationTypeConstructor, settings: AnnotationTypeSettings): AnnotationTypeConstructor {
    return class extends base {
        static typeSettings = {
            ...base.typeSettings,
            ...settings,
            subject: { ...base.typeSettings.subject, ...settings.subject },
            connector: { ...base.typeSettings.connector, ...settings.connector },
            note: { ...base.typeSettings.note, ...settings.note },
            disable: [...(base.typeSettings.disable || []), ...(settings.disable || [])]
        };
    };
}

export const annotationLabel = defineType(AnnotationTypeBase, { className: "label", note: { align: "middle" } });
export const annotationCallout = defineType(AnnotationTypeBase, { className: "callout", note: { lineType: "horizontal" } });
export const annotationCalloutElbow = defineType(annotationCallout, { className: "callout elbow", connector: { type: "elbow" } });
export const annotationCalloutCurve = defineType(annotationCallout, { className: "callout curve", connector: { type: "curve" } });
export const annotationCalloutCircle = defineType(annotationCalloutElbow, { className: "callout circle", subject: { type: "circle" } });
export const annotationCalloutRect = defineType(annotationCalloutElbow, { className: "callout rect", subject: { type: "rect" } });
export const annotationXYThreshold = defineType(annotationCallout, { className: "callout xythreshold", subject: { type: "threshold" } });
export const annotationBadge = defineType(AnnotationTypeBase, { className: "badge", subject: { type: "badge" }, disable: ["connector", "note"] });

export function annotationCustomType(initialType: AnnotationTypeConstructor, typeSettings: AnnotationTypeSettings, init?: (annotation: AnnotationDatum, accessors: AnnotationAccessors) => AnnotationDatum) {
    const CustomType = defineType(initialType, typeSettings);
    if (init) (CustomType as any).init = init;
    return CustomType;
}

export interface AnnotationAccessors {
    x?: (data: any) => number;
    y?: (data: any) => number;
    [key: string]: ((data: any) => any) | undefined;
}

export interface AnnotationGenerator {
    (selection: any): void;
    annotations(): AnnotationDatum[];
    annotations(_: AnnotationDatum[]): this;
    type(): AnnotationTypeConstructor;
    type(_: AnnotationTypeConstructor, settings?: Partial<AnnotationDatum>): this;
    accessors(): AnnotationAccessors;
    accessors(_: AnnotationAccessors): this;
    accessorsInverse(): AnnotationAccessors;
    accessorsInverse(_: AnnotationAccessors): this;
    disable(): string[];
    disable(_: string[]): this;
    textWrap(): number | undefined;
    textWrap(_: number | undefined): this;
    notePadding(): number | undefined;
    notePadding(_: number | undefined): this;
    ids(): ((annotation: AnnotationDatum) => string) | undefined;
    ids(_: ((annotation: AnnotationDatum) => string) | undefined): this;
    editMode(): boolean;
    editMode(_: boolean): this;
    context(): unknown;
    context(_: unknown): this;
    collection(): AnnotationDatum[];
    collection(_: AnnotationDatum[]): this;
    update(): this;
    updateText(): this;
    updatedAccessors(): this;
    on(typename: string): ((...args: any[]) => void) | undefined;
    on(typename: string, callback: (...args: any[]) => void): this;
}

function getTypeSettings(type: AnnotationTypeConstructor): AnnotationTypeSettings {
    return type.typeSettings || {};
}

function textBBox(textNode: SVGTextElement | null) {
    if (!textNode) return { x: 0, y: 0, width: 0, height: 0 };
    return textNode.getBBox();
}

function wrapText(text: any, width: number, splitter?: RegExp) {
    text.each(function () {
        const node = this as SVGTextElement;
        const words = (node.textContent || "").split(splitter || /[ \t\r\n]+/).filter(Boolean);
        node.textContent = "";
        let line: string[] = [];
        let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttribute("x", "0");
        tspan.setAttribute("dy", ".8em");
        node.appendChild(tspan);
        for (const word of words) {
            line.push(word);
            tspan.textContent = line.join(" ");
            if (tspan.getComputedTextLength() > width && line.length > 1) {
                line.pop();
                tspan.textContent = line.join(" ");
                line = [word];
                tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                tspan.setAttribute("x", "0");
                tspan.setAttribute("dy", "1.2em");
                tspan.textContent = word;
                node.appendChild(tspan);
            }
        }
    });
}

function elbowPath(dx: number, dy: number) {
    const opposite = dy < 0 && dx > 0 || dx < 0 && dy > 0 ? -1 : 1;
    if (Math.abs(dx) < Math.abs(dy)) {
        return `M0,0L${dx},${dx * opposite}L${dx},${dy}`;
    }
    return `M0,0L${dy * opposite},${dy}L${dx},${dy}`;
}

function renderSubject(group: any, annotation: AnnotationDatum, settings: AnnotationTypeSettings) {
    const subject = { ...settings.subject, ...annotation.subject };
    const type = subject.type;
    const disabled = [...(settings.disable || []), ...(annotation.disable || [])].includes("subject");
    group.selectAll("*").remove();
    if (disabled || !type) return;
    if (type === "circle") {
        group.append("circle").attr("class", "subject").attr("r", subject.outerRadius || subject.radius || 20);
    } else if (type === "rect") {
        group.append("rect").attr("class", "subject").attr("width", subject.width || 0).attr("height", subject.height || 0);
    } else if (type === "threshold") {
        group.append("path").attr("class", "subject").attr("d", `M${subject.x1 || 0},${subject.y1 || 0}L${subject.x2 || 0},${subject.y2 || 0}`);
    } else if (type === "badge") {
        group.append("circle").attr("class", "subject").attr("r", subject.radius || 14);
        if (subject.text) group.append("text").attr("class", "badge-text").attr("text-anchor", "middle").attr("dy", ".35em").text(subject.text);
    }
    group.selectAll(".subject").attr("fill", "none").attr("stroke", annotation.color || "grey");
}

function renderConnector(group: any, annotation: AnnotationDatum, settings: AnnotationTypeSettings) {
    const connector = { ...settings.connector, ...annotation.connector };
    const disabled = [...(settings.disable || []), ...(annotation.disable || [])].includes("connector");
    group.selectAll("*").remove();
    if (disabled) return;
    const dx = annotation.dx || 0;
    const dy = annotation.dy || 0;
    let path = `M0,0L${dx},${dy}`;
    if (connector.type === "elbow") path = elbowPath(dx, dy);
    else if (connector.type === "curve") path = `M0,0Q${dx / 2},${dy},${dx},${dy}`;
    group.append("path").attr("class", "connector").attr("d", path).attr("fill", "none").attr("stroke", annotation.color || "grey");
}

function renderNote(group: any, annotation: AnnotationDatum, settings: AnnotationTypeSettings, defaultWrap: number, defaultPadding: number) {
    const note = { ...settings.note, ...annotation.note } as AnnotationNote;
    const disabled = [...(settings.disable || []), ...(annotation.disable || [])].includes("note");
    group.selectAll("*").remove();
    if (disabled) return;

    const content = group.append("g").attr("class", "annotation-note-content");
    const background = content.append("rect").attr("class", "annotation-note-bg").attr("fill", "white").attr("fill-opacity", 0);
    if (note.title) content.append("text").attr("class", "annotation-note-title").attr("font-weight", "bold").attr("fill", annotation.color || "grey").text(note.title);
    const label = content.append("text").attr("class", "annotation-note-label").attr("fill", annotation.color || "grey").text(note.label || "");
    wrapText(label, note.wrap || defaultWrap, note.wrapSplitter);

    const labelBox = textBBox(label.node());
    const titleNode = content.select(".annotation-note-title").node() as SVGTextElement | null;
    const titleBox = textBBox(titleNode);
    if (titleNode) titleNode.setAttribute("y", "0");
    label.attr("y", titleBox.height ? titleBox.height * 1.1 : 0);
    const width = Math.max(labelBox.width, titleBox.width);
    const height = labelBox.height + titleBox.height;
    const bgPadding = typeof note.bgPadding === "number" ? note.bgPadding : 0;
    background.attr("x", -bgPadding).attr("y", -bgPadding).attr("width", width + bgPadding * 2).attr("height", height + bgPadding * 2);

    const padding = note.padding ?? defaultPadding;
    const align = note.align || "dynamic";
    const dx = annotation.dx || 0;
    const dy = annotation.dy || 0;
    const resolvedAlign = align === "dynamic" ? dx < 0 ? "right" : "left" : align;
    const x = resolvedAlign === "middle" ? -width / 2 : resolvedAlign === "right" ? -width : 0;
    const y = dy < 0 ? -height - padding : padding;
    content.attr("transform", `translate(${x},${y})`);

    if (note.lineType === "horizontal") {
        group.append("path").attr("class", "note-line").attr("d", `M${x},0L${x + width},0`).attr("fill", "none").attr("stroke", annotation.color || "grey");
    } else if (note.lineType === "vertical") {
        group.append("path").attr("class", "note-line").attr("d", `M0,${y}L0,${y + height}`).attr("fill", "none").attr("stroke", annotation.color || "grey");
    }
}

export function annotation(): AnnotationGenerator {
    let annotations: AnnotationDatum[] = [];
    let type: AnnotationTypeConstructor = annotationCallout;
    let accessors: AnnotationAccessors = {};
    let accessorsInverse: AnnotationAccessors = {};
    let disabled: string[] = [];
    let textWrap = 120;
    let notePadding = 3;
    let ids: ((annotation: AnnotationDatum) => string) | undefined;
    let editMode = false;
    let context: unknown;
    let selection: any;
    const dispatcher = dispatch("subjectover", "subjectout", "subjectclick", "connectorover", "connectorout", "connectorclick", "noteover", "noteout", "noteclick", "dragend", "dragstart");

    function render(target: any) {
        selection = target;
        const translated = annotations.map(source => {
            const result = { ...source, disable: source.disable || disabled };
            if (result.data !== undefined) {
                if (result.x === undefined && accessors.x) result.x = accessors.x(result.data);
                if (result.y === undefined && accessors.y) result.y = accessors.y(result.data);
            }
            if (result.nx !== undefined) result.dx = result.nx - (result.x || 0);
            if (result.ny !== undefined) result.dy = result.ny - (result.y || 0);
            return result;
        });
        let root = target.selectAll("g.annotations").data([translated]);
        root = root.enter().append("g").attr("class", "annotations").merge(root);
        let groups = root.selectAll("g.annotation").data(translated, ids ? ids : (_datum, index) => index);
        groups.exit().remove();
        const enter = groups.enter().append("g").attr("class", "annotation");
        enter.append("g").attr("class", "annotation-connector");
        enter.append("g").attr("class", "annotation-subject");
        enter.append("g").attr("class", "annotation-note");
        groups = enter.merge(groups);

        groups.each(function (datum: AnnotationDatum) {
            const group = select(this);
            const annotationType = datum.type || type;
            const settings = getTypeSettings(annotationType);
            group.attr("class", `annotation ${settings.className || ""} ${editMode ? "editable" : ""} ${datum.className || ""}`.trim()).attr("transform", `translate(${datum.x || 0},${datum.y || 0})`);
            const note = group.select("g.annotation-note").attr("transform", `translate(${datum.dx || 0},${datum.dy || 0})`);
            renderSubject(group.select("g.annotation-subject"), datum, settings);
            renderConnector(group.select("g.annotation-connector"), datum, settings);
            renderNote(note, datum, settings, textWrap, notePadding);
        });
    }

    const api = render as AnnotationGenerator;
    const property = (name: string, get: () => any, set: (value: any) => void) => {
        api[name] = function (value?: any) {
            if (!arguments.length) return get();
            set(value);
            return api;
        };
    };
    property("annotations", () => annotations, value => { annotations = value; });
    api.type = function (value?: AnnotationTypeConstructor, settings?: Partial<AnnotationDatum>): any {
        if (!arguments.length) return type;
        type = settings ? defineType(value!, settings as AnnotationTypeSettings) : value!;
        return api;
    } as any;
    property("accessors", () => accessors, value => { accessors = value; });
    property("accessorsInverse", () => accessorsInverse, value => { accessorsInverse = value; });
    property("disable", () => disabled, value => { disabled = value; });
    property("textWrap", () => textWrap, value => { textWrap = value; });
    property("notePadding", () => notePadding, value => { notePadding = value; });
    property("ids", () => ids, value => { ids = value; });
    property("editMode", () => editMode, value => { editMode = !!value; });
    property("context", () => context, value => { context = value; });
    property("collection", () => annotations, value => { annotations = value; });
    api.update = api.updateText = api.updatedAccessors = function () {
        if (selection) render(selection);
        return api;
    };
    api.on = function (...args: any[]): any {
        const value = (dispatcher.on as any)(...args);
        return value === dispatcher ? api : value;
    };
    return api;
}

export default {
    annotation,
    annotationTypeBase: AnnotationTypeBase,
    annotationLabel,
    annotationCallout,
    annotationCalloutCurve,
    annotationCalloutElbow,
    annotationCalloutCircle,
    annotationCalloutRect,
    annotationXYThreshold,
    annotationBadge,
    annotationCustomType
};
