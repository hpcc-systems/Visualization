import { deepMixin } from "@hpcc-js/util";
import { xml2json, XMLNode } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/WsWorkunits/WUQuery?respjson_
    * http://json2ts.com/
*/

export enum WUStateID {
    Unknown = 0,
    Compiled,
    Running,
    Completed,
    Failed,
    Archived,
    Aborting,
    Aborted,
    Blocked,
    Submitted,
    Scheduled,
    Compiling,
    Wait,
    UploadingFiled,
    DebugPaused,
    DebugRunning,
    Paused,
    LAST,
    NotFound = 999
}

export namespace WUInfo {
    export interface Request {
        Wuid: string;
        TruncateEclTo64k?: boolean;
        Type?: string;
        IncludeExceptions?: boolean;
        IncludeGraphs?: boolean;
        IncludeSourceFiles?: boolean;
        IncludeResults?: boolean;
        IncludeResultsViewNames?: boolean;
        IncludeVariables?: boolean;
        IncludeTimers?: boolean;
        IncludeDebugValues?: boolean;
        IncludeApplicationValues?: boolean;
        IncludeWorkflows?: boolean;
        IncludeXmlSchemas?: boolean;
        IncludeResourceURLs?: boolean;
        SuppressResultSchemas?: boolean;
        ThorSlaveIP?: string;
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
        FileSize: number;
        PID: number;
        minActivityId: number;
        maxActivityId: number;
    }

    export interface Helpers {
        ECLHelpFile: ECLHelpFile[];
    }

    export interface ECLException {
        Source: string;
        Severity: string;
        Code: number;
        Message: string;
        FileName: string;
        LineNo: number;
        Column: number;
        Activity: number;
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
        RunningId: number;
        WhenStarted: string;
        WhenFinished: string;
    }

    export interface Graphs {
        ECLGraph: ECLGraph[];
    }

    export interface ECLSourceFiles {
        ECLSourceFile: any[];
    }

    export interface ECLSourceFile {
        FileCluster: string;
        Name: string;
        IsSuperFile: boolean;
        Subs: number;
        Count: number;
        ECLSourceFiles: ECLSourceFiles;
    }

    export interface SourceFiles {
        ECLSourceFile: ECLSourceFile[];
    }

    export interface ECLSchemaItem {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas {
        ECLSchemaItem: ECLSchemaItem[];
    }

    export interface ECLResult {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas;
        XmlSchema: string;
    }

    export interface Results {
        ECLResult: ECLResult[];
    }

    export interface ECLSchemaItem2 {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas2 {
        ECLSchemaItem: ECLSchemaItem2[];
    }

    export interface ECLResult2 {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas2;
        XmlSchema: string;
    }

    export interface Variables {
        ECLResult: ECLResult2[];
    }

    export interface ECLTimer {
        Name: string;
        Value: string;
        count: number;
        GraphName: string;
        SubGraphId: number;
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
        Count: number;
        CountRemaining: number;
    }

    export interface Workflows {
        ECLWorkflow: ECLWorkflow[];
    }

    export interface ECLTimingData {
        Name: string;
        GraphNum: number;
        SubGraphNum: number;
        GID: number;
        Min: number;
        MS: number;
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
        NumberSlaves: number;
    }

    export interface ThorLogList {
        ThorLogInfo: ThorLogInfo[];
    }

    export interface ResourceURLs {
        URL: string[];
    }

    export interface Workunit {
        Wuid: string;
        Owner: string;
        Cluster: string;
        RoxieCluster: string;
        Jobname: string;
        Queue: string;
        StateID: number;
        State: string;
        StateEx: string;
        Description: string;
        Protected: boolean;
        Active: boolean;
        Action: number;
        ActionEx: string;
        DateTimeScheduled: string;
        PriorityClass: number;
        PriorityLevel: number;
        Scope: string;
        Snapshot: string;
        ResultLimit: number;
        Archived: boolean;
        IsPausing: boolean;
        ThorLCR: boolean;
        EventSchedule: number;
        HaveSubGraphTimings: boolean;
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
        ErrorCount: number;
        WarningCount: number;
        InfoCount: number;
        AlertCount: number;
        GraphCount: number;
        SourceFileCount: number;
        ResultCount: number;
        VariableCount: number;
        TimerCount: number;
        HasDebugValue: boolean;
        ApplicationValueCount: number;
        XmlParams: string;
        AccessFlag: number;
        ClusterFlag: number;
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
        ResultViewCount: number;
        ResourceURLCount: number;
        DebugValueCount: number;
        WorkflowCount: number;
        HelpersCount: number;
    }

