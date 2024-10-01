import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsWorkunits {

    export type int = number;
    export type double = number;
    export type long = number;
    export type nonNegativeInteger = number;
    export type unsignedInt = number;
    export type base64Binary = string;
    export type dateTime = string;
    export type integer = number;

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

    export enum LogSelectColumnMode {
        MIN = 0,
        DEFAULT = 1,
        ALL = 2,
        CUSTOM = 3
    }

    export enum SortDirection {
        ASC = 0,
        DSC = 1
    }

    export enum LogEventClass {
        ALL = "ALL",
        DIS = "DIS",
        ERR = "ERR",
        WRN = "WRN",
        INF = "INF",
        PRO = "PRO",
        MET = "MET",
        EVT = "EVT"
    }

    export enum WUDetailsAttrValueType {
        Single = "Single",
        List = "List",
        Multi = "Multi"
    }

    export enum EclDefinitionActions {
        SyntaxCheck = "SyntaxCheck",
        Deploy = "Deploy",
        Publish = "Publish"
    }

    export enum ErrorMessageFormat {
        xml = "xml",
        json = "json",
        text = "text"
    }

    export enum LogAccessLogFormat {
        XML = 0,
        JSON = 1,
        CSV = 2
    }

    export enum WUExceptionSeverity {
        info = "info",
        warning = "warning",
        error = "error",
        alert = "alert"
    }

    export enum WUQueryFilterSuspendedType {
        Allqueries = "Allqueries",
        Notsuspended = "Notsuspended",
        Suspended = "Suspended",
        Suspendedbyuser = "Suspendedbyuser",
        Suspendedbyfirstnode = "Suspendedbyfirstnode",
        Suspendedbyanynode = "Suspendedbyanynode"
    }

    export enum WUQuerySetFilterType {
        All = "All",
        Id = "Id",
        Name = "Name",
        Alias = "Alias",
        Status = "Status"
    }

    export enum WUProtectFilter {
        All = "All",
        Protected = "Protected",
        NotProtected = "NotProtected"
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
        DeleteQueriesAndWUs = "DeleteQueriesAndWUs",
        RemoveAllAliases = "RemoveAllAliases",
        ResetQueryStats = "ResetQueryStats"
    }

    export enum WUQueryActivationMode {
        DoNotActivateQuery = 0,
        ActivateQuery = 1,
        ActivateQuerySuspendPrevious = 2,
        ActivateQueryDeletePrevious = 3
    }

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
        Wuids: Wuids;
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
        Exceptions: Exceptions;
        ActionResults: ActionResults;
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

    export interface PropertyOptions {
        IncludeName: boolean;
        IncludeRawValue: boolean;
        IncludeFormatted: boolean;
        IncludeMeasure: boolean;
        IncludeCreator: boolean;
        IncludeCreatorType: boolean;
    }

    export interface WUAnalyseHotspot {
        Wuid: string;
        RootScope: string;
        OptOnlyActive: boolean;
        OnlyCriticalPath: boolean;
        IncludeProperties: boolean;
        IncludeStatistics: boolean;
        ThresholdPercent: double;
        PropertyOptions: PropertyOptions;
    }

    export interface Property {
        Name: string;
        RawValue: string;
        Formatted: string;
        Measure: string;
        Creator: string;
        CreatorType: string;
    }

    export interface Properties {
        Property: Property[];
    }

    export interface Note {
        Source: string;
        Message: string;
        ErrorCode: nonNegativeInteger;
        Severity: string;
        Cost: nonNegativeInteger;
    }

    export interface Notes {
        Note: Note[];
    }

    export interface Activity {
        ScopeName: string;
        Id: string;
        ScopeType: string;
        Properties: Properties;
        Notes: Notes;
        SinkActivity: string;
    }

    export interface Activities {
        Activity: Activity[];
    }

    export interface Dependency {
        ScopeName: string;
        Id: string;
        ScopeType: string;
        Properties: Properties;
        Notes: Notes;
        SinkActivity: string;
    }

    export interface Dependencies {
        Dependency: Dependency[];
    }

    export interface WUAnalyseHotspotResponse {
        Exceptions: Exceptions;
        RootScope: string;
        RootTime: long;
        Activities: Activities;
        Dependencies: Dependencies;
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
        IncludeFullVersion: boolean;
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
        Deployment: Deployment;
        BuildVersion: string;
        BuildMaturity: string;
        BuildTagTimestamp: string;
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

    export interface Dependencies2 {
        ECLAttribute: ECLAttribute[];
    }

    export interface WUCompileECLResponse {
        Exceptions: Exceptions;
        Complexity: string;
        Errors: Errors;
        Dependencies: Dependencies2;
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
        Clusters: Clusters;
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
        OnCluster: OnCluster;
        NotOnCluster: NotOnCluster;
        Foreign: Foreign;
        NotFound: NotFound;
    }

    export interface ClusterFiles {
        Cluster: Cluster[];
    }

    export interface WUCopyLogicalFilesResponse {
        Exceptions: Exceptions;
        Wuid: string;
        ClusterFiles: ClusterFiles;
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
        DfuCopyFiles: boolean;
        DfuQueue: string;
        DfuWait: nonNegativeInteger;
        DfuOverwrite: boolean;
        OnlyCopyFiles: boolean;
        StopIfFilesCopied: boolean;
        DfuPublisherWuid: string;
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
        CopiedQueries: CopiedQueries;
        ExistingQueries: ExistingQueries;
        FileErrors: FileErrors;
        DfuPublisherWuid: string;
        DfuPublisherState: string;
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
        IsAvailable: boolean;
    }

    export interface Helpers {
        ECLHelpFile: ECLHelpFile[];
    }

    export interface Exceptions2 {
        ECLException: ECLException[];
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
        ECLSourceFiles: ECLSourceFiles;
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
        ECLSchemas: ECLSchemas;
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
        Query: Query;
        Helpers: Helpers;
        Exceptions: Exceptions2;
        Graphs: Graphs;
        SourceFiles: SourceFiles;
        Results: Results;
        Variables: Variables;
        Timers: Timers;
        DebugValues: DebugValues;
        ApplicationValues: ApplicationValues;
        Workflows: Workflows;
        TimingData: TimingData;
        AllowedClusters: AllowedClusters;
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
        ThorLogList: ThorLogList;
        ResourceURLs: ResourceURLs;
        ResultViewCount: int;
        ResourceURLCount: int;
        DebugValueCount: int;
        WorkflowCount: int;
        HelpersCount: int;
        ServiceNames: ServiceNames;
        ExecuteCost: double;
        FileAccessCost: double;
        CompileCost: double;
        NoAccess: boolean;
    }

    export interface WUCreateResponse {
        Exceptions: Exceptions;
        Workunit: Workunit;
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

    export interface AbsoluteTimeRange {
        StartDate: dateTime;
        EndDate: dateTime;
    }

    export interface CustomColumns {
        Item: string[];
    }

    export interface ComponentsFilter {
        Item: string[];
    }

    export interface LogFilter {
        WildcardFilter: string;
        AbsoluteTimeRange: AbsoluteTimeRange;
        RelativeTimeRangeBuffer: unsignedInt;
        LineLimit: unsignedInt;
        LineStartFrom: long;
        SelectColumnMode: LogSelectColumnMode;
        CustomColumns: CustomColumns;
        ComponentsFilter: ComponentsFilter;
        Format: string;
        sortByTimeDirection: SortDirection;
        LogEventType: LogEventClass;
    }

    export interface WUCreateZAPInfo {
        Wuid: string;
        ESPApplication: string;
        ThorProcesses: string;
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
        LogFilter: LogFilter;
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

    export interface NamedValue {
        Name: string;
        Value: string;
    }

    export interface DebugValues2 {
        NamedValue: NamedValue[];
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
        DebugValues: DebugValues2;
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
        Scopes: Scopes;
        Ids: Ids;
        ScopeTypes: ScopeTypes;
        PropertyFilters: PropertyFilters;
    }

    export interface NestedFilter {
        Depth: unsignedInt;
        ScopeTypes: ScopeTypes;
    }

    export interface Properties2 {
        Property: string[];
    }

    export interface Extra {
        scopeType: string;
        Properties: Properties2;
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
        Properties: Properties2;
        ExtraProperties: ExtraProperties;
    }

    export interface ScopeOptions {
        IncludeMatchedScopesInResults: boolean;
        IncludeScope: boolean;
        IncludeId: boolean;
        IncludeScopeType: boolean;
    }

    export interface WUDetails {
        WUID: string;
        ScopeFilter: ScopeFilter;
        NestedFilter: NestedFilter;
        PropertiesToReturn: PropertiesToReturn;
        Filter: string;
        ScopeOptions: ScopeOptions;
        PropertyOptions: PropertyOptions;
    }

    export interface Scope {
        ScopeName: string;
        Id: string;
        ScopeType: string;
        Properties: Properties;
        Notes: Notes;
        SinkActivity: string;
    }

    export interface Scopes2 {
        Scope: Scope[];
    }

    export interface WUDetailsResponse {
        Exceptions: Exceptions;
        MaxVersion: string;
        WUID: string;
        Scopes: Scopes2;
    }

    export interface WUDetailsMeta {

    }

    export interface Property2 {
        Name: string;
        ValueType: WUDetailsAttrValueType;
    }

    export interface Properties3 {
        Property: Property2[];
    }

    export interface Measures {
        Measure: string[];
    }

    export interface Activity2 {
        Kind: unsignedInt;
        Name: string;
        IsSink: boolean;
        IsSource: boolean;
    }

    export interface Activities2 {
        Activity: Activity2[];
    }

    export interface WUDetailsMetaResponse {
        Exceptions: Exceptions;
        Properties: Properties3;
        ScopeTypes: ScopeTypes;
        Measures: Measures;
        Activities: Activities2;
    }

    export interface EclDefinitions {
        Item: string[];
    }

    export interface WUEclDefinitionAction {
        EclDefinitions: EclDefinitions;
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
        DfuCopyFiles: boolean;
        DfuOverwrite: boolean;
        DfuQueue: string;
        OnlyCopyFiles: boolean;
        StopIfFilesCopied: boolean;
        DfuPublisherWuid: string;
    }

    export interface WUEclDefinitionActionResult {
        EclDefinition: string;
        Action: string;
        WUID: string;
        QueryID: string;
        Result: string;
    }

    export interface ActionResults2 {
        WUEclDefinitionActionResult: WUEclDefinitionActionResult[];
    }

    export interface WUEclDefinitionActionResponse {
        Exceptions: Exceptions;
        ActionResults: ActionResults2;
        DfuPublisherWuid: string;
        DfuPublisherState: string;
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

    export interface LogColumns {
        Item: string[];
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
        MaxLogRecords: unsignedInt;
        LogSelectColumnMode: LogSelectColumnMode;
        LogFormat: LogAccessLogFormat;
        LogSearchTimeBuffSecs: unsignedInt;
        LogColumns: LogColumns;
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

    export interface ECLGraphEx {
        Name: string;
        Label: string;
        Type: string;
        Graph: string;
        Running: boolean;
        RunningId: long;
        Complete: boolean;
        Failed: boolean;
    }

    export interface Graphs2 {
        ECLGraphEx: ECLGraphEx[];
    }

    export interface WUGetGraphResponse {
        Exceptions: Exceptions;
        Graphs: Graphs2;
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
        GraphNameAndTypes: GraphNameAndTypes;
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
        Endpoints: Endpoints;
        CacheHint: long;
        Total: long;
    }

    export interface WUGetPlugins {

    }

    export interface Plugins {
        WUEclPluginsInFolder: WUEclPluginsInFolder[];
    }

    export interface WUEclPluginsInFolder {
        Path: string;
        Plugins: Plugins;
    }

    export interface WUGetPluginsResponse {
        Exceptions: Exceptions;
        Plugins: Plugins;
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
        Statistics: Statistics;
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
        JobList: JobList;
        InProgressJobList: InProgressJobList;
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
        QueueList: QueueList;
        Warning: string;
    }

    export interface WUGetZAPInfo {
        WUID: string;
    }

    export interface WUGetZAPInfoResponse {
        Exceptions: Exceptions;
        WUID: string;
        ESPApplication: string;
        ThorProcesses: string;
        BuildVersion: string;
        Archive: string;
        EmailTo: string;
        EmailFrom: string;
        Message: string;
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
        ResultViews: ResultViews;
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
        Jobs: Jobs;
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
        NoAccess: boolean;
    }

    export interface Workunits {
        ECLWorkunitLW: ECLWorkunitLW[];
    }

    export interface WULightWeightQueryResponse {
        Exceptions: Exceptions;
        NumWUs: int;
        CacheHint: long;
        Workunits: Workunits;
    }

    export interface WUListArchiveFiles {
        WUID: string;
    }

    export interface ArchiveModules {
        ArchiveModule: ArchiveModule[];
    }

    export interface File2 {
        Name: string;
        Key: string;
        SourcePath: string;
        Path: string;
    }

    export interface Files {
        File: File2[];
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
        Files: Files;
    }

    export interface WUListArchiveFilesResponse {
        Exceptions: Exceptions;
        ArchiveModules: ArchiveModules;
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
        LocalFileUploads: LocalFileUploads;
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

    export interface ClusterQueryState {
        Cluster: string;
        State: string;
        Errors: string;
        MixedNodeStates: boolean;
    }

    export interface Clusters2 {
        ClusterQueryState: ClusterQueryState[];
    }

    export interface QuerySetQuery {
        Id: string;
        Name: string;
        Wuid: string;
        Dll: string;
        Suspended: boolean;
        Clusters: Clusters2;
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
        QuerysetQueries: QuerysetQueries;
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
        Queries: Queries;
    }

    export interface Targets {
        TargetQueriesUsingFile: TargetQueriesUsingFile[];
    }

    export interface WUListQueriesUsingFileResponse {
        Exceptions: Exceptions;
        Process: string;
        FileName: string;
        Targets: Targets;
    }

    export interface WUMultiQuerysetDetails {
        ClusterName: string;
        QuerySetName: string;
        Filter: string;
        FilterType: WUQuerySetFilterType;
        CheckAllNodes: boolean;
    }

    export interface Queries2 {
        QuerySetQuery: QuerySetQuery[];
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
        Queries: Queries2;
        Aliases: Aliases;
    }

    export interface Querysets {
        WUQuerySetDetail: WUQuerySetDetail[];
    }

    export interface WUMultiQuerySetDetailsResponse {
        Exceptions: Exceptions;
        ClusterName: string;
        Querysets: Querysets;
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
        DfuCopyFiles: boolean;
        DfuQueue: string;
        DfuWait: nonNegativeInteger;
        DfuOverwrite: boolean;
        OnlyCopyFiles: boolean;
        StopIfFilesCopied: boolean;
        DfuPublisherWuid: string;
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
        DfuPublisherWuid: string;
        DfuPublisherState: string;
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
        Protected: WUProtectFilter;
        Sortby: string;
        Descending: boolean;
        CacheHint: long;
    }

    export interface ECLWorkunit {
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
        Query: Query;
        Helpers: Helpers;
        Exceptions: Exceptions2;
        Graphs: Graphs;
        SourceFiles: SourceFiles;
        Results: Results;
        Variables: Variables;
        Timers: Timers;
        DebugValues: DebugValues;
        ApplicationValues: ApplicationValues;
        Workflows: Workflows;
        TimingData: TimingData;
        AllowedClusters: AllowedClusters;
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
        ThorLogList: ThorLogList;
        ResourceURLs: ResourceURLs;
        ResultViewCount: int;
        ResourceURLCount: int;
        DebugValueCount: int;
        WorkflowCount: int;
        HelpersCount: int;
        ServiceNames: ServiceNames;
        ExecuteCost: double;
        FileAccessCost: double;
        CompileCost: double;
        NoAccess: boolean;
    }

    export interface Workunits2 {
        ECLWorkunit: ECLWorkunit[];
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
        Workunits: Workunits2;
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

    export interface Result {
        QueryId: string;
    }

    export interface Results2 {
        Result: Result[];
    }

    export interface WUQueryConfigResponse {
        Exceptions: Exceptions;
        ReloadFailed: boolean;
        Results: Results2;
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

    export interface SuperFiles {
        SuperFile: SuperFile[];
    }

    export interface SuperFile {
        Name: string;
        SubFiles: SubFiles;
        SuperFiles: SuperFiles;
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
        Clusters: Clusters2;
        PublishedBy: string;
        Comment: string;
        LogicalFiles: LogicalFiles;
        SuperFiles: SuperFiles;
        IsLibrary: boolean;
        Priority: string;
        PriorityID: int;
        WUSnapShot: string;
        CompileTime: string;
        LibrariesUsed: LibrariesUsed;
        CountGraphs: int;
        ResourceURLCount: int;
        WsEclAddresses: WsEclAddresses;
        WUGraphs: WUGraphs;
        WUTimers: WUTimers;
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

    export interface File3 {
        FileName: string;
        FileSize: long;
        NumberOfParts: unsignedInt;
    }

    export interface Files2 {
        File: File3[];
    }

    export interface Query2 {
        QueryId: string;
        Files: Files2;
        SuperFiles: SuperFiles;
    }

    export interface Queries3 {
        Query: Query2[];
    }

    export interface WUQueryFilesResponse {
        Exceptions: Exceptions;
        Files: Files2;
        SuperFiles: SuperFiles;
        Queries: Queries3;
    }

    export interface WUQueryGetGraph {
        Target: string;
        QueryId: string;
        GraphName: string;
        SubGraphId: string;
    }

    export interface WUQueryGetGraphResponse {
        Exceptions: Exceptions;
        Graphs: Graphs2;
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

    export interface AggregateQueryStatsList {
        QuerySummaryStats: QuerySummaryStats[];
    }

    export interface QueryStatsRecord {
        StartTime: string;
        ElapsedTimeMs: long;
        MemoryUsed: long;
        BytesOut: long;
        SlavesReplyLen: int;
        Failed: boolean;
    }

    export interface QueryStatsRecordList {
        QueryStatsRecord: QueryStatsRecord[];
    }

    export interface QueryStats {
        ID: string;
        AggregateQueryStatsList: AggregateQueryStatsList;
        QueryStatsRecordList: QueryStatsRecordList;
    }

    export interface QueryStatsList {
        EndpointQueryStats: EndpointQueryStats[];
    }

    export interface EndpointQueryStats {
        Endpoint: string;
        Status: string;
        QueryStatsList: QueryStatsList;
    }

    export interface WUQueryGetSummaryStatsResponse {
        Exceptions: Exceptions;
        StatsList: StatsList;
        QueryStatsList: QueryStatsList;
    }

    export interface Alias {
        Name: string;
    }

    export interface Aliases2 {
        Alias: Alias[];
    }

    export interface WUQuerysetAliasAction {
        Action: QuerySetAliasActionTypes;
        QuerySetName: string;
        Aliases: Aliases2;
    }

    export interface Result2 {
        Name: string;
        Success: boolean;
        Code: int;
        Message: string;
    }

    export interface Results3 {
        Result: Result2[];
    }

    export interface WUQuerySetAliasActionResponse {
        Exceptions: Exceptions;
        Action: QuerySetAliasActionTypes;
        QuerySetName: string;
        Results: Results3;
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
        DfuCopyFiles: boolean;
        DfuQueue: string;
        DfuWait: nonNegativeInteger;
        DfuOverwrite: boolean;
        OnlyCopyFiles: boolean;
        StopIfFilesCopied: boolean;
        DfuPublisherWuid: string;
    }

    export interface WUQuerySetCopyQueryResponse {
        Exceptions: Exceptions;
        QueryId: string;
        FileErrors: FileErrors;
        DfuPublisherWuid: string;
        DfuPublisherState: string;
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
        QuerysetAliases: QuerysetAliases;
        ClusterName: string;
        Filter: string;
        FilterType: WUQuerySetFilterType;
        ClusterNames: ClusterNames;
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
        DfuCopyFiles: boolean;
        DfuQueue: string;
        DfuWait: nonNegativeInteger;
        DfuOverwrite: boolean;
        OnlyCopyFiles: boolean;
        StopIfFilesCopied: boolean;
        DfuPublisherWuid: string;
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
        ImportedQueries: ImportedQueries;
        ExistingQueries: ExistingQueries;
        MissingWuids: MissingWuids;
        FileErrors: FileErrors;
        DfuPublisherWuid: string;
        DfuPublisherState: string;
    }

    export interface ClientState {
        Suspended: string;
    }

    export interface Query3 {
        QueryId: string;
        Activated: boolean;
        SuspendedByUser: boolean;
        ClientState: ClientState;
    }

    export interface Queries4 {
        Query: Query3[];
    }

    export interface WUQuerysetQueryAction {
        Action: QuerySetQueryActionTypes;
        QuerySetName: string;
        Queries: Queries4;
    }

    export interface Result3 {
        QueryId: string;
        WUID: string;
        Suspended: boolean;
        Success: boolean;
        Code: int;
        Message: string;
    }

    export interface Results4 {
        Result: Result3[];
    }

    export interface WUQuerySetQueryActionResponse {
        Exceptions: Exceptions;
        Action: QuerySetQueryActionTypes;
        QuerySetName: string;
        Results: Results4;
    }

    export interface WUQuerysets {
        test: boolean;
    }

    export interface QuerySet {
        QuerySetName: string;
    }

    export interface Querysets2 {
        QuerySet: QuerySet[];
    }

    export interface WUQuerysetsResponse {
        Exceptions: Exceptions;
        Querysets: Querysets2;
    }

    export interface WURecreateQuery {
        Target: string;
        QueryId: string;
        DebugValues: DebugValues2;
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
        DfuCopyFiles: boolean;
        DfuQueue: string;
        DfuWait: nonNegativeInteger;
        DfuOverwrite: boolean;
        OnlyCopyFiles: boolean;
        StopIfFilesCopied: boolean;
        DfuPublisherWuid: string;
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
        DfuPublisherWuid: string;
        DfuPublisherState: string;
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
        WUs: WUs;
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
        FilterBy: FilterBy;
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

    export interface Result4 {
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
        Result: Result4;
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

    export interface Variables2 {
        NamedValue: NamedValue[];
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
        DebugValues: DebugValues2;
        Variables: Variables2;
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

    export interface ServerInfo {
        Name: string;
        NetAddress: string;
    }

    export interface Clusters3 {
        ServerInfo: ServerInfo[];
    }

    export interface ScheduledWU {
        Wuid: string;
        Cluster: string;
        EventName: string;
        EventText: string;
        JobName: string;
        StateID: int;
        State: string;
        Owner: string;
    }

    export interface Workunits3 {
        ScheduledWU: ScheduledWU[];
    }

    export interface WUShowScheduledResponse {
        Exceptions: Exceptions;
        ClusterSelected: int;
        EventName: string;
        PushEventName: string;
        PushEventText: string;
        Query: string;
        Clusters: Clusters3;
        Workunits: Workunits3;
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
        super(optsConnection, "WsWorkunits", "1.97");
    }

    GVCAjaxGraph(request: Partial<WsWorkunits.GVCAjaxGraph>): Promise<WsWorkunits.GVCAjaxGraphResponse> {
        return this._connection.send("GVCAjaxGraph", request, "json", false, undefined, "GVCAjaxGraphResponse");
    }

    Ping(request: Partial<WsWorkunits.Ping>): Promise<WsWorkunits.WsWorkunitsPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsWorkunitsPingResponse");
    }

    WUAbort(request: Partial<WsWorkunits.WUAbort>): Promise<WsWorkunits.WUAbortResponse> {
        return this._connection.send("WUAbort", request, "json", false, undefined, "WUAbortResponse");
    }

    WUAction(request: Partial<WsWorkunits.WUAction>): Promise<WsWorkunits.WUActionResponse> {
        return this._connection.send("WUAction", request, "json", false, undefined, "WUActionResponse");
    }

    WUAddLocalFileToWorkunit(request: Partial<WsWorkunits.WUAddLocalFileToWorkunit>): Promise<WsWorkunits.WUAddLocalFileToWorkunitResponse> {
        return this._connection.send("WUAddLocalFileToWorkunit", request, "json", false, undefined, "WUAddLocalFileToWorkunitResponse");
    }

    WUAnalyseHotspot(request: Partial<WsWorkunits.WUAnalyseHotspot>): Promise<WsWorkunits.WUAnalyseHotspotResponse> {
        return this._connection.send("WUAnalyseHotspot", request, "json", false, undefined, "WUAnalyseHotspotResponse");
    }

    WUCDebug(request: Partial<WsWorkunits.WUCDebug>): Promise<WsWorkunits.WUDebugResponse> {
        return this._connection.send("WUCDebug", request, "json", false, undefined, "WUDebugResponse");
    }

    WUCheckFeatures(request: Partial<WsWorkunits.WUCheckFeatures>): Promise<WsWorkunits.WUCheckFeaturesResponse> {
        return this._connection.send("WUCheckFeatures", request, "json", false, undefined, "WUCheckFeaturesResponse");
    }

    WUClusterJobQueueLOG(request: Partial<WsWorkunits.WUClusterJobQueueLOG>): Promise<WsWorkunits.WUClusterJobQueueLOGResponse> {
        return this._connection.send("WUClusterJobQueueLOG", request, "json", false, undefined, "WUClusterJobQueueLOGResponse");
    }

    WUClusterJobQueueXLS(request: Partial<WsWorkunits.WUClusterJobQueueXLS>): Promise<WsWorkunits.WUClusterJobQueueXLSResponse> {
        return this._connection.send("WUClusterJobQueueXLS", request, "json", false, undefined, "WUClusterJobQueueXLSResponse");
    }

    WUClusterJobSummaryXLS(request: Partial<WsWorkunits.WUClusterJobSummaryXLS>): Promise<WsWorkunits.WUClusterJobSummaryXLSResponse> {
        return this._connection.send("WUClusterJobSummaryXLS", request, "json", false, undefined, "WUClusterJobSummaryXLSResponse");
    }

    WUClusterJobXLS(request: Partial<WsWorkunits.WUClusterJobXLS>): Promise<WsWorkunits.WUClusterJobXLSResponse> {
        return this._connection.send("WUClusterJobXLS", request, "json", false, undefined, "WUClusterJobXLSResponse");
    }

    WUCompileECL(request: Partial<WsWorkunits.WUCompileECL>): Promise<WsWorkunits.WUCompileECLResponse> {
        return this._connection.send("WUCompileECL", request, "json", false, undefined, "WUCompileECLResponse");
    }

    WUCopyLogicalFiles(request: Partial<WsWorkunits.WUCopyLogicalFiles>): Promise<WsWorkunits.WUCopyLogicalFilesResponse> {
        return this._connection.send("WUCopyLogicalFiles", request, "json", false, undefined, "WUCopyLogicalFilesResponse");
    }

    WUCopyQuerySet(request: Partial<WsWorkunits.WUCopyQuerySet>): Promise<WsWorkunits.WUCopyQuerySetResponse> {
        return this._connection.send("WUCopyQuerySet", request, "json", false, undefined, "WUCopyQuerySetResponse");
    }

    WUCreate(request: Partial<WsWorkunits.WUCreate>): Promise<WsWorkunits.WUCreateResponse> {
        return this._connection.send("WUCreate", request, "json", false, undefined, "WUCreateResponse");
    }

    WUCreateAndUpdate(request: Partial<WsWorkunits.WUCreateAndUpdate>): Promise<WsWorkunits.WUUpdateResponse> {
        return this._connection.send("WUCreateAndUpdate", request, "json", false, undefined, "WUUpdateResponse");
    }

    WUCreateZAPInfo(request: Partial<WsWorkunits.WUCreateZAPInfo>): Promise<WsWorkunits.WUCreateZAPInfoResponse> {
        return this._connection.send("WUCreateZAPInfo", request, "json", false, undefined, "WUCreateZAPInfoResponse");
    }

    WUDelete(request: Partial<WsWorkunits.WUDelete>): Promise<WsWorkunits.WUDeleteResponse> {
        return this._connection.send("WUDelete", request, "json", false, undefined, "WUDeleteResponse");
    }

    WUDeployWorkunit(request: Partial<WsWorkunits.WUDeployWorkunit>): Promise<WsWorkunits.WUDeployWorkunitResponse> {
        return this._connection.send("WUDeployWorkunit", request, "json", false, undefined, "WUDeployWorkunitResponse");
    }

    WUDetails(request: Partial<WsWorkunits.WUDetails>): Promise<WsWorkunits.WUDetailsResponse> {
        return this._connection.send("WUDetails", request, "json", false, undefined, "WUDetailsResponse");
    }

    WUDetailsMeta(request: Partial<WsWorkunits.WUDetailsMeta>): Promise<WsWorkunits.WUDetailsMetaResponse> {
        return this._connection.send("WUDetailsMeta", request, "json", false, undefined, "WUDetailsMetaResponse");
    }

    WUEclDefinitionAction(request: Partial<WsWorkunits.WUEclDefinitionAction>): Promise<WsWorkunits.WUEclDefinitionActionResponse> {
        return this._connection.send("WUEclDefinitionAction", request, "json", false, undefined, "WUEclDefinitionActionResponse");
    }

    WUExport(request: Partial<WsWorkunits.WUExport>): Promise<WsWorkunits.WUExportResponse> {
        return this._connection.send("WUExport", request, "json", false, undefined, "WUExportResponse");
    }

    WUFile(request: Partial<WsWorkunits.WUFile>): Promise<WsWorkunits.WULogFileResponse> {
        return this._connection.send("WUFile", request, "json", false, undefined, "WULogFileResponse");
    }

    WUFullResult(request: Partial<WsWorkunits.WUFullResult>): Promise<WsWorkunits.WUFullResultResponse> {
        return this._connection.send("WUFullResult", request, "json", false, undefined, "WUFullResultResponse");
    }

    WUGVCGraphInfo(request: Partial<WsWorkunits.WUGVCGraphInfo>): Promise<WsWorkunits.WUGVCGraphInfoResponse> {
        return this._connection.send("WUGVCGraphInfo", request, "json", false, undefined, "WUGVCGraphInfoResponse");
    }

    WUGetArchiveFile(request: Partial<WsWorkunits.WUGetArchiveFile>): Promise<WsWorkunits.WUGetArchiveFileResponse> {
        return this._connection.send("WUGetArchiveFile", request, "json", false, undefined, "WUGetArchiveFileResponse");
    }

    WUGetDependancyTrees(request: Partial<WsWorkunits.WUGetDependancyTrees>): Promise<WsWorkunits.WUGetDependancyTreesResponse> {
        return this._connection.send("WUGetDependancyTrees", request, "json", false, undefined, "WUGetDependancyTreesResponse");
    }

    WUGetGraph(request: Partial<WsWorkunits.WUGetGraph>): Promise<WsWorkunits.WUGetGraphResponse> {
        return this._connection.send("WUGetGraph", request, "json", false, undefined, "WUGetGraphResponse");
    }

    WUGetGraphNameAndTypes(request: Partial<WsWorkunits.WUGetGraphNameAndTypes>): Promise<WsWorkunits.WUGetGraphNameAndTypesResponse> {
        return this._connection.send("WUGetGraphNameAndTypes", request, "json", false, undefined, "WUGetGraphNameAndTypesResponse");
    }

    WUGetNumFileToCopy(request: Partial<WsWorkunits.WUGetNumFileToCopy>): Promise<WsWorkunits.WUGetNumFileToCopyResponse> {
        return this._connection.send("WUGetNumFileToCopy", request, "json", false, undefined, "WUGetNumFileToCopyResponse");
    }

    WUGetPlugins(request: Partial<WsWorkunits.WUGetPlugins>): Promise<WsWorkunits.WUGetPluginsResponse> {
        return this._connection.send("WUGetPlugins", request, "json", false, undefined, "WUGetPluginsResponse");
    }

    WUGetStats(request: Partial<WsWorkunits.WUGetStats>): Promise<WsWorkunits.WUGetStatsResponse> {
        return this._connection.send("WUGetStats", request, "json", false, undefined, "WUGetStatsResponse");
    }

    WUGetThorJobList(request: Partial<WsWorkunits.WUGetThorJobList>): Promise<WsWorkunits.WUGetThorJobListResponse> {
        return this._connection.send("WUGetThorJobList", request, "json", false, undefined, "WUGetThorJobListResponse");
    }

    WUGetThorJobQueue(request: Partial<WsWorkunits.WUGetThorJobQueue>): Promise<WsWorkunits.WUGetThorJobQueueResponse> {
        return this._connection.send("WUGetThorJobQueue", request, "json", false, undefined, "WUGetThorJobQueueResponse");
    }

    WUGetZAPInfo(request: Partial<WsWorkunits.WUGetZAPInfo>): Promise<WsWorkunits.WUGetZAPInfoResponse> {
        return this._connection.send("WUGetZAPInfo", request, "json", false, undefined, "WUGetZAPInfoResponse");
    }

    WUGraphInfo(request: Partial<WsWorkunits.WUGraphInfo>): Promise<WsWorkunits.WUGraphInfoResponse> {
        return this._connection.send("WUGraphInfo", request, "json", false, undefined, "WUGraphInfoResponse");
    }

    WUGraphTiming(request: Partial<WsWorkunits.WUGraphTiming>): Promise<WsWorkunits.WUGraphTimingResponse> {
        return this._connection.send("WUGraphTiming", request, "json", false, undefined, "WUGraphTimingResponse");
    }

    WUInfo(request: Partial<WsWorkunits.WUInfo>): Promise<WsWorkunits.WUInfoResponse> {
        return this._connection.send("WUInfo", request, "json", false, undefined, "WUInfoResponse");
    }

    WUInfoDetails(request: Partial<WsWorkunits.WUInfoDetails>): Promise<WsWorkunits.WUInfoResponse> {
        return this._connection.send("WUInfoDetails", request, "json", false, undefined, "WUInfoResponse");
    }

    WUJobList(request: Partial<WsWorkunits.WUJobList>): Promise<WsWorkunits.WUJobListResponse> {
        return this._connection.send("WUJobList", request, "json", false, undefined, "WUJobListResponse");
    }

    WULightWeightQuery(request: Partial<WsWorkunits.WULightWeightQuery>): Promise<WsWorkunits.WULightWeightQueryResponse> {
        return this._connection.send("WULightWeightQuery", request, "json", false, undefined, "WULightWeightQueryResponse");
    }

    WUListArchiveFiles(request: Partial<WsWorkunits.WUListArchiveFiles>): Promise<WsWorkunits.WUListArchiveFilesResponse> {
        return this._connection.send("WUListArchiveFiles", request, "json", false, undefined, "WUListArchiveFilesResponse");
    }

    WUListLocalFileRequired(request: Partial<WsWorkunits.WUListLocalFileRequired>): Promise<WsWorkunits.WUListLocalFileRequiredResponse> {
        return this._connection.send("WUListLocalFileRequired", request, "json", false, undefined, "WUListLocalFileRequiredResponse");
    }

    WUListQueries(request: Partial<WsWorkunits.WUListQueries>): Promise<WsWorkunits.WUListQueriesResponse> {
        return this._connection.send("WUListQueries", request, "json", false, undefined, "WUListQueriesResponse");
    }

    WUListQueriesUsingFile(request: Partial<WsWorkunits.WUListQueriesUsingFile>): Promise<WsWorkunits.WUListQueriesUsingFileResponse> {
        return this._connection.send("WUListQueriesUsingFile", request, "json", false, undefined, "WUListQueriesUsingFileResponse");
    }

    WUMultiQuerysetDetails(request: Partial<WsWorkunits.WUMultiQuerysetDetails>): Promise<WsWorkunits.WUMultiQuerySetDetailsResponse> {
        return this._connection.send("WUMultiQuerysetDetails", request, "json", false, undefined, "WUMultiQuerySetDetailsResponse");
    }

    WUProcessGraph(request: Partial<WsWorkunits.WUProcessGraph>): Promise<WsWorkunits.WUProcessGraphResponse> {
        return this._connection.send("WUProcessGraph", request, "json", false, undefined, "WUProcessGraphResponse");
    }

    WUProtect(request: Partial<WsWorkunits.WUProtect>): Promise<WsWorkunits.WUProtectResponse> {
        return this._connection.send("WUProtect", request, "json", false, undefined, "WUProtectResponse");
    }

    WUPublishWorkunit(request: Partial<WsWorkunits.WUPublishWorkunit>): Promise<WsWorkunits.WUPublishWorkunitResponse> {
        return this._connection.send("WUPublishWorkunit", request, "json", false, undefined, "WUPublishWorkunitResponse");
    }

    WUPushEvent(request: Partial<WsWorkunits.WUPushEvent>): Promise<WsWorkunits.WUPushEventResponse> {
        return this._connection.send("WUPushEvent", request, "json", false, undefined, "WUPushEventResponse");
    }

    WUQuery(request: Partial<WsWorkunits.WUQuery>): Promise<WsWorkunits.WUQueryResponse> {
        return this._connection.send("WUQuery", request, "json", false, undefined, "WUQueryResponse");
    }

    WUQueryConfig(request: Partial<WsWorkunits.WUQueryConfig>): Promise<WsWorkunits.WUQueryConfigResponse> {
        return this._connection.send("WUQueryConfig", request, "json", false, undefined, "WUQueryConfigResponse");
    }

    WUQueryDetails(request: Partial<WsWorkunits.WUQueryDetails>): Promise<WsWorkunits.WUQueryDetailsResponse> {
        return this._connection.send("WUQueryDetails", request, "json", false, undefined, "WUQueryDetailsResponse");
    }

    WUQueryDetailsLightWeight(request: Partial<WsWorkunits.WUQueryDetailsLightWeight>): Promise<WsWorkunits.WUQueryDetailsResponse> {
        return this._connection.send("WUQueryDetailsLightWeight", request, "json", false, undefined, "WUQueryDetailsResponse");
    }

    WUQueryFiles(request: Partial<WsWorkunits.WUQueryFiles>): Promise<WsWorkunits.WUQueryFilesResponse> {
        return this._connection.send("WUQueryFiles", request, "json", false, undefined, "WUQueryFilesResponse");
    }

    WUQueryGetGraph(request: Partial<WsWorkunits.WUQueryGetGraph>): Promise<WsWorkunits.WUQueryGetGraphResponse> {
        return this._connection.send("WUQueryGetGraph", request, "json", false, undefined, "WUQueryGetGraphResponse");
    }

    WUQueryGetSummaryStats(request: Partial<WsWorkunits.WUQueryGetSummaryStats>): Promise<WsWorkunits.WUQueryGetSummaryStatsResponse> {
        return this._connection.send("WUQueryGetSummaryStats", request, "json", false, undefined, "WUQueryGetSummaryStatsResponse");
    }

    WUQuerysetAliasAction(request: Partial<WsWorkunits.WUQuerysetAliasAction>): Promise<WsWorkunits.WUQuerySetAliasActionResponse> {
        return this._connection.send("WUQuerysetAliasAction", request, "json", false, undefined, "WUQuerySetAliasActionResponse");
    }

    WUQuerysetCopyQuery(request: Partial<WsWorkunits.WUQuerysetCopyQuery>): Promise<WsWorkunits.WUQuerySetCopyQueryResponse> {
        return this._connection.send("WUQuerysetCopyQuery", request, "json", false, undefined, "WUQuerySetCopyQueryResponse");
    }

    WUQuerysetDetails(request: Partial<WsWorkunits.WUQuerysetDetails>): Promise<WsWorkunits.WUQuerySetDetailsResponse> {
        return this._connection.send("WUQuerysetDetails", request, "json", false, undefined, "WUQuerySetDetailsResponse");
    }

    WUQuerysetExport(request: Partial<WsWorkunits.WUQuerysetExport>): Promise<WsWorkunits.WUQuerysetExportResponse> {
        return this._connection.send("WUQuerysetExport", request, "json", false, undefined, "WUQuerysetExportResponse");
    }

    WUQuerysetImport(request: Partial<WsWorkunits.WUQuerysetImport>): Promise<WsWorkunits.WUQuerysetImportResponse> {
        return this._connection.send("WUQuerysetImport", request, "json", false, undefined, "WUQuerysetImportResponse");
    }

    WUQuerysetQueryAction(request: Partial<WsWorkunits.WUQuerysetQueryAction>): Promise<WsWorkunits.WUQuerySetQueryActionResponse> {
        return this._connection.send("WUQuerysetQueryAction", request, "json", false, undefined, "WUQuerySetQueryActionResponse");
    }

    WUQuerysets(request: Partial<WsWorkunits.WUQuerysets>): Promise<WsWorkunits.WUQuerysetsResponse> {
        return this._connection.send("WUQuerysets", request, "json", false, undefined, "WUQuerysetsResponse");
    }

    WURecreateQuery(request: Partial<WsWorkunits.WURecreateQuery>): Promise<WsWorkunits.WURecreateQueryResponse> {
        return this._connection.send("WURecreateQuery", request, "json", false, undefined, "WURecreateQueryResponse");
    }

    WUResubmit(request: Partial<WsWorkunits.WUResubmit>): Promise<WsWorkunits.WUResubmitResponse> {
        return this._connection.send("WUResubmit", request, "json", false, undefined, "WUResubmitResponse");
    }

    WUResult(request: Partial<WsWorkunits.WUResult>): Promise<WsWorkunits.WUResultResponse> {
        return this._connection.send("WUResult", request, "json", false, undefined, "WUResultResponse");
    }

    WUResultBin(request: Partial<WsWorkunits.WUResultBin>): Promise<WsWorkunits.WUResultBinResponse> {
        return this._connection.send("WUResultBin", request, "json", false, undefined, "WUResultBinResponse");
    }

    WUResultSummary(request: Partial<WsWorkunits.WUResultSummary>): Promise<WsWorkunits.WUResultSummaryResponse> {
        return this._connection.send("WUResultSummary", request, "json", false, undefined, "WUResultSummaryResponse");
    }

    WUResultView(request: Partial<WsWorkunits.WUResultView>): Promise<WsWorkunits.WUResultViewResponse> {
        return this._connection.send("WUResultView", request, "json", false, undefined, "WUResultViewResponse");
    }

    WURun(request: Partial<WsWorkunits.WURun>): Promise<WsWorkunits.WURunResponse> {
        return this._connection.send("WURun", request, "json", false, undefined, "WURunResponse");
    }

    WUSchedule(request: Partial<WsWorkunits.WUSchedule>): Promise<WsWorkunits.WUScheduleResponse> {
        return this._connection.send("WUSchedule", request, "json", false, undefined, "WUScheduleResponse");
    }

    WUShowScheduled(request: Partial<WsWorkunits.WUShowScheduled>): Promise<WsWorkunits.WUShowScheduledResponse> {
        return this._connection.send("WUShowScheduled", request, "json", false, undefined, "WUShowScheduledResponse");
    }

    WUSubmit(request: Partial<WsWorkunits.WUSubmit>): Promise<WsWorkunits.WUSubmitResponse> {
        return this._connection.send("WUSubmit", request, "json", false, undefined, "WUSubmitResponse");
    }

    WUSyntaxCheckECL(request: Partial<WsWorkunits.WUSyntaxCheckECL>): Promise<WsWorkunits.WUSyntaxCheckResponse> {
        return this._connection.send("WUSyntaxCheckECL", request, "json", false, undefined, "WUSyntaxCheckResponse");
    }

    WUUpdate(request: Partial<WsWorkunits.WUUpdate>): Promise<WsWorkunits.WUUpdateResponse> {
        return this._connection.send("WUUpdate", request, "json", false, undefined, "WUUpdateResponse");
    }

    WUUpdateQueryEntry(request: Partial<WsWorkunits.WUUpdateQueryEntry>): Promise<WsWorkunits.WUUpdateQueryEntryResponse> {
        return this._connection.send("WUUpdateQueryEntry", request, "json", false, undefined, "WUUpdateQueryEntryResponse");
    }

    WUWaitCompiled(request: Partial<WsWorkunits.WUWaitCompiled>): Promise<WsWorkunits.WUWaitResponse> {
        return this._connection.send("WUWaitCompiled", request, "json", false, undefined, "WUWaitResponse");
    }

    WUWaitComplete(request: Partial<WsWorkunits.WUWaitComplete>): Promise<WsWorkunits.WUWaitResponse> {
        return this._connection.send("WUWaitComplete", request, "json", false, undefined, "WUWaitResponse");
    }

}
