import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace FileSpray {

    export type int = number;
    export type double = number;
    export type base64Binary = string;
    export type long = number;
    export type dateTime = string;

    export enum DFUWUActions {
        Delete = "Delete",
        Protect = "Protect",
        Unprotect = "Unprotect",
        Restore = "Restore",
        SetToFailed = "SetToFailed",
        Archive = "Archive"
    }

    export interface AbortDFUWorkunit {
        wuid?: string;
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

    export interface AbortDFUWorkunitResponse {
        Exceptions?: Exceptions;
    }

    export interface Copy {
        sourceLogicalName?: string;
        destGroup?: string;
        destGroupRoxie?: string;
        destLogicalName?: string;
        sourceDali?: string;
        srcusername?: string;
        srcpassword?: string;
        overwrite?: boolean;
        ensure?: boolean;
        replicate?: boolean;
        ReplicateOffset?: int;
        maxConnections?: int;
        throttle?: int;
        transferBufferSize?: int;
        nosplit?: boolean;
        norecover?: boolean;
        compress?: boolean;
        Wrap?: boolean;
        Multicopy?: boolean;
        SourceDiffKeyName?: string;
        DestDiffKeyName?: string;
        superCopy?: boolean;
        push?: boolean;
        pull?: boolean;
        ifnewer?: boolean;
        noCommon?: boolean;
        encrypt?: string;
        decrypt?: string;
        preserveCompression?: boolean;
        DFUServerQueue?: string;
        ExpireDays?: int;
        KeyCompression?: string;
    }

    export interface CopyResponse {
        Exceptions?: Exceptions;
        result?: string;
    }

    export interface CreateDFUPublisherWorkunit {
        DFUServerQueue?: string;
    }

    export interface result {
        ID?: string;
        DFUServerName?: string;
        ClusterName?: string;
        JobName?: string;
        Queue?: string;
        User?: string;
        isProtected?: boolean;
        Command?: int;
        CommandMessage?: string;
        PercentDone?: int;
        SecsLeft?: int;
        ProgressMessage?: string;
        SummaryMessage?: string;
        State?: int;
        SourceLogicalName?: string;
        SourceIP?: string;
        SourceFilePath?: string;
        SourceDali?: string;
        SourceRecordSize?: int;
        SourceFormat?: int;
        RowTag?: string;
        SourceNumParts?: int;
        SourceDirectory?: string;
        DestLogicalName?: string;
        DestGroupName?: string;
        DestDirectory?: string;
        DestIP?: string;
        DestFilePath?: string;
        DestFormat?: int;
        DestNumParts?: int;
        DestRecordSize?: int;
        Replicate?: boolean;
        Overwrite?: boolean;
        Compress?: boolean;
        SourceCsvSeparate?: string;
        SourceCsvQuote?: string;
        SourceCsvTerminate?: string;
        SourceCsvEscape?: string;
        TimeStarted?: string;
        TimeStopped?: string;
        StateMessage?: string;
        MonitorEventName?: string;
        MonitorSub?: boolean;
        MonitorShotLimit?: int;
        SourceDiffKeyName?: string;
        DestDiffKeyName?: string;
        Archived?: boolean;
        encrypt?: string;
        decrypt?: string;
        failIfNoSourceFile?: boolean;
        recordStructurePresent?: boolean;
        quotedTerminator?: boolean;
        preserveCompression?: boolean;
        expireDays?: int;
        PreserveFileParts?: boolean;
        FileAccessCost?: double;
        KbPerSecAve?: int;
        KbPerSec?: int;
    }

    export interface CreateDFUPublisherWorkunitResponse {
        Exceptions?: Exceptions;
        result?: result;
    }

    export interface CreateDFUWorkunit {
        DFUServerQueue?: string;
    }

    export interface CreateDFUWorkunitResponse {
        Exceptions?: Exceptions;
        result?: result;
    }

    export interface DFUWUFileRequest {
        Wuid?: string;
        Type?: string;
        PlainText?: string;
    }

    export interface DFUWUFileResponse {
        Exceptions?: Exceptions;
        file?: string;
    }

    export interface DFUWUSearchRequest {

    }

    export interface ClusterNames {
        ClusterName?: string[];
    }

    export interface DFUWUSearchResponse {
        Exceptions?: Exceptions;
        ClusterNames?: ClusterNames;
    }

    export interface wuids {
        Item?: string[];
    }

    export interface DFUWorkunitsActionRequest {
        wuids?: wuids;
        Type?: DFUWUActions;
    }

    export interface DFUActionResult {
        ID?: string;
        Action?: string;
        Result?: string;
    }

    export interface DFUActionResults {
        DFUActionResult?: DFUActionResult[];
    }

    export interface DFUWorkunitsActionResponse {
        Exceptions?: Exceptions;
        FirstColumn?: string;
        DFUActionResults?: DFUActionResults;
    }

    export interface DeleteDFUWorkunit {
        wuid?: string;
    }

    export interface DeleteDFUWorkunitResponse {
        Exceptions?: Exceptions;
        result?: boolean;
    }

    export interface DeleteDFUWorkunits {
        wuids?: wuids;
    }

    export interface DeleteDFUWorkunitsResponse {
        Exceptions?: Exceptions;
    }

    export interface Names {
        Item?: string[];
    }

    export interface DeleteDropZoneFilesRequest {
        DropZoneName?: string;
        NetAddress?: string;
        Path?: string;
        OS?: string;
        Names?: Names;
    }

    export interface Despray {
        destGroup?: string;
        sourceLogicalName?: string;
        destIP?: string;
        destPath?: string;
        destPlane?: string;
        dstxml?: base64Binary;
        overwrite?: boolean;
        maxConnections?: int;
        throttle?: int;
        transferBufferSize?: int;
        splitprefix?: string;
        norecover?: boolean;
        wrap?: boolean;
        multiCopy?: boolean;
        SingleConnection?: boolean;
        DFUServerQueue?: string;
        compress?: boolean;
        encrypt?: string;
        decrypt?: string;
    }

    export interface DesprayResponse {
        Exceptions?: Exceptions;
        wuid?: string;
    }

    export interface DfuMonitorRequest {
        EventName?: string;
        LogicalName?: string;
        Ip?: string;
        Filename?: string;
        Sub?: boolean;
        ShotLimit?: int;
    }

    export interface DfuMonitorResponse {
        Exceptions?: Exceptions;
        wuid?: string;
    }

    export interface DropZoneFileSearchRequest {
        DropZoneName?: string;
        Server?: string;
        ECLWatchVisibleOnly?: boolean;
        NameFilter?: string;
    }

    export interface PhysicalFileStruct {
        name?: string;
        Server?: string;
        isDir?: boolean;
        filesize?: long;
        modifiedtime?: string;
        Path?: string;
        Files?: Files;
    }

    export interface Files {
        PhysicalFileStruct?: PhysicalFileStruct[];
    }

    export interface DropZoneFileSearchResponse {
        Exceptions?: Exceptions;
        Files?: Files;
        Warning?: string;
    }

    export interface DropZoneFilesRequest {
        DropZoneName?: string;
        NetAddress?: string;
        Path?: string;
        OS?: string;
        Subfolder?: string;
        ECLWatchVisibleOnly?: boolean;
        DirectoryOnly?: boolean;
    }

    export interface DropZone {
        Name?: string;
        NetAddress?: string;
        Path?: string;
        Computer?: string;
        Linux?: string;
    }

    export interface DropZones {
        DropZone?: DropZone[];
    }

    export interface DropZoneFilesResponse {
        Exceptions?: Exceptions;
        DropZoneName?: string;
        NetAddress?: string;
        Path?: string;
        OS?: int;
        ECLWatchVisibleOnly?: boolean;
        DropZones?: DropZones;
        Files?: Files;
    }

    export interface EchoDateTime {
        dt?: dateTime;
    }

    export interface EchoDateTimeResponse {
        result?: dateTime;
    }

    export interface FileListRequest {
        DropZoneName?: string;
        Netaddr?: string;
        Path?: string;
        Mask?: string;
        OS?: string;
        DirectoryOnly?: boolean;
    }

    export interface files {
        PhysicalFileStruct?: PhysicalFileStruct[];
    }

    export interface FileListResponse {
        Exceptions?: Exceptions;
        Netaddr?: string;
        Path?: string;
        Mask?: string;
        OS?: int;
        DirectoryOnly?: boolean;
        AcceptLanguage?: string;
        files?: files;
    }

    export interface GetDFUExceptions {
        wuid?: string;
    }

    export interface DFUException {
        Code?: int;
        Message?: string;
    }

    export interface result2 {
        DFUException?: DFUException[];
    }

    export interface GetDFUExceptionsResponse {
        Exceptions?: Exceptions;
        result?: result2;
    }

    export interface ProgressRequest {
        wuid?: string;
    }

    export interface ProgressResponse {
        Exceptions?: Exceptions;
        wuid?: string;
        PercentDone?: int;
        SecsLeft?: int;
        KbPerSecAve?: int;
        KbPerSec?: int;
        SlavesDone?: int;
        TimeTaken?: string;
        ProgressMessage?: string;
        SummaryMessage?: string;
        State?: string;
    }

    export interface GetDFUServerQueuesRequest {
        DFUServerName?: string;
    }

    export interface GetDFUServerQueuesResponse {
        Exceptions?: Exceptions;
        Names?: Names;
    }

    export interface GetDFUWorkunit {
        wuid?: string;
    }

    export interface GetDFUWorkunitResponse {
        Exceptions?: Exceptions;
        result?: result;
        AutoRefresh?: int;
    }

    export interface GetDFUWorkunits {
        Wuid?: string;
        Owner?: string;
        Cluster?: string;
        StateReq?: string;
        Type?: string;
        Jobname?: string;
        PageSize?: long;
        CurrentPage?: int;
        PageStartFrom?: long;
        Sortby?: string;
        Descending?: boolean;
        CacheHint?: long;
        ParentWuid?: string;
        PublisherWuid?: string;
        includeProgressMessages?: boolean;
        includeTimings?: boolean;
        includeTransferRate?: boolean;
    }

    export interface DFUWorkunit {
        ID?: string;
        DFUServerName?: string;
        ClusterName?: string;
        JobName?: string;
        Queue?: string;
        User?: string;
        isProtected?: boolean;
        Command?: int;
        CommandMessage?: string;
        PercentDone?: int;
        SecsLeft?: int;
        ProgressMessage?: string;
        SummaryMessage?: string;
        State?: int;
        SourceLogicalName?: string;
        SourceIP?: string;
        SourceFilePath?: string;
        SourceDali?: string;
        SourceRecordSize?: int;
        SourceFormat?: int;
        RowTag?: string;
        SourceNumParts?: int;
        SourceDirectory?: string;
        DestLogicalName?: string;
        DestGroupName?: string;
        DestDirectory?: string;
        DestIP?: string;
        DestFilePath?: string;
        DestFormat?: int;
        DestNumParts?: int;
        DestRecordSize?: int;
        Replicate?: boolean;
        Overwrite?: boolean;
        Compress?: boolean;
        SourceCsvSeparate?: string;
        SourceCsvQuote?: string;
        SourceCsvTerminate?: string;
        SourceCsvEscape?: string;
        TimeStarted?: string;
        TimeStopped?: string;
        StateMessage?: string;
        MonitorEventName?: string;
        MonitorSub?: boolean;
        MonitorShotLimit?: int;
        SourceDiffKeyName?: string;
        DestDiffKeyName?: string;
        Archived?: boolean;
        encrypt?: string;
        decrypt?: string;
        failIfNoSourceFile?: boolean;
        recordStructurePresent?: boolean;
        quotedTerminator?: boolean;
        preserveCompression?: boolean;
        expireDays?: int;
        PreserveFileParts?: boolean;
        FileAccessCost?: double;
        KbPerSecAve?: int;
        KbPerSec?: int;
    }

    export interface results {
        DFUWorkunit?: DFUWorkunit[];
    }

    export interface GetDFUWorkunitsResponse {
        Exceptions?: Exceptions;
        results?: results;
        Type?: string;
        Owner?: string;
        Cluster?: string;
        StateReq?: string;
        PageSize?: long;
        PrevPage?: long;
        NextPage?: long;
        LastPage?: long;
        NumWUs?: long;
        PageStartFrom?: long;
        PageEndAt?: long;
        First?: boolean;
        Sortby?: string;
        Descending?: boolean;
        BasicQuery?: string;
        Filters?: string;
        CacheHint?: long;
    }

    export interface GetRemoteTargetsRequest {

    }

    export interface TargetNames {
        Item?: string[];
    }

    export interface GetRemoteTargetsResponse {
        Exceptions?: Exceptions;
        TargetNames?: TargetNames;
        AllowForeign?: boolean;
    }

    export interface GetSprayTargetsRequest {

    }

    export interface GroupNode {
        Name?: string;
        ClusterType?: string;
        ReplicateOutputs?: boolean;
    }

    export interface GroupNodes {
        GroupNode?: GroupNode[];
    }

    export interface GetSprayTargetsResponse {
        Exceptions?: Exceptions;
        GroupNodes?: GroupNodes;
    }

    export interface OpenSaveRequest {
        Location?: string;
        Path?: string;
        Name?: string;
        Type?: string;
        DateTime?: string;
        BinaryFile?: boolean;
    }

    export interface OpenSaveResponse {
        Exceptions?: Exceptions;
        Location?: string;
        Path?: string;
        Name?: string;
        Type?: string;
        DateTime?: string;
        Viewable?: boolean;
    }

    export interface FileSprayPingRequest {

    }

    export interface FileSprayPingResponse {

    }

    export interface Rename {
        srcname?: string;
        dstname?: string;
        overwrite?: boolean;
        DFUServerQueue?: string;
    }

    export interface RenameResponse {
        Exceptions?: Exceptions;
        wuid?: string;
    }

    export interface Replicate {
        sourceLogicalName?: string;
        replicateOffset?: int;
        cluster?: string;
        repeatLast?: boolean;
        onlyRepeated?: boolean;
        DFUServerQueue?: string;
    }

    export interface ReplicateResponse {
        Exceptions?: Exceptions;
        wuid?: string;
    }

    export interface ShowResultRequest {
        Result?: string;
    }

    export interface ShowResultResponse {
        Exceptions?: Exceptions;
        Result?: string;
    }

    export interface SprayFixed {
        sourceIP?: string;
        sourcePlane?: string;
        sourcePath?: string;
        srcxml?: base64Binary;
        sourceFormat?: string;
        sourceRecordSize?: int;
        destGroup?: string;
        destLogicalName?: string;
        destNumParts?: int;
        overwrite?: boolean;
        replicate?: boolean;
        ReplicateOffset?: int;
        maxConnections?: int;
        throttle?: int;
        transferBufferSize?: int;
        prefix?: string;
        nosplit?: boolean;
        norecover?: boolean;
        compress?: boolean;
        push?: boolean;
        pull?: boolean;
        noCommon?: boolean;
        encrypt?: string;
        decrypt?: string;
        wrap?: boolean;
        failIfNoSourceFile?: boolean;
        recordStructurePresent?: boolean;
        quotedTerminator?: boolean;
        expireDays?: int;
        DFUServerQueue?: string;
    }

    export interface SprayFixedResponse {
        Exceptions?: Exceptions;
        wuid?: string;
    }

    export interface SprayVariable {
        sourceIP?: string;
        sourcePlane?: string;
        sourcePath?: string;
        srcxml?: base64Binary;
        sourceMaxRecordSize?: int;
        sourceFormat?: int;
        NoSourceCsvSeparator?: boolean;
        sourceCsvSeparate?: string;
        sourceCsvTerminate?: string;
        sourceCsvQuote?: string;
        sourceCsvEscape?: string;
        sourceRowTag?: string;
        destGroup?: string;
        destLogicalName?: string;
        destNumParts?: int;
        overwrite?: boolean;
        replicate?: boolean;
        ReplicateOffset?: int;
        maxConnections?: int;
        throttle?: int;
        transferBufferSize?: int;
        prefix?: string;
        nosplit?: boolean;
        norecover?: boolean;
        compress?: boolean;
        push?: boolean;
        pull?: boolean;
        noCommon?: boolean;
        encrypt?: string;
        decrypt?: string;
        failIfNoSourceFile?: boolean;
        recordStructurePresent?: boolean;
        quotedTerminator?: boolean;
        sourceRowPath?: string;
        isJSON?: boolean;
        expireDays?: int;
        DFUServerQueue?: string;
        srcUsername?: string;
        srcPassword?: string;
    }

    export interface SprayResponse {
        Exceptions?: Exceptions;
        wuid?: string;
    }

    export interface SubmitDFUWorkunit {
        wuid?: string;
    }

    export interface SubmitDFUWorkunitResponse {
        Exceptions?: Exceptions;
    }

    export interface wu {
        ID?: string;
        DFUServerName?: string;
        ClusterName?: string;
        JobName?: string;
        Queue?: string;
        User?: string;
        isProtected?: boolean;
        Command?: int;
        CommandMessage?: string;
        PercentDone?: int;
        SecsLeft?: int;
        ProgressMessage?: string;
        SummaryMessage?: string;
        State?: int;
        SourceLogicalName?: string;
        SourceIP?: string;
        SourceFilePath?: string;
        SourceDali?: string;
        SourceRecordSize?: int;
        SourceFormat?: int;
        RowTag?: string;
        SourceNumParts?: int;
        SourceDirectory?: string;
        DestLogicalName?: string;
        DestGroupName?: string;
        DestDirectory?: string;
        DestIP?: string;
        DestFilePath?: string;
        DestFormat?: int;
        DestNumParts?: int;
        DestRecordSize?: int;
        Replicate?: boolean;
        Overwrite?: boolean;
        Compress?: boolean;
        SourceCsvSeparate?: string;
        SourceCsvQuote?: string;
        SourceCsvTerminate?: string;
        SourceCsvEscape?: string;
        TimeStarted?: string;
        TimeStopped?: string;
        StateMessage?: string;
        MonitorEventName?: string;
        MonitorSub?: boolean;
        MonitorShotLimit?: int;
        SourceDiffKeyName?: string;
        DestDiffKeyName?: string;
        Archived?: boolean;
        encrypt?: string;
        decrypt?: string;
        failIfNoSourceFile?: boolean;
        recordStructurePresent?: boolean;
        quotedTerminator?: boolean;
        preserveCompression?: boolean;
        expireDays?: int;
        PreserveFileParts?: boolean;
        FileAccessCost?: double;
        KbPerSecAve?: int;
        KbPerSec?: int;
    }

    export interface UpdateDFUWorkunit {
        wu?: wu;
        ClusterOrig?: string;
        JobNameOrig?: string;
        isProtectedOrig?: boolean;
        StateOrig?: int;
    }

    export interface UpdateDFUWorkunitResponse {
        Exceptions?: Exceptions;
    }

}

export class FileSprayServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "FileSpray", "1.27");
    }

    AbortDFUWorkunit(request: FileSpray.AbortDFUWorkunit, abortSignal?: AbortSignal): Promise<FileSpray.AbortDFUWorkunitResponse> {
        return this._connection.send("AbortDFUWorkunit", request, "json", false, abortSignal, "AbortDFUWorkunitResponse");
    }

    Copy(request: FileSpray.Copy, abortSignal?: AbortSignal): Promise<FileSpray.CopyResponse> {
        return this._connection.send("Copy", request, "json", false, abortSignal, "CopyResponse");
    }

    CreateDFUPublisherWorkunit(request: FileSpray.CreateDFUPublisherWorkunit, abortSignal?: AbortSignal): Promise<FileSpray.CreateDFUPublisherWorkunitResponse> {
        return this._connection.send("CreateDFUPublisherWorkunit", request, "json", false, abortSignal, "CreateDFUPublisherWorkunitResponse");
    }

    CreateDFUWorkunit(request: FileSpray.CreateDFUWorkunit, abortSignal?: AbortSignal): Promise<FileSpray.CreateDFUWorkunitResponse> {
        return this._connection.send("CreateDFUWorkunit", request, "json", false, abortSignal, "CreateDFUWorkunitResponse");
    }

    DFUWUFile(request: FileSpray.DFUWUFileRequest, abortSignal?: AbortSignal): Promise<FileSpray.DFUWUFileResponse> {
        return this._connection.send("DFUWUFile", request, "json", false, abortSignal, "DFUWUFileResponse");
    }

    DFUWUSearch(request: FileSpray.DFUWUSearchRequest, abortSignal?: AbortSignal): Promise<FileSpray.DFUWUSearchResponse> {
        return this._connection.send("DFUWUSearch", request, "json", false, abortSignal, "DFUWUSearchResponse");
    }

    DFUWorkunitsAction(request: FileSpray.DFUWorkunitsActionRequest, abortSignal?: AbortSignal): Promise<FileSpray.DFUWorkunitsActionResponse> {
        return this._connection.send("DFUWorkunitsAction", request, "json", false, abortSignal, "DFUWorkunitsActionResponse");
    }

    DeleteDFUWorkunit(request: FileSpray.DeleteDFUWorkunit, abortSignal?: AbortSignal): Promise<FileSpray.DeleteDFUWorkunitResponse> {
        return this._connection.send("DeleteDFUWorkunit", request, "json", false, abortSignal, "DeleteDFUWorkunitResponse");
    }

    DeleteDFUWorkunits(request: FileSpray.DeleteDFUWorkunits, abortSignal?: AbortSignal): Promise<FileSpray.DeleteDFUWorkunitsResponse> {
        return this._connection.send("DeleteDFUWorkunits", request, "json", false, abortSignal, "DeleteDFUWorkunitsResponse");
    }

    DeleteDropZoneFiles(request: FileSpray.DeleteDropZoneFilesRequest, abortSignal?: AbortSignal): Promise<FileSpray.DFUWorkunitsActionResponse> {
        return this._connection.send("DeleteDropZoneFiles", request, "json", false, abortSignal, "DFUWorkunitsActionResponse");
    }

    Despray(request: FileSpray.Despray, abortSignal?: AbortSignal): Promise<FileSpray.DesprayResponse> {
        return this._connection.send("Despray", request, "json", false, abortSignal, "DesprayResponse");
    }

    DfuMonitor(request: FileSpray.DfuMonitorRequest, abortSignal?: AbortSignal): Promise<FileSpray.DfuMonitorResponse> {
        return this._connection.send("DfuMonitor", request, "json", false, abortSignal, "DfuMonitorResponse");
    }

    DropZoneFileSearch(request: FileSpray.DropZoneFileSearchRequest, abortSignal?: AbortSignal): Promise<FileSpray.DropZoneFileSearchResponse> {
        return this._connection.send("DropZoneFileSearch", request, "json", false, abortSignal, "DropZoneFileSearchResponse");
    }

    DropZoneFiles(request: FileSpray.DropZoneFilesRequest, abortSignal?: AbortSignal): Promise<FileSpray.DropZoneFilesResponse> {
        return this._connection.send("DropZoneFiles", request, "json", false, abortSignal, "DropZoneFilesResponse");
    }

    EchoDateTime(request: FileSpray.EchoDateTime, abortSignal?: AbortSignal): Promise<FileSpray.EchoDateTimeResponse> {
        return this._connection.send("EchoDateTime", request, "json", false, abortSignal, "EchoDateTimeResponse");
    }

    FileList(request: FileSpray.FileListRequest, abortSignal?: AbortSignal): Promise<FileSpray.FileListResponse> {
        return this._connection.send("FileList", request, "json", false, abortSignal, "FileListResponse");
    }

    GetDFUExceptions(request: FileSpray.GetDFUExceptions, abortSignal?: AbortSignal): Promise<FileSpray.GetDFUExceptionsResponse> {
        return this._connection.send("GetDFUExceptions", request, "json", false, abortSignal, "GetDFUExceptionsResponse");
    }

    GetDFUProgress(request: FileSpray.ProgressRequest, abortSignal?: AbortSignal): Promise<FileSpray.ProgressResponse> {
        return this._connection.send("GetDFUProgress", request, "json", false, abortSignal, "ProgressResponse");
    }

    GetDFUServerQueues(request: FileSpray.GetDFUServerQueuesRequest, abortSignal?: AbortSignal): Promise<FileSpray.GetDFUServerQueuesResponse> {
        return this._connection.send("GetDFUServerQueues", request, "json", false, abortSignal, "GetDFUServerQueuesResponse");
    }

    GetDFUWorkunit(request: FileSpray.GetDFUWorkunit, abortSignal?: AbortSignal): Promise<FileSpray.GetDFUWorkunitResponse> {
        return this._connection.send("GetDFUWorkunit", request, "json", false, abortSignal, "GetDFUWorkunitResponse");
    }

    GetDFUWorkunits(request: FileSpray.GetDFUWorkunits, abortSignal?: AbortSignal): Promise<FileSpray.GetDFUWorkunitsResponse> {
        return this._connection.send("GetDFUWorkunits", request, "json", false, abortSignal, "GetDFUWorkunitsResponse");
    }

    GetRemoteTargets(request: FileSpray.GetRemoteTargetsRequest, abortSignal?: AbortSignal): Promise<FileSpray.GetRemoteTargetsResponse> {
        return this._connection.send("GetRemoteTargets", request, "json", false, abortSignal, "GetRemoteTargetsResponse");
    }

    GetSprayTargets(request: FileSpray.GetSprayTargetsRequest, abortSignal?: AbortSignal): Promise<FileSpray.GetSprayTargetsResponse> {
        return this._connection.send("GetSprayTargets", request, "json", false, abortSignal, "GetSprayTargetsResponse");
    }

    OpenSave(request: FileSpray.OpenSaveRequest, abortSignal?: AbortSignal): Promise<FileSpray.OpenSaveResponse> {
        return this._connection.send("OpenSave", request, "json", false, abortSignal, "OpenSaveResponse");
    }

    Ping(request: FileSpray.FileSprayPingRequest, abortSignal?: AbortSignal): Promise<FileSpray.FileSprayPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "FileSprayPingResponse");
    }

    Rename(request: FileSpray.Rename, abortSignal?: AbortSignal): Promise<FileSpray.RenameResponse> {
        return this._connection.send("Rename", request, "json", false, abortSignal, "RenameResponse");
    }

    Replicate(request: FileSpray.Replicate, abortSignal?: AbortSignal): Promise<FileSpray.ReplicateResponse> {
        return this._connection.send("Replicate", request, "json", false, abortSignal, "ReplicateResponse");
    }

    ShowResult(request: FileSpray.ShowResultRequest, abortSignal?: AbortSignal): Promise<FileSpray.ShowResultResponse> {
        return this._connection.send("ShowResult", request, "json", false, abortSignal, "ShowResultResponse");
    }

    SprayFixed(request: FileSpray.SprayFixed, abortSignal?: AbortSignal): Promise<FileSpray.SprayFixedResponse> {
        return this._connection.send("SprayFixed", request, "json", false, abortSignal, "SprayFixedResponse");
    }

    SprayVariable(request: FileSpray.SprayVariable, abortSignal?: AbortSignal): Promise<FileSpray.SprayResponse> {
        return this._connection.send("SprayVariable", request, "json", false, abortSignal, "SprayResponse");
    }

    SubmitDFUWorkunit(request: FileSpray.SubmitDFUWorkunit, abortSignal?: AbortSignal): Promise<FileSpray.SubmitDFUWorkunitResponse> {
        return this._connection.send("SubmitDFUWorkunit", request, "json", false, abortSignal, "SubmitDFUWorkunitResponse");
    }

    UpdateDFUWorkunit(request: FileSpray.UpdateDFUWorkunit, abortSignal?: AbortSignal): Promise<FileSpray.UpdateDFUWorkunitResponse> {
        return this._connection.send("UpdateDFUWorkunit", request, "json", false, abortSignal, "UpdateDFUWorkunitResponse");
    }

}