    export interface ResultViews {
        View: string[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Workunit: Workunit;
        AutoRefresh: number;
        CanCompile: boolean;
        ThorSlaveIP: string;
        ResultViews: ResultViews;
        SecMethod: string;
    }
}

export namespace WUQuery {
    export interface ApplicationValue {
        Application: string;
        Name: string;
        Value: string;
    }

    export interface Request {
        Wuid?: string;
        Type?: string;
        Cluster?: string;
        RoxieCluster?: string;
        Owner?: string;
        State?: string;
        StartDate?: string;
        EndDate?: string;
        ECL?: string;
        Jobname?: string;
        LogicalFile?: string;
        LogicalFileSearchType?: string;
        ApplicationValues?: {
            ApplicationValue: ApplicationValue[]
        };
        After?: string;
        Before?: string;
        Count?: number;
        PageSize?: number;
        PageStartFrom?: number;
        PageEndAt?: number;
        LastNDays?: number;
        Sortby?: string;
        Descending?: boolean;
        CacheHint?: string;
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
        FileSize: number;
        PID: number;
        minActivityId: number;
        maxActivityId: number;
    }

    export interface Helpers {
        ECLHelpFile: ECLHelpFile[];
    }

    export interface ECLException {
        Source: string;
        Severity: string;
        Code: number;
        Message: string;
        FileName: string;
        LineNo: number;
        Column: number;
        Activity: number;
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
        RunningId: number;
        WhenStarted: string;
        WhenFinished: string;
    }

    export interface Graphs {
        ECLGraph: ECLGraph[];
    }

    export interface ECLSourceFiles {
        ECLSourceFile: any[];
    }

    export interface ECLSourceFile {
        FileCluster: string;
        Name: string;
        IsSuperFile: boolean;
        Subs: number;
        Count: number;
        ECLSourceFiles: ECLSourceFiles;
    }

    export interface SourceFiles {
        ECLSourceFile: ECLSourceFile[];
    }

    export interface ECLSchemaItem {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas {
        ECLSchemaItem: ECLSchemaItem[];
    }

    export interface ECLResult {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas;
        XmlSchema: string;
    }

    export interface Results {
        ECLResult: ECLResult[];
    }

    export interface ECLSchemaItem2 {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas2 {
        ECLSchemaItem: ECLSchemaItem2[];
    }

    export interface ECLResult2 {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas2;
        XmlSchema: string;
    }

    export interface Variables {
        ECLResult: ECLResult2[];
    }

    export interface ECLTimer {
        Name: string;
        Value: string;
        count: number;
        GraphName: string;
        SubGraphId: number;
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
        Count: number;
        CountRemaining: number;
    }

    export interface Workflows {
        ECLWorkflow: ECLWorkflow[];
    }

    export interface ECLTimingData {
        Name: string;
        GraphNum: number;
        SubGraphNum: number;
        GID: number;
        Min: number;
        MS: number;
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
        NumberSlaves: number;
    }

    export interface ThorLogList {
        ThorLogInfo: ThorLogInfo[];
    }

    export interface ResourceURLs {
        URL: string[];
    }

    export interface ECLWorkunit {
        Wuid: string;
        Owner: string;
        Cluster: string;
        RoxieCluster: string;
        Jobname: string;
        Queue: string;
        StateID: number;
        State: string;
        StateEx: string;
        Description: string;
        Protected: boolean;
        Active: boolean;
        Action: number;
        ActionEx: string;
        DateTimeScheduled: string;
        PriorityClass: number;
        PriorityLevel: number;
        Scope: string;
        Snapshot: string;
        ResultLimit: number;
        Archived: boolean;
        IsPausing: boolean;
        ThorLCR: boolean;
        EventSchedule: number;
        HaveSubGraphTimings: boolean;
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
        ErrorCount: number;
        WarningCount: number;
        InfoCount: number;
        AlertCount: number;
        GraphCount: number;
        SourceFileCount: number;
        ResultCount: number;
        VariableCount: number;
        TimerCount: number;
        HasDebugValue: boolean;
        ApplicationValueCount: number;
        XmlParams: string;
        AccessFlag: number;
        ClusterFlag: number;
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
        ResultViewCount: number;
        ResourceURLCount: number;
        DebugValueCount: number;
        WorkflowCount: number;
        HelpersCount: number;
    }

    export interface Workunits {
        ECLWorkunit: ECLWorkunit[];
    }

