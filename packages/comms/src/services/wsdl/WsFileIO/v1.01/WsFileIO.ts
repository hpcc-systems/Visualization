import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

type long = number;
type base64Binary = string;

export namespace WsFileIO {

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
    Exceptions: {
        Source: string;
        Exception: Exception[];
    };
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

CreateFile(request: WsFileIO.CreateFileRequest): Promise<WsFileIO.CreateFileResponse> {
	return this._connection.send("CreateFile", request);
}

Ping(request: WsFileIO.WsFileIOPingRequest): Promise<WsFileIO.WsFileIOPingResponse> {
	return this._connection.send("Ping", request);
}

ReadFileData(request: WsFileIO.ReadFileDataRequest): Promise<WsFileIO.ReadFileDataResponse> {
	return this._connection.send("ReadFileData", request);
}

WriteFileData(request: WsFileIO.WriteFileDataRequest): Promise<WsFileIO.WriteFileDataResponse> {
	return this._connection.send("WriteFileData", request);
}

}
