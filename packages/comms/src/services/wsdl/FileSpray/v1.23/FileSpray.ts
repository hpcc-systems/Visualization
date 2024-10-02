import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

type int = number;
type double = number;
type base64Binary = string;
type long = number;
type dateTime = string;

export enum DFUWUActions {
    Delete = "Delete",
    Protect = "Protect",
    Unprotect = "Unprotect",
    Restore = "Restore",
    SetToFailed = "SetToFailed",
    Archive = "Archive"
}

export namespace FileSpray {

    export interface AbortDFUWorkunit {
        wuid: string;
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

    export interface AbortDFUWorkunitResponse {
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
    }

    export interface Copy {
        sourceLogicalName: string;
        destGroup: string;
        destGroupRoxie: string;
        destLogicalName: string;
        sourceDali: string;
        srcusername: string;
        srcpassword: string;
        overwrite: boolean;
        replicate: boolean;
        ReplicateOffset: int;
        maxConnections: int;
        throttle: int;
        transferBufferSize: int;
        nosplit: boolean;
        norecover: boolean;
        compress: boolean;
        Wrap: boolean;
        Multicopy: boolean;
        SourceDiffKeyName: string;
        DestDiffKeyName: string;
        superCopy: boolean;
        push: boolean;
        pull: boolean;
        ifnewer: boolean;
        noCommon: boolean;
        encrypt: string;
        decrypt: string;
        preserveCompression: boolean;
        DFUServerQueue: string;
        ExpireDays: int;
    }

    export interface CopyResponse {
        Exceptions: Exceptions;
        result: string;
    }

    export interface CreateDFUWorkunit {
        DFUServerQueue: string;
    }

    export interface result {
        ID: string;
        DFUServerName: string;
        ClusterName: string;
        JobName: string;
        Queue: string;
        User: string;
        isProtected: boolean;
        Command: int;
        CommandMessage: string;
        PercentDone: int;
        SecsLeft: int;
        ProgressMessage: string;
        SummaryMessage: string;
        State: int;
        SourceLogicalName: string;
        SourceIP: string;
        SourceFilePath: string;
        SourceDali: string;
        SourceRecordSize: int;
        SourceFormat: int;
        RowTag: string;
        SourceNumParts: int;
        SourceDirectory: string;
        DestLogicalName: string;
        DestGroupName: string;
        DestDirectory: string;
        DestIP: string;
        DestFilePath: string;
        DestFormat: int;
        DestNumParts: int;
        DestRecordSize: int;
        Replicate: boolean;
        Overwrite: boolean;
        Compress: boolean;
        SourceCsvSeparate: string;
        SourceCsvQuote: string;
        SourceCsvTerminate: string;
        SourceCsvEscape: string;
        TimeStarted: string;
        TimeStopped: string;
        StateMessage: string;
        MonitorEventName: string;
        MonitorSub: boolean;
        MonitorShotLimit: int;
        SourceDiffKeyName: string;
        DestDiffKeyName: string;
        Archived: boolean;
        encrypt: string;
        decrypt: string;
        failIfNoSourceFile: boolean;
        recordStructurePresent: boolean;
        quotedTerminator: boolean;
        preserveCompression: boolean;
        expireDays: int;
        PreserveFileParts: boolean;
        FileAccessCost: double;
    }

    export interface CreateDFUWorkunitResponse {
        Exceptions: Exceptions;
        result: {
            ID: string;
            DFUServerName: string;
            ClusterName: string;
            JobName: string;
            Queue: string;
            User: string;
            isProtected: boolean;
            Command: int;
            CommandMessage: string;
            PercentDone: int;
            SecsLeft: int;
            ProgressMessage: string;
            SummaryMessage: string;
            State: int;
            SourceLogicalName: string;
            SourceIP: string;
            SourceFilePath: string;
            SourceDali: string;
            SourceRecordSize: int;
            SourceFormat: int;
            RowTag: string;
            SourceNumParts: int;
            SourceDirectory: string;
            DestLogicalName: string;
            DestGroupName: string;
            DestDirectory: string;
            DestIP: string;
            DestFilePath: string;
            DestFormat: int;
            DestNumParts: int;
            DestRecordSize: int;
            Replicate: boolean;
            Overwrite: boolean;
            Compress: boolean;
            SourceCsvSeparate: string;
            SourceCsvQuote: string;
            SourceCsvTerminate: string;
            SourceCsvEscape: string;
            TimeStarted: string;
            TimeStopped: string;
            StateMessage: string;
            MonitorEventName: string;
            MonitorSub: boolean;
            MonitorShotLimit: int;
            SourceDiffKeyName: string;
            DestDiffKeyName: string;
            Archived: boolean;
            encrypt: string;
            decrypt: string;
            failIfNoSourceFile: boolean;
            recordStructurePresent: boolean;
            quotedTerminator: boolean;
            preserveCompression: boolean;
            expireDays: int;
            PreserveFileParts: boolean;
            FileAccessCost: double;
        };
    }

