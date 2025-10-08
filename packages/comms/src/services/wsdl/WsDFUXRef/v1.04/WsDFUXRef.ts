import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsDFUXRef {

    export type unsignedInt = number;
    export type long = number;

    export interface XRefFiles {
        Item: string[];
    }

    export interface DFUXRefArrayActionRequest {
        Type?: string;
        Cluster?: string;
        Action?: string;
        XRefFiles?: XRefFiles;
        RemoveFromSuperfiles?: boolean;
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
        Exceptions: Exceptions;
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

    export interface ProcessClusterList {
        Item: string[];
    }

    export interface CheckPlanes {
        Item: string[];
    }

    export interface DFUXRefUnusedFilesRequest {
        ProcessCluster?: string;
        CheckPackageMaps?: boolean;
        GetFileDetails?: boolean;
        ProcessClusterList?: ProcessClusterList;
        CheckPlanes?: CheckPlanes;
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
        BrowseData: boolean;
    }

    export interface UnusedFilesWithDetails {
        DFULogicalFile: DFULogicalFile[];
    }

    export interface DFUXRefUnusedFilesResponse {
        Exceptions: Exceptions;
        UnusedFileCount: unsignedInt;
        UnusedFiles: UnusedFiles;
        UnusedFilesWithDetails: UnusedFilesWithDetails;
    }

    export interface WsDFUXRefPingRequest {

    }

    export interface WsDFUXRefPingResponse {

    }

}

export class DFUXRefServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsDFUXRef", "1.04");
    }

    DFUXRefArrayAction(request: Partial<WsDFUXRef.DFUXRefArrayActionRequest>): Promise<WsDFUXRef.DFUXRefArrayActionResponse> {
        return this._connection.send("DFUXRefArrayAction", request, "json", false, undefined, "DFUXRefArrayActionResponse");
    }

    DFUXRefBuild(request: Partial<WsDFUXRef.DFUXRefBuildRequest>): Promise<WsDFUXRef.DFUXRefBuildResponse> {
        return this._connection.send("DFUXRefBuild", request, "json", false, undefined, "DFUXRefBuildResponse");
    }

    DFUXRefBuildCancel(request: Partial<WsDFUXRef.DFUXRefBuildCancelRequest>): Promise<WsDFUXRef.DFUXRefBuildCancelResponse> {
        return this._connection.send("DFUXRefBuildCancel", request, "json", false, undefined, "DFUXRefBuildCancelResponse");
    }

    DFUXRefCleanDirectories(request: Partial<WsDFUXRef.DFUXRefCleanDirectoriesRequest>): Promise<WsDFUXRef.DFUXRefCleanDirectoriesResponse> {
        return this._connection.send("DFUXRefCleanDirectories", request, "json", false, undefined, "DFUXRefCleanDirectoriesResponse");
    }

    DFUXRefDirectories(request: Partial<WsDFUXRef.DFUXRefDirectoriesQueryRequest>): Promise<WsDFUXRef.DFUXRefDirectoriesQueryResponse> {
        return this._connection.send("DFUXRefDirectories", request, "json", false, undefined, "DFUXRefDirectoriesQueryResponse");
    }

    DFUXRefFoundFiles(request: Partial<WsDFUXRef.DFUXRefFoundFilesQueryRequest>): Promise<WsDFUXRef.DFUXRefFoundFilesQueryResponse> {
        return this._connection.send("DFUXRefFoundFiles", request, "json", false, undefined, "DFUXRefFoundFilesQueryResponse");
    }

    DFUXRefList(request: Partial<WsDFUXRef.DFUXRefListRequest>): Promise<WsDFUXRef.DFUXRefListResponse> {
        return this._connection.send("DFUXRefList", request, "json", false, undefined, "DFUXRefListResponse");
    }

    DFUXRefLostFiles(request: Partial<WsDFUXRef.DFUXRefLostFilesQueryRequest>): Promise<WsDFUXRef.DFUXRefLostFilesQueryResponse> {
        return this._connection.send("DFUXRefLostFiles", request, "json", false, undefined, "DFUXRefLostFilesQueryResponse");
    }

    DFUXRefMessages(request: Partial<WsDFUXRef.DFUXRefMessagesQueryRequest>): Promise<WsDFUXRef.DFUXRefMessagesQueryResponse> {
        return this._connection.send("DFUXRefMessages", request, "json", false, undefined, "DFUXRefMessagesQueryResponse");
    }

    DFUXRefOrphanFiles(request: Partial<WsDFUXRef.DFUXRefOrphanFilesQueryRequest>): Promise<WsDFUXRef.DFUXRefOrphanFilesQueryResponse> {
        return this._connection.send("DFUXRefOrphanFiles", request, "json", false, undefined, "DFUXRefOrphanFilesQueryResponse");
    }

    DFUXRefUnusedFiles(request: Partial<WsDFUXRef.DFUXRefUnusedFilesRequest>): Promise<WsDFUXRef.DFUXRefUnusedFilesResponse> {
        return this._connection.send("DFUXRefUnusedFiles", request, "json", false, undefined, "DFUXRefUnusedFilesResponse");
    }

    Ping(request: Partial<WsDFUXRef.WsDFUXRefPingRequest>): Promise<WsDFUXRef.WsDFUXRefPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsDFUXRefPingResponse");
    }

}
