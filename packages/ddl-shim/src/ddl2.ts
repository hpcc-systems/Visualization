export type RowType = { [key: string]: any; };

//  Datasources  ==============================================================
export type IServiceType = "wuresult" | "hipie" | "roxie";
export type IDatasourceType = IServiceType | "logicalfile" | "form" | "databomb";
export type DatasourceType = ILogicalFile | IForm | IDatabomb | IWUResult | IHipieService | IRoxieService;

export type IPrimative = boolean | number | string;
export type IRange = [undefined | IPrimative, undefined | IPrimative];
export type IFieldType = "boolean" | "number" | "number64" | "string" | "range" | "dataset" | "object";
export interface IField {
    id: string;
    type: IFieldType;
    default?: IPrimative | IRange | IField[];
    children?: IField[];
}

export interface IDatasource {
    type: IDatasourceType;
    id: string;
    fields: IField[];
}

export interface IESPService extends IDatasource {
    url: string;
}

export interface IService {
    type: IServiceType;
    id: string;
    url: string;
}

export interface IOutput {
    fields: IField[];
}

export type OutputDict = { [key: string]: IOutput };

export interface IWUResult extends IService {
    type: "wuresult";
    wuid: string;
    outputs: OutputDict;
}

export interface ILogicalFile extends IESPService {
    type: "logicalfile";
    logicalFile: string;
}

export interface IRoxieService extends IService {
    type: "roxie";
    querySet: string;
    queryID: string;
    inputs: IField[];
    outputs: OutputDict;
}

export interface IHipieService extends IService {
    type: "hipie";
    querySet: string;
    queryID: string;
    inputs: IField[];
    outputs: OutputDict;
}

export interface IForm extends IDatasource {
    type: "form";
}

export type IDatabombFormat = "csv" | "tsv" | "json";
export interface IDatabomb extends IDatasource {
    type: "databomb";
    format: IDatabombFormat;
    payload?: string;
}

//  IDatasorceRef  ---
export interface IDatasourceBaseRef {
    id: string;
}

export interface IDatabombRef extends IDatasourceBaseRef {
}

export interface IWUResultRef extends IDatasourceBaseRef {
    output: string;
}

export interface IRequestField {
    source: string;
    remoteFieldID: string;
    localFieldID: string;
}

export interface IRoxieServiceRef extends IDatasourceBaseRef {
    request: IRequestField[];
    output: string;
}

export type IDatasourceRef = IDatabombRef | IWUResultRef | IRoxieServiceRef;

export function isDatabombRef(ref: IDatasourceRef): ref is IDatabombRef {
    return !isWUResultRef(ref) && !isRoxieServiceRef(ref);
}

export function isWUResultRef(ref: IDatasourceRef): ref is IWUResultRef {
    return (ref as IWUResultRef).output !== undefined && !isRoxieServiceRef(ref);
}

export function isRoxieServiceRef(ref: IDatasourceRef): ref is IRoxieServiceRef {
    return (ref as IRoxieServiceRef).request !== undefined;
}

//  Activities  ===============================================================
export type IActivityType = "filter" | "project" | "groupby" | "sort" | "limit" | "mappings";
export type ActivityType = IFilter | IProject | IGroupBy | ISort | ILimit | IMappings;

export interface IActivity {
    type: IActivityType;
}

//  Filter  ===================================================================
export type IMappingConditionType = "==" | "!=" | ">" | ">=" | "<" | "<=" | "range" | "in";
export interface IMapping {
    remoteFieldID: string;
    localFieldID: string;
    condition: IMappingConditionType;
    nullable: boolean;
}

export interface IFilterCondition {
    viewID: string;
    mappings: IMapping[];
}

export interface IFilter extends IActivity {
    type: "filter";
    conditions: IFilterCondition[];
}
export function isFilterActivity(activity: IActivity): activity is IFilter {
    return activity.type === "filter";
}

//  Project  ==================================================================
export interface IEquals {
    fieldID: string;
    type: "=";
    sourceFieldID: string;
    transformations?: MultiTransformationType[];
}
export type ICalculatedType = "+" | "-" | "*" | "/";
export interface ICalculated {
    fieldID: string;
    type: ICalculatedType;
    sourceFieldID1: string;
    sourceFieldID2: string;
}

