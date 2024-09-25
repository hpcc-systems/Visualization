import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsDali {

    type unsignedInt = number;

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
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
        Result: string;
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

    export interface GetValueRequest {
        Path?: string;
    }

    export interface ImportRequest {
        XML?: string;
        Path?: string;
        Add?: boolean;
    }

    export interface WSDaliPingRequest {

    }

    export interface WSDaliPingResponse {

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

    export interface SetUnprotectedRequest {
        FileName?: string;
        CallerId?: string;
    }

    export interface SetValueRequest {
        Path?: string;
        Value?: string;
    }

}

export class DaliServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WSDali", "1.04");
    }

    Add(request: WsDali.AddRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("Add", request, "json", false, undefined, "ResultResponse");
    }

    Count(request: WsDali.CountRequest): Promise<WsDali.CountResponse> {
        return this._connection.send("Count", request, "json", false, undefined, "CountResponse");
    }

    DFSCheck(request: WsDali.DFSCheckRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSCheck", request, "json", false, undefined, "ResultResponse");
    }

    DFSExists(request: WsDali.DFSExistsRequest): Promise<WsDali.BooleanResponse> {
        return this._connection.send("DFSExists", request, "json", false, undefined, "BooleanResponse");
    }

    DFSLS(request: WsDali.DFSLSRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSLS", request, "json", false, undefined, "ResultResponse");
    }

    Delete(request: WsDali.DeleteRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("Delete", request, "json", false, undefined, "ResultResponse");
    }

    GetDFSCSV(request: WsDali.GetDFSCSVRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSCSV", request, "json", false, undefined, "ResultResponse");
    }

    GetDFSMap(request: WsDali.GetDFSMapRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSMap", request, "json", false, undefined, "ResultResponse");
    }

    GetDFSParents(request: WsDali.GetDFSParentsRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSParents", request, "json", false, undefined, "ResultResponse");
    }

    GetLogicalFile(request: WsDali.GetLogicalFileRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFile", request, "json", false, undefined, "ResultResponse");
    }

    GetLogicalFilePart(request: WsDali.GetLogicalFilePartRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFilePart", request, "json", false, undefined, "ResultResponse");
    }

    GetProtectedList(request: WsDali.GetProtectedListRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetProtectedList", request, "json", false, undefined, "ResultResponse");
    }

    GetValue(request: WsDali.GetValueRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetValue", request, "json", false, undefined, "ResultResponse");
    }

    Import(request: WsDali.ImportRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("Import", request, "json", false, undefined, "ResultResponse");
    }

    Ping(request: WsDali.WSDaliPingRequest): Promise<WsDali.WSDaliPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WSDaliPingResponse");
    }

    SetLogicalFilePartAttr(request: WsDali.SetLogicalFilePartAttrRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetLogicalFilePartAttr", request, "json", false, undefined, "ResultResponse");
    }

    SetProtected(request: WsDali.SetProtectedRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetProtected", request, "json", false, undefined, "ResultResponse");
    }

    SetUnprotected(request: WsDali.SetUnprotectedRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetUnprotected", request, "json", false, undefined, "ResultResponse");
    }

    SetValue(request: WsDali.SetValueRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetValue", request, "json", false, undefined, "ResultResponse");
    }

}
