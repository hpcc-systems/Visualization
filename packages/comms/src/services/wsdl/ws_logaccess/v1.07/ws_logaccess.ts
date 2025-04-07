import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

export namespace WsLogaccess {

    export type dateTime = string;
    export type unsignedInt = number;
    export type long = number;

    export enum LogColumnType {
        global = "global",
        workunits = "workunits",
        components = "components",
        audience = "audience",
        class = "class",
        instance = "instance",
        node = "node",
        message = "message",
        logid = "logid",
        processid = "processid",
        threadid = "threadid",
        timestamp = "timestamp",
        pod = "pod",
        traceid = "traceid",
        spanid = "spanid"
    }

    export enum LogColumnValueType {
        string = "string",
        numeric = "numeric",
        datetime = "datetime",
        enum = "enum",
        epoch = "epoch"
    }

    export enum LogAccessType {
        All = 0,
        ByJobID = 1,
        ByComponent = 2,
        ByLogType = 3,
        ByTargetAudience = 4,
        BySourceInstance = 5,
        BySourceNode = 6,
        ByFieldName = 7,
        ByPod = 8,
        ByTraceID = 9,
        BySpanID = 10
    }

    export enum LogAccessStatusCode {
        Success = 0,
        Warning = 1,
        Fail = 2
    }

    export enum LogAccessFilterOperator {
        NONE = 0,
        AND = 1,
        OR = 2
    }

    export enum LogSelectColumnMode {
        MIN = 0,
        DEFAULT = 1,
        ALL = 2,
        CUSTOM = 3
    }

    export enum SortColumType {
        ByDate = 0,
        ByJobID = 1,
        ByComponent = 2,
        ByLogType = 3,
        ByTargetAudience = 4,
        BySourceInstance = 5,
        BySourceNode = 6,
        ByFieldName = 7,
        ByPod = 8,
        ByTraceID = 9,
        BySpanID = 10
    }

    export enum SortDirection {
        ASC = 0,
        DSC = 1
    }

    export interface GetHealthReportRequest {
        IncludeConfiguration?: boolean;
        IncludeDebugReport?: boolean;
        IncludeSampleQuery?: boolean;
    }

    export interface Exception {
        Code: string;
        Audience: string;
        Source: string;
        Message: string;
    }

    export interface Exceptions {
        Source: string;
        Exception: Exception[];
    }

    export interface Messages {
        Item: string[];
    }

    export interface Status {
        Code: LogAccessStatusCode;
        Messages: Messages;
    }

    export interface DebugReport {
        SampleQueryReport: string;
        PluginDebugReport: string;
        ServerDebugReport: string;
    }

    export interface GetHealthReportResponse {
        Exceptions: Exceptions;
        Status: Status;
        DebugReport: DebugReport;
        Configuration: string;
    }

    export interface GetLogAccessInfoRequest {

    }

    export interface EnumeratedValues {
        Item: string[];
    }

    export interface Column {
        Name: string;
        LogType: LogColumnType;
        EnumeratedValues: EnumeratedValues;
        ColumnMode: LogSelectColumnMode;
        ColumnType: LogColumnValueType;
    }

    export interface Columns {
        Column: Column[];
    }

    export interface GetLogAccessInfoResponse {
        Exceptions: Exceptions;
        Columns: Columns;
        RemoteLogManagerType: string;
        RemoteLogManagerConnectionString: string;
        SupportsResultPaging: boolean;
    }

    export interface leftFilter {
        LogCategory: LogAccessType;
        SearchByValue: string;
        SearchField: string;
    }

    export interface rightFilter {
        LogCategory: LogAccessType;
        SearchByValue: string;
        SearchField: string;
    }

    export interface rightBinaryFilter {
        BinaryLogFilter: BinaryLogFilter[];
    }

    export interface BinaryLogFilter {
        leftFilter: leftFilter;
        leftBinaryFilter: leftBinaryFilter;
        Operator: LogAccessFilterOperator;
        rightFilter: {
            LogCategory: LogAccessType;
            SearchByValue: string;
            SearchField: string;
        };
        rightBinaryFilter: {
            BinaryLogFilter: BinaryLogFilter[];
        };
    }

    export interface leftBinaryFilter {
        BinaryLogFilter: BinaryLogFilter[];
    }

    export interface Filter {
        leftFilter?: leftFilter;
        leftBinaryFilter?: leftBinaryFilter;
        Operator?: LogAccessFilterOperator;
        rightFilter?: rightFilter;
        rightBinaryFilter?: rightBinaryFilter;
    }

    export interface Range {
        StartDate?: dateTime;
        EndDate?: dateTime;
    }

    export interface Columns2 {
        Item: string[];
    }

    export interface SortCondition {
        BySortType: SortColumType;
        ColumnName: string;
        Direction: SortDirection;
    }

    export interface SortBy {
        SortCondition: SortCondition[];
    }

    export interface GetLogsRequest {
        Filter?: Filter;
        Range?: Range;
        LogLineLimit?: unsignedInt;
        LogLineStartFrom?: long;
        SelectColumnMode?: LogSelectColumnMode;
        Columns?: Columns2;
        Format?: string;
        SortBy?: SortBy;
    }

    export interface GetLogsResponse {
        Exceptions: Exceptions;
        LogLines: string;
        LogLineCount: unsignedInt;
        TotalLogLinesAvailable: unsignedInt;
    }

    export interface ws_logaccessPingRequest {

    }

    export interface ws_logaccessPingResponse {

    }

}

export class LogaccessServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "ws_logaccess", "1.07");
    }

    GetHealthReport(request: Partial<WsLogaccess.GetHealthReportRequest>): Promise<WsLogaccess.GetHealthReportResponse> {
        return this._connection.send("GetHealthReport", request, "json", false, undefined, "GetHealthReportResponse");
    }

    GetLogAccessInfo(request: Partial<WsLogaccess.GetLogAccessInfoRequest>): Promise<WsLogaccess.GetLogAccessInfoResponse> {
        return this._connection.send("GetLogAccessInfo", request, "json", false, undefined, "GetLogAccessInfoResponse");
    }

    GetLogs(request: Partial<WsLogaccess.GetLogsRequest>): Promise<WsLogaccess.GetLogsResponse> {
        return this._connection.send("GetLogs", request, "json", false, undefined, "GetLogsResponse");
    }

    Ping(request: Partial<WsLogaccess.ws_logaccessPingRequest>): Promise<WsLogaccess.ws_logaccessPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "ws_logaccessPingResponse");
    }

}