    export interface Response {
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
        Count: number;
        PageSize: number;
        PrevPage: number;
        NextPage: number;
        LastPage: number;
        NumWUs: number;
        First: boolean;
        PageStartFrom: number;
        PageEndAt: number;
        LastNDays: number;
        Sortby: string;
        Descending: boolean;
        BasicQuery: string;
        Filters: string;
        CacheHint: number;
        Workunits: Workunits;
    }
}

export namespace WUCreate {
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
        FileSize: number;
        PID: number;
        minActivityId: number;
        maxActivityId: number;
    }

    export interface Helpers {
        ECLHelpFile: ECLHelpFile[];
    }

    export interface ECLException {
        Source: string;
        Severity: string;
        Code: number;
        Message: string;
        FileName: string;
        LineNo: number;
        Column: number;
        Activity: number;
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
        RunningId: number;
        WhenStarted: string;
        WhenFinished: string;
    }

    export interface Graphs {
        ECLGraph: ECLGraph[];
    }

    export interface ECLSourceFiles {
        ECLSourceFile: any[];
    }

    export interface ECLSourceFile {
        FileCluster: string;
        Name: string;
        IsSuperFile: boolean;
        Subs: number;
        Count: number;
        ECLSourceFiles: ECLSourceFiles;
    }

    export interface SourceFiles {
        ECLSourceFile: ECLSourceFile[];
    }

    export interface ECLSchemaItem {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas {
        ECLSchemaItem: ECLSchemaItem[];
    }

    export interface ECLResult {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas;
        XmlSchema: string;
    }

    export interface Results {
        ECLResult: ECLResult[];
    }

    export interface ECLSchemaItem2 {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas2 {
        ECLSchemaItem: ECLSchemaItem2[];
    }

    export interface ECLResult2 {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas2;
        XmlSchema: string;
    }

    export interface Variables {
        ECLResult: ECLResult2[];
    }

    export interface ECLTimer {
        Name: string;
        Value: string;
        count: number;
        GraphName: string;
        SubGraphId: number;
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
        Count: number;
        CountRemaining: number;
    }

    export interface Workflows {
        ECLWorkflow: ECLWorkflow[];
    }

    export interface ECLTimingData {
        Name: string;
        GraphNum: number;
        SubGraphNum: number;
        GID: number;
        Min: number;
        MS: number;
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
        NumberSlaves: number;
    }

    export interface ThorLogList {
        ThorLogInfo: ThorLogInfo[];
    }

    export interface ResourceURLs {
        URL: string[];
    }

    export interface Workunit {
        Wuid: string;
        Owner: string;
        Cluster: string;
        RoxieCluster: string;
        Jobname: string;
        Queue: string;
        StateID: number;
        State: string;
        StateEx: string;
        Description: string;
        Protected: boolean;
        Active: boolean;
        Action: number;
        ActionEx: string;
        DateTimeScheduled: string;
        PriorityClass: number;
        PriorityLevel: number;
        Scope: string;
        Snapshot: string;
        ResultLimit: number;
        Archived: boolean;
        IsPausing: boolean;
        ThorLCR: boolean;
        EventSchedule: number;
        HaveSubGraphTimings: boolean;
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
        ErrorCount: number;
        WarningCount: number;
        InfoCount: number;
        AlertCount: number;
        GraphCount: number;
        SourceFileCount: number;
        ResultCount: number;
        VariableCount: number;
        TimerCount: number;
        HasDebugValue: boolean;
        ApplicationValueCount: number;
        XmlParams: string;
        AccessFlag: number;
        ClusterFlag: number;
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
        ResultViewCount: number;
        ResourceURLCount: number;
        DebugValueCount: number;
        WorkflowCount: number;
        HelpersCount: number;
    }

    export interface Response {
        Exceptions: Exceptions;
        Workunit: Workunit;
    }
}

export namespace WUListQueries {
    export interface Request {
        QueryID: string;
        QueryName: string;
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

    export interface ClusterQueryState {
        Cluster: string;
        State: string;
        Errors: string;
        MixedNodeStates: boolean;
    }

    export interface Clusters {
        ClusterQueryState: ClusterQueryState[];
    }

    export interface QuerySetQuery {
        Id: string;
        Name: string;
        Wuid: string;
        Dll: string;
        Suspended: boolean;
        Clusters: Clusters;
        memoryLimit: string;
        timeLimit: number;
        warnTimeLimit: number;
        priority: string;
        Comment: string;
        QuerySetId: string;
        IsLibrary: boolean;
        Activated: boolean;
        PublishedBy: string;
        snapshot: string;
    }

    export interface QuerysetQueries {
        QuerySetQuery: QuerySetQuery[];
    }

