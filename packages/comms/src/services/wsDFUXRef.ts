import { IConnection, IOptions } from "../connection.ts";
import { Service } from "../espConnection.ts";

/*
    Response structures generated via:
    * http://localhost:8010/WsDFUXRef/?ver_=1.01&reqjson_
    * http://localhost:8010/WsDFUXRef/?ver_=1.01&respjson_
    * http://json2ts.com/
*/

export namespace WsDFUXRef {

    export interface XRefFiles {
        Item: string[];
    }

    export interface DFUXRefArrayActionRequest {
        Type: string;
        Cluster: string;
        Action: string;
        XRefFiles: XRefFiles;
    }

    export interface DFUXRefBuildRequest {
        Cluster: string;
    }

    export interface DFUXRefBuildCancelRequest {
    }

    export interface DFUXRefCleanDirectoriesRequest {
        Cluster: string;
    }

    export interface DFUXRefDirectoriesQueryRequest {
        Cluster: string;
    }

    export interface DFUXRefFoundFilesQueryRequest {
        Cluster: string;
    }

    export interface DFUXRefListRequest {
    }

    export interface DFUXRefLostFilesQueryRequest {
        Cluster: string;
    }

    export interface DFUXRefMessagesQueryRequest {
        Cluster: string;
    }

    export interface DFUXRefOrphanFilesQueryRequest {
        Cluster: string;
    }

    export interface DFUXRefUnusedFilesRequest {
        ProcessCluster: string;
        CheckPackageMaps: boolean;
        GetFileDetails: boolean;
    }

    export interface WsDFUXRefPingRequest {
    }

    export interface Request {
        DFUXRefArrayActionRequest: DFUXRefArrayActionRequest;
        DFUXRefBuildRequest: DFUXRefBuildRequest;
        DFUXRefBuildCancelRequest: DFUXRefBuildCancelRequest;
        DFUXRefCleanDirectoriesRequest: DFUXRefCleanDirectoriesRequest;
        DFUXRefDirectoriesQueryRequest: DFUXRefDirectoriesQueryRequest;
        DFUXRefFoundFilesQueryRequest: DFUXRefFoundFilesQueryRequest;
        DFUXRefListRequest: DFUXRefListRequest;
        DFUXRefLostFilesQueryRequest: DFUXRefLostFilesQueryRequest;
        DFUXRefMessagesQueryRequest: DFUXRefMessagesQueryRequest;
        DFUXRefOrphanFilesQueryRequest: DFUXRefOrphanFilesQueryRequest;
        DFUXRefUnusedFilesRequest: DFUXRefUnusedFilesRequest;
        WsDFUXRefPingRequest: WsDFUXRefPingRequest;
    }

    export interface DFUXRefArrayActionResponse {
        DFUXRefArrayActionResult: string;
    }

    export interface DFUXRefBuildResponse {
        DFUXRefActionResult: string;
    }

    export interface DFUXRefBuildCancelResponse {
        DFUXRefBuildCancelResult: string;
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

    export interface Directory {
        Num: string;
        Name: string;
        MaxSize: string;
        MaxIP: string;
        MinSize: string;
        MinIP: string;
        Size: string;
        PositiveSkew: string;
    }

    export interface DFUXRefDirectoriesQueryResult {
        Directory: Directory[];
        Cluster: string;
    }

    export interface DFUXRefDirectoriesQueryResponse {
        DFUXRefDirectoriesQueryResult: DFUXRefDirectoriesQueryResult;
    }

    export interface Part {
        Num: string;
        Node: string;
    }

    export interface File {
        Size: string;
        Partmask: string;
        Modified: Date;
        Numparts: string;
        Part: Part[];
    }

    export interface DFUXRefFoundFilesQueryResult {
        File: File[];
        Cluster: string;
    }

    export interface DFUXRefFoundFilesQueryResponse {
        DFUXRefFoundFilesQueryResult: DFUXRefFoundFilesQueryResult;
    }

    export interface XRefNode {
        Name: string;
        Modified: string;
        Status: string;
    }

    export interface DFUXRefListResult {
        XRefNode: XRefNode[];
    }

    export interface DFUXRefListResponse {
        DFUXRefListResult: DFUXRefListResult;
    }