    export interface DFUWUFileRequest {
        Wuid?: string;
        Type?: string;
        PlainText?: string;
    }

    export interface DFUWUFileResponse {
        Exceptions: Exceptions;
        file: string;
    }

    export interface DFUWUSearchRequest {

    }

    export interface ClusterNames {
        ClusterName: string[];
    }

    export interface DFUWUSearchResponse {
        Exceptions: Exceptions;
        ClusterNames: {
            ClusterName: string[];
        };
    }

    export interface wuids {
        Item: string[];
    }

    export interface DFUWorkunitsActionRequest {
        wuids?: {
            Item?: string[];
        };
        Type?: DFUWUActions;
    }

    export interface DFUActionResult {
        ID: string;
        Action: string;
        Result: string;
    }

    export interface DFUActionResults {
        DFUActionResult: DFUActionResult[];
    }

    export interface DFUWorkunitsActionResponse {
        Exceptions: Exceptions;
        FirstColumn: string;
        DFUActionResults: {
            DFUActionResult: DFUActionResult[];
        };
    }

    export interface DeleteDFUWorkunit {
        wuid: string;
    }

    export interface DeleteDFUWorkunitResponse {
        Exceptions: Exceptions;
        result: boolean;
    }

    export interface DeleteDFUWorkunits {
        wuids: wuids;
    }

    export interface DeleteDFUWorkunitsResponse {
        Exceptions: Exceptions;
    }

    export interface Names {
        Item: string[];
    }

    export interface DeleteDropZoneFilesRequest {
        DropZoneName?: string;
        NetAddress?: string;
        Path?: string;
        OS?: string;
        Names?: {
            Item?: string[];
        };
    }

    export interface Despray {
        destGroup: string;
        sourceLogicalName: string;
        destIP: string;
        destPath: string;
        destPlane: string;
        dstxml: base64Binary;
        overwrite: boolean;
        maxConnections: int;
        throttle: int;
        transferBufferSize: int;
        splitprefix: string;
        norecover: boolean;
        wrap: boolean;
        multiCopy: boolean;
        SingleConnection: boolean;
        DFUServerQueue: string;
        compress: boolean;
        encrypt: string;
        decrypt: string;
    }

    export interface DesprayResponse {
        Exceptions: Exceptions;
        wuid: string;
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
        Exceptions: Exceptions;
        wuid: string;
    }

    export interface DropZoneFileSearchRequest {
        DropZoneName?: string;
        Server?: string;
        ECLWatchVisibleOnly?: boolean;
        NameFilter?: string;
    }

    export interface PhysicalFileStruct {
        name: string;
        isDir: boolean;
        filesize: long;
        modifiedtime: string;
        Path: string;
        Files: Files;
    }

    export interface Files {
        PhysicalFileStruct: PhysicalFileStruct[];
    }

    export interface DropZoneFileSearchResponse {
        Exceptions: Exceptions;
        Files: {
            PhysicalFileStruct: PhysicalFileStruct[];
        };
        Warning: string;
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
        Name: string;
        NetAddress: string;
        Path: string;
        Computer: string;
        Linux: string;
    }

    export interface DropZones {
        DropZone: DropZone[];
    }

    export interface DropZoneFilesResponse {
        Exceptions: Exceptions;
        DropZoneName: string;
        NetAddress: string;
        Path: string;
        OS: int;
        ECLWatchVisibleOnly: boolean;
        DropZones: {
            DropZone: DropZone[];
        };
        Files: Files;
    }

    export interface EchoDateTime {
        dt: dateTime;
    }

    export interface EchoDateTimeResponse {
        result: dateTime;
    }