export interface IScale {
    fieldID: string;
    type: "scale";
    sourceFieldID: string;
    factor: number;
}

export interface ITemplate {
    fieldID: string;
    type: "template";
    template: string;
}

export interface IMapMapping {
    value: any;
    newValue: any;
}

export interface IMap {
    fieldID: string;
    type: "map";
    sourceFieldID: string;
    default: any;
    mappings: IMapMapping[];
}

export type MultiTransformationType = IEquals | ICalculated | IScale | ITemplate | IMap;
export interface IMulti {
    fieldID: string;
    type: "multi";
    transformations: MultiTransformationType[];
}

export type ProjectTransformationType = MultiTransformationType | IMulti;
export interface IProject extends IActivity {
    type: "project";
    transformations: ProjectTransformationType[];
}
export function isProjectActivity(activity: IActivity): activity is IProject {
    return activity.type === "project";
}
export interface IMappings extends IActivity {
    type: "mappings";
    transformations: ProjectTransformationType[];
}
export function isMappingsActivity(activity: IActivity): activity is IMappings {
    return activity.type === "mappings";
}
//  GroupBy  ==================================================================
export type IAggregateType = "min" | "max" | "sum" | "mean" | "variance" | "deviation";
export interface IAggregate {
    fieldID: string;
    type: IAggregateType;
    inFieldID: string;
    baseCountFieldID?: string;
}

export interface ICount {
    fieldID: string;
    type: "count";
}

export type AggregateType = IAggregate | ICount;

export interface IGroupBy extends IActivity {
    type: "groupby";
    groupByIDs: string[];
    aggregates: AggregateType[];
}
export function isGroupByActivity(activity: IActivity): activity is IGroupBy {
    return activity.type === "groupby";
}

//  Sort  =====================================================================
export interface ISortCondition {
    fieldID: string;
    descending: boolean;
}

export interface ISort extends IActivity {
    type: "sort";
    conditions: ISortCondition[];
}
export function isSortActivity(activity: IActivity): activity is ISort {
    return activity.type === "sort";
}

//  Limit  ====================================================================
export interface ILimit extends IActivity {
    type: "limit";
    limit: number;
}
export function isLimitActivity(activity: IActivity): activity is ILimit {
    return activity.type === "limit";
}

//  Visualization  ============================================================
export type IWidgetProperties = {
    __class?: string;
    [propID: string]: string | string[] | number | boolean | IWidget | IWidget[] | undefined;
};

export interface IWidget {
    id: string;
    chartType: string;
    __class: string;
    properties: IWidgetProperties;
}

export type VisibilityType = "normal" | "flyout";
export const VisibilitySet: VisibilityType[] = ["normal", "flyout"];

export interface IVisualization extends IWidget {
    title: string;
    description: string;
    visibility: VisibilityType;
    mappings: IMappings;
}

//  View  =====================================================================
export interface IView {
    id: string;
    datasource: IDatasourceRef;
    activities: ActivityType[];
    visualization: IVisualization;
}

//  DDL  ======================================================================
export interface Schema {
    version: "0.0.22";
    datasources: DatasourceType[];
    dataviews: IView[];
    properties: IWidgetProperties;

    //  The following defs are only provided to assist the Java code generation (from the the generated schema)  ---
    defs?: {
        fieldTypes: {
            field: IField;
            primative: IPrimative;
            range: IRange;
        };
        datasourceTypes: {
            datasource: IDatasource;
            logicalFile: ILogicalFile;
            form: IForm;
            databomb: IDatabomb;
            wuresult: IWUResult;
            hipieService: IHipieService;
            roxieService: IRoxieService;
        };
        datasourceRefTypes: {
            wuResultRef: IWUResultRef;
            roxieServiceRef: IRoxieServiceRef;
        };
        activityTypes: {
            filter: IFilter;
            project: IProject;
            groupby: IGroupBy;
            sort: ISort;
            limit: ILimit;
            mappings: IMappings;
        };
        aggregateTypes: {
            aggregate: IAggregate;
            count: ICount;
        };
        transformationTypes: {
            equals: IEquals;
            calculated: ICalculated;
            scale: IScale;
            template: ITemplate;
            map: IMap;
            multi: IMulti;
        };
    };
}
