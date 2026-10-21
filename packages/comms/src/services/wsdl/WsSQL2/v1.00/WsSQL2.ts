import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsSQL2 {

    export type double = number;
    export type unsignedInt = number;
    export type long = number;
    export type uint64 = number;

    export interface CloseResultSetRequest {
        CursorId?: string;
    }

    export interface Exception {
        Code?: string;
        Audience?: string;
        Source?: string;
        Message?: string;
    }

    export interface Exceptions {
        Source?: string;
        Exception?: Exception[];
    }

    export interface CloseResultSetResponse {
        Exceptions?: Exceptions;
        Closed?: boolean;
    }

    export interface ExecuteQueryRequest {
        SqlText?: string;
        IncludeRuntimeGraph?: boolean;
        IncludeResultSetMetadata?: boolean;
        IncludeDebug?: boolean;
    }

    export interface Column {
        ColumnLabel?: string;
        ColumnTypeName?: string;
        Precision?: unsignedInt;
        Scale?: unsignedInt;
    }

    export interface ResultSetMetadata {
        Column?: Column[];
    }

    export interface ExecuteQueryResponse {
        Exceptions?: Exceptions;
        CursorId?: string;
        InitMs?: double;
        PrepareMs?: double;
        ResultSetMetadata?: ResultSetMetadata;
    }

    export interface ExplainQueryRequest {
        SqlText?: string;
    }

    export interface ExplainQueryResponse {
        Exceptions?: Exceptions;
        Plan?: string;
        PlanJson?: string;
        ResultSetMetadata?: ResultSetMetadata;
    }

    export interface FetchResultSetRequest {
        CursorId?: string;
        FetchSize?: unsignedInt;
    }

    export interface Start {
        DuckDBUsedBytes?: long;
        DuckDBTempBytes?: long;
        HeapInUseBytes?: long;
        ResidentBytes?: long;
        PeakResidentBytes?: long;
    }

    export interface Current {
        DuckDBUsedBytes?: long;
        DuckDBTempBytes?: long;
        HeapInUseBytes?: long;
        ResidentBytes?: long;
        PeakResidentBytes?: long;
    }

    export interface Released {
        DuckDBUsedBytes?: long;
        DuckDBTempBytes?: long;
        HeapInUseBytes?: long;
        ResidentBytes?: long;
        PeakResidentBytes?: long;
    }

    export interface Retained {
        DuckDBUsedBytes?: long;
        DuckDBTempBytes?: long;
        HeapInUseBytes?: long;
        ResidentBytes?: long;
        PeakResidentBytes?: long;
    }

    export interface ScanObjectsCreated {
        BindData?: long;
        GlobalStates?: long;
        LocalStates?: long;
    }

    export interface ScanObjectsLive {
        BindData?: long;
        GlobalStates?: long;
        LocalStates?: long;
    }

    export interface DebugInfo {
        Start?: Start;
        Current?: Current;
        Released?: Released;
        Retained?: Retained;
        ScanObjectsCreated?: ScanObjectsCreated;
        ScanObjectsLive?: ScanObjectsLive;
        LeakCheck?: string;
        LeakCheckDetail?: string;
    }

    export interface FetchResultSetResponse {
        Exceptions?: Exceptions;
        Rows?: string;
        Complete?: boolean;
        ExecuteMs?: double;
        RuntimeGraph?: string;
        RuntimeGraphJson?: string;
        DebugInfo?: DebugInfo;
    }

    export interface LogicalFileMetaRequest {
        LogicalName?: string;
    }

    export interface LogicalFileMeta {
        Version?: unsignedInt;
        LogicalName?: string;
        Kind?: string;
        Format?: string;
        Grouped?: boolean;
        FormatCrc?: unsignedInt;
        RecordTranslationMode?: unsignedInt;
        Modified?: long;
        RecordCount?: uint64;
        FormatOptions?: string;
        ProviderOptions?: string;
        EclRecord?: string;
        FileParts?: string;
        SampleSQL?: string;
    }

    export interface LogicalFileMetaResponse {
        Exceptions?: Exceptions;
        LogicalFileMeta?: LogicalFileMeta;
    }

    export interface WsSQL2PingRequest {

    }

    export interface WsSQL2PingResponse {

    }

    export interface SplitQueryRequest {
        SqlText?: string;
    }

    export interface Statements {
        Statement?: string[];
    }

    export interface SplitQueryResponse {
        Exceptions?: Exceptions;
        Statements?: Statements;
    }

}

export class SQL2ServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsSQL2", "1.00");
    }

    CloseResultSet(request: WsSQL2.CloseResultSetRequest, abortSignal?: AbortSignal): Promise<WsSQL2.CloseResultSetResponse> {
        return this._connection.send("CloseResultSet", request, "json", false, abortSignal, "CloseResultSetResponse");
    }

    ExecuteQuery(request: WsSQL2.ExecuteQueryRequest, abortSignal?: AbortSignal): Promise<WsSQL2.ExecuteQueryResponse> {
        return this._connection.send("ExecuteQuery", request, "json", false, abortSignal, "ExecuteQueryResponse");
    }

    ExplainQuery(request: WsSQL2.ExplainQueryRequest, abortSignal?: AbortSignal): Promise<WsSQL2.ExplainQueryResponse> {
        return this._connection.send("ExplainQuery", request, "json", false, abortSignal, "ExplainQueryResponse");
    }

    FetchResultSet(request: WsSQL2.FetchResultSetRequest, abortSignal?: AbortSignal): Promise<WsSQL2.FetchResultSetResponse> {
        return this._connection.send("FetchResultSet", request, "json", false, abortSignal, "FetchResultSetResponse");
    }

    LogicalFileMeta(request: WsSQL2.LogicalFileMetaRequest, abortSignal?: AbortSignal): Promise<WsSQL2.LogicalFileMetaResponse> {
        return this._connection.send("LogicalFileMeta", request, "json", false, abortSignal, "LogicalFileMetaResponse");
    }

    Ping(request: WsSQL2.WsSQL2PingRequest, abortSignal?: AbortSignal): Promise<WsSQL2.WsSQL2PingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "WsSQL2PingResponse");
    }

    SplitQuery(request: WsSQL2.SplitQueryRequest, abortSignal?: AbortSignal): Promise<WsSQL2.SplitQueryResponse> {
        return this._connection.send("SplitQuery", request, "json", false, abortSignal, "SplitQueryResponse");
    }

}