    export interface FileListRequest {
        Netaddr?: string;
        Path?: string;
        Mask?: string;
        OS?: string;
        DirectoryOnly?: boolean;
    }

    export interface files {
        PhysicalFileStruct: PhysicalFileStruct[];
    }

    export interface FileListResponse {
        Exceptions: Exceptions;
        Netaddr: string;
        Path: string;
        Mask: string;
        OS: int;
        DirectoryOnly: boolean;
        AcceptLanguage: string;
        files: {
            PhysicalFileStruct: PhysicalFileStruct[];
        };
    }

    export interface GetDFUExceptions {
        wuid: string;
    }

    export interface GetDFUExceptionsResponse {
        Exceptions: Exceptions;
        result: result;
    }

    export interface ProgressRequest {
        wuid?: string;
    }

    export interface ProgressResponse {
        Exceptions: Exceptions;
        wuid: string;
        PercentDone: int;
        SecsLeft: int;
        KbPerSecAve: int;
        KbPerSec: int;
        SlavesDone: int;
        TimeTaken: string;
        ProgressMessage: string;
        SummaryMessage: string;
        State: string;
    }

    export interface GetDFUServerQueuesRequest {
        DFUServerName?: string;
    }

    export interface GetDFUServerQueuesResponse {
        Exceptions: Exceptions;
        Names: Names;
    }

    export interface GetDFUWorkunit {
        wuid: string;
    }

    export interface GetDFUWorkunitResponse {
        Exceptions: Exceptions;
        result: result;
        AutoRefresh: int;
    }

    export interface GetDFUWorkunits {
        Wuid: string;
        Owner: string;
        Cluster: string;
        StateReq: string;
        Type: string;
        Jobname: string;
        PageSize: long;
        CurrentPage: int;
        PageStartFrom: long;
        Sortby: string;
        Descending: boolean;
        CacheHint: long;
    }

    export interface DFUWorkunit {
        ID: string;
        DFUServerName: string;
        ClusterName: string;
        JobName: string;
        Queue: string;
        User: string;
        isProtected: boolean;
        Command: int;
        CommandMessage: string;
        PercentDone: int;
        SecsLeft: int;
        ProgressMessage: string;
        SummaryMessage: string;
        State: int;
        SourceLogicalName: string;
        SourceIP: string;
        SourceFilePath: string;
        SourceDali: string;
        SourceRecordSize: int;
        SourceFormat: int;
        RowTag: string;
        SourceNumParts: int;
        SourceDirectory: string;
        DestLogicalName: string;
        DestGroupName: string;
        DestDirectory: string;
        DestIP: string;
        DestFilePath: string;
        DestFormat: int;
        DestNumParts: int;
        DestRecordSize: int;
        Replicate: boolean;
        Overwrite: boolean;
        Compress: boolean;
        SourceCsvSeparate: string;
        SourceCsvQuote: string;
        SourceCsvTerminate: string;
        SourceCsvEscape: string;
        TimeStarted: string;
        TimeStopped: string;
        StateMessage: string;
        MonitorEventName: string;
        MonitorSub: boolean;
        MonitorShotLimit: int;
        SourceDiffKeyName: string;
        DestDiffKeyName: string;
        Archived: boolean;
        encrypt: string;
        decrypt: string;
        failIfNoSourceFile: boolean;
        recordStructurePresent: boolean;
        quotedTerminator: boolean;
        preserveCompression: boolean;
        expireDays: int;
        PreserveFileParts: boolean;
        FileAccessCost: double;
    }

    export interface results {
        DFUWorkunit: DFUWorkunit[];
    }

    export interface GetDFUWorkunitsResponse {
        Exceptions: Exceptions;
        results: {
            DFUWorkunit: DFUWorkunit[];
        };
        Type: string;
        Owner: string;
        Cluster: string;
        StateReq: string;
        PageSize: long;
        PrevPage: long;
        NextPage: long;
        LastPage: long;
        NumWUs: long;
        PageStartFrom: long;
        PageEndAt: long;
        First: boolean;
        Sortby: string;
        Descending: boolean;
        BasicQuery: string;
        Filters: string;
        CacheHint: long;
    }

    export interface GetSprayTargetsRequest {

    }

    export interface GroupNode {
        Name: string;
        ClusterType: string;
        ReplicateOutputs: boolean;
    }

