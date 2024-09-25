import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

type int = number;
type unsignedInt = number;
type base64Binary = string;
type dateTime = string;
type long = number;
type double = number;
type integer = number;
type nonNegativeInteger = number;

export enum ECLWUActions {
    Abort = "Abort",
    Delete = "Delete",
    Deschedule = "Deschedule",
    Reschedule = "Reschedule",
    Pause = "Pause",
    PauseNow = "PauseNow",
    Protect = "Protect",
    Unprotect = "Unprotect",
    Restore = "Restore",
    Resume = "Resume",
    SetToFailed = "SetToFailed",
    Archive = "Archive"
}

export enum EclDefinitionActions {
    SyntaxCheck = "SyntaxCheck",
    Deploy = "Deploy",
    Publish = "Publish"
}

export enum ErrorMessageFormat {
    Xml = "Xml",
    Json = "Json",
    Text = "Text"
}

export enum WUExceptionSeverity {
    Info = "Info",
    Warning = "Warning",
    Error = "Error",
    Alert = "Alert"
}

export enum WUQueryFilterSuspendedType {
    AllQueries = "AllQueries",
    NotSuspended = "NotSuspended",
    Suspended = "Suspended",
    SuspendedByUser = "SuspendedByUser",
    SuspendedByFirstNode = "SuspendedByFirstNode",
    SuspendedByAnyNode = "SuspendedByAnyNode"
}

export enum WUQuerySetFilterType {
    All = "All",
    Id = "Id",
    Name = "Name",
    Alias = "Alias",
    Status = "Status"
}

export enum QuerySetAliasActionTypes {
    Deactivate = "Deactivate"
}

export enum QuerysetImportActivation {
    None = "None",
    ActivateImportedActive = "ActivateImportedActive"
}

export enum QuerySetQueryActionTypes {
    Suspend = "Suspend",
    Unsuspend = "Unsuspend",
    ToggleSuspend = "ToggleSuspend",
    Activate = "Activate",
    Delete = "Delete",
    RemoveAllAliases = "RemoveAllAliases",
    ResetQueryStats = "ResetQueryStats"
}

export enum WUQueryActivationMode {
    DoNotActivateQuery = 0,
    ActivateQuery = 1,
    ActivateQuerySuspendPrevious = 2,
    ActivateQueryDeletePrevious = 3
}

export namespace WsWorkunits {

    export interface GVCAjaxGraph {
        Name: string;
        GraphName: string;
        SubGraphId: int;
        SubGraphOnly: boolean;
    }

    export interface GVCAjaxGraphResponse {
        Name: string;
        GraphName: string;
        GraphType: string;
        SubGraphId: int;
        SubGraphOnly: boolean;
    }

    export interface Ping {

    }

    export interface WsWorkunitsPingResponse {

    }

    export interface Wuids {
        Item: string[];
    }

    export interface WUAbort {
        Wuids: {
            Item: string[];
        };
        BlockTillFinishTimer: int;
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

    export interface WUActionResult {
        Wuid: string;
        Action: string;
        Result: string;
    }

    export interface ActionResults {
        WUActionResult: WUActionResult[];
    }

    export interface WUAbortResponse {
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
        ActionResults: {
            WUActionResult: WUActionResult[];
        };
    }

    export interface WUAction {
        Wuids: Wuids;
        WUActionType: ECLWUActions;
        Cluster: string;
        Owner: string;
        State: string;
        StartDate: string;
        EndDate: string;
        ECL: string;
        Jobname: string;
        Test: string;
        CurrentPage: string;
        PageSize: string;
        Sortby: string;
        Descending: boolean;
        EventServer: string;
        EventName: string;
        PageFrom: string;
        BlockTillFinishTimer: int;
    }

    export interface WUActionResponse {
        Exceptions: Exceptions;
        ActionResults: ActionResults;
    }

    export interface WUAddLocalFileToWorkunit {
        Wuid: string;
        Name: string;
        Val: string;
        DefVal: string;
        Type: int;
        Length: int;
    }

    export interface WUAddLocalFileToWorkunitResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Name: string;
        Result: string;
    }

    export interface WUCDebug {
        Wuid: string;
        Command: string;
    }

    export interface WUDebugResponse {
        Exceptions: Exceptions;
        Result: string;
    }

    export interface WUCheckFeatures {

    }

    export interface Deployment {
        UseCompression: boolean;
    }

    export interface WUCheckFeaturesResponse {
        Exceptions: Exceptions;
        BuildVersionMajor: int;
        BuildVersionMinor: int;
        BuildVersionPoint: int;
        maxRequestEntityLength: unsignedInt;
        Deployment: {
            UseCompression: boolean;
        };
    }

    export interface WUClusterJobQueueLOG {
        Cluster: string;
        StartDate: string;
        EndDate: string;
    }

    export interface WUClusterJobQueueLOGResponse {
        Exceptions: Exceptions;
        thefile: base64Binary;
    }

    export interface WUClusterJobQueueXLS {
        Cluster: string;
        StartDate: string;
        EndDate: string;
        ShowType: string;
    }

    export interface WUClusterJobQueueXLSResponse {
        Exceptions: Exceptions;
        Result: base64Binary;
    }

    export interface WUClusterJobSummaryXLS {
        Cluster: string;
        StartDate: string;
        EndDate: string;
        ShowAll: boolean;
        BusinessStartTime: string;
        BusinessEndTime: string;
    }

    export interface WUClusterJobSummaryXLSResponse {
        Exceptions: Exceptions;
        Result: base64Binary;
    }

    export interface WUClusterJobXLS {
        Cluster: string;
        StartDate: string;
        EndDate: string;
        ShowAll: boolean;
        BusinessStartTime: string;
        BusinessEndTime: string;
    }

    export interface WUClusterJobXLSResponse {
        Exceptions: Exceptions;
        Result: base64Binary;
    }

    export interface WUCompileECL {
        ECL: string;
        ModuleName: string;
        AttributeName: string;
        Queue: string;
        Cluster: string;
        Snapshot: string;
        IncludeDependencies: boolean;
        IncludeComplexity: boolean;
        TimeToWait: int;
    }

    export interface ECLException {
        Source: string;
        Severity: string;
        Code: int;
        Message: string;
        FileName: string;
        LineNo: int;
        Column: int;
        Activity: int;
        Scope: string;
        Priority: int;
    }

    export interface Errors {
        ECLException: ECLException[];
    }

    export interface ECLAttribute {
        ModuleName: string;
        AttributeName: string;
        IsLocked: boolean;
        IsCheckedOut: boolean;
        IsSandbox: boolean;
        IsOrphaned: boolean;
    }

    export interface Dependencies {
        ECLAttribute: ECLAttribute[];
    }

    export interface WUCompileECLResponse {
        Exceptions: Exceptions;
        Complexity: string;
        Errors: {
            ECLException: ECLException[];
        };
        Dependencies: {
            ECLAttribute: ECLAttribute[];
        };
    }

    export interface WUCopyLogicalFiles {
        Wuid: string;
        Cluster: string;
        CopyLocal: boolean;
    }

    export interface Clusters {
        Item: string[];
    }

    export interface WULogicalFileCopyInfo {
        IsIndex: boolean;
        LogicalName: string;
        DfuCopyWuid: string;
        DfuCopyError: string;
        Clusters: {
            Item: string[];
        };
    }

    export interface OnCluster {
        WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
    }

    export interface NotOnCluster {
        WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
    }

    export interface Foreign {
        WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
    }

    export interface NotFound {
        WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
    }

    export interface Cluster {
        ClusterName: string;
        OnCluster: {
            WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
        };
        NotOnCluster: {
            WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
        };
        Foreign: {
            WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
        };
        NotFound: {
            WULogicalFileCopyInfo: WULogicalFileCopyInfo[];
        };
    }

    export interface ClusterFiles {
        Cluster: Cluster[];
    }

    export interface WUCopyLogicalFilesResponse {
        Exceptions: Exceptions;
        Wuid: string;
        ClusterFiles: {
            Cluster: Cluster[];
        };
    }

    export interface WUCopyQuerySet {
        Source: string;
        Target: string;
        ActiveOnly: boolean;
        CloneActiveState: boolean;
        AllowForeignFiles: boolean;
        DfsServer: string;
        CopyFiles: boolean;
        OverwriteDfs: boolean;
        SourceProcess: string;
        UpdateSuperFiles: boolean;
        UpdateCloneFrom: boolean;
        AppendCluster: boolean;
        IncludeFileErrors: boolean;
        SourceSSL: boolean;
    }

    export interface CopiedQueries {
        QueryId: string[];
    }

    export interface ExistingQueries {
        QueryId: string[];
    }

    export interface File {
        Error: string;
        LogicalName: string;
    }

    export interface FileErrors {
        File: File[];
    }

    export interface WUCopyQuerySetResponse {
        Exceptions: Exceptions;
        CopiedQueries: {
            QueryId: string[];
        };
        ExistingQueries: {
            QueryId: string[];
        };
        FileErrors: {
            File: File[];
        };
    }

    export interface WUCreate {

    }

    export interface Query {
        Text: string;
        Cpp: string;
        ResTxt: string;
        Dll: string;
        ThorLog: string;
        QueryMainDefinition: string;
    }

