export type StringStringDict = { [key: string]: string; };

//  Datasource  ===============================================================
export type IFilterRule = "==" | "!=" | "<" | "<=" | ">" | ">=" | "set" | "notequals";
export interface IFilter {
    fieldid: string;
    nullable: boolean;
    rule: IFilterRule;
    minid?: string;
    maxid?: string;
}

export interface IOutput {
    id: string;
    from: string;
    filter?: IFilter[];
    notify?: string[];
}

export interface IDatasource {
    id: string;
    filter?: IFilter[];
    outputs: IOutput[];
}

export interface IWorkunitDatasource extends IDatasource {
    WUID: boolean;
}
export function isWorkunitDatasource(ref: IAnyDatasource): ref is IWorkunitDatasource {
    return (ref as IWorkunitDatasource).WUID !== undefined;
}

export interface IDatabombDatasource extends IDatasource {
    databomb: true;
}
export function isDatabombDatasource(ref: IAnyDatasource): ref is IDatabombDatasource {
    return (ref as IDatabombDatasource).databomb === true;
}

export interface IHipieDatasource extends IDatasource {
    URL: string;
}
export function isHipieDatasource(ref: IAnyDatasource): ref is IHipieDatasource {
    return (ref as IHipieDatasource).URL !== undefined;
}

export type IAnyDatasource = IWorkunitDatasource | IDatabombDatasource | IHipieDatasource;
//  Event  ====================================================================
export interface IEventUpdate {
    visualization: string;
    instance?: string;
    datasource: string;
    col?: string;
    merge: boolean;
    mappings?: StringStringDict;
}

export interface IEvent {
    mappings?: StringStringDict;  // Legacy
    updates: IEventUpdate[];
}

//  Mappings  =================================================================
export interface IPieMapping {
    label: string;
    weight: string;
}

export interface ILineMapping {
    x: string[];
    y: string[];
}

export interface ITableMapping {
    value: string[];
}

export interface IChoroMapping {
    weight: string | string[];
}

export interface IChoroUSStateMapping extends IChoroMapping {
    state: string;
}

export interface IChoroUSCountyMapping extends IChoroMapping {
    county: string;
}

export interface IChoroGeohashMapping extends IChoroMapping {
    geohash: string;
}

export interface IGraphMapping {
    uid: string;
    label: string;
    weight: string;
    flags: string;
}

export interface IGraphLinkMapping {
    uid: string;
}

export interface IHeatMapMapping {
    x: string;
    y: string;
    weight: string;
}

//  Source  ===================================================================
export interface ISource {
    id: string;
    output: string;
    sort?: string[];
    first?: string | number;
    reverse?: boolean;
    properties?: StringStringDict;  //  TODO Needed?
}

export interface IPieSource extends ISource {
    mappings: IPieMapping;
}

export interface ILineSource extends ISource {
    mappings: ILineMapping;
}

export interface ITableSource extends ISource {
    mappings: ITableMapping;
}

export interface IGraphLink {
    mappings: IGraphLinkMapping;
    childfile: string;
}

export interface IGraphSource extends ISource {
    mappings: IGraphMapping;
    link: IGraphLink;
}

export interface IHeatMapSource extends ISource {
    mappings: IHeatMapMapping;
}

export interface IChoroSource extends ISource {
    mappings: IAnyChoroMapping;
}

//  Visualization  ============================================================
export type VisualizationType = "PIE" | "LINE" | "BAR" | "TABLE" | "CHORO" | "GRAPH" | "HEAT_MAP" | "SLIDER" | "FORM" | "2DCHART" | "WORD_CLOUD" | "BUBBLE";
export type VisualizationFieldDataType = "bool" | "boolean" | "integer" | "integer4" | "integer8" | "unsigned" | "unsigned4" | "unsigned8" | "float" | "double" | "real" | "real4" | "real8" | "string" | "date" | "time" | "geohash" | "dataset" | "visualization";
export type VisualizationFieldType = VisualizationFieldDataType | "range";
export type VisualizationFieldFuncitonType = "SUM" | "AVE" | "MIN" | "MAX" | "SCALE";

export interface IVisualizationField {
    id: string;
    properties: {
        label?: string;
        datatype: VisualizationFieldDataType;
        default?: any[];
        function?: VisualizationFieldFuncitonType;
        params?: {
            param1: string;
            param2: string;
        }
        type: VisualizationFieldType;
    };
}

export interface IVisualization {
    id: string;
    title?: string;
    type: VisualizationType;
    fields?: IVisualizationField[];
    properties?: {
        charttype?: string,

        //  TODO Split Known Properties  ---
        [key: string]: any
    };
    events?: { [key: string]: IEvent };
    onSelect?: any;  // legacy
    color?: any; // legacy
}

