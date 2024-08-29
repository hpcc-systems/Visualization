import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

export namespace WsDali {

    export type unsignedInt = number;

    export interface AddRequest {
        Path?: string;
        Value?: string;
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

    export interface ResultResponse {
        Exceptions: Exceptions;
        Result: string;
    }

    export interface ClearTraceTransactionsRequest {

    }

    export interface CountRequest {
        Path?: string;
    }

    export interface CountResponse {
        Exceptions: Exceptions;
        Result: unsignedInt;
    }

    export interface DFSCheckRequest {

    }

    export interface DFSExistsRequest {
        FileName?: string;
    }

    export interface BooleanResponse {
        Exceptions: Exceptions;
        Result: boolean;
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

    Add(request: Partial<WsDali.AddRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("Add", request, "json", false, undefined, "ResultResponse");
    }

    ClearTraceTransactions(request: Partial<WsDali.ClearTraceTransactionsRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("ClearTraceTransactions", request, "json", false, undefined, "ResultResponse");
    }

    Count(request: Partial<WsDali.CountRequest>): Promise<WsDali.CountResponse> {
        return this._connection.send("Count", request, "json", false, undefined, "CountResponse");
    }

    DFSCheck(request: Partial<WsDali.DFSCheckRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSCheck", request, "json", false, undefined, "ResultResponse");
    }

    DFSExists(request: Partial<WsDali.DFSExistsRequest>): Promise<WsDali.BooleanResponse> {
        return this._connection.send("DFSExists", request, "json", false, undefined, "BooleanResponse");
    }

    DFSLS(request: Partial<WsDali.DFSLSRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSLS", request, "json", false, undefined, "ResultResponse");
    }

    Delete(request: Partial<WsDali.DeleteRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("Delete", request, "json", false, undefined, "ResultResponse");
    }

    DisconnectClientConnection(request: Partial<WsDali.DisconnectClientConnectionRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("DisconnectClientConnection", request, "json", false, undefined, "ResultResponse");
    }

    GetClients(request: Partial<WsDali.GetClientsRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetClients", request, "json", false, undefined, "ResultResponse");
    }

    GetConnections(request: Partial<WsDali.GetConnectionsRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetConnections", request, "json", false, undefined, "ResultResponse");
    }

    GetDFSCSV(request: Partial<WsDali.GetDFSCSVRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSCSV", request, "json", false, undefined, "ResultResponse");
    }

    GetDFSMap(request: Partial<WsDali.GetDFSMapRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSMap", request, "json", false, undefined, "ResultResponse");
    }

    GetDFSParents(request: Partial<WsDali.GetDFSParentsRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSParents", request, "json", false, undefined, "ResultResponse");
    }

    GetLogicalFile(request: Partial<WsDali.GetLogicalFileRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFile", request, "json", false, undefined, "ResultResponse");
    }

    GetLogicalFilePart(request: Partial<WsDali.GetLogicalFilePartRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFilePart", request, "json", false, undefined, "ResultResponse");
    }

    GetProtectedList(request: Partial<WsDali.GetProtectedListRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetProtectedList", request, "json", false, undefined, "ResultResponse");
    }

    GetSDSStats(request: Partial<WsDali.GetSDSStatsRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetSDSStats", request, "json", false, undefined, "ResultResponse");
    }

    GetSDSSubscribers(request: Partial<WsDali.GetSDSSubscribersRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetSDSSubscribers", request, "json", false, undefined, "ResultResponse");
    }

    GetValue(request: Partial<WsDali.GetValueRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetValue", request, "json", false, undefined, "ResultResponse");
    }

    Import(request: Partial<WsDali.ImportRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("Import", request, "json", false, undefined, "ResultResponse");
    }

    ListSDSLocks(request: Partial<WsDali.ListSDSLocksRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("ListSDSLocks", request, "json", false, undefined, "ResultResponse");
    }

    Ping(request: Partial<WsDali.WSDaliPingRequest>): Promise<WsDali.WSDaliPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WSDaliPingResponse");
    }

    SaveSDSStore(request: Partial<WsDali.SaveSDSStoreRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("SaveSDSStore", request, "json", false, undefined, "ResultResponse");
    }

    SetLogicalFilePartAttr(request: Partial<WsDali.SetLogicalFilePartAttrRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetLogicalFilePartAttr", request, "json", false, undefined, "ResultResponse");
    }

    SetProtected(request: Partial<WsDali.SetProtectedRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetProtected", request, "json", false, undefined, "ResultResponse");
    }

    SetTraceSlowTransactions(request: Partial<WsDali.SetTraceSlowTransactionsRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetTraceSlowTransactions", request, "json", false, undefined, "ResultResponse");
    }

    SetTraceTransactions(request: Partial<WsDali.SetTraceTransactionsRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetTraceTransactions", request, "json", false, undefined, "ResultResponse");
    }

    SetUnprotected(request: Partial<WsDali.SetUnprotectedRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetUnprotected", request, "json", false, undefined, "ResultResponse");
    }

    SetValue(request: Partial<WsDali.SetValueRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetValue", request, "json", false, undefined, "ResultResponse");
    }

    UnlockSDSLock(request: Partial<WsDali.UnlockSDSLockRequest>): Promise<WsDali.ResultResponse> {
        return this._connection.send("UnlockSDSLock", request, "json", false, undefined, "ResultResponse");
    }

}