    export interface GroupNodes {
        GroupNode: GroupNode[];
    }

    export interface GetSprayTargetsResponse {
        Exceptions: Exceptions;
        GroupNodes: {
            GroupNode: GroupNode[];
        };
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
        Exceptions: Exceptions;
        Location: string;
        Path: string;
        Name: string;
        Type: string;
        DateTime: string;
        Viewable: boolean;
    }

    export interface FileSprayPingRequest {

    }

    export interface FileSprayPingResponse {

    }

    export interface Rename {
        srcname: string;
        dstname: string;
        overwrite: boolean;
        DFUServerQueue: string;
    }

    export interface RenameResponse {
        Exceptions: Exceptions;
        wuid: string;
    }

    export interface Replicate {
        sourceLogicalName: string;
        replicateOffset: int;
        cluster: string;
        repeatLast: boolean;
        onlyRepeated: boolean;
        DFUServerQueue: string;
    }

    export interface ReplicateResponse {
        Exceptions: Exceptions;
        wuid: string;
    }

    export interface ShowResultRequest {
        Result?: string;
    }

    export interface ShowResultResponse {
        Exceptions: Exceptions;
        Result: string;
    }

    export interface SprayFixed {
        sourceIP: string;
        sourcePlane: string;
        sourcePath: string;
        srcxml: base64Binary;
        sourceFormat: string;
        sourceRecordSize: int;
        destGroup: string;
        destLogicalName: string;
        overwrite: boolean;
        replicate: boolean;
        ReplicateOffset: int;
        maxConnections: int;
        throttle: int;
        transferBufferSize: int;
        prefix: string;
        nosplit: boolean;
        norecover: boolean;
        compress: boolean;
        push: boolean;
        pull: boolean;
        noCommon: boolean;
        encrypt: string;
        decrypt: string;
        wrap: boolean;
        failIfNoSourceFile: boolean;
        recordStructurePresent: boolean;
        quotedTerminator: boolean;
        expireDays: int;
        DFUServerQueue: string;
    }

    export interface SprayFixedResponse {
        Exceptions: Exceptions;
        wuid: string;
    }

    export interface SprayVariable {
        sourceIP: string;
        sourcePlane: string;
        sourcePath: string;
        srcxml: base64Binary;
        sourceMaxRecordSize: int;
        sourceFormat: int;
        NoSourceCsvSeparator: boolean;
        sourceCsvSeparate: string;
        sourceCsvTerminate: string;
        sourceCsvQuote: string;
        sourceCsvEscape: string;
        sourceRowTag: string;
        destGroup: string;
        destLogicalName: string;
        overwrite: boolean;
        replicate: boolean;
        ReplicateOffset: int;
        maxConnections: int;
        throttle: int;
        transferBufferSize: int;
        prefix: string;
        nosplit: boolean;
        norecover: boolean;
        compress: boolean;
        push: boolean;
        pull: boolean;
        noCommon: boolean;
        encrypt: string;
        decrypt: string;
        failIfNoSourceFile: boolean;
        recordStructurePresent: boolean;
        quotedTerminator: boolean;
        sourceRowPath: string;
        isJSON: boolean;
        expireDays: int;
        DFUServerQueue: string;
        srcUsername: string;
        srcPassword: string;
    }

    export interface SprayResponse {
        Exceptions: Exceptions;
        wuid: string;
    }

    export interface SubmitDFUWorkunit {
        wuid: string;
    }

    export interface SubmitDFUWorkunitResponse {
        Exceptions: Exceptions;
    }

