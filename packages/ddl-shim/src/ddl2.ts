export type RowType = { [key: string]: any; };

//  Datasources  ==============================================================
export type IDatasourceType = "wuresult" | "logicalfile" | "form" | "databomb" | "roxieservice" | "hipieservice";
export type DatasourceType = IWUResult | ILogicalFile | IForm | IDatabomb | IRoxieService | IHipieService;

export interface IField {
    id: string;
    type: string;
    default: any;
    children?: IField[];
}

export interface IDatasource {
    type: IDatasourceType;
    id: string;
    fields: IField[];
}

export interface IDatasourceRef {
    id: string;
    fields: IField[];
}

export interface IESPService extends IDatasource {
    url: string;
}

export interface IWUResult extends IESPService {
    type: "wuresult";
    wuid: string;
    resultName: string;
}

export interface ILogicalFile extends IESPService {
    type: "logicalfile";
    logicalFile: string;
}

export interface IRoxieService extends IESPService {
    type: "roxieservice";
    querySet: string;
    queryID: string;
    resultName: string;
}

export interface IRequestField {
    source: string;
    remoteFieldID: string;
    localFieldID: string;
}

export interface IRoxieServiceRef extends IDatasourceRef {
    request: IRequestField[];
}

export function isIRoxieServiceRef(ref: IDatasourceRef | IRoxieServiceRef): ref is IRoxieServiceRef {
    return (ref as IRoxieServiceRef).request !== undefined;
}

export interface IForm extends IDatasource {
    type: "form";
}

export interface IDatabomb extends IDatasource {
    type: "databomb";
}

export interface IHipieService extends IDatasource {
    type: "hipieservice";
}

//  Activities  ===============================================================
export type IActivityType = "filter" | "project" | "groupby" | "sort" | "limit";
export type ActivityType = IFilter | IProject | IGroupBy | ISort | ILimit;

export interface IActivity {
    type: IActivityType;
}

//  Filter  ===================================================================
export type IMappingConditionType = "==" | "!=" | ">" | ">=" | "<" | "<=" | "contains";
export interface IMapping {
    remoteFieldID: string;
    localFieldID: string;
    condition: IMappingConditionType;
}

export interface IFilterCondition {
    viewID: string;
    nullable: boolean;
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
export interface IScale {
    fieldID: string;
    type: "scale";
    param1: string;
    factor: number;
}

export interface ICalculated {
    fieldID: string;
    type: "=" | "+" | "-" | "*" | "/";
    param1: string;
    param2: string;
}

export type TransformationType = IScale | ICalculated;

export interface IProject extends IActivity {
    type: "project";
    transformations: TransformationType[];
}
export function isProjectActivity(activity: IActivity): activity is IProject {
    return activity.type === "project";
}

//  GroupBy  ==================================================================
export interface IAggregate {
    label: string;
    type: "min" | "max" | "sum" | "mean" | "variance" | "deviation";
    fieldID: string;
}

export interface ICount {
    label: string;
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
    activities: IActivity[];
}

//  DDL  ======================================================================
export interface Schema {
    datasources: DatasourceType[];
    dataviews: IView[];
}
