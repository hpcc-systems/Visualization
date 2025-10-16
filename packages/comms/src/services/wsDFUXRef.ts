import { DFUXRefServiceBase, type WsDFUXRef } from "./wsdl/WsDFUXRef/v1.04/WsDFUXRef.ts";

export {
    type WsDFUXRef
};

export namespace WsDFUXRefEx {

    export interface Request {
        DFUXRefArrayActionRequest: WsDFUXRef.DFUXRefArrayActionRequest;
        DFUXRefBuildRequest: WsDFUXRef.DFUXRefBuildRequest;
        DFUXRefBuildCancelRequest: WsDFUXRef.DFUXRefBuildCancelRequest;
        DFUXRefCleanDirectoriesRequest: WsDFUXRef.DFUXRefCleanDirectoriesRequest;
        DFUXRefDirectoriesQueryRequest: WsDFUXRef.DFUXRefDirectoriesQueryRequest;
        DFUXRefFoundFilesQueryRequest: WsDFUXRef.DFUXRefFoundFilesQueryRequest;
        DFUXRefListRequest: WsDFUXRef.DFUXRefListRequest;
        DFUXRefLostFilesQueryRequest: WsDFUXRef.DFUXRefLostFilesQueryRequest;
        DFUXRefMessagesQueryRequest: WsDFUXRef.DFUXRefMessagesQueryRequest;
        DFUXRefOrphanFilesQueryRequest: WsDFUXRef.DFUXRefOrphanFilesQueryRequest;
        DFUXRefUnusedFilesRequest: WsDFUXRef.DFUXRefUnusedFilesRequest;
        WsDFUXRefPingRequest: WsDFUXRef.WsDFUXRefPingRequest;
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

    interface DFUXRefDirectoriesQueryResult {
        Directory: Directory[];
        Cluster: string;
    }

    export interface DFUXRefDirectoriesQueryResponseEx {
        DFUXRefDirectoriesQueryResult: DFUXRefDirectoriesQueryResult;
    }

    export interface Part {
        Num: string;
        Node: string;
    }

    export interface DFUXRefFile {
        Size: string;
        Partmask: string;
        Modified: Date;
        Numparts: string;
        Part: Part[];
    }

    export interface DFUXRefFoundFilesQueryResult {
        File: DFUXRefFile[];
        Cluster: string;
    }

    export interface XRefNode {
        Name: string;
        Modified: string;
        Status: string;
    }

    export interface DFUXRefListResult {
        XRefNode: XRefNode[];
    }

    export interface DFUXRefListResponseEx {
        DFUXRefListResult: DFUXRefListResult;
    }

    export interface File2 {
        Partslost: string;
        Name: string;
        Partmask: string;
        Modified: Date;
        Numparts: string;
        Part: Part[];
        Cluster: string;
        Size: string;
        Primarylost: string;
        Replicatedlost: string;
    }

    export interface DFUXRefLostFilesQueryResult {
        File: File2[];
        Cluster: string;
    }

    export interface Warning {
        Text: string;
        File: string;
    }

    export interface DFUXRefMessagesQueryResult {
        Warning: Warning[];
        Cluster: string;
    }

    export interface DFUXRefOrphanFilesQueryResult {
        File: DFUXRefFile[];
        Cluster: string;
    }

}

export class DFUXRefService extends DFUXRefServiceBase {

    DFUXRefDirectoriesEx(request: Partial<WsDFUXRef.DFUXRefDirectoriesQueryRequest>): Promise<WsDFUXRefEx.DFUXRefDirectoriesQueryResponseEx> {
        return this._connection.send("DFUXRefDirectories", request, "json", false, undefined, "DFUXRefDirectoriesQueryResponse");
    }

    DFUXRefListEx(request: Partial<WsDFUXRef.DFUXRefListRequest>): Promise<WsDFUXRefEx.DFUXRefListResponseEx> {
        return this._connection.send("DFUXRefList", request, "json", false, undefined, "DFUXRefListResponse");
    }

}