    export interface Response {
        Exceptions: Exceptions;
        NumberOfQueries: number;
        CacheHint: number;
        QuerysetQueries: QuerysetQueries;
    }
}

export namespace WUPushEvent {
    export interface Request {
        EventName: string;
        EventText: string;
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

    export interface Response {
        Exceptions: Exceptions;
    }
}

export namespace WUUpdate {
    export enum Action {
        Unknown = 0,
        Compile,
        Check,
        Run,
        ExecuteExisting,
        Pause,
        PauseNow,
        Resume,
        Debug,
        __size
    }

    export interface Request {
        Wuid: string;
        State?: string;
        StateOrig?: string;
        Jobname?: string;
        JobnameOrig?: string;
        QueryText?: string;
        Action?: Action;
        Description?: string;
        DescriptionOrig?: string;
        AddDrilldownFields?: boolean;
        ResultLimit?: number;
        Protected?: boolean;
        ProtectedOrig?: boolean;
        PriorityClass?: string;
        PriorityLevel?: string;
        Scope?: string;
        ScopeOrig?: string;
        ClusterSelection?: string;
        ClusterOrig?: string;
        XmlParams?: string;
        ThorSlaveIP?: string;
        QueryMainDefinition?: string;
        DebugValues?: DebugValues;
        ApplicationValues?: ApplicationValues;
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
        FileSize: number;
        PID: number;
        minActivityId: number;
        maxActivityId: number;
    }

    export interface Helpers {
        ECLHelpFile: ECLHelpFile[];
    }

    export interface ECLException {
        Source: string;
        Severity: string;
        Code: number;
        Message: string;
        FileName: string;
        LineNo: number;
        Column: number;
        Activity: number;
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
        RunningId: number;
        WhenStarted: string;
        WhenFinished: string;
    }

    export interface Graphs {
        ECLGraph: ECLGraph[];
    }

    export interface ECLSourceFiles {
        ECLSourceFile: any[];
    }

    export interface ECLSourceFile {
        FileCluster: string;
        Name: string;
        IsSuperFile: boolean;
        Subs: number;
        Count: number;
        ECLSourceFiles: ECLSourceFiles;
    }

    export interface SourceFiles {
        ECLSourceFile: ECLSourceFile[];
    }

    export interface ECLSchemaItem {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas {
        ECLSchemaItem: ECLSchemaItem[];
    }

    export interface ECLResult {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas;
        XmlSchema: string;
    }

    export interface Results {
        ECLResult: ECLResult[];
    }

    export interface ECLSchemaItem2 {
        ColumnName: string;
        ColumnType: string;
        ColumnTypeCode: number;
        isConditional: boolean;
    }

    export interface ECLSchemas2 {
        ECLSchemaItem: ECLSchemaItem2[];
    }

    export interface ECLResult2 {
        Name: string;
        Sequence: number;
        Value: string;
        Link: string;
        FileName: string;
        IsSupplied: boolean;
        ShowFileContent: boolean;
        Total: number;
        ECLSchemas: ECLSchemas2;
        XmlSchema: string;
    }

    export interface Variables {
        ECLResult: ECLResult2[];
    }

    export interface ECLTimer {
        Name: string;
        Value: string;
        count: number;
        GraphName: string;
        SubGraphId: number;
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
        Count: number;
        CountRemaining: number;
    }

    export interface Workflows {
        ECLWorkflow: ECLWorkflow[];
    }

    export interface ECLTimingData {
        Name: string;
        GraphNum: number;
        SubGraphNum: number;
        GID: number;
        Min: number;
        MS: number;
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
        NumberSlaves: number;
    }

    export interface ThorLogList {
        ThorLogInfo: ThorLogInfo[];
    }

    export interface ResourceURLs {
        URL: string[];
    }

    export interface Workunit {
        Wuid: string;
        Owner: string;
        Cluster: string;
        RoxieCluster: string;
        Jobname: string;
        Queue: string;
        StateID: number;
        State: string;
        StateEx: string;
        Description: string;
        Protected: boolean;
        Active: boolean;
        Action: number;
        ActionEx: string;
        DateTimeScheduled: string;
        PriorityClass: number;
        PriorityLevel: number;
        Scope: string;
        Snapshot: string;
        ResultLimit: number;
        Archived: boolean;
        IsPausing: boolean;
        ThorLCR: boolean;
        EventSchedule: number;
        HaveSubGraphTimings: boolean;
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
        ErrorCount: number;
        WarningCount: number;
        InfoCount: number;
        AlertCount: number;
        GraphCount: number;
        SourceFileCount: number;
        ResultCount: number;
        VariableCount: number;
        TimerCount: number;
        HasDebugValue: boolean;
        ApplicationValueCount: number;
        XmlParams: string;
        AccessFlag: number;
        ClusterFlag: number;
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
        ResultViewCount: number;
        ResourceURLCount: number;
        DebugValueCount: number;
        WorkflowCount: number;
        HelpersCount: number;
    }

