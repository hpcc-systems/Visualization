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
    databomb?: boolean;
    WUID?: boolean;
    URL?: string;
    filter?: IFilter[];
    outputs: IOutput[];
}

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
    first?: number;
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
export type VisualizationFieldDataType = "bool" | "boolean" | "integer" | "unsigned" | "float" | "double" | "real" | "string" | "date" | "time" | "geohash" | "dataset" | "visualization";
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
    title: string;
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

export type PieType = "PIE";
export interface IPieVisualization extends IVisualization {
    type: PieType;
    source: IPieSource;
}

export interface ILineVisualization extends IVisualization {
    source: ILineSource;
}

export type ChoroColor = "default" | "YlGn" | "YlGnBu" | "GnBu" | "BuGn" | "PuBuGn" | "PuBu" | "BuPu" | "RdPu" | "PuRd" | "OrRd" | "YlOrRd" | "YlOrBr" | "Purples" | "Blues" | "Greens" | "Oranges" | "Reds" | "Greys" | "PuOr" | "BrBG" | "PRGn" | "PiYG" | "RdBu" | "RdGy" | "RdYlBu" | "Spectral" | "RdYlGn" | "RdWhGr";
export interface IChoroVisualization extends IVisualization {
    source: IChoroSource;

    visualizations?: IChoroVisualization[];
    color?: ChoroColor;
}

export interface ITableVisualization extends IVisualization {
    label: string[];
    source: ITableSource;
}

export interface ISliderVisualization extends IVisualization {
    range?: number[];
}

export interface IVisualizationIcon {
    faChar: string;
    fieldid?: string;
    valuemappings?: StringStringDict;
}

export interface IGraphVisualization extends IVisualization {
    source: IGraphSource;

    label: string[];
    icon: IVisualizationIcon;
    flag: IVisualizationIcon[];
}

export interface IHeatMapVisualization extends IVisualization {
    source: IHeatMapSource;
}

export interface IFormVisualization extends IVisualization {
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
    datasources: IDatasource[];
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
export type IAnyVisualization = IPieVisualization | ILineVisualization | ITableVisualization | IChoroVisualization | IGraphVisualization | IHeatMapVisualization | IFormVisualization;