    export interface File2 {
        Partslost: string;
        Name: string;
        Partmask: string;
        Modified: Date;
        Numparts: string;
        Part: any;
        Cluster: string;
        Size: string;
        Primarylost: string;
        Replicatedlost: string;
    }

    export interface DFUXRefLostFilesQueryResult {
        File: File2[];
        Cluster: string;
    }

    export interface DFUXRefLostFilesQueryResponse {
        DFUXRefLostFilesQueryResult: DFUXRefLostFilesQueryResult;
    }

    export interface Warning {
        Text: string;
        File: string;
    }

    export interface DFUXRefMessagesQueryResult {
        Warning: Warning[];
        Cluster: string;
    }

    export interface DFUXRefMessagesQueryResponse {
        DFUXRefMessagesQueryResult: DFUXRefMessagesQueryResult;
    }

    export interface DFUXRefOrphanFilesQueryResult {
        File: File[];
        Cluster: string;
    }

    export interface DFUXRefOrphanFilesQueryResponse {
        DFUXRefOrphanFilesQueryResult: DFUXRefOrphanFilesQueryResult;
    }

    export interface Exception2 {
        Code: string;
        Audience: string;
        Source: string;
        Message: string;
    }

    export interface Exceptions2 {
        Source: string;
        Exception: Exception2[];
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
        IntSize: number;
        IntRecordCount: number;
    }

    export interface UnusedFilesWithDetails {
        DFULogicalFile: DFULogicalFile[];
    }

    export interface DFUXRefUnusedFilesResponse {
        Exceptions: Exceptions2;
        UnusedFileCount: number;
        UnusedFiles: UnusedFiles;
        UnusedFilesWithDetails: UnusedFilesWithDetails;
    }

    export interface WsDFUXRefPingResponse {
    }
}

export class DFUXRefService extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsDFUXRef", "1.01");
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

    DFUXRefCleanDirectories(request: WsDFUXRef.DFUXRefCleanDirectoriesRequest): Promise<WsDFUXRef.DFUXRefDirectoriesQueryResponse> {
        return this._connection.send("DFUXRefCleanDirectories", request);
    }

    DFUXRefDirectories(request: WsDFUXRef.DFUXRefDirectoriesQueryRequest): Promise<WsDFUXRef.DFUXRefDirectoriesQueryResponse> {
        return this._connection.send("DFUXRefDirectories", request, undefined, undefined, undefined, "DFUXRefDirectoriesQueryResponse");
    }

    DFUXRefFoundFiles(request: WsDFUXRef.DFUXRefFoundFilesQueryRequest): Promise<WsDFUXRef.DFUXRefFoundFilesQueryResponse> {
        return this._connection.send("DFUXRefFoundFiles", request, undefined, undefined, undefined, "DFUXRefFoundFilesQueryResponse");
    }

    DFUXRefList(request: WsDFUXRef.DFUXRefListRequest = {}): Promise<WsDFUXRef.DFUXRefListResponse> {
        return this._connection.send("DFUXRefList", request);
    }

    DFUXRefLostFiles(request: WsDFUXRef.DFUXRefLostFilesQueryRequest): Promise<WsDFUXRef.DFUXRefLostFilesQueryResponse> {
        return this._connection.send("DFUXRefLostFiles", request, undefined, undefined, undefined, "DFUXRefLostFilesQueryResponse");
    }

    DFUXRefMessages(request: WsDFUXRef.DFUXRefMessagesQueryRequest): Promise<WsDFUXRef.DFUXRefMessagesQueryResponse> {
        return this._connection.send("DFUXRefMessages", request, undefined, undefined, undefined, "DFUXRefMessagesQueryResponse");
    }

    DFUXRefOrphanFiles(request: WsDFUXRef.DFUXRefOrphanFilesQueryRequest): Promise<WsDFUXRef.DFUXRefOrphanFilesQueryResponse> {
        return this._connection.send("DFUXRefOrphanFiles", request, undefined, undefined, undefined, "DFUXRefOrphanFilesQueryResponse");
    }

    DFUXRefUnusedFiles(request: WsDFUXRef.DFUXRefUnusedFilesRequest): Promise<WsDFUXRef.DFUXRefUnusedFilesResponse> {
        return this._connection.send("DFUXRefUnusedFiles", request);
    }
}