    export interface Response {
        Exceptions: Exceptions;
        Workunit: Workunit;
    }
}

export namespace WUSubmit {
    export interface Request {
        Wuid: string;
        Cluster: string;
        Queue?: string;
        Snapshot?: string;
        MaxRunTime?: number;
        BlockTillFinishTimer?: boolean;
        SyntaxCheck?: boolean;
        NotifyCluster?: boolean;
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

    export interface Response {
        Exceptions: Exceptions;
    }
}

export namespace WUResubmit {
    export interface Request {
        Wuids: string[];
        ResetWorkflow: boolean;
        CloneWorkunit: boolean;
        BlockTillFinishTimer?: number;
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

    export interface WU {
        WUID: string;
        ParentWUID: string;
    }

    export interface WUs {
        WU: WU[];
    }

    export interface Response {
        Exceptions: Exceptions;
        WUs: WUs;
    }
}

export namespace WUQueryDetails {
    export interface Request {
        QueryId: string;
        QuerySet: string;
        IncludeStateOnClusters: boolean;
        IncludeSuperFiles: boolean;
        IncludeWsEclAddresses: boolean;
        CheckAllNodes: boolean;
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

    export interface ClusterQueryState {
        Cluster: string;
        State: string;
        Errors: string;
        MixedNodeStates: boolean;
    }

    export interface Clusters {
        ClusterQueryState: ClusterQueryState[];
    }

    export interface LogicalFiles {
        Item: string[];
    }

    export interface SubFiles {
        File: string[];
    }

    export interface SuperFiles2 {
        SuperFile: any[];
    }

    export interface SuperFile {
        Name: string;
        SubFiles: SubFiles;
        SuperFiles: SuperFiles2;
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

    export interface ECLGraph {
        Name: string;
        Label: string;
        Type: string;
        Running: boolean;
        Complete: boolean;
        Failed: boolean;
        RunningId: number;
        WhenStarted: string;
        WhenFinished: string;
    }

    export interface WUGraphs {
        ECLGraph: ECLGraph[];
    }

    export interface ECLTimer {
        Name: string;
        Value: string;
        count: number;
        GraphName: string;
        SubGraphId: number;
    }

    export interface WUTimers {
        ECLTimer: ECLTimer[];
    }

    export interface Response {
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
        LogicalFiles: LogicalFiles;
        SuperFiles: SuperFiles;
        IsLibrary: boolean;
        Priority: string;
        WUSnapShot: string;
        CompileTime: string;
        LibrariesUsed: LibrariesUsed;
        CountGraphs: number;
        ResourceURLCount: number;
        WsEclAddresses: WsEclAddresses;
        WUGraphs: WUGraphs;
        WUTimers: WUTimers;
    }
}

export namespace WUAction {
    export type Type = "SetToFailed" | "Pause" | "PauseNow" | "Resume" | "Abort" | "Delete" | "Restore" | "Deschedule" | "Reschedule";
    export interface Request {
        Wuids: string[];
        WUActionType: Type;
        Cluster?: string;
        Owner?: string;
        State?: string;
        StartDate?: string;
        EndDate?: string;
        ECL?: string;
        Jobname?: string;
        Test?: string;
        CurrentPage?: number;
        PageSize?: number;
        Sortby?: number;
        Descending?: boolean;
        EventServer?: string;
        EventName?: string;
        PageFrom?: number;
        BlockTillFinishTimer?: number;
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

    export interface Response {
        Exceptions: Exceptions;
        ActionResults: ActionResults;
    }
}

export namespace WUGetZAPInfo {
    export interface Request {
        WUID: string;
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

    export interface Response {
        Exceptions: Exceptions;
        WUID: string;
        ESPIPAddress: string;
        ThorIPAddress: string;
        BuildVersion: string;
        Archive: string;
    }
}

export namespace WUShowScheduled {
    export interface Request {
        Cluster: string;
        EventName: string;
        PushEventName: string;
        PushEventText: string;
        State: string;
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

    export interface ServerInfo {
        Name: string;
        NetAddress: string;
    }

    export interface Clusters {
        ServerInfo: ServerInfo[];
    }

    export interface ScheduledWU {
        Wuid: string;
        Cluster: string;
        EventName: string;
        EventText: string;
        JobName: string;
        StateID: number;
        State: string;
        Owner: string;
    }