    export interface ECLHelpFile {
        Name: string;
        Type: string;
        IPAddress: string;
        Description: string;
        FileSize: long;
        PID: unsignedInt;
        minActivityId: unsignedInt;
        maxActivityId: unsignedInt;
    }

    export interface Helpers {
        ECLHelpFile: ECLHelpFile[];
    }

    export interface ECLGraph {
        Name: string;
        Label: string;
        Type: string;
        Running: boolean;
        Complete: boolean;
        Failed: boolean;
        RunningId: long;
        WhenStarted: string;
        WhenFinished: string;
    }

    export interface Graphs {
        ECLGraph: ECLGraph[];
    }

    export interface ECLSourceFiles {
        ECLSourceFile: ECLSourceFile[];
    }

    export interface ECLSourceFile {
        FileCluster: string;
        Name: string;
        IsSuperFile: boolean;
        Subs: int;
        Count: int;
        ECLSourceFiles: {
            ECLSourceFile: ECLSourceFile[];
        };
    }

    export interface SourceFiles {
        ECLSourceFile: ECLSourceFile[];
    }

    export interface ECLSchemaItem {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: int;
        isConditional: boolean;
    }

    export interface ECLSchemas {
        ECLSchemaItem: ECLSchemaItem[];
    }

    export interface ECLResult {
        Name: string;
        Sequence: int;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: long;
        ECLSchemas: {
            ECLSchemaItem: ECLSchemaItem[];
        };
        XmlSchema: string;
    }

    export interface Results {
        ECLResult: ECLResult[];
    }

    export interface Variables {
        ECLResult: ECLResult[];
    }

    export interface ECLTimer {
        Name: string;
        Value: string;
        count: int;
        GraphName: string;
        SubGraphId: int;
        Timestamp: long;
        When: string;
    }

    export interface Timers {
        ECLTimer: ECLTimer[];
    }

    export interface DebugValue {
        Name: string;
        Value: string;
    }

    export interface DebugValues {
        DebugValue: DebugValue[];
    }

    export interface ApplicationValue {
        Application: string;
        Name: string;
        Value: string;
    }

    export interface ApplicationValues {
        ApplicationValue: ApplicationValue[];
    }

    export interface ECLWorkflow {
        WFID: string;
        EventName: string;
        EventText: string;
        Count: int;
        CountRemaining: int;
    }

    export interface Workflows {
        ECLWorkflow: ECLWorkflow[];
    }

    export interface ECLTimingData {
        Name: string;
        GraphNum: int;
        SubGraphNum: int;
        GID: int;
        Min: int;
        MS: int;
    }

    export interface TimingData {
        ECLTimingData: ECLTimingData[];
    }

    export interface AllowedClusters {
        AllowedCluster: string[];
    }

    export interface ThorLogInfo {
        ProcessName: string;
        ClusterGroup: string;
        LogDate: string;
        NumberSlaves: int;
    }

    export interface ThorLogList {
        ThorLogInfo: ThorLogInfo[];
    }

    export interface ResourceURLs {
        URL: string[];
    }

    export interface ServiceNames {
        Item: string[];
    }

    export interface Workunit {
        Wuid: string;
        Owner: string;
        Cluster: string;
        RoxieCluster: string;
        Jobname: string;
        Queue: string;
        StateID: int;
        State: string;
        StateEx: string;
        Description: string;
        Protected: boolean;
        Active: boolean;
        Action: int;
        ActionEx: string;
        DateTimeScheduled: dateTime;
        PriorityClass: int;
        PriorityLevel: int;
        Scope: string;
        Snapshot: string;
        ResultLimit: int;
        Archived: boolean;
        IsPausing: boolean;
        ThorLCR: boolean;
        EventSchedule: int;
        TotalClusterTime: string;
        AbortBy: string;
        AbortTime: string;
        Query: {
            Text: string;
            Cpp: string;
            ResTxt: string;
            Dll: string;
            ThorLog: string;
            QueryMainDefinition: string;
        };
        Helpers: {
            ECLHelpFile: ECLHelpFile[];
        };
        Exceptions: Exceptions;
        Graphs: {
            ECLGraph: ECLGraph[];
        };
        SourceFiles: {
            ECLSourceFile: ECLSourceFile[];
        };
        Results: {
            ECLResult: ECLResult[];
        };
        Variables: {
            ECLResult: ECLResult[];
        };
        Timers: {
            ECLTimer: ECLTimer[];
        };
        DebugValues: {
            DebugValue: DebugValue[];
        };
        ApplicationValues: {
            ApplicationValue: ApplicationValue[];
        };
        Workflows: {
            ECLWorkflow: ECLWorkflow[];
        };
        TimingData: {
            ECLTimingData: ECLTimingData[];
        };
        AllowedClusters: {
            AllowedCluster: string[];
        };
        ErrorCount: int;
        WarningCount: int;
        InfoCount: int;
        AlertCount: int;
        GraphCount: int;
        SourceFileCount: int;
        ResultCount: int;
        VariableCount: int;
        TimerCount: int;
        HasDebugValue: boolean;
        ApplicationValueCount: int;
        XmlParams: string;
        AccessFlag: int;
        ClusterFlag: int;
        HelpersDesc: string;
        GraphsDesc: string;
        SourceFilesDesc: string;
        ResultsDesc: string;
        VariablesDesc: string;
        TimersDesc: string;
        DebugValuesDesc: string;
        ApplicationValuesDesc: string;
        WorkflowsDesc: string;
        HasArchiveQuery: boolean;
        ThorLogList: {
            ThorLogInfo: ThorLogInfo[];
        };
        ResourceURLs: {
            URL: string[];
        };
        ResultViewCount: int;
        ResourceURLCount: int;
        DebugValueCount: int;
        WorkflowCount: int;
        HelpersCount: int;
        ServiceNames: {
            Item: string[];
        };
        ExecuteCost: double;
        FileAccessCost: double;
        CompileCost: double;
    }

    export interface WUCreateResponse {
        Exceptions: Exceptions;
        Workunit: {
            Wuid: string;
            Owner: string;
            Cluster: string;
            RoxieCluster: string;
            Jobname: string;
            Queue: string;
            StateID: int;
            State: string;
            StateEx: string;
            Description: string;
            Protected: boolean;
            Active: boolean;
            Action: int;
            ActionEx: string;
            DateTimeScheduled: dateTime;
            PriorityClass: int;
            PriorityLevel: int;
            Scope: string;
            Snapshot: string;
            ResultLimit: int;
            Archived: boolean;
            IsPausing: boolean;
            ThorLCR: boolean;
            EventSchedule: int;
            TotalClusterTime: string;
            AbortBy: string;
            AbortTime: string;
            Query: {
                Text: string;
                Cpp: string;
                ResTxt: string;
                Dll: string;
                ThorLog: string;
                QueryMainDefinition: string;
            };
            Helpers: {
                ECLHelpFile: ECLHelpFile[];
            };
            Exceptions: Exceptions;
            Graphs: {
                ECLGraph: ECLGraph[];
            };
            SourceFiles: {
                ECLSourceFile: ECLSourceFile[];
            };
            Results: {
                ECLResult: ECLResult[];
            };
            Variables: {
                ECLResult: ECLResult[];
            };
            Timers: {
                ECLTimer: ECLTimer[];
            };
            DebugValues: {
                DebugValue: DebugValue[];
            };
            ApplicationValues: {
                ApplicationValue: ApplicationValue[];
            };
            Workflows: {
                ECLWorkflow: ECLWorkflow[];
            };
            TimingData: {
                ECLTimingData: ECLTimingData[];
            };
            AllowedClusters: {
                AllowedCluster: string[];
            };
            ErrorCount: int;
            WarningCount: int;
            InfoCount: int;
            AlertCount: int;
            GraphCount: int;
            SourceFileCount: int;
            ResultCount: int;
            VariableCount: int;
            TimerCount: int;
            HasDebugValue: boolean;
            ApplicationValueCount: int;
            XmlParams: string;
            AccessFlag: int;
            ClusterFlag: int;
            HelpersDesc: string;
            GraphsDesc: string;
            SourceFilesDesc: string;
            ResultsDesc: string;
            VariablesDesc: string;
            TimersDesc: string;
            DebugValuesDesc: string;
            ApplicationValuesDesc: string;
            WorkflowsDesc: string;
            HasArchiveQuery: boolean;
            ThorLogList: {
                ThorLogInfo: ThorLogInfo[];
            };
            ResourceURLs: {
                URL: string[];
            };
            ResultViewCount: int;
            ResourceURLCount: int;
            DebugValueCount: int;
            WorkflowCount: int;
            HelpersCount: int;
            ServiceNames: {
                Item: string[];
            };
            ExecuteCost: double;
            FileAccessCost: double;
            CompileCost: double;
        };
    }

    export interface WUCreateAndUpdate {
        Wuid: string;
        State: int;
        StateOrig: int;
        Jobname: string;
        JobnameOrig: string;
        QueryText: string;
        Action: int;
        Description: string;
        DescriptionOrig: string;
        AddDrilldownFields: boolean;
        ResultLimit: int;
        Protected: boolean;
        ProtectedOrig: boolean;
        PriorityClass: int;
        PriorityLevel: int;
        Scope: string;
        ScopeOrig: string;
        ClusterSelection: string;
        ClusterOrig: string;
        XmlParams: string;
        ThorSlaveIP: string;
        QueryMainDefinition: string;
        DebugValues: DebugValues;
        ApplicationValues: ApplicationValues;
    }