    export interface wu {
        ID: string;
        DFUServerName: string;
        ClusterName: string;
        JobName: string;
        Queue: string;
        User: string;
        isProtected: boolean;
        Command: int;
        CommandMessage: string;
        PercentDone: int;
        SecsLeft: int;
        ProgressMessage: string;
        SummaryMessage: string;
        State: int;
        SourceLogicalName: string;
        SourceIP: string;
        SourceFilePath: string;
        SourceDali: string;
        SourceRecordSize: int;
        SourceFormat: int;
        RowTag: string;
        SourceNumParts: int;
        SourceDirectory: string;
        DestLogicalName: string;
        DestGroupName: string;
        DestDirectory: string;
        DestIP: string;
        DestFilePath: string;
        DestFormat: int;
        DestNumParts: int;
        DestRecordSize: int;
        Replicate: boolean;
        Overwrite: boolean;
        Compress: boolean;
        SourceCsvSeparate: string;
        SourceCsvQuote: string;
        SourceCsvTerminate: string;
        SourceCsvEscape: string;
        TimeStarted: string;
        TimeStopped: string;
        StateMessage: string;
        MonitorEventName: string;
        MonitorSub: boolean;
        MonitorShotLimit: int;
        SourceDiffKeyName: string;
        DestDiffKeyName: string;
        Archived: boolean;
        encrypt: string;
        decrypt: string;
        failIfNoSourceFile: boolean;
        recordStructurePresent: boolean;
        quotedTerminator: boolean;
        preserveCompression: boolean;
        expireDays: int;
        PreserveFileParts: boolean;
        FileAccessCost: double;
    }

    export interface UpdateDFUWorkunit {
        wu: {
            ID: string;
            DFUServerName: string;
            ClusterName: string;
            JobName: string;
            Queue: string;
            User: string;
            isProtected: boolean;
            Command: int;
            CommandMessage: string;
            PercentDone: int;
            SecsLeft: int;
            ProgressMessage: string;
            SummaryMessage: string;
            State: int;
            SourceLogicalName: string;
            SourceIP: string;
            SourceFilePath: string;
            SourceDali: string;
            SourceRecordSize: int;
            SourceFormat: int;
            RowTag: string;
            SourceNumParts: int;
            SourceDirectory: string;
            DestLogicalName: string;
            DestGroupName: string;
            DestDirectory: string;
            DestIP: string;
            DestFilePath: string;
            DestFormat: int;
            DestNumParts: int;
            DestRecordSize: int;
            Replicate: boolean;
            Overwrite: boolean;
            Compress: boolean;
            SourceCsvSeparate: string;
            SourceCsvQuote: string;
            SourceCsvTerminate: string;
            SourceCsvEscape: string;
            TimeStarted: string;
            TimeStopped: string;
            StateMessage: string;
            MonitorEventName: string;
            MonitorSub: boolean;
            MonitorShotLimit: int;
            SourceDiffKeyName: string;
            DestDiffKeyName: string;
            Archived: boolean;
            encrypt: string;
            decrypt: string;
            failIfNoSourceFile: boolean;
            recordStructurePresent: boolean;
            quotedTerminator: boolean;
            preserveCompression: boolean;
            expireDays: int;
            PreserveFileParts: boolean;
            FileAccessCost: double;
        };
        ClusterOrig: string;
        JobNameOrig: string;
        isProtectedOrig: boolean;
        StateOrig: int;
    }