export interface IPieVisualization extends IVisualization {
    type: "PIE" | "BAR";
    source: IPieSource;
}
export function isPieVisualization(viz: IAnyVisualization): viz is IPieVisualization {
    return (viz as IPieVisualization).type === "PIE" || (viz as IPieVisualization).type === "BAR";
}

export interface ILineVisualization extends IVisualization {
    type: "LINE";
    source: ILineSource;
}
export function isLineVisualization(viz: IAnyVisualization): viz is ILineVisualization {
    return (viz as ILineVisualization).type === "LINE";
}

export type ChoroColor = "default" | "YlGn" | "YlGnBu" | "GnBu" | "BuGn" | "PuBuGn" | "PuBu" | "BuPu" | "RdPu" | "PuRd" | "OrRd" | "YlOrRd" | "YlOrBr" | "Purples" | "Blues" | "Greens" | "Oranges" | "Reds" | "Greys" | "PuOr" | "BrBG" | "PRGn" | "PiYG" | "RdBu" | "RdGy" | "RdYlBu" | "Spectral" | "RdYlGn" | "RdWhGr";
export interface IChoroVisualization extends IVisualization {
    type: "CHORO";
    source: IChoroSource;

    visualizations?: IChoroVisualization[];
    color?: ChoroColor;
}
export function isChoroVisualization(viz: IAnyVisualization): viz is IChoroVisualization {
    return (viz as IChoroVisualization).type === "CHORO";
}

export interface ITableVisualization extends IVisualization {
    type: "TABLE";
    label: string[];
    source: ITableSource;
}
export function isTableVisualization(viz: IAnyVisualization): viz is ITableVisualization {
    return (viz as ITableVisualization).type === "TABLE";
}

export interface ISliderVisualization extends IVisualization {
    type: "SLIDER";
    range?: number[];
}
export function isSliderVisualization(viz: IAnyVisualization): viz is ISliderVisualization {
    return (viz as ISliderVisualization).type === "SLIDER";
}

export interface IIcon {
    [id: string]: string | number | boolean;
}

export type IValueMappings = { [key: string]: IIcon; };

export interface IVisualizationIcon {
    fieldid: string;
    faChar?: string;
    valuemappings?: IValueMappings;
}

export interface IGraphVisualization extends IVisualization {
    type: "GRAPH";
    source: IGraphSource;

    label: string[];
    icon: IVisualizationIcon;
    flag: IVisualizationIcon[];
}
export function isGraphVisualization(viz: IAnyVisualization): viz is IGraphVisualization {
    return (viz as IGraphVisualization).type === "GRAPH";
}

export interface IHeatMapVisualization extends IVisualization {
    type: "HEAT_MAP";
    source: IHeatMapSource;
}
export function isHeatMapVisualization(viz: IAnyVisualization): viz is IHeatMapVisualization {
    return (viz as IHeatMapVisualization).type === "HEAT_MAP";
}

export interface IFormVisualization extends IVisualization {
    type: "FORM";
}
export function isFormVisualization(viz: IAnyVisualization): viz is IFormVisualization {
    return (viz as IFormVisualization).type === "FORM";
}

//  Dashboard  ================================================================
export interface IDashboard {
    id?: string;
    title?: string;
    enable?: string;
    label?: string;
    primary?: boolean;
    visualizations: IAnyVisualization[];
}

export interface IDDL {
    dashboards: IDashboard[];
    datasources: IAnyDatasource[];
    hipieversion: string;
    visualizationversion: string;
}

//  DDL  ======================================================================
export type DDLSchema = IDDL;

//  Helpers  ==================================================================
export type IAnyChoroMapping = IChoroUSStateMapping | IChoroUSCountyMapping | IChoroGeohashMapping;
export function isUSStateMapping(mappings: IAnyChoroMapping) {
    return (mappings as IChoroUSStateMapping).state !== undefined;
}
export function isUSCountyMapping(mappings: IAnyChoroMapping) {
    return (mappings as IChoroUSCountyMapping).county !== undefined;
}
export function isGeohashMapping(mappings: IAnyChoroMapping) {
    return (mappings as IChoroGeohashMapping).geohash !== undefined;
}
export type IAnyMapping = IPieMapping | ILineMapping | IGraphMapping | IAnyChoroMapping | ITableMapping | IHeatMapMapping;
export type IAnySource = IPieSource | ILineSource | ITableSource | IChoroSource | IGraphSource | IHeatMapSource;
export type IAnyVisualization = IPieVisualization | ILineVisualization | ITableVisualization | IChoroVisualization | IGraphVisualization | IHeatMapVisualization | ISliderVisualization | IFormVisualization;