    export interface WUUpdateResponse {
        Exceptions: Exceptions;
        Workunit: Workunit;
    }

    export interface WUCreateZAPInfo {
        Wuid: string;
        ESPIPAddress: string;
        ThorIPAddress: string;
        BuildVersion: string;
        ProblemDescription: string;
        WhatChanged: string;
        WhereSlow: string;
        ZAPFileName: string;
        IncludeThorSlaveLog: string;
        ZAPPassword: string;
        SendEmail: boolean;
        AttachZAPReportToEmail: boolean;
        EmailFrom: string;
        EmailSubject: string;
        EmailBody: string;
    }

    export interface WUCreateZAPInfoResponse {
        Exceptions: Exceptions;
        thefile: base64Binary;
        ZAPFileName: string;
    }

    export interface WUDelete {
        Wuids: Wuids;
        BlockTillFinishTimer: int;
    }

    export interface WUDeleteResponse {
        Exceptions: Exceptions;
        ActionResults: ActionResults;
    }

    export interface WUDeployWorkunit {
        Cluster: string;
        Name: string;
        Wait: int;
        ObjType: string;
        FileName: string;
        Object: base64Binary;
        ResultLimit: int;
        QueryMainDefinition: string;
        Snapshot: string;
        DebugValues: DebugValues;
        Protect: boolean;
    }

    export interface WUDeployWorkunitResponse {
        Exceptions: Exceptions;
        Workunit: Workunit;
    }

    export interface Scopes {
        Scope: string[];
    }

    export interface Ids {
        id: string[];
    }

    export interface ScopeTypes {
        ScopeType: string[];
    }

    export interface PropertyFilter {
        Name: string;
        ExactValue: string;
        MinValue: string;
        MaxValue: string;
    }

    export interface PropertyFilters {
        PropertyFilter: PropertyFilter[];
    }

    export interface ScopeFilter {
        MaxDepth: integer;
        Scopes: {
            Scope: string[];
        };
        Ids: {
            id: string[];
        };
        ScopeTypes: {
            ScopeType: string[];
        };
        PropertyFilters: {
            PropertyFilter: PropertyFilter[];
        };
    }

    export interface NestedFilter {
        Depth: unsignedInt;
        ScopeTypes: ScopeTypes;
    }

    export interface Properties {
        Property: string[];
    }

    export interface Extra {
        scopeType: string;
        Properties: Properties;
    }

    export interface ExtraProperties {
        Extra: Extra[];
    }

    export interface PropertiesToReturn {
        AllStatistics: boolean;
        AllAttributes: boolean;
        AllHints: boolean;
        AllScopes: boolean;
        AllProperties: boolean;
        AllNotes: boolean;
        MinVersion: string;
        Measure: string;
        Properties: {
            Property: string[];
        };
        ExtraProperties: {
            Extra: Extra[];
        };
    }

    export interface ScopeOptions {
        IncludeMatchedScopesInResults: boolean;
        IncludeScope: boolean;
        IncludeId: boolean;
        IncludeScopeType: boolean;
    }

    export interface PropertyOptions {
        IncludeName: boolean;
        IncludeRawValue: boolean;
        IncludeFormatted: boolean;
        IncludeMeasure: boolean;
        IncludeCreator: boolean;
        IncludeCreatorType: boolean;
    }

    export interface WUDetails {
        WUID: string;
        ScopeFilter: {
            MaxDepth: integer;
            Scopes: {
                Scope: string[];
            };
            Ids: {
                id: string[];
            };
            ScopeTypes: {
                ScopeType: string[];
            };
            PropertyFilters: {
                PropertyFilter: PropertyFilter[];
            };
        };
        NestedFilter: {
            Depth: unsignedInt;
            ScopeTypes: ScopeTypes;
        };
        PropertiesToReturn: {
            AllStatistics: boolean;
            AllAttributes: boolean;
            AllHints: boolean;
            AllScopes: boolean;
            AllProperties: boolean;
            AllNotes: boolean;
            MinVersion: string;
            Measure: string;
            Properties: {
                Property: string[];
            };
            ExtraProperties: {
                Extra: Extra[];
            };
        };
        Filter: string;
        ScopeOptions: {
            IncludeMatchedScopesInResults: boolean;
            IncludeScope: boolean;
            IncludeId: boolean;
            IncludeScopeType: boolean;
        };
        PropertyOptions: {
            IncludeName: boolean;
            IncludeRawValue: boolean;
            IncludeFormatted: boolean;
            IncludeMeasure: boolean;
            IncludeCreator: boolean;
            IncludeCreatorType: boolean;
        };
    }

    export interface WUDetailsResponse {
        Exceptions: Exceptions;
        MaxVersion: string;
        WUID: string;
        Scopes: Scopes;
    }

    export interface WUDetailsMeta {

    }

    export interface Measures {
        Measure: string[];
    }

    export interface Activity {
        Kind: unsignedInt;
        Name: string;
        IsSink: boolean;
        IsSource: boolean;
    }

    export interface Activities {
        Activity: Activity[];
    }

    export interface WUDetailsMetaResponse {
        Exceptions: Exceptions;
        Properties: Properties;
        ScopeTypes: ScopeTypes;
        Measures: {
            Measure: string[];
        };
        Activities: {
            Activity: Activity[];
        };
    }

    export interface EclDefinitions {
        Item: string[];
    }

    export interface WUEclDefinitionAction {
        EclDefinitions: {
            Item: string[];
        };
        ActionType: EclDefinitionActions;
        Target: string;
        RemoteDali: string;
        SourceProcess: string;
        Priority: string;
        Comment: string;
        MemoryLimit: string;
        DeletePrevious: boolean;
        SuspendPrevious: boolean;
        NoActivate: boolean;
        NoReload: boolean;
        DontCopyFiles: boolean;
        AllowForeign: boolean;
        UpdateDfs: boolean;
        UpdateSuperfiles: boolean;
        UpdateCloneFrom: boolean;
        DontAppendCluster: boolean;
        MsToWait: int;
        TimeLimit: int;
        WarnTimeLimit: int;
    }

    export interface WUEclDefinitionActionResponse {
        Exceptions: Exceptions;
        ActionResults: ActionResults;
    }

    export interface WUExport {
        Cluster: string;
        Owner: string;
        State: string;
        StartDate: string;
        EndDate: string;
        Jobname: string;
    }

    export interface WUExportResponse {
        Exceptions: Exceptions;
        ExportData: base64Binary;
    }

    export interface WUFile {
        Name: string;
        Wuid: string;
        Type: string;
        Option: int;
        SlaveIP: string;
        IPAddress: string;
        Description: string;
        QuerySet: string;
        Query: string;
        Process: string;
        ClusterGroup: string;
        LogDate: string;
        SlaveNumber: int;
        SizeLimit: long;
        ErrorMessageFormat: ErrorMessageFormat;
        PlainText: string;
    }

    export interface WULogFileResponse {
        Exceptions: Exceptions;
        Wuid: string;
        QuerySet: string;
        QueryName: string;
        QueryId: string;
        FileName: string;
        DaliServer: string;
        thefile: base64Binary;
    }

    export interface WUFullResult {
        Wuid: string;
        NoRootTag: boolean;
        ExceptionSeverity: WUExceptionSeverity;
    }

