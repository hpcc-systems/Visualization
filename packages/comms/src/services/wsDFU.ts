import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/WsDFU/DFUQuery?respjson_
    * http://json2ts.com/
*/

export namespace DFUQuery {
    export interface Request {
        Prefix?: string;
        NodeGroup?: string;
        ContentType?: string;
        LogicalName?: string;
        Description?: string;
        Owner?: string;
        StartDate?: string;
        EndDate?: string;
        FileType?: string;
        FileSizeFrom?: number;
        FileSizeTo?: number;
        FirstN?: number;
        PageSize?: number;
        PageStartFrom?: number;
        Sortby?: string;
        Descending?: boolean;
        OneLevelDirFileReturn?: boolean;
        CacheHint?: number;
        MaxNumberOfFiles?: number;
        IncludeSuperOwner?: boolean;
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

    export interface DFULogicalFile {
        Prefix: string;
        ClusterName: string;
        NodeGroup: string;
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
        FromRoxieCluster: boolean;
        BrowseData: boolean;
        IsKeyFile: boolean;
        IsCompressed: boolean;
        ContentType: string;
        CompressedFileSize: number;
        SuperOwners: string;
        Persistent: boolean;
        IsProtected: boolean;
    }

    export interface DFULogicalFiles {
        DFULogicalFile: DFULogicalFile[];
    }

    export interface Response {
        Exceptions: Exceptions;
        DFULogicalFiles: DFULogicalFiles;
        Prefix: string;
        NodeGroup: string;
        LogicalName: string;
        Description: string;
        Owner: string;
        StartDate: string;
        EndDate: string;
        FileType: string;
        FileSizeFrom: number;
        FileSizeTo: number;
        FirstN: number;
        PageSize: number;
        PageStartFrom: number;
        LastPageFrom: number;
        PageEndAt: number;
        PrevPageFrom: number;
        NextPageFrom: number;
        NumFiles: number;
        Sortby: string;
        Descending: boolean;
        BasicQuery: string;
        ParametersForPaging: string;
        Filters: string;
        CacheHint: number;
        IsSubsetOfFiles: boolean;
        Warning: string;
    }
}

export class DFUService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "WsDFU", "1.35");
    }

    DFUQuery(request: DFUQuery.Request): Promise<DFUQuery.Response> {
        return this._connection.send("DFUQuery", request);
    }
}
