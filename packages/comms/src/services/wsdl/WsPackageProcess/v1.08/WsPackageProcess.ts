import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsPackageProcess {

    export type int = number;
    export type nonNegativeInteger = number;

    export interface ActivatePackageRequest {
        Target?: string;
        PackageMap?: string;
        Process?: string;
        GlobalScope?: boolean;
    }

    export interface Exception {
        Code?: string;
        Audience?: string;
        Source?: string;
        Message?: string;
    }

    export interface Exceptions {
        Source?: string;
        Exception?: Exception[];
    }

    export interface status {
        Code?: int;
        Description?: string;
    }

    export interface ActivatePackageResponse {
        Exceptions?: Exceptions;
        status?: status;
    }

    export interface AddPackageRequest {
        Info?: string;
        Activate?: boolean;
        OverWrite?: boolean;
        Target?: string;
        PackageMap?: string;
        Process?: string;
        DaliIp?: string;
        GlobalScope?: boolean;
        SourceProcess?: string;
        AllowForeignFiles?: boolean;
        PreloadAllPackages?: boolean;
        ReplacePackageMap?: boolean;
        UpdateSuperFiles?: boolean;
        UpdateCloneFrom?: boolean;
        AppendCluster?: boolean;
        DfuCopyFiles?: boolean;
        DfuQueue?: string;
        DfuWait?: nonNegativeInteger;
        DfuOverwrite?: boolean;
        OnlyCopyFiles?: boolean;
        StopIfFilesCopied?: boolean;
        DfuPublisherWuid?: string;
        RemoteStorage?: string;
        KeyCompression?: string;
        DfuTargetPlane?: string;
    }

    export interface FilesNotFound {
        File?: string[];
    }

    export interface AddPackageResponse {
        Exceptions?: Exceptions;
        status?: status;
        FilesNotFound?: FilesNotFound;
        DfuPublisherWuid?: string;
        DfuPublisherState?: string;
    }

    export interface AddPartToPackageMapRequest {
        Target?: string;
        Process?: string;
        PackageMap?: string;
        GlobalScope?: boolean;
        PartName?: string;
        Content?: string;
        DeletePrevious?: boolean;
        DaliIp?: string;
        SourceProcess?: string;
        AllowForeignFiles?: boolean;
        PreloadAllPackages?: boolean;
        UpdateSuperFiles?: boolean;
        UpdateCloneFrom?: boolean;
        AppendCluster?: boolean;
        DfuCopyFiles?: boolean;
        DfuQueue?: string;
        DfuWait?: nonNegativeInteger;
        DfuOverwrite?: boolean;
        OnlyCopyFiles?: boolean;
        StopIfFilesCopied?: boolean;
        DfuPublisherWuid?: string;
        RemoteStorage?: string;
        KeyCompression?: string;
        DfuTargetPlane?: string;
    }

    export interface AddPartToPackageMapResponse {
        Exceptions?: Exceptions;
        status?: status;
        FilesNotFound?: FilesNotFound;
        DfuPublisherWuid?: string;
        DfuPublisherState?: string;
    }

    export interface CopyPackageMapRequest {
        SourcePath?: string;
        RemoteUserName?: string;
        RemotePassword?: string;
        Target?: string;
        Process?: string;
        PMID?: string;
        Activate?: boolean;
        DaliIp?: string;
        GlobalScope?: boolean;
        SourceProcess?: string;
        PreloadAllPackages?: boolean;
        ReplacePackageMap?: boolean;
        UpdateSuperFiles?: boolean;
        UpdateCloneFrom?: boolean;
        AppendCluster?: boolean;
        DfuCopyFiles?: boolean;
        DfuQueue?: string;
        DfuWait?: nonNegativeInteger;
        DfuOverwrite?: boolean;
        OnlyCopyFiles?: boolean;
        StopIfFilesCopied?: boolean;
        DfuPublisherWuid?: string;
        RemoteStorage?: string;
        KeyCompression?: string;
        DfuTargetPlane?: string;
    }

    export interface CopyPackageMapResponse {
        Exceptions?: Exceptions;
        status?: status;
        FilesNotFound?: FilesNotFound;
        DfuPublisherWuid?: string;
        DfuPublisherState?: string;
    }

    export interface DeActivatePackageRequest {
        Target?: string;
        PackageMap?: string;
        Process?: string;
        GlobalScope?: boolean;
    }

    export interface DeActivatePackageResponse {
        Exceptions?: Exceptions;
        status?: status;
    }

    export interface PackageMap {
        Id?: string;
        Target?: string;
        Process?: string;
    }

    export interface PackageMaps {
        PackageMap?: PackageMap[];
    }

    export interface DeletePackageRequest {
        Target?: string;
        PackageMap?: string;
        Process?: string;
        GlobalScope?: boolean;
        PackageMaps?: PackageMaps;
    }

    export interface DeletePackageResponse {
        Exceptions?: Exceptions;
        status?: status;
    }

    export interface EchoRequest {
        Request?: string;
    }

    export interface EchoResponse {
        Response?: string;
    }

    export interface GetPackageRequest {
        Target?: string;
        Process?: string;
    }

    export interface GetPackageResponse {
        Exceptions?: Exceptions;
        status?: status;
        Info?: string;
    }

    export interface GetPackageMapByIdRequest {
        PackageMapId?: string;
    }

    export interface GetPackageMapByIdResponse {
        Exceptions?: Exceptions;
        status?: status;
        Info?: string;
    }

    export interface GetPackageMapSelectOptionsRequest {
        IncludeTargets?: boolean;
        IncludeProcesses?: boolean;
        IncludeProcessFilters?: boolean;
    }

    export interface Processes {
        Item?: string[];
    }

    export interface TargetData {
        Name?: string;
        Type?: string;
        Processes?: Processes;
    }

    export interface Targets {
        TargetData?: TargetData[];
    }

    export interface ProcessFilters {
        Item?: string[];
    }

    export interface GetPackageMapSelectOptionsResponse {
        Exceptions?: Exceptions;
        status?: status;
        Targets?: Targets;
        ProcessFilters?: ProcessFilters;
    }

    export interface GetPartFromPackageMapRequest {
        Target?: string;
        PackageMap?: string;
        GlobalScope?: boolean;
        PartName?: string;
    }

    export interface GetPartFromPackageMapResponse {
        Exceptions?: Exceptions;
        status?: status;
        Content?: string;
    }

    export interface GetQueryFileMappingRequest {
        Target?: string;
        PMID?: string;
        QueryName?: string;
        GlobalScope?: boolean;
    }

    export interface UnmappedFiles {
        File?: string[];
    }

    export interface SubFiles {
        File?: string[];
    }

    export interface SuperFile {
        Name?: string;
        SubFiles?: SubFiles;
    }

    export interface SuperFiles {
        SuperFile?: SuperFile[];
    }

    export interface GetQueryFileMappingResponse {
        Exceptions?: Exceptions;
        UnmappedFiles?: UnmappedFiles;
        SuperFiles?: SuperFiles;
    }

    export interface ListPackageRequest {
        Target?: string;
        Process?: string;
    }

    export interface PackageListData {
        Id?: string;
        Queries?: string;
    }

    export interface PkgListData {
        PackageListData?: PackageListData[];
    }

    export interface PackageListMapData {
        Id?: string;
        Target?: string;
        Process?: string;
        PkgListData?: PkgListData;
        Active?: boolean;
        Description?: string;
    }

    export interface PkgListMapData {
        PackageListMapData?: PackageListMapData[];
    }

    export interface ListPackageResponse {
        Exceptions?: Exceptions;
        status?: status;
        PkgListMapData?: PkgListMapData;
    }

    export interface ListPackagesRequest {
        Target?: string;
        Process?: string;
        ProcessFilter?: string;
    }

    export interface PackageMapList {
        PackageListMapData?: PackageListMapData[];
    }

    export interface ListPackagesResponse {
        Exceptions?: Exceptions;
        status?: status;
        PackageMapList?: PackageMapList;
    }

    export interface WsPackageProcessPingRequest {

    }

    export interface WsPackageProcessPingResponse {

    }

    export interface RemovePartFromPackageMapRequest {
        Target?: string;
        PackageMap?: string;
        GlobalScope?: boolean;
        PartName?: string;
    }

    export interface RemovePartFromPackageMapResponse {
        Exceptions?: Exceptions;
        status?: status;
    }

    export interface QueriesToVerify {
        Item?: string[];
    }

    export interface QueriesToIgnore {
        Item?: string[];
    }

    export interface ValidatePackageRequest {
        Info?: string;
        Target?: string;
        Process?: string;
        Active?: boolean;
        PMID?: string;
        QueryIdToVerify?: string;
        QueriesToVerify?: QueriesToVerify;
        QueriesToIgnore?: QueriesToIgnore;
        CheckDFS?: boolean;
        GlobalScope?: boolean;
        IgnoreWarnings?: boolean;
        IgnoreOptionalFiles?: boolean;
    }

    export interface Warnings {
        Item?: string[];
    }

    export interface Errors {
        Item?: string[];
    }

    export interface Unmatched {
        Item?: string[];
    }

    export interface packages {
        Unmatched?: Unmatched;
    }

    export interface queries {
        Unmatched?: Unmatched;
    }

    export interface NotInDFS {
        File?: string[];
    }

    export interface files {
        Unmatched?: Unmatched;
        NotInDFS?: NotInDFS;
    }

    export interface Result {
        Target?: string;
        PMID?: string;
        Warnings?: Warnings;
        Errors?: Errors;
        packages?: packages;
        queries?: queries;
        files?: files;
    }

    export interface Results {
        Result?: Result[];
    }

    export interface ValidatePackageResponse {
        Exceptions?: Exceptions;
        Results?: Results;
    }

}

