import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

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
        pod = "pod"
    }

    export enum LogColumnValueType {
        string = "string",
        numeric = "numeric",
        datetime = "datetime",
        enum = "enum"
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
        ByPod = 8
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
        ByPod = 8
    }

    export enum SortDirection {
        ASC = 0,
        DSC = 1
    }

    export interface GetLogAccessInfoRequest {

    }

    export interface EnumeratedValues {
        Item: string[];
    }

    export interface Column {
        Name: string;
        LogType: LogColumnType;
        EnumeratedValues: {
            Item: string[];
        };
        ColumnMode: LogSelectColumnMode;
        ColumnType: LogColumnValueType;
    }

    export interface Columns {
        Column: Column[];
    }

    export interface GetLogAccessInfoResponse {
        Columns: {
            Column: Column[];
        };
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
        leftFilter: leftFilter;
        leftBinaryFilter: leftBinaryFilter;
        Operator: LogAccessFilterOperator;
        rightFilter: rightFilter;
        rightBinaryFilter: rightBinaryFilter;
    }

    export interface Range {
        StartDate: dateTime;
        EndDate: dateTime;
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
        Filter?: {
            leftFilter?: leftFilter;
            leftBinaryFilter?: leftBinaryFilter;
            Operator?: LogAccessFilterOperator;
            rightFilter?: rightFilter;
            rightBinaryFilter?: rightBinaryFilter;
        };
        Range?: {
            StartDate?: dateTime;
            EndDate?: dateTime;
        };
        LogLineLimit?: unsignedInt;
        LogLineStartFrom?: long;
        SelectColumnMode?: LogSelectColumnMode;
        Columns?: Columns;
        Format?: string;
        SortBy?: {
            SortCondition?: SortCondition[];
        };
    }

    export interface GetLogsResponse {
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
        super(optsConnection, "ws_logaccess", "1.05");
    }

    GetLogAccessInfo(request: WsLogaccess.GetLogAccessInfoRequest): Promise<WsLogaccess.GetLogAccessInfoResponse> {
        return this._connection.send("GetLogAccessInfo", request, "json", false, undefined, "GetLogAccessInfoResponse");
    }

    GetLogs(request: WsLogaccess.GetLogsRequest): Promise<WsLogaccess.GetLogsResponse> {
        return this._connection.send("GetLogs", request, "json", false, undefined, "GetLogsResponse");
    }

    Ping(request: WsLogaccess.ws_logaccessPingRequest): Promise<WsLogaccess.ws_logaccessPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "ws_logaccessPingResponse");
    }

}
