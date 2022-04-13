import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

type int = number;

export namespace WsPackageProcess {

export interface ActivatePackageRequest {
    Target?: string;
    PackageMap?: string;
    Process?: string;
    GlobalScope?: boolean;
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

export interface status {
    Code: int;
    Description: string;
}

export interface ActivatePackageResponse {
    Exceptions: {
        Source: string;
        Exception: Exception[];
    };
    status: {
        Code: int;
        Description: string;
    };
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
}

export interface FilesNotFound {
    File: string[];
}

export interface AddPackageResponse {
    Exceptions: Exceptions;
    status: status;
    FilesNotFound: {
        File: string[];
    };
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
}

export interface AddPartToPackageMapResponse {
    Exceptions: Exceptions;
    status: status;
    FilesNotFound: FilesNotFound;
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
}

export interface CopyPackageMapResponse {
    Exceptions: Exceptions;
    status: status;
    FilesNotFound: FilesNotFound;
}

export interface DeActivatePackageRequest {
    Target?: string;
    PackageMap?: string;
    Process?: string;
    GlobalScope?: boolean;
}

export interface DeActivatePackageResponse {
    Exceptions: Exceptions;
    status: status;
}

export interface PackageMap {
    Id: string;
    Target: string;
    Process: string;
}

export interface PackageMaps {
    PackageMap: PackageMap[];
}

export interface DeletePackageRequest {
    Target?: string;
    PackageMap?: string;
    Process?: string;
    GlobalScope?: boolean;
    PackageMaps?: {
        PackageMap?: PackageMap[];
    };
}

export interface DeletePackageResponse {
    Exceptions: Exceptions;
    status: status;
}

export interface EchoRequest {
    Request?: string;
}

export interface EchoResponse {
    Response: string;
}

export interface GetPackageRequest {
    Target?: string;
    Process?: string;
}

export interface GetPackageResponse {
    Exceptions: Exceptions;
    status: status;
    Info: string;
}

export interface GetPackageMapByIdRequest {
    PackageMapId?: string;
}

export interface GetPackageMapByIdResponse {
    Exceptions: Exceptions;
    status: status;
    Info: string;
}

export interface GetPackageMapSelectOptionsRequest {
    IncludeTargets?: boolean;
    IncludeProcesses?: boolean;
    IncludeProcessFilters?: boolean;
}

export interface Processes {
    Item: string[];
}

export interface TargetData {
    Name: string;
    Type: string;
    Processes: {
        Item: string[];
    };
}

export interface Targets {
    TargetData: TargetData[];
}

export interface ProcessFilters {
    Item: string[];
}

export interface GetPackageMapSelectOptionsResponse {
    Exceptions: Exceptions;
    status: status;
    Targets: {
        TargetData: TargetData[];
    };
    ProcessFilters: {
        Item: string[];
    };
}

export interface GetPartFromPackageMapRequest {
    Target?: string;
    PackageMap?: string;
    GlobalScope?: boolean;
    PartName?: string;
}

export interface GetPartFromPackageMapResponse {
    Exceptions: Exceptions;
    status: status;
    Content: string;
}

export interface GetQueryFileMappingRequest {
    Target?: string;
    PMID?: string;
    QueryName?: string;
    GlobalScope?: boolean;
}

export interface UnmappedFiles {
    File: string[];
}

export interface SubFiles {
    File: string[];
}

export interface SuperFile {
    Name: string;
    SubFiles: {
        File: string[];
    };
}

export interface SuperFiles {
    SuperFile: SuperFile[];
}

export interface GetQueryFileMappingResponse {
    Exceptions: Exceptions;
    UnmappedFiles: {
        File: string[];
    };
    SuperFiles: {
        SuperFile: SuperFile[];
    };
}

export interface ListPackageRequest {
    Target?: string;
    Process?: string;
}

export interface PackageListData {
    Id: string;
    Queries: string;
}

export interface PkgListData {
    PackageListData: PackageListData[];
}

export interface PackageListMapData {
    Id: string;
    Target: string;
    Process: string;
    PkgListData: {
        PackageListData: PackageListData[];
    };
    Active: boolean;
    Description: string;
}

export interface PkgListMapData {
    PackageListMapData: PackageListMapData[];
}

export interface ListPackageResponse {
    Exceptions: Exceptions;
    status: status;
    PkgListMapData: {
        PackageListMapData: PackageListMapData[];
    };
}

export interface ListPackagesRequest {
    Target?: string;
    Process?: string;
    ProcessFilter?: string;
}

export interface PackageMapList {
    PackageListMapData: PackageListMapData[];
}

export interface ListPackagesResponse {
    Exceptions: Exceptions;
    status: status;
    PackageMapList: {
        PackageListMapData: PackageListMapData[];
    };
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
    Exceptions: Exceptions;
    status: status;
}

export interface QueriesToVerify {
    Item: string[];
}

export interface QueriesToIgnore {
    Item: string[];
}

export interface ValidatePackageRequest {
    Info?: string;
    Target?: string;
    Process?: string;
    Active?: boolean;
    PMID?: string;
    QueryIdToVerify?: string;
    QueriesToVerify?: {
        Item?: string[];
    };
    QueriesToIgnore?: {
        Item?: string[];
    };
    CheckDFS?: boolean;
    GlobalScope?: boolean;
    IgnoreWarnings?: boolean;
    IgnoreOptionalFiles?: boolean;
}

export interface Warnings {
    Item: string[];
}

export interface Errors {
    Item: string[];
}

export interface Unmatched {
    Item: string[];
}

export interface packages {
    Unmatched: {
        Item: string[];
    };
}

export interface queries {
    Unmatched: Unmatched;
}

export interface NotInDFS {
    File: string[];
}

export interface files {
    Unmatched: Unmatched;
    NotInDFS: {
        File: string[];
    };
}

export interface Result {
    Target: string;
    PMID: string;
    Warnings: {
        Item: string[];
    };
    Errors: {
        Item: string[];
    };
    packages: {
        Unmatched: {
            Item: string[];
        };
    };
    queries: {
        Unmatched: Unmatched;
    };
    files: {
        Unmatched: Unmatched;
        NotInDFS: {
            File: string[];
        };
    };
}

export interface Results {
    Result: Result[];
}

export interface ValidatePackageResponse {
    Exceptions: Exceptions;
    Results: {
        Result: Result[];
    };
}

}

export class PackageProcessServiceBase extends Service {

constructor(optsConnection: IOptions | IConnection) {
super(optsConnection, "WsPackageProcess", "1.04");
}

ActivatePackage(request: WsPackageProcess.ActivatePackageRequest): Promise<WsPackageProcess.ActivatePackageResponse> {
	return this._connection.send("ActivatePackage", request);
}

AddPackage(request: WsPackageProcess.AddPackageRequest): Promise<WsPackageProcess.AddPackageResponse> {
	return this._connection.send("AddPackage", request);
}

AddPartToPackageMap(request: WsPackageProcess.AddPartToPackageMapRequest): Promise<WsPackageProcess.AddPartToPackageMapResponse> {
	return this._connection.send("AddPartToPackageMap", request);
}

CopyPackageMap(request: WsPackageProcess.CopyPackageMapRequest): Promise<WsPackageProcess.CopyPackageMapResponse> {
	return this._connection.send("CopyPackageMap", request);
}

DeActivatePackage(request: WsPackageProcess.DeActivatePackageRequest): Promise<WsPackageProcess.DeActivatePackageResponse> {
	return this._connection.send("DeActivatePackage", request);
}

DeletePackage(request: WsPackageProcess.DeletePackageRequest): Promise<WsPackageProcess.DeletePackageResponse> {
	return this._connection.send("DeletePackage", request);
}

Echo(request: WsPackageProcess.EchoRequest): Promise<WsPackageProcess.EchoResponse> {
	return this._connection.send("Echo", request);
}

GetPackage(request: WsPackageProcess.GetPackageRequest): Promise<WsPackageProcess.GetPackageResponse> {
	return this._connection.send("GetPackage", request);
}

GetPackageMapById(request: WsPackageProcess.GetPackageMapByIdRequest): Promise<WsPackageProcess.GetPackageMapByIdResponse> {
	return this._connection.send("GetPackageMapById", request);
}

GetPackageMapSelectOptions(request: WsPackageProcess.GetPackageMapSelectOptionsRequest): Promise<WsPackageProcess.GetPackageMapSelectOptionsResponse> {
	return this._connection.send("GetPackageMapSelectOptions", request);
}

GetPartFromPackageMap(request: WsPackageProcess.GetPartFromPackageMapRequest): Promise<WsPackageProcess.GetPartFromPackageMapResponse> {
	return this._connection.send("GetPartFromPackageMap", request);
}

GetQueryFileMapping(request: WsPackageProcess.GetQueryFileMappingRequest): Promise<WsPackageProcess.GetQueryFileMappingResponse> {
	return this._connection.send("GetQueryFileMapping", request);
}

ListPackage(request: WsPackageProcess.ListPackageRequest): Promise<WsPackageProcess.ListPackageResponse> {
	return this._connection.send("ListPackage", request);
}

ListPackages(request: WsPackageProcess.ListPackagesRequest): Promise<WsPackageProcess.ListPackagesResponse> {
	return this._connection.send("ListPackages", request);
}

Ping(request: WsPackageProcess.WsPackageProcessPingRequest): Promise<WsPackageProcess.WsPackageProcessPingResponse> {
	return this._connection.send("Ping", request);
}

RemovePartFromPackageMap(request: WsPackageProcess.RemovePartFromPackageMapRequest): Promise<WsPackageProcess.RemovePartFromPackageMapResponse> {
	return this._connection.send("RemovePartFromPackageMap", request);
}

ValidatePackage(request: WsPackageProcess.ValidatePackageRequest): Promise<WsPackageProcess.ValidatePackageResponse> {
	return this._connection.send("ValidatePackage", request);
}

}