    export interface Workunits {
        ScheduledWU: ScheduledWU[];
    }

    export interface Response {
        Exceptions: Exceptions;
        ClusterSelected: number;
        EventName: string;
        PushEventName: string;
        PushEventText: string;
        Query: string;
        Clusters: Clusters;
        Workunits: Workunits;
    }
}

export namespace WUQuerySetQueryAction {
    export interface Request {
        Action: string;
        QuerySetName: string;
        Queries: any[];
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

    export interface Result {
        QueryId: string;
        Suspended: boolean;
        Success: boolean;
        Code: number;
        Message: string;
    }

    export interface Results {
        Result: Result[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Action: string;
        QuerySetName: string;
        Results: Results;
    }
}

export namespace WUQuerySetAliasAction {
    export interface Request {
        Action: string;
        QuerySetName: string;
        Queries: any[];
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

    export interface Result {
        Name: string;
        Success: boolean;
        Code: number;
        Message: string;
    }

    export interface Results {
        Result: Result[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Action: string;
        QuerySetName: string;
        Results: Results;
    }
}

export namespace WUPublishWorkunit {
    export interface Request {
        Wuid: string;
        Cluster: string;
        JobName: string;
        Activate: string;
        NotifyCluster: boolean;
        Wait: number;
        NoReload: boolean;
        UpdateWorkUnitName: boolean;
        memoryLimit: string;
        TimeLimit: string;
        WarnTimeLimit: string;
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

    export interface Clusters2 {
        Item: string[];
    }

    export interface WULogicalFileCopyInfo2 {
        IsIndex: boolean;
        LogicalName: string;
        DfuCopyWuid: string;
        DfuCopyError: string;
        Clusters: Clusters2;
    }

    export interface NotOnCluster {
        WULogicalFileCopyInfo: WULogicalFileCopyInfo2[];
    }

    export interface Clusters3 {
        Item: string[];
    }

    export interface WULogicalFileCopyInfo3 {
        IsIndex: boolean;
        LogicalName: string;
        DfuCopyWuid: string;
        DfuCopyError: string;
        Clusters: Clusters3;
    }

    export interface Foreign {
        WULogicalFileCopyInfo: WULogicalFileCopyInfo3[];
    }

    export interface Clusters4 {
        Item: string[];
    }

    export interface WULogicalFileCopyInfo4 {
        IsIndex: boolean;
        LogicalName: string;
        DfuCopyWuid: string;
        DfuCopyError: string;
        Clusters: Clusters4;
    }

    export interface NotFound {
        WULogicalFileCopyInfo: WULogicalFileCopyInfo4[];
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

    export interface File {
        Error: string;
        LogicalName: string;
    }

    export interface FileErrors {
        File: File[];
    }

    export interface Response {
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
}

export namespace WUGetGraph {

    export interface Request {
        Wuid: string;
        GraphName: string;
        SubGraphId: string;
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

    export interface ECLGraphEx {
        Name: string;
        Label: string;
        Type: string;
        Graph: string;
        Running: boolean;
        RunningId: number;
        Complete: boolean;
        Failed: boolean;
    }

    export interface Graphs {
        ECLGraphEx: ECLGraphEx[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Graphs: Graphs;
    }
}

export namespace WUResult {
    export interface Request {
        Wuid?: string;
        Sequence?: number;
        ResultName?: string;
        LogicalName?: string;
        Cluster?: string;
        SuppressXmlSchema?: boolean;
        BypassCachedResult?: boolean;
        FilterBy?: any;
        Start: number;
        Count: number;
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

    export interface XmlSchema {
        "@name": string;
        xml: string;
    }

    export interface Result {
        XmlSchema: XmlSchema;
        "@xmlSchema": string;
        Row: any[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Wuid: string;
        Sequence: number;
        LogicalName: string;
        Cluster: string;
        Name: string;
        Start: number;
        Requested: number;
        Count: number;
        Total: number;
        Result: Result;
    }
}

export namespace WUQueryGetGraph {
    export interface Request {
        Target: string;
        QueryId: string;
        GraphName: string;
        SubGraphId: string;
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

    export interface ECLGraphEx {
        Name: string;
        Label: string;
        Type: string;
        Graph: string;
        Running: boolean;
        RunningId: number;
        Complete: boolean;
        Failed: boolean;
    }