export class PackageProcessServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsPackageProcess", "1.08");
    }

    ActivatePackage(request: WsPackageProcess.ActivatePackageRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.ActivatePackageResponse> {
        return this._connection.send("ActivatePackage", request, "json", false, abortSignal, "ActivatePackageResponse");
    }

    AddPackage(request: WsPackageProcess.AddPackageRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.AddPackageResponse> {
        return this._connection.send("AddPackage", request, "json", false, abortSignal, "AddPackageResponse");
    }

    AddPartToPackageMap(request: WsPackageProcess.AddPartToPackageMapRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.AddPartToPackageMapResponse> {
        return this._connection.send("AddPartToPackageMap", request, "json", false, abortSignal, "AddPartToPackageMapResponse");
    }

    CopyPackageMap(request: WsPackageProcess.CopyPackageMapRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.CopyPackageMapResponse> {
        return this._connection.send("CopyPackageMap", request, "json", false, abortSignal, "CopyPackageMapResponse");
    }

    DeActivatePackage(request: WsPackageProcess.DeActivatePackageRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.DeActivatePackageResponse> {
        return this._connection.send("DeActivatePackage", request, "json", false, abortSignal, "DeActivatePackageResponse");
    }

    DeletePackage(request: WsPackageProcess.DeletePackageRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.DeletePackageResponse> {
        return this._connection.send("DeletePackage", request, "json", false, abortSignal, "DeletePackageResponse");
    }

    Echo(request: WsPackageProcess.EchoRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.EchoResponse> {
        return this._connection.send("Echo", request, "json", false, abortSignal, "EchoResponse");
    }

    GetPackage(request: WsPackageProcess.GetPackageRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.GetPackageResponse> {
        return this._connection.send("GetPackage", request, "json", false, abortSignal, "GetPackageResponse");
    }

    GetPackageMapById(request: WsPackageProcess.GetPackageMapByIdRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.GetPackageMapByIdResponse> {
        return this._connection.send("GetPackageMapById", request, "json", false, abortSignal, "GetPackageMapByIdResponse");
    }

    GetPackageMapSelectOptions(request: WsPackageProcess.GetPackageMapSelectOptionsRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.GetPackageMapSelectOptionsResponse> {
        return this._connection.send("GetPackageMapSelectOptions", request, "json", false, abortSignal, "GetPackageMapSelectOptionsResponse");
    }

    GetPartFromPackageMap(request: WsPackageProcess.GetPartFromPackageMapRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.GetPartFromPackageMapResponse> {
        return this._connection.send("GetPartFromPackageMap", request, "json", false, abortSignal, "GetPartFromPackageMapResponse");
    }

    GetQueryFileMapping(request: WsPackageProcess.GetQueryFileMappingRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.GetQueryFileMappingResponse> {
        return this._connection.send("GetQueryFileMapping", request, "json", false, abortSignal, "GetQueryFileMappingResponse");
    }

    ListPackage(request: WsPackageProcess.ListPackageRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.ListPackageResponse> {
        return this._connection.send("ListPackage", request, "json", false, abortSignal, "ListPackageResponse");
    }

    ListPackages(request: WsPackageProcess.ListPackagesRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.ListPackagesResponse> {
        return this._connection.send("ListPackages", request, "json", false, abortSignal, "ListPackagesResponse");
    }

    Ping(request: WsPackageProcess.WsPackageProcessPingRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.WsPackageProcessPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "WsPackageProcessPingResponse");
    }

    RemovePartFromPackageMap(request: WsPackageProcess.RemovePartFromPackageMapRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.RemovePartFromPackageMapResponse> {
        return this._connection.send("RemovePartFromPackageMap", request, "json", false, abortSignal, "RemovePartFromPackageMapResponse");
    }

    ValidatePackage(request: WsPackageProcess.ValidatePackageRequest, abortSignal?: AbortSignal): Promise<WsPackageProcess.ValidatePackageResponse> {
        return this._connection.send("ValidatePackage", request, "json", false, abortSignal, "ValidatePackageResponse");
    }

}