    export interface WUFullResultResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Results: string;
    }

    export interface WUGVCGraphInfo {
        Wuid: string;
        Name: string;
        GID: string;
        BatchWU: int;
        SubgraphId: int;
    }

    export interface WUGVCGraphInfoResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Name: string;
        GID: string;
        Running: boolean;
        TheGraph: string;
        BatchWU: int;
    }

    export interface WUGetArchiveFile {
        WUID: string;
        ModuleName: string;
        FileName: string;
        Path: string;
    }

    export interface WUGetArchiveFileResponse {
        Exceptions: Exceptions;
        File: string;
        Message: string;
    }

    export interface WUGetDependancyTrees {
        Cluster: string;
        Queue: string;
        Snapshot: string;
        Items: string;
        TimeoutMilliSec: string;
    }

    export interface WUGetDependancyTreesResponse {
        Exceptions: Exceptions;
        Errors: Errors;
        DependancyTrees: base64Binary;
    }

    export interface WUGetGraph {
        Wuid: string;
        GraphName: string;
        SubGraphId: string;
    }

    export interface WUGetGraphResponse {
        Exceptions: Exceptions;
        Graphs: Graphs;
    }

    export interface WUGetGraphNameAndTypes {
        Wuid: string;
        Type: string;
    }

    export interface GraphNameAndType {
        Name: string;
        Type: string;
    }

    export interface GraphNameAndTypes {
        GraphNameAndType: GraphNameAndType[];
    }

    export interface WUGetGraphNameAndTypesResponse {
        Exceptions: Exceptions;
        GraphNameAndTypes: {
            GraphNameAndType: GraphNameAndType[];
        };
    }

    export interface WUGetNumFileToCopy {
        ClusterName: string;
        TargetName: string;
        PageSize: long;
        PageStartFrom: long;
        Sortby: string;
        Descending: boolean;
        CacheHint: long;
    }

    export interface Endpoint {
        URL: string;
        Status: string;
        NumQueryFileToCopy: int;
    }

    export interface Endpoints {
        Endpoint: Endpoint[];
    }

    export interface WUGetNumFileToCopyResponse {
        Exceptions: Exceptions;
        Endpoints: {
            Endpoint: Endpoint[];
        };
        CacheHint: long;
        Total: long;
    }

    export interface WUGetPlugins {

    }

    export interface WUEclPluginsInFolder {
        Path: string;
        Plugins: Plugins;
    }

    export interface Plugins {
        WUEclPluginsInFolder: WUEclPluginsInFolder[];
    }

    export interface WUGetPluginsResponse {
        Exceptions: Exceptions;
        Plugins: {
            WUEclPluginsInFolder: WUEclPluginsInFolder[];
        };
    }

    export interface WUGetStats {
        WUID: string;
        CreatorType: string;
        Creator: string;
        ScopeType: string;
        Scope: string;
        Kind: string;
        Measure: string;
        MinScopeDepth: unsignedInt;
        MaxScopeDepth: unsignedInt;
        IncludeGraphs: boolean;
        CreateDescriptions: boolean;
        MinValue: long;
        MaxValue: long;
        Filter: string;
    }

    export interface WUStatisticItem {
        Creator: string;
        CreatorType: string;
        Scope: string;
        ScopeType: string;
        Description: string;
        TimeStamp: string;
        Measure: string;
        Kind: string;
        Value: string;
        RawValue: long;
        Count: long;
        Max: long;
        Wuid: string;
    }

    export interface Statistics {
        WUStatisticItem: WUStatisticItem[];
    }

    export interface WUGetStatsResponse {
        Exceptions: Exceptions;
        WUID: string;
        Statistics: {
            WUStatisticItem: WUStatisticItem[];
        };
    }

    export interface WUGetThorJobList {
        Cluster: string;
        StartDate: string;
        EndDate: string;
        MaxJobsToReturn: unsignedInt;
    }

    export interface ECLJob {
        Wuid: string;
        Graph: string;
        State: string;
        StartedDate: string;
        FinishedDate: string;
        Cluster: string;
        GraphNum: string;
        SubGraphNum: string;
        NumOfRuns: string;
        Duration: int;
    }

    export interface JobList {
        ECLJob: ECLJob[];
    }

    export interface InProgressJobList {
        ECLJob: ECLJob[];
    }

    export interface WUGetThorJobListResponse {
        Exceptions: Exceptions;
        JobList: {
            ECLJob: ECLJob[];
        };
        InProgressJobList: {
            ECLJob: ECLJob[];
        };
        Warning: string;
    }

    export interface WUGetThorJobQueue {
        Cluster: string;
        StartDate: string;
        EndDate: string;
        MaxJobQueueItemsToReturn: unsignedInt;
    }

    export interface ThorQueue {
        DT: string;
        RunningWUs: string;
        QueuedWUs: string;
        WaitingThors: string;
        ConnectedThors: string;
        IdledThors: string;
        RunningWU1: string;
        RunningWU2: string;
    }

    export interface QueueList {
        ThorQueue: ThorQueue[];
    }

    export interface WUGetThorJobQueueResponse {
        Exceptions: Exceptions;
        LongestQueue: int;
        MaxThorConnected: int;
        QueueList: {
            ThorQueue: ThorQueue[];
        };
        Warning: string;
    }

    export interface WUGetZAPInfo {
        WUID: string;
    }

    export interface WUGetZAPInfoResponse {
        Exceptions: Exceptions;
        WUID: string;
        ESPIPAddress: string;
        ThorIPAddress: string;
        BuildVersion: string;
        Archive: string;
        EmailTo: string;
        EmailFrom: string;
    }

    export interface WUGraphInfo {
        Wuid: string;
        Name: string;
        GID: string;
        BatchWU: int;
    }

    export interface WUGraphInfoResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Name: string;
        GID: string;
        BatchWU: int;
        Running: boolean;
    }

    export interface WUGraphTiming {
        Wuid: string;
    }

    export interface WUGraphTimingResponse {
        Exceptions: Exceptions;
        Workunit: Workunit;
    }

    export interface WUInfo {
        Wuid: string;
        TruncateEclTo64k: boolean;
        Type: string;
        IncludeExceptions: boolean;
        IncludeGraphs: boolean;
        IncludeSourceFiles: boolean;
        IncludeResults: boolean;
        IncludeResultsViewNames: boolean;
        IncludeVariables: boolean;
        IncludeTimers: boolean;
        IncludeDebugValues: boolean;
        IncludeApplicationValues: boolean;
        IncludeWorkflows: boolean;
        IncludeXmlSchemas: boolean;
        IncludeResourceURLs: boolean;
        IncludeECL: boolean;
        IncludeHelpers: boolean;
        IncludeAllowedClusters: boolean;
        IncludeTotalClusterTime: boolean;
        IncludeServiceNames: boolean;
        SuppressResultSchemas: boolean;
        ThorSlaveIP: string;
    }

    export interface ResultViews {
        View: string[];
    }

    export interface WUInfoResponse {
        Exceptions: Exceptions;
        Workunit: Workunit;
        AutoRefresh: int;
        CanCompile: boolean;
        ThorSlaveIP: string;
        ResultViews: {
            View: string[];
        };
        SecMethod: string;
    }

    export interface WUInfoDetails {
        Wuid: string;
        TruncateEclTo64k: boolean;
        Type: string;
        IncludeExceptions: boolean;
        IncludeGraphs: boolean;
        IncludeSourceFiles: boolean;
        IncludeResults: boolean;
        IncludeResultsViewNames: boolean;
        IncludeVariables: boolean;
        IncludeTimers: boolean;
        IncludeDebugValues: boolean;
        IncludeApplicationValues: boolean;
        IncludeWorkflows: boolean;
        IncludeXmlSchemas: boolean;
        IncludeResourceURLs: boolean;
        IncludeECL: boolean;
        IncludeHelpers: boolean;
        IncludeAllowedClusters: boolean;
        IncludeTotalClusterTime: boolean;
        IncludeServiceNames: boolean;
        SuppressResultSchemas: boolean;
        ThorSlaveIP: string;
    }

    export interface WUJobList {
        Cluster: string;
        Process: string;
        StartDate: string;
        EndDate: string;
        ShowAll: boolean;
        BusinessStartHour: int;
        BusinessEndHour: int;
    }

    export interface Jobs {
        ECLJob: ECLJob[];
    }

    export interface WUJobListResponse {
        Exceptions: Exceptions;
        StartDate: string;
        EndDate: string;
        Jobs: {
            ECLJob: ECLJob[];
        };
    }

    export interface WULightWeightQuery {
        Wuid: string;
        Type: string;
        Cluster: string;
        Owner: string;
        JobName: string;
        StartDate: string;
        EndDate: string;
        BeforeWU: string;
        AfterWU: string;
        State: string;
        ApplicationValues: ApplicationValues;
        PageStartFrom: long;
        PageSize: unsignedInt;
        SortBy: string;
        Descending: boolean;
        CacheHint: long;
    }

    export interface ECLWorkunitLW {
        Wuid: string;
        Owner: string;
        JobName: string;
        WuScope: string;
        ClusterName: string;
        State: int;
        StateDesc: string;
        Action: int;
        ActionDesc: string;
        Priority: int;
        PriorityDesc: string;
        PriorityLevel: int;
        IsProtected: boolean;
        DateTimeScheduled: dateTime;
        TotalClusterTime: unsignedInt;
        ApplicationValues: ApplicationValues;
    }

    export interface Workunits {
        ECLWorkunitLW: ECLWorkunitLW[];
    }

    export interface WULightWeightQueryResponse {
        Exceptions: Exceptions;
        NumWUs: int;
        CacheHint: long;
        Workunits: {
            ECLWorkunitLW: ECLWorkunitLW[];
        };
    }

    export interface WUListArchiveFiles {
        WUID: string;
    }

    export interface Files {
        File: File[];
    }

    export interface ArchiveModule {
        Name: string;
        FullName: string;
        Flags: unsignedInt;
        Key: string;
        Plugin: string;
        SourcePath: string;
        Version: string;
        Path: string;
        ArchiveModules: ArchiveModules;
        Files: {
            File: File[];
        };
    }

    export interface ArchiveModules {
        ArchiveModule: ArchiveModule[];
    }

    export interface WUListArchiveFilesResponse {
        Exceptions: Exceptions;
        ArchiveModules: {
            ArchiveModule: ArchiveModule[];
        };
        Files: Files;
        Message: string;
    }

    export interface WUListLocalFileRequired {
        Wuid: string;
    }

    export interface LogicalFileUpload {
        Type: int;
        Source: string;
        Destination: string;
        EventTag: string;
    }

    export interface LocalFileUploads {
        LogicalFileUpload: LogicalFileUpload[];
    }

    export interface WUListLocalFileRequiredResponse {
        Exceptions: Exceptions;
        LocalFileUploads: {
            LogicalFileUpload: LogicalFileUpload[];
        };
    }

    export interface WUListQueries {
        QuerySetName: string;
        ClusterName: string;
        LibraryName: string;
        MemoryLimitLow: long;
        MemoryLimitHigh: long;
        TimeLimitLow: nonNegativeInteger;
        TimeLimitHigh: nonNegativeInteger;
        WarnTimeLimitLow: nonNegativeInteger;
        WarnTimeLimitHigh: nonNegativeInteger;
        PriorityLow: nonNegativeInteger;
        PriorityHigh: nonNegativeInteger;
        Activated: boolean;
        SuspendedFilter: WUQueryFilterSuspendedType;
        WUID: string;
        QueryID: string;
        QueryName: string;
        PublishedBy: string;
        PageSize: nonNegativeInteger;
        PageStartFrom: nonNegativeInteger;
        Sortby: string;
        Descending: boolean;
        CacheHint: long;
        FileName: string;
        CheckAllNodes: boolean;
    }

    export interface QuerySetQuery {
        Id: string;
        Name: string;
        Wuid: string;
        Dll: string;
        Suspended: boolean;
        Clusters: Clusters;
        memoryLimit: string;
        timeLimit: nonNegativeInteger;
        warnTimeLimit: nonNegativeInteger;
        priority: string;
        Comment: string;
        QuerySetId: string;
        IsLibrary: boolean;
        Activated: boolean;
        PublishedBy: string;
        snapshot: string;
        PriorityID: int;
    }

    export interface QuerysetQueries {
        QuerySetQuery: QuerySetQuery[];
    }

    export interface WUListQueriesResponse {
        Exceptions: Exceptions;
        NumberOfQueries: int;
        CacheHint: long;
        QuerysetQueries: {
            QuerySetQuery: QuerySetQuery[];
        };
    }

    export interface WUListQueriesUsingFile {
        Target: string;
        Process: string;
        FileName: string;
    }

    export interface QueryUsingFile {
        Id: string;
        Package: string;
    }

    export interface Queries {
        QueryUsingFile: QueryUsingFile[];
    }

    export interface TargetQueriesUsingFile {
        Target: string;
        PackageMap: string;
        Queries: {
            QueryUsingFile: QueryUsingFile[];
        };
    }

    export interface Targets {
        TargetQueriesUsingFile: TargetQueriesUsingFile[];
    }

    export interface WUListQueriesUsingFileResponse {
        Exceptions: Exceptions;
        Process: string;
        FileName: string;
        Targets: {
            TargetQueriesUsingFile: TargetQueriesUsingFile[];
        };
    }

    export interface WUMultiQuerysetDetails {
        ClusterName: string;
        QuerySetName: string;
        Filter: string;
        FilterType: WUQuerySetFilterType;
        CheckAllNodes: boolean;
    }

    export interface QuerySetAlias {
        Id: string;
        Name: string;
    }

    export interface Aliases {
        QuerySetAlias: QuerySetAlias[];
    }

    export interface WUQuerySetDetail {
        QuerySetName: string;
        Queries: Queries;
        Aliases: {
            QuerySetAlias: QuerySetAlias[];
        };
    }

    export interface Querysets {
        WUQuerySetDetail: WUQuerySetDetail[];
    }

    export interface WUMultiQuerySetDetailsResponse {
        Exceptions: Exceptions;
        ClusterName: string;
        Querysets: {
            WUQuerySetDetail: WUQuerySetDetail[];
        };
    }

    export interface WUProcessGraph {
        Wuid: string;
        Name: string;
    }

    export interface WUProcessGraphResponse {
        Exceptions: Exceptions;
        theGraph: string;
    }

    export interface WUProtect {
        Wuids: Wuids;
        Protect: boolean;
    }

    export interface WUProtectResponse {
        Exceptions: Exceptions;
        ActionResults: ActionResults;
    }

    export interface WUPublishWorkunit {
        Wuid: string;
        Cluster: string;
        QueryName: string;
        WorkUnitJobName: string;
        JobName: string;
        Activate: int;
        NotifyCluster: boolean;
        Wait: int;
        NoReload: boolean;
        UpdateWorkUnitName: boolean;
        memoryLimit: string;
        TimeLimit: nonNegativeInteger;
        WarnTimeLimit: nonNegativeInteger;
        Priority: string;
        RemoteDali: string;
        Comment: string;
        DontCopyFiles: boolean;
        SourceProcess: string;
        AllowForeignFiles: boolean;
        UpdateDfs: boolean;
        UpdateSuperFiles: boolean;
        UpdateCloneFrom: boolean;
        AppendCluster: boolean;
        IncludeFileErrors: boolean;
    }

    export interface WUPublishWorkunitResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Result: string;
        QuerySet: string;
        QueryName: string;
        QueryId: string;
        ReloadFailed: boolean;
        Suspended: boolean;
        ErrorMessage: string;
        ClusterFiles: ClusterFiles;
        FileErrors: FileErrors;
    }

    export interface WUPushEvent {
        EventName: string;
        EventText: string;
    }

    export interface WUPushEventResponse {
        Exceptions: Exceptions;
    }

    export interface WUQuery {
        Wuid: string;
        Type: string;
        Cluster: string;
        RoxieCluster: string;
        Owner: string;
        State: string;
        StartDate: string;
        EndDate: string;
        ECL: string;
        Jobname: string;
        LogicalFile: string;
        LogicalFileSearchType: string;
        ApplicationValues: ApplicationValues;
        BeforeWU: string;
        AfterWU: string;
        TotalClusterTimeThresholdMilliSec: unsignedInt;
        Count: int;
        PageSize: long;
        PageStartFrom: long;
        PageEndAt: long;
        Sortby: string;
        Descending: boolean;
        CacheHint: long;
    }

    export interface WUQueryResponse {
        Exceptions: Exceptions;
        Type: string;
        Cluster: string;
        RoxieCluster: string;
        Owner: string;
        State: string;
        StartDate: string;
        EndDate: string;
        ECL: string;
        Jobname: string;
        LogicalFile: string;
        LogicalFileSearchType: string;
        Current: string;
        Next: string;
        Count: int;
        PageSize: long;
        PrevPage: long;
        NextPage: long;
        LastPage: long;
        NumWUs: int;
        First: boolean;
        PageStartFrom: long;
        PageEndAt: long;
        Sortby: string;
        Descending: boolean;
        BasicQuery: string;
        Filters: string;
        CacheHint: long;
        Workunits: Workunits;
    }

    export interface WUQueryConfig {
        Target: string;
        QueryId: string;
        Wait: int;
        NoReload: boolean;
        memoryLimit: string;
        TimeLimit: nonNegativeInteger;
        WarnTimeLimit: nonNegativeInteger;
        Priority: string;
        Comment: string;
    }

    export interface WUQueryConfigResponse {
        Exceptions: Exceptions;
        ReloadFailed: boolean;
        Results: Results;
    }

    export interface WUQueryDetails {
        QueryId: string;
        QuerySet: string;
        IncludeStateOnClusters: boolean;
        IncludeSuperFiles: boolean;
        IncludeWsEclAddresses: boolean;
        CheckAllNodes: boolean;
        IncludeWUDetails: boolean;
        IncludeWUQueryFiles: boolean;
    }

    export interface LogicalFiles {
        Item: string[];
    }

    export interface SubFiles {
        File: string[];
    }

    export interface SuperFile {
        Name: string;
        SubFiles: {
            File: string[];
        };
        SuperFiles: SuperFiles;
    }

    export interface SuperFiles {
        SuperFile: SuperFile[];
    }

    export interface LibrariesUsed {
        Item: string[];
    }

    export interface WsEclAddresses {
        Address: string[];
    }

    export interface WUGraphs {
        ECLGraph: ECLGraph[];
    }

    export interface WUTimers {
        ECLTimer: ECLTimer[];
    }

    export interface WUQueryDetailsResponse {
        Exceptions: Exceptions;
        QueryId: string;
        QuerySet: string;
        QueryName: string;
        Wuid: string;
        Dll: string;
        Suspended: boolean;
        Activated: boolean;
        SuspendedBy: string;
        Clusters: Clusters;
        PublishedBy: string;
        Comment: string;
        LogicalFiles: {
            Item: string[];
        };
        SuperFiles: {
            SuperFile: SuperFile[];
        };
        IsLibrary: boolean;
        Priority: string;
        PriorityID: int;
        WUSnapShot: string;
        CompileTime: string;
        LibrariesUsed: {
            Item: string[];
        };
        CountGraphs: int;
        ResourceURLCount: int;
        WsEclAddresses: {
            Address: string[];
        };
        WUGraphs: {
            ECLGraph: ECLGraph[];
        };
        WUTimers: {
            ECLTimer: ECLTimer[];
        };
    }

    export interface WUQueryDetailsLightWeight {
        QueryId: string;
        QuerySet: string;
        IncludeWUDetails: boolean;
        IncludeWUQueryFiles: boolean;
        IncludeSuperFiles: boolean;
        IncludeWsEclAddresses: boolean;
        IncludeStateOnClusters: boolean;
        CheckAllNodes: boolean;
    }

    export interface WUQueryFiles {
        Target: string;
        QueryId: string;
    }

    export interface WUQueryFilesResponse {
        Exceptions: Exceptions;
        Files: Files;
        SuperFiles: SuperFiles;
        Queries: Queries;
    }

    export interface WUQueryGetGraph {
        Target: string;
        QueryId: string;
        GraphName: string;
        SubGraphId: string;
    }

    export interface WUQueryGetGraphResponse {
        Exceptions: Exceptions;
        Graphs: Graphs;
    }

    export interface WUQueryGetSummaryStats {
        Target: string;
        QueryId: string;
        FromTime: string;
        ToTime: string;
        IncludeRawStats: boolean;
    }

    export interface QuerySummaryStats {
        Endpoint: string;
        Status: string;
        StartTime: string;
        EndTime: string;
        CountTotal: int;
        CountFailed: int;
        AverageSlavesReplyLen: int;
        AverageBytesOut: long;
        SizeAvgPeakMemory: long;
        TimeAvgTotalExecuteMinutes: long;
        TimeMinTotalExecuteMinutes: long;
        TimeMaxTotalExecuteMinutes: long;
        Percentile97: long;
        Percentile97Estimate: boolean;
    }

    export interface StatsList {
        QuerySummaryStats: QuerySummaryStats[];
    }

    export interface EndpointQueryStats {
        Endpoint: string;
        Status: string;
        QueryStatsList: QueryStatsList;
    }

    export interface QueryStatsList {
        EndpointQueryStats: EndpointQueryStats[];
    }

    export interface WUQueryGetSummaryStatsResponse {
        Exceptions: Exceptions;
        StatsList: {
            QuerySummaryStats: QuerySummaryStats[];
        };
        QueryStatsList: {
            EndpointQueryStats: EndpointQueryStats[];
        };
    }

    export interface WUQuerysetAliasAction {
        Action: QuerySetAliasActionTypes;
        QuerySetName: string;
        Aliases: Aliases;
    }

    export interface WUQuerySetAliasActionResponse {
        Exceptions: Exceptions;
        Action: QuerySetAliasActionTypes;
        QuerySetName: string;
        Results: Results;
    }

    export interface WUQuerysetCopyQuery {
        Source: string;
        Target: string;
        Cluster: string;
        DaliServer: string;
        Activate: int;
        Overwrite: boolean;
        DontCopyFiles: boolean;
        Wait: int;
        NoReload: boolean;
        memoryLimit: string;
        TimeLimit: nonNegativeInteger;
        WarnTimeLimit: nonNegativeInteger;
        priority: string;
        Comment: string;
        SourceProcess: string;
        DestName: string;
        AllowForeignFiles: boolean;
        UpdateSuperFiles: boolean;
        UpdateCloneFrom: boolean;
        AppendCluster: boolean;
        IncludeFileErrors: boolean;
        SourceSSL: boolean;
    }

    export interface WUQuerySetCopyQueryResponse {
        Exceptions: Exceptions;
        QueryId: string;
        FileErrors: FileErrors;
    }

    export interface WUQuerysetDetails {
        QuerySetName: string;
        Filter: string;
        ClusterName: string;
        FilterType: WUQuerySetFilterType;
        CheckAllNodes: boolean;
    }

    export interface QuerysetAliases {
        QuerySetAlias: QuerySetAlias[];
    }

    export interface ClusterNames {
        Item: string[];
    }

    export interface WUQuerySetDetailsResponse {
        Exceptions: Exceptions;
        QuerySetName: string;
        QuerysetQueries: QuerysetQueries;
        QuerysetAliases: {
            QuerySetAlias: QuerySetAlias[];
        };
        ClusterName: string;
        Filter: string;
        FilterType: WUQuerySetFilterType;
        ClusterNames: {
            Item: string[];
        };
    }

    export interface WUQuerysetExport {
        Target: string;
        Compress: boolean;
        ActiveOnly: boolean;
        Protect: boolean;
    }

    export interface WUQuerysetExportResponse {
        Exceptions: Exceptions;
        Target: string;
        Compressed: boolean;
        Data: base64Binary;
    }

    export interface WUQuerysetImport {
        Target: string;
        QueryMask: string;
        Replace: boolean;
        ActiveOnly: boolean;
        Activation: QuerysetImportActivation;
        Compressed: boolean;
        Data: base64Binary;
        AllowForeignFiles: boolean;
        DfsServer: string;
        CopyFiles: boolean;
        OverwriteDfs: boolean;
        SourceProcess: string;
        UpdateSuperFiles: boolean;
        UpdateCloneFrom: boolean;
        AppendCluster: boolean;
        IncludeFileErrors: boolean;
    }

    export interface ImportedQueries {
        QueryId: string[];
    }

    export interface MissingWuids {
        QueryId: string[];
    }

    export interface WUQuerysetImportResponse {
        Exceptions: Exceptions;
        Target: string;
        ClearedExisting: boolean;
        Success: boolean;
        ImportedQueries: {
            QueryId: string[];
        };
        ExistingQueries: ExistingQueries;
        MissingWuids: {
            QueryId: string[];
        };
        FileErrors: FileErrors;
    }

    export interface WUQuerysetQueryAction {
        Action: QuerySetQueryActionTypes;
        QuerySetName: string;
        Queries: Queries;
    }

    export interface WUQuerySetQueryActionResponse {
        Exceptions: Exceptions;
        Action: QuerySetQueryActionTypes;
        QuerySetName: string;
        Results: Results;
    }

    export interface WUQuerysets {
        test: boolean;
    }

    export interface WUQuerysetsResponse {
        Exceptions: Exceptions;
        Querysets: Querysets;
    }

    export interface WURecreateQuery {
        Target: string;
        QueryId: string;
        DebugValues: DebugValues;
        DestTarget: string;
        Republish: boolean;
        Activate: WUQueryActivationMode;
        NoReload: boolean;
        MemoryLimit: string;
        TimeLimit: nonNegativeInteger;
        WarnTimeLimit: nonNegativeInteger;
        Priority: string;
        Comment: string;
        RemoteDali: string;
        DontCopyFiles: boolean;
        SourceProcess: string;
        AllowForeignFiles: boolean;
        UpdateDfs: boolean;
        UpdateSuperFiles: boolean;
        UpdateCloneFrom: boolean;
        AppendCluster: boolean;
        IncludeFileErrors: boolean;
        Wait: int;
    }

    export interface WURecreateQueryResponse {
        Exceptions: Exceptions;
        Wuid: string;
        QuerySet: string;
        QueryName: string;
        QueryId: string;
        MemoryLimit: string;
        TimeLimit: nonNegativeInteger;
        WarnTimeLimit: nonNegativeInteger;
        Priority: string;
        Comment: string;
        ReloadFailed: boolean;
        Suspended: boolean;
        ErrorMessage: string;
        FileErrors: FileErrors;
    }

    export interface WUResubmit {
        Wuids: Wuids;
        BlockTillFinishTimer: int;
        ResetWorkflow: boolean;
        CloneWorkunit: boolean;
    }

    export interface WU {
        WUID: string;
        ParentWUID: string;
    }

    export interface WUs {
        WU: WU[];
    }

    export interface WUResubmitResponse {
        Exceptions: Exceptions;
        WUs: {
            WU: WU[];
        };
    }

    export interface NamedValue {
        Name: string;
        Value: string;
    }

    export interface FilterBy {
        NamedValue: NamedValue[];
    }

    export interface WUResult {
        Wuid: string;
        Sequence: int;
        ResultName: string;
        LogicalName: string;
        Cluster: string;
        SuppressXmlSchema: boolean;
        BypassCachedResult: boolean;
        FilterBy: {
            NamedValue: NamedValue[];
        };
        Start: long;
        Count: int;
    }

    export interface WUResultResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Sequence: int;
        LogicalName: string;
        Cluster: string;
        Name: string;
        Start: long;
        Requested: int;
        Count: int;
        Total: long;
        Result: string;
    }

    export interface WUResultBin {
        LogicalName: string;
        Wuid: string;
        ResultName: string;
        Sequence: int;
        Format: string;
        Cluster: string;
        FilterBy: FilterBy;
        Start: long;
        Count: int;
    }

    export interface WUResultBinResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Sequence: int;
        Name: string;
        Start: long;
        Count: int;
        Requested: int;
        Total: long;
        Result: base64Binary;
        Format: string;
    }

    export interface WUResultSummary {
        Wuid: string;
        Sequence: int;
    }

    export interface Result {
        Name: string;
        Sequence: int;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: long;
        ECLSchemas: ECLSchemas;
        XmlSchema: string;
    }

    export interface WUResultSummaryResponse {
        Exceptions: Exceptions;
        Wuid: string;
        Sequence: int;
        Format: int;
        Result: {
            Name: string;
            Sequence: int;
            Value: string;
            Link: string;
            FileName: string;
            IsSupplied: boolean;
            ShowFileContent: boolean;
            Total: long;
            ECLSchemas: ECLSchemas;
            XmlSchema: string;
        };
    }

    export interface WUResultView {
        Wuid: string;
        ViewName: string;
        Sequence: int;
        ResultName: string;
    }

    export interface WUResultViewResponse {
        Exceptions: Exceptions;
        Wuid: string;
        ViewName: string;
        Result: string;
    }

    export interface WURun {
        QuerySet: string;
        Query: string;
        Wuid: string;
        CloneWorkunit: boolean;
        Cluster: string;
        Wait: int;
        Input: string;
        NoRootTag: boolean;
        DebugValues: DebugValues;
        Variables: Variables;
        ApplicationValues: ApplicationValues;
        ExceptionSeverity: WUExceptionSeverity;
    }

    export interface WURunResponse {
        Exceptions: Exceptions;
        Wuid: string;
        State: string;
        Results: string;
    }

    export interface WUSchedule {
        Wuid: string;
        Cluster: string;
        Queue: string;
        Snapshot: string;
        When: dateTime;
        MaxRunTime: int;
    }

    export interface WUScheduleResponse {
        Exceptions: Exceptions;
    }

    export interface WUShowScheduled {
        Cluster: string;
        EventName: string;
        PushEventName: string;
        PushEventText: string;
        State: string;
        JobName: string;
        Owner: string;
        EventText: string;
    }

    export interface WUShowScheduledResponse {
        Exceptions: Exceptions;
        ClusterSelected: int;
        EventName: string;
        PushEventName: string;
        PushEventText: string;
        Query: string;
        Clusters: Clusters;
        Workunits: Workunits;
    }

    export interface WUSubmit {
        Wuid: string;
        Cluster: string;
        Queue: string;
        Snapshot: string;
        MaxRunTime: int;
        MaxCost: int;
        BlockTillFinishTimer: int;
        SyntaxCheck: boolean;
        NotifyCluster: boolean;
    }

    export interface WUSubmitResponse {
        Exceptions: Exceptions;
    }

    export interface WUSyntaxCheckECL {
        ECL: string;
        ModuleName: string;
        AttributeName: string;
        Queue: string;
        Cluster: string;
        Snapshot: string;
        TimeToWait: int;
        PersistWorkunit: boolean;
        DebugValues: DebugValues;
    }

    export interface WUSyntaxCheckResponse {
        Exceptions: Exceptions;
        Errors: Errors;
        Message: string;
    }

    export interface WUUpdate {
        Wuid: string;
        State: int;
        StateOrig: int;
        Jobname: string;
        JobnameOrig: string;
        QueryText: string;
        Action: int;
        Description: string;
        DescriptionOrig: string;
        AddDrilldownFields: boolean;
        ResultLimit: int;
        Protected: boolean;
        ProtectedOrig: boolean;
        PriorityClass: int;
        PriorityLevel: int;
        Scope: string;
        ScopeOrig: string;
        ClusterSelection: string;
        ClusterOrig: string;
        XmlParams: string;
        ThorSlaveIP: string;
        QueryMainDefinition: string;
        DebugValues: DebugValues;
        ApplicationValues: ApplicationValues;
    }

    export interface WUUpdateQueryEntry {
        QuerySet: string;
        QueryId: string;
        Comment: string;
    }

    export interface WUUpdateQueryEntryResponse {
        Exceptions: Exceptions;
    }

    export interface WUWaitCompiled {
        Wuid: string;
        Wait: int;
        ReturnOnWait: boolean;
    }

    export interface WUWaitResponse {
        Exceptions: Exceptions;
        StateID: int;
    }

    export interface WUWaitComplete {
        Wuid: string;
        Wait: int;
        ReturnOnWait: boolean;
    }

}

