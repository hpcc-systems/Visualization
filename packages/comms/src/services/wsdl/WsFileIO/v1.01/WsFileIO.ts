import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsFileIO {

    export type long = number;
    export type base64Binary = string;

    export interface CreateFileRequest {
        DestDropZone?: string;
        DestRelativePath?: string;
        DestNetAddress?: string;
        Overwrite?: boolean;
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

    export interface CreateFileResponse {
        Exceptions: Exceptions;
        DestDropZone: string;
        DestRelativePath: string;
        Overwrite: boolean;
        Result: string;
    }

    export interface WsFileIOPingRequest {

    }

    export interface WsFileIOPingResponse {

    }

    export interface ReadFileDataRequest {
        DestDropZone?: string;
        DestRelativePath?: string;
        DestNetAddress?: string;
        Offset?: long;
        DataSize?: long;
    }

    export interface ReadFileDataResponse {
        Exceptions: Exceptions;
        Data: base64Binary;
        DestDropZone: string;
        DestRelativePath: string;
        Offset: long;
        DataSize: long;
        Result: string;
    }

    export interface WriteFileDataRequest {
        Data?: base64Binary;
        DestDropZone?: string;
        DestRelativePath?: string;
        DestNetAddress?: string;
        Offset?: long;
        Append?: boolean;
    }

    export interface WriteFileDataResponse {
        Exceptions: Exceptions;
        DestDropZone: string;
        DestRelativePath: string;
        Offset: long;
        Append: boolean;
        Result: string;
    }

}

export class FileIOServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsFileIO", "1.01");
    }

    CreateFile(request: Partial<WsFileIO.CreateFileRequest>): Promise<WsFileIO.CreateFileResponse> {
        return this._connection.send("CreateFile", request, "json", false, undefined, "CreateFileResponse");
    }

    Ping(request: Partial<WsFileIO.WsFileIOPingRequest>): Promise<WsFileIO.WsFileIOPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsFileIOPingResponse");
    }

    ReadFileData(request: Partial<WsFileIO.ReadFileDataRequest>): Promise<WsFileIO.ReadFileDataResponse> {
        return this._connection.send("ReadFileData", request, "json", false, undefined, "ReadFileDataResponse");
    }

    WriteFileData(request: Partial<WsFileIO.WriteFileDataRequest>): Promise<WsFileIO.WriteFileDataResponse> {
        return this._connection.send("WriteFileData", request, "json", false, undefined, "WriteFileDataResponse");
    }

}
