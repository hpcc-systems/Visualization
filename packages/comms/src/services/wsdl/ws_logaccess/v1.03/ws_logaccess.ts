import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsLogaccess {

    export type dateTime = string;
    export type unsignedInt = number;
    export type long = number;

    export enum LogAccessType {
        All = 0,
        ByJobID = 1,
        ByComponent = 2,
        ByLogType = 3,
        ByTargetAudience = 4,
        BySourceInstance = 5,
        BySourceNode = 6,
        ByFieldName = 7
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
        ByFieldName = 7
    }

    export enum SortDirection {
        ASC = 0,
        DSC = 1
    }

    export interface GetLogAccessInfoRequest {

    }

    export interface GetLogAccessInfoResponse {
        RemoteLogManagerType: string;
        RemoteLogManagerConnectionString: string;
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
        leftFilter: {
            LogCategory: LogAccessType;
            SearchByValue: string;
            SearchField: string;
        };
        leftBinaryFilter: {
            BinaryLogFilter: BinaryLogFilter[];
        };
        Operator: LogAccessFilterOperator;
        rightFilter: rightFilter;
        rightBinaryFilter: rightBinaryFilter;
    }

    export interface Range {
        StartDate: dateTime;
        EndDate: dateTime;
    }

    export interface Columns {
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
        Filter?: {
            leftFilter?: {
                LogCategory?: LogAccessType;
                SearchByValue?: string;
                SearchField?: string;
            };
            leftBinaryFilter?: {
                BinaryLogFilter?: BinaryLogFilter[];
            };
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
        Columns?: {
            Item?: string[];
        };
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
        super(optsConnection, "ws_logaccess", "1.03");
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