export class WorkunitsServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsWorkunits", "1.88");
    }

    GVCAjaxGraph(request: WsWorkunits.GVCAjaxGraph): Promise<WsWorkunits.GVCAjaxGraphResponse> {
        return this._connection.send("GVCAjaxGraph", request);
    }

    Ping(request: WsWorkunits.Ping): Promise<WsWorkunits.WsWorkunitsPingResponse> {
        return this._connection.send("Ping", request);
    }

    WUAbort(request: WsWorkunits.WUAbort): Promise<WsWorkunits.WUAbortResponse> {
        return this._connection.send("WUAbort", request);
    }

    WUAction(request: WsWorkunits.WUAction): Promise<WsWorkunits.WUActionResponse> {
        return this._connection.send("WUAction", request);
    }

    WUAddLocalFileToWorkunit(request: WsWorkunits.WUAddLocalFileToWorkunit): Promise<WsWorkunits.WUAddLocalFileToWorkunitResponse> {
        return this._connection.send("WUAddLocalFileToWorkunit", request);
    }

    WUCDebug(request: WsWorkunits.WUCDebug): Promise<WsWorkunits.WUDebugResponse> {
        return this._connection.send("WUCDebug", request);
    }

    WUCheckFeatures(request: WsWorkunits.WUCheckFeatures): Promise<WsWorkunits.WUCheckFeaturesResponse> {
        return this._connection.send("WUCheckFeatures", request);
    }

    WUClusterJobQueueLOG(request: WsWorkunits.WUClusterJobQueueLOG): Promise<WsWorkunits.WUClusterJobQueueLOGResponse> {
        return this._connection.send("WUClusterJobQueueLOG", request);
    }

    WUClusterJobQueueXLS(request: WsWorkunits.WUClusterJobQueueXLS): Promise<WsWorkunits.WUClusterJobQueueXLSResponse> {
        return this._connection.send("WUClusterJobQueueXLS", request);
    }

    WUClusterJobSummaryXLS(request: WsWorkunits.WUClusterJobSummaryXLS): Promise<WsWorkunits.WUClusterJobSummaryXLSResponse> {
        return this._connection.send("WUClusterJobSummaryXLS", request);
    }

    WUClusterJobXLS(request: WsWorkunits.WUClusterJobXLS): Promise<WsWorkunits.WUClusterJobXLSResponse> {
        return this._connection.send("WUClusterJobXLS", request);
    }

    WUCompileECL(request: WsWorkunits.WUCompileECL): Promise<WsWorkunits.WUCompileECLResponse> {
        return this._connection.send("WUCompileECL", request);
    }

    WUCopyLogicalFiles(request: WsWorkunits.WUCopyLogicalFiles): Promise<WsWorkunits.WUCopyLogicalFilesResponse> {
        return this._connection.send("WUCopyLogicalFiles", request);
    }

    WUCopyQuerySet(request: WsWorkunits.WUCopyQuerySet): Promise<WsWorkunits.WUCopyQuerySetResponse> {
        return this._connection.send("WUCopyQuerySet", request);
    }

    WUCreate(request: WsWorkunits.WUCreate): Promise<WsWorkunits.WUCreateResponse> {
        return this._connection.send("WUCreate", request);
    }

    WUCreateAndUpdate(request: WsWorkunits.WUCreateAndUpdate): Promise<WsWorkunits.WUUpdateResponse> {
        return this._connection.send("WUCreateAndUpdate", request);
    }

    WUCreateZAPInfo(request: WsWorkunits.WUCreateZAPInfo): Promise<WsWorkunits.WUCreateZAPInfoResponse> {
        return this._connection.send("WUCreateZAPInfo", request);
    }

    WUDelete(request: WsWorkunits.WUDelete): Promise<WsWorkunits.WUDeleteResponse> {
        return this._connection.send("WUDelete", request);
    }

    WUDeployWorkunit(request: WsWorkunits.WUDeployWorkunit): Promise<WsWorkunits.WUDeployWorkunitResponse> {
        return this._connection.send("WUDeployWorkunit", request);
    }

    WUDetails(request: WsWorkunits.WUDetails): Promise<WsWorkunits.WUDetailsResponse> {
        return this._connection.send("WUDetails", request);
    }

    WUDetailsMeta(request: WsWorkunits.WUDetailsMeta): Promise<WsWorkunits.WUDetailsMetaResponse> {
        return this._connection.send("WUDetailsMeta", request);
    }

    WUEclDefinitionAction(request: WsWorkunits.WUEclDefinitionAction): Promise<WsWorkunits.WUEclDefinitionActionResponse> {
        return this._connection.send("WUEclDefinitionAction", request);
    }

    WUExport(request: WsWorkunits.WUExport): Promise<WsWorkunits.WUExportResponse> {
        return this._connection.send("WUExport", request);
    }

    WUFile(request: WsWorkunits.WUFile): Promise<WsWorkunits.WULogFileResponse> {
        return this._connection.send("WUFile", request);
    }

    WUFullResult(request: WsWorkunits.WUFullResult): Promise<WsWorkunits.WUFullResultResponse> {
        return this._connection.send("WUFullResult", request);
    }

    WUGVCGraphInfo(request: WsWorkunits.WUGVCGraphInfo): Promise<WsWorkunits.WUGVCGraphInfoResponse> {
        return this._connection.send("WUGVCGraphInfo", request);
    }

    WUGetArchiveFile(request: WsWorkunits.WUGetArchiveFile): Promise<WsWorkunits.WUGetArchiveFileResponse> {
        return this._connection.send("WUGetArchiveFile", request);
    }

    WUGetDependancyTrees(request: WsWorkunits.WUGetDependancyTrees): Promise<WsWorkunits.WUGetDependancyTreesResponse> {
        return this._connection.send("WUGetDependancyTrees", request);
    }

    WUGetGraph(request: WsWorkunits.WUGetGraph): Promise<WsWorkunits.WUGetGraphResponse> {
        return this._connection.send("WUGetGraph", request);
    }

    WUGetGraphNameAndTypes(request: WsWorkunits.WUGetGraphNameAndTypes): Promise<WsWorkunits.WUGetGraphNameAndTypesResponse> {
        return this._connection.send("WUGetGraphNameAndTypes", request);
    }

    WUGetNumFileToCopy(request: WsWorkunits.WUGetNumFileToCopy): Promise<WsWorkunits.WUGetNumFileToCopyResponse> {
        return this._connection.send("WUGetNumFileToCopy", request);
    }

    WUGetPlugins(request: WsWorkunits.WUGetPlugins): Promise<WsWorkunits.WUGetPluginsResponse> {
        return this._connection.send("WUGetPlugins", request);
    }

    WUGetStats(request: WsWorkunits.WUGetStats): Promise<WsWorkunits.WUGetStatsResponse> {
        return this._connection.send("WUGetStats", request);
    }

    WUGetThorJobList(request: WsWorkunits.WUGetThorJobList): Promise<WsWorkunits.WUGetThorJobListResponse> {
        return this._connection.send("WUGetThorJobList", request);
    }

    WUGetThorJobQueue(request: WsWorkunits.WUGetThorJobQueue): Promise<WsWorkunits.WUGetThorJobQueueResponse> {
        return this._connection.send("WUGetThorJobQueue", request);
    }

    WUGetZAPInfo(request: WsWorkunits.WUGetZAPInfo): Promise<WsWorkunits.WUGetZAPInfoResponse> {
        return this._connection.send("WUGetZAPInfo", request);
    }

    WUGraphInfo(request: WsWorkunits.WUGraphInfo): Promise<WsWorkunits.WUGraphInfoResponse> {
        return this._connection.send("WUGraphInfo", request);
    }

    WUGraphTiming(request: WsWorkunits.WUGraphTiming): Promise<WsWorkunits.WUGraphTimingResponse> {
        return this._connection.send("WUGraphTiming", request);
    }

    WUInfo(request: WsWorkunits.WUInfo): Promise<WsWorkunits.WUInfoResponse> {
        return this._connection.send("WUInfo", request);
    }

    WUInfoDetails(request: WsWorkunits.WUInfoDetails): Promise<WsWorkunits.WUInfoResponse> {
        return this._connection.send("WUInfoDetails", request);
    }

    WUJobList(request: WsWorkunits.WUJobList): Promise<WsWorkunits.WUJobListResponse> {
        return this._connection.send("WUJobList", request);
    }

    WULightWeightQuery(request: WsWorkunits.WULightWeightQuery): Promise<WsWorkunits.WULightWeightQueryResponse> {
        return this._connection.send("WULightWeightQuery", request);
    }

    WUListArchiveFiles(request: WsWorkunits.WUListArchiveFiles): Promise<WsWorkunits.WUListArchiveFilesResponse> {
        return this._connection.send("WUListArchiveFiles", request);
    }

    WUListLocalFileRequired(request: WsWorkunits.WUListLocalFileRequired): Promise<WsWorkunits.WUListLocalFileRequiredResponse> {
        return this._connection.send("WUListLocalFileRequired", request);
    }

    WUListQueries(request: WsWorkunits.WUListQueries): Promise<WsWorkunits.WUListQueriesResponse> {
        return this._connection.send("WUListQueries", request);
    }

    WUListQueriesUsingFile(request: WsWorkunits.WUListQueriesUsingFile): Promise<WsWorkunits.WUListQueriesUsingFileResponse> {
        return this._connection.send("WUListQueriesUsingFile", request);
    }

    WUMultiQuerysetDetails(request: WsWorkunits.WUMultiQuerysetDetails): Promise<WsWorkunits.WUMultiQuerySetDetailsResponse> {
        return this._connection.send("WUMultiQuerysetDetails", request);
    }

    WUProcessGraph(request: WsWorkunits.WUProcessGraph): Promise<WsWorkunits.WUProcessGraphResponse> {
        return this._connection.send("WUProcessGraph", request);
    }

    WUProtect(request: WsWorkunits.WUProtect): Promise<WsWorkunits.WUProtectResponse> {
        return this._connection.send("WUProtect", request);
    }

    WUPublishWorkunit(request: WsWorkunits.WUPublishWorkunit): Promise<WsWorkunits.WUPublishWorkunitResponse> {
        return this._connection.send("WUPublishWorkunit", request);
    }

    WUPushEvent(request: WsWorkunits.WUPushEvent): Promise<WsWorkunits.WUPushEventResponse> {
        return this._connection.send("WUPushEvent", request);
    }

    WUQuery(request: WsWorkunits.WUQuery): Promise<WsWorkunits.WUQueryResponse> {
        return this._connection.send("WUQuery", request);
    }

    WUQueryConfig(request: WsWorkunits.WUQueryConfig): Promise<WsWorkunits.WUQueryConfigResponse> {
        return this._connection.send("WUQueryConfig", request);
    }

    WUQueryDetails(request: WsWorkunits.WUQueryDetails): Promise<WsWorkunits.WUQueryDetailsResponse> {
        return this._connection.send("WUQueryDetails", request);
    }

    WUQueryDetailsLightWeight(request: WsWorkunits.WUQueryDetailsLightWeight): Promise<WsWorkunits.WUQueryDetailsResponse> {
        return this._connection.send("WUQueryDetailsLightWeight", request);
    }

    WUQueryFiles(request: WsWorkunits.WUQueryFiles): Promise<WsWorkunits.WUQueryFilesResponse> {
        return this._connection.send("WUQueryFiles", request);
    }

    WUQueryGetGraph(request: WsWorkunits.WUQueryGetGraph): Promise<WsWorkunits.WUQueryGetGraphResponse> {
        return this._connection.send("WUQueryGetGraph", request);
    }

    WUQueryGetSummaryStats(request: WsWorkunits.WUQueryGetSummaryStats): Promise<WsWorkunits.WUQueryGetSummaryStatsResponse> {
        return this._connection.send("WUQueryGetSummaryStats", request);
    }

    WUQuerysetAliasAction(request: WsWorkunits.WUQuerysetAliasAction): Promise<WsWorkunits.WUQuerySetAliasActionResponse> {
        return this._connection.send("WUQuerysetAliasAction", request);
    }

    WUQuerysetCopyQuery(request: WsWorkunits.WUQuerysetCopyQuery): Promise<WsWorkunits.WUQuerySetCopyQueryResponse> {
        return this._connection.send("WUQuerysetCopyQuery", request);
    }

    WUQuerysetDetails(request: WsWorkunits.WUQuerysetDetails): Promise<WsWorkunits.WUQuerySetDetailsResponse> {
        return this._connection.send("WUQuerysetDetails", request);
    }

    WUQuerysetExport(request: WsWorkunits.WUQuerysetExport): Promise<WsWorkunits.WUQuerysetExportResponse> {
        return this._connection.send("WUQuerysetExport", request);
    }

    WUQuerysetImport(request: WsWorkunits.WUQuerysetImport): Promise<WsWorkunits.WUQuerysetImportResponse> {
        return this._connection.send("WUQuerysetImport", request);
    }

    WUQuerysetQueryAction(request: WsWorkunits.WUQuerysetQueryAction): Promise<WsWorkunits.WUQuerySetQueryActionResponse> {
        return this._connection.send("WUQuerysetQueryAction", request);
    }

    WUQuerysets(request: WsWorkunits.WUQuerysets): Promise<WsWorkunits.WUQuerysetsResponse> {
        return this._connection.send("WUQuerysets", request);
    }

    WURecreateQuery(request: WsWorkunits.WURecreateQuery): Promise<WsWorkunits.WURecreateQueryResponse> {
        return this._connection.send("WURecreateQuery", request);
    }

    WUResubmit(request: WsWorkunits.WUResubmit): Promise<WsWorkunits.WUResubmitResponse> {
        return this._connection.send("WUResubmit", request);
    }

    WUResult(request: WsWorkunits.WUResult): Promise<WsWorkunits.WUResultResponse> {
        return this._connection.send("WUResult", request);
    }

    WUResultBin(request: WsWorkunits.WUResultBin): Promise<WsWorkunits.WUResultBinResponse> {
        return this._connection.send("WUResultBin", request);
    }

    WUResultSummary(request: WsWorkunits.WUResultSummary): Promise<WsWorkunits.WUResultSummaryResponse> {
        return this._connection.send("WUResultSummary", request);
    }

    WUResultView(request: WsWorkunits.WUResultView): Promise<WsWorkunits.WUResultViewResponse> {
        return this._connection.send("WUResultView", request);
    }

    WURun(request: WsWorkunits.WURun): Promise<WsWorkunits.WURunResponse> {
        return this._connection.send("WURun", request);
    }

    WUSchedule(request: WsWorkunits.WUSchedule): Promise<WsWorkunits.WUScheduleResponse> {
        return this._connection.send("WUSchedule", request);
    }

    WUShowScheduled(request: WsWorkunits.WUShowScheduled): Promise<WsWorkunits.WUShowScheduledResponse> {
        return this._connection.send("WUShowScheduled", request);
    }

    WUSubmit(request: WsWorkunits.WUSubmit): Promise<WsWorkunits.WUSubmitResponse> {
        return this._connection.send("WUSubmit", request);
    }

    WUSyntaxCheckECL(request: WsWorkunits.WUSyntaxCheckECL): Promise<WsWorkunits.WUSyntaxCheckResponse> {
        return this._connection.send("WUSyntaxCheckECL", request);
    }

    WUUpdate(request: WsWorkunits.WUUpdate): Promise<WsWorkunits.WUUpdateResponse> {
        return this._connection.send("WUUpdate", request);
    }

    WUUpdateQueryEntry(request: WsWorkunits.WUUpdateQueryEntry): Promise<WsWorkunits.WUUpdateQueryEntryResponse> {
        return this._connection.send("WUUpdateQueryEntry", request);
    }

    WUWaitCompiled(request: WsWorkunits.WUWaitCompiled): Promise<WsWorkunits.WUWaitResponse> {
        return this._connection.send("WUWaitCompiled", request);
    }

    WUWaitComplete(request: WsWorkunits.WUWaitComplete): Promise<WsWorkunits.WUWaitResponse> {
        return this._connection.send("WUWaitComplete", request);
    }

}
