import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

type unsignedInt = number;

export namespace WsDali {

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

    export interface WsDaliPingRequest {

    }

    export interface WsDaliPingResponse {

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
        return this._connection.send("Add", request);
    }

    Count(request: WsDali.CountRequest): Promise<WsDali.CountResponse> {
        return this._connection.send("Count", request);
    }

    DFSCheck(request: WsDali.DFSCheckRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSCheck", request);
    }

    DFSExists(request: WsDali.DFSExistsRequest): Promise<WsDali.BooleanResponse> {
        return this._connection.send("DFSExists", request);
    }

    DFSLS(request: WsDali.DFSLSRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("DFSLS", request);
    }

    Delete(request: WsDali.DeleteRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("Delete", request);
    }

    GetDFSCSV(request: WsDali.GetDFSCSVRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSCSV", request);
    }

    GetDFSMap(request: WsDali.GetDFSMapRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSMap", request);
    }

    GetDFSParents(request: WsDali.GetDFSParentsRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetDFSParents", request);
    }

    GetLogicalFile(request: WsDali.GetLogicalFileRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFile", request);
    }

    GetLogicalFilePart(request: WsDali.GetLogicalFilePartRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetLogicalFilePart", request);
    }

    GetProtectedList(request: WsDali.GetProtectedListRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetProtectedList", request);
    }

    GetValue(request: WsDali.GetValueRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("GetValue", request);
    }

    Import(request: WsDali.ImportRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("Import", request);
    }

    Ping(request: WsDali.WsDaliPingRequest): Promise<WsDali.WsDaliPingResponse> {
        return this._connection.send("Ping", request);
    }

    SetLogicalFilePartAttr(request: WsDali.SetLogicalFilePartAttrRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetLogicalFilePartAttr", request);
    }

    SetProtected(request: WsDali.SetProtectedRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetProtected", request);
    }

    SetUnprotected(request: WsDali.SetUnprotectedRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetUnprotected", request);
    }

    SetValue(request: WsDali.SetValueRequest): Promise<WsDali.ResultResponse> {
        return this._connection.send("SetValue", request);
    }

}
