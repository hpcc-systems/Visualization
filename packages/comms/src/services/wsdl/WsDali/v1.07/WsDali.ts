import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsDali {

    export type unsignedInt = number;

    export interface AddRequest {
        Path?: string;
        Value?: string;
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

    export interface ResultResponse {
        Exceptions?: Exceptions;
        Result?: string;
    }

    export interface ClearTraceTransactionsRequest {

    }

    export interface CountRequest {
        Path?: string;
    }

    export interface CountResponse {
        Exceptions?: Exceptions;
        Result?: unsignedInt;
    }

    export interface DFSCheckRequest {

    }

    export interface DFSExistsRequest {
        FileName?: string;
    }

    export interface BooleanResponse {
        Exceptions?: Exceptions;
        Result?: boolean;
    }

    export interface DFSLSRequest {
        Name?: string;
        PathAndNameOnly?: boolean;
        IncludeSubFileInfo?: boolean;
        Recursively?: boolean;
    }

    export interface DeleteRequest {
        Path?: string;
    }

    export interface DisconnectClientConnectionRequest {
        Endpoint?: string;
    }

    export interface GetClientsRequest {

    }

    export interface GetConnectionsRequest {

    }

    export interface GetDFSCSVRequest {
        LogicalNameMask?: string;
    }

    export interface GetDFSMapRequest {
        FileName?: string;
    }

    export interface GetDFSParentsRequest {
        FileName?: string;
    }

    export interface GetLogicalFileRequest {
        FileName?: string;
    }

    export interface GetLogicalFilePartRequest {
        FileName?: string;
        PartNumber?: unsignedInt;
    }

    export interface GetProtectedListRequest {
        FileName?: string;
        CallerId?: string;
    }

    export interface GetSDSStatsRequest {

    }

    export interface GetSDSSubscribersRequest {

    }

    export interface GetValueRequest {
        Path?: string;
    }

    export interface ImportRequest {
        XML?: string;
        Path?: string;
        Add?: boolean;
    }

    export interface ListSDSLocksRequest {

    }

    export interface WSDaliPingRequest {

    }

    export interface WSDaliPingResponse {

    }

    export interface SaveSDSStoreRequest {

    }

    export interface SetLogicalFilePartAttrRequest {
        FileName?: string;
        PartNumber?: unsignedInt;
        Attr?: string;
        Value?: string;
    }

    export interface SetProtectedRequest {
        FileName?: string;
        CallerId?: string;
    }

    export interface SetTraceSlowTransactionsRequest {
        SlowThresholdMS?: unsignedInt;
    }

    export interface SetTraceTransactionsRequest {

    }

    export interface SetUnprotectedRequest {
        FileName?: string;
        CallerId?: string;
    }

    export interface SetValueRequest {
        Path?: string;
        Value?: string;
    }

    export interface UnlockSDSLockRequest {
        ConnectionID?: string;
        Close?: boolean;
    }

}

export class DaliServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WSDali", "1.07");
    }

    Add(request: WsDali.AddRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("Add", request, "json", false, abortSignal, "ResultResponse");
    }

    ClearTraceTransactions(request: WsDali.ClearTraceTransactionsRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("ClearTraceTransactions", request, "json", false, abortSignal, "ResultResponse");
    }

    Count(request: WsDali.CountRequest, abortSignal?: AbortSignal): Promise<WsDali.CountResponse> {
        return this._connection.send("Count", request, "json", false, abortSignal, "CountResponse");
    }

    DFSCheck(request: WsDali.DFSCheckRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSCheck", request, "json", false, abortSignal, "ResultResponse");
    }

    DFSExists(request: WsDali.DFSExistsRequest, abortSignal?: AbortSignal): Promise<WsDali.BooleanResponse> {
        return this._connection.send("DFSExists", request, "json", false, abortSignal, "BooleanResponse");
    }

    DFSLS(request: WsDali.DFSLSRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSLS", request, "json", false, abortSignal, "ResultResponse");
    }

    Delete(request: WsDali.DeleteRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("Delete", request, "json", false, abortSignal, "ResultResponse");
    }

    DisconnectClientConnection(request: WsDali.DisconnectClientConnectionRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("DisconnectClientConnection", request, "json", false, abortSignal, "ResultResponse");
    }

    GetClients(request: WsDali.GetClientsRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetClients", request, "json", false, abortSignal, "ResultResponse");
    }

    GetConnections(request: WsDali.GetConnectionsRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetConnections", request, "json", false, abortSignal, "ResultResponse");
    }

    GetDFSCSV(request: WsDali.GetDFSCSVRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSCSV", request, "json", false, abortSignal, "ResultResponse");
    }

    GetDFSMap(request: WsDali.GetDFSMapRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSMap", request, "json", false, abortSignal, "ResultResponse");
    }

    GetDFSParents(request: WsDali.GetDFSParentsRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSParents", request, "json", false, abortSignal, "ResultResponse");
    }

    GetLogicalFile(request: WsDali.GetLogicalFileRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFile", request, "json", false, abortSignal, "ResultResponse");
    }

    GetLogicalFilePart(request: WsDali.GetLogicalFilePartRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFilePart", request, "json", false, abortSignal, "ResultResponse");
    }

    GetProtectedList(request: WsDali.GetProtectedListRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetProtectedList", request, "json", false, abortSignal, "ResultResponse");
    }

    GetSDSStats(request: WsDali.GetSDSStatsRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetSDSStats", request, "json", false, abortSignal, "ResultResponse");
    }

    GetSDSSubscribers(request: WsDali.GetSDSSubscribersRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetSDSSubscribers", request, "json", false, abortSignal, "ResultResponse");
    }

    GetValue(request: WsDali.GetValueRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetValue", request, "json", false, abortSignal, "ResultResponse");
    }

    Import(request: WsDali.ImportRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("Import", request, "json", false, abortSignal, "ResultResponse");
    }

    ListSDSLocks(request: WsDali.ListSDSLocksRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("ListSDSLocks", request, "json", false, abortSignal, "ResultResponse");
    }

    Ping(request: WsDali.WSDaliPingRequest, abortSignal?: AbortSignal): Promise<WsDali.WSDaliPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "WSDaliPingResponse");
    }

    SaveSDSStore(request: WsDali.SaveSDSStoreRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("SaveSDSStore", request, "json", false, abortSignal, "ResultResponse");
    }

    SetLogicalFilePartAttr(request: WsDali.SetLogicalFilePartAttrRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetLogicalFilePartAttr", request, "json", false, abortSignal, "ResultResponse");
    }

    SetProtected(request: WsDali.SetProtectedRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetProtected", request, "json", false, abortSignal, "ResultResponse");
    }

    SetTraceSlowTransactions(request: WsDali.SetTraceSlowTransactionsRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetTraceSlowTransactions", request, "json", false, abortSignal, "ResultResponse");
    }

    SetTraceTransactions(request: WsDali.SetTraceTransactionsRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetTraceTransactions", request, "json", false, abortSignal, "ResultResponse");
    }

    SetUnprotected(request: WsDali.SetUnprotectedRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetUnprotected", request, "json", false, abortSignal, "ResultResponse");
    }

    SetValue(request: WsDali.SetValueRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetValue", request, "json", false, abortSignal, "ResultResponse");
    }

    UnlockSDSLock(request: WsDali.UnlockSDSLockRequest, abortSignal?: AbortSignal): Promise<WsDali.ResultResponse> {
        return this._connection.send("UnlockSDSLock", request, "json", false, abortSignal, "ResultResponse");
    }

}