    export interface Graphs {
        ECLGraphEx: ECLGraphEx[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Graphs: Graphs;
    }
}

export interface WUFileRequest {
    Name: string;
    Wuid: string;
    Type: string;
    Option: string;
    SlaveIP: string;
    IPAddress: string;
    Description: string;
    QuerySet: string;
    Query: string;
    Process: string;
    ClusterGroup: string;
    LogDate: string;
    SlaveNumber: number;
    SizeLimit: number;
    PlainText: string;
}

export namespace WUGetStats {
    export interface Request {
        WUID: string;
        CreatorType: string;
        Creator: string;
        ScopeType: string;
        Scope: string;
        Kind: string;
        Measure: string;
        MinScopeDepth: number;
        MaxScopeDepth: number;
        IncludeGraphs: boolean;
        CreateDescriptions: boolean;
        MinValue: number;
        MaxValue: number;
        Filter: string;
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
        RawValue: number;
        Count: number;
        Max: number;
        Wuid: string;
    }

    export interface Statistics {
        WUStatisticItem: WUStatisticItem[];
    }

    export interface Response {
        Exceptions: Exceptions;
        WUID: string;
        Statistics: Statistics;
    }
}

export namespace WUCDebug {
    export interface Request {
        Wuid: string;
        Command: string;
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

    export interface Response {
        Exceptions: Exceptions;
        Result: string;
    }
}

export namespace WUDetailsMeta {
    export interface Request {
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

    export interface Attributes {
        Attribute: string[];
    }

    export interface ScopeTypes {
        ScopeType: string[];
    }

    export interface Measures {
        Measure: string[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Attributes: Attributes;
        ScopeTypes: ScopeTypes;
        Measures: Measures;
    }
}

export namespace WUDetails {
    export namespace RequestNS {

        // tslint:disable-next-line:no-shadowed-variable
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
            Name?: string;
            ExactValue?: string;
            MinValue?: string;
            MaxValue?: string;
        }

        export interface PropertyFilters {
            PropertyFilter: PropertyFilter[];
        }

        export interface ScopeFilter {
            MaxDepth?: number;
            Scopes?: Scopes;
            Ids?: string[];
            ScopeTypes?: string[];
            PropertyFilters?: PropertyFilters;
        }

        export interface ScopeTypes2 {
            ScopeType: string[];
        }

        export interface NestedFilter {
            Depth?: number;
            ScopeTypes: string[];
        }

        export interface Properties {
            Property: string[];
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
            AllStatistics?: boolean;
            AllAttributes?: boolean;
            AllHints?: boolean;
            AllScopes?: boolean;
            AllProperties?: boolean;
            MinVersion?: string;
            Measure?: string;
            Properties?: string[];
            ExtraProperties?: ExtraProperties;
        }

        export interface ScopeOptions {
            IncludeMatchedScopesInResults?: boolean;
            IncludeScope?: boolean;
            IncludeId?: boolean;
            IncludeScopeType?: boolean;
        }

        export interface PropertyOptions {
            IncludeName?: boolean;
            IncludeRawValue?: boolean;
            IncludeFormatted?: boolean;
            IncludeMeasure?: boolean;
            IncludeCreator?: boolean;
            IncludeCreatorType?: boolean;
        }
    }

    export interface Request {
        WUID: string;
        ScopeFilter?: RequestNS.ScopeFilter;
        NestedFilter?: RequestNS.NestedFilter;
        PropertiesToReturn: RequestNS.PropertiesToReturn;
        Filter?: string;
        ScopeOptions: RequestNS.ScopeOptions;
        PropertyOptions: RequestNS.PropertyOptions;
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

    export interface Scope {
        ScopeName: string;
        Id: string;
        ScopeType: string;
        Properties: Properties;
    }

    export interface Scopes {
        Scope: Scope[];
    }

    export interface Response {
        Exceptions: Exceptions;
        MaxVersion: string;
        WUID: string;
        Scopes: Scopes;
    }
}

export function isWUQueryECLWorkunit(_: WUQuery.ECLWorkunit | WUInfo.Workunit): _ is WUQuery.ECLWorkunit {
    return (_ as WUQuery.ECLWorkunit).TotalClusterTime !== undefined;
}

export function isWUInfoWorkunit(_: WUQuery.ECLWorkunit | WUInfo.Workunit): _ is WUInfo.Workunit {
    return (_ as WUInfo.Workunit).StateEx !== undefined;
}

export class WorkunitsService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "WsWorkunits", "1.68");
    }

    opts() {
        return this._connection.opts();
    }

    connection(): ESPConnection {
        return this._connection;
    }

    WUQuery(request: WUQuery.Request = {}): Promise<WUQuery.Response> {
        return this._connection.send("WUQuery", request).then((response) => {
            return deepMixin({ Workunits: { ECLWorkunit: [] } }, response);
        });
    }

