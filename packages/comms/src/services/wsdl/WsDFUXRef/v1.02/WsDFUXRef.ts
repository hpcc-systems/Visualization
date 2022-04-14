import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

type unsignedInt = number;
type long = number;

export namespace WsDFUXRef {

export interface XRefFiles {
    Item: string[];
}

export interface DFUXRefArrayActionRequest {
    Type?: string;
    Cluster?: string;
    Action?: string;
    XRefFiles?: {
        Item?: string[];
    };
}

export interface DFUXRefArrayActionResponse {
    DFUXRefArrayActionResult: string;
}

export interface DFUXRefBuildRequest {
    Cluster?: string;
}

export interface DFUXRefBuildResponse {
    DFUXRefActionResult: string;
}

export interface DFUXRefBuildCancelRequest {

}

export interface DFUXRefBuildCancelResponse {
    DFUXRefBuildCancelResult: string;
}

export interface DFUXRefCleanDirectoriesRequest {
    Cluster?: string;
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

export interface DFUXRefCleanDirectoriesResponse {
    Exceptions: {
        Source: string;
        Exception: Exception[];
    };
}

export interface DFUXRefDirectoriesQueryRequest {
    Cluster?: string;
}

export interface DFUXRefDirectoriesQueryResponse {
    DFUXRefDirectoriesQueryResult: string;
}

export interface DFUXRefFoundFilesQueryRequest {
    Cluster?: string;
}

export interface DFUXRefFoundFilesQueryResponse {
    DFUXRefFoundFilesQueryResult: string;
}

export interface DFUXRefListRequest {

}

export interface DFUXRefListResponse {
    DFUXRefListResult: string;
}

export interface DFUXRefLostFilesQueryRequest {
    Cluster?: string;
}

export interface DFUXRefLostFilesQueryResponse {
    DFUXRefLostFilesQueryResult: string;
}

export interface DFUXRefMessagesQueryRequest {
    Cluster?: string;
}

export interface DFUXRefMessagesQueryResponse {
    DFUXRefMessagesQueryResult: string;
}

export interface DFUXRefOrphanFilesQueryRequest {
    Cluster?: string;
}

export interface DFUXRefOrphanFilesQueryResponse {
    DFUXRefOrphanFilesQueryResult: string;
}

export interface DFUXRefUnusedFilesRequest {
    ProcessCluster?: string;
    CheckPackageMaps?: boolean;
    GetFileDetails?: boolean;
}

export interface UnusedFiles {
    File: string[];
}

export interface DFULogicalFile {
    Prefix: string;
    ClusterName: string;
    Directory: string;
    Description: string;
    Parts: string;
    Name: string;
    Owner: string;
    Totalsize: string;
    RecordCount: string;
    Modified: string;
    LongSize: string;
    LongRecordCount: string;
    isSuperfile: boolean;
    isZipfile: boolean;
    isDirectory: boolean;
    Replicate: boolean;
    IntSize: long;
    IntRecordCount: long;
    FromRoxieCluster: boolean;
}

export interface UnusedFilesWithDetails {
    DFULogicalFile: DFULogicalFile[];
}

export interface DFUXRefUnusedFilesResponse {
    Exceptions: Exceptions;
    UnusedFileCount: unsignedInt;
    UnusedFiles: {
        File: string[];
    };
    UnusedFilesWithDetails: {
        DFULogicalFile: DFULogicalFile[];
    };
}

export interface WsDFUXRefPingRequest {

}

export interface WsDFUXRefPingResponse {

}

}

export class DFUXRefServiceBase extends Service {

constructor(optsConnection: IOptions | IConnection) {
super(optsConnection, "WsDFUXRef", "1.02");
}

DFUXRefArrayAction(request: WsDFUXRef.DFUXRefArrayActionRequest): Promise<WsDFUXRef.DFUXRefArrayActionResponse> {
	return this._connection.send("DFUXRefArrayAction", request);
}

DFUXRefBuild(request: WsDFUXRef.DFUXRefBuildRequest): Promise<WsDFUXRef.DFUXRefBuildResponse> {
	return this._connection.send("DFUXRefBuild", request);
}

DFUXRefBuildCancel(request: WsDFUXRef.DFUXRefBuildCancelRequest): Promise<WsDFUXRef.DFUXRefBuildCancelResponse> {
	return this._connection.send("DFUXRefBuildCancel", request);
}

DFUXRefCleanDirectories(request: WsDFUXRef.DFUXRefCleanDirectoriesRequest): Promise<WsDFUXRef.DFUXRefCleanDirectoriesResponse> {
	return this._connection.send("DFUXRefCleanDirectories", request);
}

DFUXRefDirectories(request: WsDFUXRef.DFUXRefDirectoriesQueryRequest): Promise<WsDFUXRef.DFUXRefDirectoriesQueryResponse> {
	return this._connection.send("DFUXRefDirectories", request);
}

DFUXRefFoundFiles(request: WsDFUXRef.DFUXRefFoundFilesQueryRequest): Promise<WsDFUXRef.DFUXRefFoundFilesQueryResponse> {
	return this._connection.send("DFUXRefFoundFiles", request);
}

DFUXRefList(request: WsDFUXRef.DFUXRefListRequest): Promise<WsDFUXRef.DFUXRefListResponse> {
	return this._connection.send("DFUXRefList", request);
}

DFUXRefLostFiles(request: WsDFUXRef.DFUXRefLostFilesQueryRequest): Promise<WsDFUXRef.DFUXRefLostFilesQueryResponse> {
	return this._connection.send("DFUXRefLostFiles", request);
}

DFUXRefMessages(request: WsDFUXRef.DFUXRefMessagesQueryRequest): Promise<WsDFUXRef.DFUXRefMessagesQueryResponse> {
	return this._connection.send("DFUXRefMessages", request);
}

DFUXRefOrphanFiles(request: WsDFUXRef.DFUXRefOrphanFilesQueryRequest): Promise<WsDFUXRef.DFUXRefOrphanFilesQueryResponse> {
	return this._connection.send("DFUXRefOrphanFiles", request);
}

DFUXRefUnusedFiles(request: WsDFUXRef.DFUXRefUnusedFilesRequest): Promise<WsDFUXRef.DFUXRefUnusedFilesResponse> {
	return this._connection.send("DFUXRefUnusedFiles", request);
}

Ping(request: WsDFUXRef.WsDFUXRefPingRequest): Promise<WsDFUXRef.WsDFUXRefPingResponse> {
	return this._connection.send("Ping", request);
}

}