    export interface UpdateDFUWorkunitResponse {
        Exceptions: Exceptions;
    }

}

export class FileSprayServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "FileSpray", "1.23");
    }

    AbortDFUWorkunit(request: FileSpray.AbortDFUWorkunit): Promise<FileSpray.AbortDFUWorkunitResponse> {
        return this._connection.send("AbortDFUWorkunit", request);
    }

    Copy(request: FileSpray.Copy): Promise<FileSpray.CopyResponse> {
        return this._connection.send("Copy", request);
    }

    CreateDFUWorkunit(request: FileSpray.CreateDFUWorkunit): Promise<FileSpray.CreateDFUWorkunitResponse> {
        return this._connection.send("CreateDFUWorkunit", request);
    }

    DFUWUFile(request: FileSpray.DFUWUFileRequest): Promise<FileSpray.DFUWUFileResponse> {
        return this._connection.send("DFUWUFile", request);
    }

    DFUWUSearch(request: FileSpray.DFUWUSearchRequest): Promise<FileSpray.DFUWUSearchResponse> {
        return this._connection.send("DFUWUSearch", request);
    }

    DFUWorkunitsAction(request: FileSpray.DFUWorkunitsActionRequest): Promise<FileSpray.DFUWorkunitsActionResponse> {
        return this._connection.send("DFUWorkunitsAction", request);
    }

    DeleteDFUWorkunit(request: FileSpray.DeleteDFUWorkunit): Promise<FileSpray.DeleteDFUWorkunitResponse> {
        return this._connection.send("DeleteDFUWorkunit", request);
    }

    DeleteDFUWorkunits(request: FileSpray.DeleteDFUWorkunits): Promise<FileSpray.DeleteDFUWorkunitsResponse> {
        return this._connection.send("DeleteDFUWorkunits", request);
    }

    DeleteDropZoneFiles(request: FileSpray.DeleteDropZoneFilesRequest): Promise<FileSpray.DFUWorkunitsActionResponse> {
        return this._connection.send("DeleteDropZoneFiles", request);
    }

    Despray(request: FileSpray.Despray): Promise<FileSpray.DesprayResponse> {
        return this._connection.send("Despray", request);
    }

    DfuMonitor(request: FileSpray.DfuMonitorRequest): Promise<FileSpray.DfuMonitorResponse> {
        return this._connection.send("DfuMonitor", request);
    }

    DropZoneFileSearch(request: FileSpray.DropZoneFileSearchRequest): Promise<FileSpray.DropZoneFileSearchResponse> {
        return this._connection.send("DropZoneFileSearch", request);
    }

    DropZoneFiles(request: FileSpray.DropZoneFilesRequest): Promise<FileSpray.DropZoneFilesResponse> {
        return this._connection.send("DropZoneFiles", request);
    }

    EchoDateTime(request: FileSpray.EchoDateTime): Promise<FileSpray.EchoDateTimeResponse> {
        return this._connection.send("EchoDateTime", request);
    }

    FileList(request: FileSpray.FileListRequest): Promise<FileSpray.FileListResponse> {
        return this._connection.send("FileList", request);
    }

    GetDFUExceptions(request: FileSpray.GetDFUExceptions): Promise<FileSpray.GetDFUExceptionsResponse> {
        return this._connection.send("GetDFUExceptions", request);
    }

    GetDFUProgress(request: FileSpray.ProgressRequest): Promise<FileSpray.ProgressResponse> {
        return this._connection.send("GetDFUProgress", request);
    }

    GetDFUServerQueues(request: FileSpray.GetDFUServerQueuesRequest): Promise<FileSpray.GetDFUServerQueuesResponse> {
        return this._connection.send("GetDFUServerQueues", request);
    }

    GetDFUWorkunit(request: FileSpray.GetDFUWorkunit): Promise<FileSpray.GetDFUWorkunitResponse> {
        return this._connection.send("GetDFUWorkunit", request);
    }

    GetDFUWorkunits(request: FileSpray.GetDFUWorkunits): Promise<FileSpray.GetDFUWorkunitsResponse> {
        return this._connection.send("GetDFUWorkunits", request);
    }

    GetSprayTargets(request: FileSpray.GetSprayTargetsRequest): Promise<FileSpray.GetSprayTargetsResponse> {
        return this._connection.send("GetSprayTargets", request);
    }

    OpenSave(request: FileSpray.OpenSaveRequest): Promise<FileSpray.OpenSaveResponse> {
        return this._connection.send("OpenSave", request);
    }

    Ping(request: FileSpray.FileSprayPingRequest): Promise<FileSpray.FileSprayPingResponse> {
        return this._connection.send("Ping", request);
    }

    Rename(request: FileSpray.Rename): Promise<FileSpray.RenameResponse> {
        return this._connection.send("Rename", request);
    }

    Replicate(request: FileSpray.Replicate): Promise<FileSpray.ReplicateResponse> {
        return this._connection.send("Replicate", request);
    }

    ShowResult(request: FileSpray.ShowResultRequest): Promise<FileSpray.ShowResultResponse> {
        return this._connection.send("ShowResult", request);
    }

    SprayFixed(request: FileSpray.SprayFixed): Promise<FileSpray.SprayFixedResponse> {
        return this._connection.send("SprayFixed", request);
    }

    SprayVariable(request: FileSpray.SprayVariable): Promise<FileSpray.SprayResponse> {
        return this._connection.send("SprayVariable", request);
    }

    SubmitDFUWorkunit(request: FileSpray.SubmitDFUWorkunit): Promise<FileSpray.SubmitDFUWorkunitResponse> {
        return this._connection.send("SubmitDFUWorkunit", request);
    }

    UpdateDFUWorkunit(request: FileSpray.UpdateDFUWorkunit): Promise<FileSpray.UpdateDFUWorkunitResponse> {
        return this._connection.send("UpdateDFUWorkunit", request);
    }

}