    WUInfo(_request: WUInfo.Request): Promise<WUInfo.Response> {
        const request: WUInfo.Request = {
            Wuid: "",
            TruncateEclTo64k: true,
            IncludeExceptions: false,
            IncludeGraphs: false,
            IncludeSourceFiles: false,
            IncludeResults: false,
            IncludeResultsViewNames: false,
            IncludeVariables: false,
            IncludeTimers: false,
            IncludeDebugValues: false,
            IncludeApplicationValues: false,
            IncludeWorkflows: false,
            IncludeXmlSchemas: false,
            IncludeResourceURLs: false,
            SuppressResultSchemas: true,
            ..._request
        };
        return this._connection.send("WUInfo", request);
    }

    WUCreate(): Promise<WUCreate.Response> {
        return this._connection.send("WUCreate");
    }

    WUUpdate(request: WUUpdate.Request): Promise<WUUpdate.Response> {
        return this._connection.send("WUUpdate", request, "json", true);
    }

    WUSubmit(request: WUSubmit.Request): Promise<WUSubmit.Response> {
        return this._connection.send("WUSubmit", request);
    }

    WUResubmit(request: WUResubmit.Request): Promise<WUResubmit.Response> {
        this._connection.toESPStringArray(request, "Wuids");
        return this._connection.send("WUResubmit", request);
    }

    WUQueryDetails(request: WUQueryDetails.Request): Promise<WUQueryDetails.Response> {
        return this._connection.send("WUQueryDetails", request);
    }

    WUListQueries(request: WUListQueries.Request): Promise<WUListQueries.Response> {
        return this._connection.send("WUListQueries", request);
    }

    WUPushEvent(request: WUPushEvent.Request): Promise<WUPushEvent.Response> {
        return this._connection.send("WUPushEvent", request);
    }

    WUAction(request: WUAction.Request): Promise<WUAction.Response> {
        (request as any).ActionType = request.WUActionType; //  v5.x compatibility
        return this._connection.send("WUAction", request);
    }

    WUGetZAPInfo(request: WUGetZAPInfo.Request): Promise<WUGetZAPInfo.Response> {
        return this._connection.send("WUGetZAPInfo", request);
    }

    WUShowScheduled(request: WUShowScheduled.Request): Promise<WUShowScheduled.Response> {
        return this._connection.send("WUShowScheduled", request);
    }

    WUQuerySetAliasAction(request: WUQuerySetAliasAction.Request): Promise<WUQuerySetAliasAction.Response> {
        return this._connection.send("WUQuerySetAliasAction", request);
    }

    WUQuerySetQueryAction(request: WUQuerySetQueryAction.Request): Promise<WUQuerySetQueryAction.Response> {
        return this._connection.send("WUQuerySetQueryAction", request);
    }

    WUPublishWorkunit(request: WUPublishWorkunit.Request): Promise<WUPublishWorkunit.Response> {
        return this._connection.send("WUPublishWorkunit", request);
    }

    WUGetGraph(request: WUGetGraph.Request): Promise<WUGetGraph.Response> {
        return this._connection.send("WUGetGraph", request);
    }

    WUResult(request: WUResult.Request): Promise<WUResult.Response> {
        return this._connection.send("WUResult", request);
    }

    WUQueryGetGraph(request: WUQueryGetGraph.Request): Promise<WUQueryGetGraph.Response> {
        return this._connection.send("WUQueryGetGraph", request);
    }

    WUFile(request: WUFileRequest): Promise<string> {
        return this._connection.send("WUFile", request, "text");
    }

    WUGetStats(request: WUGetStats.Request): Promise<WUGetStats.Response> {
        return this._connection.send("WUGetStats", request);
    }

    private _WUDetailsMetaPromise: Promise<WUDetailsMeta.Response>;
    WUDetailsMeta(request: WUDetailsMeta.Request): Promise<WUDetailsMeta.Response> {
        if (!this._WUDetailsMetaPromise) {
            this._WUDetailsMetaPromise = this._connection.send("WUDetailsMeta", request);
        }
        return this._WUDetailsMetaPromise;
    }

    WUDetails(request: WUDetails.Request): Promise<WUDetails.Response> {
        return this._connection.send("WUDetails", request);
    }

    WUCDebug(request: WUCDebug.Request): Promise<XMLNode | null> {
        return this._connection.send("WUCDebug", request).then((response) => {
            const retVal = xml2json(response.Result);
            const children = retVal.children();
            if (children.length) {
                return children[0];
            }
            return null;
        });
    }
}
