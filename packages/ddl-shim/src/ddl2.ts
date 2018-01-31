export type RowType = { [key: string]: any; };

//  Datasources  ==============================================================
export type IServiceType = "wuresult" | "hipie" | "roxie";
export type IDatasourceType = IServiceType | "logicalfile" | "form" | "databomb";
export type DatasourceType = ILogicalFile | IForm | IDatabomb | IWUResult | IHipieService | IRoxieService;
export type FieldType = IPrimativeField | IRangeField | IDatasetField;

export interface IPrimativeField {
    id: string;
    type: "string" | "number" | "boolean";
    default: string | number | boolean;
}

export interface IRangeField {
    id: string;
    type: "range";
    default: [any, any];
}

export interface IDatasetField {
    id: string;
    type: "dataset";
    default: FieldType[];
}

export interface IDatasource {
    type: IDatasourceType;
    id: string;
    fields: FieldType[];
}

export interface IDatasourceRef {
    id: string;
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
    fields: FieldType[];
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
    inputs: FieldType[];
    outputs: OutputDict;
}

export interface IHipieService extends IService {
    type: "hipie";
    querySet: string;
    queryID: string;
    inputs: FieldType[];
    outputs: OutputDict;
}

export interface IRequestField {
    source: string;
    remoteFieldID: string;
    localFieldID: string;
}

export interface IWUResultRef extends IDatasourceRef {
    output: string;
}

export function isWUResultRef(ref: IDatasourceRef | IWUResultRef | IRoxieServiceRef): ref is IWUResultRef {
    return (ref as IWUResultRef).output !== undefined && (ref as IRoxieServiceRef).request === undefined;
}

export interface IRoxieServiceRef extends IDatasourceRef {
    request: IRequestField[];
    output: string;
}

export function isRoxieServiceRef(ref: IDatasourceRef | IWUResultRef | IRoxieServiceRef): ref is IRoxieServiceRef {
    return (ref as IRoxieServiceRef).request !== undefined;
}

export interface IForm extends IDatasource {
    type: "form";
}

export interface IDatabomb extends IDatasource {
    type: "databomb";
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
export type ICalculatedType = "=" | "+" | "-" | "*" | "/";
export interface ICalculated {
    fieldID: string;
    type: ICalculatedType;
    param1: string;
    param2: string | undefined;
}

export interface IScale {
    fieldID: string;
    type: "scale";
    param1: string;
    factor: number;
}

export interface ITemplate {
    fieldID: string;
    type: "template";
    template: string;
}

export type TransformationType = ICalculated | IScale | ITemplate;

export interface IProject extends IActivity {
    type: "project";
    transformations: TransformationType[];
}
export function isProjectActivity(activity: IActivity): activity is IProject {
    return activity.type === "project";
}
export interface IMappings extends IActivity {
    type: "mappings";
    transformations: TransformationType[];
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
    baseCountFieldID: string;
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

//  View  =====================================================================
export interface IView {
    id: string;
    datasource: IDatasourceRef | IRoxieServiceRef;
    activities: ActivityType[];
}

//  DDL  ======================================================================
export interface Schema {
    version: "0.0.19";
    datasources: DatasourceType[];
    dataviews: IView[];
}
